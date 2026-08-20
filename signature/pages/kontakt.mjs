import { pageShell, protocol, FS } from "../lib.mjs";

export async function render() {
  const body = `
<section class="section shell" style="padding-top: calc(var(--space-5))">
  ${protocol('Kontakt &amp; Anfrage')}
  <div class="grid grid--12 mt-4">
    <div style="grid-column: span 7" class="stack-3">
      <h1 class="monument" style="font-size:clamp(2rem,5.5vw,4.8rem)">Was steht<br>bei Ihnen an?</h1>
      <p class="lead muted">Drei Sätze zur Situation genügen. Wenn Sie mögen, beschreiben Sie den Zugang — und ob der Baum an Gebäuden, Leitungen oder Nachbargrundstücken steht.</p>
    </div>
    <div style="grid-column: span 5" class="stack-2">
      <p class="protocol protocol--end">Direkt</p>
      <a class="phone-big" href="${FS.phoneHref}">${FS.phoneDisplay}</a>
      <a class="textlink" href="mailto:${FS.email}">${FS.email}</a>
      <p class="muted" style="font-size:var(--small)">${FS.legal}<br>Balinger Str. 59 · 72406 Bisingen-Steinhofen<br>${FS.region}</p>
    </div>
  </div>
</section>

<section class="section shell" aria-labelledby="flow-h" style="padding-top:0">
  ${protocol('Anfrage — <span class="leaf">dauert etwa zwei Minuten</span>', { id: "flow-h", h: 2 })}
  <form class="flow mt-4" id="anfrage" method="post" action="#">
    <fieldset>
      <legend><b>01</b> — Worum geht es?</legend>
      <div class="chips">
        <label><input type="radio" name="anliegen" value="Baumfällung" checked>Baumfällung</label>
        <label><input type="radio" name="anliegen" value="Baumpflege">Baumpflege</label>
        <label><input type="radio" name="anliegen" value="Wurzelstockfräsen">Wurzelstock</label>
        <label><input type="radio" name="anliegen" value="Heckenschnitt">Hecke &amp; Grundstück</label>
        <label><input type="radio" name="anliegen" value="Rollrasen">Rollrasen</label>
        <label><input type="radio" name="anliegen" value="Unklar">Noch unklar</label>
      </div>
    </fieldset>

    <fieldset>
      <legend><b>02</b> — Wie dringend?</legend>
      <div class="chips">
        <label><input type="radio" name="dringlichkeit" value="Akut">Akut — Baum droht zu fallen</label>
        <label><input type="radio" name="dringlichkeit" value="Zeitnah" checked>In den nächsten Wochen</label>
        <label><input type="radio" name="dringlichkeit" value="Beratung">Erst mal eine Einschätzung</label>
      </div>
    </fieldset>

    <fieldset>
      <legend><b>03</b> — Die Situation</legend>
      <div class="field">
        <label for="f-situation">Kurzbeschreibung</label>
        <textarea id="f-situation" name="situation" placeholder="Beispiel: Fichte, ca. 20 m, steht 3 m neben dem Haus. Zugang nur durch die Garageneinfahrt."></textarea>
        <span class="hint">Fotos helfen bei der Einschätzung — schicken Sie sie einfach nach dem Absenden per E-Mail oder WhatsApp mit.</span>
      </div>
    </fieldset>

    <fieldset>
      <legend><b>04</b> — Wo?</legend>
      <div class="field">
        <label for="f-ort">PLZ / Ort</label>
        <input id="f-ort" name="ort" type="text" autocomplete="postal-code" placeholder="z. B. 72406 Bisingen">
      </div>
    </fieldset>

    <fieldset>
      <legend><b>05</b> — Wie erreichen wir Sie?</legend>
      <div class="field">
        <label for="f-name">Name</label>
        <input id="f-name" name="name" type="text" autocomplete="name" required>
      </div>
      <div class="field">
        <label for="f-kontakt">Telefon oder E-Mail</label>
        <input id="f-kontakt" name="kontakt" type="text" autocomplete="tel" required>
      </div>
    </fieldset>

    <div class="action-ways">
      <button class="cta cta--solid" type="submit">Anfrage senden</button>
      <span class="muted" style="font-size:.78rem;max-width:24em">Öffnet Ihre E-Mail mit der fertigen Anfrage — es werden keine Daten auf dieser Website gespeichert.</span>
    </div>
  </form>
</section>

<section class="section dark" aria-labelledby="einzug-h">
  <div class="shell stack-3">
    <h2 class="protocol" id="einzug-h">Ablauf nach der Anfrage</h2>
    <div class="steps mt-4">
      <div class="step" style="border-color: var(--paper)">
        <span class="st-key">innerhalb kurzer Zeit</span>
        <h3>Rückmeldung</h3>
        <p>Kurze Einschätzung, ob und wie wir helfen können — telefonisch oder per Mail.</p>
      </div>
      <div class="step" style="border-color: var(--paper)">
        <span class="st-key">nach Absprache</span>
        <h3>Besichtigung</h3>
        <p>Blick auf Baum, Zugang und Umfeld — daraus entsteht ein klares Angebot.</p>
      </div>
      <div class="step" style="border-color: var(--paper)">
        <span class="st-key">zum Termin</span>
        <h3>Einsatz</h3>
        <p>Abgestimmter Ablauf, saubere Übergabe.</p>
      </div>
    </div>
  </div>
</section>`;

  return {
    route: "kontakt",
    html: pageShell({
      title: "Kontakt & Anfrage | FS Baumservice",
      desc: "Anfrage an FS Baumservice: Baumfällung, Baumpflege, Wurzelstockfräsen im Zollernalbkreis. Telefonisch oder mit dem Anfrage-Formular.",
      path: "/kontakt/",
      current: "/kontakt/",
      headerOnPaper: true,
      body,
    }),
  };
}
