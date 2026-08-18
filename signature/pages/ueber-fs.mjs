import { pageShell, img, protocol, FS } from "../lib.mjs";

// Human Authority: reale Person, echte Medien, keine Values-Wall, keine Badges,
// keine erfundene Gruenderstory. Qualifikation nur gehedged (C-008).
export async function render() {
  const body = `
<section class="section shell" style="padding-top: var(--space-5)">
  ${protocol('Über FS — <span class="leaf">inhabergeführt</span>')}
  <div class="human mt-4">
    <div class="hu-plate plate">
      ${img({
        master: "M-01", slot: "crop-kletterer", widths: [640, 960],
        sizes: "(min-width: 64rem) 30vw, 100vw", eager: true,
        alt: "Kletterer in Signalkleidung arbeitet gesichert mit der Säge am entasteten Stamm, unter ihm das verschneite Grundstück.",
      })}
      <span class="credit">Eigener Einsatz · Winter</span>
    </div>
    <div class="hu-copy">
      <h1 class="monument" style="font-size:clamp(1.8rem,5vw,4.2rem); overflow-wrap:break-word">Florian Stuck.<br>Baumservice ist Vertrauens&shy;sache.</h1>
      <p class="lead muted">Wer Bäume an Häusern fällt, arbeitet dort, wo Fehler teuer werden. Deshalb gilt hier ein einfacher Grundsatz: erst verstehen, dann klettern. Jede Säge folgt einem Plan, der vorher am Boden gemacht wurde.</p>
    </div>
  </div>
</section>

<section class="section dark" aria-labelledby="uf-arbeit">
  <div class="shell stack-3">
    ${protocol('Wie wir arbeiten', { id: "uf-arbeit", h: 2 })}
    <div class="evidence mt-4">
      <div class="ev-media plate">
        ${img({
          master: "M-04", slot: "scale", widths: [640, 960, 1440],
          sizes: "(min-width: 64rem) 55vw, 100vw",
          alt: "Weite Aufnahme: hoher, kahler Baum, klein in der Krone ein Kletterer.",
        })}
        <span class="credit">Einsatzdokumentation</span>
      </div>
      <div class="ev-copy">
        <div class="ev-beats">
          <div class="ev-beat"><span class="b-key">Spezialisiert</span><span class="b-val">Auf die schwierigen Fälle: kein Platz für große Maschinen, Dächer unter der Krone, sturmgeschädigte Bäume.</span></div>
          <div class="ev-beat"><span class="b-key">Qualifiziert</span><span class="b-val">Für Fällarbeiten qualifiziert und ausgerüstet — laut bisheriger Website nach Berufsgenossenschaft Gartenbau.*</span></div>
          <div class="ev-beat"><span class="b-key">Regelbasiert</span><span class="b-val">Baumpflege nach ZTV-Baumpflege und gültigen Regelwerken.*</span></div>
          <div class="ev-beat"><span class="b-key">Regional</span><span class="b-val">${FS.region} — kurze Wege, ein Ansprechpartner.</span></div>
          <div class="ev-beat"><span class="b-key">Sauber</span><span class="b-val">Jedes Grundstück wird so verlassen, wie es vorgefunden wurde.</span></div>
        </div>
        <p class="muted" style="font-size:.78rem">* Angaben aus der bisherigen Website; werden zur Veröffentlichung mit dem Betrieb verifiziert.</p>
      </div>
    </div>
  </div>
</section>

<section class="section shell" aria-labelledby="uf-technik">
  ${protocol('Technik — ehrlich eingeordnet', { id: "uf-technik", h: 2 })}
  <div class="mt-4">
    <div class="tech-row"><span class="t-name">Seilklettertechnik</span><span class="t-desc">Der Kern: baumschonender Zugang ohne schweres Gerät im Garten.</span><span class="chip chip--leaf">Kernkompetenz</span></div>
    <div class="tech-row"><span class="t-name">Hubarbeitsbühne</span><span class="t-desc">Wo Zufahrt und Platz es erlauben.</span><span class="chip">nach Situation</span></div>
    <div class="tech-row"><span class="t-name">Autokran</span><span class="t-desc">Für ganze Kronenteile — im Verbund mit regionalen Kranpartnern.</span><span class="chip">Partnertechnik</span></div>
    <div class="tech-row"><span class="t-name">Wurzelfräse</span><span class="t-desc">Für Stümpfe nach der Fällung, Durchfahrt ab ca. 90 cm.*</span><span class="chip">eigene Technik*</span></div>
    <div class="tech-row"><span class="t-name">Ferngesteuerter Hangmulcher</span><span class="t-desc">Einsatz an Steilhängen dokumentiert; Ausstattung je nach Projekt.</span><span class="chip">projektbezogen</span></div>
  </div>
</section>

<section class="section dark">
  <div class="shell action">
    <p class="protocol">Direkt zum Ansprechpartner</p>
    <h2 class="monument" style="font-size:clamp(1.8rem,4.5vw,3.8rem)">Ein Anruf klärt mehr als zehn Seiten.</h2>
    <div class="action-ways">
      <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
      <a class="cta cta--solid" href="/kontakt/">Anfrage stellen</a>
      <a class="textlink" href="/projekte/">Einsätze ansehen →</a>
    </div>
  </div>
</section>`;

  return {
    route: "ueber-fs",
    html: pageShell({
      title: "Über FS — Florian Stuck Baumservice, Bisingen | FS Baumservice",
      desc: "Inhabergeführter Baumservice im Zollernalbkreis: Florian Stuck, spezialisiert auf schwierige Fällungen mit Seilklettertechnik. Erst verstehen, dann klettern.",
      path: "/ueber-fs/", current: "/ueber-fs/", headerOnPaper: true, body,
    }),
  };
}
