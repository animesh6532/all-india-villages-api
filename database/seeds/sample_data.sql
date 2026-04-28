INSERT INTO states (id, census_code, name, slug) VALUES
  (1, '27', 'Maharashtra', 'maharashtra'),
  (2, '29', 'Karnataka', 'karnataka')
ON CONFLICT DO NOTHING;

INSERT INTO districts (id, state_id, census_code, name, slug) VALUES
  (1, 1, '521', 'Pune', 'pune'),
  (2, 2, '572', 'Bengaluru Urban', 'bengaluru-urban')
ON CONFLICT DO NOTHING;

INSERT INTO subdistricts (id, district_id, census_code, name, slug) VALUES
  (1, 1, '04189', 'Haveli', 'haveli'),
  (2, 2, '05542', 'Bengaluru North', 'bengaluru-north')
ON CONFLICT DO NOTHING;

INSERT INTO villages (subdistrict_id, census_code, name, slug, population) VALUES
  (1, '556099', 'Wagholi', 'wagholi', 33900),
  (1, '556100', 'Lohegaon', 'lohegaon', 24000),
  (2, '612910', 'Yelahanka', 'yelahanka', 31200)
ON CONFLICT DO NOTHING;
