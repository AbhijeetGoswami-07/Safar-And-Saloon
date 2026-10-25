const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 1. PATCH index.html
const htmlPath = path.join(root, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Target the broken stationsNav block and stray closing div
const targetStationsNav = `    <!-- Stations Bar (with dark frosted backdrop tray for crystal-clear road visibility) -->
    <div class="w-full flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-1.5 px-3 rounded-full bg-zinc-950/75 backdrop-blur-md border border-white/10 shadow-xl no-scrollbar" id="stationsNav">
      <!-- Dynamically filled with station pills -->
    </div>
      <!-- Dynamically filled with station pills -->
    </div>`;

const newStationsNav = `    <!-- STATIONS DOCK (Sleek Station Selector with Full Name Visibility & Smooth Scrolling) -->
    <div class="stations-dock-wrapper w-full">
      <div id="stationsNav" class="stations-dock-scroll no-scrollbar">
        <!-- Dynamically filled with station pills -->
      </div>
    </div>`;

if (html.includes(targetStationsNav)) {
  html = html.replace(targetStationsNav, newStationsNav);
} else {
  // Regex fallback
  const regex = /<!-- Stations Bar[^>]*>[\s\S]*?<div[^>]*id="stationsNav"[\s\S]*?<\/div>[\s\S]*?<\/div>/;
  html = html.replace(regex, newStationsNav);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully patched index.html stations dock layout!');

// 2. PATCH css/styles.css
const cssPath = path.join(root, 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const stationPillStart = css.indexOf('/* ============================================================');
const targetStart = css.indexOf('.station-pill {', stationPillStart);
const modalsStart = css.indexOf('/* ============================================================', targetStart);

const newDockAndPillCss = `/* ============================================================
 * STATIONS DOCK & PILLS (HIGH-CONTRAST, SAFE-CENTERED, NO-CLIPPING)
 * ============================================================ */

.stations-dock-wrapper {
  position: relative;
  width: 100%;
  border-radius: 18px;
  background: rgba(8, 12, 22, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65);
  overflow: hidden;
}

body.theme-saloon .stations-dock-wrapper {
  background: rgba(18, 12, 8, 0.90);
  border-color: rgba(245, 158, 11, 0.22);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.75);
}

/* Subtle Edge Fades for Overflow Continuity */
.stations-dock-wrapper::before,
.stations-dock-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  pointer-events: none;
  z-index: 5;
}

.stations-dock-wrapper::before {
  left: 0;
  background: linear-gradient(90deg, rgba(8, 12, 22, 0.9), rgba(8, 12, 22, 0));
}

.stations-dock-wrapper::after {
  right: 0;
  background: linear-gradient(270deg, rgba(8, 12, 22, 0.9), rgba(8, 12, 22, 0));
}

body.theme-saloon .stations-dock-wrapper::before {
  background: linear-gradient(90deg, rgba(18, 12, 8, 0.9), rgba(18, 12, 8, 0));
}

body.theme-saloon .stations-dock-wrapper::after {
  background: linear-gradient(270deg, rgba(18, 12, 8, 0.9), rgba(18, 12, 8, 0));
}

.stations-dock-scroll {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  /* Safe centering: centered on wide displays, start-aligned without clipping when overflowing */
  justify-content: flex-start;
  justify-content: safe center;
}

.stations-dock-scroll::-webkit-scrollbar {
  display: none;
}

.station-pill {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.20);
  font-size: 12px;
  font-weight: 600;
  color: #f8fafc;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.65);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
}

.station-pill:hover {
  background: rgba(24, 34, 58, 0.98);
  border-color: rgba(255, 255, 255, 0.45);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.8);
}

.station-pill.active {
  background: linear-gradient(135deg, #f59e0b, #d97706) !important;
  color: #090d16 !important;
  font-weight: 800 !important;
  border-color: #f59e0b !important;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.65) !important;
  text-shadow: none !important;
}

body.theme-saloon .station-pill {
  background: rgba(24, 16, 12, 0.94);
  border-color: rgba(245, 158, 11, 0.28);
  color: #fef3c7;
}

body.theme-saloon .station-pill:hover {
  background: rgba(38, 24, 18, 0.98);
  border-color: rgba(245, 158, 11, 0.55);
  color: #ffffff;
}

body.theme-saloon .station-pill.active {
  background: linear-gradient(135deg, #14b8a6, #0d9488) !important;
  color: #042f2e !important;
  font-weight: 800 !important;
  border-color: #14b8a6 !important;
  box-shadow: 0 0 20px rgba(20, 184, 166, 0.65) !important;
  text-shadow: none !important;
}

`;

if (targetStart !== -1 && modalsStart !== -1) {
  css = css.substring(0, targetStart) + newDockAndPillCss + css.substring(modalsStart);
} else {
  // Replace from .station-pill to .sleep-pill
  const pillStart = css.indexOf('.station-pill {');
  const sleepStart = css.indexOf('.sleep-pill.active');
  if (pillStart !== -1 && sleepStart !== -1) {
    css = css.substring(0, pillStart) + newDockAndPillCss + css.substring(sleepStart);
  }
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully patched css/styles.css stations dock styles!');

// 3. PATCH js/app.js (Auto-center active pill smoothly into view)
const appPath = path.join(root, 'js', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

const targetRenderStations = `    stations.forEach(station => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = \`station-pill \${station.id === activeStation.id ? 'active' : ''}\`;
      btn.innerHTML = \`
        <svg class="w-3.5 h-3.5 shrink-0 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="2"></circle>
          <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
        </svg>
        <span>\${station.name}</span>
      \`;
      btn.addEventListener('click', () => {
        window.musicPlayer.switchStation(station.id);
        renderStations();
        renderPlaylistDrawer();
      });
      stationsNav.appendChild(btn);
    });
  }`;

const newRenderStations = `    stations.forEach(station => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = \`station-pill \${station.id === activeStation.id ? 'active' : ''}\`;
      btn.innerHTML = \`
        <svg class="w-3.5 h-3.5 shrink-0 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="2"></circle>
          <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
        </svg>
        <span>\${station.name}</span>
      \`;
      btn.addEventListener('click', () => {
        window.musicPlayer.switchStation(station.id);
        renderStations();
        renderPlaylistDrawer();
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
      stationsNav.appendChild(btn);
    });

    // Auto-scroll active pill into view so it is never cut off
    setTimeout(() => {
      const activeBtn = stationsNav.querySelector('.station-pill.active');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 60);
  }`;

if (app.includes(targetRenderStations)) {
  app = app.replace(targetRenderStations, newRenderStations);
} else {
  // Regex fallback
  const renderStationsRegex = /stations\.forEach\(station => \{[\s\S]*?stationsNav\.appendChild\(btn\);\s*\}\);\s*\}/;
  app = app.replace(renderStationsRegex, newRenderStations);
}

fs.writeFileSync(appPath, app, 'utf8');
console.log('Successfully updated js/app.js renderStations() auto-centering!');
