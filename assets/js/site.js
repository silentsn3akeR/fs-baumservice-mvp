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
