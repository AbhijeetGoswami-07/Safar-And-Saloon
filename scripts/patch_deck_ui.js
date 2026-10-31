const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const appPath = path.join(root, 'js', 'app.js');

let html = fs.readFileSync(htmlPath, 'utf8');
let app = fs.readFileSync(appPath, 'utf8');

// Normalize CRLF to LF for reliable patching
const htmlHasCRLF = html.includes('\r\n');
const appHasCRLF = app.includes('\r\n');

let htmlLF = html.replace(/\r\n/g, '\n');
let appLF = app.replace(/\r\n/g, '\n');

// 1. Update eqVisualizer to 7 bars in index.html
const oldEqLF = `            <div id="eqVisualizer" class="eq-container">
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
            </div>`;

const newEqLF = `            <div id="eqVisualizer" class="eq-container" aria-hidden="true">
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
            </div>`;

if (htmlLF.includes(oldEqLF)) {
  htmlLF = htmlLF.replace(oldEqLF, newEqLF);
  console.log('[SUCCESS] Replaced eqVisualizer in index.html');
} else {
  console.log('[WARN] oldEqLF not found in index.html');
}

// 2. Patch renderStations in js/app.js
const oldPillLF = `      btn.innerHTML = \`
        <svg class="w-3.5 h-3.5 shrink-0 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="2"></circle>
          <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
        </svg>
        <span>\${station.name}</span>
      \`;`;

const newPillLF = `      const isActive = station.id === activeStation.id;
      const freqTag = station.badge ? station.badge.split('•')[0].trim() : 'FM';
      btn.innerHTML = \`
        <span class="station-pill-freq">\${freqTag}</span>
        <span class="station-pill-name font-medium">\${station.name}</span>
        \${isActive ? '<span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse ml-0.5 shrink-0 opacity-90"></span>' : ''}
      \`;`;

if (appLF.includes(oldPillLF)) {
  appLF = appLF.replace(oldPillLF, newPillLF);
  console.log('[SUCCESS] Replaced station pill template in js/app.js');
} else {
  console.log('[WARN] oldPillLF not found in js/app.js');
}

// 3. Patch renderPlaylistDrawer in js/app.js
const oldDrawerItemLF = `      const item = document.createElement('div');
      item.className = \`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer \${
        isCurrent ? 'bg-white/10 border border-white/20 shadow-md' : 'hover:bg-white/5 border border-transparent'
      }\`;
      item.innerHTML = \`
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div class="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-zinc-900 border border-white/10">
            <img src="\${track.thumb}" alt="\${track.title}" class="w-full h-full object-cover"/>
            \${isCurrent ? '<div class="absolute inset-0 bg-black/50 flex items-center justify-center text-amber-400"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><polygon points="6,4 20,12 6,20"/></svg></div>' : ''}
          </div>
          <div class="min-w-0 flex-1">
            <div class="font-semibold text-xs sm:text-sm text-white truncate \${isCurrent ? 'text-amber-300' : ''}">
              \${track.title}
            </div>
            <div class="text-[11px] text-zinc-400 truncate">
              \${track.artist} • \${track.movie}
            </div>
          </div>
        </div>
        <div class="text-xs font-mono text-zinc-500 ml-3 shrink-0">
          \${track.duration}
        </div>
      \`;`;

const newDrawerItemLF = `      const trackNum = String(originalIndex + 1).padStart(2, '0');
      const isSaloon = currentMode === 'saloon';
      const activeAccentColor = isSaloon ? 'text-teal-300' : 'text-amber-300';
      const activeBorder = isSaloon ? 'border-teal-400/40 bg-teal-500/10' : 'border-amber-400/40 bg-amber-500/10';

      const item = document.createElement('div');
      item.className = \`flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer \${
        isCurrent ? \`\${activeBorder} border shadow-lg\` : 'hover:bg-white/5 border border-transparent'
      }\`;
      item.innerHTML = \`
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <span class="text-[11px] font-mono \${isCurrent ? activeAccentColor : 'text-zinc-500'} w-5 shrink-0 text-right font-semibold">\${trackNum}</span>
          <div class="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-zinc-900 border border-white/10 shadow-sm">
            <img src="\${track.thumb}" alt="\${track.title}" class="w-full h-full object-cover" loading="lazy"/>
            \${isCurrent ? '<div class="absolute inset-0 bg-black/50 flex items-center justify-center text-white"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><polygon points="6,4 20,12 6,20"/></svg></div>' : ''}
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5">
              <span class="font-semibold text-xs sm:text-sm text-white truncate \${isCurrent ? activeAccentColor : ''}">
                \${track.title}
              </span>
              \${isCurrent ? \`
                <div class="flex items-end gap-0.5 h-3 ml-1 shrink-0" aria-label="Now Playing">
                  <span class="w-0.5 h-3 rounded-full \${isSaloon ? 'bg-teal-400' : 'bg-amber-400'} animate-pulse"></span>
                  <span class="w-0.5 h-2 rounded-full \${isSaloon ? 'bg-teal-300' : 'bg-amber-300'} animate-bounce"></span>
                  <span class="w-0.5 h-3 rounded-full \${isSaloon ? 'bg-teal-400' : 'bg-amber-400'} animate-pulse"></span>
                </div>
              \` : ''}
            </div>
            <div class="text-[11px] text-zinc-400 truncate mt-0.5">
              \${track.artist} • \${track.movie}
            </div>
          </div>
        </div>
        <div class="text-xs font-mono text-zinc-500 ml-3 shrink-0">
          \${track.duration}
        </div>
      \`;`;

if (appLF.includes(oldDrawerItemLF)) {
  appLF = appLF.replace(oldDrawerItemLF, newDrawerItemLF);
  console.log('[SUCCESS] Replaced drawer item template in js/app.js');
} else {
  console.log('[WARN] oldDrawerItemLF not found in js/app.js');
}

// Restore line endings and write files
if (htmlHasCRLF) htmlLF = htmlLF.replace(/\n/g, '\r\n');
if (appHasCRLF) appLF = appLF.replace(/\n/g, '\r\n');

fs.writeFileSync(htmlPath, htmlLF, 'utf8');
fs.writeFileSync(appPath, appLF, 'utf8');
console.log('[ALL DONE] Successfully patched index.html and js/app.js');
