# -*- coding: utf-8 -*-
"""Einmal-Patch: Scene Engine V2 (Register-Fix + CSS-Overrides + Hero-Veil)."""
import io, os
os.chdir(os.path.join(os.path.dirname(__file__), ".."))

s = io.open('pages/index.mjs', encoding='utf-8').read()
s = s.replace('<span class="reg-arrow" aria-hidden="true">→</span>\n    </div>\n    <a class="register-row"',
              '<span class="reg-arrow" aria-hidden="true">→</span>\n    </a>\n    <a class="register-row"')
if '<div class="hero-veil"' not in s:
    s = s.replace('  <div class="hero-inner shell">', '  <div class="hero-veil" aria-hidden="true"></div>\n  <div class="hero-inner shell">', 1)
# Kamera-Rig: Ebenen in .xv-cam wrappen
s = s.replace('''    <div class="xv-stage">
      <div class="xv-layer xv-bg" aria-hidden="true">''',
'''    <div class="xv-stage">
      <div class="xv-cam">
      <div class="xv-layer xv-bg" aria-hidden="true">''')
s = s.replace('''      <div class="xv-label xv-label--raum"><b>Arbeitsraum</b><span>Jedes Stück hängt am Seil, bevor es fällt.</span></div>
      <div class="xv-copy shell">''',
'''      <div class="xv-label xv-label--raum"><b>Arbeitsraum</b><span>Jedes Stück hängt am Seil, bevor es fällt.</span></div>
      </div>
      <div class="xv-copy shell">''')
io.open('pages/index.mjs', 'w', encoding='utf-8').write(s)
print("index fixed; register pairs:", s.count('</a>\n    <a class="register-row"'))

