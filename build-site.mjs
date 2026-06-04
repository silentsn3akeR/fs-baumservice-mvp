import fs from "node:fs";
import path from "node:path";
import { services as oldServices, contact, areaServed, verifiedFacts, answerQuestions } from "./old-build-site.mjs";

const root = process.cwd();
const baseUrl = "http://fs-baumservice.de";
const deployBasePath = (process.env.DEPLOY_BASE_PATH || "").replace(/\/$/, "");
const deployBaseUrl = (process.env.DEPLOY_BASE_URL || baseUrl).replace(/\/$/, "");

// We will use the rich data from oldServices to build incredible subpages!

function sidebar() {
  return `<aside class="app-sidebar">
    <a class="brand" href="/">
      <div class="brand-mark"><img src="/assets/img/fs-baumservice-logo-original.jpg" alt="Logo"></div>
      <div class="brand-text"><strong>FS Baumservice</strong><small>Florian Stuck</small></div>
    </a>
    <nav class="app-nav">
      <a href="/" class="nav-btn is-active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> Übersicht</a>
      <a href="/leistungen/" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> Leistungen</a>
      <a href="/referenzen/" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> Galerie & Social</a>
      <a href="/ueber-uns/" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Über Uns</a>
      <a href="/angebot/" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> 3D-Konfigurator</a>
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
    <a href="/leistungen/" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></a>
    <a href="/angebot/" class="bottom-btn bottom-fab"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></a>
    <a href="/referenzen/" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><polyline points="21 15 16 10 5 21"/></svg></a>
    <a href="tel:${contact.phone}" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
  </nav>`;
}

function appLayout(body, title, description) {
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
  <title>${title} | FS Baumservice | Zollernalbkreis</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  <div class="custom-cursor"></div>
  <div class="custom-cursor-follower"></div>
  <div class="app-container">
    ${sidebar()}
    <main class="app-content">
      ${body}
      <footer class="app-footer">
        <div style="margin-bottom: 20px;">
          <a href="/impressum/" class="text-link">Impressum</a> | 
          <a href="/datenschutz/" class="text-link">Datenschutz</a> |
          <a href="/kontakt/" class="text-link">Kontakt</a>
        </div>
        FS Baumservice &copy; 2026. Regional im Einsatz in Bisingen, Balingen, Hechingen, Geislingen und Zollernalbkreis.
      </footer>
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

function writePage(pathname, title, desc, body) {
  const file = pathname === "/" ? "index.html" : path.join(pathname.slice(1), "index.html");
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  let html = appLayout(body, title, desc);
  if (deployBasePath) html = html.replaceAll('href="/', `href="${deployBasePath}/`).replaceAll('src="/', `src="${deployBasePath}/`);
  fs.writeFileSync(target, html);
}

// ==== PAGE DEFINITIONS ====

const homeBody = `
  ${appHero()}
  <section class="app-section">
    <h2 class="app-section-title">Unsere Kernkompetenzen.</h2>
    <div class="service-list">
      ${oldServices.map(s => `
        <a href="/leistungen/${s.slug}/" class="service-detail-card card-3d" style="text-decoration:none;">
          <div class="sdc-image"><img src="/assets/img/${s.image}" alt="${s.title}" loading="lazy"></div>
          <div class="sdc-content">
            <h3 class="lime-text">${s.name}</h3>
            <p class="sdc-intro">${s.intro}</p>
            <p class="sdc-desc">${s.description}</p>
            <span class="button-primary" style="display:inline-block; margin-top:20px;">Details ansehen</span>
          </div>
        </a>
      `).join("")}
    </div>
  </section>
  <section class="app-section">
    <div class="cta-row" style="text-align:center; padding: 60px; background: rgba(22, 24, 34, 0.6); border: 1px solid var(--glass-border); border-radius: var(--radius);">
      <h2 style="color:var(--white); margin-bottom: 20px;">Bereit für Ihr Projekt?</h2>
      <a href="/angebot/" class="button-primary" style="font-size: 1.5rem; padding: 20px 40px;">Zum 3D-Konfigurator</a>
    </div>
  </section>
`;

writePage("/", "Startseite", "FS Baumservice: Ihre Experten für Baumpflege", homeBody);

// Generate Service Subpages
for (const s of oldServices) {
  const body = `
    <section class="hero-app" style="height: 60vh; min-height: 400px;">
      <img class="hero-video-bg" src="/assets/img/${s.image}" style="filter: brightness(0.4);">
      <div class="hero-app-content">
        <h1>${s.name}</h1>
        <p>${s.title}</p>
      </div>
    </section>
    <section class="app-section">
      <div class="about-grid" style="grid-template-columns: 2fr 1fr;">
        <div>
          <h2 class="app-section-title">Auf einen Blick</h2>
          <p class="lead-text">${s.intro}</p>
          <p class="sdc-desc" style="font-size: 1.1rem; line-height: 1.8;">${s.description}</p>
          
          <h3 style="color:var(--white); margin-top: 40px; margin-bottom:20px; font-size:1.5rem;">Der Prozess</h3>
          <ul class="sdc-bullets" style="grid-template-columns: 1fr;">
            ${s.process.map(p => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> <span style="font-size:1.1rem;">${p}</span></li>`).join("")}
          </ul>
          
          <h3 style="color:var(--white); margin-top: 40px; margin-bottom:20px; font-size:1.5rem;">Einsatzgebiete</h3>
          <ul class="sdc-bullets" style="grid-template-columns: 1fr 1fr;">
            ${s.uses.map(u => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> ${u}</li>`).join("")}
          </ul>
        </div>
        <div>
          <div style="background: rgba(22, 24, 34, 0.8); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: 40px; position: sticky; top: 100px;">
            <h3 style="color:var(--white); margin-bottom:20px;">Ihre Vorteile</h3>
            <ul class="sdc-bullets" style="grid-template-columns: 1fr;">
              ${s.benefits.map(b => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> <strong style="color:var(--lime-500);">${b}</strong></li>`).join("")}
            </ul>
            <a href="/angebot/" class="button-primary" style="display:block; text-align:center; margin-top: 30px;">Jetzt anfragen</a>
          </div>
        </div>
      </div>
    </section>
    <section class="app-section" style="background: rgba(0,0,0,0.3);">
      <h2 class="app-section-title">Häufige Fragen zu ${s.name}</h2>
      <div class="faq-list" style="display: flex; flex-direction: column; gap: 20px; max-width: 800px;">
        ${s.faq.map(([q, a]) => `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 25px; border-radius: var(--radius-sm);">
            <h4 style="color:var(--lime-500); font-size: 1.2rem; margin-bottom: 10px;">${q}</h4>
            <p style="color:var(--text-muted); line-height: 1.6;">${a}</p>
          </div>
        `).join("")}
      </div>
    </section>
  `;
  writePage(`/leistungen/${s.slug}/`, s.title, s.description, body);
}

writePage("/leistungen/", "Alle Leistungen", "Übersicht unserer Baumpflege-Dienstleistungen", `
  <section class="app-section" style="padding-top: 100px;">
    <h1 class="app-section-title" style="font-size:4rem; color:var(--white);">Was wir <span class="lime-text">können.</span></h1>
    <p class="lead-text" style="max-width: 800px;">Alle Leistungen von FS Baumservice im Detail. Professionelle Baumpflege, Baumfällung per Seilklettertechnik, Grundstückspflege und mehr im Zollernalbkreis.</p>
    <div class="service-list" style="margin-top: 60px;">
      ${oldServices.map(s => `
        <a href="/leistungen/${s.slug}/" class="service-detail-card card-3d" style="text-decoration:none;">
          <div class="sdc-image"><img src="/assets/img/${s.image}" alt="${s.title}" loading="lazy"></div>
          <div class="sdc-content">
            <h3 class="lime-text">${s.name}</h3>
            <p class="sdc-intro">${s.intro}</p>
          </div>
        </a>
      `).join("")}
    </div>
  </section>
