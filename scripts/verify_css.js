const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
const css = fs.readFileSync(cssPath, 'utf8');

console.log('Validating css/styles.css syntax...');

// Track open/close curly braces
let openBraces = 0;
let line = 1;
let column = 1;
let errors = 0;

for (let i = 0; i < css.length; i++) {
  const char = css[i];
  if (char === '\n') {
    line++;
    column = 1;
  } else {
    column++;
  }

  // Skip comments
  if (char === '/' && css[i + 1] === '*') {
    const endComment = css.indexOf('*/', i + 2);
    if (endComment === -1) {
      console.error(`Unclosed comment starting at line ${line}, column ${column}`);
      errors++;
      break;
    }
    i = endComment + 1;
    continue;
  }

  if (char === '{') {
    openBraces++;
  } else if (char === '}') {
    openBraces--;
    if (openBraces < 0) {
      console.error(`Unexpected closing brace '}' at line ${line}, column ${column}`);
      errors++;
      openBraces = 0;
    }
  }
}

if (openBraces !== 0) {
  console.error(`Mismatched braces: ${openBraces} unclosed '{' blocks remaining at end of file!`);
  errors++;
}

console.log(`CSS check completed: ${line} lines parsed. Errors: ${errors}`);
if (errors > 0) {
  process.exit(1);
} else {
  console.log('PASS: css/styles.css braces and structure are balanced!');
}
