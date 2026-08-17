import { pageShell, img, protocol, FS } from "../lib.mjs";

export async function render() {
  const body = `
<section class="page-hero dark">
  <div class="hero-media">
    ${img({
      master: "M-01", slot: "hero", widths: [640, 960, 1440, 1920, 2560],
      sizes: "100vw", eager: true,
      mobile: { slot: "heromob", widths: [640, 960], media: "(max-width: 47.9rem)" },
      alt: "Drohnenaufnahme: Kletterer arbeitet gesichert zwischen zwei entasteten Nadelbaumstämmen über einem verschneiten Wohngrundstück.",
    })}
  </div>
  <div class="hero-inner shell">
    <p class="protocol hero-protocol"><span class="leaf">Einsatz-Dokumentation</span>&nbsp;· Winter · Wohngebiet · Zollernalb</p>
    <h1 class="monument hero-headline" style="font-size:clamp(1.9rem,5vw,4.6rem)">Zwei Nadelbäume,<br>ein Wohnhaus,<br>kein Spielraum.</h1>
  </div>
</section>

<section class="section shell" aria-labelledby="lage-h">
  ${protocol('01 — Ausgangslage', { id: "lage-h" })}
  <div class="decon mt-4">
    <div class="decon-stage">
      <div class="dc-media plate">
        ${img({
          master: "M-01", slot: "crop-haus", widths: [640, 960],
          sizes: "(min-width: 64rem) 55vw, 100vw",
          alt: "Ausschnitt der Drohnenaufnahme: das Wohnhaus mit verschneitem Dach, direkt daneben Hecke und Einfahrt.",
        })}
        <span class="credit">Ausschnitt aus der Einsatzaufnahme</span>
      </div>
      <div class="dc-copy">
        <span class="st-key">Die Lage</span>
        <h3>Wohnhaus, Hecke, Zufahrt — alles im Fallbereich</h3>
        <p class="muted">Zwei hohe Nadelbäume standen unmittelbar am Grundstück: Haus auf der einen Seite, Nachbarschaft und Zufahrt auf der anderen. Frei fällen? Ausgeschlossen.</p>
      </div>
    </div>

    <div class="decon-stage">
      <div class="dc-media plate">
        ${img({
          master: "M-01", slot: "crop-seile", widths: [640, 960],
          sizes: "(min-width: 64rem) 55vw, 100vw",
          alt: "Ausschnitt: Seilführung und Anschlagpunkte oben in den entasteten Stämmen.",
        })}
        <span class="credit">Ausschnitt aus der Einsatzaufnahme</span>
      </div>
      <div class="dc-copy">
        <span class="st-key">Die Sicherung</span>
        <h3>Erst die Seile, dann die Säge</h3>
        <p class="muted">Zugang über Seilklettertechnik, gesichert am Doppelseil. Die Seilführung steht, bevor der erste Schnitt fällt — für den Kletterer und für jedes Stück Holz.</p>
      </div>
    </div>

    <div class="decon-stage">
      <div class="dc-media plate">
        ${img({
          master: "M-01", slot: "crop-kletterer", widths: [640, 960],
          sizes: "(min-width: 64rem) 55vw, 100vw",
          alt: "Ausschnitt: der Kletterer in Signalkleidung arbeitet mit der Säge am bereits entasteten Stamm.",
        })}
        <span class="credit">Ausschnitt aus der Einsatzaufnahme</span>
      </div>
      <div class="dc-copy">
        <span class="st-key">Der Abtrag</span>
        <h3>Krone weg, Stamm in Sektionen</h3>
        <p class="muted">Auf der Aufnahme ist es sichtbar: Die Kronen sind bereits abgetragen, die Stämme stehen kahl. Jetzt geht es Sektion für Sektion abwärts — jedes Stück kontrolliert abgelassen.</p>
      </div>
    </div>
  </div>
</section>

<section class="section dark" aria-labelledby="kontext-h">
  <div class="shell stack-3">
    ${protocol('02 — Blick von oben', { id: "kontext-h" })}
    <div class="evidence mt-4">
      <div class="ev-media plate">
        ${img({
          master: "M-02", slot: "luft", widths: [640, 960, 1440],
          sizes: "(min-width: 64rem) 55vw, 100vw",
          alt: "Zweite Luftaufnahme desselben Einsatzes: Kletterer zwischen den Stämmen, darunter Grundstück, Hecke und geparkte Autos.",
        })}
        <span class="credit">Einsatzdokumentation · zweite Perspektive</span>
      </div>
      <div class="ev-copy">
        <h2 class="title">Warum die Drohne mitfliegt</h2>
        <p class="prose muted">Die Luftperspektive ist Arbeitsmittel: Sie zeigt Fallbereiche, Seilwege und Distanzen, die vom Boden schwer einzuschätzen sind — und dokumentiert den Zustand vor und nach dem Einsatz.</p>
        <div class="ev-beats">
          <div class="ev-beat"><span class="b-key">Einsatz</span><span class="b-val">Rückbau zweier Nadelbäume in Wohnlage, Winter.</span></div>
          <div class="ev-beat"><span class="b-key">Methode</span><span class="b-val">Seilklettertechnik, Abtrag in Sektionen.</span></div>
          <div class="ev-beat"><span class="b-key">Region</span><span class="b-val">Einsatzgebiet Zollernalb — genaue Orte nennen wir ohne Freigabe der Eigentümer nicht.</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section shell" aria-labelledby="p-cta-h">
  <div class="action">
    <p class="protocol" id="p-cta-h">Ähnliche Situation?</p>
    <h2 class="monument" style="font-size:clamp(1.9rem,5vw,4.4rem)">Wir sehen uns das an.</h2>
    <div class="action-ways">
      <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
      <a class="cta" href="/kontakt/">Anfrage stellen</a>
      <a class="textlink" href="/spezialfaellung/">Mehr zur Spezialfällung →</a>
    </div>
  </div>
</section>`;

  return {
    route: "projekte/winterfaellung-am-wohnhaus",
    html: pageShell({
      title: "Einsatz: Winterfällung am Wohnhaus | FS Baumservice",
      desc: "Dokumentierter Einsatz: Rückbau zweier Nadelbäume unmittelbar am Wohnhaus — Seilklettertechnik, Abtrag in Sektionen, Winter im Zollernalbkreis.",
      path: "/projekte/winterfaellung-am-wohnhaus/",
      current: "/projekte/winterfaellung-am-wohnhaus/",
      body,
    }),
  };
}
