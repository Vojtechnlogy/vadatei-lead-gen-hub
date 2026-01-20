import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = "https://vadatei.com";
const LANGS = ["en", "cz", "de"];
const OUT_DIR = path.resolve(__dirname, "..", "public");
const OUT_FILE = path.join(OUT_DIR, "sitemap.xml");

// Keep this list in sync with `src/routes/LocalizedRoutes.tsx`.
const ROUTES = [
  "", // home
  "/privacy-policy",
  "/services/transformation-blueprint",
  "/services/transformation-execution",
  "/services/transformation-leadership",
];

function formatUrl(loc, lastmod, changefreq = "monthly", priority = "0.8") {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
}

function buildSitemap() {
  const lastmodToday = new Date().toISOString().split("T")[0];

  const urlEntries = [];
  for (const lang of LANGS) {
    for (const route of ROUTES) {
      const loc = route ? `${DOMAIN}/${lang}${route}` : `${DOMAIN}/${lang}/`;
      const depth = route.split("/").filter(Boolean).length;
      const priority = depth === 0 ? "1.0" : depth === 1 ? "0.8" : "0.6";
      const changefreq = depth === 0 ? "weekly" : "monthly";
      urlEntries.push(formatUrl(loc, lastmodToday, changefreq, priority));
    }
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlEntries,
    "</urlset>",
  ].join("\n");

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, xml, "utf8");
  console.log("Wrote sitemap:", OUT_FILE);
}

buildSitemap();