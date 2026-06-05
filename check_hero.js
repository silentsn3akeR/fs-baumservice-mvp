const https = require('https');
https.get('https://silentsn3aker.github.io/fs-baumservice-mvp/leistungen/baumfaellung/?v=8', res => {
  let data = '';
  res.on('data', c => data+=c);
  res.on('end', () => {
    const match = data.match(/<section class="hero-app"[\s\S]*?<\/section>/);
    console.log(match ? match[0] : "Not found");
  });
});
