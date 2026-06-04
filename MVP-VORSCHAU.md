# MVP-Vorschau fuer FS Baumservice

Ziel: Die neue Website morgen dem Inhaber zeigen, ohne die offizielle Domain anzufassen.

## Empfehlung fuer morgen

### Variante A: Netlify Drop, schnell und stabil

Gut, wenn die Vorschau ausserhalb deines WLANs auf Handy/Laptop erreichbar sein soll.

1. Ordner `C:\Users\s\Documents\Codex\2026-06-04\files-mentioned-by-the-user-fs` im Explorer oeffnen.
2. Auf https://app.netlify.com/drop gehen.
3. Den kompletten Ordner per Drag & Drop hochladen.
4. Netlify gibt eine temporäre URL aus, z. B. `https://name.netlify.app`.
5. Diese URL morgen zeigen.

Vorteil: kein GitHub noetig, keine Domain noetig, sehr schnell.

## Variante B: GitHub Pages

Gut, wenn du die Vorschau versionieren und spaeter weiterentwickeln willst.

Wichtig: GitHub Pages unter `https://BENUTZER.github.io/REPO/` braucht meist angepasste Pfade, weil die aktuelle MVP-Seite fuer Hosting direkt im Domain-Root gebaut ist.

Einfacher ist:

- GitHub-Repo erstellen
- spaeter Vercel, Netlify oder Cloudflare Pages mit dem Repo verbinden
- dort laeuft die Seite im Root, ohne Pfadprobleme

## Variante C: Lokaler Tunnel

Gut, wenn nichts hochgeladen werden soll.

1. Lokalen Server starten:

```powershell
python -m http.server 4173 --bind 0.0.0.0
```

2. Mit Cloudflare Tunnel oder ngrok eine temporäre URL erzeugen.
3. Der Rechner muss waehrend der Praesentation eingeschaltet und online bleiben.

## Was dem Inhaber gesagt werden sollte

- Das ist ein MVP / Design- und Inhaltsvorschlag.
- Die offizielle Domain bleibt unveraendert.
- Kontaktdaten, Impressum und Datenschutz muessen vor Livegang final geprueft werden.
- Projektbilder sind aus der aktuellen Website uebernommen.
- Es wurden keine Bewertungen, Zertifikate oder 24/7-Aussagen erfunden.
- Der interaktive Angebotsmodus kann als naechster Ausbauschritt eingebaut werden.

## Naechster Schritt nach Freigabe

1. Feedback vom Inhaber einarbeiten.
2. Interaktiven Anfrage-Assistenten bauen.
3. Formularversand sauber loesen, z. B. Formspree, Netlify Forms, Vercel Function oder eigenes Backend.
4. Offizielles Deployment planen: Hosting, HTTPS, Domain, Weiterleitungen, Sitemap, alte WordPress-URLs.
