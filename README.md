# Rainbow Six CUBA Website

V21 restores the V16 functional layout and corrects the visual asset strategy.

The bilingual product views at `/plans.html` show Hub, Companion and Season. The implementation is quote-only. Spanish and English are included in the base scope; additional languages are quoted separately.

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

## Internal pricing references

The historical package amounts in [the internal brief](docs/CGC-COMMERCIAL-BRIEF.md) are unpublished planning references. The [market assumptions](docs/market-assumptions.md) record scope ranges and dependencies for a future quote. Neither document sets an approved price for building the product or for community access, memberships or events.

## V21
- Uses user-approved hero images for each main module.
- Cards are derived from the matching hero image to preserve visual continuity.
- Renames Coaches Verificados to Coaching, Partners Verificados to Alianzas, and Próximamente to En Progreso.
- Companion remains inside Statistics, not as a main home module.
