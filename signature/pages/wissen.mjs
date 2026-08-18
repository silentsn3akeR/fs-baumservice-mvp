import { pageShell, protocol, FS } from "../lib.mjs";

// Ruhige Wissens-Migration (Alt-Ratgeber + neue main-Inhalte), gehedged (C-020):
// keine absoluten Rechts-/Gesundheitszusagen, keine Preise.
const block = (title, text, link) => `
    <div class="tech-row">
      <span class="t-name">${title}</span>
      <span class="t-desc">${text}${link ? ` <a class="textlink" href="${link[0]}">${link[1]}</a>` : ""}</span>
    </div>`;

export async function render() {
  const body = `
<section class="section shell" style="padding-top: var(--space-5); max-width: 76rem">
  ${protocol('Wissen — <span class="leaf">allgemeine Orientierung, keine Einzelfallprüfung</span>')}
  <h1 class="title mt-4" style="font-size:clamp(1.8rem,4vw,3rem)">Was Baumbesitzer wissen sollten.</h1>
  <p class="lead muted mt-4" style="max-width:44rem">Kompakt statt Ratgeber-Wüste: die Punkte, die in Gesprächen am häufigsten auftauchen. Verbindlich wird es erst bei der Besichtigung — jeder Baum ist ein Einzelfall.</p>

  <div class="mt-4">
    ${block("Fällung &amp; Genehmigung", "Ob ein Baum gefällt werden darf, regeln örtliche Satzungen und Schutzzeiten — das variiert je nach Gemeinde. Vor der Fällung klären, nicht danach. Wir beraten dazu oder übernehmen das Verfahren.", ["/leistungen/baumfaellung/", "Zur Baumfällung →"])}
    ${block("Kostenfaktoren", "Höhe, Standort, Zugänglichkeit, Technikbedarf und Entsorgung bestimmen den Aufwand — nicht die Baumart allein. Deshalb gibt es seriöse Preise erst nach Besichtigung.", ["/kontakt/", "Anfrage stellen →"])}
    ${block("Saison", "Grobe Orientierung: Kronen- und Formschnitt eher Frühjahr, Totholz ganzjährig, große Rückschnitte außerhalb der Vogelschutzzeit (typisch März–September geschützt), Fällungen oft im laublosen Winterhalbjahr. Ausnahmen sind möglich — etwa bei Gefahr im Verzug.", null)}
    ${block("Schädlinge &amp; Baumgesundheit", "Warnzeichen: Gespinstnester (Eichenprozessionsspinner — Brennhaare reizen Haut und Atemwege, Nester nicht selbst entfernen), braune Minen in Kastanienblättern, Kronenverlichtung und Trockenrisse. Bei Verdacht: begutachten lassen, nicht selbst hantieren.", ["/leistungen/baumpflege/", "Zur Baumpflege →"])}
    ${block("Wurzelstock", "Ein verbliebener Stumpf treibt teils neu aus, zieht Pilze an und blockiert die Fläche. Fräsen macht die Fläche wieder nutzbar — auch Jahre nach der Fällung.", ["/leistungen/wurzelstockfraesen/", "Zum Wurzelstockfräsen →"])}
  </div>

  <p class="flow-note mt-4">Hinweis: Allgemeine Informationen aus der Praxis — keine Rechtsberatung, keine gesundheitliche Beratung. Verbindliche Aussagen erst nach Prüfung vor Ort.</p>

  <div class="action-ways mt-4">
    <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
    <a class="cta" href="/kontakt/">Situation schildern</a>
  </div>
</section>`;

  return {
    route: "wissen",
    html: pageShell({
      title: "Wissen: Baumfällung, Genehmigung, Saison, Schädlinge | FS Baumservice",
      desc: "Kompaktes Praxiswissen für Baumbesitzer im Zollernalbkreis: Genehmigungen, Kostenfaktoren, Saison, Schädlinge und Wurzelstock — von FS Baumservice.",
      path: "/wissen/", current: "/wissen/", headerOnPaper: true, body,
    }),
  };
}
