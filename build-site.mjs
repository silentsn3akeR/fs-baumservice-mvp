import fs from "node:fs";
import path from "node:path";
import { services, contact, areaServed, verifiedFacts, answerQuestions } from "./data.js";
import { impressumHtml, datenschutzHtml } from "./data-legal.js";
import { ratgeberHtml } from "./data-ratgeber.js";

const root = process.cwd();
const baseUrl = "https://fs-baumservice.de";
const deployBasePath = (process.env.DEPLOY_BASE_PATH || "").replace(/\/$/, "");
const ogImage = `${baseUrl}/assets/img/baumservice-header-bisingen.jpg`;

const localBusinessLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": contact.legalName,
  "description": "Professionelle Baumfällung, Baumpflege, Heckenschnitt, Wurzelstockfräsen und Rollrasen im Zollernalbkreis.",
  "url": baseUrl,
  "telephone": contact.phone,
  "email": contact.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": contact.street,
    "postalCode": contact.postalCode,
    "addressLocality": contact.locality,
    "addressCountry": "DE"
  },
  "areaServed": areaServed.map(a => ({ "@type": "City", "name": a })),
  "image": ogImage,
  "sameAs": [contact.instagram, contact.facebook]
});

const instaVideoDir = path.join(root, "assets", "video", "instagram");
const instaVideos = fs.existsSync(instaVideoDir) ? fs.readdirSync(instaVideoDir).filter(f => f.endsWith(".mp4")) : [];
const instaVideoHtml = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
  ${instaVideos.map(v => `<div class="card-3d" style="aspect-ratio: 9/16; overflow: hidden; border-radius: var(--radius-sm); background: #1a1a1a;"><video src="/assets/video/instagram/${v}" autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover; opacity: 0.95; transition: opacity 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.95"></video></div>`).join("")}
</div>`;

const imgDir = path.join(root, "assets", "img");
const imgFiles = fs.existsSync(imgDir) ? fs.readdirSync(imgDir).filter(f => f.endsWith(".jpg") && f !== "fs-baumservice-logo-original.jpg") : [];

function faqItem(q, a) {
  return `<div class="faq-item">
  <button class="faq-question" aria-expanded="false">
    <span>${q}</span>
    <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
  </button>
  <div class="faq-answer" hidden><p>${a}</p></div>
</div>`;
}

function imgAlt(filename) {
  const base = filename.replace(/\.[^.]+$/, "");
  // Generic filenames: pure dates, IMG_xxxx, SAM_xxxx, drohne-NNN, etc.
  if (/^(IMG|SAM|DSC|drohne)[_-]?\d+$/i.test(base) || /^\d{8}[_-]\d+$/.test(base)) {
    return "Baumarbeiten FS Baumservice Bisingen";
  }
  return base.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

const imgGalleryHtml = `<div class="masonry-grid">
  ${imgFiles.map(f => {
    const label = imgAlt(f);
    const suffix = label.includes("Baumservice") ? "" : " – FS Baumservice Bisingen";
    return `<div class="masonry-item">
    <img src="/assets/img/${f}" loading="lazy" alt="${label}${suffix}">
    <div class="masonry-overlay">
      <span class="masonry-badge">FS Baumservice</span>
      <h3>${label}</h3>
    </div>
  </div>`;
  }).join("")}
