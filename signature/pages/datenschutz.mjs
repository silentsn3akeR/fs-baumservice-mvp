import { pageShell, protocol } from "../lib.mjs";

// Rechtstexte: historische Quelle, bereinigt um nicht mehr zutreffende Dienste.
// Alt-Text nannte ein Elfsight/Instagram-Widget — der Neubau bindet KEINE
// Dritt-Widgets ein; der Passus wurde daher entfernt (Legal muss Implementierung
// entsprechen). Release-Stand: Schriften werden lokal ausgeliefert (self-hosted,
// SIL OFL) — kein Google-Fonts-CDN, keine Drittanbieter-Verbindung zur Laufzeit.
export async function render() {
  const body = `
<section class="section shell" style="padding-top: var(--space-5); max-width: 60rem">
  ${protocol('Datenschutz')}
  <div class="prose stack-3 mt-4">
    <h1 class="title">Datenschutz&shy;erklärung</h1>
    <h2 style="font-size:1.1rem" class="title">1. Datenschutz auf einen Blick</h2>
    <p>Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
    <h2 style="font-size:1.1rem" class="title">2. Datenerfassung auf dieser Website</h2>
    <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber; die Kontaktdaten stehen im <a href="/impressum/">Impressum</a>.</p>
    <p>Der Provider erhebt und speichert automatisch Server-Log-Dateien (Browsertyp und -version, Betriebssystem, Referrer-URL, Hostname, Uhrzeit, IP-Adresse). Eine Zusammenführung mit anderen Datenquellen findet nicht statt.</p>
    <h2 style="font-size:1.1rem" class="title">3. Anfrage-Formular</h2>
    <p>Das Anfrage-Formular dieser Website speichert keine Daten auf dem Server: Beim Absenden öffnet sich Ihr eigenes E-Mail-Programm mit der vorbereiteten Nachricht. Übermittelt wird nur, was Sie selbst per E-Mail senden.</p>
    <h2 style="font-size:1.1rem" class="title">4. Schriften</h2>
    <p>Die verwendeten Schriften (Archivo, IBM Plex Mono) werden lokal von dieser Website ausgeliefert. Es besteht dabei keine Verbindung zu Servern Dritter, und es wird keine IP-Adresse an einen Schriftanbieter übertragen.</p>
  </div>
</section>`;
  return {
    route: "datenschutz",
    html: pageShell({
      title: "Datenschutz | FS Baumservice",
      desc: "Datenschutzerklärung von Florian Stuck Baumservice.",
      path: "/datenschutz/",
      current: "/datenschutz/",
      headerOnPaper: true,
      body,
    }),
  };
}
