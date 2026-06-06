/**
 * Test SummitMD → Peak Partner API (server-side key).
 *
 *   PARTNER_API_KEY=pk_live_sm_… node scripts/test-partner-enrollment.mjs
 */
import { proxyEnrollmentStart, partnerEnv } from "../api/lib/partnerProxy.js";

async function main() {
  const env = partnerEnv();
  console.log("Partner API URL:", env.apiUrl);
  console.log("Brand slug:     ", env.brandSlug);
  console.log("Portal origin:  ", env.portalOrigin);
  console.log("API key set:    ", env.apiKey ? `${env.apiKey.slice(0, 16)}…` : "NO");

  if (!env.apiKey) {
    console.error("\nSet PARTNER_API_KEY in env or Vercel project settings.");
    process.exit(1);
  }

  const health = await fetch(`${env.apiUrl}?action=health`);
  const healthJson = await health.json().catch(() => ({}));
  console.log("\nHealth:", health.status, healthJson);

  if (!health.ok) {
    console.error(
      "\npartner-api is not deployed. From peak-health repo run:\n" +
        "  supabase login\n" +
        "  npx supabase functions deploy partner-api --project-ref vzzmdbdvcofajgrjgajq\n",
    );
    process.exit(1);
  }

  const data = await proxyEnrollmentStart({ category: "weight-loss" });
  console.log("\nEnrollment OK:");
  console.log("  session_id:", data.session_id);
  console.log("  enrollment_url:", data.enrollment_url);
  console.log("\nOpen enrollment_url in a browser to verify Peak shop handoff.");
}

main().catch((e) => {
  console.error("\nFAIL:", e.message);
  if (e.details) console.error(JSON.stringify(e.details, null, 2));
  process.exit(1);
});
