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
    for (const [target, path] of [["home", "./?lang=es"], ["companion", "./companion.html?lang=es"], ["events", "./events.html?lang=es"]]) {
      assert.match(shell, new RegExp(`href="${path.replaceAll("?", "\\?").replaceAll("&", "&amp;")}" data-view-section="${target}"`), file);
    }
    assert.equal((shell.match(/Precio por cotizar/g) ?? []).length, 3, file);
  }
});

test("static product destinations contain useful no-JS content", async () => {
  const destinations = [
    ["../index.html", "no-script-home", "Hub comunitario"],
    ["../public/companion.html", "<h1>Companion</h1>", "integración aprobada"],
    ["../public/events.html", "<h1>Temporada y eventos</h1>", "eventos, standings"]
  ];
  for (const [file, marker, copy] of destinations) {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    assert.match(html, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), file);
    assert.match(html, new RegExp(copy, "i"), file);
  }
});

test("Spanish and English package shells preserve language, prices and destinations", async () => {
  const es = await readFile(new URL("../public/plans.html", import.meta.url), "utf8");
  const en = await readFile(new URL("../public/plans-en.html", import.meta.url), "utf8");
  assert.match(es, /<html lang="es">/);
  assert.match(es, /Un hub que convierte comunidad/);
  for (const href of ["./?lang=es", "./companion.html?lang=es", "./events.html?lang=es"]) assert.match(es, new RegExp(href.replace(/[.?]/g, "\\$&").replaceAll("&", "&amp;")));
  assert.match(en, /<html lang="en">/);
  assert.match(en, /Explore the product by view/);
  for (const href of ["./index-en.html", "./companion-en.html", "./events-en.html"]) assert.match(en, new RegExp(href.replace(/[.?]/g, "\\$&")));
  assert.equal((en.match(/Request a quote/g) ?? []).length, 3);
});
