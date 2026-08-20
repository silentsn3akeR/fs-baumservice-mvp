import { pageShell, img, protocol, FS } from "../lib.mjs";

export async function render() {
  const body = `
<section class="page-hero dark">
  <div class="hero-media">
    ${img({
      master: "M-03", slot: "monument", widths: [640, 960, 1440, 1920],
      sizes: "100vw", eager: true,
      alt: "Untersicht: ausgefahrener Teleskopkran neben einem Wohnhausdach, darüber die Krone eines großen, kahlen Laubbaums.",
    })}
  </div>
  <div class="hero-inner shell">
    <p class="protocol hero-protocol"><span class="leaf">Spezialfällung</span>&nbsp;· Arbeiten am Gebäude · beengte Lagen</p>
    <h1 class="monument hero-headline">Die Situation<br>bestimmt<br>die Technik.</h1>
    <div class="hero-foot">
      <div class="hero-facts">
        <span class="fact">Seilklettertechnik</span>
        <span class="fact">Hubarbeitsbühne</span>
        <span class="fact">Autokran-Unterstützung <span class="chip">Partner</span></span>
      </div>
      <a class="cta cta--solid" href="/kontakt/">Situation schildern</a>
    </div>
  </div>
</section>

<section class="section shell" aria-labelledby="spezialfall-h">
  ${protocol('Wann ist eine Fällung ein Spezialfall?', { id: "spezialfall-h", h: 2 })}
  <div class="grid grid--12 mt-4">
    <div style="grid-column: span 7" class="stack-3">
      <p class="lead">Sobald ein Baum nicht frei fallen darf, wird aus einer Fällung eine Rückbau-Aufgabe: Die Krone wird gesichert, Stück für Stück abgetragen und jedes Segment kontrolliert abgelassen.</p>
      <p class="prose muted">Typische Lagen aus unserer Arbeit: Bäume unmittelbar an Häusern, Kronen über Dächern und Einfahrten, dicht bewachsene Gärten, Grundstücke ohne Maschinenzugang — oder Bäume, die nach Sturm oder Krankheit nicht mehr standsicher sind.</p>
    </div>
    <div style="grid-column: span 5" class="plate">
      ${img({
        master: "M-04", slot: "scale", widths: [640, 960, 1440],
        sizes: "(min-width: 64rem) 38vw, 100vw", ratio: "4 / 3",
        alt: "Weite Aufnahme eines hohen, kahlen Baums; klein in der Krone ist ein Kletterer zu erkennen.",
      })}
      <span class="credit">Einsatzdokumentation</span>
    </div>
  </div>
</section>

<section class="section dark" aria-labelledby="methode-h">
  <div class="shell stack-3">
    ${protocol('Methode — drei Werkzeuge, ein Prinzip', { id: "methode-h", h: 2 })}
    <div class="evidence mt-4">
      <div class="ev-media plate">
        ${img({
          master: "M-05", slot: "action", widths: [640, 960, 1440],
          sizes: "(min-width: 64rem) 55vw, 100vw",
          alt: "Kletterer hoch in einer kahlen Krone; ein abgetrenntes Kronenstück fällt kontrolliert neben dem Stamm ab.",
        })}
        <span class="credit">Einsatzdokumentation</span>
      </div>
      <div class="ev-copy">
        <h2 class="title">Seilkletter&shy;technik</h2>
        <p class="prose muted">Der direkte Weg in die Krone — ohne schweres Gerät im Garten. Gesichert am Doppelseil wird die Krone von oben nach unten abgetragen; Schnittgrößen richten sich nach Ablassweg und Gewicht.</p>
        <div class="ev-beats">
          <div class="ev-beat"><span class="b-key">Wofür</span><span class="b-val">Enge Grundstücke, empfindliche Gärten, Bäume direkt am Gebäude.</span></div>
          <div class="ev-beat"><span class="b-key">Prinzip</span><span class="b-val">Jedes Stück hängt am Seil, bevor es geschnitten wird — nichts fällt frei.</span></div>
        </div>
      </div>
    </div>

    <div class="evidence evidence--portrait evidence--flip mt-4">
      <div class="ev-media plate">
        ${img({
          master: "V-05", slot: "kronenflug", widths: [720],
          sizes: "(min-width: 64rem) 38vw, 100vw",
          alt: "Eine komplette Baumkrone hängt am Kranhaken und schwebt über Hausdächern.",
        })}
        <span class="credit">Standbild · Einsatzdokumentation</span>
      </div>
      <div class="ev-copy">
        <h2 class="title">Kran &amp; Hub&shy;technik</h2>
        <p class="prose muted">Wenn Lasten zu groß oder Wege zu weit sind, kommt Technik dazu: Hubarbeitsbühne für die Arbeitsposition, Autokran-Unterstützung für ganze Kronenteile — koordiniert mit erfahrenen Kranpartnern.&nbsp;<span class="chip chip--leaf">Partnertechnik</span></p>
        <div class="ev-beats">
          <div class="ev-beat"><span class="b-key">Wofür</span><span class="b-val">Große Kronen, kurze Sperrzeiten, Lasten über Dächern.</span></div>
          <div class="ev-beat"><span class="b-key">Prinzip</span><span class="b-val">Heben statt werfen: Segmente gehen am Haken aus der Krone.</span></div>
        </div>
      </div>
    </div>

    <div class="evidence mt-4">
      <div class="ev-media plate">
        ${img({
          master: "M-07", slot: "praezision", widths: [640, 960, 1440],
          sizes: "(min-width: 64rem) 55vw, 100vw",
          alt: "Stammsegment am Seil dicht über Dachrinne und Hecke, von einem Arbeiter geführt.",
        })}
        <span class="credit">Einsatzdokumentation</span>
      </div>
      <div class="ev-copy">
        <h2 class="title">Ablassen &amp; Räumen</h2>
        <p class="prose muted">Die letzte Etappe entscheidet über den Eindruck, den ein Einsatz hinterlässt: geführtes Ablassen zwischen Dachrinne und Hecke, sauberes Aufarbeiten, auf Wunsch die umweltgerechte Entsorgung von Schnittgut und Stammholz.</p>
      </div>
    </div>
  </div>
</section>

<section class="section shell" aria-labelledby="einsatz-h">
  ${protocol('Acht Sekunden am Seil — <span class="leaf">aus der Ego-Perspektive</span>', { id: "einsatz-h", h: 2 })}
  <div class="evidence evidence--portrait mt-4">
    <div class="ev-media vchapter">
      <div class="plate">
        <video playsinline muted loop preload="none"
          poster="/media/V-06__pov-daecher__720.jpg"
          aria-label="Kurzer Einsatz-Clip aus der Kletterperspektive: Blick über Dächer, dann auf Stiefel und Sicherungsseil auf einem Ast.">
          <source src="/media/V-06__pov-loop.mp4" type="video/mp4">
        </video>
        <div class="vc-dim" aria-hidden="true"></div>
        <span class="vc-fzone" aria-hidden="true"></span>
        <img class="vc-punch" src="/media/V-06__bootspunch__720.webp" alt="" loading="lazy" decoding="async" aria-hidden="true">
        <div class="vc-overlay"><p></p></div>
        <span class="credit">Einsatz-Clip · ohne Ton</span>
      </div>
      <div class="vc-chapters" role="group" aria-label="Clip-Kapitel">
        <button type="button" data-t="1.0" data-zone="30,26" data-text="Arbeitsposition über den Dächern — dokumentiert aus der Ego-Perspektive." aria-pressed="false">Über den Dächern</button>
        <button type="button" data-t="5.2" data-zone="38,55" data-punch="true" data-text="Gesichert auf dem Ast: Tritt, Gurt und Seilführung greifen ineinander." aria-pressed="false">Tritt &amp; Seil</button>
        <button type="button" data-resume="true" aria-pressed="false">▶ Weiter</button>
      </div>
    </div>
    <div class="ev-copy">
      <h2 class="title">So nah ist sonst niemand dran</h2>
      <p class="prose muted">Die Kamera läuft bei uns am Helm mit. Nicht für die Show — die Aufnahmen dokumentieren Seilführung und Arbeitswege und machen nachvollziehbar, wie kontrolliert Kronenarbeit abläuft. Zwei Momente aus einem echten Einsatz, zum Anhalten und Nachschauen.</p>
      <div class="ev-beats">
        <div class="ev-beat"><span class="b-key">Anhalten</span><span class="b-val">Kapitel wählen — der Clip friert am passenden Moment ein und erklärt, was zu sehen ist.</span></div>
        <div class="ev-beat"><span class="b-key">Hinweis</span><span class="b-val">Clip lädt erst beim Erreichen der Sektion; ohne Bewegtbild-Wunsch bleibt das Standbild.</span></div>
      </div>
    </div>
  </div>
</section>

<section class="section shell" aria-labelledby="technik-h" style="padding-top:0">
  ${protocol('Technik-Register', { id: "technik-h", h: 2 })}
  <div class="mt-4">
    <div class="tech-row">
      <span class="t-name">Seilklettertechnik</span>
      <span class="t-desc">Doppelseilgesicherte Kronenarbeit — Zugang ohne Maschinen, baumschonend.</span>
      <span class="chip chip--leaf">Kernkompetenz</span>
    </div>
    <div class="tech-row">
      <span class="t-name">Hubarbeitsbühne</span>
      <span class="t-desc">Stabile Arbeitsposition, wo Zufahrt und Platz es erlauben.</span>
      <span class="chip">nach Situation</span>
    </div>
    <div class="tech-row">
      <span class="t-name">Autokran</span>
      <span class="t-desc">Für ganze Kronenteile und Lasten über Gebäuden — im Verbund mit regionalen Kranpartnern.</span>
      <span class="chip">Partnertechnik</span>
    </div>
    <div class="tech-row">
      <span class="t-name">Wurzelfräse</span>
      <span class="t-desc">Entfernt Stümpfe nach der Fällung; Durchfahrt ab rund 90 cm laut bisheriger Praxis.</span>
      <span class="chip">eigene Technik*</span>
    </div>
  </div>
  <p class="muted mt-4" style="font-size:.78rem">* Angabe aus der bisherigen Website des Betriebs.</p>
</section>

<section class="section dark" aria-labelledby="cta2-h">
  <div class="shell action">
    <p class="protocol" id="cta2-h">Nächster Schritt</p>
    <h2 class="monument" style="font-size:clamp(1.9rem,5vw,4.4rem)">Schildern Sie uns die Lage.</h2>
    <p class="lead muted">Ein Foto und drei Sätze reichen für eine erste Einschätzung — die Besichtigung vor Ort klärt den Rest.</p>
    <div class="action-ways">
      <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
      <a class="cta cta--solid" href="/kontakt/">Anfrage stellen</a>
    </div>
  </div>
</section>`;

  return {
    route: "spezialfaellung",
    html: pageShell({
      title: "Spezialfällung — Bäume an Gebäuden sicher abtragen | FS Baumservice",
      desc: "Spezialfällung im Zollernalbkreis: Seilklettertechnik, Hubarbeitsbühne und Autokran-Unterstützung für Bäume an Häusern, über Dächern und in beengten Lagen.",
      path: "/spezialfaellung/",
      current: "/spezialfaellung/",
      body,
    }),
  };
}
