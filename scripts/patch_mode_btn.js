const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const cssPath = path.join(root, 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(
`  color: rgba(255, 255, 255, 0.65);
  font-weight: 600;
  font-size: 12.5px;`,
`  color: rgba(255, 255, 255, 0.75);
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.25px;`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated .mode-btn typography in styles.css');
