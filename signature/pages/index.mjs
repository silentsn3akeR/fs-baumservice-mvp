import { pageShell, img, protocol, FS } from "../lib.mjs";

export async function render() {
  const body = `
<!-- ============ AKT I — POSITION ============ -->
<section class="hero dark">
  <div class="hero-media">
    ${img({
      master: "M-01", slot: "hero", widths: [640, 960, 1440, 1920, 2560],
      sizes: "100vw", eager: true,
      mobile: { slot: "heromob", widths: [640, 960], media: "(max-width: 47.9rem)" },
      alt: "Blick von oben: Baumkletterer in Signalkleidung arbeitet gesichert zwischen zwei entasteten Stämmen, darunter ein verschneites Wohngrundstück.",
    })}
  </div>
  <div class="annot hero-annot" aria-hidden="true">
    <span class="annot-zone"></span>
    <span class="annot-label">Seilklettertechnik · gesichert</span>
  </div>
  <div class="hero-inner shell">
    <p class="protocol hero-protocol"><span class="leaf">Einsatzdokumentation</span>&nbsp;· Winter · Wohngebiet</p>
    <h1 class="monument hero-headline">Wenn ein Baum<br><span class="leafline">nicht einfach</span><br>fallen kann.</h1>
    <div class="hero-foot">
      <div class="hero-facts">
        <span class="fact"><b>${FS.legal}</b></span>
        <span class="fact">${FS.region}</span>
        <span class="fact">Seilklettertechnik · Kran- und Hubtechnik nach Situation</span>
      </div>
      <a class="cta cta--solid" href="/kontakt/">Anfrage stellen</a>
    </div>
  </div>
</section>

<!-- ============ LEISTUNGS-REGISTER ============ -->
<section class="section shell" id="leistungen" aria-labelledby="leistungen-h">
  ${protocol('Leistungen — <span class="leaf">nach Situation, nicht nach Katalog</span>', { id: "leistungen-h", h: 2 })}

  <div class="feature-split mt-4">
    <a class="plate" href="/spezialfaellung/" aria-label="Zur Spezialfällung">
      ${img({
        master: "M-03", slot: "monument", widths: [640, 960, 1440, 1920],
        sizes: "(min-width: 64rem) 58vw, 100vw", ratio: "3 / 2",
        alt: "Untersicht: Teleskopkran ragt neben einem Wohnhausdach in die Krone eines großen, kahlen Laubbaums.",
      })}
    </a>
    <div class="feature-copy">
      <p class="protocol">Schwerpunkt</p>
      <h2 class="title">Spezial&shy;fällung</h2>
      <p class="prose muted">Bäume direkt an Gebäuden, über Dächern, in engen Gärten: stückweises Abtragen mit Seilklettertechnik — je nach Lage mit Hubsteiger oder Autokran-Unterstützung.</p>
      <a class="textlink" href="/spezialfaellung/">Wie wir schwierige Fällungen angehen →</a>
    </div>
  </div>

  <div class="register" role="list">
    <div class="register-row" role="listitem">
      <span class="reg-name">Baumfällung</span>
      <span class="reg-desc">Kontrollierte Fällung, wenn ein Baum nicht mehr standsicher ist oder weichen muss — inklusive Beratung zu Genehmigungen.</span>
      <span class="reg-meta">Seilklettertechnik · Abtrag in Sektionen</span>
      <span class="reg-arrow" aria-hidden="true">→</span>
    </div>
    <div class="register-row" role="listitem">
      <span class="reg-name">Baumpflege</span>
      <span class="reg-desc">Kronenpflege und Totholzentfernung — geschnitten wird, was dem Baum nützt, nach ZTV-Baumpflege.</span>
      <span class="reg-meta">Erhalt vor Eingriff</span>
      <span class="reg-arrow" aria-hidden="true">→</span>
    </div>
    <div class="register-row" role="listitem">
      <span class="reg-name">Wurzelstockfräsen</span>
      <span class="reg-desc">Stümpfe raus, Fläche nutzbar — die Fräse kommt laut bisheriger Praxis durch Zugänge ab rund 90 cm.</span>
      <span class="reg-meta">Durchfahrt ab ca. 90 cm</span>
      <span class="reg-arrow" aria-hidden="true">→</span>
    </div>
    <div class="register-row" role="listitem">
      <span class="reg-name">Heckenschnitt &amp; Grundstück</span>
      <span class="reg-desc">Form- und Rückschnitt, saubere Kanten, Schnittgut geräumt.</span>
      <span class="reg-meta">Privat &amp; Gewerbe</span>
      <span class="reg-arrow" aria-hidden="true">→</span>
    </div>
    <div class="register-row" role="listitem">
      <span class="reg-name">Rollrasen</span>
      <span class="reg-desc">Vorbereitung und Verlegung, wenn eine Fläche schnell wieder grün sein soll — auch nach Fällung und Fräsung.</span>
      <span class="reg-meta">Anschluss an Baumarbeiten</span>
      <span class="reg-arrow" aria-hidden="true">→</span>
    </div>
  </div>
</section>

<!-- ============ AKT II — BEWEIS ============ -->
<section class="section dark" aria-labelledby="beweis-h">
  <div class="shell stack-3">
    ${protocol('Arbeit zeigt mehr als ein Versprechen', { id: "beweis-h", h: 2 })}
    <div class="evidence evidence--portrait mt-4">
      <div class="ev-media plate">
        ${img({
          master: "V-05", slot: "maschinenflug", widths: [720],
          sizes: "(min-width: 64rem) 55vw, 100vw",
          alt: "Ein Minidumper hängt am Kranhaken und wird über das Dach eines Wohnhauses in den Garten gehoben.",
        })}
        <span class="credit">Standbild · Einsatzdokumentation</span>
      </div>
      <div class="ev-copy">
        <h2 class="title">Wenn die Maschine übers Haus muss</h2>
        <p class="prose muted">Kein Zugang für Fahrzeuge? Dann fliegt die Technik. Was nach Ausnahme aussieht, ist geplante Logistik: Lasten, Wege und Sicherung sind vorher festgelegt.</p>
        <div class="ev-beats">
          <div class="ev-beat"><span class="b-key">Zugang</span><span class="b-val">Enges Wohngrundstück — Technik per Autokran-Unterstützung über das Gebäude gehoben.</span></div>
          <div class="ev-beat"><span class="b-key">Sicherung</span><span class="b-val">Anschlagpunkte und Lastweg vor dem Hub festgelegt, Bereich unten geräumt.</span></div>
          <div class="ev-beat"><span class="b-key">Abtrag</span><span class="b-val">Krone und Stamm in Sektionen — nichts fällt frei.</span></div>
        </div>
        <a class="textlink" href="/projekte/winterfaellung-am-wohnhaus/">Einen Einsatz im Detail ansehen →</a>
      </div>
    </div>

    <div class="evidence evidence--flip mt-4">
      <div class="ev-media plate">
        ${img({
          master: "M-07", slot: "praezision", widths: [640, 960, 1440],
          sizes: "(min-width: 64rem) 55vw, 100vw",
          alt: "Ein abgetragenes Stammsegment hängt am Seil unmittelbar über Dachrinne und Hecke eines Wohnhauses, ein Arbeiter führt es.",
        })}
        <span class="credit">Einsatzdokumentation</span>
      </div>
      <div class="ev-copy">
        <h2 class="title">Zentimeter zählen erst am Haus</h2>
        <p class="prose muted">Zwischen Dachrinne und Hecke entscheidet die Seilführung. Jedes Segment wird gehalten, geführt und abgelegt — Gebäude und Bepflanzung bleiben, wie sie sind.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ DOKUMENTARISCHE STILLE ============ -->
<section class="silence" aria-label="Einsatzfoto: Kletterer in großer Baumkrone">
  ${img({
    master: "M-09", slot: "silence", widths: [640, 960, 1600],
    sizes: "100vw",
    alt: "Silhouette eines Baumkletterers hoch in einer weit verzweigten, kahlen Krone vor bedecktem Himmel.",
  })}
  <p class="protocol">Kronenarbeit · Zollernalb</p>
</section>

<!-- ============ AKT III — MENSCH ============ -->
<section class="section shell" aria-labelledby="mensch-h">
  <div class="human">
    <div class="hu-plate plate">
      ${img({
        master: "V-06", slot: "stiefel-seil", widths: [720],
        sizes: "(min-width: 64rem) 30vw, 100vw",
        alt: "Blick aus der Ego-Perspektive eines Kletterers auf die eigenen Stiefel und das rote Sicherungsseil auf einem Ast.",
      })}
      <span class="credit">Standbild · Kletterperspektive</span>
    </div>
    <div class="hu-copy">
      <p class="protocol" id="mensch-h">Inhabergeführt — <span class="leaf">Florian Stuck</span></p>
      <h2 class="monument">Verantwortung beginnt vor dem ersten Schnitt.</h2>
      <p class="lead muted">Wer oben im Baum hängt, entscheidet nicht spontan. Besichtigung, Einschätzung und ein klarer Plan gehören zu jedem Auftrag — erst dann startet die Säge. Im Zollernalbkreis heißt das: kurze Wege, ein Ansprechpartner, ein Wort gilt.</p>
    </div>
  </div>
</section>

<!-- ============ AKT IV — AKTION ============ -->
<section class="section shell" aria-labelledby="prozess-h">
  ${protocol('Ablauf', { id: "prozess-h", h: 2 })}
  <div class="steps mt-4">
    <div class="step">
      <span class="st-key">Kontakt</span>
      <h3>Anfrage</h3>
      <p>Kurz beschreiben, worum es geht — gern mit Foto. Telefonisch oder über das Formular.</p>
    </div>
    <div class="step">
      <span class="st-key">Vor Ort</span>
      <h3>Besichtigung</h3>
      <p>Baum, Zugang und Umfeld werden vor Ort eingeschätzt. Danach steht fest, welche Technik passt.</p>
    </div>
    <div class="step">
      <span class="st-key">Einsatz</span>
      <h3>Ausführung</h3>
      <p>Abgesprochener Termin, gesicherter Ablauf, aufgeräumtes Grundstück bei Übergabe.</p>
    </div>
  </div>
</section>

<section class="section dark" aria-labelledby="aktion-h">
  <div class="shell action">
    <p class="protocol" id="aktion-h">Kontakt</p>
    <h2 class="monument">Was steht bei Ihnen an?</h2>
    <div class="action-ways">
      <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
      <a class="cta cta--solid" href="/kontakt/">Anfrage mit Foto senden</a>
      <a class="textlink" href="mailto:${FS.email}">${FS.email}</a>
    </div>
  </div>
</section>`;

  return {
    route: "",
    html: pageShell({
      title: "FS Baumservice — Baumfällung & Baumpflege im Zollernalbkreis",
      desc: "Spezialfällung, Baumpflege, Wurzelstockfräsen: FS Baumservice arbeitet mit Seilklettertechnik und passender Technik in Bisingen, Balingen, Hechingen und Umgebung.",
      path: "/",
      current: "/",
      body,
    }),
  };
}
