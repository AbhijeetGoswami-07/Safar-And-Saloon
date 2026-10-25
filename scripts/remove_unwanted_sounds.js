const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 1. PATCH index.html
const htmlPath = path.join(root, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// A. Remove engineHumToggleBtn from driverActions
const engineBtnRegex = /\s*<!-- Engine Rumble -->\s*<button id="engineHumToggleBtn"[\s\S]*?<\/button>/;
if (engineBtnRegex.test(html)) {
  html = html.replace(engineBtnRegex, '');
  console.log('Removed engineHumToggleBtn from index.html');
}

// B. Update saloonActions: remove scissorSnipBtn and champiVibratorBtn, make sprayMistBtn primary
const saloonActionsRegex = /<div id="saloonActions"[\s\S]*?<\/div>/;
const newSaloonActions = `<div id="saloonActions" class="w-full flex flex-wrap items-center justify-center gap-2 pointer-events-auto hidden">
      <!-- Spray Bottle Mist (Primary Action) -->
      <button id="sprayMistBtn" type="button" class="tactile-action-btn text-xs py-2 px-4 bg-gradient-to-r from-teal-600 to-teal-700 border-teal-400/40 text-white shadow-lg" title="Spritz Barber Water Mist (Press 'H')">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
        <span class="font-semibold">Water Mist (H)</span>
      </button>

      <!-- Ceiling Fan -->
      <button id="ceilingFanBtn" type="button" class="tactile-action-btn py-1.5 px-3 text-xs" title="Toggle Vintage Ceiling Fan">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.7 7.7a2.5 2.5 0 1 1 3.5 3.5L18 14H6l-3.2-2.8a2.5 2.5 0 1 1 3.5-3.5L9 10h6z"></path>
        </svg>
        <span>Ceiling Fan</span>
        <span class="toggle-badge text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 font-mono">OFF</span>
      </button>
    </div>`;

if (saloonActionsRegex.test(html)) {
  html = html.replace(saloonActionsRegex, newSaloonActions);
  console.log('Updated saloonActions in index.html (removed scissors and head massage)');
}

// C. Remove engineVolSlider from Settings Mixer modal
const engineVolRegex = /\s*<!-- Engine Rumble -->\s*<div class="flex items-center justify-between gap-4">\s*<span class="text-xs text-zinc-300">Heavy Diesel Engine Rumble<\/span>\s*<input id="engineVolSlider"[\s\S]*?<\/div>/;
if (engineVolRegex.test(html)) {
  html = html.replace(engineVolRegex, '');
  console.log('Removed engineVolSlider from index.html settings modal');
}

// D. Update SFX label in Settings Mixer modal
html = html.replace(
  '<span class="text-xs text-zinc-300">Air Horn & Scissors (SFX)</span>',
  '<span class="text-xs text-zinc-300">Highway Air Horn (SFX)</span>'
);

// E. Update shortcuts table in modal
html = html.replace(
  '<span class="text-zinc-400">Air Horn / Scissors</span>',
  '<span class="text-zinc-400">Air Horn (Driver) / Water Mist (Saloon)</span>'
);

// F. Bump version from v=2.9 to v=3.0
html = html.replace(/v=2\.9/g, 'v=3.0');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('1. Updated index.html successfully');

// 2. PATCH js/app.js
const appPath = path.join(root, 'js', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

// Replace soundboard controls section
const oldControlsSectionRegex = /\/\/ 1\. Bus Mode Buttons[\s\S]*?\/\/ 2\. Saloon Mode Buttons[\s\S]*?let isFanActive = true;/;

const newControlsSection = `// 1. Bus Mode Buttons
  const bigHornBtn = document.getElementById('bigHornBtn');
  const autoHornToggleBtn = document.getElementById('autoHornToggleBtn');
  const rainWiperToggleBtn = document.getElementById('rainWiperToggleBtn');

  let isAutoHornActive = false;
  let autoHornInterval = null;

  function triggerAirHornBlast() {
    if (window.pressureHornSystem) {
      window.pressureHornSystem.blowHorn();
      showToast('HIGHWAY AIR HORN (Horn OK Please)');
    } else if (window.audioEngine) {
      window.audioEngine.playTruckAirHorn();
      showToast('HIGHWAY AIR HORN (Horn OK Please)');
    }
  }

  if (bigHornBtn) {
    bigHornBtn.addEventListener('click', () => {
      triggerAirHornBlast();
      bigHornBtn.classList.add('scale-95');
      setTimeout(() => bigHornBtn.classList.remove('scale-95'), 180);
    });
  }

  if (autoHornToggleBtn) {
    autoHornToggleBtn.addEventListener('click', () => {
      isAutoHornActive = !isAutoHornActive;
      autoHornToggleBtn.classList.toggle('active', isAutoHornActive);
      const badge = autoHornToggleBtn.querySelector('.toggle-badge');
      if (badge) badge.textContent = isAutoHornActive ? 'ON' : 'OFF';

      if (isAutoHornActive) {
        showToast('Auto Air Horn: Periodic highway blasts');
        clearInterval(autoHornInterval);
        autoHornInterval = setInterval(() => {
          if (window.musicPlayer && window.musicPlayer.isPlaying && window.musicPlayer.currentMode === 'driver') {
            triggerAirHornBlast();
          }
        }, 35000);
      } else {
        clearInterval(autoHornInterval);
        showToast('Auto Air Horn Disabled');
      }
    });
  }

  let isRainActive = false;
  if (rainWiperToggleBtn) {
    rainWiperToggleBtn.addEventListener('click', () => {
      isRainActive = !isRainActive;
      if (window.visualsEngine) window.visualsEngine.toggleRain(isRainActive);
      if (window.audioEngine) window.audioEngine.toggleRainAmbient(isRainActive);
      rainWiperToggleBtn.classList.toggle('active', isRainActive);
      const stateBadge = rainWiperToggleBtn.querySelector('.toggle-badge');
      if (stateBadge) stateBadge.textContent = isRainActive ? 'ON' : 'OFF';
      showToast(isRainActive ? 'Highway Rain & Dual Wipers Active' : 'Rain Stopped');
    });
  }

  // 2. Saloon Mode Buttons (Water Mist & Ceiling Fan)
  const sprayMistBtn = document.getElementById('sprayMistBtn');
  const ceilingFanBtn = document.getElementById('ceilingFanBtn');

  function triggerWaterMist() {
    if (window.audioEngine) window.audioEngine.playSprayBottle();
    if (window.visualsEngine) window.visualsEngine.triggerMist();
    showToast('Barber Water Mist Spritzer');
  }

  if (sprayMistBtn) {
    sprayMistBtn.addEventListener('click', () => {
      triggerWaterMist();
      sprayMistBtn.classList.add('scale-95');
      setTimeout(() => sprayMistBtn.classList.remove('scale-95'), 150);
    });
  }

  let isFanActive = true;`;

if (oldControlsSectionRegex.test(app)) {
  app = app.replace(oldControlsSectionRegex, newControlsSection);
  console.log('Cleaned up soundboard controls in js/app.js');
}

// Update shortcut label in applyMode
app = app.replace(
  "if (shortcutHorn) shortcutHorn.textContent = 'Scissors';",
  "if (shortcutHorn) shortcutHorn.textContent = 'WATER MIST';"
);
app = app.replace(
  "if (shortcutHorn) shortcutHorn.textContent = 'Air Horn';",
  "if (shortcutHorn) shortcutHorn.textContent = 'BLOW HORN';"
);

// Update 'H' key handler in js/app.js
const keyHRegex = /\} else if \(e\.key === 'h' \|\| e\.key === 'H'\) \{[\s\S]*?if \(window\.musicPlayer && window\.musicPlayer\.currentMode === 'driver'\) \{[\s\S]*?triggerAirHornBlast\(\);[\s\S]*?\} else \{[\s\S]*?playScissorSnip\(\);[\s\S]*?\}\s*\}/;
const newKeyH = `} else if (e.key === 'h' || e.key === 'H') {
      if (window.musicPlayer && window.musicPlayer.currentMode === 'driver') {
        triggerAirHornBlast();
      } else {
        triggerWaterMist();
      }
    }`;

if (keyHRegex.test(app)) {
  app = app.replace(keyHRegex, newKeyH);
  console.log("Updated 'H' key listener in js/app.js");
}

// Remove engineVolSlider binding in js/app.js if present
const engineSliderRegex = /const engineVolSlider = document\.getElementById\('engineVolSlider'\);[\s\S]*?if \(engineVolSlider\) \{[\s\S]*?\}\s*\}/;
if (engineSliderRegex.test(app)) {
  app = app.replace(engineSliderRegex, '');
  console.log('Removed engineVolSlider code in js/app.js');
}

