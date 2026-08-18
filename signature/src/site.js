/* FS Signature — Verhaltens-Schicht.
   Prinzipien: REVEAL / EXPLAIN / FOCUS. Ohne JS bleibt alles nutzbar,
   prefers-reduced-motion deaktiviert jede Bewegung (CSS-Gate). */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Reveal-Kandidaten zentral annotieren (Markup bleibt sauber) ---- */
  var revealSel = [".section .protocol", ".ev-copy", ".dc-copy", ".feature-copy",
    ".steps .step", ".hu-copy", ".action", ".tech-row"];
  var mediaSel = [".ev-media", ".dc-media", ".hu-plate", ".feature-split .plate"];
  if (!reduced && "IntersectionObserver" in window) {
    revealSel.forEach(function (s) {
      document.querySelectorAll(s).forEach(function (el) { el.classList.add("reveal"); });
    });
    mediaSel.forEach(function (s) {
      document.querySelectorAll(s).forEach(function (el) { el.classList.add("reveal-media"); });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll(".reveal, .reveal-media").forEach(function (el) { io.observe(el); });
  }

  /* ---- Hero Depth: max ±28px, nur solange der Hero sichtbar ist ---- */
  var hero = document.querySelector(".hero, .page-hero");
  if (hero && !reduced) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var y = Math.min(window.scrollY, 520);
      hero.style.setProperty("--sy", y.toFixed(0));
    };
    addEventListener("scroll", function () {
      if (!ticking && hero.getBoundingClientRect().bottom > 0) {
        ticking = true; requestAnimationFrame(update);
      }
    }, { passive: true });
  }

  /* ---- Video-Kapitel: REAL → FREEZE → ERKLÄREN ---- */
  document.querySelectorAll(".vchapter").forEach(function (vc) {
    var video = vc.querySelector("video");
    var overlay = vc.querySelector(".vc-overlay p");
    var buttons = vc.querySelectorAll(".vc-chapters button");
    if (!video) return;
    var loaded = false;
    function ensureSrc() {
      if (!loaded) { video.load(); loaded = true; }
    }
    if (!reduced && "IntersectionObserver" in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            ensureSrc();
            if (!vc.classList.contains("frozen")) video.play().catch(function () {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.35 });
      vio.observe(video);
    }
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        ensureSrc();
        var t = parseFloat(btn.dataset.t || "0");
        var resume = btn.dataset.resume === "true";
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        if (resume) {
          vc.classList.remove("frozen");
          video.play().catch(function () {});
          return;
        }
        btn.setAttribute("aria-pressed", "true");
        var seekAndFreeze = function () {
          video.currentTime = t;
          video.pause();
          vc.classList.add("frozen");
          if (overlay) overlay.textContent = btn.dataset.text || "";
        };
        if (video.readyState >= 1) seekAndFreeze();
        else video.addEventListener("loadedmetadata", seekAndFreeze, { once: true });
      });
    });
  });

  /* ---- Anfrage-Flow: mailto-Compose (bewusst ohne Server, Preview-Stand) ---- */
  var form = document.getElementById("anfrage");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = [
        "Anliegen: " + (d.get("anliegen") || "-"),
        "Dringlichkeit: " + (d.get("dringlichkeit") || "-"),
        "Ort: " + (d.get("ort") || "-"),
        "",
        "Situation:",
        d.get("situation") || "-",
        "",
        "Name: " + (d.get("name") || "-"),
        "Rückruf/Antwort an: " + (d.get("kontakt") || "-"),
      ].join("\n");
      var subject = "Anfrage: " + (d.get("anliegen") || "Baumarbeiten");
      location.href = "mailto:info@fs-baumservice.de?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
})();
