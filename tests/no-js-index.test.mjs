import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("SPA destinations retain readable static content before hydration", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<noscript>[\s\S]*?<main id="no-script-fallback"/);
  for (const section of ["home", "companion", "events"]) {
    assert.match(html, new RegExp(`id="no-script-${section}"`));
  }
  assert.match(html, /plans\.html\?lang=es#packages/);
});
