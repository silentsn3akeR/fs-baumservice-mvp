const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#main-nav");
const header = document.querySelector(".site-header");
const heroMedia = document.querySelector(".hero-media img");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Navigation Toggle ──────────────────────────────────
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
}

// ── Scroll Effects (header compact + hero parallax) ────
function updateScrollEffects() {
  const y = window.scrollY || 0;
  if (header) header.classList.toggle("is-compact", y > 24);
  if (heroMedia && !reduceMotion) {
    heroMedia.style.setProperty("--hero-shift", `${Math.min(y * 0.11, 42)}px`);
  }
}

updateScrollEffects();
window.addEventListener("scroll", updateScrollEffects, { passive: true });

// ── Reveal on Scroll ───────────────────────────────────
const revealItems = [...document.querySelectorAll(".reveal")];

if (revealItems.length) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
}

// ── Animated Number Counters ───────────────────────────
if (!reduceMotion && "IntersectionObserver" in window) {
  const counters = [...document.querySelectorAll("[data-counter]")];
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        if (isNaN(target)) return;
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => counterObserver.observe(c));
  }
}

// ── Configurator ───────────────────────────────────────
const configurator = document.querySelector("[data-configurator]");

if (configurator) {
  const form = configurator.querySelector("[data-config-form]");
  const steps = [...configurator.querySelectorAll("[data-step]")];
  const dots = [...configurator.querySelectorAll("[data-step-dot]")];
  const progress = configurator.querySelector("[data-progress-bar]");
  const readinessBar = configurator.querySelector("[data-readiness-bar]");
  const readinessText = configurator.querySelector("[data-readiness-text]");
  const prev = configurator.querySelector("[data-prev-step]");
  const next = configurator.querySelector("[data-next-step]");
  const mail = configurator.querySelector("[data-mail-link]");
  const copy = configurator.querySelector("[data-copy-summary]");
  const summary = configurator.querySelector("[data-summary]");
  let current = 1;

  const labels = {
    leistung: "Leistung", ort: "Ort", umfang: "Umfang",
    groesse: "Größe", dringlichkeit: "Dringlichkeit",
    beschreibung: "Beschreibung", zufahrt: "Zufahrt / Besonderheiten",
    name: "Name", telefon: "Telefon", email: "E-Mail", zeit: "Wunschzeit",
  };

  function getValue(name) {
    const checked = form.querySelector(`[name="${name}"]:checked`);
    if (checked) return checked.value;
    const field = form.elements[name];
    return field ? field.value.trim() : "";
  }

  function getDetails() {
    return [...form.querySelectorAll('input[name="details"]:checked')].map((input) => input.value);
  }

  function buildSummary() {
    const rows = [
      ["Leistung", getValue("leistung")],
      ["Ort", getValue("ort")],
      ["Umfang", getValue("umfang")],
      ["Größe", getValue("groesse")],
      ["Dringlichkeit", getValue("dringlichkeit")],
      ["Details", getDetails().join(", ")],
      ["Zufahrt / Besonderheiten", getValue("zufahrt")],
      ["Beschreibung", getValue("beschreibung")],
      ["Name", getValue("name")],
      ["Telefon", getValue("telefon")],
      ["E-Mail", getValue("email")],
      ["Wunschzeit", getValue("zeit")],
    ].filter(([, value]) => value);

    if (!rows.length) return "Bitte füllen Sie die Schritte aus.";

    return [
      "Anfrage über den FS Baumservice Konfigurator",
      "",
      ...rows.map(([label, value]) => `${label}: ${value}`),
      "",
      "Hinweis: Bitte vor Ort prüfen und keine automatische Preiszusage ableiten.",
    ].join("\n");
  }

  function updateReadiness() {
    const checks = [
      Boolean(getValue("leistung")),
      Boolean(getValue("ort")),
      Boolean(getValue("umfang") || getValue("beschreibung")),
      Boolean(getValue("groesse") || getValue("zufahrt")),
      getDetails().length > 0,
      Boolean(getValue("name")),
      Boolean(getValue("telefon")),
    ];
    const score = checks.filter(Boolean).length;
    const percent = Math.round((score / checks.length) * 100);
    if (readinessBar) readinessBar.style.width = `${percent}%`;
    if (readinessText) {
      readinessText.textContent =
        percent < 35 ? "Erste Angaben fehlen noch." :
        percent < 75 ? "Gute Grundlage für Rückfragen." :
        "Sehr gut vorbereitet für die Ersteinschätzung.";
    }
  }

  function update() {
    steps.forEach((step) => step.classList.toggle("is-active", Number(step.dataset.step) === current));
    dots.forEach((dot) => dot.classList.toggle("is-active", Number(dot.dataset.stepDot) <= current));
    progress.style.width = `${(current / steps.length) * 100}%`;
    prev.hidden = current === 1;
    next.hidden = current === steps.length;
    mail.hidden = current !== steps.length;
    copy.hidden = current !== steps.length;
    const text = buildSummary();
    summary.textContent = text;
    const subject = encodeURIComponent(`Anfrage FS Baumservice: ${getValue("leistung") || "Baumarbeiten"}`);
    const body = encodeURIComponent(text);
    mail.href = `mailto:info@fs-baumservice.de?subject=${subject}&body=${body}`;
    updateReadiness();
  }

  function stepIsValid(stepNumber) {
    const step = steps.find((item) => Number(item.dataset.step) === stepNumber);
    const required = [...step.querySelectorAll("[required]")];
    const invalid = required.find((field) => {
      if (field.type === "radio") return !form.querySelector(`[name="${field.name}"]:checked`);
      if (field.type === "checkbox") return !field.checked;
      return !field.value.trim();
    });
    if (invalid) { invalid.focus(); return false; }
    return true;
  }

  next.addEventListener("click", () => {
    if (!stepIsValid(current)) return;
    current = Math.min(steps.length, current + 1);
    update();
  });

  prev.addEventListener("click", () => {
    current = Math.max(1, current - 1);
    update();
  });

  form.addEventListener("input", update);
  form.addEventListener("change", update);

  copy.addEventListener("click", async () => {
    const text = buildSummary();
    try {
      await navigator.clipboard.writeText(text);
      copy.textContent = "Kopiert";
      setTimeout(() => { copy.textContent = "Zusammenfassung kopieren"; }, 1600);
    } catch {
      summary.focus();
    }
  });

  update();
}

// ── Carousel ───────────────────────────────────────────
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  let active = 0;
  let autoTimer;

  function show(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === active));
    dots.forEach((dot, i) => {
      if (i === active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function startAuto() {
    if (reduceMotion) return;
    clearInterval(autoTimer);
    autoTimer = setInterval(() => show(active + 1), 5000);
  }

  function stopAuto() { clearInterval(autoTimer); }

  prev?.addEventListener("click", () => { show(active - 1); stopAuto(); startAuto(); });
  next?.addEventListener("click", () => { show(active + 1); stopAuto(); startAuto(); });
  dots.forEach((dot) => dot.addEventListener("click", () => { show(Number(dot.dataset.carouselDot)); stopAuto(); startAuto(); }));
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { show(active - 1); stopAuto(); startAuto(); }
    if (event.key === "ArrowRight") { show(active + 1); stopAuto(); startAuto(); }
  });

  // Pause auto-play when hovered or focused
  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);
  carousel.addEventListener("focusin", stopAuto);
  carousel.addEventListener("focusout", startAuto);

  startAuto();
});
