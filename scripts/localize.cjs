const fs = require("fs");
const path = require("path");

const lang = process.argv[2];
if (!lang) {
  console.error("Usage: node scripts/localize.cjs <lang>");
  process.exit(1);
}

const root = process.cwd();
const distIndex = path.join(root, "dist", lang, "index.html");
const transFile = path.join(root, "src", "locales", lang, "translation.json");

if (!fs.existsSync(distIndex)) {
  console.error("Built index.html not found:", distIndex);
  process.exit(1);
}
if (!fs.existsSync(transFile)) {
  console.error("Translation file not found:", transFile);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(transFile, "utf8"));
let html = fs.readFileSync(distIndex, "utf8");

// set html lang (use meta.lang or the folder)
const langVal = meta.lang || lang;
html = html.replace(/<html([^>]*)>/i, (m, attrs) => {
  if (/lang=/.test(attrs)) return `<html${attrs.replace(/lang="[^"]*"/i, `lang="${langVal}"`)}>`;
  return `<html${attrs} lang="${langVal}">`;
});

// set title
const title = (meta.title || "").replace(/"/g, "&quot;");
html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

// remove existing description/og/canonical tags
html = html
  .replace(/<meta[^>]+name=["']description["'][^>]*>\s*/gi, "")
  .replace(/<meta[^>]+property=["']og:[^"']+["'][^>]*>\s*/gi, "")
  .replace(/<link[^>]+rel=["']canonical["'][^>]*>\s*/gi, "");

// build new tags
const description = (meta.description || "").replace(/"/g, "&quot;");
const ogImage = (meta.ogImage || "").replace(/"/g, "&quot;");
const url = (meta.url || `https://vadatei.com/${lang}/`).replace(/"/g, "&quot;");

const tags = [
  `<meta name="description" content="${description}">`,
  `<meta property="og:title" content="${title}">`,
  `<meta property="og:description" content="${description}">`,
  `<meta property="og:image" content="${ogImage}">`,
  `<meta property="og:url" content="${url}">`,
  `<meta name="twitter:card" content="summary_large_image">`,
  `<link rel="canonical" href="${url}">`
].join("\n  ");

html = html.replace(/<\/head>/i, `  ${tags}\n</head>`);
fs.writeFileSync(distIndex, html, "utf8");
console.log("Localized:", distIndex);