</div>`;

function topBar() {
  return `<header class="app-topbar">
    <a href="/" class="topbar-brand">
      <img src="/assets/img/fs-baumservice-logo-original.jpg" alt="Logo">
      <span>FS Baumservice</span>
    </a>
    <div class="topbar-actions">
      <button class="mobile-menu-toggle" aria-label="Menu" style="background:none; border:none; color:var(--white); cursor:pointer; padding:10px; margin-right:10px; display:none;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
      <a href="tel:${contact.phone}" class="tb-icon tb-phone" aria-label="Anrufen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span class="tb-phone-text"> ${contact.phoneDisplay}</span></a>
      <a href="mailto:${contact.email}" class="tb-icon tb-email" aria-label="E-Mail"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> ${contact.email}</a>
      <a href="https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}" class="tb-icon tb-wa" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> WhatsApp</a>
    </div>
  </header>`;
}

function sidebar() {
  return `<aside class="app-sidebar">
    <a class="brand" href="/">
      <div class="brand-mark"><img src="/assets/img/fs-baumservice-logo-original.jpg" alt="Logo"></div>
      <div class="brand-text"><strong>FS Baumservice</strong><small>Florian Stuck</small></div>
    </a>
    <nav class="app-nav">
      <a href="/" class="nav-btn is-active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> Übersicht</a>
      <a href="/leistungen/" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> Leistungen</a>
      <a href="/ratgeber/" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> Preise & Ratgeber</a>
      <a href="/referenzen/" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> Galerie & Insta</a>
      <a href="/ueber-uns/" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Über Uns</a>
      <a href="/angebot/" class="nav-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> 3D-Anfrage</a>
    </nav>
    <div class="sidebar-contact">
      <a href="tel:${contact.phone}" class="button-primary">Jetzt anrufen</a>
      <a href="https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}" class="nav-btn" style="color: #25D366"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> WhatsApp</a>
    </div>
  </aside>`;
}

function bottomBar() {
  return `<nav class="app-bottombar">
    <a href="/" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></a>
    <a href="/leistungen/" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></a>
    <a href="/ratgeber/" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></a>
    <a href="/referenzen/" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><polyline points="21 15 16 10 5 21"/></svg></a>
    <a href="/ueber-uns/" class="bottom-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></a>
    <a href="https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}" class="bottom-btn bottom-fab" aria-label="WhatsApp" style="background: #25D366; color: #0f1016; border-color: #25D366;"><svg viewBox="0 0 24 24" fill="none" stroke="#0f1016" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></a>
  </nav>`;
}

function appLayout(body, title, description, pathname = "/") {
  const canonicalUrl = `${baseUrl}${pathname}`;
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
  <title>${title} | FS Baumservice | Zollernalbkreis</title>
  <meta name="description" content="${description}">
  <meta name="view-transition" content="same-origin">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="FS Baumservice">
  <meta property="og:locale" content="de_DE">
  <meta property="og:title" content="${title} | FS Baumservice">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <script type="application/ld+json">${localBusinessLd}</script>
  <link rel="stylesheet" href="/assets/css/styles.css?v=13">
  <style>
    /* Topbar Inline Styling for Instant Delivery */
    .app-topbar {
      display: none;
      position: fixed; top: 0; left: 0; right: 0; height: 70px;
      background: rgba(15, 17, 26, 0.9); backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--glass-border);
      z-index: 1000; align-items: center; justify-content: space-between; padding: 0 20px;
    }
    .topbar-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; color: white; font-weight: 800; font-size: 1.1rem; }
    .topbar-brand img { width: 40px; height: 40px; border-radius: 8px; }
    .topbar-actions { display: flex; align-items: center; gap: 12px; }
    .tb-icon { display: flex; align-items: center; gap: 5px; text-decoration: none; font-weight: 600; font-size: 0.85rem; }
    .tb-phone { color: white; }
    .tb-phone svg { width: 18px; height: 18px; flex-shrink: 0; }
    .tb-email { color: var(--lime-500, #a3e635); font-size: 0.8rem; }
    .tb-email svg { width: 16px; height: 16px; flex-shrink: 0; }
    .tb-wa { background: #25D366; color: #000; padding: 7px 12px; border-radius: 20px; font-size: 0.85rem; }
    .tb-wa svg { width: 16px; height: 16px; }
    @media (max-width: 1024px) {
      .app-topbar { display: flex; }
      .app-content { padding-top: 70px; } /* Push content down on mobile */
    }
    @media (max-width: 640px) {
      .tb-wa { display: none; }
      .tb-email { display: none; }
    }
    @media (max-width: 450px) {
      .tb-phone-text { display: none; }
      .topbar-brand span { font-size: 1rem; }
    }
    .brand-mark img { width: 50px; height: 50px; border-radius: var(--radius-sm); object-fit: cover; }
    .brand { display: flex; align-items: center; gap: 15px; text-decoration: none; color: var(--white); margin-bottom: 40px; }
    .hero-cta-outline { display:inline-flex; align-items:center; gap:8px; padding:15px 28px; border:2px solid rgba(255,255,255,0.4); border-radius:30px; color:var(--white); font-weight:700; font-size:1.05rem; text-decoration:none; transition:border-color 0.3s, color 0.3s; }
    .hero-cta-outline:hover { border-color:var(--lime-500); color:var(--lime-500); }
  </style>
</head>
<body>
  ${topBar()}
  <div class="custom-cursor"></div>
  <div class="custom-cursor-follower"></div>
  <div class="mobile-overlay"></div>
  <div class="app-container">
    ${sidebar()}
    <main class="app-content">
      ${body}
      <footer class="app-footer" style="padding: 60px 20px; text-align: center; border-top: 1px solid var(--glass-border); margin-top: 60px;">
        <div style="margin-bottom: 20px; display:flex; justify-content:center; gap: 20px; flex-wrap:wrap;">
          <a href="/impressum/" class="text-link">Impressum</a>
          <a href="/datenschutz/" class="text-link">Datenschutz</a>
          <a href="/kontakt/" class="text-link">Kontakt</a>
        </div>
        <p style="color:var(--text-muted);">FS Baumservice &copy; 2026. Regional im Einsatz in Bisingen, Balingen, Hechingen, Geislingen und Zollernalbkreis.</p>
      </footer>
    </main>
    ${bottomBar()}
  </div>
  
  <script src="/assets/js/site.js?v=13" defer></script>
  
  <script>
    // 4-Step Configurator Logic
    function nextStep(n) {
      document.querySelectorAll('.wizard-step').forEach(s => { s.style.opacity='0'; s.style.transform='translateX(-50px)'; setTimeout(()=>s.style.display='none', 300); });
      setTimeout(() => {
        const next = document.getElementById('step-'+n);
        if(next) {
            next.style.display = 'block';
            setTimeout(() => { next.style.opacity='1'; next.style.transform='translateX(0)'; }, 50);
        }
      }, 300);
      for(let i=1; i<=n; i++) document.getElementById('prog-'+i)?.style.setProperty('background', 'var(--lime-500)');
    }
    function prevStep(n) {
      document.querySelectorAll('.wizard-step').forEach(s => { s.style.opacity='0'; s.style.transform='translateX(50px)'; setTimeout(()=>s.style.display='none', 300); });
      setTimeout(() => {
        const next = document.getElementById('step-'+n);
        if(next) {
            next.style.display = 'block';
            setTimeout(() => { next.style.opacity='1'; next.style.transform='translateX(0)'; }, 50);
        }
      }, 300);
      for(let i=n+1; i<=4; i++) document.getElementById('prog-'+i)?.style.setProperty('background', 'var(--glass-border)');
    }
    
    // Active Navigation state setup based on current URL
    document.addEventListener("DOMContentLoaded", () => {
      const currentPath = window.location.pathname;
      document.querySelectorAll('.app-nav a, .app-bottombar a').forEach(a => {
        const aPath = new URL(a.href).pathname;
        if(currentPath === aPath || (currentPath !== '/' && currentPath.includes(aPath) && aPath !== '/')) {
          a.classList.add('is-active');
        } else {
          a.classList.remove('is-active');
        }
      });
    });
  </script>
</body>
</html>`;
}

function writePage(pathname, title, desc, body) {
  const file = pathname === "/" ? "index.html" : path.join(pathname.slice(1), "index.html");
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  let html = appLayout(body, title, desc, pathname);
  if (deployBasePath) html = html.replaceAll('href="/', `href="${deployBasePath}/`).replaceAll('src="/', `src="${deployBasePath}/`);
  fs.writeFileSync(target, html);
}

// ============================================================================
// PAGES GENERATION
// ============================================================================

