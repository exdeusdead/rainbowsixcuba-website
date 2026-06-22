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


## V17

- Keeps the V16 interface unchanged.
- Adds independent HD hero background assets generated from the current card compositions.
- Reduces hero zoom/filter intensity to avoid soft or blurred module backgrounds.
- Keeps card images lightweight and uses separate hero images for banners/backgrounds.
