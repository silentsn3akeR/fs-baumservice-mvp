const fs = require('fs');

let b = fs.readFileSync('build-site.mjs', 'utf8');

const angebotHtml = fs.readFileSync('angebot/index.html', 'utf8');
const start = angebotHtml.indexOf('<main class="app-content">') + '<main class="app-content">'.length;
const end = angebotHtml.indexOf('<footer class="app-footer"');
let angebotBody = angebotHtml.substring(start, end).trim();

// Strip padding from angebot
angebotBody = angebotBody.replace('padding-top: 60px;', 'padding-top: 20px;');

// Hero for Angebot
const angebotHero = `
<section class="hero-app" style="height: 40vh; min-height: 300px;">
  <video class="hero-video-bg" src="/assets/video/instagram/\\\${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
  <div class="hero-app-content">
    <h1>3D-Anfrage</h1>
    <p>Kostenfrei und unverbindlich</p>
  </div>
</section>
`;

// Dynamic Leistungen page
const leistungenPage = `
writePage("/leistungen/", "Alle Leistungen", "Übersicht unserer Baumpflege-Dienstleistungen", \`
<section class="hero-app" style="height: 40vh; min-height: 300px;">
  <video class="hero-video-bg" src="/assets/video/instagram/\\\${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
  <div class="hero-app-content">
    <h1>Unsere Leistungen</h1>
    <p>Professionelle Baumpflege & Fällung</p>
  </div>
</section>
<section class="app-section" style="padding-top: 60px;">
    <h1 class="app-section-title" style="font-size:4rem; color:var(--white);">Was wir <span class="lime-text">können.</span></h1>
    <p class="lead-text" style="max-width: 800px;">Alle Leistungen von FS Baumservice im Detail. Professionelle Baumpflege, Baumfällung per Seilklettertechnik, Grundstückspflege und mehr im Zollernalbkreis.</p>
    <div class="service-list" style="margin-top: 60px;">
      \\\${services.map(s => \\\`
        <a href="/leistungen/\\\${s.slug}/" class="service-detail-card card-3d" style="text-decoration:none;">
          <div class="sdc-image">
            <video src="/assets/video/instagram/\\\${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="width:100%; height:100%; object-fit:cover; filter: brightness(0.6);"></video>
          </div>
          <div class="sdc-content">
            <h3 class="lime-text">\\\${s.name}</h3>
            <p class="sdc-intro">\\\${s.intro}</p>
            <span class="button-primary" style="display:inline-block; margin-top:20px;">Details & Infos</span>
          </div>
        </a>
      \\\`).join("")}
    </div>
</section>
\`);
`;

const angebotPage = `
writePage("/angebot/", "3D Konfigurator", "Schnelle und einfache Projektanfrage", \`
${angebotHero}
${angebotBody}
\`);
`;

// Ensure we don't append multiple times
if (!b.includes('writePage("/leistungen/"')) {
    b += '\\n' + leistungenPage + '\\n';
}
if (!b.includes('writePage("/angebot/"')) {
    b += '\\n' + angebotPage + '\\n';
}

fs.writeFileSync('build-site.mjs', b);
console.log('Fixed build-site.mjs with leistungen and angebot!');
