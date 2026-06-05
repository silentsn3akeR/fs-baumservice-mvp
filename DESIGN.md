# FS Baumservice — Design System

> Premium regional tree service. Dark forest authority meets warm craft. Think Tesla's cinematic gravity + a craftsman's honest warmth.

---

## Brand Essence

**Archetype:** The Expert in Nature — trustworthy, powerful, rooted.  
**Tone:** Confident without arrogance. Direct. Regional pride.  
**Visual personality:** Dark, cinematic, nature-deep — with bursts of organic warmth.

---

## Color System

```
--deep:    #071b15   /* Almost-black forest floor. Primary dark bg. */
--forest:  #0e3026   /* Deep canopy. Sections, nav, cards on dark. */
--leaf:    #b9df6f   /* Spring lime. Accent, badges, highlights. */
--safety:  #ea6b1f   /* Chainsaw orange. Primary CTA, urgency. */
--bronze:  #b97438   /* Aged bark. Eyebrow labels, secondary accents. */
--cream:   #f4efe3   /* Warm parchment. Light page backgrounds. */
--muted:   #6b7c72   /* Stone grey. Captions, secondary text. */
```

**Usage rules:**
- Dark sections: `--deep` → `--forest` gradient. White text.
- Light sections: `--cream` bg. `--deep` text.
- CTAs: `--safety` (primary) / `--leaf` (secondary/success)
- Never use pure `#000000` or `#ffffff` — too harsh.
- Eyebrow labels: `--bronze`, uppercase, 0.1em tracking.

---

## Typography

**Font:** Outfit (Google Fonts) — weights 700, 800, 900 only.  
**Body fallback:** Inter, ui-sans-serif, system-ui, sans-serif.

```
H1:  clamp(2.4rem, 7vw, 5.8rem)   weight 900   tracking -0.015em
H2:  clamp(1.8rem, 4.2vw, 3.4rem) weight 800   tracking -0.01em
H3:  1.25rem                        weight 800
Body: 1rem / 1.7                    weight 400
Small: 0.875rem                     weight 600–700
Eyebrow: 0.76rem  UPPERCASE  weight 900  tracking 0.1em  color --bronze
```

**Principles:**
- Headings are punchy. Max 8 words per H1.
- Never justify text. Left-align everything.
- Line-height: 1.65–1.7 for body, 1.1–1.2 for large headings.

---

## Spacing System

```
4px  — micro gaps (icon padding)
8px  — tight (badge inner)
12px — compact (card inner gap)
16px — base unit
24px — component padding
32px — section sub-gap
48px — component separation
64px — section padding (mobile)
96px — section padding (desktop)
```

---

## Components

### Buttons

```
Primary (.button):     bg --safety, white text, radius 999px, px 28 py 14, weight 800
Secondary (.button-outline): transparent, white border 2px, same sizing
WhatsApp (.button-wa): bg #25D366, white text
Hover: translateY(-3px) + stronger shadow + brightness(1.08)
```

Always use `border-radius: 999px` (pill shape) for CTAs.  
Guard tilt/magnetic effects with `@media (hover: hover)`.

### Cards

```
Border-radius: 14px (--radius)
Background: white on light bg / rgba(255,255,255,0.07) on dark bg
Shadow: 0 4px 24px rgba(0,0,0,0.10)
Hover: translateY(-6px) + shadow deepens
Transition: 0.28s cubic-bezier(.4,0,.2,1)
```

### Glassmorphism (dark sections)

```
background: rgba(255,255,255,0.07)
backdrop-filter: blur(20px) saturate(1.2)
border: 1px solid rgba(255,255,255,0.12)
border-radius: 18–20px
```

### Eyebrow Labels

```
font-size: 0.76rem
font-weight: 900
text-transform: uppercase
letter-spacing: 0.1em
color: var(--bronze)
margin-bottom: 12px
```

---

## Layout

- Max content width: `1220px`, centered.
- Side padding: `max(24px, calc((100% - 1220px) / 2 + 24px))`
- Sections alternate: dark (`--deep`/`--forest`) ↔ light (`--cream`/`white`)
- Grid: 12-column conceptually. Cards: 3-col desktop → 2-col tablet → 1-col mobile.
- No sidebars. Full-bleed section backgrounds. Content centered.

---

## Imagery

- Always outdoor/nature shots: canopy, machinery in action, aerial project views.
- Overlay pattern for hero images:
  ```css
  background: linear-gradient(180deg, rgba(7,27,21,0.55) 0%, rgba(7,27,21,0.82) 100%);
  ```
- Image captions get geo-tagged text: "Baumfällung · Bisingen" format.
- Aspect ratios: Hero 16:9+, Cards 4:3 or 2:3 portrait, Gallery square.

---

## Motion

```
Entry animation:   cubic-bezier(.22,.9,.36,1)   0.6–0.9s
Hover transition:  cubic-bezier(.4,0,.2,1)       0.2–0.3s
Float loop:        ease-in-out                   6–8s infinite
Auto-play:         4500ms interval
```

**Rules:**
- All animations must have `@media (prefers-reduced-motion: reduce)` override.
- Hover/tilt effects: `@media (hover: hover)` only — never on touch devices.
- Entrance: `opacity 0 → 1` + `translateY(24px → 0)`.
- Never use `transform` + `transition` on the same element as 3D `preserve-3d` parent.

---

## SEO / GEO Signals

Every page and section should reinforce:
- **Service areas:** Bisingen, Balingen, Geislingen, Hechingen, Zollernalbkreis
- **Services:** Baumfällung, Baumpflege, Heckenschnitt, Wurzelstockfräsen, Rollrasen
- **Certifications:** ZTV-Baumpflege, Seilklettertechnik, Wurzelfräse ab 90 cm
- **Contact signals:** 0172 7256462, info@fs-baumservice.de

Image alt texts always include location + service: `"Baumfällung durch Seilklettertechnik in Bisingen"`.

---

## Do / Don't

| Do | Don't |
|----|-------|
| Dark + warm amber/orange on hero | Pure black backgrounds |
| Pill-shaped CTAs | Square buttons |
| Geo-tagged image captions | Generic "our team" captions |
| `prefers-reduced-motion` guard | Autoplay video with no controls |
| Section alternation dark↔light | Three dark sections in a row |
| Outfit 900 for H1 | System font for headings |
| WhatsApp as primary mobile CTA | Only email contact on mobile |
| Real project photos | Stock photography |
| CSS + Vanilla JS | Heavy frameworks (GSAP, Three.js) |
