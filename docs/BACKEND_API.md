# Backend API (CMS Milestone)

This document covers the current CMS backend APIs in `apps/api` for bilingual content management (Arabic and English).

## Base URL

- Local: `http://localhost:5000`

## Authentication

- Public routes do not require authentication.
- Admin routes require:
  - `Authorization: Bearer <JWT>`
  - Admin role

## Response Format

### Success

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Readable message",
  "errors": []
}
```

## Bilingual Fields

The following models store Arabic + English in the same record:

- Page: `titleAr`, `titleEn`, `contentAr`, `contentEn`, ...
- News: `titleAr`, `titleEn`, `contentAr`, `contentEn`, ...
- Event: `titleAr`, `titleEn`, `descriptionAr`, `descriptionEn`, ...

Public endpoints return localized normalized fields (`title`, `content`, etc.) based on `locale=ar|en`.

## Public Routes

## Pages

### GET `/api/pages/:slug?locale=ar|en`

Returns one published page by slug in selected locale.

### Query Parameters

- `locale`: `ar` or `en` (default: `ar`)

## News

### GET `/api/news`

Returns published news list (localized, paginated).

### Query Parameters

- `locale`: `ar|en` (default: `ar`)
- `page`: positive integer
- `limit`: positive integer, max 50
- `search`: optional text
- `category`: optional category filter in selected locale

### GET `/api/news/:slug?locale=ar|en`

Returns one published news article by slug in selected locale.

## Events

### GET `/api/events`

Returns published events list (localized, paginated).

### Query Parameters

- `locale`: `ar|en` (default: `ar`)
- `page`: positive integer
- `limit`: positive integer, max 50
- `search`: optional text
- `timeframe`: `upcoming|past|all` (default: `all`)

### GET `/api/events/:slug?locale=ar|en`

Returns one published event by slug in selected locale.

## Public Content Rules

- Only `PUBLISHED` content is returned.
- Content with future `publishedAt` is hidden.
- Missing content returns `404`.
- News sorted by `publishedAt desc`.
- Upcoming events sorted by `startDate asc`.

## Admin Routes

All routes below require admin JWT.

## Pages (Admin)

- GET `/api/admin/pages`
- GET `/api/admin/pages/:id`
- POST `/api/admin/pages`
- PATCH `/api/admin/pages/:id`
- DELETE `/api/admin/pages/:id` (soft delete to `ARCHIVED`)

### Example Create Body

```json
{
  "slug": "about-our-mission",
  "titleAr": "عنوان عربي",
  "titleEn": "English Title",
  "contentAr": "Arabic content",
  "contentEn": "English content",
  "status": "DRAFT"
}
```

## News (Admin)

- GET `/api/admin/news`
- GET `/api/admin/news/:id`
- POST `/api/admin/news`
- PATCH `/api/admin/news/:id`
- DELETE `/api/admin/news/:id` (soft delete to `ARCHIVED`)

### Example Create Body

```json
{
  "slug": "summer-first-aid-campaign",
  "titleAr": "حملة الإسعافات الأولية",
  "titleEn": "Summer First Aid Campaign",
  "contentAr": "تفاصيل الخبر بالعربية",
  "contentEn": "News details in English",
  "categoryAr": "توعية",
  "categoryEn": "Awareness",
  "status": "PUBLISHED"
}
```

## Events (Admin)

- GET `/api/admin/events`
- GET `/api/admin/events/:id`
- POST `/api/admin/events`
- PATCH `/api/admin/events/:id`
- DELETE `/api/admin/events/:id` (soft delete to `ARCHIVED`)

### Example Create Body

```json
{
  "slug": "first-aid-workshop-2026",
  "titleAr": "ورشة إسعافات أولية",
  "titleEn": "First Aid Workshop",
  "descriptionAr": "وصف الفعالية بالعربية",
  "descriptionEn": "Event description in English",
  "startDate": "2026-08-01T09:00:00.000Z",
  "endDate": "2026-08-01T12:00:00.000Z",
  "status": "PUBLISHED"
}
```

## Admin List Query Parameters

For `/api/admin/pages`, `/api/admin/news`, `/api/admin/events`:

- `page`: positive integer
- `limit`: positive integer, max 50
- `search`: optional text
- `status`: model status enum filter

## Validation Notes

- `locale` accepts only `ar` or `en`.
- `slug` must be lowercase and URL-safe.
- Unknown request fields are rejected.
- Event `endDate` cannot be earlier than `startDate`.
- Duplicate slug returns `409` conflict.

## Example Validation Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "slug: Slug must be lowercase and URL-safe"
  ]
}
```

## Current Placeholders / Not Implemented In This Milestone

- Media upload handling (only `featuredImageUrl` string is supported)
- Volunteer applications
- Help requests
- Contact messages
- Donation payments
- Email sending
- Automated tests
