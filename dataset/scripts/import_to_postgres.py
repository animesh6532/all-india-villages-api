import psycopg2
import pandas as pd
from slugify import slugify

DB_CONFIG = {
    "host": "localhost",
    "database": "villages_db",
    "user": "postgres",
    "password": "postgres123",
    "port": 5432
}


def safe_int(value):
    if pd.isna(value):
        return None
    return int(value)


def import_states(cursor):

    df = pd.read_csv("dataset/cleaned/states.csv")

    inserted = set()

    for _, row in df.iterrows():

        state_id = safe_int(row["id"])

        if state_id in inserted:
            continue

        inserted.add(state_id)

        cursor.execute("""
            INSERT INTO states (
                id,
                name,
                slug
            )
            VALUES (%s, %s, %s)
            ON CONFLICT DO NOTHING
        """, (
            state_id,
            row["name"],
            slugify(str(row["name"]))
        ))


def import_districts(cursor):

    df = pd.read_csv("dataset/cleaned/districts.csv")

    inserted = set()

    for _, row in df.iterrows():

        district_id = safe_int(row["id"])

        if district_id in inserted:
            continue

        inserted.add(district_id)

        cursor.execute("""
            INSERT INTO districts (
                id,
                state_id,
                name,
                slug
            )
            VALUES (%s, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, (
            district_id,
            safe_int(row["state_id"]),
            row["name"],
            slugify(str(row["name"]))
        ))


def import_subdistricts(cursor):

    df = pd.read_csv("dataset/cleaned/subdistricts.csv")

    inserted = set()

    # Fetch valid district IDs from DB
    cursor.execute("SELECT id FROM districts")
    valid_districts = {row[0] for row in cursor.fetchall()}

    for _, row in df.iterrows():

        subdistrict_id = safe_int(row["id"])
        district_id = safe_int(row["district_id"])

        if subdistrict_id in inserted:
            continue

        # Skip invalid foreign keys
        if district_id not in valid_districts:
            continue

        inserted.add(subdistrict_id)

        cursor.execute("""
            INSERT INTO subdistricts (
                id,
                district_id,
                name,
                slug
            )
            VALUES (%s, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, (
            subdistrict_id,
            district_id,
            row["name"],
            slugify(str(row["name"]))
        ))


def import_villages(cursor):

    df = pd.read_csv("dataset/cleaned/villages.csv")

    inserted = set()

    # Fetch valid subdistrict IDs
    cursor.execute("SELECT id FROM subdistricts")
    valid_subdistricts = {row[0] for row in cursor.fetchall()}

    for _, row in df.iterrows():

        village_id = safe_int(row["id"])
        subdistrict_id = safe_int(row["subdistrict_id"])

        if village_id in inserted:
            continue

        # Skip invalid foreign keys
        if subdistrict_id not in valid_subdistricts:
            continue

        inserted.add(village_id)

        population = None

        if "population" in df.columns and pd.notna(row["population"]):
            population = int(row["population"])

        cursor.execute("""
            INSERT INTO villages (
                id,
                subdistrict_id,
                name,
                slug,
                population
            )
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING
        """, (
            village_id,
            subdistrict_id,
            row["name"],
            slugify(str(row["name"])),
            population
        ))


def main():

    print("Connecting to PostgreSQL...")

    conn = psycopg2.connect(**DB_CONFIG)

    cursor = conn.cursor()

    print("Importing states...")
    import_states(cursor)

    print("Importing districts...")
    import_districts(cursor)

    print("Importing subdistricts...")
    import_subdistricts(cursor)

    print("Importing villages...")
    import_villages(cursor)

    conn.commit()

    cursor.close()

    conn.close()

    print("Import completed successfully!")


if __name__ == "__main__":
    main()