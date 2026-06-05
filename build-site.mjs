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
  <link rel="preload" href="/assets/fonts/outfit-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
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
  <link rel="stylesheet" href="/assets/css/styles.css?v=18">
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
  
  <script src="/assets/js/site.js?v=16" defer></script>
  
  <script>
    // Wizard selection tracker + WhatsApp deeplink
    const _wiz = {};
    window.wizSelect = function(step, val) { _wiz[step] = val; };
    window.buildWALink = function(ort, tel, details) {
      const s = _wiz[1]||'Baumservice'; const u = _wiz[2]||''; const a = _wiz[3]||'';
      const msg = 'Hallo FS Baumservice!%0A%0AIch interessiere mich für: '+encodeURIComponent(s)
        +(u?'%0ADringlichkeit: '+encodeURIComponent(u):'')
        +(a?'%0AZugang: '+encodeURIComponent(a):'')
        +(ort?'%0AOrt: '+encodeURIComponent(ort):'')
        +(tel?'%0ATelefon: '+encodeURIComponent(tel):'')
        +(details?'%0ADetails: '+encodeURIComponent(details):'');
      return 'https://wa.me/491727256462?text='+msg;
    };
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

  <!-- Stats Counter Strip -->
  <section class="stats-strip app-section" style="padding: 70px 60px;">
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-num" data-target="200" data-suffix="+">0</span>
        <span class="stat-label">Projekte erfolgreich abgeschlossen</span>
      </div>
      <div class="stat-item">
        <span class="stat-num" data-target="5" data-suffix=" Jahre">0</span>
        <span class="stat-label">Regionale Erfahrung im Zollernalbkreis</span>
      </div>
      <div class="stat-item">
        <span class="stat-num" data-target="0" data-prefix="0 €" data-suffix="">–</span>
        <span class="stat-label">Kosten für die erste Beratung</span>
      </div>
      <div class="stat-item">
        <span class="stat-num" data-target="100" data-suffix="% SKT">0</span>
        <span class="stat-label">Saubere Übergabe, jedes Mal</span>
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
  <section class="app-section section-tree-rings">
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

  <!-- Warum FS Baumservice -->
  <section class="app-section" style="background: rgba(22,24,34,0.5); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
    <h2 class="app-section-title">Warum <span class="lime-text">FS Baumservice?</span></h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
      <div class="card-3d" style="padding: 36px;">
        <div style="width:48px;height:48px;background:rgba(169,209,94,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:24px;height:24px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <h3 style="color:var(--white);font-size:1.25rem;margin:0 0 12px;font-weight:800;">Maximale Sicherheit</h3>
        <p style="color:var(--text-muted);margin:0;line-height:1.7;">Wir arbeiten nach ZTV-Baumpflege-Standard und setzen modernste Seilklettertechnik (SKT) ein — auch auf engstem Raum und ohne Kran.</p>
      </div>
      <div class="card-3d" style="padding: 36px;">
        <div style="width:48px;height:48px;background:rgba(169,209,94,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:24px;height:24px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <h3 style="color:var(--white);font-size:1.25rem;margin:0 0 12px;font-weight:800;">Regional & schnell</h3>
        <p style="color:var(--text-muted);margin:0;line-height:1.7;">Als lokales Unternehmen aus Bisingen sind wir schnell vor Ort. Bei Notfällen versuchen wir noch am gleichen Tag zu reagieren.</p>
      </div>
      <div class="card-3d" style="padding: 36px;">
        <div style="width:48px;height:48px;background:rgba(169,209,94,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:24px;height:24px;"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 style="color:var(--white);font-size:1.25rem;margin:0 0 12px;font-weight:800;">Saubere Übergabe</h3>
        <p style="color:var(--text-muted);margin:0;line-height:1.7;">Wir verlassen kein Grundstück unaufgeräumt. Schnittgut wird auf Wunsch vollständig abtransportiert — ohne versteckte Zusatzkosten.</p>
      </div>
      <div class="card-3d" style="padding: 36px;">
        <div style="width:48px;height:48px;background:rgba(169,209,94,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:24px;height:24px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h3 style="color:var(--white);font-size:1.25rem;margin:0 0 12px;font-weight:800;">Transparente Preise</h3>
        <p style="color:var(--text-muted);margin:0;line-height:1.7;">Kein Angebot ohne Besichtigung, kein Nachschlag ohne Absprache. Was wir anbieten, gilt — fair und verständlich erklärt.</p>
      </div>
    </div>
  </section>

  <!-- Saisonaler Hinweis (wird per JS befüllt) -->
  <div id="seasonal-strip" hidden></div>

  <!-- Das sagen unsere Kunden -->
  <section class="app-section" style="background: rgba(0,0,0,0.25);">
    <h2 class="app-section-title">Das sagen unsere <span class="lime-text">Kunden.</span></h2>
    <p class="lead-text" style="max-width:700px; margin-bottom:50px;">Echte Stimmen aus dem Einsatzgebiet im Zollernalbkreis.</p>
    <div class="testimonial-grid">
      <div class="testimonial-card card-3d">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-text">„Florian hat einen alten Kirschbaum direkt neben unserem Haus sauber abgetragen — kein Kratzer an der Fassade, alles aufgeräumt. Uneingeschränkt weiterempfehlenswert."</p>
        <div class="testimonial-footer">
          <span class="testimonial-name">Karl M.</span>
          <span class="testimonial-loc">Balingen</span>
          <span class="testimonial-service">Baumfällung</span>
        </div>
      </div>
      <div class="testimonial-card card-3d">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-text">„Schnelle Terminabsprache, ehrliche Einschätzung vor Ort. Unser Nussbaum sieht wieder toll aus. Man merkt, dass er nur macht, was wirklich sinnvoll ist."</p>
        <div class="testimonial-footer">
          <span class="testimonial-name">Familie L.</span>
          <span class="testimonial-loc">Bisingen</span>
          <span class="testimonial-service">Baumpflege</span>
        </div>
      </div>
      <div class="testimonial-card card-3d">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-text">„Den Stumpf hatten wir seit Jahren. Mit der Fräse war das in einer Stunde erledigt und die Fläche konnte direkt neu eingesät werden. Sehr zufrieden."</p>
        <div class="testimonial-footer">
          <span class="testimonial-name">Petra W.</span>
          <span class="testimonial-loc">Hechingen</span>
          <span class="testimonial-service">Wurzelstockfräsen</span>
        </div>
      </div>
    </div>
    <div style="text-align:center; margin-top:40px;">
      <a href="https://www.google.com/maps/search/FS+Baumservice+Bisingen-Steinhofen" target="_blank" rel="noopener" class="button-primary" style="display:inline-flex; align-items:center; gap:10px; padding:14px 28px; font-size:1rem; text-decoration:none;">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        Bewertung bei Google hinterlassen
      </a>
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
          <button class="option-card wiz-btn" onclick="wizSelect(1,'Baumfällung');nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">01</span><strong style="display:block; font-size:1.5rem;">Baumfällung</strong></button>
          <button class="option-card wiz-btn" onclick="wizSelect(1,'Baumpflege');nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">02</span><strong style="display:block; font-size:1.5rem;">Baumpflege</strong></button>
          <button class="option-card wiz-btn" onclick="wizSelect(1,'Fräsen / Rasen');nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">03</span><strong style="display:block; font-size:1.5rem;">Fräsen / Rasen</strong></button>
        </div>
      </div>

      <!-- Step 2: Dringlichkeit -->
      <div id="step-2" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Wie dringend ist es?</h2>
        <p class="lead-text">So können wir Notfälle priorisieren.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="wizSelect(2,'Sofort (Notfall)');nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Sofort (Notfall)</strong><p style="color:var(--text-muted); margin-top:10px;">Baum ist umgestürzt oder droht zu fallen.</p></button>
          <button class="option-card wiz-btn" onclick="wizSelect(2,'Nächste Wochen');nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Nächste Wochen</strong><p style="color:var(--text-muted); margin-top:10px;">Muss zeitnah, aber nicht sofort erledigt werden.</p></button>
          <button class="option-card wiz-btn" onclick="wizSelect(2,'Erst Beratung');nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Beratung</strong><p style="color:var(--text-muted); margin-top:10px;">Ich möchte erst eine Begutachtung.</p></button>
        </div>
        <button onclick="prevStep(1)" class="button-outline-light" style="margin-top: 30px; display:inline-block; border:none; color:var(--text-muted); cursor:pointer; background:transparent;">Zurück</button>
      </div>

      <!-- Step 3: Situation -->
      <div id="step-3" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Wie ist die Situation vor Ort?</h2>
        <p class="lead-text">Kurze Einschätzung der Zugänglichkeit für unsere Technik.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="wizSelect(3,'Einfacher Zugang');nextStep(4)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Einfacher Zugang</strong><p style="color:var(--text-muted); margin-top:10px;">Von der Straße oder dem Garten gut erreichbar.</p></button>
          <button class="option-card wiz-btn" onclick="wizSelect(3,'Schwer zugänglich');nextStep(4)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Schwer zugänglich</strong><p style="color:var(--text-muted); margin-top:10px;">Enges Grundstück, Haus im Weg (Seilklettertechnik).</p></button>
        </div>
        <button onclick="prevStep(2)" class="button-outline-light" style="margin-top: 30px; display:inline-block; border:none; color:var(--text-muted); cursor:pointer; background:transparent;">Zurück</button>
      </div>

      <!-- Step 4: WhatsApp-Weiterleitung -->
      <div id="step-4" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Ihre Projektdaten</h2>
        <p class="lead-text">Fast geschafft! Direkt per WhatsApp — schnellste Reaktionszeit.</p>
        <form id="wiz-form" onsubmit="event.preventDefault(); window.open(buildWALink(document.getElementById('wiz-ort').value, document.getElementById('wiz-tel').value, document.getElementById('wiz-details').value),'_blank');">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:40px;">
            <input id="wiz-ort" type="text" placeholder="Ort (z.B. Bisingen)" required style="padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;">
            <input id="wiz-tel" type="tel" placeholder="Telefonnummer (optional)" style="padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;">
          </div>
          <textarea id="wiz-details" placeholder="Weitere Details oder Besonderheiten (optional)" rows="4" style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;"></textarea>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 40px;">
            <button type="button" onclick="prevStep(3)" class="button-outline-light" style="border:none; color:var(--text-muted); cursor:pointer; background:transparent; font-size:1.1rem;">Zurück</button>
            <button type="submit" class="button-primary" style="padding: 20px 40px; font-size: 1.1rem; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:10px;"><svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px;flex-shrink:0;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/></svg> Per WhatsApp anfragen</button>
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

