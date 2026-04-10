import { google } from "googleapis";

export type BookingRow = {
  age: string;
  conditions: string;
  treatment: string;
  parentName: string;
  phone: string;
  date: string;
  time: string;
  timestamp: string;
};

type SheetsEnv = {
  spreadsheetId: string;
  sheetName: string;
  serviceAccountKeyFile: string;
};

export function getSheetsEnv(): SheetsEnv {
  const spreadsheetId = process.env.SPREADSHEET_ID?.trim() ?? "";
  const sheetName = process.env.SHEET_NAME?.trim() ?? "";
  const serviceAccountKeyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE?.trim() ?? "";

  const missing: string[] = [];
  if (!spreadsheetId) missing.push("SPREADSHEET_ID");
  if (!sheetName) missing.push("SHEET_NAME");
  if (!serviceAccountKeyFile) missing.push("GOOGLE_SERVICE_ACCOUNT_KEY_FILE");

  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(
        ", "
      )}. Check server/.env`
    );
  }

  return { spreadsheetId, sheetName, serviceAccountKeyFile };
}

export async function appendBookingRow(row: BookingRow) {
  const { spreadsheetId, sheetName, serviceAccountKeyFile } = getSheetsEnv();

  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Columns (in order): Age, Conditions, Treatment, Name, Phone, Date, Time, Timestamp
  const values = [[
    row.age,
    row.conditions,
    row.treatment,
    row.parentName,
    row.phone,
    row.date,
    row.time,
    row.timestamp,
  ]];
  // Quote sheet name to support Arabic/spaces/special chars.
  const quotedSheetName = `'${sheetName.replaceAll("'", "''")}'`;

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    // Start under the header row (row 1).
    range: `${quotedSheetName}!A2:H`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
}

