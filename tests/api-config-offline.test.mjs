import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://r6cuba-api.coregamingcorporation.com";
const WEB = "https://r6cuba.coregamingcorporation.com";
const modulePaths = new Set([
  "src/config/apiConfig.js", "src/config/siteConfig.js", "src/api/cgpClient.js",
  "src/auth/cgpAuth.js", "src/services/statisticsService.js",
  "src/services/r6MembershipService.js", "src/services/myStatsService.js"
]);
const readSource = relative => fs.readFileSync(path.join(root, relative), "utf8");

function createHarness({ env = {}, origin = WEB, token = "synthetic-token", responses = {} } = {}) {
  const context = vm.createContext(Object.create(null), {
    codeGeneration: { strings: false, wasm: false }
  });
  const setup = [
    "const __fixtureEnv = " + JSON.stringify(env) + ";",
    "const __responses = " + JSON.stringify(responses) + ";",
    "const __storage = " + JSON.stringify(token ? { cgpToken: token } : {}) + ";",
    "const __requests = [];",
    "globalThis.localStorage = {",
    "  getItem(key) { return __storage[key] || null; },",
    "  setItem(key, value) { __storage[key] = value; },",
    "  removeItem(key) { delete __storage[key]; }",
    "};",
    "globalThis.fetch = async function(url, options = {}) {",
    "  if (!Object.hasOwn(__responses, url)) throw new Error('Blocked unexpected request: ' + url);",
    "  __requests.push({ url, options: JSON.parse(JSON.stringify(options)) });",
    "  const fixture = __responses[url];",
    "  return { ok: fixture.ok !== false, status: fixture.status || 200,",
    "    json: async () => JSON.parse(JSON.stringify(fixture.body || {})) };",
    "};"
  ];
  if (origin !== null) setup.push("globalThis.window = { location: { origin: " + JSON.stringify(origin) + " } };");
  vm.runInContext(setup.join("\n"), context);
  const cache = new Map();
  async function load(relative) {
    if (!modulePaths.has(relative)) throw new Error("Blocked module: " + relative);
    let module = cache.get(relative);
    if (!module) {
      module = new vm.SourceTextModule(readSource(relative), {
        context, identifier: relative,
        initializeImportMeta(meta) {
          meta.env = vm.runInContext("__fixtureEnv", context);
        }
      });
      cache.set(relative, module);
    }
    if (module.status === "unlinked") {
      await module.link(async (specifier, reference) => {
        if (!specifier.startsWith(".")) throw new Error("Blocked external import: " + specifier);
        let resolved = path.posix.normalize(path.posix.join(path.posix.dirname(reference.identifier), specifier));
        if (!resolved.endsWith(".js")) resolved += ".js";
        return loadForLink(resolved);
      });
    }
    if (module.status === "linked") await module.evaluate({ timeout: 1000 });
    return module;
  }
  function loadForLink(relative) {
    if (!modulePaths.has(relative)) throw new Error("Blocked module: " + relative);
    if (!cache.has(relative)) {
      cache.set(relative, new vm.SourceTextModule(readSource(relative), {
        context, identifier: relative,
        initializeImportMeta(meta) { meta.env = vm.runInContext("__fixtureEnv", context); }
      }));
    }
    return cache.get(relative);
  }
  const requests = () => JSON.parse(vm.runInContext("JSON.stringify(__requests)", context));
  return { context, load, requests };
}

const clone = value => JSON.parse(JSON.stringify(value));
const response = body => ({ body });

test("defaults use approved hosts and preserve Discord auth path and current-origin callback", async () => {
  const harness = createHarness();
  const config = (await harness.load("src/config/apiConfig.js")).namespace;
  assert.equal(config.API_BASE, API);
  assert.equal(config.WEBSITE_URL, WEB);
  assert.equal(config.STATS_API, API + "/api");
  assert.equal(config.CGP_API, API + "/cgp/api");
  assert.equal(config.DISCORD_LOGIN_URL, API + "/cgp/api/auth/discord/login?returnUrl=" + encodeURIComponent(WEB + "/auth/callback"));
  assert.deepEqual(harness.requests(), []);
});

