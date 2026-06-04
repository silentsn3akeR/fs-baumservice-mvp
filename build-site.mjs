import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "http://fs-baumservice.de";
const deployBasePath = (process.env.DEPLOY_BASE_PATH || "").replace(/\/$/, "");
const deployBaseUrl = (process.env.DEPLOY_BASE_URL || baseUrl).replace(/\/$/, "");
const contact = {
  name: "FS Baumservice",
  legalName: "Florian Stuck Baumservice",
  phone: "+49-172-7256462",
  phoneDisplay: "0172 7256462",
  email: "info@fs-baumservice.de",
  instagram: "https://www.instagram.com/fs_baumservice/",
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function url(pathname = "/") { return `${deployBaseUrl}${pathname}`; }
function image(name) { return `/assets/img/${name}`; }

function sidebar() {
  return `<aside class="app-sidebar">
    <a class="brand" href="/">
      <div class="brand-mark"><img src="/assets/img/fs-baumservice-logo-original.jpg" alt="Logo"></div>
      <div class="brand-text"><strong>FS Baumservice</strong><small>Florian Stuck</small></div>
    </a>
    <nav class="app-nav">
      <a href="/" class="nav-btn is-active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> Übersicht</a>
      <a href="#showcase" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> Galerie & Einsätze</a>
      <a href="#anfrage" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Direktanfrage</a>
    </nav>
    <div class="sidebar-contact">
      <a href="tel:${contact.phone}" class="button-primary">Jetzt anrufen</a>
      <a href="https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}" class="nav-btn" style="color: #25D366"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> WhatsApp</a>
    </div>
  </aside>`;
}

function bottomBar() {
  return `<nav class="app-bottombar">
    <a href="/" class="bottom-btn is-active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> Home</a>
    <a href="#showcase" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><polyline points="21 15 16 10 5 21"/></svg> Galerie</a>
    <a href="#anfrage" class="bottom-btn bottom-fab"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></a>
    <a href="tel:${contact.phone}" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Anrufen</a>
  </nav>`;
}

function appLayout(body) {
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
  <title>FS Baumservice | Die Web-App</title>
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  <div class="custom-cursor"></div>
  <div class="custom-cursor-follower"></div>
  <div class="app-container">
    ${sidebar()}
    <main class="app-content">
      ${body}
      <footer class="app-footer">FS Baumservice &copy; 2026. Regional im Einsatz.</footer>
    </main>
    ${bottomBar()}
  </div>
  <script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}

function appHero() {
  const videoDir = path.join(root, "assets", "video", "instagram");
  const files = fs.existsSync(videoDir) ? fs.readdirSync(videoDir).filter(f => f.endsWith(".mp4")) : [];
  const bg = files.length ? `<video class="hero-video-bg" src="/assets/video/instagram/${files[0]}" autoplay muted loop playsinline></video>` : `<img class="hero-video-bg" src="${image("baumservice-luftbild-projekt.jpg")}">`;
  
  return `<section class="hero-app">
    ${bg}
    <div class="hero-app-content">
      <h1>Baumpflege. <br>Neu gedacht.</h1>
      <p>Willkommen beim FS Baumservice. Keine langen Texte – direkt zu den echten Ergebnissen und der schnellsten Projektanfrage der Region.</p>
    </div>
  </section>`;
}

function appShowcase() {
  const photos = [
    { img: "baumfaellung-bisingen-seilklettertechnik.jpg", badge: "Seilklettertechnik", title: "Präzision auf engstem Raum" },
    { img: "baumpflege-zollernalb-arbeitseinsatz.jpg", badge: "Baumpflege", title: "Kronenschnitt für Vitalität" },
    { img: "wurzelstockfraesen-baumservice.jpg", badge: "Fräsen", title: "Wurzelstock entfernen" },
    { img: "heckenschnitt-grundstueckspflege.jpg", badge: "Grundstück", title: "Saubere Kanten" },
    { img: "drohne-026.jpg", badge: "Drohne", title: "Übersicht von Oben" }
  ];
  return `<section id="showcase" class="app-section">
    <h2 class="app-section-title">Original Einsätze. <br>Keine Stockfotos.</h2>
    <div class="masonry-grid">
      ${photos.map(p => `<article class="masonry-item">
        <img src="${image(p.img)}" alt="${p.title}" loading="lazy">
        <div class="masonry-overlay">
          <span class="masonry-badge">${p.badge}</span>
          <h3>${p.title}</h3>
        </div>
      </article>`).join("")}
    </div>
  </section>`;
}

function appConfigurator() {
  return `<section id="anfrage" class="app-section">
    <h2 class="app-section-title">Direkt-Anfrage. <br>Einfach machen.</h2>
    <div class="config-hero">
      <form class="app-form" onsubmit="event.preventDefault(); alert('Die App-Anfrage funktioniert! Wir rufen Sie an.');">
        <div class="option-grid" style="margin-bottom: 40px;">
          <label class="option-card"><input type="radio" name="service" value="faellung"><span class="masonry-badge">01</span><strong>Baumfällung</strong></label>
          <label class="option-card"><input type="radio" name="service" value="pflege"><span class="masonry-badge">02</span><strong>Baumpflege</strong></label>
          <label class="option-card"><input type="radio" name="service" value="fraese"><span class="masonry-badge">03</span><strong>Wurzelfräsen</strong></label>
        </div>
        <div class="option-grid">
          <input type="text" placeholder="Wo ist das Projekt? (Ort)" required>
          <input type="tel" placeholder="Ihre Telefonnummer" required>
        </div>
        <button type="submit" class="button-primary" style="margin-top: 40px; width: 100%; border: none;">Kostenlos anfragen</button>
      </form>
    </div>
  </section>`;
}

function writePage(pathname, html) {
  const file = pathname === "/" ? "index.html" : path.join(pathname.slice(1), "index.html");
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (deployBasePath) html = html.replaceAll('href="/', `href="${deployBasePath}/"`).replaceAll('src="/', `src="${deployBasePath}/"`);
  fs.writeFileSync(target, html);
}

writePage("/", appLayout(`
  ${appHero()}
  ${appShowcase()}
  ${appConfigurator()}
`));
