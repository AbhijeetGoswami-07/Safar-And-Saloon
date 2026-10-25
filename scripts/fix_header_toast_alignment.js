const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// 1. PATCH index.html
const htmlPath = path.join(root, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Update toastNotification markup via regex to avoid CRLF mismatch
const toastRegex = /<!-- Floating Toast Notification[\s\S]*?<div id="toastNotification"[\s\S]*?<\/div>\s*<\/div>/;
const newToastBlock = `<!-- Floating Toast Notification (Perfect 50% Horizontal Screen Center) -->
  <div id="toastNotification" class="toast-floating-container">
    <div id="toastBadge" class="toast-badge">
      <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>
      <span id="toastText">HIGHWAY AIR HORN (Horn OK Please)</span>
    </div>
  </div>`;

if (toastRegex.test(html)) {
  html = html.replace(toastRegex, newToastBlock);
  console.log('Toast markup replaced in index.html');
} else {
  console.log('Toast markup already replaced or not found');
}

// Update header markup with true absolute horizontal center for mode-switch-wrapper and activeTimerBadge preserved
const headerStart = html.indexOf('<header class=');
const headerEnd = html.indexOf('</header>') + 9;

if (headerStart !== -1 && headerEnd !== -1) {
  const newHeader = `<header class="header-main-nav relative z-20 w-full px-4 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">

    <!-- Left: Brand Logo & Cultural Identity -->
    <div class="brand-badge-col flex items-center justify-start z-10">
      <div class="brand-badge">
        <div class="brand-icon-box">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
          </svg>
        </div>
        <div class="flex flex-col pr-1">
          <div class="flex items-center gap-2">
            <span class="font-display text-sm sm:text-base font-bold tracking-tight text-white drop-shadow">Safar & Saloon</span>
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30 animate-pulse"></span>
          </div>
          <span class="text-[10px] font-mono tracking-wider text-amber-300/90 font-semibold uppercase">Dual Retro Radio Experience</span>
        </div>
      </div>
    </div>

    <!-- Center: The Master Tactile Switcher (EXACT 50% TRUE SCREEN CENTER) -->
    <div class="mode-switch-center-col order-3 sm:order-2 w-full sm:w-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 flex justify-center mt-2 sm:mt-0 z-20 pointer-events-auto">
      <div class="mode-switch-wrapper">
        <div class="mode-switch-slider"></div>
        <button id="modeBtnDriver" type="button" class="mode-btn driver-active" aria-label="Switch to Bus Driver Mode">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 6v6"></path>
            <path d="M16 6v6"></path>
            <rect x="4" y="3" width="16" height="15" rx="3"></rect>
            <path d="M4 11h16"></path>
            <path d="M7 18v2"></path>
            <path d="M17 18v2"></path>
          </svg>
          <span>Bus Driver</span>
        </button>
        <button id="modeBtnSaloon" type="button" class="mode-btn" aria-label="Switch to Saloon Man Mode">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
            <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
            <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
          </svg>
          <span>Deluxe Saloon</span>
        </button>
      </div>
    </div>

    <!-- Right: Consolidated Settings Gear Button -->
    <div class="settings-col order-2 sm:order-3 flex items-center justify-end gap-2 z-10">
      <button id="settingsGearBtn" type="button" class="tactile-action-btn py-1.5 px-3 text-xs font-semibold flex items-center gap-2 hover:border-amber-400/40" title="Settings, Mixer, Sleep Timer & Shortcuts">
        <svg class="w-4 h-4 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
        </svg>
        <span class="hidden sm:inline">Settings</span>
        <span id="activeTimerBadge" class="hidden text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">30m</span>
      </button>
    </div>
  </header>`;

  html = html.substring(0, headerStart) + newHeader + html.substring(headerEnd);
}

// Update cache-busting to v=2.7
html = html.replace(/v=2\.6/g, 'v=2.7');
html = html.replace(/v=2\.5/g, 'v=2.7');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('1. Updated index.html with centered header layout, toast container & activeTimerBadge');

// 2. PATCH css/styles.css
const cssPath = path.join(root, 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const toastStyles = `/* ============================================================
 * TOAST NOTIFICATION: PERFECT 50% CENTER ALIGNMENT & DYNAMIC THEMES
 * ============================================================ */

.toast-floating-container {
  position: fixed;
  top: 88px;
  left: 50% !important;
  transform: translateX(-50%) translateY(-8px);
  z-index: 50;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-floating-container.show {
  opacity: 1 !important;
  transform: translateX(-50%) translateY(0) !important;
}

.toast-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 22px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #090d16;
  font-weight: 800;
  font-size: 13px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65), 0 0 25px rgba(245, 158, 11, 0.45);
  letter-spacing: 0.3px;
  text-shadow: none;
}

body.theme-saloon .toast-badge {
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  color: #042f2e;
  border-color: rgba(255, 255, 255, 0.40);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65), 0 0 25px rgba(20, 184, 166, 0.45);
}
`;

if (!css.includes('.toast-floating-container')) {
  css += '\n' + toastStyles;
} else {
  const toastIdx = css.indexOf('/* ============================================================\n * TOAST NOTIFICATION');
  if (toastIdx !== -1) {
    css = css.substring(0, toastIdx) + toastStyles;
  }
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('2. Updated css/styles.css with toast styles');

// 3. PATCH js/app.js showToast() cleanly
const appPath = path.join(root, 'js', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

if (app.includes("toast.classList.remove('opacity-0', '-translate-y-2');")) {
  app = app.replace("toast.classList.remove('opacity-0', '-translate-y-2');", "toast.classList.add('show');");
  app = app.replace("toast.classList.add('opacity-100', 'translate-y-0');", "");
  app = app.replace("toast.classList.remove('opacity-100', 'translate-y-0');", "toast.classList.remove('show');");
  app = app.replace("toast.classList.add('opacity-0', '-translate-y-2');", "");
  fs.writeFileSync(appPath, app, 'utf8');
  console.log('3. Cleanly updated js/app.js showToast()');
} else {
  console.log('3. js/app.js showToast() already using .show class');
}
