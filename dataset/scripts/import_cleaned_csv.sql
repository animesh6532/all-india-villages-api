\copy states(id, census_code, name, slug) FROM '../dataset/cleaned/states.csv' WITH CSV HEADER;
\copy districts(id, state_id, census_code, name, slug) FROM '../dataset/cleaned/districts.csv' WITH CSV HEADER;
\copy subdistricts(id, district_id, census_code, name, slug) FROM '../dataset/cleaned/subdistricts.csv' WITH CSV HEADER;
\copy villages(id, subdistrict_id, census_code, name, slug, population) FROM '../dataset/cleaned/villages.csv' WITH CSV HEADER;

SELECT setval(pg_get_serial_sequence('states', 'id'), COALESCE(MAX(id), 1)) FROM states;
SELECT setval(pg_get_serial_sequence('districts', 'id'), COALESCE(MAX(id), 1)) FROM districts;
SELECT setval(pg_get_serial_sequence('subdistricts', 'id'), COALESCE(MAX(id), 1)) FROM subdistricts;
SELECT setval(pg_get_serial_sequence('villages', 'id'), COALESCE(MAX(id), 1)) FROM villages;
