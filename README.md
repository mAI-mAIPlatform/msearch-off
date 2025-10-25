# mEdge 2.0 — Electron + mSearch

Navigateur léger basé sur Electron avec **mSearch** par défaut, UI **Liquid Glass**, et packaging auto via **electron-builder**.

## Démarrer
```bash
npm install
npm start
```

## Builder (local)
```bash
npm run build
```
➡️ Sorties dans `dist/` (Windows `.exe`, macOS `.dmg`, Linux `.AppImage`/`.deb`).

## CI GitHub
Crée un tag `v1.0.0` puis push → builds auto pour les 3 OS, artefacts dans l’onglet **Actions**.

## Config
- URL par défaut : `src/renderer.js` → `MSEARCH`
- Icônes : `build/` (remplace `icon.png`, `icon.ico`, `icon.icns` si besoin)
- Nom app : `package.json` → `productName`