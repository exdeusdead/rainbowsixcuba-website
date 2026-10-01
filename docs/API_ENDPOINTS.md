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
| Discord login | GET /cgp/api/auth/discord/login?returnUrl=... |
| CGP health | GET /cgp/api/health |
| Statistics health | GET /cgp/api/stats/health |
| CGP player list | GET /cgp/api/stats/players?limit=... |
| CGP player by ID | GET /cgp/api/stats/player/:id |
| Player page by Ubisoft name | GET /cgp/api/stats/player-name/:name |

The existing Discord return URL remains current window.location.origin followed by
/auth/callback; without a browser it falls back to WEBSITE_URL. Callback processing
is unchanged. Storage belongs to the browser origin, so authentication on the new
frontend requires the owner's normal manual sign-in rather than copying credentials.

## Publication dependency: authentication return allowlist

Root verified the backend at CGP ca74bee: platform/api/public/auth.routes.js accepts
the former website origin, localhost:5173 and chromiumapp.org origins, but does not
yet accept https://r6cuba.coregamingcorporation.com. The new login return URL would
receive INVALID_RETURN_URL. A separate reviewed backend allowlist change is required.
This web candidate does not alter that backend, bypass validation or introduce
account integration. Root controls deployment after backend and routing readiness.

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
