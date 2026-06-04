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

const services = [
  {
    id: "faellung",
    title: "Baumfällung & Spezialfällung",
    intro: "Sichere Fällung von Problembäumen auf engstem Raum.",
    desc: "Wenn ein Baum krank, instabil oder schlichtweg zu groß geworden ist, bieten wir die professionelle Fällung an. Durch den Einsatz modernster Seilklettertechnik (SKT) und Hubarbeitsbühnen fällen wir auch an extrem schwer zugänglichen Orten – ohne Ihr Haus oder Ihren Garten zu beschädigen. Wir übernehmen das stückweise Abtragen und sorgen für höchste Sicherheit in Bisingen, Balingen und dem gesamten Zollernalbkreis.",
    bullets: ["Seilklettertechnik (SKT) für schwierige Standorte", "Hubarbeitsgeräte & Kranfällungen", "Stückweises Abtragen ohne Flurschaden", "Komplette Entsorgung von Stammholz & Schnittgut"],
    img: "baumfaellung-bisingen-seilklettertechnik.jpg"
  },
  {
    id: "pflege",
    title: "Fachgerechte Baumpflege",
    intro: "Erhalt der Vitalität und Sicherheit Ihrer Bäume.",
    desc: "Baumpflege ist mehr als nur 'Äste abschneiden'. Wir arbeiten streng nach der ZTV-Baumpflege, um die Gesundheit und Statik Ihrer Bäume zu erhalten. Ob Totholzentfernung, Kronenpflege oder Lichtraumprofilschnitt – wir schneiden so schonend wie möglich. Ein gesunder Baum ist ein sicherer Baum.",
    bullets: ["Totholzentfernung & Kronenpflege", "Lichtraumprofilschnitt an Straßen", "Erhaltung der Baumstatik (ZTV-Baumpflege)", "Schonende Eingriffe statt Kappungen"],
    img: "baumpflege-zollernalb-arbeitseinsatz.jpg"
  },
  {
    id: "fraese",
    title: "Wurzelstockfräsen",
    intro: "Restlose Entfernung von störenden Baumstümpfen.",
    desc: "Nach der Fällung bleibt der Wurzelstock oft als Stolperfalle oder Hindernis für die Gartengestaltung zurück. Mit unseren leistungsstarken Wurzelstockfräsen entfernen wir den Stumpf tiefgründig und sauber aus dem Boden. Danach können Sie sofort Rasen säen oder neu pflanzen.",
    bullets: ["Tiefgründiges Fräsen unter Bodenniveau", "Schmale Maschinen für schmale Gartentore", "Schnelle Wiederverwendbarkeit der Fläche", "Kein teurer Bagger-Aushub nötig"],
    img: "wurzelstockfraesen-baumservice.jpg"
  },
  {
    id: "hecke",
    title: "Heckenschnitt & Grundstückspflege",
    intro: "Präziser Schnitt für dichte und gesunde Hecken.",
    desc: "Eine gepflegte Hecke ist die Visitenkarte Ihres Grundstücks. Wir übernehmen den fachgerechten Formschnitt und Rückschnitt von Hecken jeder Größe. Darüber hinaus kümmern wir uns um die allgemeine Grundstückspflege, damit Ihr Außenbereich in Bisingen und Umgebung stets einen perfekten Eindruck hinterlässt.",
    bullets: ["Exakter Formschnitt & radikaler Rückschnitt", "Pflege von extrem hohen oder breiten Hecken", "Gründliche Reinigung des Arbeitsbereichs", "Abtransport des Grünguts"],
    img: "heckenschnitt-grundstueckspflege.jpg"
  },
  {
    id: "rasen",
    title: "Rollrasen Verlegung",
    intro: "Sofortiges Grün für Ihren Garten.",
    desc: "Nach Bauarbeiten, starken Wurzelstockfräsungen oder einfach zur Neugestaltung: Rollrasen bietet innerhalb kürzester Zeit eine dichte, nutzbare Grünfläche. Wir übernehmen die komplette Vorbereitung des Bodens (Planum) und verlegen Premium-Rollrasen fachmännisch.",
    bullets: ["Bodenaufbereitung & Planum", "Verlegung von Premium-Rollrasen", "Beratung zur Anwuchsphase", "Sofort grünes Ergebnis"],
    img: "rollrasen-gruenflaeche-fs-baumservice.svg"
  }
];

function sidebar() {
  return `<aside class="app-sidebar">
    <a class="brand" href="/">
      <div class="brand-mark"><img src="/assets/img/fs-baumservice-logo-original.jpg" alt="Logo"></div>
      <div class="brand-text"><strong>FS Baumservice</strong><small>Florian Stuck</small></div>
    </a>
    <nav class="app-nav">
      <a href="/" class="nav-btn is-active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> Übersicht</a>
      <a href="#leistungen" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> Leistungen</a>
      <a href="#showcase" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> Galerie & Social</a>
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
    <a href="/" class="bottom-btn is-active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></a>
    <a href="#leistungen" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></a>
    <a href="#anfrage" class="bottom-btn bottom-fab"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></a>
    <a href="#showcase" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><polyline points="21 15 16 10 5 21"/></svg></a>
    <a href="tel:${contact.phone}" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
  </nav>`;
}

