import i18n from "i18next";

export function localizedPath(slug = "") {
  const lang = (i18n.language || "en").toLowerCase();
  const code = ["en", "cz", "de"].includes(lang) ? lang : "en";
  if (!slug) return `/${code}`;
  return `/${code}/${slug.replace(/^\//, "")}`;
}