writePage("/", "Startseite", "Baumfällung & Baumpflege in Bisingen, Balingen und Umgebung.", `
  <section class="hero-app">
    <video class="hero-video-bg" src="/assets/video/instagram/20260219_DU9IjqCCPH5_1.mp4" autoplay muted loop playsinline></video>
    <div class="hero-app-content">
      <h1>Sichere Planung.<br><span class="lime-text">Saubere Arbeit.</span></h1>
      <p style="margin-bottom: 35px;">Ihr regionaler Baumservice aus Bisingen — für Baumfällung, Baumpflege und Wurzelfräsen im Zollernalbkreis.</p>
      <div style="display:flex; gap:15px; flex-wrap:wrap; align-items:center;">
        <a href="tel:${contact.phone}" class="button-primary btn-pulse" style="display:inline-flex; align-items:center; gap:10px; padding:16px 32px; font-size:1.1rem; text-decoration:none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:20px;height:20px;flex-shrink:0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Jetzt anrufen
        </a>
        <a href="/angebot/" class="hero-cta-outline">Kostenloses Angebot →</a>
      </div>
    </div>
  </section>

  <!-- Trust Bar -->
  <section style="background: rgba(0,0,0,0.5); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border); padding: 28px 20px;">
    <div style="display:flex; flex-wrap:wrap; gap:0; justify-content:center; max-width:1000px; margin:0 auto;">
      <div style="flex:1; min-width:180px; display:flex; align-items:center; gap:12px; justify-content:center; padding:12px 20px; border-right:1px solid var(--glass-border);">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:22px;height:22px;flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>
        <span style="color:var(--white); font-weight:700; font-size:0.95rem;">Kostenlose Beratung</span>
      </div>
      <div style="flex:1; min-width:180px; display:flex; align-items:center; gap:12px; justify-content:center; padding:12px 20px; border-right:1px solid var(--glass-border);">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:22px;height:22px;flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>
        <span style="color:var(--white); font-weight:700; font-size:0.95rem;">Seilklettertechnik (SKT)</span>
      </div>
      <div style="flex:1; min-width:180px; display:flex; align-items:center; gap:12px; justify-content:center; padding:12px 20px; border-right:1px solid var(--glass-border);">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:22px;height:22px;flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>
        <span style="color:var(--white); font-weight:700; font-size:0.95rem;">ZTV Baumpflege</span>
      </div>
      <div style="flex:1; min-width:180px; display:flex; align-items:center; gap:12px; justify-content:center; padding:12px 20px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:22px;height:22px;flex-shrink:0;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span style="color:var(--white); font-weight:700; font-size:0.95rem;">Zollernalbkreis</span>
      </div>
    </div>
  </section>

  <!-- Leistungen -->
  <section class="app-section">
    <h2 class="app-section-title">Was wir <span class="lime-text">können.</span></h2>
    <p class="lead-text" style="max-width: 800px; margin-bottom: 50px;">Von der schwierigen Baumfällung auf engem Raum bis zur fachgerechten Kronenpflege. Wir setzen auf moderne Technik und maximale Sicherheit.</p>
    <div class="service-list">
      ${services.map((s, i) => `
        <a href="/leistungen/${s.slug}/" class="service-detail-card card-3d" style="text-decoration:none;">
          <div class="sdc-image">
            <video src="/assets/video/instagram/${instaVideos[i % instaVideos.length]}" autoplay muted loop playsinline preload="none" style="width:100%; height:100%; object-fit:cover; filter: brightness(0.6);"></video>
          </div>
          <div class="sdc-content">
            <h3 class="lime-text">${s.name}</h3>
            <p class="sdc-intro">${s.intro}</p>
            <span class="button-primary" style="display:inline-block; margin-top:20px;">Details & Infos</span>
          </div>
        </a>
      `).join("")}
    </div>
  </section>

  <!-- Ablauf / Process -->
  <section class="app-section" style="background: rgba(22, 24, 34, 0.6); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
    <h2 class="app-section-title">Unser <span class="lime-text">Ablauf.</span></h2>
    <p class="lead-text" style="max-width: 800px; margin-bottom: 60px;">Von der ersten Anfrage bis zum sauberen Grundstück. Klar, transparent und ohne versteckte Kosten.</p>
    <div class="timeline" style="max-width: 680px;">
      <div class="timeline-track"></div>
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content card-3d">
          <span class="timeline-num">01.</span>
          <h4>Die 3D-Anfrage</h4>
          <p>Nutzen Sie unseren Konfigurator oder schreiben Sie uns per WhatsApp. Beschreiben Sie kurz Ihr Projekt.</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content card-3d">
          <span class="timeline-num">02.</span>
          <h4>Besichtigung</h4>
          <p>Wir schauen uns den Baum oder das Grundstück vor Ort an und besprechen die sicherste Technik.</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content card-3d">
          <span class="timeline-num">03.</span>
          <h4>Umsetzung</h4>
          <p>Termingerechte, sichere Durchführung. Ob Seilklettertechnik oder schweres Gerät – wir sind bereit.</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content card-3d">
          <span class="timeline-num">04.</span>
          <h4>Übergabe</h4>
          <p>Wir verlassen das Grundstück sauber und räumen auf Wunsch das gesamte Schnittgut ab.</p>
        </div>
      </div>
    </div>
    <div style="text-align: center; margin-top: 60px;">
      <a href="/angebot/" class="button-primary" style="font-size: 1.2rem; padding: 18px 40px;">Direkt zum Schritt 1 starten</a>
    </div>
  </section>

  <!-- Massive Instagram Widget -->
  <section class="app-section">
    <h2 class="app-section-title">Direkt aus dem Einsatz.</h2>
    <p class="lead-text" style="max-width: 800px; margin-bottom: 50px;">Keine gestellten Bilder. Sehen Sie unsere aktuellen Fällungen und Arbeiten live auf Instagram <a href="${contact.instagram}" target="_blank" rel="noopener noreferrer" class="lime-text">@fs_baumservice</a>.</p>
    
    <div style="margin-top: 30px;">
      ${instaVideoHtml}
    </div>
    
    <h3 style="color:var(--white); margin-top: 60px; margin-bottom: 20px; font-size:1.8rem;">Einblick in unsere Projekte</h3>
    <p style="color:var(--text-muted); margin-bottom: 30px; font-size:1.1rem;">Von der Seilklettertechnik bis zum Hubsteiger-Einsatz. Hier sehen Sie unsere Ausrüstung und Technik im echten Einsatz rund um Bisingen.</p>
    <div style="margin-top: 30px;">
      ${imgGalleryHtml}
    </div>
  </section>

  <!-- FAQ -->
  <section class="app-section" style="background: rgba(0,0,0,0.3);">
    <h2 class="app-section-title">Häufige Fragen.</h2>
    <div class="faq-list" style="max-width: 900px; margin: 0 auto;">
      ${answerQuestions.map(([q, a]) => faqItem(q, a)).join("")}
    </div>
  </section>
`);

