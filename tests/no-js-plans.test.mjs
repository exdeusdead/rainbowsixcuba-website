import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("plans source and built shells keep all product views before hydration", async () => {
  for (const file of ["../public/plans.html", "../dist/plans.html"]) {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    const shell = html.split("<script")[0];
    const cards = shell.match(/<article class="card(?: featured)?">[\s\S]*?<\/article>/g) ?? [];
    assert.equal(cards.length, 3, file);
    for (const name of ["Hub", "Companion", "Temporada"]) assert.match(shell, new RegExp(`<h3>${name}</h3>`), file);
    for (const target of ["home", "companion", "events"]) assert.match(shell, new RegExp(`data-view-section="${target}"`), file);
    assert.equal((shell.match(/Precio por cotizar/g) ?? []).length, 3, file);
  }
});
