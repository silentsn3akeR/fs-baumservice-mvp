import { pageShell, img, protocol, FS } from "../lib.mjs";

// Charakter: QUIET PRECISION — leise Flaeche, kein Drama, kein Motion.
export async function render() {
  const body = `
<section class="silence" aria-label="Kletterer-Silhouette in großer Baumkrone" style="min-height:56svh">
  ${img({
    master: "M-09", slot: "silence", widths: [640, 960, 1600],
    sizes: "100vw", eager: true,
    alt: "Silhouette eines Baumkletterers hoch in einer weit verzweigten, kahlen Krone vor bedecktem Himmel.",
  })}
  <p class="protocol">Baumpflege · Zollernalb</p>
</section>

<section class="section shell">
  <div class="grid grid--12">
    <div style="grid-column: span 7" class="stack-3">
      ${protocol('Baumpflege — <span class="leaf">Erhalt vor Eingriff</span>')}
      <h1 class="title" style="font-size:clamp(1.8rem,4vw,3rem)">Geschnitten wird, was dem Baum nützt.</h1>
      <p class="lead muted">Gute Baumpflege betrachtet nicht einzelne Äste, sondern den ganzen Baum: Standort, Krone, Umfeld. Manchmal ist die beste Empfehlung, den Baum in Ruhe zu lassen — auch das sagen wir.</p>
      <p class="prose muted">Ausgeführt wird nach ZTV-Baumpflege und gültigen Regelwerken, schonend per Seilklettertechnik oder Hubgerät. Schnittgut wird sauber geräumt oder entsorgt.</p>
    </div>
    <div style="grid-column: span 5" class="stack-2" role="list" aria-label="Maßnahmen">
      <p class="protocol protocol--end">Maßnahmen</p>
      <div class="tech-row" role="listitem"><span class="t-name">Kronenpflege</span><span class="t-desc">Fehlentwicklungen korrigieren, Vitalität und Form erhalten.</span></div>
      <div class="tech-row" role="listitem"><span class="t-name">Totholzentfernung</span><span class="t-desc">Sicherheit an Wegen, Gärten und Grundstücken.</span></div>
      <div class="tech-row" role="listitem"><span class="t-name">Begutachtung</span><span class="t-desc">Erst schauen, dann schneiden — Empfehlung statt Pauschalschnitt.</span></div>
    </div>
  </div>
</section>

<section class="section shell" style="padding-top:0" aria-labelledby="bp-faq">
  ${protocol('Häufige Fragen', { id: "bp-faq", h: 2 })}
  <div class="mt-4" style="max-width:46rem; display:grid; gap:var(--space-3)">
    <div class="stack-2"><h3 class="title" style="font-size:1.05rem">Wie oft sollte ein Baum gepflegt werden?</h3><p class="muted" style="font-size:var(--small)">Das hängt von Art, Standort, Alter und Ziel ab. Eine Besichtigung zeigt, ob ein Schnitt sinnvoll ist — oder der Baum besser in Ruhe gelassen wird.</p></div>
    <div class="stack-2"><h3 class="title" style="font-size:1.05rem">Kann ich Fotos für eine erste Einschätzung senden?</h3><p class="muted" style="font-size:var(--small)">Ja, Fotos helfen. Für eine belastbare Einschätzung ist meist trotzdem ein Blick vor Ort sinnvoll.</p></div>
  </div>
  <div class="action-ways mt-4">
    <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
    <a class="cta" href="/kontakt/">Baum einschätzen lassen</a>
  </div>
</section>`;

  return {
    route: "leistungen/baumpflege",
    html: pageShell({
      title: "Baumpflege in der Region Zollernalb | FS Baumservice",
      desc: "Kronenpflege und Totholzentfernung nach ZTV-Baumpflege: schonend, mit klarer Empfehlung statt Pauschalschnitt — FS Baumservice, Bisingen.",
      path: "/leistungen/baumpflege/", current: "/leistungen/", headerOnPaper: true, body,
    }),
  };
}
