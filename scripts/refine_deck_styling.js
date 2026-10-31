const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const cssPath = path.join(root, 'css', 'styles.css');
const htmlPath = path.join(root, 'index.html');

let css = fs.readFileSync(cssPath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Update index.html shortcuts ribbon class
html = html.replace(
  'class="w-full flex items-center justify-center gap-x-4 gap-y-1.5 flex-wrap text-[11px] text-zinc-400 font-medium px-2 pt-1 select-none"',
  'class="playback-shortcuts-ribbon flex items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1.5 flex-wrap text-[11px] text-zinc-300 font-medium px-4 py-1.5 select-none mt-1"'
);
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('[SUCCESS] Updated shortcuts ribbon class in index.html');

// 2. Refine variables in css/styles.css
// Change Bus Driver --led-bar to amber and peak to red
css = css.replace('--led-bar: #10b981;', '--led-bar: #f59e0b;');
css = css.replace('--led-peak: #f59e0b;', '--led-peak: #ef4444;');

// Saloon variables: led-bar to teal, peak to gold
css = css.replace('body.theme-saloon {\n  --bg-core: #0c0908;', 'body.theme-saloon {\n  --bg-core: #0c0908;');
css = css.replace(
  '  --led-bar: #f59e0b;\n  --led-peak: #14b8a6;',
  '  --led-bar: #14b8a6;\n  --led-peak: #fbbf24;'
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('[SUCCESS] Refined theme variables in css/styles.css');
