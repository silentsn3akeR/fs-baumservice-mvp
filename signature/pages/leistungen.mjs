import { pageShell, img, protocol, FS } from "../lib.mjs";

const row = (href, name, desc, meta, chip) => `
    <a class="register-row" role="listitem" href="${href}">
      <span class="reg-name">${name}${chip ? ` <span class="chip">${chip}</span>` : ""}</span>
      <span class="reg-desc">${desc}</span>
      <span class="reg-meta">${meta}</span>
      <span class="reg-arrow" aria-hidden="true">→</span>
    </a>`;

export async function render() {
  const body = `
<section class="section shell" style="padding-top: var(--space-5)">
  ${protocol('Leistungen — <span class="leaf">nach Situation, nicht nach Katalog</span>')}
  <div class="grid grid--12 mt-4">
    <h1 class="monument" style="grid-column: span 12; font-size:clamp(2rem,5.5vw,4.6rem); max-width:14ch">Erst die Lage, dann das Werkzeug.</h1>
  </div>

  <div class="feature-split mt-4">
    <a class="plate" href="/spezialfaellung/" aria-label="Zur Spezialfällung">
      ${img({
        master: "M-03", slot: "monument", widths: [640, 960, 1440],
        sizes: "(min-width: 64rem) 58vw, 100vw", ratio: "3 / 2",
        alt: "Teleskopkran neben einem Wohnhausdach in der Krone eines großen Laubbaums.",
      })}
    </a>
    <div class="feature-copy">
      <p class="protocol">Schwerpunkt</p>
      <h2 class="title">Spezial&shy;fällung</h2>
      <p class="prose muted">Bäume an Gebäuden, über Dächern, ohne Maschinenzugang — der Kern unserer Arbeit.</p>
      <a class="textlink" href="/spezialfaellung/">Zur Spezialfällung →</a>
    </div>
  </div>

  <div class="register" role="list">
    ${row("/leistungen/baumfaellung/", "Baumfällung", "Kontrollierte Fällung, wenn ein Baum weichen muss — mit Beratung zu Genehmigungen.", "Abtrag in Sektionen")}
    ${row("/leistungen/baumpflege/", "Baumpflege", "Kronenpflege und Totholzentfernung — geschnitten wird, was dem Baum nützt.", "Erhalt vor Eingriff")}
    ${row("/leistungen/wurzelstockfraesen/", "Wurzelstockfräsen", "Stümpfe raus, Fläche nutzbar — auch bei schmalen Zugängen.", "Durchfahrt ab ca. 90 cm")}
    ${row("/leistungen/heckenschnitt/", "Heckenschnitt & Grundstück", "Form- und Rückschnitt, saubere Kanten, Schnittgut geräumt.", "Ergänzungsleistung")}
    ${row("/leistungen/rollrasen/", "Rollrasen", "Vorbereitung und Verlegung — im Anschluss an Fällung und Fräsung.", "Ergänzungsleistung")}
  </div>
</section>

<section class="section dark">
  <div class="shell action">
    <p class="protocol">Unklar, was der Baum braucht?</p>
    <h2 class="monument" style="font-size:clamp(1.8rem,4.5vw,3.8rem)">Die Besichtigung klärt es.</h2>
    <div class="action-ways">
      <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
      <a class="cta cta--solid" href="/kontakt/">Anfrage stellen</a>
    </div>
  </div>
</section>`;

  return {
    route: "leistungen",
    html: pageShell({
      title: "Leistungen — Baumfällung, Baumpflege, Wurzelstockfräsen | FS Baumservice",
      desc: "Alle Leistungen von FS Baumservice im Zollernalbkreis: Spezialfällung, Baumfällung, Baumpflege, Wurzelstockfräsen, Heckenschnitt und Rollrasen.",
      path: "/leistungen/", current: "/leistungen/", headerOnPaper: true, body,
    }),
  };
}
