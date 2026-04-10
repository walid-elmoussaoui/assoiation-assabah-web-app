# Backend (Express → Google Sheets)

This server receives the booking form submission and appends it to Google Sheets.

## Setup

1) Create `server/.env` from the example:

- Copy `server/.env.example` → `server/.env`

2) Put your service account JSON file here:

- `server/credentials/credentials.json`

3) Set your `.env` values:

- `SPREADSHEET_ID`: your Google Sheet ID (from the URL)
- `SHEET_NAME`: the tab name (e.g. `Sheet1`)
- `GOOGLE_SERVICE_ACCOUNT_KEY_FILE`: full path to `credentials.json` (recommended on Windows)

## Run

From the project root:

```bash
npm run server
```

Health check:

- `GET /api/health`

