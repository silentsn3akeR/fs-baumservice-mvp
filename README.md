# FS Baumservice MVP

Statische MVP-Vorschau fuer den Relaunch von FS Baumservice.

Lokale Vorschau:

```powershell
node .\build-site.mjs
python -m http.server 4173
```

GitHub Pages Build fuer Projektpfad:

```powershell
$env:DEPLOY_BASE_PATH='/fs-baumservice-mvp'
$env:DEPLOY_BASE_URL='https://silentsn3akeR.github.io/fs-baumservice-mvp'
node .\build-site.mjs
```

