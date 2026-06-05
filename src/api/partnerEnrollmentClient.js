const PARTNER_API_BASE =
  import.meta.env.VITE_PARTNER_API_BASE ||
  "https://kvopgyhcjcniaocjozje.supabase.co/functions/v1/partner-api";
const PARTNER_BRAND_SLUG = (import.meta.env.VITE_PARTNER_BRAND_SLUG || "").trim();
const PARTNER_API_KEY = (import.meta.env.VITE_PARTNER_API_KEY || "").trim();
const PARTNER_ENROLLMENT_ENDPOINT = (import.meta.env.VITE_PARTNER_ENROLLMENT_ENDPOINT || "").trim();
const PARTNER_PORTAL_ORIGIN = (import.meta.env.VITE_PARTNER_PORTAL_ORIGIN || "").trim();
const PARTNER_RETURN_URL = (import.meta.env.VITE_PARTNER_RETURN_URL || "").trim();
const PRODUCT_MAP_JSON = (import.meta.env.VITE_PARTNER_PRODUCT_MAP_JSON || "").trim();

function parseProductMap() {
  if (!PRODUCT_MAP_JSON) return {};
  try {
    const map = JSON.parse(PRODUCT_MAP_JSON);
    return typeof map === "object" && map ? map : {};
  } catch {
    return {};
  }
}

const PRODUCT_ID_MAP = parseProductMap();

export function partnerDocsLinks() {
  const base = PARTNER_API_BASE.replace(/\/$/, "");
  return {
    docsUi: `${base}?action=docs_ui`,
    openApi: `${base}?action=openapi`,
    connect: PARTNER_BRAND_SLUG
      ? `${base}?action=connect&brand_slug=${encodeURIComponent(PARTNER_BRAND_SLUG)}`
      : null,
  };
}

function resolveProductId(product) {
  if (!product?.id) return undefined;
  const mapped = PRODUCT_ID_MAP[product.id];
  return mapped && String(mapped).trim() ? String(mapped).trim() : undefined;
}

export async function startPartnerEnrollment({ product, category }) {
  if (!PARTNER_BRAND_SLUG) {
    throw new Error("Partner enrollment not configured: missing VITE_PARTNER_BRAND_SLUG.");
  }

  const payload = {
    action: "enrollment_start",
    brand_slug: PARTNER_BRAND_SLUG,
    ...(category ? { category } : {}),
    ...(resolveProductId(product) ? { product_id: resolveProductId(product) } : {}),
    ...(PARTNER_PORTAL_ORIGIN ? { portal_origin: PARTNER_PORTAL_ORIGIN } : {}),
    ...(PARTNER_RETURN_URL ? { return_url: PARTNER_RETURN_URL } : {}),
  };

  const endpoint = PARTNER_ENROLLMENT_ENDPOINT || PARTNER_API_BASE;
  const headers = { "Content-Type": "application/json" };

  // Preferred production pattern: call your own backend endpoint.
  if (!PARTNER_ENROLLMENT_ENDPOINT && PARTNER_API_KEY) {
    headers["X-Partner-Api-Key"] = PARTNER_API_KEY;
  }
  if (!PARTNER_ENROLLMENT_ENDPOINT && !PARTNER_API_KEY) {
    throw new Error(
      "Partner enrollment not configured: set VITE_PARTNER_ENROLLMENT_ENDPOINT (preferred) or VITE_PARTNER_API_KEY for local testing.",
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { error: text || "Unknown response" };
  }

  if (!res.ok) {
    throw new Error(data.error || data.message || `Enrollment start failed (${res.status}).`);
  }
  if (!data.enrollment_url) {
    throw new Error("Enrollment response missing enrollment_url.");
  }
  return data;
}
