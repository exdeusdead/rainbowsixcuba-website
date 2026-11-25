import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceCss = fs.readFileSync(path.join(root, "src", "styles.css"), "utf8");
const legacyCss = fs.readFileSync(path.join(root, "public", "shared-page.css"), "utf8");
const sourceStart = sourceCss.indexOf("/* RAINBOW_TYPE_SCALE_START */");
const sourceEnd = sourceCss.indexOf("/* RAINBOW_TYPE_SCALE_END */");
const legacyStart = legacyCss.indexOf("/* RAINBOW_LEGACY_TYPE_SCALE_START */");
const legacyEnd = legacyCss.indexOf("/* RAINBOW_LEGACY_TYPE_SCALE_END */");

assert.ok(sourceStart >= 0 && sourceEnd > sourceStart, "source type-scale markers are required");
assert.ok(legacyStart >= 0 && legacyEnd > legacyStart, "legacy type-scale markers are required");

const sourceBlock = sourceCss.slice(sourceStart, sourceEnd);
const legacyBlock = legacyCss.slice(legacyStart, legacyEnd);
for (const selector of ["nav a", ".side-rail button", ".scoreBadge", ".scoreTable th", ".companionSteps span", ".companionSearch span", ".companionFlow span", "footer a"]) {
  assert.match(sourceBlock, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `source must cover ${selector}`);
}
assert.match(sourceBlock, /font-size:\s*14px/);
assert.match(sourceBlock, /min-height:\s*40px/);
assert.match(sourceBlock, /min-width:\s*40px/);
assert.match(legacyBlock, /font-size:\s*14px/);
assert.match(legacyBlock, /min-height:\s*40px/);

const redirectShells = [
  "coaches.html", "collaborators.html", "community.html", "companion.html", "competitive.html",
  "events.html", "extension.html", "partners.html", "plans.html", "privacy.html", "privacy_policy.html",
  "roadmap.html", "statistics.html", "support.html", "terms.html", "cookies.html", "accessibility.html",
  "companion/index.html",
  "companion/privacy_policy.html", "companion/support.html"
];
for (const shell of redirectShells) {
  assert.ok(fs.existsSync(path.join(root, "public", shell)), `missing redirect shell: ${shell}`);
}

const dist = path.join(root, "dist");
if (fs.existsSync(dist)) {
  const builtCss = fs.readdirSync(path.join(dist, "assets"), { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".css"))
    .map((entry) => fs.readFileSync(path.join(dist, "assets", entry.name), "utf8"))
    .join("\n");
  assert.match(builtCss, /font-size:14px/, "built CSS must contain the readable operational type scale");
  assert.match(builtCss, /min-height:40px/, "built CSS must contain the interactive hit-area override");
  assert.ok(fs.existsSync(path.join(dist, "shared-page.css")), "built legacy fallback CSS must remain present");
  assert.ok(fs.existsSync(path.join(dist, "community.html")), "built redirect shells must remain present");
}

console.log("Rainbow type scale, legacy fallback and redirect-shell checks passed");
