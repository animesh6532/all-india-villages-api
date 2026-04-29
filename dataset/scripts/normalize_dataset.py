import os
import pandas as pd
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

CLEAN_DIR = ROOT / "dataset" / "cleaned"

states = []
districts = []
subdistricts = []
villages = []

state_id = 1
district_id = 1
subdistrict_id = 1
village_id = 1

state_map = {}
district_map = {}
subdistrict_map = {}

for file in os.listdir(CLEAN_DIR):

    # Skip normalized CSVs
    if file in [
        "states.csv",
        "districts.csv",
        "subdistricts.csv",
        "villages.csv"
    ]:
        continue

    if file.endswith(".csv"):

        path = CLEAN_DIR / file

        print(f"Processing {file}")

        try:

            df = pd.read_csv(path)

            for _, row in df.iterrows():

                # REAL DATASET COLUMN NAMES
                state_name = str(row.get("STATE NAME", "")).strip()
                district_name = str(row.get("DISTRICT NAME", "")).strip()
                subdistrict_name = str(row.get("SUB-DISTRICT NAME", "")).strip()
                village_name = str(row.get("Area Name", "")).strip()

                # Skip invalid rows
                if (
                    state_name.lower() == "nan"
                    or district_name.lower() == "nan"
                    or subdistrict_name.lower() == "nan"
                    or village_name.lower() == "nan"
                ):
                    continue

                # ---------------- STATES ----------------
                if state_name not in state_map:

                    state_map[state_name] = state_id

                    states.append({
                        "id": state_id,
                        "name": state_name
                    })

                    state_id += 1

                current_state_id = state_map[state_name]

                # ---------------- DISTRICTS ----------------
                district_key = (current_state_id, district_name)

                if district_key not in district_map:

                    district_map[district_key] = district_id

                    districts.append({
                        "id": district_id,
                        "state_id": current_state_id,
                        "name": district_name
                    })

                    district_id += 1

                current_district_id = district_map[district_key]

                # ---------------- SUBDISTRICTS ----------------
                subdistrict_key = (
                    current_district_id,
                    subdistrict_name
                )

                if subdistrict_key not in subdistrict_map:

                    subdistrict_map[subdistrict_key] = subdistrict_id

                    subdistricts.append({
                        "id": subdistrict_id,
                        "district_id": current_district_id,
                        "name": subdistrict_name
                    })

                    subdistrict_id += 1

                current_subdistrict_id = subdistrict_map[subdistrict_key]

                # ---------------- VILLAGES ----------------
                villages.append({
                    "id": village_id,
                    "subdistrict_id": current_subdistrict_id,
                    "name": village_name
                })

                village_id += 1

        except Exception as e:
            print(f"Error processing {file}: {e}")

# SAVE NORMALIZED CSVs
pd.DataFrame(states).to_csv(
    CLEAN_DIR / "states.csv",
    index=False
)

pd.DataFrame(districts).to_csv(
    CLEAN_DIR / "districts.csv",
    index=False
)

pd.DataFrame(subdistricts).to_csv(
    CLEAN_DIR / "subdistricts.csv",
    index=False
)

pd.DataFrame(villages).to_csv(
    CLEAN_DIR / "villages.csv",
    index=False
)

print("\nNormalization completed successfully.")
print(f"States: {len(states):,}")
print(f"Districts: {len(districts):,}")
print(f"Subdistricts: {len(subdistricts):,}")
print(f"Villages: {len(villages):,}")