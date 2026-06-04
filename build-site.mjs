import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "http://fs-baumservice.de";
const deployBasePath = (process.env.DEPLOY_BASE_PATH || "").replace(/\/$/, "");
const deployBaseUrl = (process.env.DEPLOY_BASE_URL || baseUrl).replace(/\/$/, "");
const contact = {
  name: "FS Baumservice",
  legalName: "Florian Stuck Baumservice",
  owner: "Florian Stuck",
  street: "Balinger Str. 59",
  postalCode: "72406",
  locality: "Bisingen-Steinhofen",
  phone: "+49-172-7256462",
  phoneDisplay: "0172 7256462",
  email: "info@fs-baumservice.de",
  instagram: "https://www.instagram.com/fs_baumservice/",
  facebook: "https://www.facebook.com/FS.Baumservice",
};

const nav = [
  ["Start", "/"],
  ["Leistungen", "/leistungen/"],
  ["Angebot", "/angebot/"],
  ["Referenzen", "/referenzen/"],
  ["Über uns", "/ueber-uns/"],
  ["Kontakt", "/kontakt/"],
];

const services = [
  {
    slug: "baumfaellung",
    name: "Baumfällung",
    title: "Baumfällung in Bisingen, Balingen und Umgebung",
    description:
      "Sichere Baumfällung auch auf engem Grundstück: FS Baumservice arbeitet mit Seilklettertechnik, Hubarbeitsgeräten und bei Bedarf Kranunterstützung.",
    image: "baumfaellung-bisingen-seilklettertechnik.jpg",
    intro:
      "Wenn ein Baum krank, instabil, zu groß oder am falschen Standort steht, zählt eine ruhige Planung. FS Baumservice unterstützt private und gewerbliche Kunden bei sicheren Fällarbeiten in Bisingen, Balingen, Geislingen, Hechingen und im Zollernalbkreis.",
    uses: ["beengte Grundstücke", "Bäume nahe an Gebäuden", "schwer zugängliche Standorte", "störende oder nicht mehr standsichere Bäume"],
    process: ["Besichtigung und Einschätzung vor Ort", "Abstimmung von Zugang, Sicherung und Ablauf", "stückweises Abtragen per Seilklettertechnik oder geeigneter Technik", "auf Wunsch umweltgerechte Entsorgung von Schnittgut und Stammholz"],
    benefits: ["kontrolliertes Arbeiten", "Schutz von Gebäuden und Bepflanzung", "saubere Abwicklung", "Beratung zu eventuell notwendigen Genehmigungen"],
    faq: [
      ["Wann muss ein Baum gefällt werden?", "Eine Fällung kann nötig werden, wenn ein Baum nicht mehr standsicher ist, Schäden verursacht, Baumaßnahmen blockiert oder aus Sicherheitsgründen entfernt werden muss. Die Entscheidung sollte vor Ort geprüft werden."],
      ["Kann ein Baum auch auf engem Grundstück gefällt werden?", "Ja, je nach Situation kann ein Baum stückweise abgetragen werden. FS Baumservice nutzt dafür unter anderem Seilklettertechnik, Hubarbeitsgeräte oder bei Bedarf weitere Unterstützung."],
      ["Was passiert mit Holz und Schnittgut?", "Die zeitnahe und umweltgerechte Entsorgung gehört zum angebotenen Leistungsumfang und wird vorab abgestimmt."],
    ],
  },
  {
    slug: "baumpflege",
    name: "Baumpflege",
    title: "Baumpflege vom Baumservice in der Region Zollernalb",
    description:
      "Baumpflege für Vitalität, Sicherheit und gesunde Kronen im Raum Bisingen, Balingen, Geislingen und Hechingen.",
    image: "baumpflege-zollernalb-arbeitseinsatz.jpg",
    intro:
      "Gute Baumpflege betrachtet nicht nur einzelne Äste, sondern den ganzen Baum mit Standort, Krone und Umfeld. FS Baumservice plant sinnvolle Pflegemaßnahmen und führt sie schonend aus.",
    uses: ["Kronenpflege", "Totholzentfernung", "Erhalt von Vitalität und Form", "Pflege von Bäumen in Gärten, an Wegen und auf Grundstücken"],
    process: ["Baum und Umfeld prüfen", "Maßnahmen mit dem Eigentümer besprechen", "Arbeiten per Seilklettertechnik oder Hubgerät ausführen", "Schnittgut sauber räumen oder entsorgen"],
    benefits: ["schonendes Vorgehen", "Arbeiten nach ZTV-Baumpflege und gültigen Regelwerken", "klare Empfehlung statt pauschaler Schnitt", "regionale Betreuung"],
    faq: [
      ["Wie oft sollte ein Baum gepflegt werden?", "Das hängt von Baumart, Standort, Alter und Ziel ab. Eine Besichtigung zeigt, ob ein Schnitt sinnvoll ist oder der Baum besser in Ruhe gelassen wird."],
      ["Arbeitet FS Baumservice nach anerkannten Regeln?", "Die bestehende Leistungsseite nennt Arbeiten nach ZTV-Baumpflege und gültigen Regelwerken. Diese Aussage wurde aus der aktuellen Website übernommen."],
      ["Kann ich Fotos für eine erste Einschätzung senden?", "Ja, Fotos können helfen. Für eine belastbare Einschätzung ist meist trotzdem ein Blick vor Ort sinnvoll."],
    ],
  },
  {
    slug: "heckenschnitt",
    name: "Heckenschnitt",
    title: "Heckenschnitt und Grundstückspflege rund um Bisingen",
    description:
      "Sauberer Heckenschnitt und gepflegte Grundstücksbereiche für Privatkunden und gewerbliche Flächen im Zollernalbkreis.",
    image: "heckenschnitt-grundstueckspflege.jpg",
    intro:
      "Ein sauberer Heckenschnitt bringt Struktur in Grundstücke, Wege und Gartenbereiche. FS Baumservice übernimmt Schnitt- und Pflegearbeiten ruhig, ordentlich und mit Blick auf Pflanzengesundheit.",
    uses: ["Formschnitt und Rückschnitt", "Pflege von Grundstücksrändern", "Schnittgut räumen", "regelmäßige oder einmalige Pflegearbeiten"],
    process: ["Umfang und gewünschtes Ergebnis klären", "Pflanzenbestand und Zugänglichkeit prüfen", "Schnitt fachgerecht ausführen", "Arbeitsbereich sauber verlassen"],
    benefits: ["gepflegtes Erscheinungsbild", "klare Grundstückskanten", "saubere Ausführung", "direkte Abstimmung vor Ort"],
    faq: [
      ["Bietet FS Baumservice auch Heckenschnitt an?", "Ja, Heckenschnitt und Grundstückspflege sind Teil der neuen Leistungsstruktur."],
      ["Wird Schnittgut mitgenommen?", "Die Entsorgung wird nach Aufwand und Wunsch abgestimmt. Die aktuelle Website nennt eine umweltgerechte Entsorgung von Schnittgut als Service."],
      ["Wann ist der richtige Zeitpunkt für Heckenschnitt?", "Der passende Zeitpunkt hängt von Pflanzenart, Umfang und gesetzlichen Vorgaben ab. Vor größeren Rückschnitten sollte das kurz abgestimmt werden."],
    ],
  },
  {
    slug: "wurzelstockfraesen",
    name: "Wurzelstockfräsen",
    title: "Wurzelstockfräsen nach Baumfällungen",
    description:
      "Wurzelstock entfernen lassen: FS Baumservice fräst störende Baumstümpfe im Raum Bisingen, Balingen und Geislingen.",
    image: "wurzelstockfraesen-baumservice.jpg",
    intro:
      "Nach einer Baumfällung bleibt oft ein störender Wurzelstock zurück. Mit der passenden Frästechnik wird die Fläche wieder nutzbar, etwa für Rasen, Bepflanzung oder neue Gestaltung.",
    uses: ["Baumstümpfe nach Fällungen", "Vorbereitung für Rollrasen oder Beete", "störende Wurzeln in Gartenflächen", "enge Zugänge ab etwa 90 cm laut aktueller Leistungsseite"],
    process: ["Zugang und Wurzelstock prüfen", "Frästiefe und Arbeitsbereich festlegen", "Wurzelstock ausfräsen", "Fläche für die weitere Nutzung vorbereiten"],
    benefits: ["eigene Wurzelfräse laut aktueller Website", "wieder nutzbare Fläche", "auch bei schmalen Durchfahrten möglich", "saubere Ergänzung zur Baumfällung"],
    faq: [
      ["Was passiert mit dem Wurzelstock nach der Fällung?", "Er kann ausgefräst werden, damit die Fläche wieder frei für Rasen, Bepflanzung oder andere Gestaltung wird."],
      ["Wie breit muss der Zugang sein?", "Die aktuelle Website nennt eine Durchfahrtsbreite von nur 90 cm für die Wurzelfräse."],
      ["Muss der Baum vorher von FS Baumservice gefällt worden sein?", "Nein. Auch bestehende Baumstümpfe können nach Prüfung vor Ort gefräst werden."],
    ],
  },
  {
    slug: "rollrasen",
    name: "Rollrasen",
    title: "Rollrasen verlegen lassen im Raum Bisingen und Balingen",
    description:
      "Rollrasen und Rasenvorbereitung für schnell nutzbare Grünflächen in Bisingen, Balingen, Geislingen und Umgebung.",
    image: "rollrasen-gruenflaeche-fs-baumservice.svg",
    intro:
      "Rollrasen ist sinnvoll, wenn eine Fläche schnell wieder gepflegt und nutzbar sein soll. FS Baumservice unterstützt bei Vorbereitung, Abstimmung und Verlegung im regionalen Einsatzgebiet.",
    uses: ["neue Gartenflächen", "Flächen nach Baumfällung oder Wurzelstockfräsen", "pflegeleichte Grünbereiche", "private Grundstücke und Außenbereiche"],
    process: ["Fläche und Boden beurteilen", "Vorbereitung und Planum abstimmen", "Rollrasen fachgerecht verlegen", "Hinweise zur Anwuchsphase geben"],
    benefits: ["schnelles Ergebnis", "kombinierbar mit Baum- und Grundstückspflege", "regionale Umsetzung", "saubere Übergabe"],
    faq: [
      ["Wann ist Rollrasen sinnvoll?", "Wenn eine Fläche schnell grün und nutzbar werden soll oder nach Arbeiten am Grundstück neu angelegt wird."],
      ["Kann Rollrasen nach einer Wurzelstockfräsung verlegt werden?", "Ja, nach passender Vorbereitung kann die Fläche wieder für Rasen genutzt werden."],
      ["In welchen Orten ist FS Baumservice unterwegs?", "Der Fokus liegt auf Bisingen, Balingen, Geislingen, Hechingen und dem Zollernalbkreis."],
    ],
  },
];

