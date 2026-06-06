import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { proxyEnrollmentStart } from "./api/lib/partnerProxy.js";

function partnerEnrollDevPlugin(mode) {
  return {
    name: "summitmd-partner-enroll-dev",
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), "");
      process.env.PARTNER_API_KEY =
        process.env.PARTNER_API_KEY || env.PARTNER_API_KEY || "";
      process.env.PARTNER_API_URL =
        process.env.PARTNER_API_URL || env.PARTNER_API_URL || "";
      process.env.PARTNER_BRAND_SLUG =
        process.env.PARTNER_BRAND_SLUG || env.PARTNER_BRAND_SLUG || "summit-md";
      process.env.PARTNER_PORTAL_ORIGIN =
        process.env.PARTNER_PORTAL_ORIGIN ||
        env.PARTNER_PORTAL_ORIGIN ||
        "https://www.peak-health.io";
      process.env.PARTNER_RETURN_URL =
        process.env.PARTNER_RETURN_URL ||
        env.PARTNER_RETURN_URL ||
        "http://localhost:3000/shop";

      server.middlewares.use("/api/enroll-start", async (req, res) => {
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        const chunks = [];
        req.on("data", (c) => chunks.push(c));
        req.on("end", async () => {
          let body = {};
          try {
            const raw = Buffer.concat(chunks).toString("utf8");
            body = raw ? JSON.parse(raw) : {};
          } catch {
            body = {};
          }

          try {
            const data = await proxyEnrollmentStart(body);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
          } catch (err) {
            res.statusCode = err.statusCode || 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: err.message || "Enrollment proxy failed",
                ...(err.details ? { details: err.details } : {}),
              }),
            );
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), partnerEnrollDevPlugin(mode)],
  server: {
    port: 3000,
    open: true,
  },
}));
