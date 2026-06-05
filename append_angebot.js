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

const angebotPage = `
writePage("/angebot/", "3D Konfigurator", "Schnelle und einfache Projektanfrage", \`
${angebotHero}
${angebotBody}
\`);
`;

b += '\n' + angebotPage + '\n';
fs.writeFileSync('build-site.mjs', b);
console.log('Appended angebotPage!');
