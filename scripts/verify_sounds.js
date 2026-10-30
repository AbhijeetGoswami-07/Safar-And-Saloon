const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const jsDir = path.join(root, 'js');
const soundsDir = path.join(root, 'sounds');

console.log('Validating sound asset references...');

const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
const referencedSounds = new Set();

jsFiles.forEach(file => {
  const content = fs.readFileSync(path.join(jsDir, file), 'utf8');
  const regex = /['"](sounds\/[^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    referencedSounds.add(match[1]);
  }
});

console.log('Referenced sound files found in js/ code:');
let missing = 0;
referencedSounds.forEach(soundRelPath => {
  const fullPath = path.join(root, soundRelPath);
  const exists = fs.existsSync(fullPath);
  if (exists) {
    const size = fs.statSync(fullPath).size;
    console.log(`  [OK] ${soundRelPath} (${size} bytes)`);
  } else {
    console.error(`  [MISSING] ${soundRelPath}`);
    missing++;
  }
});

console.log(`\nSound asset check result: ${missing} missing files.`);
if (missing > 0) process.exit(1);
