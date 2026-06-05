const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const srcs = content.match(/src="([^"]+)"/g);
if(srcs) srcs.forEach(s => console.log(s));
