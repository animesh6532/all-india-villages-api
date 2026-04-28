CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS districts_state_id_idx ON districts(state_id);
CREATE INDEX IF NOT EXISTS subdistricts_district_id_idx ON subdistricts(district_id);
CREATE INDEX IF NOT EXISTS villages_subdistrict_id_idx ON villages(subdistrict_id);
CREATE INDEX IF NOT EXISTS api_logs_client_created_idx ON api_logs(client_id, created_at);
CREATE INDEX IF NOT EXISTS api_logs_path_idx ON api_logs(path);

CREATE INDEX IF NOT EXISTS states_name_trgm_idx ON states USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS districts_name_trgm_idx ON districts USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS subdistricts_name_trgm_idx ON subdistricts USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS villages_name_trgm_idx ON villages USING GIN (name gin_trgm_ops);
