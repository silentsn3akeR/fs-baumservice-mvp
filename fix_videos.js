const fs = require('fs');
let content = fs.readFileSync('build-site.mjs', 'utf8');

// 1. Replace all controls preload="metadata" with autoplay muted loop playsinline
content = content.replace(/controls preload="metadata"/g, 'autoplay muted loop playsinline');
content = content.replace(/controls muted playsinline preload="metadata"/g, 'autoplay muted loop playsinline');

// 2. Add hero sections to specific tabs
function injectHero(content, pageName, title, subtitle) {
  const marker = `writePage("${pageName}",`;
  const heroHtml = `
    <section class="hero-app" style="height: 40vh; min-height: 300px;">
      <video class="hero-video-bg" src="/assets/video/instagram/\${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
      <div class="hero-app-content">
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>
    </section>
  `;
  
  if (content.includes(marker)) {
    // If it's a hardcoded string template starting right after `writePage("...", "...", "...", \``
    // We can inject the hero right after the backtick.
    const re = new RegExp(`(writePage\\("${pageName}",\\s*"[^"]+",\\s*"[^"]+",\\s*\`)`, 'g');
    if (re.test(content)) {
      content = content.replace(re, `$1${heroHtml}`);
    }
  }
  return content;
}

content = injectHero(content, "/referenzen/", "Galerie & Insta", "Echte Einsätze im Zollernalbkreis");
content = injectHero(content, "/ueber-uns/", "Über Uns", "Ihr regionaler Baumservice");
content = injectHero(content, "/kontakt/", "Kontakt", "Wir freuen uns auf Ihre Anfrage");

// For ratgeberHtml, which is a variable, we have to find its definition or replace it inline.
content = content.replace('writePage("/ratgeber/", "Preise, Ratgeber & Baumlexikon", "Infos zu Baumfällung, Kosten und Baumkrankheiten.", ratgeberHtml);', 
  `const ratgeberHero = \`
    <section class="hero-app" style="height: 40vh; min-height: 300px;">
      <video class="hero-video-bg" src="/assets/video/instagram/\${instaVideos[Math.floor(Math.random() * instaVideos.length)]}" autoplay muted loop playsinline style="filter: brightness(0.3);"></video>
      <div class="hero-app-content">
        <h1>Ratgeber</h1>
        <p>Preise, Tipps und Baumlexikon</p>
      </div>
    </section>
  \`;\nwritePage("/ratgeber/", "Preise, Ratgeber & Baumlexikon", "Infos zu Baumfällung, Kosten und Baumkrankheiten.", ratgeberHero + ratgeberHtml);`);

// Increment cache buster
content = content.replace(/v=8/g, 'v=9');

fs.writeFileSync('build-site.mjs', content);
console.log("Modifications done");
