const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 1. PATCH js/app.js
const appPath = path.join(root, 'js', 'app.js');
let appCode = fs.readFileSync(appPath, 'utf8');

const targetHornFn = `  function triggerAirHornBlast() {
    if (window.pressureHornSystem) {
      const curTrack = window.musicPlayer ? window.musicPlayer.currentTrack : null;
      const res = window.pressureHornSystem.blowHorn(curTrack);
      if (res) {
        if (res.type === 'hook') {
          showToast(\`BLOW HORN: "\${res.name}" Musical Hook!\`);
        } else {
          showToast(\`BLOW HORN: \${res.name} (\${res.description})\`);
        }
      }
    } else if (window.audioEngine) {
      const trackTitle = window.audioEngine.playTruckAirHorn();
      showToast(\`BLOW HORN: "\${trackTitle}" PA Horn Blast!\`);
    }
  }`;

const newHornFn = `  function triggerAirHornBlast() {
    if (window.pressureHornSystem) {
      window.pressureHornSystem.blowHorn();
      showToast('HIGHWAY AIR HORN (Horn OK Please)');
    } else if (window.audioEngine) {
      window.audioEngine.playTruckAirHorn();
      showToast('HIGHWAY AIR HORN (Horn OK Please)');
    }
  }`;

if (appCode.includes(targetHornFn)) {
  appCode = appCode.replace(targetHornFn, newHornFn);
} else {
  // Regex replacement
  const hornRegex = /function triggerAirHornBlast\(\)\s*\{[\s\S]*?showToast\(`BLOW HORN: "[^"]*" PA Horn Blast!`\);\s*\}\s*\}/;
  appCode = appCode.replace(hornRegex, newHornFn);
}

appCode = appCode.replace("showToast('Auto Horn Active: Periodic blasts on highway');", "showToast('Auto Air Horn: Periodic highway blasts');");
appCode = appCode.replace("showToast('Auto Horn Disabled');", "showToast('Auto Air Horn Disabled');");

fs.writeFileSync(appPath, appCode, 'utf8');
console.log('Successfully updated js/app.js!');

// 2. PATCH index.html LABELS
const htmlPath = path.join(root, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace('<span>Auto Horn Hook</span>', '<span>Auto Air Horn</span>');
html = html.replace('title="Auto-blast the song\'s melodic hook on PA horn during playback"', 'title="Auto-blast the highway pressure air horn periodically during highway cruise"');
html = html.replace('Playing Song Hook on PA Truck Horn', 'Highway Pressure Air Horn (Horn OK Please)');
html = html.replace('Hook Horn / Scissors', 'Air Horn / Scissors');
html = html.replace('Horn Hook & Scissors (SFX)', 'Air Horn & Scissors (SFX)');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully updated index.html labels!');
