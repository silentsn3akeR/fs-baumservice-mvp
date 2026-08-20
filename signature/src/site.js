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

  /* ---- FS_SIG_02 V2: CinematicScene mit CameraRig ----
     p -> Dramaturgie: 0-8 REALITY | 8-18 CAMERA PUSH | 18-34 BURST(Overshoot)
     | 34-60 READ | 60-78 SNAP-REASSEMBLY | 78-100 EXIT-PUSH.
     Deterministisch aus scrollY; Zustaende schalten Uebergaenge (Dim/Leader/Labels). */
  var xv = document.querySelector(".xview");
  if (xv) {
    if (reduced) {
      xv.classList.add("xv-static");
    } else {
      var track = xv.querySelector(".xv-track");
      var sm = function (a, b, p) { var t = Math.min(1, Math.max(0, (p - a) / (b - a))); return t * t * (3 - 2 * t); };
      var back = function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
      var xvTick = false;
      var xvUpdate = function () {
        xvTick = false;
        var r = track.getBoundingClientRect();
        var span = r.height - window.innerHeight;
        var p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
        var ret = sm(0.60, 0.76, p);                       // Reassembly (schnell) + Settle
        var cam = Math.min(sm(0.08, 0.18, p), 1 - ret);    // Kamera-Push halten bis Snap
        var burst = back(sm(0.18, 0.34, p));               // Overshoot-Punch
        var sep = Math.max(0, burst * (1 - ret));
        var exit = sm(0.80, 1.0, p);
        xv.style.setProperty("--cam", cam.toFixed(3));
        xv.style.setProperty("--sep", sep.toFixed(3));
        xv.style.setProperty("--exit", exit.toFixed(3));
        var st = p < 0.08 ? "s0" : p < 0.18 ? "s1" : p < 0.34 ? "s2" : p < 0.60 ? "s3" : p < 0.78 ? "s4" : "s5";
        if (xv.dataset.state !== st) xv.dataset.state = st;
        window.__fsx = { p: +p.toFixed(3), sep: +sep.toFixed(3), cam: +cam.toFixed(3), state: st };
      };
      var xvReq = function () { if (!xvTick) { xvTick = true; requestAnimationFrame(xvUpdate); } };
      addEventListener("scroll", xvReq, { passive: true });
      addEventListener("resize", xvReq, { passive: true });
      xvUpdate();
    }
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
          vc.classList.remove("vc-punched");
          video.play().catch(function () {});
          return;
        }
        btn.setAttribute("aria-pressed", "true");
        var seekAndFreeze = function () {
          video.currentTime = t;
          video.pause();
          vc.classList.add("frozen");
          var fz = vc.querySelector(".vc-fzone");
          if (fz && btn.dataset.zone) {
            var z = btn.dataset.zone.split(",");
            fz.style.left = z[0] + "%"; fz.style.top = z[1] + "%";
          }
          vc.classList.toggle("vc-punched", btn.dataset.punch === "true");
          if (overlay) overlay.textContent = btn.dataset.text || "";
        };
        if (video.readyState >= 1) seekAndFreeze();
        else video.addEventListener("loadedmetadata", seekAndFreeze, { once: true });
      });
    });
  });

  /* ---- Anfrage-Flow: mailto-Compose (bewusst ohne Server-Backend) ---- */
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
