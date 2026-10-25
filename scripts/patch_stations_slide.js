/**
 * Patch script to enable smooth sliding, drag-to-slide, mouse wheel scrolling,
 * and sleek left/right slide navigation arrows on the stations dock.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 1. PATCH index.html
const htmlPath = path.join(root, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const oldDockBlock = `    <!-- STATIONS DOCK (Sleek Station Selector with Full Name Visibility & Smooth Scrolling) -->
    <div class="stations-dock-wrapper">
      <div id="stationsNav" class="stations-dock-scroll no-scrollbar">
        <!-- Dynamically filled with station pills -->
      </div>
    </div>`;

const newDockBlock = `    <!-- STATIONS DOCK (Sleek Station Selector with Slide Arrows, Drag-to-Slide & Smooth Scrolling) -->
    <div class="stations-dock-wrapper">
      <button id="dockSlideLeftBtn" type="button" class="dock-slide-arrow dock-arrow-left is-disabled" aria-label="Slide to previous stations" title="Previous stations">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div id="stationsNav" class="stations-dock-scroll" tabindex="0" role="region" aria-label="Radio Stations">
        <!-- Dynamically filled with station pills -->
      </div>

      <button id="dockSlideRightBtn" type="button" class="dock-slide-arrow dock-arrow-right" aria-label="Slide to next stations" title="Next stations">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>`;

if (html.includes(oldDockBlock)) {
  html = html.replace(oldDockBlock, newDockBlock);
} else {
  // Regex match in case of CRLF differences
  const dockRegex = /<!-- STATIONS DOCK[\s\S]*?<div class="stations-dock-wrapper">[\s\S]*?<div id="stationsNav"[\s\S]*?<\/div>\s*<\/div>/;
  html = html.replace(dockRegex, newDockBlock);
}

// Bump cache-busting to v=2.8
html = html.replace(/v=2\.7/g, 'v=2.8');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('1. Updated index.html with slide navigation arrows and v=2.8');

// 2. PATCH css/styles.css
const cssPath = path.join(root, 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const dockSectionRegex = /\/\* ============================================================\s*\* STATIONS DOCK & PILLS[\s\S]*?(?=\.station-pill \{)/;

const newDockStyles = `/* ============================================================
 * STATIONS DOCK & PILLS (SMOOTH SLIDING, DRAG & ARROWS)
 * ============================================================ */

.stations-dock-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 9999px;
  background: rgba(8, 12, 22, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.70);
  padding: 4px 6px;
  overflow: hidden;
}

body.theme-saloon .stations-dock-wrapper {
  background: rgba(18, 12, 8, 0.94);
  border-color: rgba(245, 158, 11, 0.32);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.80);
}

/* Subtle edge fade overlays showing there is more content to reveal */
.stations-dock-wrapper::before,
.stations-dock-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 28px;
  pointer-events: none;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.stations-dock-wrapper::before {
  left: 38px;
  background: linear-gradient(to right, rgba(8, 12, 22, 0.95), transparent);
}

.stations-dock-wrapper::after {
  right: 38px;
  background: linear-gradient(to left, rgba(8, 12, 22, 0.95), transparent);
}

body.theme-saloon .stations-dock-wrapper::before {
  background: linear-gradient(to right, rgba(18, 12, 8, 0.98), transparent);
}

body.theme-saloon .stations-dock-wrapper::after {
  background: linear-gradient(to left, rgba(18, 12, 8, 0.98), transparent);
}

.stations-dock-wrapper.has-scroll-left::before {
  opacity: 1;
}

.stations-dock-wrapper.has-scroll-right::after {
  opacity: 1;
}

/* Slide Navigation Arrow Buttons */
.dock-slide-arrow {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  color: #f1f5f9;
  border: 1px solid rgba(255, 255, 255, 0.18);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  padding: 0;
  outline: none;
}

.dock-slide-arrow:hover:not(.is-disabled) {
  background: rgba(245, 158, 11, 0.28);
  border-color: rgba(245, 158, 11, 0.70);
  color: #fef08a;
  transform: scale(1.10);
  box-shadow: 0 0 14px rgba(245, 158, 11, 0.50);
}

body.theme-saloon .dock-slide-arrow:hover:not(.is-disabled) {
  background: rgba(20, 184, 166, 0.28);
  border-color: rgba(20, 184, 166, 0.70);
  color: #99f6e4;
  box-shadow: 0 0 14px rgba(20, 184, 166, 0.50);
}

.dock-slide-arrow:active:not(.is-disabled) {
  transform: scale(0.92);
}

.dock-slide-arrow.is-disabled {
  opacity: 0.20;
  cursor: default;
  pointer-events: none;
  transform: none !important;
  box-shadow: none !important;
}

/* Horizontal Scroll Container with Grab-and-Drag */
.stations-dock-scroll {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start !important;
  gap: 8px;
  padding: 4px 10px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(245, 158, 11, 0.35) transparent;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}

.stations-dock-scroll.is-dragging {
  cursor: grabbing !important;
  scroll-behavior: auto !important;
}

body.theme-saloon .stations-dock-scroll {
  scrollbar-color: rgba(20, 184, 166, 0.35) transparent;
}

