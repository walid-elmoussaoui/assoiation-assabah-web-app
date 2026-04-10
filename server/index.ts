import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { appendBookingRow } from "./googleSheets";
import { validateBookingPayload } from "./validation";

// Windows-safe `.env` resolution for `tsx` + ESM.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/booking", async (req, res) => {
  try {
    const booking = validateBookingPayload(req.body ?? {});
    await appendBookingRow(booking);
    res.status(201).json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    // In development, returning the precise message is useful for setup.
    const isProd = (process.env.NODE_ENV ?? "").toLowerCase() === "production";
    const safeMessage =
      !isProd ? message : "Request failed. Please try again later.";
    res.status(400).json({ error: safeMessage });
  }
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});

