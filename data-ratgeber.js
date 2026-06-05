export const ratgeberHtml = `
  <section class="app-section" style="padding-top: 120px;">
    <div style="max-width: 900px; margin: 0 auto;">
      <h1 class="app-section-title" style="color:var(--white);">Preise, Ratgeber & <span class="lime-text">Baum-Lexikon</span></h1>
      <p class="lead-text" style="margin-bottom: 50px;">Transparenz ist uns wichtig. Hier erfahren Sie alles über Kosten, Verordnungen und erkennen häufige Baumkrankheiten frühzeitig.</p>
      
      <!-- Preise & Kosten -->
      <div style="background: rgba(22, 24, 34, 0.8); border: 1px solid var(--glass-border); padding: 40px; border-radius: var(--radius); margin-bottom: 40px;">
        <h2 style="color:var(--lime-500); font-size: 1.8rem; margin-bottom: 20px;">Was kostet eine Baumfällung?</h2>
        <p style="color:var(--text-muted); font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">
          Jeder Baum ist einzigartig. Deshalb gibt es bei professionellen Baumdiensten keine seriösen Pauschalpreise ohne vorherige Besichtigung. Die Kosten setzen sich aus folgenden Faktoren zusammen:
        </p>
        <ul class="sdc-bullets" style="grid-template-columns: 1fr; margin-bottom: 20px;">
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> <strong style="color:var(--white);">Höhe und Kronendurchmesser:</strong> Bestimmt den Zeitaufwand.</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> <strong style="color:var(--white);">Standort & Zugänglichkeit:</strong> Steht der Baum frei, oder müssen wir über Hausdächer abseilen? Passt ein Hubsteiger oder ist Seilklettertechnik (SKT) nötig?</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> <strong style="color:var(--white);">Entsorgung:</strong> Wünschen Sie den kompletten Abtransport von Stamm und Ästen?</li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> <strong style="color:var(--white);">Wurzelstock:</strong> Soll der Stumpf gefräst werden?</li>
        </ul>
        <div style="background: rgba(169, 209, 94, 0.1); padding: 20px; border-radius: var(--radius-sm); border-left: 4px solid var(--lime-500);">
          <strong style="color:var(--white);">Unser Versprechen:</strong> Nach einer kostenfreien Erstbesichtigung (auch digital per Foto/Video) erhalten Sie ein transparentes Angebot ohne versteckte Kosten.
        </div>
      </div>

      <!-- Gesetzliches -->
      <div style="background: rgba(22, 24, 34, 0.8); border: 1px solid var(--glass-border); padding: 40px; border-radius: var(--radius); margin-bottom: 40px;">
        <h2 style="color:var(--lime-500); font-size: 1.8rem; margin-bottom: 20px;">Gesetze & Verordnungen</h2>
        <h4 style="color:var(--white); margin-bottom: 10px;">Die Vogelbrutzeit (1. März bis 30. September)</h4>
        <p style="color:var(--text-muted); font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">
          Nach dem Bundesnaturschutzgesetz (§ 39 BNatSchG) ist es verboten, in diesem Zeitraum Bäume, Hecken oder Sträucher stark zurückzuschneiden oder zu fällen. 
          <br><strong style="color:var(--white);">Ausnahmen:</strong> Gefahr im Verzug (z.B. nach einem Sturm) oder mit behördlicher Sondergenehmigung. Form- und Pflegeschnitte sind erlaubt, sofern keine Nester gestört werden. Wir beraten Sie hierzu gerne!
        </p>
        <h4 style="color:var(--white); margin-bottom: 10px;">Baumschutzsatzung Bisingen / Zollernalbkreis</h4>
        <p style="color:var(--text-muted); font-size: 1.1rem; line-height: 1.8;">
          Viele Gemeinden haben eigene Baumschutzsatzungen, die bestimmte Baumarten ab einem gewissen Stammumfang unter Schutz stellen. Wir klären für Sie im Vorfeld, ob eine Genehmigung erforderlich ist und helfen bei der Antragstellung.
        </p>
      </div>

      <!-- Baumlexikon -->
      <div style="background: rgba(22, 24, 34, 0.8); border: 1px solid var(--glass-border); padding: 40px; border-radius: var(--radius);">
        <h2 style="color:var(--lime-500); font-size: 1.8rem; margin-bottom: 20px;">Das FS Baumlexikon & Krankheiten</h2>
        <p style="color:var(--text-muted); font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px;">
          Erkennen Sie Gefahren frühzeitig. Ein kranker Baum kann bei Unwetter zur tödlichen Gefahr werden. Achten Sie auf diese Warnsignale:
        </p>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: var(--radius-sm); border-left: 3px solid #ff4d4d;">
            <h4 style="color:var(--white); font-size: 1.2rem; margin-bottom: 10px;">1. Eschentriebsterben</h4>
            <p style="color:var(--text-muted); line-height: 1.6;"><strong>Symptome:</strong> Welke Blätter, absterbende Triebspitzen, dunkle Rindennekrosen.<br><strong>Gefahr:</strong> Der Baum verliert extrem schnell seine Standfestigkeit. Die Wurzeln faulen oft unbemerkt. Es herrscht akute Bruchgefahr! Fällungen von befallenen Eschen sind besonders gefährlich und erfordern höchste Expertise.</p>
          </div>
          
          <div style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: var(--radius-sm); border-left: 3px solid #ff4d4d;">
            <h4 style="color:var(--white); font-size: 1.2rem; margin-bottom: 10px;">2. Borkenkäfer (Buchdrucker & Kupferstecher)</h4>
            <p style="color:var(--text-muted); line-height: 1.6;"><strong>Symptome:</strong> Bohrmehl am Stammfuß, Harzfluss, sich ablösende Rinde, rote Kronen bei Fichten.<br><strong>Handlung:</strong> Schnelles Eingreifen ist Pflicht, um den umliegenden Baumbestand zu schützen. Der Baum muss zeitnah gefällt und fachgerecht entsorgt werden.</p>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: var(--radius-sm); border-left: 3px solid #ff9900;">
            <h4 style="color:var(--white); font-size: 1.2rem; margin-bottom: 10px;">3. Rußrindenkrankheit (Ahorn)</h4>
            <p style="color:var(--text-muted); line-height: 1.6;"><strong>Symptome:</strong> Schwarzer, rußartiger Belag unter der abplatzenden Rinde.<br><strong>Gefahr:</strong> Die Sporen sind stark gesundheitsgefährdend für den Menschen (Atemwege). Die Fällung darf nur unter Vollschutz erfolgen!</p>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: var(--radius-sm); border-left: 3px solid var(--lime-500);">
            <h4 style="color:var(--white); font-size: 1.2rem; margin-bottom: 10px;">4. Pilzbefall (Brandkrustenpilz, Hallimasch)</h4>
            <p style="color:var(--text-muted); line-height: 1.6;"><strong>Symptome:</strong> Pilzfruchtkörper am Stammfuß oder an den Wurzelanläufen.<br><strong>Gefahr:</strong> Zersetzt das Holz von innen (Weiß- oder Braunfäule). Der Baum sieht oft noch grün aus, ist aber statisch nicht mehr sicher. Hier ist eine genaue Baumkontrolle unabdingbar.</p>
          </div>
        </div>
      </div>

      <!-- Weitere Schädlinge -->
      <div style="background: rgba(22, 24, 34, 0.8); border: 1px solid var(--glass-border); padding: 40px; border-radius: var(--radius); margin-top: 40px;">
        <h2 style="color:var(--lime-500); font-size: 1.8rem; margin-bottom: 20px;">Weitere Schädlinge & Gefahren</h2>
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: var(--radius-sm); border-left: 3px solid #ff9900;">
            <h4 style="color:var(--white); font-size: 1.2rem; margin-bottom: 10px;">Eichenprozessionsspinner</h4>
            <p style="color:var(--text-muted); line-height: 1.6;"><strong>Symptome:</strong> Gespinstnester an Eichenstämmen, kahle Äste im Frühling.<br><strong>Gefahr:</strong> Brennhaare der Raupen lösen starke Haut- und Atemwegsreizungen aus. Nester nicht selbst entfernen — Fachbetrieb beauftragen. Oft auf Spielplätzen oder Parkbäumen.</p>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: var(--radius-sm); border-left: 3px solid var(--lime-500);">
            <h4 style="color:var(--white); font-size: 1.2rem; margin-bottom: 10px;">Kastanienminiermotte</h4>
            <p style="color:var(--text-muted); line-height: 1.6;"><strong>Symptome:</strong> Braune Minen in Rosskastanienblättern, vorzeitiger Laubabfall ab Juli.<br><strong>Handlung:</strong> Kein direkter Holzschaden, aber wiederholter Befall schwächt den Baum langfristig. Falllaub sorgfältig entfernen und nicht kompostieren.</p>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: var(--radius-sm); border-left: 3px solid var(--lime-500);">
            <h4 style="color:var(--white); font-size: 1.2rem; margin-bottom: 10px;">Stadtbaumstress / Trockenschäden</h4>
            <p style="color:var(--text-muted); line-height: 1.6;"><strong>Symptome:</strong> Kronenverlichtung, frühzeitiger Laubabwurf, Rissbildung in der Rinde.<br><strong>Handlung:</strong> Regelmäßige Baumpflege und gezielte Kronenpflege stärken den Baum. Bei verdächtigen Rissen oder totem Holz sofort kontrollieren lassen.</p>
          </div>
        </div>
      </div>

      <!-- Saisonkalender -->
      <div style="background: rgba(22, 24, 34, 0.8); border: 1px solid var(--glass-border); padding: 40px; border-radius: var(--radius); margin-top: 40px;">
        <h2 style="color:var(--lime-500); font-size: 1.8rem; margin-bottom: 20px;">Saisonkalender: Wann was tun?</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
          <div style="background: rgba(255,255,255,0.04); padding: 24px; border-radius: var(--radius-sm); border-top: 3px solid #7ec8e3;">
            <h4 style="color:var(--white); margin-bottom:12px;">Frühling (März–Mai)</h4>
            <ul style="color:var(--text-muted); line-height:2; padding-left:18px; margin:0;">
              <li>Kronenpflege &amp; Formschnitt</li>
              <li>Totholzentfernung</li>
              <li>Baumkontrolle nach Winter</li>
              <li>Rollrasen verlegen</li>
            </ul>
          </div>
          <div style="background: rgba(255,255,255,0.04); padding: 24px; border-radius: var(--radius-sm); border-top: 3px solid var(--lime-500);">
            <h4 style="color:var(--white); margin-bottom:12px;">Sommer (Juni–Aug)</h4>
            <ul style="color:var(--text-muted); line-height:2; padding-left:18px; margin:0;">
              <li>Heckenschnitt (nach Brut)</li>
              <li>Trockenstress beobachten</li>
              <li>Borkenkäferkontrolle</li>
              <li>Notfälle / Sturmschäden</li>
            </ul>
          </div>
          <div style="background: rgba(255,255,255,0.04); padding: 24px; border-radius: var(--radius-sm); border-top: 3px solid #e8a838;">
            <h4 style="color:var(--white); margin-bottom:12px;">Herbst (Sept–Nov)</h4>
            <ul style="color:var(--text-muted); line-height:2; padding-left:18px; margin:0;">
              <li>Baumfällung (beste Zeit)</li>
              <li>Wurzelstockfräsen</li>
              <li>Pflanzloch vorbereiten</li>
              <li>Kronenpflege vor Winter</li>
            </ul>
          </div>
          <div style="background: rgba(255,255,255,0.04); padding: 24px; border-radius: var(--radius-sm); border-top: 3px solid #aaaacc;">
            <h4 style="color:var(--white); margin-bottom:12px;">Winter (Dez–Feb)</h4>
            <ul style="color:var(--text-muted); line-height:2; padding-left:18px; margin:0;">
              <li>Planung &amp; Beratung</li>
              <li>Sicherheitsprüfung</li>
              <li>Sturmschäden beheben</li>
              <li>Fällungen (laubfreie Sicht)</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Baumkunde Zollernalb -->
      <div style="background: rgba(22, 24, 34, 0.8); border: 1px solid var(--glass-border); padding: 40px; border-radius: var(--radius); margin-top: 40px; margin-bottom: 60px;">
        <h2 style="color:var(--lime-500); font-size: 1.8rem; margin-bottom: 10px;">Heimische Baumarten im Zollernalb</h2>
        <p style="color:var(--text-muted); margin-bottom:28px; line-height:1.7;">Diese Arten sind in Gärten und Wäldern rund um Bisingen, Balingen und Hechingen besonders häufig.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
          <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:var(--radius-sm); border-left:3px solid var(--lime-500);"><h4 style="color:var(--white); font-size:1rem; margin-bottom:8px;">Rotbuche (Fagus sylvatica)</h4><p style="color:var(--text-muted); font-size:0.9rem; line-height:1.65; margin:0;">Dominierender Waldbaum der Region. Kann 30+ m hoch werden. Starke Wurzeln — Fällungen erfordern oft Seilklettertechnik.</p></div>
          <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:var(--radius-sm); border-left:3px solid #e8a838;"><h4 style="color:var(--white); font-size:1rem; margin-bottom:8px;">Stieleiche (Quercus robur)</h4><p style="color:var(--text-muted); font-size:0.9rem; line-height:1.65; margin:0;">Langlebig, bis 500 Jahre. Hartes Holz. Häufig Eichenprozessionsspinner-Befall — regelmäßig kontrollieren.</p></div>
          <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:var(--radius-sm); border-left:3px solid #ff9900;"><h4 style="color:var(--white); font-size:1rem; margin-bottom:8px;">Gemeine Fichte (Picea abies)</h4><p style="color:var(--text-muted); font-size:0.9rem; line-height:1.65; margin:0;">Häufig in Forsten, anfällig für Borkenkäfer besonders nach Trockenheit. Bei Befall schnelles Handeln nötig.</p></div>
          <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:var(--radius-sm); border-left:3px solid var(--lime-500);"><h4 style="color:var(--white); font-size:1rem; margin-bottom:8px;">Hängebirke (Betula pendula)</h4><p style="color:var(--text-muted); font-size:0.9rem; line-height:1.65; margin:0;">Schnellwüchsig, leichtes Holz. Neigt zu Totastverlust bei Trockenheit. Regelmäßige Kroneninspektion empfohlen.</p></div>
          <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:var(--radius-sm); border-left:3px solid #ff4d4d;"><h4 style="color:var(--white); font-size:1rem; margin-bottom:8px;">Bergahorn (Acer pseudoplatanus)</h4><p style="color:var(--text-muted); font-size:0.9rem; line-height:1.65; margin:0;">Häufig in Gärten und Ortschaften. Achtung: anfällig für Rußrindenkrankheit — bei schwarzem Rindenpilz sofort Fachbetrieb rufen.</p></div>
          <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:var(--radius-sm); border-left:3px solid #e8a838;"><h4 style="color:var(--white); font-size:1rem; margin-bottom:8px;">Rosskastanie (Aesculus hippocastanum)</h4><p style="color:var(--text-muted); font-size:0.9rem; line-height:1.65; margin:0;">Beliebter Park- und Gartenbaum. Typisch befallen von Kastanienminiermotte. Auf Stammfäule am Fuß achten.</p></div>
        </div>
      </div>

    </div>
  </section>
`;
