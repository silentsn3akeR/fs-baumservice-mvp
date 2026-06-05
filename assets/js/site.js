// Custom Cursor Logic
const cursor = document.querySelector(".custom-cursor");
const follower = document.querySelector(".custom-cursor-follower");

if (cursor && follower && window.matchMedia("(hover: hover)").matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;
  
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate cursor update
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });
  
  // Smooth follower update
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.2;
    followerY += (mouseY - followerY) * 0.2;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
  
  // Hover effect on interactive elements
  const interactives = document.querySelectorAll("a, button, input, label, .masonry-item");
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

// Active Nav Logic on Scroll
const sections = document.querySelectorAll("section[id]");
const navBtns = document.querySelectorAll(".nav-btn, .bottom-btn");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navBtns.forEach((btn) => {
          if (btn.getAttribute("href") === `#${entry.target.id}`) {
            btn.classList.add("is-active");
          } else if (btn.getAttribute("href") !== "/") {
            btn.classList.remove("is-active");
          }
        });
      }
    });
  }, { threshold: 0.3 });
  
  sections.forEach((s) => observer.observe(s));
}


// Mobile Menu Logic
const menuToggle = document.querySelector(".mobile-menu-toggle");
const sidebar = document.querySelector(".app-sidebar");
const overlay = document.querySelector(".mobile-overlay");
if (menuToggle && sidebar && overlay) {
  const toggleMenu = () => {
    sidebar.classList.toggle("is-open");
    overlay.classList.toggle("is-active");
  };
  menuToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
}

// Ablauf Timeline Scroll Animation
const timelineEl = document.querySelector('.timeline');
const timelineTrack = document.querySelector('.timeline-track');
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineEl && timelineTrack && timelineItems.length && 'IntersectionObserver' in window) {
  const trackObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) timelineTrack.classList.add('animate');
  }, { threshold: 0.15 });
  trackObs.observe(timelineEl);

  const itemObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.25 });
  timelineItems.forEach(item => itemObs.observe(item));
}

// Animated Stats Counters
const statNums = document.querySelectorAll('.stat-num');
if (statNums.length && 'IntersectionObserver' in window) {
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      if (isNaN(target)) return;
      countObs.unobserve(el);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * ease) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => countObs.observe(el));
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('is-open');

    // Close all open siblings in the same list
    btn.closest('.faq-list')?.querySelectorAll('.faq-item.is-open').forEach(open => {
      open.classList.remove('is-open');
      open.querySelector('.faq-answer').hidden = true;
      open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('is-open');
      answer.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// Section scroll-in animation
if ('IntersectionObserver' in window) {
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        sectionObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });
  document.querySelectorAll('.app-section').forEach(sec => sectionObs.observe(sec));
  // Reveal any sections already in / above viewport after load (tall single-section pages)
  window.addEventListener('load', () => {
    document.querySelectorAll('.app-section:not(.is-visible)').forEach(s => {
      if (s.getBoundingClientRect().top < window.innerHeight) s.classList.add('is-visible');
    });
  });
}

// 4-Step Configurator Logic
window.nextStep = function(n) {
  document.querySelectorAll('.wizard-step').forEach(s => { s.style.opacity='0'; s.style.transform='translateX(-50px)'; setTimeout(()=>s.style.display='none', 300); });
  setTimeout(() => {
    const next = document.getElementById('step-'+n);
    if(next) {
        next.style.display = 'block';
        setTimeout(() => { next.style.opacity='1'; next.style.transform='translateX(0)'; }, 50);
    }
  }, 300);
  for(let i=1; i<=n; i++) document.getElementById('prog-'+i)?.style.setProperty('background', 'var(--lime-500)');
}
window.prevStep = function(n) {
  document.querySelectorAll('.wizard-step').forEach(s => { s.style.opacity='0'; s.style.transform='translateX(50px)'; setTimeout(()=>s.style.display='none', 300); });
  setTimeout(() => {
    const next = document.getElementById('step-'+n);
    if(next) {
        next.style.display = 'block';
        setTimeout(() => { next.style.opacity='1'; next.style.transform='translateX(0)'; }, 50);
    }
  }, 300);
  for(let i=n+1; i<=4; i++) document.getElementById('prog-'+i)?.style.setProperty('background', 'var(--glass-border)');
}

// Seasonal service tip strip
(function() {
  const el = document.getElementById('seasonal-strip');
  if (!el) return;
  const base = (window.__BASE__ || '');
  const m = new Date().getMonth() + 1;
  const seasons = [
    { months: [3,4,5], icon: '🌱', label: 'Frühling:', text: 'Jetzt ideale Zeit für Kronenpflege und Totholzentfernung.', cta: 'Baumpflege anfragen →', href: base+'/leistungen/baumpflege/' },
    { months: [6,7,8], icon: '☀️', label: 'Sommer:', text: 'Hitzestress gefährdet Bäume. Jetzt Kontrolle und Heckenschnitt (nach Brutzeit).', cta: 'Termin anfragen →', href: base+'/angebot/' },
    { months: [9,10,11], icon: '🍂', label: 'Herbst:', text: 'Die beste Zeit für Baumfällungen und Wurzelstockfräsen.', cta: 'Angebot einholen →', href: base+'/angebot/' },
    { months: [12,1,2], icon: '❄️', label: 'Winter:', text: 'Sturmschäden? Sicherheitsprüfung oder Fällung bei laubfreier Sicht.', cta: 'Beratung anfragen →', href: base+'/kontakt/' },
  ];
  const season = seasons.find(s => s.months.includes(m));
  if (!season) return;
  el.innerHTML = '<span class="ssn-icon">'+season.icon+'</span><span class="ssn-label">'+season.label+'</span><span class="ssn-text">'+season.text+'</span><a class="ssn-cta" href="'+season.href+'">'+season.cta+'</a>';
  el.hidden = false;
})();
