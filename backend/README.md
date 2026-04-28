# Backend

Express + Sequelize API service for the All India Villages API Platform.

## Local Run

```bash
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

All protected routes require:

```http
x-api-key: demo_key_123456
x-api-secret: demo_secret_123456
```

The demo credentials are created by the seed script.
