import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("SPA destinations retain readable static content before hydration", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<html lang="es">/);
  assert.match(html, /<noscript>[\s\S]*?<main id="no-script-fallback"/);
  assert.match(html, /PREVISUALIZACIÓN ESTÁTICA/);
  assert.doesNotMatch(html, /The product views are available|JavaScript is disabled/);
  for (const section of ["home", "companion", "events"]) {
    assert.match(html, new RegExp(`id="no-script-${section}"`));
  }
  assert.match(html, /plans\.html\?lang=es#packages/);
  assert.match(html, /index-en\.html/);
});

test("English static shell keeps its own language and copy", async () => {
  const html = await readFile(new URL("../public/index-en.html", import.meta.url), "utf8");
  assert.match(html, /<html lang="en">/);
  assert.match(html, /STATIC PREVIEW/);
  assert.match(html, /The product views have a readable fallback/);
  assert.match(html, /plans-en\.html#packages/);
  assert.doesNotMatch(html, /Las vistas del producto|JavaScript está desactivado/);
});

test("English static destinations preserve the English return loop", async () => {
  const plans = await readFile(new URL("../public/plans-en.html", import.meta.url), "utf8");
  const companion = await readFile(new URL("../public/companion-en.html", import.meta.url), "utf8");
  const events = await readFile(new URL("../public/events-en.html", import.meta.url), "utf8");
  assert.match(plans, /index-en\.html/);
  assert.match(plans, /companion-en\.html/);
  assert.match(plans, /events-en\.html/);
  assert.match(companion, /plans-en\.html#packages/);
  assert.match(events, /plans-en\.html#packages/);
});
