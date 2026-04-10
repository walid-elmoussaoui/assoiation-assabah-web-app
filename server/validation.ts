export type BookingPayload = {
  age: unknown;
  conditions: unknown;
  treatment: unknown;
  parentName: unknown;
  phone: unknown;
  date: unknown;
  time: unknown;
  timestamp: unknown;
};

export type ValidBooking = {
  age: string;
  conditions: string;
  treatment: string;
  parentName: string;
  phone: string; // digits only
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  timestamp: string; // ISO
};

const isNonEmptyString = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

const normalizePhoneDigits = (value: string) => value.replace(/[^\d]/g, "");

const isValidPhoneDigits = (digitsOnly: string) => /^\d{8,15}$/.test(digitsOnly);

const isValidIsoDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);
const isValidTime = (v: string) => /^\d{2}:\d{2}$/.test(v);

const isWeekend = (yyyyMmDd: string) => {
  const d = new Date(`${yyyyMmDd}T00:00:00.000Z`);
  const day = d.getUTCDay(); // 0 Sun ... 6 Sat
  return day === 0 || day === 6;
};

const minutesFromHHMM = (hhmm: string) => {
  const [hh, mm] = hhmm.split(":").map((x) => Number(x));
  return hh * 60 + mm;
};

export function validateBookingPayload(body: BookingPayload): ValidBooking {
  if (!isNonEmptyString(body.age)) {
    throw new Error("Age is required.");
  }
  if (!isNonEmptyString(body.conditions)) {
    throw new Error("At least one condition is required.");
  }
  if (!isNonEmptyString(body.treatment)) {
    throw new Error("Treatment selection is required.");
  }
  if (!isNonEmptyString(body.parentName)) {
    throw new Error("Parent name is required.");
  }
  if (!isNonEmptyString(body.phone)) {
    throw new Error("Phone is required.");
  }
  const phoneDigits = normalizePhoneDigits(body.phone);
  if (!isValidPhoneDigits(phoneDigits)) {
    throw new Error("Invalid phone number. Digits only (8-15 digits).");
  }
  if (!isNonEmptyString(body.date) || !isValidIsoDate(body.date)) {
    throw new Error("Date is required (YYYY-MM-DD).");
  }
  if (isWeekend(body.date)) {
    throw new Error("Closed on Saturday and Sunday.");
  }
  if (!isNonEmptyString(body.time) || !isValidTime(body.time)) {
    throw new Error("Time is required (HH:MM).");
  }
  const timeMins = minutesFromHHMM(body.time);
  const start = 8 * 60 + 30;
  const end = 15 * 60 + 30;
  if (timeMins < start || timeMins > end || (timeMins - start) % 30 !== 0) {
    throw new Error("Time must be between 08:30 and 15:30.");
  }
  if (!isNonEmptyString(body.timestamp)) {
    throw new Error("Timestamp is required.");
  }
  const t = Date.parse(body.timestamp);
  if (Number.isNaN(t)) {
    throw new Error("Invalid timestamp format.");
  }

  // Basic sanitization: keep it as a string (Arabic supported).
  const age = body.age.trim();
  const conditions = body.conditions.trim();
  const treatment = body.treatment.trim();
  const parentName = body.parentName.trim();
  const date = body.date.trim();
  const time = body.time.trim();
  const timestamp = new Date(t).toISOString();

  return { age, conditions, treatment, parentName, phone: phoneDigits, date, time, timestamp };
}