test("URL overrides normalize trailing slashes; SSR callback uses configured website", async () => {
  const harness = createHarness({
    origin: null, env: { VITE_API_BASE_URL: "https://example.invalid/proxy///", VITE_WEBSITE_URL: "https://website.example.invalid///" }
  });
  const config = (await harness.load("src/config/apiConfig.js")).namespace;
  assert.equal(config.API_BASE, "https://example.invalid/proxy");
  assert.equal(config.WEBSITE_URL, "https://website.example.invalid");
  assert.equal(config.DISCORD_LOGIN_URL, "https://example.invalid/proxy/cgp/api/auth/discord/login?returnUrl=" + encodeURIComponent("https://website.example.invalid/auth/callback"));
});

test("CGP client preserves health/player endpoints on the configured origin", async () => {
  const urls = ["/health", "/stats/health", "/stats/players?limit=4", "/stats/player/fixture-id"];
  const responses = Object.fromEntries(urls.map(endpoint => [API + "/cgp/api" + endpoint, response({ ok: true })]));
  const harness = createHarness({ responses });
  const { cgpApi } = (await harness.load("src/api/cgpClient.js")).namespace;
  await cgpApi.health();
  await cgpApi.statsHealth();
  await cgpApi.players(4);
  await cgpApi.playerById("fixture-id");
  assert.deepEqual(harness.requests().map(item => item.url), urls.map(endpoint => API + "/cgp/api" + endpoint));
});

test("public statistics request uses the configured API and synthetic player adapter", async () => {
  const player = {
    userId: "fixture-id", ubisoftName: "FixturePlayer", discordTag: "FixtureDiscord",
    rank: { currentRank: "Gold I", currentRp: 3200, seasonKd: 1.25, seasonWinRate: 50 },
    region: "NA", team: "FixtureTeam", metadata: { lastSyncedAt: "2026-01-01" },
    recentForm: { rpDelta: 20 }
  };
  const harness = createHarness({ responses: { [API + "/api/public/players"]: response({ players: [player] }) } });
  const service = (await harness.load("src/services/statisticsService.js")).namespace;
  const data = clone(await service.getCgpStatsPreview());
  assert.equal(data.players.players.length, 1);
  assert.deepEqual(data.players.players[0], {
    position: 1, player: "FixturePlayer", discord: "FixtureDiscord", ubisoft: "FixturePlayer",
    rank: "Gold I", rp: 3200, kd: 1.25, wr: 50, region: "NA", team: "FixtureTeam",
    country: "Cuba", updated: "2026-01-01", deltaRP: 20, deltaKD: 0, deltaWR: 0,
    deltaRank: "—", status: "Verified"
  });
  assert.equal(harness.requests()[0].url, API + "/api/public/players");
});

test("authenticated services retain bearer headers and POST membership join", async () => {
  const urls = ["/cgp/api/auth/me", "/api/me", "/api/r6/membership/me", "/api/r6/membership/join"];
  const responses = Object.fromEntries(urls.map(endpoint => [API + endpoint, response({ ok: true })]));
  const harness = createHarness({ responses });
  await (await harness.load("src/auth/cgpAuth.js")).namespace.getCurrentUser();
  await (await harness.load("src/services/myStatsService.js")).namespace.getMyStats();
  const membership = (await harness.load("src/services/r6MembershipService.js")).namespace;
  await membership.getMyMembership();
  await membership.joinRainbowSixCuba();
  const requests = harness.requests();
  assert.deepEqual(requests.map(item => item.url), urls.map(endpoint => API + endpoint));
  for (const item of requests) assert.equal(item.options.headers.Authorization, "Bearer synthetic-token");
  assert.equal(requests[3].options.method, "POST");
});

test("no synthetic token makes no request and preserves login-required behavior", async () => {
  const harness = createHarness({ token: null });
  assert.equal(await (await harness.load("src/auth/cgpAuth.js")).namespace.getCurrentUser(), null);
  assert.equal(await (await harness.load("src/services/myStatsService.js")).namespace.getMyStats(), null);
  const membership = (await harness.load("src/services/r6MembershipService.js")).namespace;
  assert.equal(await membership.getMyMembership(), null);
  await assert.rejects(membership.joinRainbowSixCuba(), /Login required/);
  assert.deepEqual(harness.requests(), []);
});

