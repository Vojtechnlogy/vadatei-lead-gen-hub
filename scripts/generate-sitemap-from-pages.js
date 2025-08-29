import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = "https://www.vadatei.com"; // Replace with your domain
const LANGS = ["en", "cz", "de"];
const PAGES_DIR = path.resolve(__dirname, "..", "src", "pages");
const OUT_DIR = path.resolve(__dirname, "..", "public");
const OUT_FILE = path.join(OUT_DIR, "sitemap.xml");

function slugifyName(name) {
  const noExt = name.replace(/\.[^/.]+$/, "");
  if (/^Index$/i.test(noExt)) return "";
  return noExt
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .replace(/[^\w-]/g, "")
    .toLowerCase();
}

function walk(dir, base = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes = [];

  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      const nestedBase = path.join(base, ent.name);
      routes = routes.concat(walk(full, nestedBase));
    } else {
      if (!/\.(tsx|jsx|ts|js)$/.test(ent.name)) continue;
      if (/^\[.*\]$/.test(ent.name) || ent.name.startsWith("_")) continue;

      const parts = base ? base.split(path.sep) : [];
      const fileSlug = slugifyName(ent.name);
      const folderParts = parts
        .map(p =>
          p.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").toLowerCase()
        )
        .filter(Boolean);

      const allParts = folderParts.slice();
      if (fileSlug) allParts.push(fileSlug);
      const route = "/" + allParts.map(p => p.replace(/\\/g, "/")).filter(Boolean).join("/");
      routes.push({
        route: route === "/" ? "" : route,
        file: full,
      });
    }
  }
  return routes;
}

function formatUrl(loc, lastmod, changefreq = "monthly", priority = "0.8") {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
}

function buildSitemap() {
  if (!fs.existsSync(PAGES_DIR)) {
    console.error("Pages directory not found:", PAGES_DIR);
    process.exit(1);
  }
  const pages = walk(PAGES_DIR);
  const seen = new Set();
  const unique = pages.filter(p => {
    const key = p.route || "/";
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const lastmodToday = new Date().toISOString().split("T")[0];

  const urlEntries = [];
  for (const lang of LANGS) {
    for (const p of unique) {
      const slugPath = p.route || "";
      const loc = slugPath ? `${DOMAIN}/${lang}${slugPath}` : `${DOMAIN}/${lang}/`;
      const depth = slugPath.split("/").filter(Boolean).length;
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