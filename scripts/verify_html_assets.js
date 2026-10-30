const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('Validating index.html asset references and duplicate IDs...');

let errors = 0;

// 1. Check duplicate IDs
const idRegex = /\sid=["']([^"']+)["']/g;
const idCount = {};
let match;
while ((match = idRegex.exec(html)) !== null) {
  const id = match[1];
  idCount[id] = (idCount[id] || 0) + 1;
}

const duplicates = Object.keys(idCount).filter(id => idCount[id] > 1);
if (duplicates.length > 0) {
  console.error('FAIL: Found duplicate IDs in index.html:');
  duplicates.forEach(id => console.error(`  - "${id}" appears ${idCount[id]} times`));
  errors++;
} else {
  console.log(`PASS: All ${Object.keys(idCount).length} IDs in index.html are unique.`);
}

// 2. Check local script tags
const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["']/gi;
while ((match = scriptRegex.exec(html)) !== null) {
  const src = match[1];
  if (!src.startsWith('http://') && !src.startsWith('https://')) {
    const cleanSrc = src.split('?')[0];
    const fullPath = path.join(root, cleanSrc);
    if (!fs.existsSync(fullPath)) {
      console.error(`FAIL: Referenced script file does not exist: ${cleanSrc}`);
      errors++;
    } else {
      console.log(`PASS: Script file found: ${cleanSrc}`);
    }
  }
}

// 3. Check local stylesheet links
const linkRegex = /<link\s+[^>]*href=["']([^"']+)["']/gi;
while ((match = linkRegex.exec(html)) !== null) {
  const href = match[1];
  if (!href.startsWith('http://') && !href.startsWith('https://')) {
    const cleanHref = href.split('?')[0];
    const fullPath = path.join(root, cleanHref);
    if (!fs.existsSync(fullPath)) {
      console.error(`FAIL: Referenced stylesheet/asset does not exist: ${cleanHref}`);
      errors++;
    } else {
      console.log(`PASS: Asset file found: ${cleanHref}`);
    }
  }
}

console.log(`\nResult: ${errors} errors found.`);
if (errors > 0) process.exit(1);
