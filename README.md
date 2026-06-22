# Rainbow Six CUBA Website v12

Cinematic identity restore.

## v12 Changes

- Restored tactical Rainbow Six CUBA visual identity.
- New v12 HQ hero background.
- New contextual v12 module visuals for Community, Events, Competitive, Statistics, Coaches, Partners, Collaborators, Incoming, Privacy and Companion.
- No abstract SaaS placeholder background.
- Companion URLs included:
  - /companion.html
  - /companion/privacy_policy.html
  - /companion/support.html
- Persistent language system across pages using `?lang=` and localStorage.
- Main supported languages: ES, EN, FR, DE, ZH, JA.
- Build tested with `npm run build`.

## Deploy

Cloudflare Pages:

- Build command: `npm install && npm run build`
- Output directory: `dist`
- NODE_VERSION: `20`


## V19

- Restored the V16 module layout and contextual module structure.
- Replaced broken V18 screenshot-derived assets with contextual module image pairs.
- Added V19 hero/card asset pairs where each card is derived from its matching high-resolution hero.
- Reduced background zoom/filtering to protect image clarity.
- Kept Companion, Privacy, Support, language system and Statistics prototype unchanged.
