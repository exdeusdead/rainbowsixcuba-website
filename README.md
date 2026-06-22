# Rainbow Six CUBA Website v20

V20 restores the V16 functional layout and corrects the visual asset strategy.

## V20 Changes

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