writePage("/ueber-uns/", "Über Florian Stuck – FS Baumservice aus Bisingen", "Ihr persönlicher Baumprofi aus Bisingen-Steinhofen. Seilklettertechnik, ZTV-Baumpflege und ehrliche Arbeit im Zollernalbkreis.", `
  <section class="hero-app" style="height: 50vh; min-height: 340px;">
    <video class="hero-video-bg" src="/assets/video/instagram/${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
    <div class="hero-app-content">
      <h1>${contact.owner}.<br><span class="lime-text">Ihr Baumpfleger.</span></h1>
      <p>Lokaler Baumservice aus ${contact.locality} — persönlich, schnell, direkt.</p>
    </div>
  </section>

  <!-- Founder Intro -->
  <section class="app-section">
    <div class="about-grid" style="gap: 60px; align-items: start;">
      <div>
        <h2 class="app-section-title" style="font-size: clamp(1.8rem, 4vw, 3rem);">Hinter FS Baumservice<br><span class="lime-text">steht Florian.</span></h2>
        <p class="lead-text">Kein anonymer Betrieb. Wenn Sie anrufen, sprechen Sie mit dem Mann, der auch auf den Baum klettert.</p>
        <p style="color:var(--text-muted); font-size:1.1rem; line-height:1.8; margin-bottom:20px;">Ich bin Florian Stuck und habe FS Baumservice in Bisingen-Steinhofen aufgebaut, weil ich glaube, dass gute Baumarbeit lokale Kenntnis, das richtige Gerät und echte Verantwortung braucht.</p>
        <p style="color:var(--text-muted); font-size:1.1rem; line-height:1.8; margin-bottom:20px;">Mein Schwerpunkt sind die schwierigen Fälle: Bäume direkt am Haus, auf engem Grundstück, nach Sturmschäden oder dort, wo kein Kran hinkommt. Dafür setze ich auf moderne Seilklettertechnik (SKT) und bringe genau das Gerät mit, das die Situation wirklich braucht.</p>
        <p style="color:var(--text-muted); font-size:1.1rem; line-height:1.8;">Als lokales Unternehmen bin ich schnell vor Ort, arbeite transparent und verlasse jedes Grundstück so sauber, wie ich es vorgefunden habe.</p>
        <div class="trust-badges" style="margin-top: 35px;">
          <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:20px;height:20px;flex-shrink:0;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> ZTV-Baumpflege Standard</div>
          <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:20px;height:20px;flex-shrink:0;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Seilklettertechnik (SKT)</div>
          <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:20px;height:20px;flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg> Eigene Wurzelfräse (ab 90 cm Durchfahrt)</div>
          <div class="trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:20px;height:20px;flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg> Hubsteiger & schweres Gerät</div>
        </div>
      </div>
      <div class="about-image card-3d" style="min-height: 420px;">
        <video src="/assets/video/instagram/${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="width:100%; height:100%; object-fit:cover;"></video>
      </div>
    </div>
  </section>

  <!-- Versprechen -->
  <section class="app-section" style="background: rgba(22,24,34,0.6); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
    <h2 class="app-section-title">Unser <span class="lime-text">Versprechen.</span></h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2px; background: var(--glass-border); border-radius: var(--radius); overflow: hidden;">
      <div style="background: var(--slate-950); padding: 44px 36px;">
        <div style="width:50px;height:50px;background:rgba(169,209,94,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:22px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:24px;height:24px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <h3 style="color:var(--white); font-size:1.3rem; font-weight:800; margin:0 0 14px;">Persönlich</h3>
        <p style="color:var(--text-muted); margin:0; line-height:1.7;">Sie haben immer einen direkten Ansprechpartner — keine Callcenter, kein Subunternehmer. Was vereinbart wird, gilt.</p>
      </div>
      <div style="background: var(--slate-950); padding: 44px 36px;">
        <div style="width:50px;height:50px;background:rgba(169,209,94,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:22px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:24px;height:24px;"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 style="color:var(--white); font-size:1.3rem; font-weight:800; margin:0 0 14px;">Sauber</h3>
        <p style="color:var(--text-muted); margin:0; line-height:1.7;">Kein Grundstück wird unaufgeräumt verlassen. Schnittgut und Stammholz werden auf Wunsch vollständig abtransportiert.</p>
      </div>
      <div style="background: var(--slate-950); padding: 44px 36px;">
        <div style="width:50px;height:50px;background:rgba(169,209,94,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:22px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--lime-500)" stroke-width="2" style="width:24px;height:24px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h3 style="color:var(--white); font-size:1.3rem; font-weight:800; margin:0 0 14px;">Transparent</h3>
        <p style="color:var(--text-muted); margin:0; line-height:1.7;">Kein Angebot ohne Besichtigung, kein Nachschlag ohne Absprache. Ehrliche Einschätzung — auch wenn der Rat lautet: abwarten.</p>
      </div>
    </div>
  </section>

  <!-- Ausrüstung -->
  <section class="app-section">
    <h2 class="app-section-title">Unsere <span class="lime-text">Ausrüstung.</span></h2>
    <p class="lead-text" style="max-width:700px; margin-bottom:50px;">Jede Situation braucht das richtige Werkzeug. Wir investieren in Technik, damit wir auch dort arbeiten können, wo andere nicht hinkommen.</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
      <div class="card-3d" style="padding:32px;">
        <h4 style="color:var(--lime-500); font-size:1rem; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 10px; font-weight:800;">Seilklettertechnik (SKT)</h4>
        <p style="color:var(--text-muted); margin:0; line-height:1.7; font-size:0.95rem;">Baumschonende Kletterarbeit für enge Standorte, Kronenpflege und kontrolliertes stückweises Abtragen ohne Kran.</p>
      </div>
      <div class="card-3d" style="padding:32px;">
        <h4 style="color:var(--lime-500); font-size:1rem; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 10px; font-weight:800;">Hubsteiger</h4>
        <p style="color:var(--text-muted); margin:0; line-height:1.7; font-size:0.95rem;">Für größere Kronenbereiche oder wenn ein stabiler Standpunkt außerhalb des Baums gebraucht wird. Schnell und präzise.</p>
      </div>
      <div class="card-3d" style="padding:32px;">
        <h4 style="color:var(--lime-500); font-size:1rem; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 10px; font-weight:800;">Eigene Wurzelfräse</h4>
        <p style="color:var(--text-muted); margin:0; line-height:1.7; font-size:0.95rem;">Passiert durch Durchfahrten ab ca. 90 cm Breite. Fräst Baumstümpfe bodenbündig aus — die Fläche ist danach sofort wieder nutzbar.</p>
      </div>
      <div class="card-3d" style="padding:32px;">
        <h4 style="color:var(--lime-500); font-size:1rem; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 10px; font-weight:800;">Schweres Gerät</h4>
        <p style="color:var(--text-muted); margin:0; line-height:1.7; font-size:0.95rem;">Für Projekte, bei denen Kran oder Radlader sinnvoll sind. Wir koordinieren den richtigen Geräteeinsatz für jede Baustelle.</p>
      </div>
    </div>
  </section>

  <!-- Live Feed -->
  <section class="app-section" style="background: rgba(0,0,0,0.2); border-top: 1px solid var(--glass-border);">
    <h2 class="app-section-title">Unser Alltag. <span class="lime-text">Live.</span></h2>
    <p class="lead-text" style="max-width:700px; margin-bottom:50px;">Keine gestellten Fotos. Direkt von der Baustelle — Seilarbeit, Fällungen, Maschineneinsatz.</p>
    <div style="margin-bottom: 60px;">${instaVideoHtml}</div>
    <h3 style="color:var(--white); font-size:1.8rem; font-weight:800; margin-bottom:30px;">Maschinen & Einsatzbilder</h3>
    ${imgGalleryHtml}
  </section>

  <!-- CTA Close -->
  <section class="app-section" style="background: rgba(22,24,34,0.8); border-top: 1px solid var(--glass-border); text-align: center;">
    <h2 class="app-section-title" style="max-width:700px; margin:0 auto 20px;">Bereit für Ihr <span class="lime-text">Projekt?</span></h2>
    <p class="lead-text" style="max-width:600px; margin:0 auto 50px;">Kostenlose Besichtigung, ehrliches Angebot. Rufen Sie an oder starten Sie jetzt die 3D-Anfrage.</p>
    <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
      <a href="tel:${contact.phone}" class="button-primary btn-pulse" style="display:inline-flex; align-items:center; gap:10px; padding:18px 36px; font-size:1.1rem; text-decoration:none;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:20px;height:20px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${contact.phoneDisplay}
      </a>
      <a href="/angebot/" class="hero-cta-outline" style="padding:18px 36px; font-size:1.1rem;">3D-Anfrage starten →</a>
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
          <button class="option-card wiz-btn" onclick="wizSelect(1,'Baumfällung');nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">01</span><strong style="display:block; font-size:1.5rem;">Baumfällung</strong></button>
          <button class="option-card wiz-btn" onclick="wizSelect(1,'Baumpflege');nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">02</span><strong style="display:block; font-size:1.5rem;">Baumpflege</strong></button>
          <button class="option-card wiz-btn" onclick="wizSelect(1,'Fräsen / Rasen');nextStep(2)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><span class="masonry-badge" style="margin-bottom:15px; display:inline-block;">03</span><strong style="display:block; font-size:1.5rem;">Fräsen / Rasen</strong></button>
        </div>
      </div>

      <!-- Step 2: Dringlichkeit -->
      <div id="step-2" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Wie dringend ist es?</h2>
        <p class="lead-text">So können wir Notfälle priorisieren.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="wizSelect(2,'Sofort (Notfall)');nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Sofort (Notfall)</strong><p style="color:var(--text-muted); margin-top:10px;">Baum ist umgestürzt oder droht zu fallen.</p></button>
          <button class="option-card wiz-btn" onclick="wizSelect(2,'Nächste Wochen');nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Nächste Wochen</strong><p style="color:var(--text-muted); margin-top:10px;">Muss zeitnah, aber nicht sofort erledigt werden.</p></button>
          <button class="option-card wiz-btn" onclick="wizSelect(2,'Erst Beratung');nextStep(3)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Beratung</strong><p style="color:var(--text-muted); margin-top:10px;">Ich möchte erst eine Begutachtung.</p></button>
        </div>
        <button onclick="prevStep(1)" class="button-outline-light" style="margin-top: 30px; display:inline-block; border:none; color:var(--text-muted); cursor:pointer; background:transparent;">Zurück</button>
      </div>

      <!-- Step 3: Situation -->
      <div id="step-3" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Wie ist die Situation vor Ort?</h2>
        <p class="lead-text">Kurze Einschätzung der Zugänglichkeit für unsere Technik.</p>
        <div class="option-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 40px;">
          <button class="option-card wiz-btn" onclick="wizSelect(3,'Einfacher Zugang');nextStep(4)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Einfacher Zugang</strong><p style="color:var(--text-muted); margin-top:10px;">Von der Straße oder dem Garten gut erreichbar.</p></button>
          <button class="option-card wiz-btn" onclick="wizSelect(3,'Schwer zugänglich');nextStep(4)" style="background: rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); padding:30px; text-align:left; color:var(--white); cursor:pointer; transition: 0.3s;"><strong style="display:block; font-size:1.3rem;">Schwer zugänglich</strong><p style="color:var(--text-muted); margin-top:10px;">Enges Grundstück, Haus im Weg (Seilklettertechnik).</p></button>
        </div>
        <button onclick="prevStep(2)" class="button-outline-light" style="margin-top: 30px; display:inline-block; border:none; color:var(--text-muted); cursor:pointer; background:transparent;">Zurück</button>
      </div>

      <!-- Step 4: WhatsApp-Weiterleitung -->
      <div id="step-4" class="wizard-step" style="display: none; opacity: 0; transform: translateX(50px); transition: all 0.5s;">
        <h2 style="color:var(--white); font-size: 2.5rem; margin-bottom: 10px;">Ihre Projektdaten</h2>
        <p class="lead-text">Fast geschafft! Direkt per WhatsApp — schnellste Reaktionszeit.</p>
        <form id="wiz-form" onsubmit="event.preventDefault(); window.open(buildWALink(document.getElementById('wiz-ort').value, document.getElementById('wiz-tel').value, document.getElementById('wiz-details').value),'_blank');">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:40px;">
            <input id="wiz-ort" type="text" placeholder="Ort (z.B. Bisingen)" required style="padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;">
            <input id="wiz-tel" type="tel" placeholder="Telefonnummer (optional)" style="padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;">
          </div>
          <textarea id="wiz-details" placeholder="Weitere Details oder Besonderheiten (optional)" rows="4" style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); color: var(--white); font-size: 1.1rem; width: 100%;"></textarea>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 40px;">
            <button type="button" onclick="prevStep(3)" class="button-outline-light" style="border:none; color:var(--text-muted); cursor:pointer; background:transparent; font-size:1.1rem;">Zurück</button>
            <button type="submit" class="button-primary" style="padding: 20px 40px; font-size: 1.1rem; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:10px;"><svg viewBox="0 0 24 24" fill="currentColor" style="width:20px;height:20px;flex-shrink:0;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/></svg> Per WhatsApp anfragen</button>
          </div>
        </form>
      </div>

    </div>
  </section>
  <style>
    .wiz-btn:hover { border-color: var(--lime-500) !important; background: rgba(169, 209, 94, 0.1) !important; transform: translateY(-5px); }
  </style>
`);

