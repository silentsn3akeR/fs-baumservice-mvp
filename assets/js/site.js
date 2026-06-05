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
