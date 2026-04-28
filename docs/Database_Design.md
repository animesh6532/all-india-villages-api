# Database Design

The platform uses a normalized PostgreSQL schema.

## Tables

`states`

- State or union territory master.
- Unique `name`, `slug`, and optional census code.

`districts`

- Belongs to `states`.
- Unique by `(state_id, slug)`.

`subdistricts`

- Belongs to `districts`.
- Represents tehsil, taluk, block, or subdistrict level.
- Unique by `(district_id, slug)`.

`villages`

- Belongs to `subdistricts`.
- Stores census code, village name, slug, and optional population.
- Unique by `(subdistrict_id, slug)`.

`api_clients`

- Stores B2B client identity, API key, secret hash, active status, and last used timestamp.

`api_logs`

- Stores request method, URL, status code, response time, client reference, IP, and user agent.

## Index Strategy

- Foreign key indexes support filtered joins from state to village.
- Unique composite indexes prevent duplicate administrative entries.
- `pg_trgm` GIN indexes accelerate partial name search for states, districts, subdistricts, and villages.
- API log indexes support client-level usage analytics and endpoint popularity reports.

## Normalization Flow

```text
states 1 -> many districts
districts 1 -> many subdistricts
subdistricts 1 -> many villages
api_clients 1 -> many api_logs
```