function appLayout(body) {
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
  <title>FS Baumservice | Florian Stuck | Bisingen & Zollernalbkreis</title>
  <meta name="description" content="Sichere Baumfällung, Baumpflege nach ZTV, Seilklettertechnik und Wurzelstockfräsen in Bisingen, Balingen, Hechingen und Umgebung. FS Baumservice Florian Stuck.">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  <div class="custom-cursor"></div>
  <div class="custom-cursor-follower"></div>
  <div class="app-container">
    ${sidebar()}
    <main class="app-content">
      ${body}
      <footer class="app-footer">FS Baumservice &copy; 2026. Regional im Einsatz in Bisingen, Balingen, Hechingen, Geislingen und Zollernalbkreis.</footer>
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
  const bg = files.length ? `<video class="hero-video-bg" src="/assets/video/instagram/${files[0]}" autoplay muted loop playsinline></video>` : `<img class="hero-video-bg" src="/assets/img/baumservice-luftbild-projekt.jpg">`;
  
  return `<section class="hero-app">
    ${bg}
    <div class="hero-app-content">
      <h1>Baumpflege. <br>Neu gedacht.</h1>
      <p>Sichere Baumfällung, professionelle Pflege nach ZTV-Standard und Seilklettertechnik in Bisingen, Balingen und Umgebung.</p>
    </div>
  </section>`;
}

function appAbout() {
  return `<section id="about" class="app-section about-section">
    <div class="about-grid">
      <div class="about-text">
        <h2 class="app-section-title">Baumservice aus Bisingen.</h2>
        <p class="lead-text">FS Baumservice steht für sichere Baumarbeiten, Seilklettertechnik, Wurzelstockfräsen, Heckenschnitt und Rollrasen – direkt aus der Region, mit dem richtigen Werkzeug für jede Situation.</p>
        <div class="trust-badges">
          <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> ZTV-Baumpflege Standard</div>
          <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Sichere Seilklettertechnik</div>
          <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Regional (Bisingen/Balingen)</div>
        </div>
      </div>
      <div class="about-image card-3d">
        <img src="/assets/img/fs-baumservice-florina-stuck.jpg" alt="Florian Stuck - FS Baumservice">
      </div>
    </div>
  </section>`;
}

function appDetailedServices() {
  return `<section id="leistungen" class="app-section">
    <h2 class="app-section-title">Unsere Leistungen. <br>Ihre Lösung.</h2>
    <div class="service-list">
      ${services.map(s => `
        <article class="service-detail-card card-3d">
          <div class="sdc-image">
            <img src="/assets/img/${s.img}" alt="${s.title}" loading="lazy">
          </div>
          <div class="sdc-content">
            <h3 class="lime-text">${s.title}</h3>
            <p class="sdc-intro">${s.intro}</p>
            <p class="sdc-desc">${s.desc}</p>
            <ul class="sdc-bullets">
              ${s.bullets.map(b => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> ${b}</li>`).join("")}
            </ul>
          </div>
        </article>
      `).join("")}
    </div>
  </section>`;
}

function appSocialShowcase() {
  const videoDir = path.join(root, "assets", "video", "instagram");
  const files = fs.existsSync(videoDir) ? fs.readdirSync(videoDir).filter(f => f.endsWith(".mp4")) : [];
  
  return `<section id="showcase" class="app-section">
    <h2 class="app-section-title">Direkt aus dem Einsatz. <br><a href="${contact.instagram}" target="_blank" class="lime-text">@fs_baumservice</a></h2>
    <div class="social-hub">
      ${files.map(f => `
        <div class="social-video-card">
          <video src="/assets/video/instagram/${f}" autoplay muted loop playsinline></video>
          <div class="social-overlay">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            <span>Instagram Reel</span>
          </div>
        </div>
      `).join("")}
    </div>
  </section>`;
}

function appConfigurator() {
  return `<section id="anfrage" class="app-section">
    <h2 class="app-section-title">Projekt starten. <br>Einfach anfragen.</h2>
    <div class="config-hero">
      <form class="app-form" onsubmit="event.preventDefault(); alert('Die Anfrage funktioniert! Wir melden uns.');">
        <div class="option-grid" style="margin-bottom: 40px;">
          <label class="option-card"><input type="radio" name="service" value="faellung"><span class="masonry-badge">01</span><strong>Baumfällung</strong></label>
          <label class="option-card"><input type="radio" name="service" value="pflege"><span class="masonry-badge">02</span><strong>Baumpflege</strong></label>
          <label class="option-card"><input type="radio" name="service" value="fraese"><span class="masonry-badge">03</span><strong>Wurzelfräsen</strong></label>
        </div>
        <div class="field-grid">
          <input type="text" placeholder="Wo ist das Projekt? (Ort z.B. Bisingen)" required>
          <input type="tel" placeholder="Ihre Telefonnummer" required>
        </div>
        <textarea placeholder="Kurze Beschreibung (optional)" rows="3" style="margin-top: 30px;"></textarea>
        <button type="submit" class="button-primary" style="margin-top: 40px; width: 100%; border: none;">Kostenlos anfragen</button>
      </form>
    </div>
  </section>`;
}

function writePage(pathname, html) {
  const file = pathname === "/" ? "index.html" : path.join(pathname.slice(1), "index.html");
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (deployBasePath) html = html.replaceAll('href="/', `href="${deployBasePath}/`).replaceAll('src="/', `src="${deployBasePath}/`);
  fs.writeFileSync(target, html);
}

writePage("/", appLayout(`
  ${appHero()}
  ${appAbout()}
  ${appDetailedServices()}
  ${appSocialShowcase()}
  ${appConfigurator()}
`));