.stations-dock-scroll::-webkit-scrollbar {
  height: 3px;
}

.stations-dock-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.stations-dock-scroll::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.40);
  border-radius: 9999px;
}

body.theme-saloon .stations-dock-scroll::-webkit-scrollbar-thumb {
  background: rgba(20, 184, 166, 0.40);
}

`;

if (dockSectionRegex.test(css)) {
  css = css.replace(dockSectionRegex, newDockStyles);
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('2. Updated css/styles.css with slide arrows and scroll styles');
} else {
  console.warn('Could not locate dockSectionRegex in css/styles.css');
}

// 3. PATCH js/app.js to add arrow listeners, drag-to-slide, and mouse wheel support
const appPath = path.join(root, 'js', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

// We want to add setupDockSliding() into js/app.js and call it
const dockJsCode = `
  /* ============================================================
   * STATIONS DOCK: SLIDE ARROWS, DRAG-TO-SLIDE & MOUSE WHEEL
   * ============================================================ */

  const dockSlideLeftBtn = document.getElementById('dockSlideLeftBtn');
  const dockSlideRightBtn = document.getElementById('dockSlideRightBtn');

  function updateDockNavState() {
    if (!stationsNav) return;
    const scrollLeft = stationsNav.scrollLeft;
    const maxScroll = stationsNav.scrollWidth - stationsNav.clientWidth;

    const canScrollLeft = scrollLeft > 6;
    const canScrollRight = maxScroll > 6 && scrollLeft < (maxScroll - 6);

    if (dockSlideLeftBtn) {
      dockSlideLeftBtn.classList.toggle('is-disabled', !canScrollLeft);
    }
    if (dockSlideRightBtn) {
      dockSlideRightBtn.classList.toggle('is-disabled', !canScrollRight);
    }

    const wrapper = stationsNav.closest('.stations-dock-wrapper');
    if (wrapper) {
      wrapper.classList.toggle('has-scroll-left', canScrollLeft);
      wrapper.classList.toggle('has-scroll-right', canScrollRight);
    }
  }

  if (dockSlideLeftBtn) {
    dockSlideLeftBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!stationsNav) return;
      stationsNav.scrollBy({ left: -260, behavior: 'smooth' });
    });
  }

  if (dockSlideRightBtn) {
    dockSlideRightBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!stationsNav) return;
      stationsNav.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }

  if (stationsNav) {
    // 1. Mouse wheel translation (vertical wheel scrolls horizontal bar)
    stationsNav.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        stationsNav.scrollLeft += e.deltaY * 1.2;
        updateDockNavState();
      }
    }, { passive: false });

    // 2. Click-and-drag to slide (grab & pan)
    let isMouseDown = false;
    let startX = 0;
    let initialScrollLeft = 0;
    let totalMoved = 0;

    stationsNav.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Only primary mouse button
      isMouseDown = true;
      totalMoved = 0;
      startX = e.clientX;
      initialScrollLeft = stationsNav.scrollLeft;
      stationsNav.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown || !stationsNav) return;
      const deltaX = e.clientX - startX;
      totalMoved += Math.abs(deltaX);
      stationsNav.scrollLeft = initialScrollLeft - deltaX;
      updateDockNavState();
    });

    window.addEventListener('mouseup', () => {
      if (isMouseDown) {
        isMouseDown = false;
        if (stationsNav) stationsNav.classList.remove('is-dragging');
      }
    });

    // Suppress station click if user was actively dragging
    stationsNav.addEventListener('click', (e) => {
      if (totalMoved > 6) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    }, true);

    // Update state on scroll & window resize
    stationsNav.addEventListener('scroll', updateDockNavState, { passive: true });
    window.addEventListener('resize', updateDockNavState);
  }
`;

// Insert dockJsCode before `/* ============================================================\n   * SOUNDBOARD & ATMOSPHERE CONTROLS`
if (!app.includes('dockSlideLeftBtn')) {
  const insertTarget = '/* ============================================================\n   * SOUNDBOARD & ATMOSPHERE CONTROLS';
  if (app.includes(insertTarget)) {
    app = app.replace(insertTarget, dockJsCode + '\n  ' + insertTarget);
    console.log('3. Added dock slide and drag event handlers to js/app.js');
  } else {
    // Fallback: append before the closing listener
    const lastBrace = app.lastIndexOf('});');
    app = app.substring(0, lastBrace) + dockJsCode + '\n' + app.substring(lastBrace);
    console.log('3. Appended dock slide logic to js/app.js');
  }
}

// In renderStations(), make sure updateDockNavState() is called
if (!app.includes('updateDockNavState();')) {
  app = app.replace('renderPlaylistDrawer();', 'renderPlaylistDrawer();\n        updateDockNavState();');
}

// Also call updateDockNavState after initial renderStations call in init
if (app.includes('renderStations();') && !app.includes('renderStations();\n    updateDockNavState();')) {
  app = app.replace('renderStations();', 'renderStations();\n    setTimeout(updateDockNavState, 100);');
}

fs.writeFileSync(appPath, app, 'utf8');
console.log('Done patching stations dock sliding capability!');
