import { pageShell, protocol, FS } from "../lib.mjs";

// Sekundaerleistung: ruhig-kompakt, bewusst ohne Fake-Medien (kein echtes Foto).
// PREMIUM_PROMINENCE=LIMITED, RELEASE_DECISION=OWNER_CONFIRM (Prioritaet).
export async function render() {
  const body = `
<section class="section shell" style="padding-top: var(--space-5); max-width: 70rem">
  ${protocol('Heckenschnitt &amp; Grundstückspflege — <span class="leaf">Ergänzungsleistung</span>')}
  <div class="stack-3 mt-4" style="max-width: 46rem">
    <h1 class="title" style="font-size:clamp(1.8rem,4vw,3rem)">Klare Kanten, gesunde Pflanzen.</h1>
    <p class="lead muted">Form- und Rückschnitt für Hecken, Pflege von Grundstücksrändern — ruhig, ordentlich und mit Blick auf die Pflanzengesundheit. Das Schnittgut nehmen wir auf Wunsch gleich mit.</p>
    <div class="ev-beats">
      <div class="ev-beat"><span class="b-key">Umfang</span><span class="b-val">Formschnitt, Rückschnitt, Grundstücksränder — einmalig oder regelmäßig.</span></div>
      <div class="ev-beat"><span class="b-key">Zeitpunkt</span><span class="b-val">Je nach Pflanzenart und gesetzlichen Vorgaben — vor größeren Rückschnitten kurz abstimmen.</span></div>
      <div class="ev-beat"><span class="b-key">Übergabe</span><span class="b-val">Saubere Kanten, geräumter Arbeitsbereich.</span></div>
    </div>
    <div class="action-ways">
      <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
      <a class="cta" href="/kontakt/">Anfrage stellen</a>
      <a class="textlink" href="/leistungen/">Alle Leistungen →</a>
    </div>
  </div>
</section>`;

  return {
    route: "leistungen/heckenschnitt",
    html: pageShell({
      title: "Heckenschnitt und Grundstückspflege rund um Bisingen | FS Baumservice",
      desc: "Sauberer Heckenschnitt und gepflegte Grundstücksbereiche für Privatkunden und Gewerbe im Zollernalbkreis — FS Baumservice.",
      path: "/leistungen/heckenschnitt/", current: "/leistungen/", headerOnPaper: true, body,
    }),
  };
}
