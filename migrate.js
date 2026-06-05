const fs = require('fs');

function extractMain(file) {
  const content = fs.readFileSync(file, 'utf8');
  const start = content.indexOf('<main class="app-content">') + '<main class="app-content">'.length;
  const end = content.indexOf('<footer class="app-footer"');
  if (start > -1 && end > -1) {
    return content.substring(start, end).trim();
  }
  return '';
}

let leistungenBody = extractMain('leistungen/index.html');
let angebotBody = extractMain('angebot/index.html');

// Prepend hero sections
const heroHtml = `
<section class="hero-app" style="height: 40vh; min-height: 300px;">
  <video class="hero-video-bg" src="/assets/video/instagram/\${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
  <div class="hero-app-content">
    <h1>\${TITLE}</h1>
    <p>\${SUBTITLE}</p>
  </div>
</section>
`;

leistungenBody = heroHtml.replace('${TITLE}', 'Unsere Leistungen').replace('${SUBTITLE}', 'Professionelle Baumpflege & Fällung') + leistungenBody;
angebotBody = heroHtml.replace('${TITLE}', '3D-Anfrage').replace('${SUBTITLE}', 'Kostenfrei und unverbindlich') + angebotBody;

// Append to build-site.mjs
let buildSite = fs.readFileSync('build-site.mjs', 'utf8');

// Also, the 4-step configurator JS from angebot/index.html needs to be added to site.js so it works!
// Because build-site.mjs doesn't include custom inline scripts at the bottom.
const configJs = `
// 4-Step Configurator Logic
window.nextStep = function(n) {
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
window.prevStep = function(n) {
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
`;
fs.appendFileSync('assets/js/site.js', configJs);

// Remove the old static writePages if they existed? They didn't exist in build-site.mjs!
buildSite += `\nwritePage("/leistungen/", "Alle Leistungen", "Übersicht unserer Baumpflege-Dienstleistungen", \`${leistungenBody}\`);\n`;
buildSite += `\nwritePage("/angebot/", "3D Konfigurator", "Schnelle und einfache Projektanfrage", \`${angebotBody}\`);\n`;

fs.writeFileSync('build-site.mjs', buildSite);

// We should also delete the static index.html files so they don't get in the way?
// Wait, if writePage runs, it will OVERWRITE them! Which is exactly what we want!
console.log("Extraction complete");
