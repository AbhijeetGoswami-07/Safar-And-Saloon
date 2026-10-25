const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
let c = fs.readFileSync(cssPath, 'utf8');

const addition = `.sleep-pill.active, .time-pill.active {
  background: var(--accent-primary) !important;
  color: #0f172a !important;
  font-weight: 700 !important;
  border-color: var(--accent-primary) !important;
  box-shadow: 0 0 14px var(--accent-glow) !important;
}

`;

if (!c.includes('.sleep-pill.active')) {
  c = c.replace('/* ============================================================\n * MODALS & DRAWERS', addition + '/* ============================================================\n * MODALS & DRAWERS');
  fs.writeFileSync(cssPath, c, 'utf8');
  console.log('Restored sleep-pill and time-pill active styles!');
}
