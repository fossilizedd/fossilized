# Visual Context — Fossilized

Read before CSS or image generation work.

**Aesthetic**: warm amber light against deep indigo, layered atmospheric depth, hand-painted cinematic quality. Domestic Japanese cooking scenes with seasonal produce; foreground shadowed, midground lit, soft sky behind.

## Palette

| Token       | Hex       | Role                        |
|-------------|-----------|-----------------------------|
| `sky-deep`  | `#0a1628` | background / deep shadow    |
| `sky-mid`   | `#1a3a5c` | mid-environment             |
| `sky-upper` | `#0d1b4e` | upper gradient / night sky  |
| `amber`     | `#e8a44a` | warm light / primary accent |
| `horizon`   | `#c8882a` | horizon glow                |
| `particle`  | `#f5e4a0` | dust / gleam                |
| `blossom`   | `#c084a0` | pinkish accent              |
| `mist`      | `#e8eef4` | text / light mist           |
| `jade`      | `#3a8a6e` | foliage / greens            |
| `ocean`     | `#2a6b99` | water / blue-green          |

## Header Image

`/public/images/cooking-header.jpg` — `cover`, `center 40%`, 280px. Swap file to update; overlays adapt.

```
A cinematic wide-angle illustration of a Japanese kitchen at dusk. Cutting board with kabocha squash, lotus root, burdock, green onions beside a clay pot on an iron stove. Warm amber light through a small window, golden shafts across dim blue-indigo interior. Floating dust motes. Dark foreground, lit midground, soft sky through window. Hand-painted anime aesthetic, richly detailed, no text.
```

Negative: photorealistic, photograph, 3D render, watermark, cartoonish. Target 1920×560+.

## CSS Layers (`globals.css` + `AlmanacHeader.tsx`)

`.almanac-bg` → `.almanac-sky` (indigo gradient) → `.almanac-atmosphere` (amber glow, pulse) → `.almanac-shaft-left/right` (light shafts, pulse) → `.almanac-particle` (floating dust) → `.almanac-landscape` (SVG hills, z5) → `.almanac-content` (text, z10)

## Rules

- CSS prefix `almanac-` for header; use component/domain prefixes elsewhere (`card-`, `calendar-`)
- Inspiration names OK in prompts and docs — not in code identifiers or filenames