test("configured override reaches service callers and SITE_CONFIG", async () => {
  const override = "https://example.invalid";
  const harness = createHarness({
    env: { VITE_API_BASE_URL: override + "///" },
    responses: { [override + "/api/me"]: response({ ok: true }), [override + "/cgp/api/health"]: response({ ok: true }) }
  });
  await (await harness.load("src/services/myStatsService.js")).namespace.getMyStats();
  await (await harness.load("src/api/cgpClient.js")).namespace.cgpApi.health();
  assert.equal((await harness.load("src/config/siteConfig.js")).namespace.SITE_CONFIG.api, override);
  assert.deepEqual(harness.requests().map(item => item.url), [override + "/api/me", override + "/cgp/api/health"]);
});

test("fetch blocks every unspecified URL and VM has no host modules or process", async () => {
  const harness = createHarness();
  for (const capability of ["require", "process", "WebSocket", "XMLHttpRequest"]) {
    assert.equal(vm.runInContext("typeof " + capability, harness.context), "undefined");
  }
  await assert.rejects(vm.runInContext('fetch("https://example.invalid/unlisted")', harness.context), /Blocked unexpected request/);
  assert.throws(() => vm.runInContext('eval("1")', harness.context), /Code generation from strings disallowed/);
  assert.deepEqual(harness.requests(), []);
});

test("React request URL expressions retain account/player/temporary endpoint paths", async () => {
  const expressions = [
    ["src/account/AccountPanel.jsx", API + "/api/me"],
    ["src/player/PlayerProfile.jsx", API + "/cgp/api/stats/player-name/Fixture%20Player"],
    ["src/features/statistics/CompanionPanel.jsx", API + "/api/temp/player/FixturePlayer"]
  ];
  const responses = Object.fromEntries(expressions.map(([, url]) => [url, response({ ok: true })]));
  const harness = createHarness({ responses });
  const config = (await harness.load("src/config/apiConfig.js")).namespace;
  harness.context.STATS_API = config.STATS_API;
  harness.context.CGP_API = config.CGP_API;
  vm.runInContext('const name = "Fixture Player"; const search = " FixturePlayer ";', harness.context);
  for (const [relative, expected] of expressions) {
    const match = readSource(relative).match(/fetch\(\s*([^\n]+)\s*\n/);
    assert.ok(match, "Request expression missing: " + relative);
    const expression = match[1].trim().replace(/,$/, "");
    const actual = vm.runInContext(expression, harness.context);
    assert.equal(actual, expected);
    await vm.runInContext("fetch(" + expression + ")", harness.context);
  }
  assert.deepEqual(harness.requests().map(item => item.url), expressions.map(([, url]) => url));
});

test("active sources contain no retired-domain dependency; request callers import apiConfig and Users survives", () => {
  const callers = [
    "src/api/cgpClient.js", "src/auth/cgpAuth.js", "src/services/statisticsService.js",
    "src/services/r6MembershipService.js", "src/services/myStatsService.js",
    "src/account/AccountPanel.jsx", "src/player/PlayerProfile.jsx",
    "src/features/statistics/CompanionPanel.jsx"
  ];
  for (const relative of callers) {
    const source = readSource(relative);
    assert.match(source, /from ["'][^"']*config\/apiConfig["']/);
    assert.doesNotMatch(source, /https:\/\/(?:api\.rainbowsixcuba\.com|r6cuba-api\.coregamingcorporation\.com)/);
  }
  const activeFiles = [...modulePaths, ...callers, "src/main.jsx", "public/shared-i18n.js", "index.html"];
  for (const relative of new Set(activeFiles)) assert.doesNotMatch(readSource(relative), /rainbowsixcuba\.com/i, relative);
  assert.match(readSource("src/main.jsx"), /import \{ Users,/);
});
