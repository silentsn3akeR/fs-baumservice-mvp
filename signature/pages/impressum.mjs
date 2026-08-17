import { pageShell, protocol } from "../lib.mjs";

// Rechtstexte: historische Quelle (data-legal.js der Alt-Site). Claim-Status:
// Telefonnummer im Alt-Impressum (0173 346 3959) weicht vom Rest der Site ab
// (C-004), USt-ID fehlt (C-014). Beides bleibt hier sichtbar offen markiert.
export async function render() {
  const body = `
<section class="section shell" style="padding-top: var(--space-5); max-width: 60rem">
  ${protocol('Impressum — <span class="leaf">in Prüfung</span>')}
  <div class="prose stack-3 mt-4">
    <h1 class="title">Impressum</h1>
    <p class="flow-note">Preview-Hinweis: Diese Angaben stammen aus der bisherigen Website und werden vor Veröffentlichung mit dem Betrieb verifiziert (Telefonnummer und USt-ID sind als offene Punkte markiert).</p>
    <h2 style="font-size:1.1rem" class="title">Angaben gemäß § 5 TMG</h2>
    <p>Florian Stuck Baumservice<br>Balinger Str. 59<br>72406 Bisingen-Steinhofen<br>Deutschland</p>
    <h2 style="font-size:1.1rem" class="title">Kontakt</h2>
    <p>Telefon: 0173 346 3959 <span class="chip">abweichende Angabe — wird verifiziert</span><br>
    E-Mail: <a href="mailto:info@fs-baumservice.de">info@fs-baumservice.de</a></p>
    <h2 style="font-size:1.1rem" class="title">Umsatzsteuer-ID</h2>
    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: <span class="chip">wird nachgereicht</span></p>
    <h2 style="font-size:1.1rem" class="title">EU-Streitschlichtung</h2>
    <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" rel="noopener">https://ec.europa.eu/consumers/odr/</a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
    <h2 style="font-size:1.1rem" class="title">Verbraucherstreitbeilegung</h2>
    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
  </div>
</section>`;
  return {
    route: "impressum",
    html: pageShell({
      title: "Impressum | FS Baumservice",
      desc: "Impressum von Florian Stuck Baumservice, Bisingen-Steinhofen.",
      path: "/impressum/",
      current: "/impressum/",
      headerOnPaper: true,
      body,
    }),
  };
}
