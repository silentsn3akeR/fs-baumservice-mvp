import { pageShell, img, protocol, FS } from "../lib.mjs";

// Beweisfuehrung statt Galerie: 1 Voll-Case + ehrlich getrennte Kurzdokumentationen.
// Ortsangaben nur Regions-Granularitaet (C-016).
export async function render() {
  const body = `
<section class="section shell" style="padding-top: var(--space-5)">
  ${protocol('Einsatzdokumentation — <span class="leaf">Arbeit zeigt mehr als ein Versprechen</span>')}
  <h1 class="monument mt-4" style="font-size:clamp(2rem,5.5vw,4.6rem); max-width:14ch">Echte Einsätze, echte Bilder.</h1>
  <p class="lead muted mt-4" style="max-width:44rem">Keine Stockfotos, keine Symbolbilder: Alles hier stammt aus unserer eigenen Arbeit im Einsatzgebiet. Konkrete Orte nennen wir ohne Freigabe der Eigentümer nicht.</p>
</section>

<section class="section dark" aria-labelledby="pj-voll">
  <div class="shell stack-3">
    ${protocol('Vollständig dokumentiert', { id: "pj-voll", h: 2 })}
    <div class="evidence mt-4">
      <a class="ev-media plate" href="/projekte/winterfaellung-am-wohnhaus/" aria-label="Zum dokumentierten Einsatz: Winterfällung am Wohnhaus">
        ${img({
          master: "M-01", slot: "hero", widths: [640, 960, 1440],
          sizes: "(min-width: 64rem) 55vw, 100vw",
          alt: "Drohnenaufnahme: Kletterer zwischen zwei entasteten Stämmen über einem verschneiten Wohngrundstück.",
        })}
        <span class="credit">Drohnen-Dokumentation</span>
      </a>
      <div class="ev-copy">
        <h3 class="title">Winterfällung am Wohnhaus</h3>
        <div class="ev-beats">
          <div class="ev-beat"><span class="b-key">Aufgabe</span><span class="b-val">Rückbau zweier Nadelbäume unmittelbar am Gebäude.</span></div>
          <div class="ev-beat"><span class="b-key">Methode</span><span class="b-val">Seilklettertechnik, Abtrag in Sektionen.</span></div>
          <div class="ev-beat"><span class="b-key">Region</span><span class="b-val">Wohngebiet im Zollernalbkreis · Winter.</span></div>
        </div>
        <a class="textlink" href="/projekte/winterfaellung-am-wohnhaus/">Ganzen Einsatz ansehen →</a>
      </div>
    </div>
  </div>
</section>

<section class="section shell" aria-labelledby="pj-kurz">
  ${protocol('Kurzdokumentationen', { id: "pj-kurz", h: 2 })}
  <div class="grid grid--12 mt-4">
    <figure style="grid-column: span 6; margin:0" class="stack-2">
      <div class="plate">
        ${img({
          master: "M-03", slot: "monument", widths: [640, 960],
          sizes: "(min-width: 64rem) 46vw, 100vw", ratio: "3 / 2",
          alt: "Teleskopkran ragt neben einem Wohnhausdach in die Krone eines großen, kahlen Laubbaums.",
        })}
        <span class="credit">Einsatzdokumentation</span>
      </div>
      <figcaption class="stack-2">
        <p class="protocol protocol--end" style="justify-content:start">Kranfällung am Wohnhaus</p>
        <p class="muted" style="font-size:var(--small); max-width:38em">Großer Laubbaum direkt über dem Dach — Abtrag mit Autokran-Unterstützung <span class="chip">Partnertechnik</span> und Seilklettertechnik.</p>
      </figcaption>
    </figure>
    <figure style="grid-column: span 6; margin:0" class="stack-2">
      <div class="plate">
        ${img({
          master: "M-07", slot: "praezision", widths: [640, 960],
          sizes: "(min-width: 64rem) 46vw, 100vw", ratio: "3 / 2",
          alt: "Stammsegment hängt am Seil dicht über Dachrinne und Hecke, ein Arbeiter führt es.",
        })}
        <span class="credit">Einsatzdokumentation</span>
      </div>
      <figcaption class="stack-2">
        <p class="protocol protocol--end" style="justify-content:start">Abtragen über Gebäudekante</p>
        <p class="muted" style="font-size:var(--small); max-width:38em">Geführtes Ablassen zwischen Dachrinne und Hecke — Zentimeterarbeit am Seil.</p>
      </figcaption>
    </figure>
  </div>
  <p class="muted mt-4" style="font-size:.78rem">Weitere Einsätze werden nach und nach dokumentiert — laufende Arbeit auf <a class="textlink" href="${FS.instagram}" rel="noopener">Instagram</a>.</p>
</section>

<section class="section dark">
  <div class="shell action">
    <p class="protocol">Ähnliche Situation bei Ihnen?</p>
    <div class="action-ways">
      <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
      <a class="cta cta--solid" href="/kontakt/">Anfrage stellen</a>
    </div>
  </div>
</section>`;

  return {
    route: "projekte",
    html: pageShell({
      title: "Projekte & Einsatzdokumentation | FS Baumservice",
      desc: "Dokumentierte Einsätze von FS Baumservice: Fällungen an Wohnhäusern, Kranarbeit, Seilklettertechnik — echte Bilder aus dem Zollernalbkreis.",
      path: "/projekte/", current: "/projekte/", headerOnPaper: true, body,
    }),
  };
}
