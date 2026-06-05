const fs = require('fs');

let b = fs.readFileSync('build-site.mjs', 'utf8');

// I will append the exact code for ratgeber, impressum, datenschutz, leistungen, and angebot to build-site.mjs.
// First, extract the existing angebot HTML. I'll read it from `angebot/index.html`.
// Wait, I might have overwritten angebot/index.html? Let's check.
