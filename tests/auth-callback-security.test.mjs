import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const security = await import(`${pathToFileURL(path.join(root, "src/auth/authSecurity.js"))}?test=${Date.now()}`);

test("auth callback removes bearer values from query and hash without returning them", () => {
  const result = security.sanitizeAuthCallbackUrl("https://review.example/r/rainbow-six-cuba/auth/callback?token=secret&lang=en#access_token=hash-secret&state=keep");
  assert.equal(result.removed, true);
  assert.equal(result.href, "/r/rainbow-six-cuba/auth/callback?lang=en#state=keep");
  assert.doesNotMatch(result.href, /token|secret/i);
});

test("auth callback leaves non-auth state intact and reports no removal", () => {
  const result = security.sanitizeAuthCallbackUrl("https://review.example/r/rainbow-six-cuba/auth/callback?lang=es#state=keep");
  assert.equal(result.removed, false);
  assert.equal(result.href, "/r/rainbow-six-cuba/auth/callback?lang=es#state=keep");
});

test("auth callback removes bearer values from route-style fragments and mixed-case keys", () => {
  const result = security.sanitizeAuthCallbackUrl("https://review.example/r/rainbow-six-cuba/auth/callback?TOKEN=query-secret&lang=en#/auth/callback?Access_Token=hash-secret&state=keep");
  assert.equal(result.removed, true);
  assert.equal(result.href, "/r/rainbow-six-cuba/auth/callback?lang=en#/auth/callback?state=keep");
  assert.doesNotMatch(result.href, /token|secret/i);
});

test("source keeps callback and browser auth explicitly blocked", () => {
  const callback = fs.readFileSync(path.join(root, "src/auth/AuthCallback.jsx"), "utf8");
  const auth = fs.readFileSync(path.join(root, "src/auth/cgpAuth.js"), "utf8");
  assert.match(callback, /history\.replaceState/);
  assert.match(callback, /t\.blocked/);
  assert.doesNotMatch(callback, /localStorage|saveToken|Authorization/);
  assert.doesNotMatch(auth, /localStorage\.setItem|Authorization|Bearer/);
});
