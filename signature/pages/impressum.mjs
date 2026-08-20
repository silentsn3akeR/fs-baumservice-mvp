import { pageShell, protocol, FS } from "../lib.mjs";

// Rechtstexte: historische Quelle (data-legal.js der Alt-Site).
// Release-Stand: C-004 (Telefon) und C-014 (USt-ID) sind vom Inhaber entschieden.
// Kanonische Nummer ist FS.phoneDisplay; eine USt-IdNr. besteht nicht, daher
// entfaellt der Abschnitt vollstaendig (kein Platzhalter, keine Statusaussage).
export async function render() {
  const body = `
<section class="section shell" style="padding-top: var(--space-5); max-width: 60rem">
  ${protocol('Impressum')}
  <div class="prose stack-3 mt-4">
    <h1 class="title">Impressum</h1>
    <h2 style="font-size:1.1rem" class="title">Angaben gemäß § 5 TMG</h2>
    <p>Florian Stuck Baumservice<br>Balinger Str. 59<br>72406 Bisingen-Steinhofen<br>Deutschland</p>
    <h2 style="font-size:1.1rem" class="title">Kontakt</h2>
    <p>Telefon: <a href="${FS.phoneHref}">${FS.phoneDisplay}</a><br>
    E-Mail: <a href="mailto:${FS.email}">${FS.email}</a></p>
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