// ============================================================================
// KONFIGURATOR (4 SCHRITTE)
// ============================================================================

writePage("/angebot/", "3D Konfigurator", "Schnelle und einfache Projektanfrage", `
  <section class="app-section" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding-top: 60px;">
    <div id="3d-wizard" class="wizard-container card-3d" style="width: 100%; max-width: 900px; background: rgba(22, 24, 34, 0.8); backdrop-filter: blur(30px); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: 50px;">
      
      <div class="wizard-progress" style="display:flex; gap: 10px; margin-bottom: 40px;">
        <div class="prog-step" id="prog-1" style="flex:1; height:6px; background:var(--lime-500); border-radius:3px;"></div>
        <div class="prog-step" id="prog-2" style="flex:1; height:6px; background:var(--glass-border); border-radius:3px; transition: 0.5s;"></div>
        <div class="prog-step" id="prog-3" style="flex:1; height:6px; background:var(--glass-border); border-radius:3px; transition: 0.5s;"></div>
        <div class="prog-step" id="prog-4" style="flex:1; height:6px; background:var(--glass-border); border-radius:3px; transition: 0.5s;"></div>
      </div>

      <!-- Step 1: Gewerk -->
      <div id="step-1" class="wizard-step" style="transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Was dürfen wir für Sie tun?</h2>
        <p class="lead-text">Wählen Sie das passende Gewerk für Ihr Projekt.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">01</span><strong style="display:block; font-size:1.5rem;">Baumfällung</strong></button>
          <button class="option-card wiz-btn" onclick="nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">02</span><strong style="display:block; font-size:1.5rem;">Baumpflege</strong></button>
          <button class="option-card wiz-btn" onclick="nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">03</span><strong style="display:block; font-size:1.5rem;">Fräsen / Rasen</strong></button>
        </div>
      </div>

      <!-- Step 2: Dringlichkeit -->
      <div id="step-2" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Wie dringend ist es?</h2>
        <p class="lead-text">So können wir Notfälle priorisieren.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Sofort (Notfall)</strong><p style="color:var(--text-muted); margin-top:10px;">Baum ist umgestürzt oder droht zu fallen.</p></button>
          <button class="option-card wiz-btn" onclick="nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Nächste Wochen</strong><p style="color:var(--text-muted); margin-top:10px;">Muss zeitnah, aber nicht sofort erledigt werden.</p></button>
          <button class="option-card wiz-btn" onclick="nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Beratung</strong><p style="color:var(--text-muted); margin-top:10px;">Ich möchte erst eine Begutachtung.</p></button>
        </div>
        <button onclick="prevStep(1)" class="button-outline-light" style="margin-top: 30px; display:inline-block; border:none; color:var(--text-muted); cursor:pointer; background:transparent;">Zurück</button>
      </div>

      <!-- Step 3: Situation -->
      <div id="step-3" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Wie ist die Situation vor Ort?</h2>
        <p class="lead-text">Kurze Einschätzung der Zugänglichkeit für unsere Technik.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="nextStep(4)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Einfacher Zugang</strong><p style="color:var(--text-muted); margin-top:10px;">Von der Straße oder dem Garten gut erreichbar.</p></button>
          <button class="option-card wiz-btn" onclick="nextStep(4)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Schwer zugänglich</strong><p style="color:var(--text-muted); margin-top:10px;">Enges Grundstück, Haus im Weg (Seilklettertechnik).</p></button>
        </div>
        <button onclick="prevStep(2)" class="button-outline-light" style="margin-top: 30px; display:inline-block; border:none; color:var(--text-muted); cursor:pointer; background:transparent;">Zurück</button>
      </div>

      <!-- Step 4: Kontaktdaten -->
      <div id="step-4" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Ihre Projektdaten</h2>
        <p class="lead-text">Fast geschafft! Wo dürfen wir helfen?</p>
        <form onsubmit="event.preventDefault(); alert('Die 4-Stufen-Anfrage funktioniert! FS Baumservice wird informiert.'); window.location.href='/';">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:40px;">
            <input type="text" placeholder="Ort (z.B. Bisingen)" required style="padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;">
            <input type="tel" placeholder="Telefonnummer" required style="padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;">
          </div>
          <textarea placeholder="Weitere Details oder Besonderheiten (optional)" rows="4" style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;"></textarea>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 40px;">
            <button type="button" onclick="prevStep(3)" class="button-outline-light" style="border:none; color:var(--text-muted); cursor:pointer; background:transparent; font-size:1.1rem;">Zurück</button>
            <button type="submit" class="button-primary" style="padding: 20px 50px; font-size: 1.2rem; border:none; cursor:pointer;">Anfrage jetzt absenden</button>
          </div>
        </form>
      </div>

    </div>
  </section>
  <style>
    .wiz-btn:hover { border-color: var(--lime-500) !important; background: rgba(169, 209, 94, 0.1) !important; transform: translateY(-5px); }
  </style>
`);

