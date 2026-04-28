import argparse
import re
import shutil
import zipfile
from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[2]
RAW_DIR = ROOT / "dataset" / "raw"
CLEAN_DIR = ROOT / "dataset" / "cleaned"


COLUMN_CANDIDATES = {
    "state_name": ["state name", "state/ut", "name of state", "state"],
    "state_code": ["state code", "state census code"],
    "district_name": ["district name", "name of district", "district"],
    "district_code": ["district code"],
    "subdistrict_name": ["subdistrict name", "sub district name", "tehsil name", "taluk name", "name of sub district"],
    "subdistrict_code": ["subdistrict code", "sub district code", "tehsil code", "taluk code"],
    "village_name": ["village name", "town/village name", "area name", "name of village"],
    "village_code": ["village code", "town/village code", "village census code"],
    "population": ["population", "total population"]
}


def slugify(value):
    value = str(value or "").strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-+", "-", value).strip("-")


def clean_text(value):
    if pd.isna(value):
        return None
    value = re.sub(r"\s+", " ", str(value)).strip()
    return value or None


def normalize_header(value):
    value = re.sub(r"[^a-z0-9]+", " ", str(value).lower()).strip()
    return re.sub(r"\s+", " ", value)


def infer_state_name(path):
    name = path.stem
    match = re.search(r"Rdir_2011_\d+_(.+)$", name, flags=re.IGNORECASE)
    if match:
        return match.group(1).replace("_and_", " and ").replace("_", " ").title()
    return None


def extract_zip(zip_path):
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path) as archive:
        for member in archive.infolist():
            if member.is_dir() or member.filename.startswith("__MACOSX/"):
                continue
            if Path(member.filename).suffix.lower() not in {".xls", ".xlsx", ".ods", ".csv"}:
                continue
            target = RAW_DIR / Path(member.filename).name
            with archive.open(member) as source, open(target, "wb") as destination:
                shutil.copyfileobj(source, destination)


def read_table(path):
    suffix = path.suffix.lower()
    if suffix == ".csv":
        return pd.read_csv(path)

    engine = "odf" if suffix == ".ods" else "xlrd" if suffix == ".xls" else "openpyxl"
    preview = pd.read_excel(path, header=None, engine=engine, nrows=25)
    header_row = 0
    best_score = -1
    candidate_tokens = [token for tokens in COLUMN_CANDIDATES.values() for token in tokens]

    for index, row in preview.iterrows():
        normalized = " | ".join(normalize_header(value) for value in row.tolist())
        score = sum(1 for token in candidate_tokens if token in normalized)
        if score > best_score:
            best_score = score
            header_row = index

    return pd.read_excel(path, header=header_row, engine=engine)


def map_columns(columns):
    normalized_columns = {column: normalize_header(column) for column in columns}
    mapped = {}
    for canonical, candidates in COLUMN_CANDIDATES.items():
        for column, normalized in normalized_columns.items():
            if any(candidate in normalized for candidate in candidates):
                mapped[canonical] = column
                break
    return mapped


def normalize_file(path):
    df = read_table(path)
    df = df.dropna(how="all")
    mapping = map_columns(df.columns)

    normalized = pd.DataFrame()
    for canonical in COLUMN_CANDIDATES:
        source = mapping.get(canonical)
        normalized[canonical] = df[source] if source in df.columns else None

    fallback_state = infer_state_name(path)
    if normalized["state_name"].isna().all() and fallback_state:
        normalized["state_name"] = fallback_state

    for column in ["state_name", "district_name", "subdistrict_name"]:
        normalized[column] = normalized[column].map(clean_text).ffill()

    for column in ["village_name", "state_code", "district_code", "subdistrict_code", "village_code"]:
        normalized[column] = normalized[column].map(clean_text)

    normalized["population"] = pd.to_numeric(normalized["population"], errors="coerce").astype("Int64")
    normalized = normalized.dropna(subset=["state_name", "district_name", "subdistrict_name", "village_name"])
    normalized = normalized.drop_duplicates(
        subset=["state_name", "district_name", "subdistrict_name", "village_name"], keep="first"
    )
    return normalized


