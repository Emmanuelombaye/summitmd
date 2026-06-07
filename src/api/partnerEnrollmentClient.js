import { mapPartnerCategory } from "../lib/partnerCategoryMap.js";

const DEFAULT_PARTNER_API =
  "https://vzzmdbdvcofajgrjgajq.supabase.co/functions/v1/partner-api";

const PARTNER_API_BASE = (
  import.meta.env.VITE_PARTNER_API_BASE || DEFAULT_PARTNER_API
).replace(/\/$/, "");

const PARTNER_BRAND_SLUG = (
  import.meta.env.VITE_PARTNER_BRAND_SLUG || "summit-md"
).trim();

/** Production: always use server proxy. Dev: .env.local or same proxy via Vite. */
const PARTNER_ENROLLMENT_ENDPOINT = (
  import.meta.env.VITE_PARTNER_ENROLLMENT_ENDPOINT || "/api/enroll-start"
).trim();

const PARTNER_API_KEY = (import.meta.env.VITE_PARTNER_API_KEY || "").trim();
const PARTNER_PORTAL_ORIGIN = (
  import.meta.env.VITE_PARTNER_PORTAL_ORIGIN || "https://www.peak-health.io"
).trim();
const PARTNER_RETURN_URL = (import.meta.env.VITE_PARTNER_RETURN_URL || "").trim();
const PRODUCT_MAP_JSON = (import.meta.env.VITE_PARTNER_PRODUCT_MAP_JSON || "").trim();
const PARTNER_BRAND_ID = (
  import.meta.env.VITE_PARTNER_BRAND_ID || "7caaa526-185e-4eda-bf0e-832be6ba37a7"
).trim();

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
  return {
    docsUi: `${PARTNER_API_BASE}?action=docs_ui`,
    openApi: `${PARTNER_API_BASE}?action=openapi`,
    connect: `${PARTNER_API_BASE}?action=connect&brand_slug=${encodeURIComponent(PARTNER_BRAND_SLUG)}`,
    brandSlug: PARTNER_BRAND_SLUG,
  };
}

export function getPatientPortalLoginUrl(extraParams = {}) {
  const origin = PARTNER_PORTAL_ORIGIN.replace(/\/$/, "");
  const slug = PARTNER_BRAND_SLUG;
  const params = new URLSearchParams({
    brand: slug,
    brandId: PARTNER_BRAND_ID,
    ...extraParams,
  });
  const qs = params.toString();
  return `${origin}/care/${slug}/login${qs ? `?${qs}` : ""}`;
}

export function getPatientPortalUrl() {
  const origin = PARTNER_PORTAL_ORIGIN.replace(/\/$/, "");
  return `${origin}/care/${PARTNER_BRAND_SLUG}/patient`;
}

function resolveProductId(product) {
  if (!product?.id) return undefined;
  const mapped = PRODUCT_ID_MAP[product.id];
  return mapped && String(mapped).trim() ? String(mapped).trim() : undefined;
}

export async function startPartnerEnrollment({ product, category }) {
  const payload = {
    ...(category ? { category } : {}),
    ...(resolveProductId(product) ? { product_id: resolveProductId(product) } : {}),
    ...(PARTNER_RETURN_URL ? { return_url: PARTNER_RETURN_URL } : {}),
  };

  const endpoint = PARTNER_ENROLLMENT_ENDPOINT;
  const headers = { "Content-Type": "application/json" };

  // Direct API + key — local-only fallback (never in production builds)
  const useDirectApi =
    endpoint === PARTNER_API_BASE ||
    (!PARTNER_ENROLLMENT_ENDPOINT.includes("/api/") && PARTNER_API_KEY);

  if (useDirectApi) {
    if (!PARTNER_API_KEY) {
      throw new Error(
        "Set PARTNER_API_KEY in .env.local for direct API mode, or use /api/enroll-start.",
      );
    }
    headers["X-Partner-Api-Key"] = PARTNER_API_KEY;
    Object.assign(payload, {
      action: "enrollment_start",
      brand_slug: PARTNER_BRAND_SLUG,
      ...(PARTNER_PORTAL_ORIGIN ? { portal_origin: PARTNER_PORTAL_ORIGIN } : {}),
    });
  }

  const res = await fetch(useDirectApi ? PARTNER_API_BASE : endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(
      useDirectApi
        ? payload
        : payload,
    ),
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

/** Login handoff — product already chosen on SummitMD shop; skip Peak product catalog. */
export function buildPatientLoginHandoff({ product, category } = {}) {
  const params = {};
  const productId = resolveProductId(product);
  if (productId) params.productId = productId;
  const mappedCategory = mapPartnerCategory(category || product?.category);
  if (mappedCategory) params.category = mappedCategory;
  // After auth, land in patient app — not shop/products again
  params.redirect = `/care/${PARTNER_BRAND_SLUG}/patient`;

  const loginUrl = getPatientPortalLoginUrl(params);

  return {
    login_url: loginUrl,
    patient_login_url: loginUrl,
    patient_portal_url: getPatientPortalUrl(),
    direct_handoff: true,
  };
}

/** @deprecated Use buildPatientLoginHandoff — Summit selects products on marketing site. */
export function buildDirectPeakHandoff({ product, category } = {}) {
  return buildPatientLoginHandoff({ product, category });
}

/**
 * Resolve handoff after Summit intake. Always sends patient to branded login —
 * not back through Peak shop/product catalog.
 */
export async function resolvePartnerEnrollment({ product, category }) {
  const loginHandoff = buildPatientLoginHandoff({ product, category });

  try {
    await startPartnerEnrollment({ product, category });
    return {
      ...loginHandoff,
      direct_handoff: false,
    };
  } catch (err) {
    return {
      ...loginHandoff,
      handoff_error: err.message || "Partner enrollment unavailable",
    };
  }
}
