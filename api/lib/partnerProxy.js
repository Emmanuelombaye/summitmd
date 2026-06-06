/**
 * Server-side Partner API proxy (API key never exposed to browser).
 */

const DEFAULT_API_URL =
  "https://vzzmdbdvcofajgrjgajq.supabase.co/functions/v1/partner-api";

/** Map SummitMD shop tabs to Peak enrollment categories */
const CATEGORY_MAP = {
  subscriptions: "weight-loss",
  nutrition: "longevity",
  wellness: "longevity",
  devices: "longevity",
  maternal: "longevity",
};

export function partnerEnv() {
  return {
    apiUrl: (process.env.PARTNER_API_URL || DEFAULT_API_URL).replace(/\/$/, ""),
    apiKey: (process.env.PARTNER_API_KEY || "").trim(),
    brandSlug: (process.env.PARTNER_BRAND_SLUG || "summit-md").trim(),
    portalOrigin: (
      process.env.PARTNER_PORTAL_ORIGIN || "https://www.peak-health.io"
    ).trim(),
    returnUrl: (
      process.env.PARTNER_RETURN_URL || "https://summitmd.vercel.app/shop"
    ).trim(),
  };
}

export function mapCategory(raw) {
  if (!raw || typeof raw !== "string") return undefined;
  const key = raw.trim().toLowerCase();
  return CATEGORY_MAP[key] || key;
}

export async function proxyEnrollmentStart(body = {}) {
  const env = partnerEnv();
  if (!env.apiKey) {
    const err = new Error("PARTNER_API_KEY is not configured on the server.");
    err.statusCode = 500;
    throw err;
  }

  const payload = {
    action: "enrollment_start",
    brand_slug: env.brandSlug,
    portal_origin: env.portalOrigin,
    return_url: body.return_url || env.returnUrl,
    ...(body.category ? { category: mapCategory(body.category) } : {}),
    ...(body.product_id ? { product_id: body.product_id } : {}),
  };

  const res = await fetch(env.apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Partner-Api-Key": env.apiKey,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { error: text || "Invalid JSON from Partner API" };
  }

  if (!res.ok) {
    const err = new Error(
      data.error || data.message || `Partner API error (${res.status})`,
    );
    err.statusCode = res.status;
    err.details = data;
    throw err;
  }

  if (!data.enrollment_url) {
    const err = new Error("Partner API response missing enrollment_url");
    err.statusCode = 502;
    err.details = data;
    throw err;
  }

  return data;
}
