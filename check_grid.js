const https = require('https');
https.get('https://silentsn3aker.github.io/fs-baumservice-mvp/?v=8', res => {
  let data = '';
  res.on('data', c => data+=c);
  res.on('end', () => {
    console.log(data.indexOf('<div class="mobile-overlay"></div>'));
    console.log(data.indexOf('<div class="app-container">'));
    console.log(data.indexOf('<aside class="app-sidebar">'));
  });
});
