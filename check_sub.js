const fs = require('fs');
const content = fs.readFileSync('ueber-uns/index.html', 'utf8');
console.log("--- HREFs ---");
const hrefs = content.match(/href="([^"]+)"/g);
if(hrefs) hrefs.forEach(h => console.log(h));
console.log("--- SRCs ---");
const srcs = content.match(/src="([^"]+)"/g);
if(srcs) srcs.forEach(s => console.log(s));