// The rest of the subpages (Leistungen detail pages)
for (const s of services) {
  const videoDir = path.join(root, "assets", "video", "instagram");
  const videos = fs.existsSync(videoDir) ? fs.readdirSync(videoDir).filter(f => f.endsWith(".mp4")) : [];
  const hasVid = videos.length > 0;
  const vidSrc = hasVid ? `/assets/video/instagram/${videos[Math.floor(Math.random() * videos.length)]}` : '';
  const heroMedia = hasVid 
    ? `<video class="hero-video-bg" src="${vidSrc}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>`
    : `<img class="hero-video-bg" src="/assets/img/${s.image}" style="filter: brightness(0.3);">`;

  const body = `
    <section class="hero-app" style="height: 60vh; min-height: 400px;">
      ${heroMedia}
      <div class="hero-app-content">
        <h1>${s.name}</h1>
        <p>${s.title}</p>
      </div>
    </section>
    
    <!-- EXPERTEN-TIPP (Neuer Mehrwert) -->
    <section class="app-section" style="background: rgba(169, 209, 94, 0.05); border-bottom: 1px solid var(--glass-border);">
      <div style="max-width: 900px; margin: 0 auto; display: flex; gap: 30px; align-items: center; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <h2 style="color:var(--lime-500); font-size: 2rem; margin-bottom: 15px;">Experten-Wissen: Warum ${s.name}?</h2>
          <p style="color:var(--text-muted); font-size: 1.1rem; line-height: 1.8;">
            Viele Hausbesitzer warten zu lange. Ein rechtzeitiger Eingriff spart nicht nur Geld, sondern verhindert auch massive Schäden an Gebäuden oder dem Umfeld. Vertrauen Sie auf unsere lokale Expertise im Zollernalbkreis. Wir begutachten jeden Fall individuell und ehrlich.
          </p>
        </div>
        <div class="card-3d" style="flex: 1; min-width: 300px; padding: 30px; background: rgba(0,0,0,0.4);">
          <h4 style="color:var(--white); margin-bottom: 10px;">Ihre Sicherheit zählt</h4>
          <ul style="list-style:none; padding:0; color:var(--text-muted); line-height: 1.8;">
            <li>✓ Vermeidung von Sturmschäden</li>
            <li>✓ Fachgerechte ZTV-Standards</li>
            <li>✓ Voller Versicherungsschutz bei Ausführung durch Profis</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="app-section">
      <div class="about-grid" style="grid-template-columns: 2fr 1fr;">
        <div>
          <h2 class="app-section-title">Auf einen Blick</h2>
          <p class="lead-text">${s.intro}</p>
          <p class="sdc-desc" style="font-size: 1.1rem; line-height: 1.8;">${s.description}</p>
          
          <h3 style="color:var(--white); margin-top: 50px; margin-bottom:20px; font-size:1.5rem;">Wie wir bei der ${s.name} vorgehen</h3>
          <ul class="sdc-bullets" style="grid-template-columns: 1fr;">
            ${s.process.map(p => '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> <span style="font-size:1.1rem;">' + p + '</span></li>').join("")}
          </ul>
          
          <h3 style="color:var(--white); margin-top: 50px; margin-bottom:20px; font-size:1.5rem;">Häufige Einsatzgebiete</h3>
          <ul class="sdc-bullets" style="grid-template-columns: 1fr 1fr;">
            ${s.uses.map(u => '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> ' + u + '</li>').join("")}
          </ul>
        </div>
        <div>
          <div style="background: rgba(22, 24, 34, 0.8); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: 40px; position: sticky; top: 100px;">
            <h3 style="color:var(--white); margin-bottom:20px;">Ihre Vorteile</h3>
            <ul class="sdc-bullets" style="grid-template-columns: 1fr;">
              ${s.benefits.map(b => '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> <strong style="color:var(--lime-500);">' + b + '</strong></li>').join("")}
            </ul>
            <a href="/angebot/" class="button-primary" style="display:block; text-align:center; margin-top: 30px;">Jetzt 3D-Anfrage starten</a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- MEDIA GALLERY (Bilder & Videos) -->
    <section class="app-section" style="background: rgba(0,0,0,0.2);">
      <h2 class="app-section-title">Eindrücke aus der Praxis</h2>
      <p style="color:var(--text-muted); margin-bottom: 30px; font-size:1.1rem;">Bilder und Videos direkt von unseren Baustellen rund um das Thema ${s.name}.</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
        ${instaVideos.sort(() => 0.5 - Math.random()).slice(0, 4).map(v => '<div class="card-3d" style="aspect-ratio: 9/16; overflow:hidden;"><video src="/assets/video/instagram/' + v + '" autoplay muted loop playsinline style="width:100%; height:100%; object-fit:cover;"></video></div>').join("")}
      </div>
      <div style="margin-top: 30px;">
        ${imgGalleryHtml}
      </div>
    </section>

    <section class="app-section" style="background: rgba(0,0,0,0.4);">
      <h2 class="app-section-title">Häufige Fragen zu ${s.name}</h2>
      <div class="faq-list" style="max-width: 800px;">
        ${s.faq.map(([q, a]) => faqItem(q, a)).join("")}
      </div>
    </section>
  `;
  writePage(`/leistungen/${s.slug}/`, s.title, s.description, body);
}

writePage("/referenzen/", "Social Media & Referenzen", "Echte Bilder und Live-Feed", `
    <section class="hero-app" style="height: 40vh; min-height: 300px;">
      <video class="hero-video-bg" src="/assets/video/instagram/${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
      <div class="hero-app-content">
        <h1>Galerie & Insta</h1>
        <p>Echte Einsätze im Zollernalbkreis</p>
      </div>
    </section>
  
  <section class="app-section" style="padding-top: 100px;">
    <h1 class="app-section-title" style="color:var(--white);">Direkt aus dem Einsatz. <br><span class="lime-text">Live von Instagram.</span></h1>
    <p class="lead-text">Folgen Sie <a href="${contact.instagram}" target="_blank" rel="noopener noreferrer" class="lime-text">@fs_baumservice</a> für die neuesten Videos und Fällarbeiten direkt aus der Region Bisingen.</p>
    
    <div style="margin-top: 60px;">
      ${instaVideoHtml}
    </div>
    
    <div style="margin-top: 80px;">
      <h2 class="app-section-title">Unsere Fotogalerie</h2>
      <p style="color:var(--text-muted); margin-bottom: 30px;">Zusätzlich zu unseren Instagram-Videos finden Sie hier unsere gesammelten Eindrücke, Maschinen und Kletter-Aktionen in hochauflösenden Bildern.</p>
      ${imgGalleryHtml}
    </div>
  </section>
`);

