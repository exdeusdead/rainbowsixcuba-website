# Rainbow Six CUBA Website — v09

## Focus
- Adds a dedicated Statistics page.
- Adds a Companion Extension page under the main domain.
- Adds an extension-specific privacy policy URL.
- Connects the Statistics module button to the new Statistics page.

## Important URLs
- Website: https://rainbowsixcuba.com
- Statistics: https://rainbowsixcuba.com/statistics.html
- Companion Extension: https://rainbowsixcuba.com/companion.html
- Companion Extension Privacy Policy: https://rainbowsixcuba.com/companion/privacy_policy.html
- General Privacy: https://rainbowsixcuba.com/privacy.html
- Legacy Chrome Privacy URL: https://rainbowsixcuba.com/privacy_policy.html

## Deployment
Cloudflare Pages settings:
- Build command: npm install && npm run build
- Output directory: dist
- NODE_VERSION: 20

Do not upload package-lock.json unless it is generated locally from the stable package.json.
