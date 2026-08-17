// FS Signature — Template-Bibliothek (Shell, Header, Footer, Medien-Helper).
// Quelle der Wahrheit: signature/truth/*.json (Claims + Medien-Lineage).
const PREVIEW = true; // Release-Build setzt dies auf false (entfernt noindex + Banner)

/* ---------- Kontakt-Wahrheit (claims.json C-001..C-006) ---------- */
export const FS = {
  name: "FS Baumservice",
  legal: "Florian Stuck Baumservice",
  owner: "Florian Stuck",
  phoneDisplay: "0172 7256462", // C-004: OWNER_CONFIRM offen; preview-safe (foto-korroboriert)
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
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
${PREVIEW ? '<meta name="robots" content="noindex, nofollow">' : ""}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500&display=swap">
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
    ["/spezialfaellung/", "Spezialfällung"],
    ["/projekte/winterfaellung-am-wohnhaus/", "Projekte"],
    ["/#leistungen", "Leistungen"],
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
        <a href="/#leistungen">Baumfällung</a>
        <a href="/#leistungen">Baumpflege</a>
        <a href="/#leistungen">Wurzelstockfräsen</a>
      </div>
      <div class="foot-col">
        <p class="foot-h">Betrieb</p>
        <a href="/projekte/winterfaellung-am-wohnhaus/">Einsatzdokumentation</a>
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

