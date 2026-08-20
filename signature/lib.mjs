// FS Signature — Template-Bibliothek (Shell, Header, Footer, Medien-Helper).
// Quelle der Wahrheit: signature/truth/*.json (Claims + Medien-Lineage).
// Release-Posture: der Release-Build setzt FS_RELEASE=1 (entfernt noindex + Preview-Banner).
// Ohne die Variable bleibt der lokale Build bewusst auf Preview (noindex).
const PREVIEW = process.env.FS_RELEASE !== "1";

// Publikations-Basis. Lokal "/", auf GitHub Pages (Project Site) "/fs-baumservice-mvp/".
// Kanonischer Mechanismus: hier definiert, in build.mjs auf das erzeugte HTML angewendet.
const RAW_BASE = process.env.PUBLIC_BASE || "/";
export const BASE = ("/" + RAW_BASE.replace(/^\/+|\/+$/g, "")).replace(/^\/$/, "");
export const SITE_ORIGIN = (process.env.SITE_ORIGIN || "https://silentsn3akeR.github.io").replace(/\/+$/, "");
export const withBase = (p) => (p.startsWith("/") ? BASE + p : p);

/* ---------- Kontakt-Wahrheit (claims.json C-001..C-006) ---------- */
export const FS = {
  name: "FS Baumservice",
  legal: "Florian Stuck Baumservice",
  owner: "Florian Stuck",
  phoneDisplay: "0172 7256462", // C-004: OWNER-entschieden (RELEASE_DECISIONS_20260820) — kanonische Nummer
  phoneHref: "tel:+491727256462",
  email: "info@fs-baumservice.de",
  region: "Bisingen · Balingen · Hechingen · Geislingen · Zollernalbkreis",
  instagram: "https://www.instagram.com/fs_baumservice/",
};

/* ---------- Medien-Helper (Derivate aus media_build.py) ---------- */
export function img({ master, slot, widths, sizes, alt, ratio, eager = false, position, mobile }) {
  const src = (m, s, w, f) => `/media/${m}__${s}__${w}.${f}`;
  const set = (m, s, ws, f) => ws.map((w) => `${src(m, s, w, f)} ${w}w`).join(", ");
  const largest = Math.max(...widths);
  const style = [ratio ? `aspect-ratio:${ratio}` : "", position ? `object-position:${position}` : ""].filter(Boolean).join(";");
  const mob = mobile
    ? `<source media="${mobile.media}" type="image/webp" srcset="${set(mobile.master ?? master, mobile.slot, mobile.widths, "webp")}" sizes="100vw">
    <source media="${mobile.media}" srcset="${set(mobile.master ?? master, mobile.slot, mobile.widths, "jpg")}" sizes="100vw">\n    `
    : "";
  return `<picture>
    ${mob}<source type="image/webp" srcset="${set(master, slot, widths, "webp")}" sizes="${sizes}">
    <img src="${src(master, slot, largest, "jpg")}" srcset="${set(master, slot, widths, "jpg")}" sizes="${sizes}" alt="${alt}"
      ${eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}${style ? ` style="${style}"` : ""}>
  </picture>`;
}

export const protocol = (label, opts = {}) => {
  const tag = opts.h ? `h${opts.h}` : "p";
  return `<${tag} class="protocol${opts.end ? " protocol--end" : ""}"${opts.id ? ` id="${opts.id}"` : ""}>${label}</${tag}>`;
};

/* ---------- Shell ---------- */
export function pageShell({ title, desc, path: pagePath, body, current, headerOnPaper = false }) {
  const canonical = SITE_ORIGIN + BASE + (pagePath || "/");
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
${PREVIEW ? '<meta name="robots" content="noindex, nofollow">' : ""}
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="FS Baumservice">
<meta property="og:locale" content="de_DE">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE_ORIGIN}${BASE}/media/M-01__hero__1440.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" as="font" type="font/woff2" href="/fonts/archivo-latin-var.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/fonts/ibm-plex-mono-500-latin.woff2" crossorigin>
<link rel="stylesheet" href="/site.css">
</head>
<body>
<a class="skip" href="#main">Zum Inhalt springen</a>
${header(current, { onPaper: headerOnPaper })}
<main id="main">
${body}
</main>
${footer()}
${PREVIEW ? '<p class="preview-note" aria-hidden="true">Preview — nicht veröffentlicht</p>' : ""}
<script src="/site.js" defer></script>
</body>
</html>`;
}

export function header(current, { onPaper = false } = {}) {
  const nav = [
    ["/leistungen/", "Leistungen"],
    ["/spezialfaellung/", "Spezialfällung"],
    ["/projekte/", "Projekte"],
    ["/ueber-fs/", "Über FS"],
    ["/kontakt/", "Kontakt"],
  ];
  return `<header class="site-head${onPaper ? " site-head--onpaper" : ""}">
  <a class="wordmark bracket" href="/">
    <span class="wm-eyebrow">Florian Stuck</span>
    <span class="wm-main">Baumservice</span>
  </a>
  <nav class="site-nav" aria-label="Hauptnavigation">
    ${nav.map(([href, label]) => `<a href="${href}"${current === href ? ' aria-current="page"' : ""}>${label}</a>`).join("\n    ")}
  </nav>
  <a class="head-phone" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
</header>`;
}

export function footer() {
  return `<footer class="site-foot dark">
  <div class="shell">
    <div class="foot-grid">
      <div class="foot-col">
        <a class="wordmark bracket" href="/" style="justify-self:start">
          <span class="wm-eyebrow">Florian Stuck</span>
          <span class="wm-main">Baumservice</span>
        </a>
        <p class="muted" style="font-size:var(--small);max-width:26em">Baumarbeiten mit Seilklettertechnik und passender Technik — inhabergeführt, im Zollernalbkreis zuhause.</p>
      </div>
      <div class="foot-col">
        <p class="foot-h">Leistungen</p>
        <a href="/spezialfaellung/">Spezialfällung</a>
        <a href="/leistungen/baumfaellung/">Baumfällung</a>
        <a href="/leistungen/baumpflege/">Baumpflege</a>
        <a href="/leistungen/wurzelstockfraesen/">Wurzelstockfräsen</a>
        <a href="/leistungen/">Alle Leistungen</a>
      </div>
      <div class="foot-col">
        <p class="foot-h">Betrieb</p>
        <a href="/projekte/">Einsatzdokumentation</a>
        <a href="/ueber-fs/">Über FS</a>
        <a href="/wissen/">Wissen</a>
        <a href="/kontakt/">Kontakt &amp; Anfrage</a>
        <a href="${FS.instagram}" rel="noopener">Instagram</a>
      </div>
      <div class="foot-col">
        <p class="foot-h">Rechtliches</p>
        <a href="/impressum/">Impressum</a>
        <a href="/datenschutz/">Datenschutz</a>
      </div>
    </div>
    <div class="foot-line">
      <span>${FS.legal} — ${FS.region}</span>
      <span>© 2026</span>
    </div>
  </div>
</footer>`;
}

