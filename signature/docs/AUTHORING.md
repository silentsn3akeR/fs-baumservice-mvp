# FS Signature — Authoring & Wartung (ohne CMS, reproduzierbar)

Build: `node signature/build.mjs` → schreibt `signature/dist/`.
Medien: `python signature/pipeline/media_build.py` (deterministisch, Namensschema `<master>__<slot>__<breite>.<fmt>`).
Preview: Launch-Config `fs-signature` oder `python -m http.server 8814 --directory signature/dist`.
Gates: `pipeline/gate_renders.py <route> <name> <breiten…>` (Renders), `pipeline/audit_gates.py` (A11y/Gewicht).

## HOW TO: Projekt hinzufügen
1. Medien-Wahrheit zuerst: Master in `truth/media.json` registrieren (SHA, Inhalt, Szenen-Cluster, Rechte). Keine Projektvermischung — nur Medien desselben Einsatzes bündeln.
2. Derivate in `pipeline/media_build.py` (STILL_/CROP_/FRAME_JOBS) ergänzen, Pipeline laufen lassen.
3. `pages/projekt-<slug>.mjs` nach Vorbild `projekt-winterfaellung.mjs` (SITUATION→SICHERUNG→ABTRAG→ZWEITPERSPEKTIVE). Ortsangabe nur Regions-Granularität (C-016).
4. Seite in `build.mjs` `pages[]` registrieren, im `/projekte/`-Index verlinken.

## HOW TO: Claim ändern
`truth/claims.json` — Wert, `state` (FACT/SUPPORTED/OWNER_CONFIRM/UNVERIFIED/DO_NOT_PUBLISH), `source_refs`, Notiz. Seiten nutzen Kontakt-Wahrheit aus `lib.mjs FS` — dort nur ändern, wenn der Claim-Status es erlaubt. HEDGED_ONLY-Claims immer mit Herkunftshinweis rendern.

## HOW TO: Medium hinzufügen
Nur über die Registry (media.json) + Pipeline. Nie Dateien direkt in `dist/media/` legen. Irreführende Dateinamen: Inhalt zählt, im Register dokumentieren.

## HOW TO: Leistung ändern
`pages/<leistung>.mjs`. Charakter beachten (ATLAS_SURFACE_INTENT.json): Baumpflege bleibt leise, Spezialfällung monumental. Neue visuelle Regel nur, wenn wiederverwendbar oder signature-kritisch (Design-Entropie).

## HOW TO: Kontakt/Telefon ändern
`lib.mjs → FS` (eine Quelle). Impressum separat prüfen (C-004!). Danach `node build.mjs`.

## HOW TO: Technik/Equipment ändern
Nur mit Relations-Status (FS_OWNED/FS_OPERATED/PARTNER_EQUIPMENT/RENTAL/UNKNOWN) als Chip. Kran nie als FS-eigen darstellen (C-011).

## Release (Owner-Boundary)
`lib.mjs PREVIEW=false` entfernt noindex+Banner. Redirects laut `docs/SEO_RELAUNCH_PREP_V1.json`. P0-Blocker in `FINAL_PROGRESS_LEDGER.json` müssen vorher OWNER-bestätigt sein.
