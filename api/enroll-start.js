import { proxyEnrollmentStart } from "./lib/partnerProxy.js";

/**
 * Vercel serverless — POST /api/enroll-start
 * SummitMD marketing site → Peak Health Partner API (server-side key).
 */
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};

    const data = await proxyEnrollmentStart(body);
    return res.status(200).json(data);
  } catch (err) {
    const status = err.statusCode || 500;
    return res.status(status).json({
      error: err.message || "Enrollment proxy failed",
      ...(err.details ? { details: err.details } : {}),
    });
  }
}
