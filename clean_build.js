const fs = require('fs');

let b = fs.readFileSync('build-site.mjs', 'utf8');

// The file has duplicated ratgeberHero, and possibly duplicated writePage calls.
// Let's remove everything from line 550 onwards and then append the correct ones cleanly.
const lines = b.split('\n');
let newLines = [];
let foundRatgeberHero = 0;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('const ratgeberHero = `')) {
        foundRatgeberHero++;
        if (foundRatgeberHero > 1) {
            // Stop taking lines after the first occurrence of ratgeberHero to avoid duplicate
            break;
        }
    }
    newLines.push(lines[i]);
}

b = newLines.join('\n');
fs.writeFileSync('build-site.mjs', b);
console.log('Fixed build-site.mjs');
