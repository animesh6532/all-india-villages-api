# API Documentation

Base URL: `http://localhost:5000/api`

Protected endpoints require both headers:

```http
x-api-key: demo_key_123456
x-api-secret: demo_secret_123456
```

## Authentication

### Generate API Key

`POST /api/auth/generate-key`

```json
{
  "name": "Acme Logistics",
  "email": "dev@acme.example"
}
```

Response includes `apiKey` and one-time `apiSecret`. The backend stores only a SHA-256 hash of the secret.

## Geography APIs

### List States

`GET /api/states?page=1&limit=25&q=maha`

### Get State

`GET /api/states/:id`

### List Districts

`GET /api/districts?stateId=1&page=1&limit=25&q=pune`

### Get District

`GET /api/districts/:id`

### List Subdistricts

`GET /api/subdistricts?districtId=1&page=1&limit=25`

### Get Subdistrict

`GET /api/subdistricts/:id`

### List Villages

`GET /api/villages?q=wagholi&stateId=1&districtId=1&subdistrictId=1&page=1&limit=25`

### Get Village

`GET /api/villages/:id`

## Search API

The search endpoint accepts one of `village`, `district`, or `state`.

```http
GET /api/search?village=wagholi&page=1&limit=10
GET /api/search?district=pune
GET /api/search?state=maharashtra
```

## Analytics API

`GET /api/analytics/overview`

Returns total states, districts, villages, API calls, top search URLs, and daily usage.

## Error Format

```json
{
  "success": false,
  "message": "Validation failed",
  "details": ["\"limit\" must be less than or equal to 100"]
}
```