CSS_V2 = """

/* ==================================================================
   FS SCENE ENGINE V2 — CINEMATIC OVERRIDES (Experience First)
   ================================================================== */

/* ---------- SIG-01: BRAND ARRIVAL (zeitbasiert, einmalig) ---------- */
.hero-veil { position: absolute; inset: 0; z-index: 4; background: var(--ink-deep); opacity: 0; pointer-events: none; }
@media (prefers-reduced-motion: no-preference) {
  html.js .hero-veil { animation: veil-out 1.3s ease-out forwards; opacity: 1; }
  @keyframes veil-out { 0% { opacity: .85; } 45% { opacity: .4; } 100% { opacity: 0; } }
  html.js .hero-media > picture > img { animation: cam-settle 1.25s cubic-bezier(.22,.7,.25,1) both; }
  @keyframes cam-settle { from { transform: scale(1.15) translate3d(0, 12px, 0); } to { transform: scale(1.06) translate3d(0, 0, 0); } }
  html.js .hero-occl > picture > img { animation: trunk-settle 1.5s cubic-bezier(.2,.75,.2,1) both; }
  @keyframes trunk-settle { from { transform: scale(1.26) translate3d(0, -14px, 0); } to { transform: scale(1.06) translate3d(0, 0, 0); } }
  html.js .hero .hl-line { display: inline-block; opacity: 0; transform: translate3d(0, 130px, 0);
    animation: line-rise .85s cubic-bezier(.16,.84,.24,1) forwards; }
  html.js .hero .hero-headline .hl-line:nth-of-type(1) { animation-delay: .55s; }
  html.js .hero .hero-headline .hl-line:nth-of-type(2) { animation-delay: .72s; }
  html.js .hero .hero-headline .hl-line:nth-of-type(3) { animation-delay: .89s; }
  @keyframes line-rise { to { opacity: 1; transform: translate3d(0, 0, 0); } }
  html.js .hero .hero-protocol { opacity: 0; animation: hero-rise .7s ease .45s forwards; }
  html.js .hero .hero-foot { opacity: 0; animation: hero-rise .8s ease 1.35s forwards; }
  html.js .hero .annot { opacity: 0; animation: bracket-snap .55s cubic-bezier(.2,1.4,.4,1) 1.5s forwards; }
  @keyframes bracket-snap { 0% { opacity: 0; transform: scale(1.35); } 100% { opacity: 1; transform: scale(1); } }
  html.js .hero .hero-headline { opacity: 1; animation: none; translate: none;
    transform: translate3d(0, calc(var(--sy, 0) * -0.12px), 0); }
}

/* ---------- SIG-02 V2: KAMERA + BURST ---------- */
.xv-stage { perspective: 1100px; }
.xv-track { height: 220vh; }
.xv-cam { position: absolute; inset: 0; transform-style: preserve-3d; will-change: transform;
  transform: scale(calc(1 + var(--cam, 0) * 0.16 + var(--exit, 0) * 0.14))
             translate3d(calc(var(--cam, 0) * 1.5% - var(--exit, 0) * 6%), calc(var(--cam, 0) * 7%), 0); }
.xv-bg img { transform: scale(calc(1 - var(--sep, 0) * 0.07)) translate3d(0, calc(var(--sep, 0) * 26px), 0); will-change: transform; }
.xv-treeL img { transform: translate3d(calc(var(--sep, 0) * -92px), calc(var(--sep, 0) * -8px), 0) rotateY(calc(var(--sep, 0) * 2.5deg)) scale(calc(1 + var(--sep, 0) * 0.06)); will-change: transform; }
.xv-treeR img { transform: translate3d(calc(var(--sep, 0) * 116px), calc(var(--sep, 0) * -14px), 0) rotateY(calc(var(--sep, 0) * -3deg)) scale(calc(1 + var(--sep, 0) * 0.12)); will-change: transform; }
.xv-human img { transform: translate3d(0, calc(var(--sep, 0) * -54px), 0) scale(calc(1 + var(--sep, 0) * 0.32)); transform-origin: 48% 42%; will-change: transform; }
.xv-dim { opacity: calc(var(--sep, 0) * 0.68); }
.xv-zone { top: 30%; left: 43%; opacity: calc((var(--sep, 0) - .15) * 1.6);
  transform: translate3d(0, calc(var(--sep, 0) * -46px), 0) scale(calc(1 + var(--sep, 0) * 0.3)); }
.xk-a { display: inline-block; transform: translate3d(calc(var(--sep, 0) * -22px), 0, 0); }
.xk-b { display: inline-block; transform: translate3d(calc(var(--sep, 0) * 14px), calc(var(--sep, 0) * -6px), 0); }
.xk-c { display: inline-block; transform: translate3d(calc(var(--sep, 0) * 40px), calc(var(--sep, 0) * 4px), 0); }
.xv-leader { position: absolute; z-index: 3; height: 2px; background: var(--leaf); transform-origin: left center; transform: scaleX(0); opacity: .9; }
.xv-leader--umfeld { top: 21%; left: 16%; width: 12%; }
.xv-leader--baum { top: 39%; right: 20%; width: 11%; left: auto; transform-origin: right center; }
.xv-leader--mensch { top: 55%; left: 17%; width: 24%; }
.xview[data-state="s3"] .xv-leader--umfeld { transform: scaleX(1) rotate(-14deg); transition: transform .3s cubic-bezier(.2,.8,.2,1) .05s; }
.xview[data-state="s3"] .xv-leader--baum { transform: scaleX(1) rotate(-10deg); transition: transform .3s cubic-bezier(.2,.8,.2,1) .15s; }
.xview[data-state="s3"] .xv-leader--mensch { transform: scaleX(1) rotate(8deg); transition: transform .3s cubic-bezier(.2,.8,.2,1) .25s; }
.xv-label { transition: none; opacity: 0; clip-path: inset(0 100% 0 0); translate: none; }
.xview[data-state="s3"] .xv-label { opacity: 1; clip-path: inset(0 0 0 0); }
.xview[data-state="s3"] .xv-label--umfeld { transition: clip-path .35s ease .15s, opacity .2s ease .15s; }
.xview[data-state="s3"] .xv-label--baum { transition: clip-path .35s ease .25s, opacity .2s ease .25s; }
.xview[data-state="s3"] .xv-label--mensch { transition: clip-path .35s ease .35s, opacity .2s ease .35s; }
.xview[data-state="s3"] .xv-label--raum { transition: clip-path .35s ease .45s, opacity .2s ease .45s; }
.xview[data-state="s4"] .xv-label, .xview[data-state="s5"] .xv-label { opacity: 0; transition: opacity .25s ease; }
html:not(.js) .xview, .xview.xv-static { --sep: .85; --cam: .55; }
html:not(.js) .xv-label, .xview.xv-static .xv-label { opacity: 1; clip-path: inset(0 0 0 0); }
html:not(.js) .xv-leader--umfeld, .xview.xv-static .xv-leader--umfeld { transform: scaleX(1) rotate(-14deg); }
html:not(.js) .xv-leader--baum, .xview.xv-static .xv-leader--baum { transform: scaleX(1) rotate(-10deg); }
html:not(.js) .xv-leader--mensch, .xview.xv-static .xv-leader--mensch { transform: scaleX(1) rotate(8deg); }
@media (max-width: 47.9rem) {
  .xv-track { height: 170vh; }
  .xv-treeL img { transform: translate3d(calc(var(--sep, 0) * -44px), 0, 0) scale(calc(1 + var(--sep, 0) * 0.05)); }
  .xv-treeR img { transform: translate3d(calc(var(--sep, 0) * 52px), 0, 0) scale(calc(1 + var(--sep, 0) * 0.09)); }
  .xv-human img { transform: translate3d(0, calc(var(--sep, 0) * -34px), 0) scale(calc(1 + var(--sep, 0) * 0.40)); }
  .xv-leader { display: none; }
  .xv-cam { transform: scale(calc(1 + var(--cam, 0) * 0.10 + var(--exit, 0) * 0.10)) translate3d(0, calc(var(--cam, 0) * 5%), 0); }
}

/* ---------- SIG-03 V2: FREEZE -> PUNCH-OUT ---------- */
.vc-punch { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; object-fit: cover; opacity: 0; pointer-events: none;
  transition: opacity .3s ease, transform .55s cubic-bezier(.2,1.25,.35,1); transform: scale(1); will-change: transform; }
.vchapter.vc-punched video { transform: scale(0.94); }
.vchapter.vc-punched .vc-dim { opacity: .58; }
.vchapter.vc-punched .vc-punch { opacity: 1; transform: scale(1.17) translate3d(0, -14px, 0); }
@media (prefers-reduced-motion: reduce) {
  .vc-punch, .vchapter.vc-punched .vc-punch { transform: none; }
}
"""
with io.open('src/site.css', 'a', encoding='utf-8') as f:
    f.write(CSS_V2)
print("scene engine v2 css appended")
