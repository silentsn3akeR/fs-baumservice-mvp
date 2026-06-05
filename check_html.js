const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('<nav class="app-bottombar">');
const end = html.indexOf('</nav>', start) + 6;
console.log(html.substring(start, end));
