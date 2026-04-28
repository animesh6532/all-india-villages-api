import argparse
import os
from pathlib import Path

import pandas as pd
import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import execute_values


ROOT = Path(__file__).resolve().parents[2]
CLEAN_DIR = ROOT / "dataset" / "cleaned"


def connect():
    load_dotenv(ROOT / "backend" / ".env")
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        dbname=os.getenv("DB_NAME", "india_villages"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "postgres"),
    )


def rows_from_csv(name, columns):
    path = CLEAN_DIR / name
    if not path.exists():
        raise FileNotFoundError(f"Missing {path}. Run clean_dataset.py first.")
    df = pd.read_csv(path).where(pd.notna, None)
    return [tuple(row[column] for column in columns) for _, row in df.iterrows()]


def upsert(cursor, table, columns, conflict, update_columns):
    rows = rows_from_csv(f"{table}.csv", columns)
    placeholders = ", ".join(columns)
    updates = ", ".join(f"{column} = EXCLUDED.{column}" for column in update_columns)
    sql = f"""
        INSERT INTO {table} ({placeholders}, created_at, updated_at)
        VALUES %s
        ON CONFLICT ({conflict}) DO UPDATE SET {updates}, updated_at = NOW()
    """
    values = rows
    template = "(" + ", ".join(["%s"] * len(columns)) + ", NOW(), NOW())"
    execute_values(cursor, sql, values, template=template, page_size=5000)
    print(f"Imported {len(rows):,} rows into {table}")


def main():
    parser = argparse.ArgumentParser(description="Import cleaned India villages CSV files into PostgreSQL.")
    parser.add_argument("--truncate", action="store_true", help="Truncate normalized tables before import.")
    args = parser.parse_args()

    with connect() as connection:
        with connection.cursor() as cursor:
            if args.truncate:
                cursor.execute("TRUNCATE api_logs, villages, subdistricts, districts, states RESTART IDENTITY CASCADE;")

            upsert(cursor, "states", ["id", "census_code", "name", "slug"], "id", ["census_code", "name", "slug"])
            upsert(
                cursor,
                "districts",
                ["id", "state_id", "census_code", "name", "slug"],
                "id",
                ["state_id", "census_code", "name", "slug"],
            )
            upsert(
                cursor,
                "subdistricts",
                ["id", "district_id", "census_code", "name", "slug"],
                "id",
                ["district_id", "census_code", "name", "slug"],
            )
            upsert(
                cursor,
                "villages",
                ["id", "subdistrict_id", "census_code", "name", "slug", "population"],
                "id",
                ["subdistrict_id", "census_code", "name", "slug", "population"],
            )
            for table in ["states", "districts", "subdistricts", "villages"]:
                cursor.execute(
                    f"SELECT setval(pg_get_serial_sequence('{table}', 'id'), COALESCE((SELECT MAX(id) FROM {table}), 1));"
                )
        connection.commit()


if __name__ == "__main__":
    main()
