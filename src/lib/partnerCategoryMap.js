/** SummitMD shop category → Peak enrollment category slug */
export const PARTNER_CATEGORY_MAP = {
  subscriptions: "weight-loss",
  nutrition: "longevity",
  wellness: "longevity",
  devices: "longevity",
  maternal: "longevity",
};

export function mapPartnerCategory(raw) {
  if (!raw || typeof raw !== "string") return undefined;
  const key = raw.trim().toLowerCase();
  return PARTNER_CATEGORY_MAP[key] || key;
}