`);

// The Configurator / Angebot Page
writePage("/angebot/", "3D Konfigurator", "Schnelle und einfache Projektanfrage", `
  <section class="app-section" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding-top: 60px;">
    <div id="3d-wizard" class="wizard-container card-3d" style="width: 100%; max-width: 900px; background: rgba(22, 24, 34, 0.8); backdrop-filter: blur(30px); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: 50px;">
      
      <div class="wizard-progress" style="display:flex; gap: 10px; margin-bottom: 40px;">
        <div class="prog-step" style="flex:1; height:6px; background:var(--lime-500); border-radius:3px;"></div>
        <div class="prog-step" id="prog-2" style="flex:1; height:6px; background:var(--glass-border); border-radius:3px; transition: 0.5s;"></div>
        <div class="prog-step" id="prog-3" style="flex:1; height:6px; background:var(--glass-border); border-radius:3px; transition: 0.5s;"></div>
      </div>

      <!-- Step 1 -->
      <div id="step-1" class="wizard-step" style="transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Was dürfen wir für Sie tun?</h2>
        <p class="lead-text">Wählen Sie das passende Gewerk für Ihr Projekt.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">01</span><strong style="display:block; font-size:1.5rem;">Baumfällung</strong></button>
          <button class="option-card wiz-btn" onclick="nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">02</span><strong style="display:block; font-size:1.5rem;">Baumpflege</strong></button>
          <button class="option-card wiz-btn" onclick="nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">03</span><strong style="display:block; font-size:1.5rem;">Wurzelfräsen / Sonstiges</strong></button>
        </div>
      </div>

      <!-- Step 2 -->
      <div id="step-2" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Wie ist die Situation vor Ort?</h2>
        <p class="lead-text">Kurze Einschätzung der Zugänglichkeit.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Einfacher Zugang</strong><p style="color:var(--text-muted); margin-top:10px;">Garten/Straße gut erreichbar.</p></button>
          <button class="option-card wiz-btn" onclick="nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Schwer zugänglich</strong><p style="color:var(--text-muted); margin-top:10px;">Enges Grundstück, Seilklettertechnik nötig.</p></button>
        </div>
        <button onclick="prevStep(1)" class="button-outline-light" style="margin-top: 30px; display:inline-block; border:none; color:var(--text-muted); cursor:pointer; background:transparent;">Zurück</button>
      </div>

      <!-- Step 3 -->
      <div id="step-3" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Ihre Projektdaten</h2>
        <p class="lead-text">Fast geschafft! Wo dürfen wir helfen?</p>
        <form onsubmit="event.preventDefault(); alert('Die 3D-Anfrage funktioniert hervorragend! FS Baumservice wird informiert.'); window.location.href='/';">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:40px;">
            <input type="text" placeholder="Ort (z.B. Bisingen)" required style="padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;">
            <input type="tel" placeholder="Telefonnummer" required style="padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;">
          </div>
          <textarea placeholder="Weitere Details oder Besonderheiten (optional)" rows="4" style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;"></textarea>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 40px;">
            <button type="button" onclick="prevStep(2)" class="button-outline-light" style="border:none; color:var(--text-muted); cursor:pointer; background:transparent; font-size:1.1rem;">Zurück</button>
            <button type="submit" class="button-primary" style="padding: 20px 50px; font-size: 1.2rem; border:none; cursor:pointer;">Anfrage absenden</button>
          </div>
        </form>
      </div>

    </div>
  </section>
  <style>
    .wiz-btn:hover { border-color: var(--lime-500) !important; background: rgba(169, 209, 94, 0.1) !important; transform: translateY(-5px); }
  </style>
  <script>
    function nextStep(n) {
      document.querySelectorAll('.wizard-step').forEach(s => { s.style.opacity='0'; s.style.transform='translateX(-50px)'; setTimeout(()=>s.style.display='none', 300); });
      setTimeout(() => {
        const next = document.getElementById('step-'+n);
        next.style.display = 'block';
        setTimeout(() => { next.style.opacity='1'; next.style.transform='translateX(0)'; }, 50);
      }, 300);
      for(let i=1; i<=n; i++) document.getElementById('prog-'+i)?.style.setProperty('background', 'var(--lime-500)');
    }
    function prevStep(n) {
      document.querySelectorAll('.wizard-step').forEach(s => { s.style.opacity='0'; s.style.transform='translateX(50px)'; setTimeout(()=>s.style.display='none', 300); });
      setTimeout(() => {
        const next = document.getElementById('step-'+n);
        next.style.display = 'block';
        setTimeout(() => { next.style.opacity='1'; next.style.transform='translateX(0)'; }, 50);
      }, 300);
      for(let i=n+1; i<=3; i++) document.getElementById('prog-'+i)?.style.setProperty('background', 'var(--glass-border)');
    }
  </script>
