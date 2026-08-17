/* FS Signature — Verhaltens-Schicht (Static-Phase: bewusst minimal).
   Motion-Phase ergänzt hier kontrollierte Reveals; alles hinter
   prefers-reduced-motion-Gate. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  // Anfrage-Flow: mailto-Compose — bewusst ohne Server (Preview-Stand).
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
