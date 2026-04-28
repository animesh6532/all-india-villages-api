# Setup Guide

## Docker Setup

```bash
docker compose up --build
```

This starts PostgreSQL, runs backend migrations and seeders, starts the API, and serves the React app.

## Manual Setup

1. Install Node.js 20, Python 3.11+, PostgreSQL 16, and Docker if needed.
2. Create a PostgreSQL database named `india_villages`.
3. Configure `backend/.env` from `backend/.env.example`.
4. Run backend migrations and seeders.
5. Start backend and frontend development servers.

```bash
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

## Dataset Import

```bash
cd dataset/scripts
pip install -r requirements.txt
python clean_dataset.py --zip "../raw/all-india-villages-master-list-excel.zip"
python import_to_postgres.py --truncate
```

## Production Notes

- Replace demo credentials.
- Use a managed PostgreSQL instance with backups.
- Set `DB_SSL=true` when required.
- Put the backend behind HTTPS and a reverse proxy.
- Configure stricter CORS origins.
- Use separate secrets per B2B client.
