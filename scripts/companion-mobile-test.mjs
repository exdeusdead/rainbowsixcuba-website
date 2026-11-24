import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
const source = fs.readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');

const companionModule = source.match(/const COMPANION_MODULE\s*=\s*\[([^;]+)\];/s)?.[1] ?? '';
assert.match(companionModule, /v19-companion-card\.webp/);
assert.match(companionModule, /v19-companion-hero\.webp/);
assert.doesNotMatch(companionModule, /statistics/i);

assert.match(css, /\.companionRouteGrid\s*\{[\s\S]*?min-width:\s*0/);
assert.match(css, /\.companionSearch div\s*\{[\s\S]*?flex-wrap:\s*wrap/);
assert.match(css, /\.companionSearch input,[\s\S]*?\.companionSearch button\s*\{[\s\S]*?width:\s*100%/);
assert.match(css, /\.scoreTabs\s*\{[\s\S]*?overflow-x:\s*auto/);
assert.match(css, /\.scoreControls label,[\s\S]*?\.scoreControls button\s*\{[\s\S]*?width:\s*100%/);
assert.match(css, /footer nav\s*\{[\s\S]*?flex-wrap:\s*wrap/);
assert.match(css, /footer nav\s*\{[\s\S]*?justify-content:\s*center/);
assert.match(css, /footer p\s*\{[\s\S]*?overflow-wrap:\s*anywhere/);
assert.match(css, /@media\s*\(max-width:\s*640px\)/);

console.log('companion-mobile-test: PASS');