def assign_dimensions(rows):
    states = rows[["state_code", "state_name"]].drop_duplicates().sort_values("state_name").reset_index(drop=True)
    states.insert(0, "id", range(1, len(states) + 1))
    states["slug"] = states["state_name"].map(slugify)

    districts = rows[["state_name", "district_code", "district_name"]].drop_duplicates().sort_values(
        ["state_name", "district_name"]
    )
    districts = districts.merge(states[["id", "state_name"]], on="state_name").rename(columns={"id": "state_id"})
    districts = districts.reset_index(drop=True)
    districts.insert(0, "id", range(1, len(districts) + 1))
    districts["slug"] = districts["district_name"].map(slugify)

    subdistricts = rows[["state_name", "district_name", "subdistrict_code", "subdistrict_name"]].drop_duplicates()
    subdistricts = subdistricts.merge(districts[["id", "state_name", "district_name"]], on=["state_name", "district_name"])
    subdistricts = subdistricts.rename(columns={"id": "district_id"}).sort_values(["district_id", "subdistrict_name"])
    subdistricts = subdistricts.reset_index(drop=True)
    subdistricts.insert(0, "id", range(1, len(subdistricts) + 1))
    subdistricts["slug"] = subdistricts["subdistrict_name"].map(slugify)

    villages = rows.merge(
        subdistricts[["id", "state_name", "district_name", "subdistrict_name"]],
        on=["state_name", "district_name", "subdistrict_name"],
    ).rename(columns={"id": "subdistrict_id"})
    villages = villages[["subdistrict_id", "village_code", "village_name", "population"]]
    villages = villages.drop_duplicates(subset=["subdistrict_id", "village_name"]).sort_values(
        ["subdistrict_id", "village_name"]
    )
    villages = villages.reset_index(drop=True)
    villages.insert(0, "id", range(1, len(villages) + 1))
    villages["slug"] = villages["village_name"].map(slugify)

    return states, districts, subdistricts, villages


def write_outputs(rows):
    CLEAN_DIR.mkdir(parents=True, exist_ok=True)
    states, districts, subdistricts, villages = assign_dimensions(rows)
    states.rename(columns={"state_name": "name", "state_code": "census_code"}).to_csv(CLEAN_DIR / "states.csv", index=False)
    districts.rename(columns={"district_name": "name", "district_code": "census_code"}).drop(columns=["state_name"]).to_csv(
        CLEAN_DIR / "districts.csv", index=False
    )
    subdistricts.rename(columns={"subdistrict_name": "name", "subdistrict_code": "census_code"}).drop(
        columns=["state_name", "district_name"]
    ).to_csv(CLEAN_DIR / "subdistricts.csv", index=False)
    villages.rename(columns={"village_name": "name", "village_code": "census_code"}).to_csv(
        CLEAN_DIR / "villages.csv", index=False
    )


def main():
    parser = argparse.ArgumentParser(description="Clean All India villages Excel/ODS dataset into normalized CSV files.")
    parser.add_argument("--zip", dest="zip_path", help="Path to all-india-villages-master-list-excel.zip")
    args = parser.parse_args()

    if args.zip_path:
        extract_zip(Path(args.zip_path))

    files = [path for path in RAW_DIR.glob("*") if path.suffix.lower() in {".xls", ".xlsx", ".ods", ".csv"}]
    if not files:
        raise SystemExit("No dataset files found. Place the ZIP contents in dataset/raw or pass --zip.")

    frames = []
    for path in files:
        try:
            frame = normalize_file(path)
            frames.append(frame)
            print(f"Cleaned {path.name}: {len(frame):,} villages")
        except Exception as exc:
            print(f"Skipped {path.name}: {exc}")

    if not frames:
        raise SystemExit("No valid rows were produced from the dataset files.")

    rows = pd.concat(frames, ignore_index=True)
    rows = rows.drop_duplicates(subset=["state_name", "district_name", "subdistrict_name", "village_name"])
    write_outputs(rows)
    print(f"Wrote cleaned CSVs to {CLEAN_DIR}")


if __name__ == "__main__":
    main()