const pages = [];
const areaServed = ["Bisingen", "Bisingen-Steinhofen", "Balingen", "Geislingen", "Hechingen", "Zollernalbkreis"];
const verifiedFacts = [
  ["Unternehmen", `${contact.name} / ${contact.legalName}`],
  ["Inhaber", contact.owner],
  ["Adresse", `${contact.street}, ${contact.postalCode} ${contact.locality}`],
  ["Telefon", contact.phoneDisplay],
  ["E-Mail", contact.email],
  ["Einsatzgebiet", areaServed.join(", ")],
  ["Leistungen", services.map((s) => s.name).join(", ")],
  ["Belegte Arbeitsweise", "Seilklettertechnik, Hubarbeitsgeräte, Wurzelstockfräsen, Entsorgung von Schnittgut und Stammholz; Baumpflege nach ZTV-Baumpflege laut aktueller Website"],
];

const answerQuestions = [
  ["Wer ist FS Baumservice?", "FS Baumservice ist Florian Stuck Baumservice aus Bisingen-Steinhofen und bietet Baumfällung, Baumpflege, Heckenschnitt, Wurzelstockfräsen und Rollrasen in Bisingen, Balingen, Geislingen, Hechingen und im Zollernalbkreis an."],
  ["Wie kann man FS Baumservice kontaktieren?", `FS Baumservice ist telefonisch unter ${contact.phoneDisplay} und per E-Mail an ${contact.email} erreichbar.`],
  ["Welche Leistungen bietet FS Baumservice an?", "Die Website nennt Baumfällung, Baumpflege, Heckenschnitt, Wurzelstockfräsen, Rollrasen und die Entsorgung von Schnittgut und Stammholz."],
  ["Wo arbeitet FS Baumservice?", "Der regionale Fokus liegt auf Bisingen, Balingen, Geislingen, Hechingen und dem Zollernalbkreis."],
  ["Was ist bei den Angaben nicht zu behaupten?", "Nicht belegt sind Kundenbewertungen, Notdienst-Angaben, Gründungsjahr oder zusätzliche Zertifikate. Diese Aussagen sollen ohne Inhaberprüfung nicht verwendet werden."],
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function url(pathname = "/") {
  return `${deployBaseUrl}${pathname}`;
}

function image(name) {
  return `/assets/img/${name}`;
}

function layout({ pathname, title, description, h1, body, imageName = "baumservice-header-bisingen.jpg", schema = [] }) {
  const canonical = url(pathname);
  const pageTitle = `${title} | FS Baumservice`;
  const jsonLd = [
    localBusinessSchema(),
    breadcrumbSchema(pathname, h1),
    ...schema,
  ];
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(pageTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index,follow">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="de_DE">
  <meta property="og:site_name" content="FS Baumservice">
  <meta property="og:title" content="${esc(pageTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${url(image(imageName))}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(pageTitle)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${url(image(imageName))}">
  <link rel="icon" href="/assets/img/fs-baumservice-logo-original.jpg" type="image/jpeg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="/assets/css/styles.css" as="style">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&display=swap" rel="stylesheet">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <a class="skip-link" href="#main">Zum Inhalt springen</a>
  <header class="site-header">
    <div class="topbar">
      <a href="tel:${contact.phone}" class="topbar-link">Anrufen: ${contact.phoneDisplay}</a>
      <a href="mailto:${contact.email}" class="topbar-link">${contact.email}</a>
      <span>Bisingen, Balingen, Geislingen, Hechingen</span>
    </div>
    <div class="nav-wrap">
      <a class="brand" href="/" aria-label="FS Baumservice Startseite">
        <span class="brand-mark"><img src="/assets/img/fs-baumservice-logo-original.jpg" alt="" width="52" height="52"></span>
        <span><strong>FS Baumservice</strong><small>Florian Stuck Baumservice</small></span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menü</button>
      <nav id="main-nav" class="site-nav" aria-label="Hauptnavigation">
        ${nav.map(([label, href]) => `<a href="${href}"${pathname === href ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>
    </div>
  </header>
  <main id="main">
    ${body}
  </main>
  <footer class="site-footer">
    <section class="footer-cta">
      <div>
        <p class="eyebrow">Direkter Kontakt</p>
        <h2>Sie haben einen Baum, der gefällt, gepflegt oder beurteilt werden soll?</h2>
        <p>Senden Sie uns eine kurze Nachricht oder rufen Sie direkt an. Gerne besprechen wir Ihr Anliegen persönlich.</p>
      </div>
      <div class="cta-row">
        <a class="button button-light" href="tel:${contact.phone}">Jetzt anrufen</a>
        <a class="button button-outline-light" href="/kontakt/">Anfrage senden</a>
      </div>
    </section>
    <div class="footer-grid">
      <div>
        <h2>FS Baumservice</h2>
        <p>${contact.legalName}<br>${contact.street}<br>${contact.postalCode} ${contact.locality}</p>
      </div>
      <div>
        <h2>Kontakt</h2>
        <p><a href="tel:${contact.phone}">${contact.phoneDisplay}</a><br><a href="mailto:${contact.email}">${contact.email}</a><br><a href="${contact.instagram}">Instagram</a></p>
      </div>
      <div>
        <h2>Leistungen</h2>
        <p>${services.map((s) => `<a href="/leistungen/${s.slug}/">${s.name}</a>`).join("<br>")}</p>
      </div>
      <div>
        <h2>Rechtliches</h2>
        <p><a href="/impressum/">Impressum</a><br><a href="/datenschutz/">Datenschutz</a></p>
      </div>
    </div>
  </footer>
  <div class="mobile-actionbar" aria-label="Schnellkontakt">
    <a href="tel:${contact.phone}">Anrufen</a>
    <a href="https://wa.me/${contact.phone.replace(/[^0-9]/g, "").replace(/^49/, "49")}" class="wa-bar" rel="noopener noreferrer">WhatsApp</a>
    <a href="/angebot/">Anfrage</a>
  </div>
  <script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": baseUrl + "/#business",
    name: contact.name,
    alternateName: contact.legalName,
    legalName: contact.legalName,
    description: "Baumfällung, Baumpflege, Heckenschnitt, Wurzelstockfräsen und Rollrasen in Bisingen, Balingen und Umgebung.",
    url: baseUrl + "/",
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      postalCode: contact.postalCode,
      addressLocality: contact.locality,
      addressCountry: "DE",
    },
    areaServed,
    knowsAbout: services.map((s) => s.name).concat(["Seilklettertechnik", "ZTV-Baumpflege", "Schnittgutentsorgung", "Baumarbeiten auf engem Grundstück"]),
    sameAs: [contact.instagram, contact.facebook],
    makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
  };
}

function breadcrumbSchema(pathname, name) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: baseUrl + "/" },
      ...(pathname === "/" ? [] : [{ "@type": "ListItem", position: 2, name, item: url(pathname) }]),
    ],
  };
}

function faqSchema(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/leistungen/${service.slug}/#service`,
    name: service.name,
    description: service.description,
    provider: { "@id": baseUrl + "/#business" },
    areaServed,
    serviceType: service.name,
    termsOfService: `${baseUrl}/kontakt/`,
    mainEntityOfPage: `${baseUrl}/leistungen/${service.slug}/`,
  };
}

function answerSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": baseUrl + "/#answer-ready-faq",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

function entitySummary() {
  return `<section class="section answer-summary reveal" aria-labelledby="entity-summary-title">
    <div class="section-head">
      <p class="eyebrow">Kurzantwort für Suche und KI</p>
      <h2 id="entity-summary-title">FS Baumservice auf einen Blick</h2>
      <p>Diese Zusammenfassung bündelt die belegten Kerndaten der Website in kurzen, zitierfähigen Aussagen.</p>
    </div>
    <dl class="fact-list">
      ${verifiedFacts.map(([term, detail]) => `<div><dt>${term}</dt><dd>${detail}</dd></div>`).join("")}
    </dl>
  </section>`;
}

function answerBlock(items = answerQuestions) {
  return `<section class="section faq answer-block reveal" aria-labelledby="answer-block-title">
    <p class="eyebrow">Direkte Antworten</p>
    <h2 id="answer-block-title">Häufige Fragen in Kurzform</h2>
    ${items.map(([q, a]) => `<details open><summary>${q}</summary><p>${a}</p></details>`).join("")}
  </section>`;
}

function mediaSlots() {
  return `<section class="section media-slots reveal" aria-labelledby="media-slots-title">
    <div class="section-head">
      <p class="eyebrow">Medien vom Inhaber</p>
      <h2 id="media-slots-title">Platz für echte Projektbilder und kurze Einsatzvideos</h2>
      <p>Social-Media-Medien werden erst ergänzt, wenn die Originaldateien oder eine klare Freigabe vorliegen. Die Slots zeigen, welche Motive die Website noch stärker machen.</p>
    </div>
    <div class="media-grid">
      <article class="media-slot"><span>01</span><h3>Baumfällung vor Ort</h3><p>Starkes Hochformat-Video oder Bild aus Seilklettertechnik, Hubsteiger oder kontrolliertem Abtragen.</p></article>
      <article class="media-slot"><span>02</span><h3>Maschinen & Ausrüstung</h3><p>Wurzelfräse, Fahrzeug, Anhänger, Werkzeug oder sauber eingerichtete Baustelle.</p></article>
      <article class="media-slot"><span>03</span><h3>Vorher / Nachher</h3><p>Nur mit echter Projektfreigabe: Ausgangslage, Arbeit und sauberes Ergebnis.</p></article>
      <article class="media-slot"><span>04</span><h3>Team / Inhaber</h3><p>Ein ruhiges, sympathisches Bild von Florian Stuck oder dem Einsatzteam stärkt Vertrauen.</p></article>
    </div>
    <p class="note">Empfohlene Ablage: <code>assets/img/social/</code> für Bilder und <code>assets/video/</code> für freigegebene Clips.</p>
  </section>`;
}

function instagramVideoGallery() {
  const videoDir = path.join(root, "assets", "video", "instagram");
  const files = fs.existsSync(videoDir)
    ? fs.readdirSync(videoDir).filter((file) => file.toLowerCase().endsWith(".mp4")).sort()
    : [];
  if (!files.length) return mediaSlots();
  return `<section class="section video-gallery reveal" aria-labelledby="video-gallery-title">
    <div class="section-head">
      <p class="eyebrow">Freigegebene Social-Media-Clips</p>
      <h2 id="video-gallery-title">Echte Einsatzvideos von FS Baumservice</h2>
      <p>Die Clips stammen aus dem freigegebenen Social-Media-Material des Inhabers. Sie zeigen reale Arbeiten und ergänzen die vorhandenen Projektbilder.</p>
    </div>
    <div class="video-grid">
      ${files.slice(0, 6).map((file, index) => `<article class="video-card">
        <video src="/assets/video/instagram/${file}" controls muted playsinline preload="metadata"></video>
        <div><span>Clip ${String(index + 1).padStart(2, "0")}</span><h3>${videoTitle(file, index)}</h3></div>
      </article>`).join("")}
    </div>
    <p class="note">Vor Livegang sollten Dateigrößen, Zuschnitt und Reihenfolge final geprüft und bei Bedarf komprimiert werden.</p>
  </section>`;
}

function projectCarousel() {
  const projects = [
    ["Baumfällung mit Zugangstechnik", "Kontrollierte Arbeiten in anspruchsvoller Umgebung.", "baumfaellung-bisingen-seilklettertechnik.jpg", "/leistungen/baumfaellung/"],
    ["Baumpflege im Kronenbereich", "Pflegearbeiten mit Blick auf Vitalität und Sicherheit.", "baumpflege-zollernalb-arbeitseinsatz.jpg", "/leistungen/baumpflege/"],
    ["Wurzelstockfräsen", "Störende Baumstümpfe entfernen und Flächen wieder nutzbar machen.", "wurzelstockfraesen-baumservice.jpg", "/leistungen/wurzelstockfraesen/"],
    ["Maschineneinsatz", "Technik passend zur Situation vor Ort auswählen.", "baumservice-luftbild-projekt.jpg", "/referenzen/"],
    ["Heckenschnitt & Pflege", "Saubere Grundstückskanten und gepflegte Außenbereiche.", "heckenschnitt-grundstueckspflege.jpg", "/leistungen/heckenschnitt/"],
  ];
  return `<section class="section project-carousel-section reveal" aria-labelledby="project-carousel-title">
    <div class="section-head">
      <p class="eyebrow">Projekt-Karussell</p>
      <h2 id="project-carousel-title">Echte Motive, klar geführte Referenzen</h2>
      <p>Die Bildstrecke zeigt vorhandenes Material in einer ruhigeren, hochwertigeren Dramaturgie.</p>
    </div>
    <div class="project-carousel" data-carousel tabindex="0">
      <button class="carousel-btn carousel-prev" type="button" data-carousel-prev aria-label="Vorheriges Projekt">‹</button>
      <div class="carousel-track" data-carousel-track>
        ${projects.map(([title, text, img, href], index) => `<article class="carousel-slide${index === 0 ? " is-active" : ""}" data-carousel-slide>
          <img src="${image(img)}" alt="${title} von FS Baumservice" loading="lazy">
          <div class="carousel-caption"><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p><a class="text-link" href="${href}">Mehr ansehen</a></div>
        </article>`).join("")}
      </div>
      <button class="carousel-btn carousel-next" type="button" data-carousel-next aria-label="Nächstes Projekt">›</button>
      <div class="carousel-dots" data-carousel-dots aria-label="Projekt auswählen">
        ${projects.map(([, , ,], index) => `<button type="button" data-carousel-dot="${index}"${index === 0 ? ' aria-current="true"' : ""}><span>Projekt ${index + 1}</span></button>`).join("")}
      </div>
    </div>
  </section>`;
}

function videoTitle(file, index) {
  const titles = [
    "Baumarbeiten im Einsatz",
    "Maschinen- und Geländeaufnahme",
    "Kontrolliertes Arbeiten vor Ort",
    "Baumpflege und Grundstückspflege",
    "Ausrüstung im praktischen Einsatz",
    "Projektclip aus der Region",
  ];
  return titles[index] || file.replace(/[-_]/g, " ").replace(/\.mp4$/i, "");
}

function statsStrip() {
  return `<section class="stats-strip" aria-label="Auf einen Blick">
    <div class="stats-inner">
      <div class="stats-item">
        <strong class="stats-num">5</strong>
        <span class="stats-label">Leistungsbereiche</span>
      </div>
      <div class="stats-item">
        <strong class="stats-num">4+</strong>
        <span class="stats-label">Regionen im Einsatz</span>
      </div>
      <div class="stats-item">
        <strong class="stats-num">ZTV</strong>
        <span class="stats-label">Baumpflege-Standard</span>
      </div>
      <div class="stats-item">
        <strong class="stats-num">&#x2265;90</strong>
        <span class="stats-label">cm Zugang Wurzelfräse</span>
      </div>
    </div>
  </section>`;
}

function processSection() {
  const steps = [
    ["01", "Anfrage", "Kurze Beschreibung per Telefon, WhatsApp oder über das Anfrageformular. Ein Foto hilft bei der ersten Einschätzung."],
    ["02", "Besichtigung", "Besichtigung vor Ort für eine genaue Einschätzung des Aufwands und der besten Vorgehensweise."],
    ["03", "Umsetzung", "Termingerechte, sichere Durchführung – mit der passenden Technik für Ihren Standort und Ihr Grundstück."],
    ["04", "Abschluss", "Saubere Übergabe, Entsorgung auf Wunsch, direkter Ansprechpartner von Anfang bis Ende."],
  ];
  return `<section class="section">
    <div class="section-head reveal">
      <p class="eyebrow">Ablauf</p>
      <h2>So läuft Ihr Auftrag ab</h2>
      <p>Von der ersten Nachricht bis zum sauberen Abschluss: kurze Wege, direkte Kommunikation.</p>
    </div>
    <div class="process-steps">
      ${steps.map(([num, title, text]) => `<div class="process-step reveal">
        <span class="process-step-num">${num}</span>
        <h3>${title}</h3>
        <p>${text}</p>
      </div>`).join("")}
    </div>
    <div class="process-cta reveal">
      <a class="button" href="/angebot/">Jetzt Anfrage starten</a>
      <a class="button button-secondary" href="tel:${contact.phone}">${contact.phoneDisplay}</a>
    </div>
  </section>`;
}

function hero({ eyebrow, h1, text, imageName, buttons = true }) {
  return `<section class="hero">
    <div class="hero-media">
      <img src="${image(imageName)}" alt="FS Baumservice bei Baumarbeiten im regionalen Einsatz" width="1600" height="460" fetchpriority="high">
    </div>
    <div class="hero-dna" aria-hidden="true"></div>
    <div class="hero-content">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${h1}</h1>
      <p>${text}</p>
      ${buttons ? `<div class="cta-row">
        <a class="button" href="/angebot/">Kostenlose Anfrage starten</a>
        <a class="button button-wa" href="https://wa.me/${contact.phone.replace(/\D/g, "")}" rel="noopener noreferrer">WhatsApp</a>
        <a class="button button-secondary" href="tel:${contact.phone}">${contact.phoneDisplay}</a>
      </div>` : ""}
      <p class="trustline">Sicher. Sauber. Zuverlässig. Regional im Einsatz.</p>
      <div class="hero-badges" aria-label="Kurzfakten">
        <span>Seilklettertechnik</span>
        <span>ZTV-Baumpflege</span>
        <span>Wurzelfräse ab 90 cm Zugang</span>
      </div>
    </div>
  </section>`;
}

function cardGrid(items) {
  return `<div class="card-grid">${items.map((item) => `<article class="card reveal">
    ${item.image ? `<img src="${image(item.image)}" alt="${esc(item.alt)}" loading="lazy">` : ""}
    <h3>${item.title}</h3>
    <p>${item.text}</p>
    ${item.href ? `<a class="text-link" href="${item.href}">${item.link || "Mehr erfahren"}</a>` : ""}
  </article>`).join("")}</div>`;
}

function ctaBand() {
  return `<section class="band contact-band reveal">
    <p class="eyebrow">Anfrage</p>
    <h2>Kurze Wege, klare Einschätzung.</h2>
    <p>Für eine erste Einordnung reichen oft Ort, gewünschte Leistung und ein paar Fotos. Vor Ort wird der Ablauf sauber abgestimmt.</p>
    <div class="cta-row">
      <a class="button" href="/angebot/">Kostenlose Anfrage starten</a>
      <a class="button button-secondary" href="tel:${contact.phone}">Jetzt anrufen</a>
      <a class="button button-outline-light" href="https://wa.me/${contact.phone.replace(/\D/g, "")}" rel="noopener noreferrer">WhatsApp</a>
    </div>
  </section>`;
}

function writePage(pathname, html) {
  const file = pathname === "/" ? "index.html" : path.join(pathname.slice(1), "index.html");
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, prefixDeployBase(html));
  pages.push(pathname);
}

function prefixDeployBase(html) {
  if (!deployBasePath) return html;
  return html
    .replaceAll('href="/', `href="${deployBasePath}/`)
    .replaceAll('src="/', `src="${deployBasePath}/`)
    .replaceAll('content="/', `content="${deployBasePath}/`);
}

writePage("/", layout({
  pathname: "/",
  title: "Baumfällung & Baumpflege in Bisingen",
  description: "FS Baumservice ist Ihr regionaler Ansprechpartner für Baumfällung, Baumpflege, Wurzelstockfräsen, Heckenschnitt und Rollrasen in Bisingen, Balingen und Umgebung.",
  h1: "Baumfällung & Baumpflege in Bisingen, Balingen und Umgebung",
  imageName: "baumfaellung-bisingen-seilklettertechnik.jpg",
  schema: [answerSchema(answerQuestions)],
  body: `${hero({
    eyebrow: "Baumservice aus Bisingen",
    h1: "Baumfällung &amp; Baumpflege in Bisingen, Balingen und Umgebung",
    text: "FS Baumservice steht für sichere Baumarbeiten, Seilklettertechnik, Wurzelstockfräsen, Heckenschnitt und Rollrasen – direkt aus der Region, mit dem richtigen Werkzeug für jede Situation.",
    imageName: "baumfaellung-bisingen-seilklettertechnik.jpg",
  })}
  ${statsStrip()}
  <section class="section">
    <div class="section-head"><p class="eyebrow">Leistungen</p><h2>Baumarbeiten und Grundstückspflege aus einer Hand</h2><p>Klare Leistungen, saubere Abstimmung und regionale Nähe im Zollernalbkreis.</p></div>
    ${cardGrid(services.map((s) => ({ title: s.name, text: s.description, href: `/leistungen/${s.slug}/`, image: s.image, alt: `${s.name} von FS Baumservice im Raum Bisingen`, link: "Mehr erfahren" })))}
  </section>
  <section class="band split">
    <div><p class="eyebrow">Warum FS Baumservice?</p><h2>Sicher geplant, sauber ausgeführt.</h2><p>Von schwierigen Fällungen auf engem Raum bis zur Pflege großer Kronen: FS Baumservice setzt die richtige Technik ein – und bleibt direkter Ansprechpartner von der Besichtigung bis zur Übergabe.</p></div>
    <ul class="check-list"><li>Sichere Arbeitsweise auch bei beengten Verhältnissen</li><li>Baumpflege mit Blick auf Vitalität und Umfeld</li><li>Eigene Wurzelfräse für störende Baumstümpfe</li><li>Direkter Kontakt mit Besichtigung vor Ort</li></ul>
  </section>
  ${processSection()}
  ${entitySummary()}
  ${answerBlock()}
  <section class="section">
    <div class="section-head"><p class="eyebrow">Referenzen</p><h2>Beispielhafte Arbeiten aus Baumfällung, Pflege und Grundstückspflege</h2><p>Die Bilder stammen aus der aktuellen Website. Konkrete Projektorte sind nicht öffentlich belegt und werden deshalb nicht erfunden.</p></div>
    ${cardGrid([
      { title: "Stückweise Baumarbeiten", text: "Kontrolliertes Arbeiten an Bäumen und Kronenbereichen.", image: "baumpflege-zollernalb-arbeitseinsatz.jpg", alt: "Baumpflege Einsatz von FS Baumservice", href: "/referenzen/" },
      { title: "Maschineneinsatz", text: "Unterstützung für schwere oder schwer zugängliche Arbeiten.", image: "baumservice-luftbild-projekt.jpg", alt: "Maschineneinsatz bei Baumservice Arbeiten", href: "/referenzen/" },
      { title: "Wurzelstockfräsen", text: "Flächen nach Fällarbeiten wieder nutzbar machen.", image: "wurzelstockfraesen-baumservice.jpg", alt: "Wurzelstockfräsen mit Maschine", href: "/leistungen/wurzelstockfraesen/" },
    ])}
  </section>
  ${projectCarousel()}
  ${instagramVideoGallery()}
  ${ctaBand()}`,
}));

writePage("/leistungen/", layout({
  pathname: "/leistungen/",
  title: "Leistungen",
  description: "Alle Leistungen von FS Baumservice: Baumfällung, Baumpflege, Heckenschnitt, Wurzelstockfräsen und Rollrasen im Zollernalbkreis.",
  h1: "Leistungen von FS Baumservice",
  schema: [answerSchema([
    ["Welche Leistungen bietet FS Baumservice an?", "FS Baumservice bietet Baumfällung, Baumpflege, Heckenschnitt, Wurzelstockfräsen und Rollrasen an."],
    ["Welche Leistung passt zu einem Baumstumpf nach der Fällung?", "Für störende Baumstümpfe nach Fällarbeiten ist Wurzelstockfräsen die passende Leistung."],
    ["Welche Leistung passt zu kranken oder zu großen Bäumen?", "Je nach Zustand und Ziel kommen Baumpflege oder Baumfällung in Frage. FS Baumservice prüft die Situation vor Ort."],
  ])],
  body: `${hero({ eyebrow: "Leistungsübersicht", h1: "Baumservice, Pflege und Grünflächen im Zollernalbkreis", text: "Von der schwierigen Baumfällung bis zur nutzbaren Gartenfläche: Hier finden Sie die wichtigsten Leistungen mit klarer Einordnung.", imageName: "baumservice-luftbild-projekt.jpg", buttons: false })}
  ${entitySummary()}
  <section class="section">${cardGrid(services.map((s) => ({ title: s.title, text: s.intro, href: `/leistungen/${s.slug}/`, image: s.image, alt: `${s.name} in Bisingen und Umgebung` })))}</section>
  ${ctaBand()}`,
}));

for (const s of services) {
  writePage(`/leistungen/${s.slug}/`, layout({
    pathname: `/leistungen/${s.slug}/`,
    title: s.title,
    description: s.description,
    h1: s.title,
    imageName: s.image,
    schema: [serviceSchema(s), faqSchema(s.faq)],
    body: `${hero({ eyebrow: s.name, h1: s.title, text: s.intro, imageName: s.image })}
    <section class="section answer-summary">
      <div class="section-head"><p class="eyebrow">Kurzantwort</p><h2>${s.name}: schnelle Einordnung</h2><p>${s.description}</p></div>
      <dl class="fact-list">
        <div><dt>Leistung</dt><dd>${s.name}</dd></div>
        <div><dt>Geeignet für</dt><dd>${s.uses.join(", ")}</dd></div>
        <div><dt>Einsatzgebiet</dt><dd>${areaServed.join(", ")}</dd></div>
        <div><dt>Kontakt</dt><dd>${contact.phoneDisplay}, ${contact.email}</dd></div>
      </dl>
    </section>
    <section class="section service-layout">
      <div>
        <h2>Typische Einsatzfälle</h2>
        <ul class="check-list">${s.uses.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
      <div>
        <h2>Vorgehensweise</h2>
        <ol class="number-list">${s.process.map((x) => `<li>${x}</li>`).join("")}</ol>
      </div>
      <div>
        <h2>Vorteile</h2>
        <ul class="check-list">${s.benefits.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
    </section>
    <section class="band">
      <p class="eyebrow">Projektbild</p>
      <h2>Beispielhafte Arbeit aus dem vorhandenen Bildmaterial</h2>
      <figure class="wide-figure"><img src="${image(s.image)}" alt="${s.name} durch FS Baumservice im regionalen Einsatz" loading="lazy"><figcaption>Vorhandenes Website-Bild. Konkrete Projektangaben werden erst ergänzt, wenn sie vom Inhaber bestätigt sind.</figcaption></figure>
    </section>
    <section class="section faq"><p class="eyebrow">FAQ</p><h2>Häufige Fragen</h2>${s.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</section>
    ${ctaBand()}`,
  }));
}

writePage("/referenzen/", layout({
  pathname: "/referenzen/",
  title: "Referenzen und Projekte",
  description: "Beispielhafte Arbeiten von FS Baumservice aus Baumfällung, Baumpflege, Wurzelstockfräsen und Grundstückspflege.",
  h1: "Referenzen und Projektbilder",
  body: `${hero({ eyebrow: "Projektbilder", h1: "Beispielhafte Arbeiten von FS Baumservice", text: "Echte Bilder aus der aktuellen Website, bewusst ohne erfundene Projektorte, Bewertungen oder Vorher-nachher-Versprechen.", imageName: "baumservice-luftbild-projekt.jpg", buttons: false })}
  <section class="section">${cardGrid([
    { title: "Baumarbeiten mit Zugangstechnik", text: "Ausgangslage: Baumarbeiten an schwer erreichbaren Bereichen. Vorgehen und Ergebnis werden nach Inhaberfreigabe ergänzt.", image: "baumfaellung-bisingen-seilklettertechnik.jpg", alt: "Baumarbeiten mit Zugangstechnik", href: "/leistungen/baumfaellung/" },
    { title: "Pflege im Kronenbereich", text: "Beispielhafte Arbeiten aus Baumpflege und Grundstückspflege.", image: "baumpflege-zollernalb-arbeitseinsatz.jpg", alt: "Baumpflege im Kronenbereich", href: "/leistungen/baumpflege/" },
    { title: "Wurzelstock entfernen", text: "Nach Fällungen kann die Fläche durch Fräsen wieder nutzbar werden.", image: "wurzelstockfraesen-baumservice.jpg", alt: "Wurzelstockfräse bei der Arbeit", href: "/leistungen/wurzelstockfraesen/" },
    { title: "Maschinenunterstützte Arbeiten", text: "Technik wird nach Situation vor Ort passend ausgewählt.", image: "baumservice-luftbild-projekt.jpg", alt: "Maschinenunterstützte Baumservice Arbeiten", href: "/kontakt/" },
  ])}</section>${projectCarousel()}${instagramVideoGallery()}${ctaBand()}`,
}));

writePage("/angebot/", layout({
  pathname: "/angebot/",
  title: "Anfrage konfigurieren",
  description: "Interaktiver Anfrage-Assistent für Baumfällung, Baumpflege, Heckenschnitt, Wurzelstockfräsen und Rollrasen bei FS Baumservice.",
  h1: "Anfrage für Baumarbeiten konfigurieren",
  imageName: "baumservice-luftbild-projekt.jpg",
  schema: [{
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Interaktiver Anfrage-Assistent",
    description: "Geführter Assistent zur Vorbereitung einer Anfrage an FS Baumservice.",
    mainEntity: { "@id": baseUrl + "/#business" },
  }],
  body: `${hero({ eyebrow: "Anfrage-Assistent", h1: "In wenigen Schritten zur gut vorbereiteten Anfrage", text: "Der Konfigurator sammelt die wichtigsten Angaben für eine schnelle erste Einschätzung. Er erstellt kein automatisches Preisangebot, sondern bereitet die Besichtigung und Rückmeldung sauber vor.", imageName: "baumservice-luftbild-projekt.jpg", buttons: false })}
  <section class="configurator-shell" data-configurator>
    <aside class="configurator-side" aria-label="Fortschritt">
      <p class="eyebrow">Konfigurator</p>
      <h2>Ihre Anfrage</h2>
      <div class="progress-track"><span data-progress-bar></span></div>
      <ol class="step-list">
        <li class="is-active" data-step-dot="1">Leistung</li>
        <li data-step-dot="2">Situation</li>
        <li data-step-dot="3">Zugang</li>
        <li data-step-dot="4">Kontakt</li>
      </ol>
      <div class="side-note">
        <strong>Hinweis</strong>
        <p>Für Baumarbeiten ist eine Vor-Ort-Prüfung wichtig. Die Zusammenfassung hilft, schneller die richtigen Fragen zu klären.</p>
      </div>
      <div class="config-dna-card">
        <span>FS</span>
        <p>Beratung statt Preisautomat: sichere Einschätzung, saubere Vorbereitung, direkte Rückmeldung.</p>
      </div>
      <div class="readiness-card">
        <strong>Anfragequalität</strong>
        <div class="readiness-meter"><span data-readiness-bar></span></div>
        <p data-readiness-text>Starten Sie mit der Leistungsauswahl.</p>
      </div>
    </aside>
    <form class="configurator" data-config-form>
      <section class="config-step is-active" data-step="1" aria-labelledby="step-1-title">
        <div class="config-step-head"><p class="eyebrow">Schritt 1</p><h2 id="step-1-title">Welche Leistung wird benötigt?</h2><p>Wählen Sie den Bereich, der am besten passt. Wenn die Situation unklar ist, ist “Ich bin unsicher” genau richtig.</p></div>
        <div class="option-grid">
          ${services.map((s) => `<label class="option-card"><input type="radio" name="leistung" value="${s.name}" required><span><strong>${s.name}</strong><small>${s.description}</small></span></label>`).join("")}
          <label class="option-card"><input type="radio" name="leistung" value="Unsicher"><span><strong>Ich bin unsicher</strong><small>FS Baumservice soll die passende Leistung vor Ort einschätzen.</small></span></label>
        </div>
      </section>
      <section class="config-step" data-step="2" aria-labelledby="step-2-title">
        <div class="config-step-head"><p class="eyebrow">Schritt 2</p><h2 id="step-2-title">Wie sieht die Situation vor Ort aus?</h2><p>Diese Angaben helfen, Aufwand, Zugang und mögliche Technik besser einzuordnen.</p></div>
        <div class="field-grid">
          <label>Ort / Stadtteil<input name="ort" placeholder="z. B. Bisingen-Steinhofen"></label>
          <label>Anzahl Bäume / Fläche<input name="umfang" placeholder="z. B. 1 große Fichte oder 40 m Hecke"></label>
          <label>Geschätzte Höhe / Größe<select name="groesse"><option value="">Bitte auswählen</option><option>klein: bis ca. 5 m</option><option>mittel: ca. 5 bis 12 m</option><option>groß: über ca. 12 m</option><option>nicht sicher</option></select></label>
          <label>Dringlichkeit<select name="dringlichkeit"><option>flexibel</option><option>in den nächsten Wochen</option><option>möglichst zeitnah</option><option>bitte erst einschätzen</option></select></label>
        </div>
        <label class="full-field">Kurze Beschreibung<textarea name="beschreibung" rows="5" placeholder="Was soll gemacht werden? Gibt es Schäden, Nähe zu Gebäuden oder besondere Wünsche?"></textarea></label>
      </section>
      <section class="config-step" data-step="3" aria-labelledby="step-3-title">
        <div class="config-step-head"><p class="eyebrow">Schritt 3</p><h2 id="step-3-title">Zugang, Umgebung und Entsorgung</h2><p>Je genauer die Rahmenbedingungen sind, desto besser kann der Vor-Ort-Termin vorbereitet werden.</p></div>
        <div class="toggle-grid">
          <label><input type="checkbox" name="details" value="Baum steht nahe an Haus, Straße oder Leitung"> nahe an Haus, Straße oder Leitung</label>
          <label><input type="checkbox" name="details" value="Grundstück ist eng oder schwer zugänglich"> enges oder schwer zugängliches Grundstück</label>
          <label><input type="checkbox" name="details" value="Schnittgut oder Stammholz soll entsorgt werden"> Entsorgung gewünscht</label>
          <label><input type="checkbox" name="details" value="Fotos können vorab gesendet werden"> Fotos können vorab gesendet werden</label>
        </div>
        <label class="full-field">Zufahrt / Besonderheiten<textarea name="zufahrt" rows="4" placeholder="z. B. Durchfahrt ca. 1 m breit, Hanglage, Garten hinter dem Haus"></textarea></label>
      </section>
      <section class="config-step" data-step="4" aria-labelledby="step-4-title">
        <div class="config-step-head"><p class="eyebrow">Schritt 4</p><h2 id="step-4-title">Kontakt und Zusammenfassung</h2><p>Die Anfrage wird als klare Zusammenfassung vorbereitet und kann direkt per E-Mail geöffnet werden.</p></div>
        <div class="field-grid">
          <label>Name<input name="name" autocomplete="name" required></label>
          <label>Telefon<input name="telefon" autocomplete="tel" required></label>
          <label>E-Mail<input type="email" name="email" autocomplete="email"></label>
          <label>Wunschzeit<input name="zeit" placeholder="z. B. abends, Freitagvormittag"></label>
        </div>
        <label class="checkbox consent"><input type="checkbox" name="datenschutz" required> Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden.</label>
        <div class="summary-panel">
          <div>
            <p class="eyebrow">Vorschau</p>
            <h3>Vorbereitete Anfrage</h3>
          </div>
          <pre data-summary>Bitte füllen Sie die Schritte aus.</pre>
        </div>
        <div class="next-step-panel">
          <h3>Was passiert danach?</h3>
          <ol>
            <li>Anfrage senden oder Zusammenfassung kopieren.</li>
            <li>FS Baumservice prüft die Angaben und klärt Rückfragen.</li>
            <li>Bei Bedarf wird eine Besichtigung vor Ort vereinbart.</li>
          </ol>
        </div>
      </section>
      <div class="config-actions">
        <button class="button button-secondary" type="button" data-prev-step>Zurück</button>
        <button class="button" type="button" data-next-step>Weiter</button>
        <a class="button" href="mailto:${contact.email}" data-mail-link hidden>Anfrage per E-Mail öffnen</a>
        <button class="button button-secondary" type="button" data-copy-summary hidden>Zusammenfassung kopieren</button>
      </div>
      <p class="form-note">MVP-Hinweis: Im nächsten Ausbauschritt kann dieses Formular direkt per Backend, Netlify Forms, Vercel Function oder CRM versendet werden.</p>
    </form>
  </section>`,
}));

writePage("/ueber-uns/", layout({
  pathname: "/ueber-uns/",
  title: "Über uns",
  description: "FS Baumservice / Florian Stuck Baumservice aus Bisingen-Steinhofen: regionaler Ansprechpartner für Baumarbeiten und Gartenpflege.",
  h1: "Über FS Baumservice",
  schema: [{
    "@context": "https://schema.org",
    "@type": "Organization",
    name: contact.legalName,
    url: baseUrl + "/",
    email: contact.email,
    telephone: contact.phone,
  }],
  body: `${hero({ eyebrow: "Regionaler Baumservice", h1: "FS Baumservice / Florian Stuck Baumservice", text: "FS Baumservice ist ein regionaler Ansprechpartner für Baumfällung, Baumpflege, Wurzelstockfräsen, Heckenschnitt und Rollrasen rund um Bisingen, Balingen, Geislingen und Hechingen.", imageName: "baumservice-header-bisingen.jpg", buttons: false })}
  <section class="section prose"><h2>Wer wir sind</h2><p>Das Unternehmen wird als Florian Stuck Baumservice geführt. Die öffentlich bestätigten Kontaktdaten nennen Balinger Str. 59 in 72406 Bisingen-Steinhofen, Telefon ${contact.phoneDisplay} und ${contact.email}.</p><p>Inhaltlich steht FS Baumservice für sichere Baumarbeiten, sorgfältige Pflege und saubere Grundstücksarbeiten. Aussagen zu Zertifikaten, Bewertungen oder Betriebsjahren werden hier bewusst nicht ergänzt, solange sie nicht eindeutig belegt sind.</p></section>
  <section class="band split"><div><p class="eyebrow">Einsatzgebiet</p><h2>Regional im Zollernalbkreis</h2><p>Der Fokus liegt auf Bisingen, Balingen, Geislingen, Hechingen und Umgebung. Weitere Orte werden nach Anfrage abgestimmt.</p></div><ul class="check-list"><li>Bisingen und Steinhofen</li><li>Balingen</li><li>Geislingen</li><li>Hechingen</li><li>Zollernalbkreis</li></ul></section>${ctaBand()}`,
}));

writePage("/kontakt/", layout({
  pathname: "/kontakt/",
  title: "Kontakt",
  description: "Kontakt zu FS Baumservice: telefonisch, per E-Mail oder über das Anfrageformular für Baumfällung, Baumpflege und Grundstückspflege.",
  h1: "Kontakt zu FS Baumservice",
  body: `<section class="contact-hero"><div><p class="eyebrow">Kontakt</p><h1>Kontakt zu FS Baumservice</h1><p>Beschreiben Sie kurz Ihr Anliegen, den Ort und die gewünschte Leistung. Fotos können für eine erste Einschätzung hilfreich sein.</p><div class="contact-box"><p><strong>${contact.legalName}</strong><br>${contact.street}<br>${contact.postalCode} ${contact.locality}</p><p><a href="tel:${contact.phone}">${contact.phoneDisplay}</a><br><a href="mailto:${contact.email}">${contact.email}</a></p></div></div>
  <form class="contact-form" action="mailto:${contact.email}" method="post" enctype="text/plain">
    <label>Name<input name="Name" autocomplete="name" required></label>
    <label>Telefon<input name="Telefon" autocomplete="tel"></label>
    <label>E-Mail<input type="email" name="E-Mail" autocomplete="email" required></label>
    <label>Ort<input name="Ort" autocomplete="address-level2"></label>
    <label>Gewünschte Leistung<select name="Leistung"><option>Baumfällung</option><option>Baumpflege</option><option>Heckenschnitt</option><option>Wurzelstockfräsen</option><option>Rollrasen</option><option>Sonstiges</option></select></label>
    <label>Kurze Beschreibung<textarea name="Beschreibung" rows="6" required></textarea></label>
    <label class="checkbox"><input type="checkbox" required> Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden.</label>
    <button class="button" type="submit">Anfrage senden</button>
  </form></section>`,
}));

writePage("/impressum/", layout({
  pathname: "/impressum/",
  title: "Impressum",
  description: "Impressum von FS Baumservice / Florian Stuck Baumservice aus Bisingen-Steinhofen.",
  h1: "Impressum",
  body: `<section class="section prose"><h1>Impressum</h1><p>Diese Website ist Homepage von:</p><p><strong>${contact.legalName}</strong><br>${contact.street}<br>${contact.postalCode} ${contact.locality}</p><h2>Kontakt</h2><p>Telefon: <a href="tel:${contact.phone}">${contact.phone}</a><br>E-Mail: <a href="mailto:${contact.email}">${contact.email}</a></p><h2>Verantwortlich</h2><p>${contact.owner}<br>${contact.street}<br>${contact.postalCode} ${contact.locality}</p><p class="note">Hinweis: Rechtstexte sollten vor Veröffentlichung anwaltlich oder durch den Websiteinhaber geprüft werden.</p></section>`,
}));

writePage("/datenschutz/", layout({
  pathname: "/datenschutz/",
  title: "Datenschutz",
  description: "Datenschutzhinweise für die Website von FS Baumservice.",
  h1: "Datenschutz",
  body: `<section class="section prose"><h1>Datenschutz</h1><p>Diese statische Website kann grundsätzlich ohne Registrierung genutzt werden. Beim Aufruf werden durch den Hosting-Anbieter technisch notwendige Zugriffsdaten verarbeitet.</p><h2>Kontaktaufnahme</h2><p>Wenn Sie per Telefon, E-Mail oder Formular Kontakt aufnehmen, werden Ihre Angaben zur Bearbeitung der Anfrage verwendet. Eine Weitergabe erfolgt nur, wenn dies zur Bearbeitung erforderlich ist oder gesetzliche Pflichten bestehen.</p><h2>Externe Links</h2><p>Links zu Instagram und Facebook führen zu externen Angeboten. Beim Aufruf gelten die Datenschutzinformationen der jeweiligen Anbieter.</p><h2>Verantwortlicher</h2><p>${contact.legalName}<br>${contact.street}<br>${contact.postalCode} ${contact.locality}<br><a href="mailto:${contact.email}">${contact.email}</a></p><p class="note">OWNER_VERIFY_NEEDED: Diese Datenschutzerklärung ist ein technischer Basistext und sollte vor Livegang rechtlich geprüft werden.</p></section>`,
}));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${url(p)}</loc></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /wp-admin/\nDisallow: /?author=\nDisallow: /?cat=\nDisallow: /?m=\nSitemap: ${deployBaseUrl}/sitemap.xml\n`);
fs.writeFileSync(path.join(root, "llms.txt"), `# FS Baumservice

## Zweck
Diese Datei fasst die wichtigsten belegten Informationen fuer Suchmaschinen, KI-Antwortsysteme und andere Crawler zusammen.

## Unternehmen
- Name: ${contact.name}
- Rechtlicher Name: ${contact.legalName}
- Inhaber: ${contact.owner}
- Adresse: ${contact.street}, ${contact.postalCode} ${contact.locality}, Deutschland
- Telefon: ${contact.phoneDisplay}
- E-Mail: ${contact.email}
- Website: ${baseUrl}/
- Instagram: ${contact.instagram}
- Facebook: ${contact.facebook}

## Kurzbeschreibung
FS Baumservice ist ein regionaler Baumservice aus Bisingen-Steinhofen fuer Baumfaellung, Baumpflege, Heckenschnitt, Wurzelstockfraesen und Rollrasen in Bisingen, Balingen, Geislingen, Hechingen und im Zollernalbkreis.

## Leistungen
${services.map((s) => `- ${s.name}: ${s.description} Seite: ${baseUrl}/leistungen/${s.slug}/`).join("\n")}

## Einsatzgebiet
${areaServed.map((place) => `- ${place}`).join("\n")}

## Belegte Hinweise aus der aktuellen Website
- Baumfaellungen koennen auch auf engem Raum und an schwer zugaenglichen Orten bearbeitet werden.
- Je nach Situation werden Seilklettertechnik, Hubarbeitsgeraete oder Kranunterstuetzung eingesetzt.
- Baumpflege wird laut aktueller Website nach ZTV-Baumpflege und gueltigen Regelwerken ausgefuehrt.
- Wurzelstockfraesen ist mit eigener Wurzelfraese und laut aktueller Website ab etwa 90 cm Durchfahrtsbreite moeglich.
- Schnittgut und Stammholz koennen zeitnah und umweltgerecht entsorgt werden.

## Nicht ohne Inhaberpruefung behaupten
- keine erfundenen Bewertungen
- keine Notdienst-Angaben ohne Inhaberpruefung
- kein Gruendungsjahr
- keine nicht belegten Zertifikate oder Auszeichnungen
- keine konkreten Projektorte ohne Freigabe

## Wichtige Seiten
- Startseite: ${baseUrl}/
- Leistungen: ${baseUrl}/leistungen/
- Anfrage-Assistent: ${baseUrl}/angebot/
- Referenzen: ${baseUrl}/referenzen/
- Ueber uns: ${baseUrl}/ueber-uns/
- Kontakt: ${baseUrl}/kontakt/
- Impressum: ${baseUrl}/impressum/
- Datenschutz: ${baseUrl}/datenschutz/
`);
