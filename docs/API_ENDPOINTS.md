# Rainbow Six CUBA web endpoints

All React API callers import src/config/apiConfig.js. SITE_CONFIG.api derives from
the same API_BASE. Defaults are:

| Setting | Default |
| --- | --- |
| WEBSITE_URL | https://r6cuba.coregamingcorporation.com |
| API_BASE | https://r6cuba-api.coregamingcorporation.com |
| STATS_API | API_BASE + /api |
| CGP_API | API_BASE + /cgp/api |

VITE_WEBSITE_URL and VITE_API_BASE_URL remain supported overrides, with trailing
slashes removed. A stale deployment override can retain an old origin; check these
two non-secret URL settings before publication. Public static policy/support text
also names the approved hosts. Static beta pages do not make API requests.

## Existing endpoint contracts

Only the hostname/configuration source changes. HTTP methods, paths, bearer header
handling, local cgpToken key and the existing account relationships are retained.

| Caller | Existing path under the configured origin |
| --- | --- |
| Public community statistics | GET /api/public/players |
| Current statistics/account | GET /api/me |
| Current R6 membership | GET /api/r6/membership/me |
| Join R6 membership | POST /api/r6/membership/join |
| Temporary Companion lookup | GET /api/temp/player/:name |
| Current identity | GET /cgp/api/auth/me |
| Discord login | GET /r/rainbow-six-cuba/auth/discord/login?lang=... (the Review Portal relays server-side to CGP) |
| CGP health | GET /cgp/api/health |
| Statistics health | GET /cgp/api/stats/health |
| CGP player list | GET /cgp/api/stats/players?limit=... |
| CGP player by ID | GET /cgp/api/stats/player/:id |
| Player page by Ubisoft name | GET /cgp/api/stats/player-name/:name |

The public browser CTA stays on the official Review Portal route. The portal
constructs the approved callback as `/r/rainbow-six-cuba/auth/callback` and relays
the initial request to CGP without exposing the API hostname in the product link.
Callback processing remains unchanged. Storage belongs to the browser origin, so
authentication on the frontend requires the owner's normal manual sign-in rather
than copying credentials.

## Publication dependency: authentication return allowlist

The CGP backend must allow the Review Portal callback origin/path used by the relay
before production OAuth can complete. The website does not bypass return-url
validation or claim live authentication until that backend allowlist and the
portal relay are deployed and verified together.

DNS/TLS, reverse-proxy routing, API CORS for the new frontend and the auth allowlist
must all pass before the old domain is retired. Live HTTP/auth/OAuth/account behavior
and domain retirement remain NOT RUN for this local web change.

## Local verification

From the website checkout, with Node and no dependency installation:

    node --experimental-vm-modules --test --test-reporter=tap tests/api-config-offline.test.mjs

The package alias is npm run test:offline. Ten synthetic tests pass. Real ES service
modules execute in a VM with fixture-only fetch and synthetic localStorage; unexpected
URLs and external imports are blocked. JSX request URL expressions are evaluated
from source. JSX rendering, real browser accounts, live requests and OAuth are not
certified by this harness.

The production build passed using the existing Vite configuration, an explicitly
empty envDir and explicit approved URL defines, so no checkout .env was read. Output
is dist. This checks compilation and the proposed artifact, not live infrastructure.
The previous Users import repair remains present.

Sanitized run evidence is kept outside the source repository in the engineering
reports: web-domain-offline.log, web-domain-build.log and web-domain-artifacts.json.
