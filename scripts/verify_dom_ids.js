const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'js', 'app.js'), 'utf8');

// Find all getElementById calls
const regex = /getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const ids = new Set();
while ((match = regex.exec(app)) !== null) {
  ids.add(match[1]);
}

console.log('Total getElementById queries in js/app.js:', ids.size);
const missing = [];
for (const id of ids) {
  const hasId = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
  if (!hasId) {
    missing.push(id);
  }
}

if (missing.length > 0) {
  console.log('Missing IDs found in index.html:');
  missing.forEach(id => console.log('  -', id));
} else {
  console.log('All IDs referenced in js/app.js exist in index.html!');
}
