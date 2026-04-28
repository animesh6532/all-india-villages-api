# System Architecture

## Overview

The platform is split into three deployable services:

- React frontend for discovery, search, dashboarding, and API key workflows.
- Express backend for REST APIs, authentication, analytics, validation, and logging.
- PostgreSQL database for normalized geography and usage data.

## Backend Layers

- `routes`: HTTP route declarations.
- `controllers`: Request and response orchestration.
- `services`: Business logic and optimized Sequelize queries.
- `models`: Sequelize table definitions and relationships.
- `middleware`: API key authentication, rate limiting, logging, validation, and error handling.
- `utils`: Shared helpers for pagination, responses, crypto, and errors.

## Data Pipeline

1. Place the source ZIP in `dataset/raw`.
2. `clean_dataset.py` extracts Excel/ODS files, detects headers, normalizes names, removes duplicates, and writes CSV dimensions.
3. `import_to_postgres.py` loads CSV rows into PostgreSQL using batched upserts.
4. Backend APIs serve the normalized database.

## Request Lifecycle

```text
Client -> Rate limiter -> API key middleware -> Validation -> Controller -> Service -> Sequelize -> PostgreSQL
Client <- Response formatter <- Controller <- Service <- Sequelize
```

Usage events are captured after each response and written to `api_logs`.
