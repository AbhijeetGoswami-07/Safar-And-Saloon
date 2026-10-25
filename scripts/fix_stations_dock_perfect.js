const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 1. UPDATE server.js
const serverPath = path.join(root, 'server.js');
let serverCode = fs.readFileSync(serverPath, 'utf8');
serverCode = serverCode.replace(
  "'Cache-Control': 'no-cache'",
  "'Cache-Control': 'no-cache, no-store, must-revalidate',\n      'Pragma': 'no-cache',\n      'Expires': '0'"
);
fs.writeFileSync(serverPath, serverCode, 'utf8');
console.log('1. Updated server.js with strict no-cache headers');

// 2. UPDATE index.html
const htmlPath = path.join(root, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Update stylesheet link with cache-busting
html = html.replace(/href="css\/styles\.css(\?v=[^"]*)?"/, 'href="css/styles.css?v=2.5"');

// Ensure stations dock container has no w-full forcing wide overflow
html = html.replace(
  '<div class="stations-dock-wrapper w-full">',
  '<div class="stations-dock-wrapper">'
);

// Update script tags with cache-busting
const scripts = ['audioEngine', 'playlistData', 'visuals', 'player', 'pressureHorn', 'app'];
scripts.forEach(s => {
  const reg = new RegExp(`src="js\/${s}\\.js(\\?v=[^"]*)?"`);
  html = html.replace(reg, `src="js/${s}.js?v=2.5"`);
});

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('2. Updated index.html with cache busting & dock markup');

// 3. UPDATE css/styles.css
const cssPath = path.join(root, 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const dockSectionStart = css.indexOf('.stations-dock-wrapper {');
const dockSectionEnd = css.indexOf('.sleep-pill.active, .time-pill.active {');

const perfectDockCss = `.stations-dock-wrapper {
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 9999px;
  background: rgba(8, 12, 22, 0.90);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65);
  overflow: hidden;
}

body.theme-saloon .stations-dock-wrapper {
  background: rgba(18, 12, 8, 0.92);
  border-color: rgba(245, 158, 11, 0.28);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.75);
}

.stations-dock-scroll {
  display: flex;
  align-items: center;
  justify-content: flex-start !important;
  gap: 8px;
  padding: 8px 20px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.stations-dock-scroll::-webkit-scrollbar {
  display: none;
}

.station-pill {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 15px;
  border-radius: 9999px;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  font-size: 12.5px;
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

if (dockSectionStart !== -1 && dockSectionEnd !== -1) {
  css = css.substring(0, dockSectionStart) + perfectDockCss + css.substring(dockSectionEnd);
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('3. Updated css/styles.css with flex-start and safe padding');
} else {
  console.error('Could not find dockSection boundaries:', dockSectionStart, dockSectionEnd);
}

// 4. UPDATE js/app.js
const appPath = path.join(root, 'js', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

const renderStationsStart = app.indexOf('  function renderStations() {');
const renderStationsEnd = app.indexOf('  /* ============================================================', renderStationsStart);

const newRenderStationsFn = `  function renderStations() {
    if (!stationsNav) return;
    stationsNav.innerHTML = '';

    const currentMode = window.musicPlayer.currentMode;
    const stations = window.playlistData[currentMode].stations;
    const activeStation = window.musicPlayer.getActiveStation();

    stations.forEach((station, index) => {
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
        window.musicPlayer.setStation(station.id);
        renderStations();
        renderPlaylistDrawer();
        if (index === 0) {
          stationsNav.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
      stationsNav.appendChild(btn);
    });

    // Ensure first station is always scrolled completely to 0 on initial render or mode switch
    const activeIndex = stations.findIndex(s => s.id === activeStation.id);
    if (activeIndex === 0) {
      stationsNav.scrollLeft = 0;
    } else {
      setTimeout(() => {
        const activeBtn = stationsNav.querySelector('.station-pill.active');
        if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }, 50);
    }
  }

`;

if (renderStationsStart !== -1 && renderStationsEnd !== -1) {
  app = app.substring(0, renderStationsStart) + newRenderStationsFn + app.substring(renderStationsEnd);
  fs.writeFileSync(appPath, app, 'utf8');
  console.log('4. Updated js/app.js renderStations() with scrollLeft = 0 for initial station');
} else {
  console.error('Could not find renderStations boundaries:', renderStationsStart, renderStationsEnd);
}
