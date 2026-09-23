// Builds www/ for the Android app from the game (../index.html, the single source of truth).
//  - copies index.html
//  - swaps the Google Fonts link for the bundled copy of Outfit, so the app works offline
//    (LAN Versus on a phone hotspot has no internet)
// Run it through `npm run sync`, which then runs `npx cap sync android`.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, '..', 'index.html');
const www = path.join(root, 'www');

let html = fs.readFileSync(src, 'utf8');
const before = html;
html = html
  .replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*/i, '')
  .replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Outfit[^"]*" rel="stylesheet">/i,
           '<link rel="stylesheet" href="fonts/outfit.css">');
if (html === before) console.warn('Note: the Google Fonts link was not found; the app will use the system font.');

fs.mkdirSync(path.join(www, 'fonts'), { recursive: true });
fs.writeFileSync(path.join(www, 'index.html'), html);
for (const f of fs.readdirSync(path.join(root, 'web-extra', 'fonts'))) {
  fs.copyFileSync(path.join(root, 'web-extra', 'fonts', f), path.join(www, 'fonts', f));
}
console.log('www/ updated from ../index.html');
