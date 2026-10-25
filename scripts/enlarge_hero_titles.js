const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 1. UPDATE css/styles.css
const cssPath = path.join(root, 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const oldHeroCss = `.hero-title-headline {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding: 0 !important;
  font-family: 'Big Shoulders Display', 'Big Shoulders', 'Big Shoulders Text', 'Impact', sans-serif !important;
  font-weight: 900 !important;
  font-size: clamp(3.6rem, 8.5vw, 6.8rem) !important;
  line-height: 0.84 !important;
  letter-spacing: 0.04em !important;
  text-transform: uppercase !important;
  color: #ffffff !important;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.95), 0 8px 32px rgba(0, 0, 0, 0.9), 0 0 35px rgba(245, 158, 11, 0.35) !important;
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

body.theme-saloon .hero-title-headline {
  font-size: clamp(3.4rem, 8vw, 6.4rem) !important;
  letter-spacing: 0.05em !important;
  color: #fef3c7 !important;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.98), 0 8px 36px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 158, 11, 0.4), 0 0 10px rgba(20, 184, 166, 0.3) !important;
}`;

const newHeroCss = `.hero-title-headline {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding: 0 !important;
  font-family: 'Big Shoulders Display', 'Big Shoulders', 'Big Shoulders Text', 'Impact', sans-serif !important;
  font-weight: 900 !important;
  font-size: clamp(5.2rem, 13.5vw, 11.2rem) !important;
  line-height: 0.80 !important;
  letter-spacing: 0.045em !important;
  text-transform: uppercase !important;
  color: #ffffff !important;
  text-shadow: 0 6px 24px rgba(0, 0, 0, 0.98), 0 12px 48px rgba(0, 0, 0, 0.95), 0 0 50px rgba(245, 158, 11, 0.45) !important;
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  transition: color 0.3s ease, text-shadow 0.3s ease, font-size 0.25s ease;
}

body.theme-saloon .hero-title-headline {
  font-size: clamp(4.6rem, 11.8vw, 9.8rem) !important;
  letter-spacing: 0.05em !important;
  color: #fef3c7 !important;
  text-shadow: 0 6px 24px rgba(0, 0, 0, 0.98), 0 12px 48px rgba(0, 0, 0, 0.95), 0 0 50px rgba(245, 158, 11, 0.45), 0 0 20px rgba(20, 184, 166, 0.35) !important;
}`;

if (css.includes(oldHeroCss)) {
  css = css.replace(oldHeroCss, newHeroCss);
} else {
  // Regex fallback
  const heroRegex = /\.hero-title-headline\s*\{[\s\S]*?body\.theme-saloon\s+\.hero-title-headline\s*\{[\s\S]*?\}\s*\}/;
  css = css.replace(heroRegex, newHeroCss);
}

// Also increase mode switcher button font size
css = css.replace('font-size: 13px;', 'font-size: 14px;');

fs.writeFileSync(cssPath, css, 'utf8');
console.log('1. Updated css/styles.css with massive Big Shoulders display font size!');

// 2. UPDATE index.html with v=2.6 cache busting
const htmlPath = path.join(root, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace(/v=2\.5/g, 'v=2.6');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('2. Updated index.html with cache busting v=2.6!');
