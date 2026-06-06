# SummitMD ↔ Peak Health Partner API

Marketing site: [summitmd.vercel.app](https://summitmd.vercel.app/)  
Peak enrollment: `https://www.peak-health.io/care/summit-md/shop`

## Architecture

1. User clicks **Secure Treatment Plan & Checkout** on SummitMD shop.
2. Browser `POST`s `/api/enroll-start` (this repo — **no API key in browser**).
3. Vercel function calls Peak `partner-api` with `X-Partner-Api-Key`.
4. Browser redirects to `enrollment_url` (Peak white-label shop).

## One-time (Peak / Supabase)

1. SQL already run: `summit-md` brand + API key in Supabase.
2. Deploy Partner API edge function (if health returns 404):

```bash
cd path/to/peak-health/telehealth
supabase login
npx supabase functions deploy partner-api --project-ref vzzmdbdvcofajgrjgajq
```

3. Swagger UI:  
   `https://vzzmdbdvcofajgrjgajq.supabase.co/functions/v1/partner-api?action=docs_ui`

## Vercel env vars (summitmd project)

| Variable | Value |
|----------|--------|
| `PARTNER_API_KEY` | `pk_live_sm_…` (from Supabase SQL reveal — **server only**) |
| `PARTNER_BRAND_SLUG` | `summit-md` |
| `PARTNER_API_URL` | `https://vzzmdbdvcofajgrjgajq.supabase.co/functions/v1/partner-api` |
| `PARTNER_PORTAL_ORIGIN` | `https://www.peak-health.io` |
| `PARTNER_RETURN_URL` | `https://summitmd.vercel.app/shop` |

Frontend (Vite build — safe to expose):

| Variable | Value |
|----------|--------|
| `VITE_PARTNER_BRAND_SLUG` | `summit-md` |
| `VITE_PARTNER_ENROLLMENT_ENDPOINT` | `/api/enroll-start` |
| `VITE_PARTNER_PORTAL_ORIGIN` | `https://www.peak-health.io` |
| `VITE_PARTNER_RETURN_URL` | `https://summitmd.vercel.app/shop` |

**Never** set `VITE_PARTNER_API_KEY` in production.

## Local dev

```bash
cp .env.partner.example .env.local
# Edit .env.local — add PARTNER_API_KEY for dev middleware + test script

npm install
npm run dev
```

Shop checkout calls `/api/enroll-start` via Vite dev middleware (same logic as Vercel).

## Test

```bash
PARTNER_API_KEY=pk_live_sm_… npm run test:partner
```

## Product ID mapping (optional)

Map SummitMD product ids → Peak product UUIDs in Vercel:

```env
VITE_PARTNER_PRODUCT_MAP_JSON={"weightloss_semaglutide":"<peak-product-uuid>"}
```
