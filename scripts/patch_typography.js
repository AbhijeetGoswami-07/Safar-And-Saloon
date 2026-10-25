const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 1. PATCH index.html
const htmlPath = path.join(root, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

if (!html.includes('family=Big+Shoulders+Display')) {
  const googleFontsSnippet = `  <!-- Google Fonts: Big Shoulders Display, Big Shoulders Text, Inter -->\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Big+Shoulders+Text:wght@700;800;900&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">\n\n`;
  html = html.replace(/<!-- Tailwind CSS CDN -->/, `${googleFontsSnippet}  <!-- Tailwind CSS CDN -->`);
}

// Add fontFamily to tailwind config
if (!html.includes("'big-shoulders'")) {
  html = html.replace(/extend:\s*\{/, `extend: {\n          fontFamily: {\n            'big-shoulders': ['"Big Shoulders Display"', '"Big Shoulders"', '"Big Shoulders Text"', 'Impact', 'sans-serif'],\n          },`);
}

// Update heroTitle
const oldH1Regex = /<h1 id="heroTitle"[^>]*>[\s\S]*?<\/h1>/;
const newH1 = `<h1 id="heroTitle" class="hero-title-headline font-big-shoulders select-none">\n      BUS DRIVER\n    </h1>`;
html = html.replace(oldH1Regex, newH1);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated index.html!');

// 2. PATCH css/styles.css
const cssPath = path.join(root, 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Ensure font import is at the absolute top
if (!css.startsWith('@import url(')) {
  css = `@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Big+Shoulders+Text:wght@700;800;900&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');\n\n` + css;
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully confirmed css/styles.css!');
