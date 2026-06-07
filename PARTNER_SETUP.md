# SummitMD ↔ Peak Health Partner API

**Marketing site:** [summitmd.vercel.app](https://summitmd.vercel.app/)  
**Peak enrollment:** `https://www.peak-health.io/care/summit-md/shop`  
**Brand slug:** `summit-md` · **Brand UUID:** `7caaa526-185e-4eda-bf0e-832be6ba37a7`

> **Frontend developers:** read the full checklist in Peak repo [`docs/partners/SUMMIT_MD_FRONTEND.md`](https://github.com/Emmanuelombaye/telehealth/blob/main/docs/partners/SUMMIT_MD_FRONTEND.md) (or the **Frontend checklist** section below).

---

## Frontend checklist (do this first)

| ✓ | Task | Where |
|---|------|--------|
| ☐ | Checkout button calls **server**, not Peak API | `src/components/public/ShopPage.jsx` |
| ☐ | Use `startPartnerEnrollment()` | `src/api/partnerEnrollmentClient.js` |
| ☐ | Set `VITE_*` env vars in Vercel (no API key) | See table below |
| ☐ | Set `PARTNER_API_KEY` server-only in Vercel | See table below |
| ☐ | `vercel.json` excludes `/api/*` from SPA rewrite | Already configured |
| ☐ | Test: shop → **Secure Treatment Plan & Checkout** → Peak shop URL | [summitmd.vercel.app/shop](https://summitmd.vercel.app/shop) |

### Flow

```
Browser  →  POST /api/enroll-start  →  api/enroll-start.js  →  Peak partner-api
                ↑                              ↑
           no API key                    PARTNER_API_KEY
```

### Frontend code (already wired)

```javascript
// ShopPage.jsx — on checkout:
import { startPartnerEnrollment } from "../../api/partnerEnrollmentClient";

const result = await startPartnerEnrollment({
  product: quizRecommendation,
  category: quizRecommendation.category,
});
window.location.assign(result.enrollment_url);
```

### What the browser sends

```http
POST /api/enroll-start
Content-Type: application/json

{ "category": "subscriptions", "return_url": "https://summitmd.vercel.app/shop" }
```

### What the browser gets back

```json
{ "enrollment_url": "https://www.peak-health.io/care/summit-md/shop?brand=summit-md&brandId=…" }
```

**Never** set `VITE_PARTNER_API_KEY` in production.

---

## Environment variables

### Vercel — frontend (safe, prefix `VITE_`)

| Variable | Value |
|----------|--------|
| `VITE_PARTNER_BRAND_SLUG` | `summit-md` |
| `VITE_PARTNER_ENROLLMENT_ENDPOINT` | `/api/enroll-start` |
| `VITE_PARTNER_PORTAL_ORIGIN` | `https://www.peak-health.io` |
| `VITE_PARTNER_RETURN_URL` | `https://summitmd.vercel.app/shop` |

Optional product id → Peak UUID map:

```env
VITE_PARTNER_PRODUCT_MAP_JSON={"weightloss_semaglutide":"<peak-product-uuid>"}
```

### Vercel — server only (no `VITE_` prefix)

| Variable | Value |
|----------|--------|
| `PARTNER_API_KEY` | `pk_live_sm_…` (from Supabase SQL reveal) — **required to remove 500 on `/api/enroll-start`** |
| `PARTNER_BRAND_SLUG` | `summit-md` |
| `PARTNER_API_URL` | `https://vzzmdbdvcofajgrjgajq.supabase.co/functions/v1/partner-api` |
| `PARTNER_PORTAL_ORIGIN` | `https://www.peak-health.io` |
| `PARTNER_RETURN_URL` | `https://summitmd.vercel.app/shop` |

---

## File map

| File | Role |
|------|------|
| `src/api/partnerEnrollmentClient.js` | Frontend — POST `/api/enroll-start` |
| `src/components/public/ShopPage.jsx` | Checkout button + redirect |
| `api/enroll-start.js` | Vercel serverless route |
| `api/lib/partnerProxy.js` | Server proxy + category mapping |
| `vite.config.js` | Dev middleware for local `/api/enroll-start` |
| `.env.partner.example` | Copy to `.env.local` |

### Category mapping (server-side)

Summit shop tabs → Peak categories in `api/lib/partnerProxy.js`:

| Summit | Peak |
|--------|------|
| `subscriptions` | `weight-loss` |
| `nutrition`, `wellness`, `devices`, `maternal` | `longevity` |

---

## One-time (Peak / Supabase — backend team)

1. SQL: `RUN_IN_SUPABASE_SUMMITMD_PARTNER.sql` in Peak telehealth repo.
2. Deploy Partner API edge function (if health returns 404):

```bash
cd path/to/telehealth
supabase login
npx supabase functions deploy partner-api --project-ref vzzmdbdvcofajgrjgajq
```

3. **Swagger UI:**  
   `https://vzzmdbdvcofajgrjgajq.supabase.co/functions/v1/partner-api?action=docs_ui`

---

## Local dev

```bash
cp .env.partner.example .env.local
# Add PARTNER_API_KEY to .env.local

npm install
npm run dev
```

Shop checkout uses Vite dev middleware for `/api/enroll-start` (same logic as Vercel).

---

## Test

```bash
PARTNER_API_KEY=pk_live_sm_… npm run test:partner
```

Manual: complete shop quiz → **Secure Treatment Plan & Checkout** → URL should be `peak-health.io/care/summit-md/shop?…`

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Falls back to local cart | Check Network tab on `POST /api/enroll-start` |
| `500` on enroll | `PARTNER_API_KEY` missing in Vercel server env |
| Partner API `404` | Deploy `partner-api` edge function |
| API key in browser bundle | Remove `VITE_PARTNER_API_KEY` from production |
