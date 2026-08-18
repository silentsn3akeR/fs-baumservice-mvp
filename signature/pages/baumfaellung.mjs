import { pageShell, img, protocol, FS } from "../lib.mjs";

// Charakter: PRAGMATIC CONTROL — Ablauf-gefuehrt, mittlere Intensitaet.
export async function render() {
  const body = `
<section class="section shell" style="padding-top: var(--space-5)">
  ${protocol('Baumfällung — <span class="leaf">pragmatisch, kontrolliert</span>')}
  <div class="grid grid--12 mt-4">
    <div style="grid-column: span 6" class="stack-3">
      <h1 class="monument" style="font-size:clamp(2rem,5vw,4.2rem)">Wenn ein Baum weichen muss.</h1>
      <p class="lead muted">Nicht standsicher, krank, im Weg für ein Bauvorhaben: Es gibt gute Gründe für eine Fällung. Wir prüfen vor Ort, was nötig ist — und fällen kontrolliert, auch dort, wo kein Platz zum Fallen ist.</p>
      <p class="prose muted">Typisch: beengte Grundstücke, Bäume nahe an Gebäuden, schwer zugängliche Standorte. Zu eventuell nötigen Genehmigungen beraten wir — oder übernehmen das Verfahren komplett.</p>
    </div>
    <div style="grid-column: span 6" class="plate">
      ${img({
        master: "M-05", slot: "action", widths: [640, 960, 1440],
        sizes: "(min-width: 64rem) 46vw, 100vw", ratio: "4 / 3",
        alt: "Kletterer hoch in einer kahlen Krone, ein abgetrenntes Kronenstück fällt kontrolliert am Seil.",
      })}
      <span class="credit">Einsatzdokumentation</span>
    </div>
  </div>
</section>

<section class="section shell" style="padding-top:0" aria-labelledby="bf-ablauf">
  ${protocol('So läuft eine Fällung bei uns', { id: "bf-ablauf", h: 2 })}
  <div class="steps mt-4" style="grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))">
    <div class="step"><span class="st-key">Vor Ort</span><h3>Besichtigung</h3><p>Baum, Standort und Umfeld einschätzen — daraus folgt die Technik.</p></div>
    <div class="step"><span class="st-key">Planung</span><h3>Zugang &amp; Sicherung</h3><p>Ablauf, Fallbereich und Seilführung werden vor dem ersten Schnitt festgelegt.</p></div>
    <div class="step"><span class="st-key">Einsatz</span><h3>Abtrag in Sektionen</h3><p>Per Seilklettertechnik oder passender Technik — nichts fällt unkontrolliert.</p></div>
    <div class="step"><span class="st-key">Abschluss</span><h3>Entsorgung</h3><p>Auf Wunsch werden Schnittgut und Stammholz zeitnah und umweltgerecht entsorgt.</p></div>
  </div>
</section>

<section class="section dark" aria-labelledby="bf-faq">
  <div class="shell stack-3">
    ${protocol('Häufige Fragen', { id: "bf-faq", h: 2 })}
    <div class="mt-4" style="max-width:46rem; display:grid; gap:var(--space-3)">
      <div class="stack-2"><h3 class="title" style="font-size:1.05rem">Wann muss ein Baum gefällt werden?</h3><p class="muted" style="font-size:var(--small)">Wenn er nicht mehr standsicher ist, Schäden verursacht, Baumaßnahmen blockiert oder aus Sicherheitsgründen entfernt werden muss. Die Entscheidung sollte vor Ort geprüft werden.</p></div>
      <div class="stack-2"><h3 class="title" style="font-size:1.05rem">Geht das auch auf engem Grundstück?</h3><p class="muted" style="font-size:var(--small)">Ja — stückweises Abtragen mit Seilklettertechnik, Hubarbeitsgeräten oder bei Bedarf Kran-Unterstützung. Für die schwierigen Fälle: <a class="textlink" href="/spezialfaellung/">Spezialfällung</a>.</p></div>
      <div class="stack-2"><h3 class="title" style="font-size:1.05rem">Was passiert mit Holz und Schnittgut?</h3><p class="muted" style="font-size:var(--small)">Die Entsorgung gehört zum angebotenen Leistungsumfang und wird vorab abgestimmt.</p></div>
    </div>
    <div class="action-ways mt-4">
      <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
      <a class="cta cta--solid" href="/kontakt/">Fällung anfragen</a>
    </div>
  </div>
</section>`;

  return {
    route: "leistungen/baumfaellung",
    html: pageShell({
      title: "Baumfällung in Bisingen, Balingen und Umgebung | FS Baumservice",
      desc: "Kontrollierte Baumfällung auch auf engem Raum: Seilklettertechnik, Abtrag in Sektionen, Beratung zu Genehmigungen — FS Baumservice im Zollernalbkreis.",
      path: "/leistungen/baumfaellung/", current: "/leistungen/", headerOnPaper: true, body,
    }),
  };
}
