import { pageShell, protocol, FS } from "../lib.mjs";

// Sekundaerleistung: ruhig-kompakt, ohne Fake-Medien (nur SVG-Platzhalter vorhanden).
export async function render() {
  const body = `
<section class="section shell" style="padding-top: var(--space-5); max-width: 70rem">
  ${protocol('Rollrasen — <span class="leaf">Ergänzungsleistung</span>')}
  <div class="stack-3 mt-4" style="max-width: 46rem">
    <h1 class="title" style="font-size:clamp(1.8rem,4vw,3rem)">Schnell wieder grün.</h1>
    <p class="lead muted">Nach Fällung und Wurzelstockfräsung — oder bei Neuanlage: Wir bereiten die Fläche vor und verlegen Rollrasen, damit das Grundstück schnell wieder nutzbar ist.</p>
    <div class="ev-beats">
      <div class="ev-beat"><span class="b-key">Vorbereitung</span><span class="b-val">Boden beurteilen, Planum abstimmen — besonders nach Fräsarbeiten.</span></div>
      <div class="ev-beat"><span class="b-key">Verlegung</span><span class="b-val">Fachgerecht, mit Hinweisen zur Anwuchsphase.</span></div>
      <div class="ev-beat"><span class="b-key">Kombination</span><span class="b-val">Sinnvoll direkt im Anschluss an <a class="textlink" href="/leistungen/wurzelstockfraesen/">Wurzelstockfräsen</a>.</span></div>
    </div>
    <div class="action-ways">
      <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
      <a class="cta" href="/kontakt/">Anfrage stellen</a>
      <a class="textlink" href="/leistungen/">Alle Leistungen →</a>
    </div>
  </div>
</section>`;

  return {
    route: "leistungen/rollrasen",
    html: pageShell({
      title: "Rollrasen verlegen im Raum Bisingen und Balingen | FS Baumservice",
      desc: "Rollrasen und Rasenvorbereitung für schnell nutzbare Grünflächen — auch direkt nach Baumfällung und Wurzelstockfräsen. FS Baumservice, Zollernalbkreis.",
      path: "/leistungen/rollrasen/", current: "/leistungen/", headerOnPaper: true, body,
    }),
  };
}
