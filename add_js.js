const fs = require('fs');
let b = fs.readFileSync('assets/js/site.js', 'utf8');
b += '\n\n// Mobile Menu Logic\nconst menuToggle = document.querySelector(".mobile-menu-toggle");\nconst sidebar = document.querySelector(".app-sidebar");\nconst overlay = document.querySelector(".mobile-overlay");\nif (menuToggle && sidebar && overlay) {\n  const toggleMenu = () => {\n    sidebar.classList.toggle("is-open");\n    overlay.classList.toggle("is-active");\n  };\n  menuToggle.addEventListener("click", toggleMenu);\n  overlay.addEventListener("click", toggleMenu);\n}\n';
fs.writeFileSync('assets/js/site.js', b);
