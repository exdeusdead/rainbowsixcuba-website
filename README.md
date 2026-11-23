# Rainbow Six CUBA Website v22

V21 restores the V16 functional layout and corrects the visual asset strategy.

V22 adds the CGC commercial pre-design surface at `/plans.html`. It makes the
included language baseline explicit (Spanish + English), keeps extra languages
outside the base scope, and documents commercial package assumptions in
[`docs/CGC-COMMERCIAL-BRIEF.md`](docs/CGC-COMMERCIAL-BRIEF.md).

## V21 Changes

- V16 layout preserved.
- Companion Extension removed from the main module grid.
- Companion is now treated as a Statistics sub-tool.
- Each main module uses a matching Hero + Card pair.
- Cards are derived from the same hero composition to preserve visual continuity.
- Contextual module visuals restored/improved:
  - Community
  - Events
  - Competitive
  - Statistics
  - Coaches
  - Partners
  - Collaborators
  - Incoming
- No `package-lock.json`, `dist`, or `node_modules` included.

## Asset Standard

Every future section must follow this structure:

```text
public/assets/backgrounds/vXX-section-hero.webp
public/assets/backgrounds/vXX-section-card.webp
```

The hero is the master image. The card is the same visual composition resized/cropped for the module button.

Never reuse a low-resolution card image as a hero background.

## Deploy

Cloudflare Pages:

- Build command: `npm install && npm run build`
- Output directory: `dist`
- Recommended Node: 20+

## CGC commercial pre-design

The catalogue proposal is intentionally commercial rather than family-priced:

- Community Launch: US$3,200
- Competitive Operations: US$6,800
- Ecosystem Platform: US$12,900

Every package includes Spanish and English. Additional languages, integrations,
hosting, domains, licensing and ongoing maintenance are quoted separately.


## V21
- Uses user-approved hero images for each main module.
- Cards are derived from the matching hero image to preserve visual continuity.
- Renames Coaches Verificados to Coaching, Partners Verificados to Alianzas, and Próximamente to En Progreso.
- Companion remains inside Statistics, not as a main home module.