fs.writeFileSync(appPath, app, 'utf8');
console.log('2. Updated js/app.js successfully');

// 3. PATCH js/audioEngine.js
const audioPath = path.join(root, 'js', 'audioEngine.js');
let audio = fs.readFileSync(audioPath, 'utf8');

// In playModeSwitchSound: replace playScissorSnip with playSprayBottle
audio = audio.replace(
  '// Scissors snip + barber chair hydraulic pump\n      this.playScissorSnip();',
  '// Barber water mist + hydraulic chair pump\n      this.playSprayBottle();'
);

fs.writeFileSync(audioPath, audio, 'utf8');
console.log('3. Updated js/audioEngine.js successfully');

// 4. PATCH README.md
const readmePath = path.join(root, 'README.md');
let readme = fs.readFileSync(readmePath, 'utf8');

readme = readme.replace(
  'dual-blade scissors snips, spritzer water mist, and head massage machines',
  'spritzer water mist and vintage ceiling fan drone'
);
readme = readme.replace(
  'Melodic Song Hook Horn, Classic Dipper Horn, City Clipper, Diesel Rumble | Dual-blade scissor snips, pressurized water mist spritzer, head vibrator, fan hum',
  'Authentic Highway Pressure Air Horn, Rain & Wipers | Pressurized Barber Water Mist, Vintage Ceiling Fan'
);
readme = readme.replace(
  '| <kbd>H</kbd> | Trigger Pressure Air Horn (Driver) / Scissor Snip (Saloon) |',
  '| <kbd>H</kbd> | Trigger Pressure Air Horn (Driver) / Water Mist (Saloon) |'
);

fs.writeFileSync(readmePath, readme, 'utf8');
console.log('4. Updated README.md successfully');
