const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'js', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

// 1. Fix atmospheric audio mixer sliders
const mixerBlockRegex = /\/\* ============================================================\s*\* ATMOSPHERIC AUDIO MIXER SLIDERS[\s\S]*?(?=\/\* ============================================================\s*\* CUSTOM YOUTUBE SONG MODAL)/;

const newMixerBlock = `/* ============================================================
   * ATMOSPHERIC AUDIO MIXER SLIDERS
   * ============================================================ */

  const sfxVolSlider = document.getElementById('sfxVolSlider');
  const rainVolSlider = document.getElementById('rainVolSlider');
  const fanVolSlider = document.getElementById('fanVolSlider');

  if (sfxVolSlider) {
    sfxVolSlider.addEventListener('input', (e) => {
      if (window.audioEngine) window.audioEngine.volumes.sfx = parseFloat(e.target.value);
    });
  }
  if (rainVolSlider) {
    rainVolSlider.addEventListener('input', (e) => {
      if (window.audioEngine) {
        window.audioEngine.volumes.rain = parseFloat(e.target.value);
        if (window.audioEngine.ambients.rain && window.audioEngine.ambients.rain.gainNode) {
          window.audioEngine.ambients.rain.gainNode.gain.setValueAtTime(parseFloat(e.target.value), window.audioEngine.ctx.currentTime);
        }
      }
    });
  }
  if (fanVolSlider) {
    fanVolSlider.addEventListener('input', (e) => {
      if (window.audioEngine) {
        window.audioEngine.volumes.fan = parseFloat(e.target.value);
        if (window.audioEngine.ambients.fan && window.audioEngine.ambients.fan.gainNode) {
          window.audioEngine.ambients.fan.gainNode.gain.setValueAtTime(parseFloat(e.target.value), window.audioEngine.ctx.currentTime);
        }
      }
    });
  }

  `;

if (mixerBlockRegex.test(app)) {
  app = app.replace(mixerBlockRegex, newMixerBlock);
  console.log('1. Fixed atmospheric audio mixer sliders block in js/app.js');
}

// 2. Fix 'H' key handler
const oldKeyH = `    } else if (e.key === 'h' || e.key === 'H') {
      if (window.musicPlayer.currentMode === 'driver') {
        triggerAirHornBlast();
      } else {
        if (window.audioEngine) window.audioEngine.playScissorSnip();
      }`;

const newKeyH = `    } else if (e.key === 'h' || e.key === 'H') {
      if (window.musicPlayer && window.musicPlayer.currentMode === 'driver') {
        triggerAirHornBlast();
      } else {
        triggerWaterMist();
      }`;

if (app.includes(oldKeyH)) {
  app = app.replace(oldKeyH, newKeyH);
  console.log("2. Fixed 'H' key handler in js/app.js");
} else {
  // Regex version
  const keyHRegex = /\} else if \(e\.key === 'h' \|\| e\.key === 'H'\) \{[\s\S]*?playScissorSnip\(\);\s*\}/;
  app = app.replace(keyHRegex, newKeyH);
  console.log("2. Fixed 'H' key handler via regex in js/app.js");
}

fs.writeFileSync(appPath, app, 'utf8');
console.log('Successfully patched js/app.js');
