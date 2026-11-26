import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicRoot = resolve(root, "public");
const distRoot = resolve(root, "dist");
const policyPairs = [
  ["privacy.html", "privacy-en.html"],
  ["cookies.html", "cookies-en.html"],
  ["terms.html", "terms-en.html"],
  ["accessibility.html", "accessibility-en.html"]
];

for (const [esFile, enFile] of policyPairs) {
  for (const file of [esFile, enFile]) {
    assert.ok(existsSync(resolve(publicRoot, file)), `missing source policy page: ${file}`);
    assert.ok(existsSync(resolve(distRoot, file)), `missing built policy page: ${file}`);
  }

  const es = readFileSync(resolve(distRoot, esFile), "utf8");
  const en = readFileSync(resolve(distRoot, enFile), "utf8");
  assert.match(es, /<html lang="es">/, `${esFile} must declare Spanish`);
  assert.doesNotMatch(es, /lang="en"/, `${esFile} must not expose English fallback cards`);
  assert.match(en, /<html lang="en">/, `${enFile} must declare English`);
  assert.doesNotMatch(en, /lang="es"/, `${enFile} must not expose Spanish fallback cards`);
  assert.doesNotMatch(es, /Effective status|Confirmed behavior|Rights requests|Privacy status|Terms &amp; demo limits|Accessibility status/, `${esFile} must keep English policy copy out of the Spanish page`);
  assert.match(es, new RegExp(`href="\\./${enFile}#en"`), `${esFile} must link to its English page`);
  assert.match(en, new RegExp(`href="\\./${esFile}#es"`), `${enFile} must link to its Spanish page`);
  assert.match(en, /<h1>[^<]*(Privacy|Cookies|Terms|Accessibility)/, `${enFile} needs an English heading`);
}

for (const file of ["index.html", ...policyPairs.flat()]) {
  const html = readFileSync(resolve(distRoot, file), "utf8");
  assert.doesNotMatch(html, /href="\.\/(privacy|cookies|terms|accessibility)(?:\?|#)/, `${file} must not use query-only language switching for legal pages`);
}

const bundleName = readdirSync(resolve(distRoot, "assets")).find((name) => name.endsWith(".js"));
assert.ok(bundleName, "built JavaScript bundle missing");
const bundle = readFileSync(resolve(distRoot, "assets", bundleName), "utf8");
assert.doesNotMatch(bundle, /\/privacy(?:"|[?`])|\/cookies(?:"|[?`])|\/terms(?:"|[?`])|\/accessibility(?:"|[?`])|\/support(?:"|[?`])|\/privacy_policy(?:"|[?`])/, "runtime must use real static policy paths");
console.log("Rainbow static policy language PASS");
