# All India Villages API Platform

Production-style full-stack SaaS capstone for serving normalized India location data through secure REST APIs.

## What Is Included

- Express.js backend with MVC structure, Sequelize ORM, validation, API key authentication, rate limiting, usage logging, and analytics.
- PostgreSQL normalized schema for states, districts, subdistricts, villages, API clients, and API logs.
- React + Vite frontend with dashboard, search, analytics charts, API docs, and credential management.
- Python + Pandas dataset pipeline for cleaning Excel/ODS files from `all-india-villages-master-list-excel.zip`.
- Docker Compose stack for PostgreSQL, backend, and frontend.
- Migrations, seed data, SQL schema, indexing scripts, tests, and documentation.

## Quick Start

```bash
docker compose up --build
```

Then open:

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:5000/api/health`

Demo protected API credentials:

```http
x-api-key: demo_key_123456
x-api-secret: demo_secret_123456
```

## Local Development

Backend:

```bash
cd backend
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Frontend:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Dataset processing:

```bash
cd dataset/scripts
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python clean_dataset.py --zip "..\raw\all-india-villages-master-list-excel.zip"
python import_to_postgres.py --truncate
```

## Core API

- `GET /api/states`
- `GET /api/districts?stateId=1`
- `GET /api/subdistricts?districtId=1`
- `GET /api/villages?q=wagholi&stateId=1&districtId=1`
- `GET /api/search?village=wagholi`
- `GET /api/analytics/overview`
- `POST /api/auth/generate-key`

Every protected endpoint returns:

```json
{
  "success": true,
  "message": "Success",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 25,
    "total": 0,
    "totalPages": 0
  }
}
```

## Project Structure

The repository follows the requested production layout with `backend`, `frontend`, `database`, `dataset`, `docs`, and `tests` directories.
