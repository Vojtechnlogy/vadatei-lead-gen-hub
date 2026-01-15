import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LOCALES_DIR = path.join(ROOT, "src", "locales");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function mergeFromEn(enValue, targetValue, missingPaths, currentPath) {
  // If target is missing/null/empty string, copy EN.
  if (targetValue === undefined || targetValue === null || targetValue === "") {
    missingPaths.push(currentPath);
    return structuredClone(enValue);
  }

  // Arrays: if target is not array, replace; else merge per-index for object arrays.
  if (Array.isArray(enValue)) {
    if (!Array.isArray(targetValue)) {
      missingPaths.push(currentPath);
      return structuredClone(enValue);
    }

    // Prefer preserving existing target entries.
    const result = targetValue.slice();
    for (let i = 0; i < enValue.length; i++) {
      const nextPath = `${currentPath}[${i}]`;
      if (result[i] === undefined) {
        missingPaths.push(nextPath);
        result[i] = structuredClone(enValue[i]);
        continue;
      }
      if (isPlainObject(enValue[i]) && isPlainObject(result[i])) {
        result[i] = mergeFromEn(enValue[i], result[i], missingPaths, nextPath);
      }
    }
    return result;
  }

  // Objects: deep merge.
  if (isPlainObject(enValue)) {
    if (!isPlainObject(targetValue)) {
      missingPaths.push(currentPath);
      return structuredClone(enValue);
    }

    const result = { ...targetValue };
    for (const [key, childEn] of Object.entries(enValue)) {
      const nextPath = currentPath ? `${currentPath}.${key}` : key;
      if (!(key in result)) {
        missingPaths.push(nextPath);
        result[key] = structuredClone(childEn);
        continue;
      }
      result[key] = mergeFromEn(childEn, result[key], missingPaths, nextPath);
    }
    return result;
  }

  // Primitive: keep target.
  return targetValue;
}

function syncLocale(locale) {
  const enPath = path.join(LOCALES_DIR, "en", "translation.json");
  const targetPath = path.join(LOCALES_DIR, locale, "translation.json");

  const enJson = readJson(enPath);
  const targetJson = readJson(targetPath);

  const missingPaths = [];
  const merged = mergeFromEn(enJson, targetJson, missingPaths, "");

  fs.writeFileSync(targetPath, JSON.stringify(merged, null, 2) + "\n", "utf8");

  return { locale, count: missingPaths.length, sample: missingPaths.slice(0, 20) };
}

function main() {
  const locales = process.argv.slice(2);
  const targets = locales.length > 0 ? locales : ["cz", "de"];

  const reports = targets.map(syncLocale);
  for (const r of reports) {
    console.log(`[sync-locales] ${r.locale}: filled ${r.count} missing values/keys`);
    if (r.sample.length) console.log("  sample:", r.sample.join(", "));
  }
}

main();
