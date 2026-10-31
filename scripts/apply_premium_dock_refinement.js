const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const cssPath = path.join(root, 'css', 'styles.css');
const htmlPath = path.join(root, 'index.html');

let css = fs.readFileSync(cssPath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');

// Ensure CRLF/LF normalization
const cssHasCRLF = css.includes('\r\n');
const htmlHasCRLF = html.includes('\r\n');
css = css.replace(/\r\n/g, '\n');
html = html.replace(/\r\n/g, '\n');

// 1. Update index.html: ensure playback-shortcuts-ribbon class
html = html.replace(
  /class="w-full flex items-center justify-center gap-x-4 gap-y-1.5 flex-wrap text-\[11px\] text-zinc-400 font-medium px-2 pt-1 select-none"/,
  'class="playback-shortcuts-ribbon flex items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1.5 flex-wrap text-[11px] text-zinc-300 font-medium px-4 py-1.5 select-none mt-1"'
);

// 2. Refine css/styles.css variables
css = css.replace('--led-bar: #10b981;', '--led-bar: #f59e0b;');
css = css.replace('--led-peak: #f59e0b;', '--led-peak: #ef4444;');
css = css.replace(
  'body.theme-saloon {\n  --bg-core: #0c0908;\n  --bg-card: rgba(24, 18, 15, 0.82);\n  --bg-card-subtle: rgba(36, 26, 22, 0.68);\n  --border-card: rgba(255, 255, 255, 0.12);\n  --border-card-hover: rgba(20, 184, 166, 0.45);\n  --border-specular: rgba(255, 255, 255, 0.20);\n  --accent-primary: #14b8a6;\n  --accent-secondary: #0d9488;\n  --accent-glow: rgba(20, 184, 166, 0.35);\n  --accent-contrast: #03201f;\n  --text-primary: #fafaf9;\n  --text-muted: #a8a29e;\n  --text-dim: #78716c;\n  --led-bar: #f59e0b;\n  --led-peak: #14b8a6;',
  'body.theme-saloon {\n  --bg-core: #0c0908;\n  --bg-card: rgba(24, 18, 15, 0.82);\n  --bg-card-subtle: rgba(36, 26, 22, 0.68);\n  --border-card: rgba(255, 255, 255, 0.12);\n  --border-card-hover: rgba(20, 184, 166, 0.45);\n  --border-specular: rgba(255, 255, 255, 0.20);\n  --accent-primary: #14b8a6;\n  --accent-secondary: #0d9488;\n  --accent-glow: rgba(20, 184, 166, 0.35);\n  --accent-contrast: #03201f;\n  --text-primary: #fafaf9;\n  --text-muted: #a8a29e;\n  --text-dim: #78716c;\n  --led-bar: #14b8a6;\n  --led-peak: #fbbf24;'
);

// 3. Replace Equalizer bars styling
const oldEqBlock = `/* High-Visibility LED Spectrum Equalizer */
.eq-container {
  display: flex;
  align-items: flex-end;
  gap: 2.5px;
  height: 15px;
  padding: 0 3px;
}

.eq-bar {
  width: 3.5px;
  background: linear-gradient(to top, var(--led-bar) 0%, var(--led-bar) 70%, var(--led-peak) 100%);
  border-radius: 1.5px;
  transition: height 0.14s ease;
  height: 3px;
  box-shadow: 0 0 6px var(--accent-glow);
}`;

const newEqBlock = `/* High-Visibility LED Spectrum Equalizer */
.eq-container {
  display: flex;
  align-items: flex-end;
  gap: 2.5px;
  height: 15px;
  padding: 0 3px;
}

.eq-bar {
  width: 3.5px;
  background: linear-gradient(to top, #f59e0b 0%, #fbbf24 65%, #ef4444 100%);
  border-radius: 1.5px;
  transition: height 0.14s ease;
  height: 3px;
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.45);
}

body.theme-saloon .eq-bar {
  background: linear-gradient(to top, #14b8a6 0%, #2dd4bf 65%, #fbbf24 100%);
  box-shadow: 0 0 6px rgba(20, 184, 166, 0.45);
}`;

css = css.replace(oldEqBlock, newEqBlock);

// 4. Replace Stations dock scroll and pills
const oldDockPillsBlock = `/* Horizontal Scroll Container */
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

/* Individual Station Pill */
.station-pill {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 9999px;
  background: rgba(15, 23, 42, 0.90);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.20);
  font-size: 13px;
  font-weight: 600;
  color: #f8fafc;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.60), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
}

.station-pill:hover {
  background: rgba(26, 38, 64, 0.98);
  border-color: rgba(255, 255, 255, 0.45);
  color: #ffffff;
  transform: translateY(-1.5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8), 0 0 12px rgba(255, 255, 255, 0.15);
}

.station-pill:active {
  transform: translateY(0.5px) scale(0.98);
}

.station-pill.active {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 80%, #b45309 100%) !important;
  color: #070a12 !important;
  font-weight: 800 !important;
  border-color: #fbbf24 !important;
  box-shadow: 0 0 25px rgba(245, 158, 11, 0.75), 0 4px 16px rgba(0, 0, 0, 0.6) !important;
  text-shadow: none !important;
}

body.theme-saloon .station-pill {
  background: rgba(26, 18, 14, 0.94);
  border-color: rgba(245, 158, 11, 0.26);
  color: #fef3c7;
}

body.theme-saloon .station-pill:hover {
  background: rgba(42, 28, 20, 0.98);
  border-color: rgba(245, 158, 11, 0.55);
  color: #ffffff;
}

body.theme-saloon .station-pill.active {
  background: linear-gradient(135deg, #14b8a6 0%, #0d9488 80%, #0f766e 100%) !important;
  color: #03201f !important;
  font-weight: 800 !important;
  border-color: #2dd4bf !important;
  box-shadow: 0 0 25px rgba(20, 184, 166, 0.75), 0 4px 16px rgba(0, 0, 0, 0.6) !important;
  text-shadow: none !important;
}

/* Frequency badge inside station pill */
.station-pill-freq {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  padding: 1.5px 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.3px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.2s ease;
}

.station-pill.active .station-pill-freq {
  background: rgba(0, 0, 0, 0.22);
  color: currentColor;
  border-color: rgba(0, 0, 0, 0.25);
}`;

const newDockPillsBlock = `/* Horizontal Scroll Container (Scrollbar 100% Hidden for Clean Appearance) */
.stations-dock-scroll {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start !important;
  gap: 8px;
  padding: 3px 8px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}

.stations-dock-scroll.is-dragging {
  cursor: grabbing !important;
  scroll-behavior: auto !important;
}

.stations-dock-scroll::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

/* Individual Station Pill */
.station-pill {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 7.5px;
  padding: 7px 15px;
  border-radius: 9999px;
  background: rgba(16, 23, 38, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #cbd5e1;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
}

.station-pill:hover {
  background: rgba(28, 40, 68, 0.88);
  border-color: rgba(245, 158, 11, 0.40);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6), 0 0 12px rgba(245, 158, 11, 0.15);
}

.station-pill:active {
  transform: translateY(0.5px) scale(0.98);
}

/* Active Station Pill: Illuminated Vintage FM Radio Preset Tuner */
.station-pill.active {
  background: linear-gradient(145deg, rgba(32, 44, 72, 0.96) 0%, rgba(18, 26, 44, 0.98) 100%) !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  border-color: #f59e0b !important;
  border-width: 1.5px !important;
  box-shadow: 0 0 22px rgba(245, 158, 11, 0.35), inset 0 0 14px rgba(245, 158, 11, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.35) !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8) !important;
}

/* Frequency badge inside station pill */
.station-pill-freq {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  letter-spacing: 0.4px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.2s ease;
}

.station-pill.active .station-pill-freq {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
  color: #070a12 !important;
  font-weight: 800 !important;
  border-color: transparent !important;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.5) !important;
}

/* Saloon Theme Overrides */
body.theme-saloon .station-pill {
  background: rgba(24, 18, 15, 0.75);
  border-color: rgba(255, 255, 255, 0.10);
  color: #d6d3d1;
}

body.theme-saloon .station-pill:hover {
  background: rgba(38, 26, 20, 0.90);
  border-color: rgba(20, 184, 166, 0.40);
  color: #ffffff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6), 0 0 12px rgba(20, 184, 166, 0.15);
}

body.theme-saloon .station-pill.active {
  background: linear-gradient(145deg, rgba(20, 38, 36, 0.96) 0%, rgba(12, 24, 22, 0.98) 100%) !important;
  color: #ffffff !important;
  border-color: #14b8a6 !important;
  border-width: 1.5px !important;
  box-shadow: 0 0 22px rgba(20, 184, 166, 0.35), inset 0 0 14px rgba(20, 184, 166, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.35) !important;
}

body.theme-saloon .station-pill.active .station-pill-freq {
  background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%) !important;
  color: #03201f !important;
  border-color: transparent !important;
  box-shadow: 0 0 10px rgba(20, 184, 166, 0.5) !important;
}`;

css = css.replace(oldDockPillsBlock, newDockPillsBlock);

// 5. Replace horn button styling
const oldHornBlock = `/* HIGHWAY PRESSURE AIR HORN TRIGGER BUTTON */
.horn-giant-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 60%, #991b1b 100%) !important;
  border-color: rgba(254, 202, 202, 0.40) !important;
  color: #ffffff !important;
  font-weight: 800 !important;
  letter-spacing: 0.4px !important;
  box-shadow: 0 6px 22px rgba(220, 38, 38, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.45) !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

.horn-giant-btn:hover {
  background: linear-gradient(135deg, #f87171 0%, #ef4444 60%, #b91c1c 100%) !important;
  box-shadow: 0 8px 30px rgba(239, 68, 68, 0.75), 0 0 20px rgba(239, 68, 68, 0.50) !important;
  transform: translateY(-2px) scale(1.03);
}

.horn-giant-btn:active {
  transform: translateY(1px) scale(0.96) !important;
}`;

const newHornBlock = `/* HIGHWAY PRESSURE AIR HORN TRIGGER BUTTON (Refined Ruby Chrome Bevel) */
.horn-giant-btn {
  background: linear-gradient(145deg, #b91c1c 0%, #7f1d1d 100%) !important;
  border: 1px solid rgba(254, 202, 202, 0.30) !important;
  color: #ffffff !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 12.5px !important;
  font-weight: 700 !important;
  letter-spacing: 0.04em !important;
  box-shadow: 0 4px 16px rgba(185, 28, 28, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.35) !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
}

.horn-giant-btn:hover {
  background: linear-gradient(145deg, #dc2626 0%, #991b1b 100%) !important;
  border-color: rgba(254, 202, 202, 0.50) !important;
  box-shadow: 0 6px 22px rgba(220, 38, 38, 0.60), 0 0 16px rgba(220, 38, 38, 0.40) !important;
  transform: translateY(-1.5px) scale(1.02);
}

.horn-giant-btn:active {
  transform: translateY(1px) scale(0.96) !important;
  box-shadow: 0 2px 8px rgba(185, 28, 28, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.4) !important;
}`;

css = css.replace(oldHornBlock, newHornBlock);

// 6. Append Track Title, Artist, Movie, Tag, and Shortcuts Ribbon CSS
const deckTypographyAdditions = `
/* ============================================================
 * HI-FI DECK METADATA & CONTROLS POLISH
 * ============================================================ */

#trackTitle {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  letter-spacing: -0.01em !important;
  line-height: 1.25 !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8) !important;
  margin-top: 2px !important;
}

@media (min-width: 640px) {
  #trackTitle {
    font-size: 16.5px !important;
  }
}

#trackArtist {
  color: #cbd5e1 !important;
  font-weight: 600 !important;
  font-family: 'Inter', sans-serif !important;
}

#trackMovie {
  color: #94a3b8 !important;
  font-family: 'Inter', sans-serif !important;
}

#trackTag {
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 9.5px !important;
  font-weight: 700 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  padding: 2.5px 8.5px !important;
  border-radius: 9999px !important;
  background: rgba(245, 158, 11, 0.14) !important;
  color: #fbbf24 !important;
  border: 1px solid rgba(245, 158, 11, 0.35) !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4) !important;
  transition: all 0.3s ease !important;
}

body.theme-saloon #trackTag {
  background: rgba(20, 184, 166, 0.14) !important;
  color: #2dd4bf !important;
  border-color: rgba(20, 184, 166, 0.35) !important;
}

/* Secondary Action Buttons on Deck */
#openTicketBtn, #openPlaylistBtn {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-weight: 600 !important;
  font-size: 12px !important;
  background: rgba(255, 255, 255, 0.07) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #e2e8f0 !important;
  transition: all 0.2s ease !important;
}

#openTicketBtn:hover, #openPlaylistBtn:hover {
  background: rgba(255, 255, 255, 0.14) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  color: #ffffff !important;
  transform: translateY(-0.5px);
}

/* Floating Playback Shortcuts Capsule Under Deck */
.playback-shortcuts-ribbon {
  background: rgba(10, 15, 26, 0.85) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  border-radius: 9999px !important;
  padding: 5px 18px !important;
  margin-top: 6px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
}

.playback-shortcuts-ribbon kbd {
  background: rgba(255, 255, 255, 0.12) !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  color: #f8fafc !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  padding: 1.5px 6px !important;
  border-radius: 4px !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) !important;
}

.playback-shortcuts-ribbon span {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  color: #cbd5e1 !important;
}

body.theme-saloon .playback-shortcuts-ribbon {
  background: rgba(16, 12, 10, 0.88) !important;
  border-color: rgba(245, 158, 11, 0.15) !important;
}
`;

if (!css.includes('.playback-shortcuts-ribbon {')) {
  css += deckTypographyAdditions;
}

// Restore line endings
if (cssHasCRLF) css = css.replace(/\n/g, '\r\n');
if (htmlHasCRLF) html = html.replace(/\n/g, '\r\n');

fs.writeFileSync(cssPath, css, 'utf8');
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('[ALL SUCCESS] Applied premium dock and deck refinements to css and html!');
