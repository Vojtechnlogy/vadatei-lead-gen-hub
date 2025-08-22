import i18n from "i18next";

export function localizedPath(slug = "") {
  const lang = (i18n.language || "en").toLowerCase();

  // map known variants to the URL segment you want (use "cz" for Czech)
  const map: Record<string, string> = { cs: "cz" };
  const normalized = map[lang] ?? lang;

  const code = ["en", "cz", "de"].includes(normalized) ? normalized : "en";

  if (!slug) return `/${code}`;
  const cleanSlug = slug.replace(/^\//, "");
  return `/${code}/${cleanSlug}`;
}