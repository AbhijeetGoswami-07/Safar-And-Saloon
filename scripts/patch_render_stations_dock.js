const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'js', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

// Ensure renderStations calls updateDockNavState
const target1 = `    if (activeIndex === 0) {
      stationsNav.scrollLeft = 0;
    }`;

const replace1 = `    if (activeIndex === 0) {
      stationsNav.scrollLeft = 0;
      setTimeout(updateDockNavState, 60);
    }`;

if (app.includes(target1)) {
  app = app.replace(target1, replace1);
} else {
  // Regex version
  app = app.replace(/if\s*\(activeIndex\s*===\s*0\)\s*\{\s*stationsNav\.scrollLeft\s*=\s*0;\s*\}/, replace1);
}

const target2 = `        if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }, 50);`;

const replace2 = `        if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
        setTimeout(updateDockNavState, 350);
      }, 50);`;

if (app.includes(target2)) {
  app = app.replace(target2, replace2);
} else {
  app = app.replace(/if\s*\(activeBtn\)\s*\{\s*activeBtn\.scrollIntoView\(\{[^}]*\}\);\s*\}\s*\}\s*,\s*50\);/, replace2);
}

fs.writeFileSync(appPath, app, 'utf8');
console.log('Successfully updated renderStations() with updateDockNavState calls');