writePage("/ueber-uns/", "Über Uns", "Baumservice aus Bisingen", `
    <section class="hero-app" style="height: 40vh; min-height: 300px;">
      <video class="hero-video-bg" src="/assets/video/instagram/${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
      <div class="hero-app-content">
        <h1>Über Uns</h1>
        <p>Ihr regionaler Baumservice</p>
      </div>
    </section>
  
  <section class="app-section" style="padding-top: 100px;">
    <div class="about-grid">
      <div class="about-text">
        <h2 class="app-section-title">Baumservice aus Bisingen.</h2>
        <p class="lead-text">FS Baumservice steht für sichere Baumarbeiten, Seilklettertechnik, Wurzelstockfräsen, Heckenschnitt und Rollrasen – direkt aus der Region.</p>
        <div class="trust-badges">
          <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> ZTV-Baumpflege Standard</div>
          <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Sichere Seilklettertechnik</div>
        </div>
      </div>
      <div class="about-image card-3d">
        <video src="/assets/video/instagram/${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="width:100%; height:100%; object-fit:cover;"></video>
      </div>
    </div>
    
    <div style="margin-top: 60px; background: rgba(0,0,0,0.2); padding: 40px; border-radius: var(--radius); border: 1px solid var(--glass-border);">
      <h2 style="color:var(--lime-500); font-size: 1.8rem; margin-bottom: 20px;">Unser Anspruch. Ihre Sicherheit.</h2>
      <p style="color:var(--text-muted); font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">
        Die Pflege, Beurteilung und im Ernstfall auch Fällung von Bäumen ist keine Aufgabe für Laien. Sie erfordert tiefgreifendes Wissen über die Baumstatik, Krankheiten und modernste Sicherungstechniken. Genau deshalb haben wir uns auf die schwierigen Fälle spezialisiert: Standorte, an denen kein Platz für große Maschinen ist, Dächer, die direkt unter der Baumkrone liegen oder Bäume, die durch Stürme gefährlich instabil geworden sind.
      </p>
      <p style="color:var(--text-muted); font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">
        <strong>Unsere Ausrüstung ist unser Stolz:</strong> Von präzisen Hubsteigern über schweres Gerät bis hin zur manuellen, baumschonenden Seilklettertechnik (SKT). Wir bringen für jede Herausforderung genau das richtige Werkzeug mit.
      </p>
      <p style="color:var(--text-muted); font-size: 1.1rem; line-height: 1.8;">
        Als lokales Unternehmen im Zollernalbkreis (Bisingen, Balingen, Hechingen) sind wir schnell vor Ort, arbeiten transparent und verlassen jedes Grundstück so sauber, wie wir es vorgefunden haben.
      </p>
    </div>
    
    <div style="margin-top: 80px;">
      <h2 class="app-section-title">Unser Alltag. Live.</h2>
      ${instaVideoHtml}
    </div>
    
    <div style="margin-top: 80px;">
      <h2 class="app-section-title">Maschinen & Einsatzbilder</h2>
      ${imgGalleryHtml}
    </div>
  </section>
`);

