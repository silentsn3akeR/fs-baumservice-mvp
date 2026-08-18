import { pageShell, img, protocol, FS } from "../lib.mjs";

// Charakter: TECHNICAL PRACTICALITY — Daten-gefuehrt. Ehrliche Medienlage:
// KEIN Foto der Fraese vorhanden (M-08-Dateiname ist irrefuehrend, media.json).
export async function render() {
  const body = `
<section class="section shell" style="padding-top: var(--space-5)">
  ${protocol('Wurzelstockfräsen — <span class="leaf">Fläche wieder nutzbar</span>')}
  <div class="grid grid--12 mt-4">
    <div style="grid-column: span 7" class="stack-3">
      <h1 class="monument" style="font-size:clamp(2rem,5vw,4rem)">Der Baum ist weg. Der Stumpf muss noch.</h1>
      <p class="lead muted">Nach einer Fällung bleibt der Wurzelstock — im Weg für Rasen, Beet oder Neuanlage. Mit der Fräse wird er unter die Oberfläche abgetragen, die Fläche ist danach wieder frei nutzbar.</p>
    </div>
    <div style="grid-column: span 5" class="stack-2" aria-label="Technische Eckdaten">
      <p class="protocol protocol--end">Eckdaten</p>
      <div class="tech-row"><span class="t-name">Durchfahrt</span><span class="t-desc">ab rund 90 cm — auch schmale Gartenzugänge (laut bisheriger Praxis*)</span></div>
      <div class="tech-row"><span class="t-name">Fräse</span><span class="t-desc">eigene Wurzelfräse laut bisheriger Website*</span><span class="chip">eigene Technik*</span></div>
      <div class="tech-row"><span class="t-name">Anschluss</span><span class="t-desc">Fläche wird für Rasen, Bepflanzung oder <a class="textlink" href="/leistungen/rollrasen/">Rollrasen</a> vorbereitet</span></div>
    </div>
  </div>
  <p class="muted mt-4" style="font-size:.78rem">* Angaben aus der bisherigen Website; werden zur Veröffentlichung mit dem Betrieb verifiziert.</p>
</section>

<section class="section dark" aria-labelledby="ws-ablauf">
  <div class="shell stack-3">
    ${protocol('Ablauf', { id: "ws-ablauf", h: 2 })}
    <div class="evidence mt-4">
      <div class="ev-media plate">
        ${img({
          master: "V-02", slot: "schnittflaeche", widths: [720],
          sizes: "(min-width: 64rem) 55vw, 100vw", ratio: "4 / 3",
          alt: "Frische Schnittfläche eines Baumstumpfs nach dem Abtrag, Nahaufnahme mit Rindenstruktur.",
        })}
        <span class="credit">Standbild · Stumpf nach Abtrag, vor dem Fräsen</span>
      </div>
      <div class="ev-copy">
        <div class="ev-beats">
          <div class="ev-beat"><span class="b-key">Prüfen</span><span class="b-val">Zugang, Stumpfgröße und Umgebung (Leitungen, Wurzelverlauf) einschätzen.</span></div>
          <div class="ev-beat"><span class="b-key">Festlegen</span><span class="b-val">Frästiefe und Arbeitsbereich nach geplanter Nutzung der Fläche.</span></div>
          <div class="ev-beat"><span class="b-key">Fräsen</span><span class="b-val">Stumpf und oberflächennahe Wurzeln werden ausgefräst.</span></div>
          <div class="ev-beat"><span class="b-key">Vorbereiten</span><span class="b-val">Fläche für Einsaat, Beet oder Rollrasen herrichten.</span></div>
        </div>
        <p class="prose muted" style="font-size:var(--small)">Auch Stümpfe aus früheren Fällungen anderer Betriebe fräsen wir nach Prüfung vor Ort.</p>
      </div>
    </div>
    <div class="action-ways mt-4">
      <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
      <a class="cta cta--solid" href="/kontakt/">Stumpf anfragen</a>
    </div>
  </div>
</section>`;

  return {
    route: "leistungen/wurzelstockfraesen",
    html: pageShell({
      title: "Wurzelstockfräsen nach Baumfällungen | FS Baumservice",
      desc: "Wurzelstock entfernen im Raum Bisingen, Balingen, Geislingen: Fräsen auch bei schmalen Zugängen ab ca. 90 cm, Fläche danach direkt nutzbar.",
      path: "/leistungen/wurzelstockfraesen/", current: "/leistungen/", headerOnPaper: true, body,
    }),
  };
}
