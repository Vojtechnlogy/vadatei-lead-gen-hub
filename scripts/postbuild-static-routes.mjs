import fs from "fs";
import path from "path";

const lang = process.argv[2];
if (!lang) {
  console.error("Usage: node scripts/postbuild-static-routes.mjs <lang>");
  process.exit(1);
}

const root = process.cwd();
const distLangDir = path.join(root, "dist", lang);
const distIndex = path.join(distLangDir, "index.html");
const transFile = path.join(root, "src", "locales", lang, "translation.json");

if (!fs.existsSync(distIndex)) {
  console.error("Built index.html not found:", distIndex);
  process.exit(1);
}
if (!fs.existsSync(transFile)) {
  console.error("Translation file not found:", transFile);
  process.exit(1);
}

const tr = JSON.parse(fs.readFileSync(transFile, "utf8"));
const baseHtml = fs.readFileSync(distIndex, "utf8");

const toBcp47 = (maybe) => {
  const v = String(maybe || lang).toLowerCase();
  return v === "cz" ? "cs" : v;
};

function get(obj, dottedPath, fallback = "") {
  const parts = dottedPath.split(".");
  let cur = obj;
  for (const p of parts) {
    if (!cur || typeof cur !== "object" || !(p in cur)) return fallback;
    cur = cur[p];
  }
  return typeof cur === "string" ? cur : fallback;
}

function applyMeta(html, { title, description, ogImage, url, htmlLang }) {
  let out = html;

  // Ensure <html lang="...">
  out = out.replace(/<html([^>]*)>/i, (m, attrs) => {
    if (/\blang=/.test(attrs)) return `<html${attrs.replace(/lang="[^"]*"/i, `lang="${htmlLang}"`)}>`;
    return `<html${attrs} lang="${htmlLang}">`;
  });

  // Title
  const safeTitle = String(title || "").replace(/"/g, "&quot;");
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);

  // Remove existing description/OG/Twitter/canonical tags (we'll re-add consistent ones)
  out = out
    .replace(/<meta[^>]+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<meta[^>]+property=["']og:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<meta[^>]+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>\s*/gi, "");

  const safeDesc = String(description || "").replace(/"/g, "&quot;");
  const safeImg = String(ogImage || "").replace(/"/g, "&quot;");
  const safeUrl = String(url || "").replace(/"/g, "&quot;");

  const tags = [
    `<meta name="description" content="${safeDesc}">`,
    `<meta property="og:title" content="${safeTitle}">`,
    `<meta property="og:description" content="${safeDesc}">`,
    `<meta property="og:image" content="${safeImg}">`,
    `<meta property="og:url" content="${safeUrl}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:site" content="@vadatei">`,
    `<meta name="twitter:image" content="${safeImg}">`,
    `<link rel="canonical" href="${safeUrl}">`,
  ].join("\n  ");

  out = out.replace(/<\/head>/i, `  ${tags}\n</head>`);
  return out;
}

const DOMAIN = "https://vadatei.com";
const htmlLang = toBcp47(get(tr, "lang", lang));
const ogImage = get(tr, "ogImage", get(tr, "meta.ogImage", "https://vadatei.com/assets/digital-transformation.jpg"));

const routes = [
  {
    // Directory URL for static hosting; React Router will render the right view
    path: "privacy-policy",
    title: `${get(tr, "organization.name", "Vadatei")} - ${get(tr, "privacy.title", "Privacy Policy")}`,
    description: get(tr, "meta.description", get(tr, "description", "")),
  },
  {
    path: "services/transformation-blueprint",
    title: `${get(tr, "services.diagnostic-deep-dive.title", "Transformation Blueprint")} | ${get(tr, "organization.name", "Vadatei")}`,
    description:
      get(tr, "services.diagnostic-deep-dive.subtitle", "") ||
      get(tr, "services.diagnostic-deep-dive.description", "") ||
      get(tr, "meta.description", get(tr, "description", "")),
  },
  {
    path: "services/transformation-execution",
    title: `${get(tr, "services.targeted-transformation.title", "Transformation Execution")} | ${get(tr, "organization.name", "Vadatei")}`,
    description:
      get(tr, "services.targeted-transformation.subtitle", "") ||
      get(tr, "services.targeted-transformation.description", "") ||
      get(tr, "meta.description", get(tr, "description", "")),
  },
  {
    path: "services/transformation-leadership",
    title: `${get(tr, "services.extended-oversight.title", "Transformation Leadership")} | ${get(tr, "organization.name", "Vadatei")}`,
    description:
      get(tr, "services.extended-oversight.subtitle", "") ||
      get(tr, "services.extended-oversight.description", "") ||
      get(tr, "meta.description", get(tr, "description", "")),
  },
];

for (const r of routes) {
  const outDir = path.join(distLangDir, ...r.path.split("/"));
  fs.mkdirSync(outDir, { recursive: true });

  const url = `${DOMAIN}/${lang}/${r.path}`;
  const html = applyMeta(baseHtml, {
    title: r.title,
    description: r.description,
    ogImage,
    url,
    htmlLang,
  });

  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
}

console.log(`Generated static route HTML for ${lang}: ${routes.map(r => r.path).join(", ")}`);