`);

writePage("/impressum/", "Impressum", "Impressum der FS Baumservice", `
  <section class="app-section" style="padding-top: 100px;">
    <h1 class="app-section-title" style="color:var(--white);">Impressum</h1>
    <div style="background: rgba(22, 24, 34, 0.6); padding: 40px; border-radius: var(--radius); border: 1px solid var(--glass-border); color: var(--text-muted); font-size: 1.1rem; line-height: 1.8;">
      <p><strong>${contact.legalName}</strong><br>${contact.street}<br>${contact.postalCode} ${contact.locality}</p>
      <h3 style="color:var(--lime-500); margin-top:30px;">Kontakt</h3>
      <p>Telefon: ${contact.phoneDisplay}<br>E-Mail: ${contact.email}</p>
      <h3 style="color:var(--lime-500); margin-top:30px;">Inhaber</h3>
      <p>${contact.owner}</p>
    </div>
  </section>
`);

writePage("/datenschutz/", "Datenschutz", "Datenschutzerklärung", `
  <section class="app-section" style="padding-top: 100px;">
    <h1 class="app-section-title" style="color:var(--white);">Datenschutz</h1>
    <div style="background: rgba(22, 24, 34, 0.6); padding: 40px; border-radius: var(--radius); border: 1px solid var(--glass-border); color: var(--text-muted); font-size: 1.1rem; line-height: 1.8;">
      <h3 style="color:var(--lime-500);">Allgemein</h3>
      <p>Diese statische Website kann grundsätzlich ohne Registrierung genutzt werden. Beim Aufruf werden durch den Hosting-Anbieter technisch notwendige Zugriffsdaten verarbeitet.</p>
      <h3 style="color:var(--lime-500); margin-top:30px;">Kontaktaufnahme</h3>
      <p>Wenn Sie per Telefon, E-Mail oder über den 3D-Konfigurator Kontakt aufnehmen, werden Ihre Angaben zur Bearbeitung der Anfrage verwendet.</p>
    </div>
  </section>
`);