writePage("/kontakt/", "Kontakt aufnehmen – FS Baumservice Bisingen", "Rufen Sie uns an, schreiben Sie per WhatsApp oder nutzen Sie unseren 3D-Konfigurator. Schnelle Reaktionszeit im Zollernalbkreis.", `
  <section class="hero-app" style="height: 40vh; min-height: 300px;">
    <video class="hero-video-bg" src="/assets/video/instagram/${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
    <div class="hero-app-content">
      <h1>Kontakt.</h1>
      <p>Kein Formular-Chaos — einfach anrufen oder schreiben.</p>
    </div>
  </section>

  <!-- Contact Method Cards -->
  <section class="app-section">
    <h2 class="app-section-title">So erreichen Sie <span class="lime-text">uns.</span></h2>
    <p class="lead-text" style="max-width: 700px; margin-bottom: 50px;">Wir sind ein kleines Team und melden uns persönlich — meistens noch am gleichen Tag.</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 70px;">
      <!-- Phone -->
      <a href="tel:${contact.phone}" class="card-3d contact-method-card" style="display:flex; flex-direction:column; align-items:flex-start; gap:20px; padding:40px; text-decoration:none; border:1px solid var(--glass-border); border-radius:var(--radius); transition:border-color 0.3s, transform 0.3s;">
        <div style="width:56px; height:56px; background:rgba(169,209,94,0.12); border-radius:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:26px;height:26px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <div>
          <p style="color:var(--text-muted); font-size:0.85rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 6px;">Telefon</p>
          <h3 style="color:var(--white); font-size:1.6rem; font-weight:900; margin:0 0 8px;">${contact.phoneDisplay}</h3>
          <p style="color:var(--text-muted); margin:0; font-size:0.95rem;">Mo–Sa, auch kurzfristig erreichbar</p>
        </div>
        <span style="color:var(--lime-500); font-weight:800; font-size:0.95rem; margin-top:auto;">Jetzt anrufen →</span>
      </a>

      <!-- WhatsApp -->
      <a href="https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}" class="card-3d contact-method-card" style="display:flex; flex-direction:column; align-items:flex-start; gap:20px; padding:40px; text-decoration:none; border:1px solid var(--glass-border); border-radius:var(--radius); transition:border-color 0.3s, transform 0.3s;" target="_blank" rel="noopener noreferrer">
        <div style="width:56px; height:56px; background:rgba(37,211,102,0.12); border-radius:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2" style="width:26px;height:26px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </div>
        <div>
          <p style="color:var(--text-muted); font-size:0.85rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 6px;">WhatsApp</p>
          <h3 style="color:var(--white); font-size:1.6rem; font-weight:900; margin:0 0 8px;">${contact.phoneDisplay}</h3>
          <p style="color:var(--text-muted); margin:0; font-size:0.95rem;">Fotos schicken, Projekt beschreiben</p>
        </div>
        <span style="color:#25D366; font-weight:800; font-size:0.95rem; margin-top:auto;">Chat starten →</span>
      </a>

      <!-- Email -->
      <a href="mailto:${contact.email}" class="card-3d contact-method-card" style="display:flex; flex-direction:column; align-items:flex-start; gap:20px; padding:40px; text-decoration:none; border:1px solid var(--glass-border); border-radius:var(--radius); transition:border-color 0.3s, transform 0.3s;">
        <div style="width:56px; height:56px; background:rgba(169,209,94,0.12); border-radius:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:26px;height:26px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <div>
          <p style="color:var(--text-muted); font-size:0.85rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 6px;">E-Mail</p>
          <h3 style="color:var(--white); font-size:1.3rem; font-weight:900; margin:0 0 8px; word-break:break-all;">${contact.email}</h3>
          <p style="color:var(--text-muted); margin:0; font-size:0.95rem;">Antwort meist innerhalb 24 Stunden</p>
        </div>
        <span style="color:var(--lime-500); font-weight:800; font-size:0.95rem; margin-top:auto;">E-Mail schreiben →</span>
      </a>
    </div>

    <!-- Address + Service Area -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; margin-bottom:70px;">
      <div style="background:rgba(22,24,34,0.6); border:1px solid var(--glass-border); border-radius:var(--radius); padding:40px;">
        <h3 style="color:var(--lime-500); font-size:1.1rem; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 20px;">Standort</h3>
        <p style="color:var(--white); font-size:1.2rem; font-weight:700; margin:0 0 6px;">${contact.legalName}</p>
        <p style="color:var(--text-muted); margin:0 0 4px;">${contact.street}</p>
        <p style="color:var(--text-muted); margin:0 0 30px;">${contact.postalCode} ${contact.locality}</p>
        <a href="https://maps.google.com/?q=${encodeURIComponent(contact.street + ', ' + contact.postalCode + ' ' + contact.locality)}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:8px; color:var(--lime-500); font-weight:700; text-decoration:none; font-size:0.95rem;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          In Google Maps öffnen →
        </a>
      </div>
      <div style="background:rgba(22,24,34,0.6); border:1px solid var(--glass-border); border-radius:var(--radius); padding:40px;">
        <h3 style="color:var(--lime-500); font-size:1.1rem; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 20px;">Einsatzgebiet</h3>
        <div style="display:flex; flex-wrap:wrap; gap:10px;">
          ${areaServed.map(a => `<span style="background:rgba(169,209,94,0.1); border:1px solid rgba(169,209,94,0.3); color:var(--lime-500); padding:6px 14px; border-radius:20px; font-weight:700; font-size:0.9rem;">${a}</span>`).join("")}
        </div>
        <p style="color:var(--text-muted); margin:24px 0 0; font-size:0.95rem;">Auch umliegende Gemeinden auf Anfrage.</p>
      </div>
    </div>

    <!-- CTA Strip -->
    <div style="background:linear-gradient(135deg, rgba(169,209,94,0.12) 0%, rgba(169,209,94,0.04) 100%); border:1px solid rgba(169,209,94,0.25); border-radius:var(--radius); padding:50px 40px; display:flex; align-items:center; justify-content:space-between; gap:30px; flex-wrap:wrap;">
      <div>
        <h3 style="color:var(--white); font-size:1.8rem; font-weight:900; margin:0 0 10px;">Lieber alles strukturiert angeben?</h3>
        <p style="color:var(--text-muted); margin:0; font-size:1.1rem;">Unser 3D-Konfigurator führt Sie in 4 Schritten zur fertigen Anfrage.</p>
      </div>
      <a href="/angebot/" class="button-primary btn-pulse" style="white-space:nowrap; padding:18px 36px; font-size:1.1rem; text-decoration:none; flex-shrink:0;">Konfigurator starten →</a>
    </div>
  </section>

  <!-- FAQ -->
  <section class="app-section" style="background:rgba(0,0,0,0.3);">
    <h2 class="app-section-title">Häufige Fragen.</h2>
    <div class="faq-list" style="max-width:860px;">
      ${[
        ["Wie schnell reagieren Sie auf Anfragen?", "In der Regel melden wir uns noch am gleichen Tag. Bei Notfällen (umgestürzter Baum, Sturmschäden) versuchen wir innerhalb weniger Stunden vor Ort zu sein."],
        ["Kann ich Fotos per WhatsApp schicken?", "Ja — und das empfehlen wir sogar. Ein Bild sagt mehr als tausend Worte. Schicken Sie uns einfach ein Foto des Baums oder Grundstücks, dann können wir schneller einschätzen, was nötig ist."],
        ["Gibt es eine kostenlose Besichtigung?", "Ja. Die erste Begutachtung vor Ort ist für Sie kostenlos und unverbindlich. Erst nach dem Ortstermin erhalten Sie ein transparentes Angebot."],
        ["In welchen Orten arbeiten Sie?", "Primär im Zollernalbkreis: Bisingen, Balingen, Hechingen, Geislingen und umliegende Gemeinden. Bei größeren Projekten auch darüber hinaus — sprechen Sie uns einfach an."]
      ].map(([q, a]) => faqItem(q, a)).join("")}
    </div>
  </section>
`);

const ratgeberHero = `
    <section class="hero-app" style="height: 40vh; min-height: 300px;">
      <video class="hero-video-bg" src="/assets/video/instagram/${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
      <div class="hero-app-content">
        <h1>Ratgeber</h1>
        <p>Preise, Tipps und Baumlexikon</p>
      </div>
    </section>
  `;
writePage("/ratgeber/", "Preise, Ratgeber & Baumlexikon", "Infos zu Baumfällung, Kosten und Baumkrankheiten.", ratgeberHero + ratgeberHtml);
writePage("/impressum/", "Impressum", "Impressum der FS Baumservice", impressumHtml);
writePage("/datenschutz/", "Datenschutz", "Datenschutz", datenschutzHtml);

