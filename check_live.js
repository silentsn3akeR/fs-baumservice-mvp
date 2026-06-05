const https = require('https');
https.get('https://silentsn3aker.github.io/fs-baumservice-mvp/?v=5', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const matches = data.match(/href="[^"]+"/g) || [];
    const srcMatches = data.match(/src="[^"]+"/g) || [];
    console.log("HREFs:", matches.join('\n'));
    console.log("SRCs:", srcMatches.join('\n'));
  });
});