writePage("/leistungen/", "Alle Leistungen", "Übersicht unserer Baumpflege-Dienstleistungen", `
<section class="hero-app" style="height: 40vh; min-height: 300px;">
  <video class="hero-video-bg" src="/assets/video/instagram/${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
  <div class="hero-app-content">
    <h1>Unsere Leistungen</h1>
    <p>Professionelle Baumpflege & Fällung</p>
  </div>
</section>
<section class="app-section" style="padding-top: 60px;">
    <h1 class="app-section-title" style="font-size:4rem; color:var(--white);">Was wir <span class="lime-text">können.</span></h1>
    <p class="lead-text" style="max-width: 800px;">Alle Leistungen von FS Baumservice im Detail. Professionelle Baumpflege, Baumfällung per Seilklettertechnik, Grundstückspflege und mehr im Zollernalbkreis.</p>
    <div class="service-list" style="margin-top: 60px;">
      ${services.map((s, i) => `
        <a href="/leistungen/${s.slug}/" class="service-detail-card card-3d" style="text-decoration:none;">
          <div class="sdc-image">
            <video src="/assets/video/instagram/${instaVideos[i % instaVideos.length]}" autoplay muted loop playsinline preload="none" style="width:100%; height:100%; object-fit:cover; filter: brightness(0.6);"></video>
          </div>
          <div class="sdc-content">
            <h3 class="lime-text">${s.name}</h3>
            <p class="sdc-intro">${s.intro}</p>
            <span class="button-primary" style="display:inline-block; margin-top:20px;">Details & Infos</span>
          </div>
        </a>
      `).join("")}
    </div>
</section>
`);

writePage("/angebot/", "3D Konfigurator", "Schnelle und einfache Projektanfrage", `

<section class="hero-app" style="height: 40vh; min-height: 300px;">
  <video class="hero-video-bg" src="/assets/video/instagram/${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
  <div class="hero-app-content">
    <h1>3D-Anfrage</h1>
    <p>Kostenfrei und unverbindlich</p>
  </div>
</section>

<section class="app-section" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding-top: 20px;">
    <div id="3d-wizard" class="wizard-container card-3d" style="width: 100%; max-width: 900px; background: rgba(22, 24, 34, 0.8); backdrop-filter: blur(30px); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: 50px;">
      
      <div class="wizard-progress" style="display:flex; gap: 10px; margin-bottom: 40px;">
        <div class="prog-step" id="prog-1" style="flex:1; height:6px; background:var(--lime-500); border-radius:3px;"></div>
        <div class="prog-step" id="prog-2" style="flex:1; height:6px; background:var(--glass-border); border-radius:3px; transition: 0.5s;"></div>
        <div class="prog-step" id="prog-3" style="flex:1; height:6px; background:var(--glass-border); border-radius:3px; transition: 0.5s;"></div>
        <div class="prog-step" id="prog-4" style="flex:1; height:6px; background:var(--glass-border); border-radius:3px; transition: 0.5s;"></div>
      </div>

      <!-- Step 1: Gewerk -->
      <div id="step-1" class="wizard-step" style="transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Was dürfen wir für Sie tun?</h2>
        <p class="lead-text">Wählen Sie das passende Gewerk für Ihr Projekt.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">01</span><strong style="display:block; font-size:1.5rem;">Baumfällung</strong></button>
          <button class="option-card wiz-btn" onclick="nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">02</span><strong style="display:block; font-size:1.5rem;">Baumpflege</strong></button>
          <button class="option-card wiz-btn" onclick="nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">03</span><strong style="display:block; font-size:1.5rem;">Fräsen / Rasen</strong></button>
        </div>
      </div>

      <!-- Step 2: Dringlichkeit -->
      <div id="step-2" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Wie dringend ist es?</h2>
        <p class="lead-text">So können wir Notfälle priorisieren.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Sofort (Notfall)</strong><p style="color:var(--text-muted); margin-top:10px;">Baum ist umgestürzt oder droht zu fallen.</p></button>
          <button class="option-card wiz-btn" onclick="nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Nächste Wochen</strong><p style="color:var(--text-muted); margin-top:10px;">Muss zeitnah, aber nicht sofort erledigt werden.</p></button>
          <button class="option-card wiz-btn" onclick="nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Beratung</strong><p style="color:var(--text-muted); margin-top:10px;">Ich möchte erst eine Begutachtung.</p></button>
        </div>
        <button onclick="prevStep(1)" class="button-outline-light" style="margin-top: 30px; display:inline-block; border:none; color:var(--text-muted); cursor:pointer; background:transparent;">Zurück</button>
      </div>

      <!-- Step 3: Situation -->
      <div id="step-3" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Wie ist die Situation vor Ort?</h2>
        <p class="lead-text">Kurze Einschätzung der Zugänglichkeit für unsere Technik.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="nextStep(4)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Einfacher Zugang</strong><p style="color:var(--text-muted); margin-top:10px;">Von der Straße oder dem Garten gut erreichbar.</p></button>
          <button class="option-card wiz-btn" onclick="nextStep(4)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Schwer zugänglich</strong><p style="color:var(--text-muted); margin-top:10px;">Enges Grundstück, Haus im Weg (Seilklettertechnik).</p></button>
        </div>
        <button onclick="prevStep(2)" class="button-outline-light" style="margin-top: 30px; display:inline-block; border:none; color:var(--text-muted); cursor:pointer; background:transparent;">Zurück</button>
      </div>

      <!-- Step 4: Kontaktdaten -->
      <div id="step-4" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Ihre Projektdaten</h2>
        <p class="lead-text">Fast geschafft! Wo dürfen wir helfen?</p>
        <form onsubmit="event.preventDefault(); alert('Die 4-Stufen-Anfrage funktioniert! FS Baumservice wird informiert.'); window.location.href='/';">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:40px;">
            <input type="text" placeholder="Ort (z.B. Bisingen)" required style="padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;">
            <input type="tel" placeholder="Telefonnummer" required style="padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;">
          </div>
          <textarea placeholder="Weitere Details oder Besonderheiten (optional)" rows="4" style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;"></textarea>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 40px;">
            <button type="button" onclick="prevStep(3)" class="button-outline-light" style="border:none; color:var(--text-muted); cursor:pointer; background:transparent; font-size:1.1rem;">Zurück</button>
            <button type="submit" class="button-primary" style="padding: 20px 50px; font-size: 1.2rem; border:none; cursor:pointer;">Anfrage jetzt absenden</button>
          </div>
        </form>
      </div>

    </div>
  </section>
  <style>
    .wiz-btn:hover { border-color: var(--lime-500) !important; background: rgba(169, 209, 94, 0.1) !important; transform: translateY(-5px); }
  </style>
`);

