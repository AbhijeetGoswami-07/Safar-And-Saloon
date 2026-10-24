# ==============================================================================
# SAFAR & SALOON (PLAYLIST) - COMPLETE CONSOLIDATED CODEBASE
# ==============================================================================
# Project: Safar & Saloon (Bus Driver & Deluxe Saloon Dual Retro Radio)
# Repository: https://github.com/AbhijeetGoswami-07/Safar-And-Saloon
# Total Files: 17
# ==============================================================================


/* ============================================================================== */
/* FILE: package.json */
/* ============================================================================== */

```json:package.json
{
  "name": "safar-and-saloon",
  "version": "1.0.0",
  "description": "Safar & Saloon - Bus Driver & Deluxe Saloon Dual Retro Radio",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "keywords": [
    "bus-driver-playlist",
    "deluxe-saloon",
    "retro-radio",
    "audio-experience"
  ],
  "author": "",
  "license": "MIT"
}

```


/* ============================================================================== */
/* FILE: server.js */
/* ============================================================================== */

```javascript:server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

const server = http.createServer((req, res) => {
  // Normalize URL
  let parsedUrl = req.url.split('?')[0];
  if (parsedUrl === '/' || parsedUrl === '') {
    parsedUrl = '/index.html';
  }

  // Prevent directory traversal
  const safePath = path.normalize(parsedUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(ROOT, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Safar & Saloon is live at: http://localhost:${PORT}`);
});

```


/* ============================================================================== */
/* FILE: index.html */
/* ============================================================================== */

```html:index.html
<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Safar & Saloon | Dual Retro Radio — Bus Driver & Deluxe Saloon</title>

  <meta name="description" content="Experience the dual nostalgic Indian radio: The Midnight Highway Bus Driver Cabin and The Sunday Morning Deluxe Barber Shop. 90s & 2000s Bollywood retro cassettes, interactive pressure horns, scissor ASMR, and continuous nostalgic playlists.">
  <meta name="keywords" content="bus driver playlist, deluxe saloon music, 90s hindi songs, bus driver website, saloon playlist, kumar sanu, alka yagnik, retro bollywood radio, indian highway radio, nh 48 songs">
  <meta name="theme-color" content="#090d16">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            ember: '#f59e0b',
            saloonTeal: '#14b8a6',
          }
        }
      }
    }
  </script>

  <!-- Custom Stylesheet -->
  <link rel="stylesheet" href="css/styles.css">
</head>
<body class="h-full flex flex-col justify-between relative selection:bg-amber-500/30 selection:text-white">

  <!-- ACTIVE YOUTUBE API BRIDGE (Hidden, low opacity, out of direct view) -->
  <div style="position:fixed;bottom:0;right:0;width:200px;height:200px;opacity:0.001;pointer-events:none;z-index:-10;overflow:hidden;">
    <div id="youtubeBridge"></div>
  </div>

  <!-- HIGH-PERFORMANCE CANVAS (3D Night Highway & Deluxe Saloon Mirror) -->
  <canvas id="sceneCanvas" class="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>

  <!-- Soft Vignette & Screen Depth Layer -->
  <div class="fixed inset-0 pointer-events-none z-[1] bg-radial-gradient from-transparent via-black/20 to-black/75"></div>

  <!-- Floating Toast Notification for Horn Hook -->
  <div id="toastNotification" class="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-0 transition-all duration-300 transform -translate-y-2">
    <div class="flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs shadow-2xl backdrop-blur-md border border-amber-400">
      <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>
      <span id="toastText">Playing Song Hook on PA Truck Horn</span>
    </div>
  </div>

  <!-- ============================================================
   * TOP HEADER NAVIGATION & MASTER DUAL-MODE TOGGLE
   * ============================================================ -->
  <header class="relative z-20 w-full px-4 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">

    <!-- Left: Brand Logo & Cultural Identity -->
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

    <!-- Center: The Master Tactile Switcher -->
    <div class="order-3 sm:order-2 w-full sm:w-auto flex justify-center mt-2 sm:mt-0">
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
    <div class="order-2 sm:order-3 flex items-center gap-2">
      <button id="settingsGearBtn" type="button" class="tactile-action-btn py-1.5 px-3 text-xs font-semibold flex items-center gap-2 hover:border-amber-400/40" title="Settings, Mixer, Sleep Timer & Shortcuts">
        <svg class="w-4 h-4 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <span class="hidden sm:inline">Settings</span>
        <span id="activeTimerBadge" class="hidden text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">30m</span>
      </button>
    </div>

  </header>

  <!-- ============================================================
   * HERO CENTER STAGE (COMPACT HIGH PLACEMENT TO KEEP ART VISIBLE)
   * ============================================================ -->
  <main class="relative z-10 flex flex-col items-center justify-start px-4 text-center select-none pt-0 pointer-events-none">

    <!-- Dynamic Hero Headline (Cleanly positioned high so the scene is completely visible) -->
    <h1 id="heroTitle" class="hero-title-headline font-big-shoulders text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-widest leading-none drop-shadow-xl mt-0.5 mb-0 select-none">
      BUS DRIVER
    </h1>

  </main>

  <!-- ============================================================
   * STATIONS BAR & UNIVERSAL CASSETTE / TRANSISTOR DOCK
   * ============================================================ -->
  <footer class="relative z-30 w-full max-w-4xl mx-auto px-4 pb-4 sm:pb-6 flex flex-col items-center gap-2.5">

    <!-- Mode-Specific Action Soundboards (Positioned lower so the shop and road are completely unobstructed) -->
    <!-- 1. BUS DRIVER ACTIONS CONTAINER -->
    <div id="driverActions" class="w-full flex flex-wrap items-center justify-center gap-2 pointer-events-auto">
      <!-- High-Pressure Indian Musical Truck Air Horn -->
      <button id="bigHornBtn" type="button" class="tactile-action-btn horn-giant-btn text-xs py-2 px-4 shadow-lg group" title="Blow High-Pressure Indian Musical Truck Horn (Press 'H')">
        <svg class="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
        <span class="font-semibold" id="blowHornBtnLabel">BLOW HORN (H)</span>
      </button>

      <!-- Auto Song Hook Horn Toggle -->
      <button id="autoHornToggleBtn" type="button" class="tactile-action-btn py-1.5 px-3 text-xs" title="Auto-blast the song's melodic hook on PA horn during playback">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 14 14"></polyline>
        </svg>
        <span>Auto Horn Hook</span>
        <span class="toggle-badge text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 font-mono">OFF</span>
      </button>

      <!-- Rain & Wipers Toggle -->
      <button id="rainWiperToggleBtn" type="button" class="tactile-action-btn py-1.5 px-3 text-xs" title="Toggle Highway Rain & Windshield Wipers">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
          <path d="M11 19l-2 3"></path>
          <path d="M15 19l-2 3"></path>
        </svg>
        <span>Rain & Wipers</span>
        <span class="toggle-badge text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 font-mono">OFF</span>
      </button>

      <!-- Engine Rumble -->
      <button id="engineHumToggleBtn" type="button" class="tactile-action-btn py-1.5 px-3 text-xs" title="Toggle Heavy Diesel Engine Rumble">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 14 14"></polyline>
        </svg>
        <span>Engine Rumble</span>
        <span class="toggle-badge text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 font-mono">OFF</span>
      </button>
    </div>

    <!-- 2. SALOON MAN ACTIONS CONTAINER (Initially Hidden) -->
    <div id="saloonActions" class="w-full flex flex-wrap items-center justify-center gap-2 pointer-events-auto hidden">
      <!-- Scissors Snip -->
      <button id="scissorSnipBtn" type="button" class="tactile-action-btn text-xs py-2 px-4 bg-gradient-to-r from-teal-600 to-teal-700 border-teal-400/40 text-white shadow-lg" title="Snip Hair Cutting Scissors (Press 'H')">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="6" cy="6" r="3"></circle>
          <circle cx="6" cy="18" r="3"></circle>
          <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
          <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
          <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
        </svg>
        <span class="font-semibold">Scissors (H)</span>
      </button>

      <!-- Spray Bottle Mist -->
      <button id="sprayMistBtn" type="button" class="tactile-action-btn py-1.5 px-3 text-xs" title="Spritz Water Bottle Mist">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
        <span>Water Mist</span>
      </button>

      <!-- Champi Vibrator -->
      <button id="champiVibratorBtn" type="button" class="tactile-action-btn py-1.5 px-3 text-xs" title="Toggle Head Massage Machine Vibrator">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        <span>Head Massage</span>
        <span class="toggle-badge text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 font-mono">OFF</span>
      </button>

      <!-- Ceiling Fan -->
      <button id="ceilingFanBtn" type="button" class="tactile-action-btn py-1.5 px-3 text-xs" title="Toggle Vintage Ceiling Fan">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.7 7.7a2.5 2.5 0 1 1 3.5 3.5L18 14H6l-3.2-2.8a2.5 2.5 0 1 1 3.5-3.5L9 10h6z"></path>
        </svg>
        <span>Ceiling Fan</span>
        <span class="toggle-badge text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 font-mono">OFF</span>
      </button>
    </div>

    <!-- Stations Bar (with dark frosted backdrop tray for crystal-clear road visibility) -->
    <div class="w-full flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-1.5 px-3 rounded-full bg-zinc-950/75 backdrop-blur-md border border-white/10 shadow-xl no-scrollbar" id="stationsNav">
      <!-- Dynamically filled with station pills -->
    </div>
      <!-- Dynamically filled with station pills -->
    </div>

    <!-- Main Universal Audio Deck Frame -->
    <div class="audio-deck-frame w-full p-3.5 sm:p-4 flex flex-col gap-3">

      <!-- Top Row: Cover, Track Info, Controls -->
      <div class="flex items-center gap-3 sm:gap-4">

        <!-- Cassette Disc Artwork (Click to Play/Pause) -->
        <div id="cassetteDisc" class="cassette-disc" title="Click to Play / Pause">
          <div id="discArtwork" class="disc-artwork" style="background-image: url('https://img.youtube.com/vi/fvwyPGBOEgY/hqdefault.jpg');"></div>
          <div class="disc-center-hole"></div>
        </div>

        <!-- Track Title & Metadata -->
        <div class="flex-1 min-w-0 flex flex-col justify-center">
          <div class="flex items-center gap-2">
            <span id="trackTag" class="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-amber-300 font-bold shrink-0">
              Midnight Vibe
            </span>
            <div id="eqVisualizer" class="eq-container">
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
              <div class="eq-bar"></div>
            </div>
          </div>
          <div id="trackTitle" class="text-xs sm:text-sm font-semibold text-white truncate leading-tight mt-0.5">
            Dil Ke Badle Sanam
          </div>
          <div class="text-[11px] text-zinc-400 truncate">
            <span id="trackArtist">Udit Narayan, Alka Yagnik</span> • <span id="trackMovie">Kyun Ki</span>
          </div>
        </div>

        <!-- Player Buttons (Prev, Play/Pause, Next) -->
        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <!-- Shuffle -->
          <button id="shuffleBtn" type="button" class="p-1.5 text-zinc-400 hover:text-white transition-colors" title="Toggle Shuffle">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
          </button>

          <!-- Prev -->
          <button id="prevBtn" type="button" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-transform active:scale-95" title="Previous Track (Left Arrow)">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>

          <!-- Big Glowing Play / Pause -->
          <button id="playBtn" type="button" class="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-zinc-950 flex items-center justify-center shadow-md shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all" title="Play / Pause (Spacebar)">
            <svg id="playIcon" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <polygon points="6,4 20,12 6,20"/>
            </svg>
          </button>

          <!-- Next -->
          <button id="nextBtn" type="button" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-transform active:scale-95" title="Next Track (Right Arrow)">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>

          <!-- Repeat -->
          <button id="repeatBtn" type="button" class="p-1.5 text-zinc-400 hover:text-white transition-colors" title="Toggle Repeat">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
          </button>
        </div>

      </div>

      <!-- Bottom Row: Progress Bar, Volume, Playlist & Custom Song Buttons -->
      <div class="flex items-center gap-3 pt-1 border-t border-white/5">

        <!-- Time Current -->
        <span id="timeCurrent" class="text-[10px] font-mono text-zinc-500 w-8 text-right shrink-0">0:00</span>

        <!-- Seek Progress Bar -->
        <div id="progressTrack" class="progress-track flex-1" role="slider" aria-label="Seek track" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div id="progressFill" class="progress-fill"></div>
        </div>

        <!-- Time Total -->
        <span id="timeDuration" class="text-[10px] font-mono text-zinc-500 w-8 shrink-0">0:00</span>

        <!-- Volume Control -->
        <div class="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
          <button id="muteBtn" type="button" class="text-zinc-400 hover:text-white transition-colors" title="Toggle Mute (Press 'M')">
            <svg id="volumeIcon" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          </button>
          <input id="volumeSlider" type="range" min="0" max="100" value="80" class="w-16">
        </div>

        <!-- Souvenir Ticket & Saloon Receipt Button -->
        <button id="openTicketBtn" type="button" class="py-1 px-2.5 sm:px-3 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-200 flex items-center gap-1.5 shrink-0 transition-colors" title="Generate Travel Ticket or Saloon Receipt">
          <svg class="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
            <path d="M13 5v2"></path>
            <path d="M13 17v2"></path>
            <path d="M13 11v2"></path>
          </svg>
          <span class="hidden md:inline">Receipt</span>
        </button>

        <!-- Open Playlist Button -->
        <button id="openPlaylistBtn" type="button" class="py-1 px-3 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-200 flex items-center gap-1.5 shrink-0 transition-colors" title="View Full Station Library">
          <svg class="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          <span class="hidden md:inline">Library</span>
        </button>

        <!-- Custom YouTube Video Input Button -->
        <button id="openCustomSongBtn" type="button" class="py-1 px-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-zinc-400 hover:text-white shrink-0 transition-colors" title="Tune Any Custom YouTube Video URL">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>

      </div>

    </div>

    <!-- Playback Shortcuts Ribbon Under the Audio Deck (Clean borderless inline shortcuts) -->
    <div class="w-full flex items-center justify-center gap-x-4 gap-y-1.5 flex-wrap text-[11px] text-zinc-400 font-medium px-2 pt-1 select-none">
      <div class="inline-flex items-center gap-1.5">
        <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-200 font-mono text-[10px] border border-white/10 shadow-sm">Space</kbd>
        <span class="text-zinc-300">Play / Pause</span>
      </div>
      <span class="text-zinc-600 hidden sm:inline">•</span>
      <div class="inline-flex items-center gap-1.5">
        <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-200 font-mono text-[10px] border border-white/10 shadow-sm">A</kbd>
        <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-200 font-mono text-[10px] border border-white/10 shadow-sm">D</kbd>
        <span class="text-zinc-300">Prev / Next</span>
      </div>
      <span class="text-zinc-600 hidden sm:inline">•</span>
      <div class="inline-flex items-center gap-1.5">
        <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-200 font-mono text-[10px] border border-white/10 shadow-sm">H</kbd>
        <span id="shortcutHornLabel" class="text-zinc-300">BLOW HORN</span>
      </div>
      <span class="text-zinc-600 hidden sm:inline">•</span>
      <div class="inline-flex items-center gap-1.5">
        <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-200 font-mono text-[10px] border border-white/10 shadow-sm">M</kbd>
        <span class="text-zinc-300">Mute</span>
      </div>
      <span class="text-zinc-600 hidden sm:inline">•</span>
      <div class="inline-flex items-center gap-1.5">
        <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-200 font-mono text-[10px] border border-white/10 shadow-sm">S</kbd>
        <span class="text-zinc-300">Switch Mode</span>
      </div>
    </div>

  </footer>

  <!-- ============================================================
   * MODAL 1: FULL SEARCHABLE PLAYLIST DRAWER
   * ============================================================ -->
  <div id="playlistDrawer" class="drawer-overlay" role="dialog" aria-modal="true" aria-labelledby="playlistDrawerTitle">
    <div class="drawer-card">
      <div class="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 id="playlistDrawerTitle" class="font-display text-xl font-bold text-white">Station Library</h2>
          <p class="text-xs text-zinc-400">Select any track to stream instantly</p>
        </div>
        <button id="closePlaylistBtn" type="button" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 text-lg flex items-center justify-center transition-colors">&times;</button>
      </div>

      <!-- Search Input -->
      <div class="my-3.5 relative">
        <svg class="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input id="searchSongInput" type="text" placeholder="Search by song, singer, or movie name..." class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400">
      </div>

      <!-- Playlist Items Container -->
      <div id="playlistItemsList" class="flex flex-col gap-1 max-h-[55vh] overflow-y-auto pr-1">
        <!-- Rendered by JS -->
      </div>
    </div>
  </div>

  <!-- ============================================================
   * MODAL 2: CONSOLIDATED SETTINGS & CALIBRATION MODAL (Opened by Gear Icon)
   * ============================================================ -->
  <div id="settingsModal" class="drawer-overlay" role="dialog" aria-modal="true" aria-labelledby="settingsModalTitle">
    <div class="drawer-card max-w-lg">
      <div class="flex items-center justify-between pb-3.5 border-b border-white/10">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <div>
            <h2 id="settingsModalTitle" class="font-display text-lg font-bold text-white">Dashboard Settings & Calibration</h2>
            <p class="text-[11px] text-zinc-400">Sleep timer, ambient audio balance, and keyboard shortcuts</p>
          </div>
        </div>
        <button id="closeSettingsBtn" type="button" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 text-lg flex items-center justify-center transition-colors">&times;</button>
      </div>

      <div class="py-4 space-y-4">
        <!-- 1. Sleep Timer Section -->
        <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span class="text-xs font-semibold text-white">Audio Sleep Timer</span>
            </div>
            <span id="settingsTimerStatus" class="text-[11px] font-mono text-zinc-400">Timer Disabled</span>
          </div>
          <div class="grid grid-cols-5 gap-1.5" id="sleepTimerOptions">
            <button type="button" data-minutes="0" class="sleep-pill active py-1.5 px-2 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-zinc-300 hover:text-white transition-all text-center">Off</button>
            <button type="button" data-minutes="15" class="sleep-pill py-1.5 px-2 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-zinc-300 hover:text-white transition-all text-center">15m</button>
            <button type="button" data-minutes="30" class="sleep-pill py-1.5 px-2 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-zinc-300 hover:text-white transition-all text-center">30m</button>
            <button type="button" data-minutes="45" class="sleep-pill py-1.5 px-2 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-zinc-300 hover:text-white transition-all text-center">45m</button>
            <button type="button" data-minutes="60" class="sleep-pill py-1.5 px-2 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-zinc-300 hover:text-white transition-all text-center">60m</button>
          </div>
        </div>

        <!-- 2. Highway Time of Day & Headlight Atmosphere Sync -->
        <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path><path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path><path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
              <span class="text-xs font-semibold text-white">Highway Time & Headlights</span>
            </div>
            <span id="settingsTimeStatus" class="text-[11px] font-mono text-zinc-400">Real-Time Sync (Auto)</span>
          </div>
          <div class="grid grid-cols-4 gap-1.5" id="timeOfDayOptions">
            <button type="button" data-time="auto" class="time-pill active py-1.5 px-2 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-zinc-300 hover:text-white transition-all text-center">Real-Time</button>
            <button type="button" data-time="day" class="time-pill py-1.5 px-2 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-zinc-300 hover:text-white transition-all text-center">Daylight</button>
            <button type="button" data-time="sunset" class="time-pill py-1.5 px-2 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-zinc-300 hover:text-white transition-all text-center">Sunset</button>
            <button type="button" data-time="night" class="time-pill py-1.5 px-2 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-zinc-300 hover:text-white transition-all text-center">Night (Glow)</button>
          </div>
        </div>

        <!-- 3. Ambient Audio Mixer Section -->
        <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
          <div class="flex items-center gap-2 mb-1">
            <svg class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
            </svg>
            <span class="text-xs font-semibold text-white">Atmospheric Audio Balance</span>
          </div>

          <!-- SFX Volume -->
          <div class="flex items-center justify-between gap-4">
            <span class="text-xs text-zinc-300">Horn Hook & Scissors (SFX)</span>
            <input id="sfxVolSlider" type="range" min="0" max="1" step="0.05" value="0.8" class="w-36">
          </div>

          <!-- Rain Volume -->
          <div class="flex items-center justify-between gap-4">
            <span class="text-xs text-zinc-300">Windshield Rain & Mist</span>
            <input id="rainVolSlider" type="range" min="0" max="1" step="0.05" value="0.35" class="w-36">
          </div>

          <!-- Engine Rumble -->
          <div class="flex items-center justify-between gap-4">
            <span class="text-xs text-zinc-300">Heavy Diesel Engine Rumble</span>
            <input id="engineVolSlider" type="range" min="0" max="1" step="0.05" value="0.25" class="w-36">
          </div>

          <!-- Fan Drone -->
          <div class="flex items-center justify-between gap-4">
            <span class="text-xs text-zinc-300">Saloon Ceiling Fan Hum</span>
            <input id="fanVolSlider" type="range" min="0" max="1" step="0.05" value="0.3" class="w-36">
          </div>
        </div>

        <!-- 3. Keyboard Shortcuts Reference -->
        <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
          <div class="flex items-center gap-2 mb-1">
            <svg class="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="M6 8h.001"></path><path d="M10 8h.001"></path><path d="M14 8h.001"></path><path d="M18 8h.001"></path>
              <path d="M8 12h.001"></path><path d="M12 12h.001"></path><path d="M16 12h.001"></path>
              <path d="M7 16h10"></path>
            </svg>
            <span class="text-xs font-semibold text-white">Keyboard Shortcuts</span>
          </div>

          <div class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-zinc-300 pt-1">
            <div class="flex items-center justify-between py-1 border-b border-white/5">
              <span class="text-zinc-400">Play / Pause</span>
              <kbd class="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-zinc-200">Space</kbd>
            </div>
            <div class="flex items-center justify-between py-1 border-b border-white/5">
              <span class="text-zinc-400">Previous Track</span>
              <div class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-zinc-200">A</kbd>
                <span class="text-[10px] text-zinc-500">/</span>
                <kbd class="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-zinc-200">←</kbd>
              </div>
            </div>
            <div class="flex items-center justify-between py-1 border-b border-white/5">
              <span class="text-zinc-400">Next Track</span>
              <div class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-zinc-200">D</kbd>
                <span class="text-[10px] text-zinc-500">/</span>
                <kbd class="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-zinc-200">→</kbd>
              </div>
            </div>
            <div class="flex items-center justify-between py-1 border-b border-white/5">
              <span class="text-zinc-400">Hook Horn / Scissors</span>
              <kbd class="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-zinc-200">H</kbd>
            </div>
            <div class="flex items-center justify-between py-1 border-b border-white/5">
              <span class="text-zinc-400">Mute Audio</span>
              <kbd class="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-zinc-200">M</kbd>
            </div>
            <div class="flex items-center justify-between py-1 border-b border-white/5">
              <span class="text-zinc-400">Switch Mode</span>
              <kbd class="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-zinc-200">S</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================================
   * MODAL 3: CUSTOM YOUTUBE SONG URL
   * ============================================================ -->
  <div id="customSongModal" class="drawer-overlay" role="dialog" aria-modal="true" aria-labelledby="customSongTitle">
    <div class="drawer-card max-w-md">
      <div class="flex items-center justify-between pb-3 border-b border-white/10">
        <h2 id="customSongTitle" class="font-display text-lg font-bold text-white">Tune Custom YouTube Video</h2>
        <button id="closeCustomSongBtn" type="button" class="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 flex items-center justify-center transition-colors">&times;</button>
      </div>

      <form id="customSongForm" class="py-4 space-y-3">
        <p class="text-xs text-zinc-400">
          Paste any YouTube video link or 11-character video ID to stream audio directly on this deck:
        </p>
        <input id="customSongInput" type="text" required placeholder="https://www.youtube.com/watch?v=..." class="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400">
        <button type="submit" class="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm transition-transform active:scale-98 shadow-md">
          Tune Track on Deck
        </button>
      </form>
    </div>
  </div>

  <!-- ============================================================
   * MODAL 4: SOUVENIR TICKET & SALOON RECEIPT
   * ============================================================ -->
  <div id="ticketModal" class="drawer-overlay" role="dialog" aria-modal="true" aria-labelledby="ticketModalTitle">
    <div class="drawer-card max-w-md">
      <div class="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
        <h2 id="ticketModalTitle" class="font-display text-lg font-bold text-white">Souvenir Travel Ticket & Receipt</h2>
        <button id="closeTicketBtn" type="button" class="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 flex items-center justify-center transition-colors">&times;</button>
      </div>

      <!-- Ticket Paper Content injected by JS -->
      <div id="ticketContent" class="mb-4"></div>

      <!-- Action Buttons: Download Receipt & Print Ticket -->
      <div class="flex items-center justify-center gap-2 mb-3">
        <button id="downloadTicketBtn" type="button" class="tactile-action-btn py-2 px-4 text-xs font-semibold flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span id="downloadTicketBtnLabel">Download Receipt (PNG)</span>
        </button>

        <button id="printTicketBtn" type="button" class="tactile-action-btn py-2 px-3.5 text-xs font-semibold flex items-center gap-1.5 hover:bg-white/10 text-white">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          <span>Print</span>
        </button>
      </div>

      <div class="text-center text-[11px] text-zinc-400">
        Saved as an authentic retro souvenir card with live ticket details.
      </div>
    </div>
  </div>



  <!-- Application Scripts -->
  <script src="js/audioEngine.js"></script>
  <script src="js/playlistData.js"></script>
  <script src="js/visuals.js"></script>
  <script src="js/player.js"></script>
  <script src="js/pressureHorn.js"></script>
  <script src="js/app.js"></script>

</body>
</html>

```


/* ============================================================================== */
/* FILE: css/styles.css */
/* ============================================================================== */

```css:css/styles.css
/* ============================================================
 * SAFAR & SALOON - Modern Professional Stylesheet
 * High-precision dual-mode audio player interface
 * Theme 1: Highway Cabin (Deep Slate & Amber)
 * Theme 2: Deluxe Saloon (Deep Onyx & Refined Teal)
 * ============================================================ */

@font-face {
  font-family: 'Big Shoulders';
  src: url('/fonts/BigShoulders-VariableFont_opsz,wght.ttf') format('truetype-variations'),
       url('../fonts/BigShoulders-VariableFont_opsz,wght.ttf') format('truetype-variations'),
       url('/fonts/static/BigShoulders_60pt-Black.ttf') format('truetype'),
       url('../fonts/static/BigShoulders_60pt-Black.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Big+Shoulders+Text:wght@700;800;900&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.font-big-shoulders {
  font-family: 'Big Shoulders', 'Big Shoulders Display', sans-serif;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

:root {
  /* Default: Highway Cabin Theme */
  --bg-core: #090d16;
  --bg-card: rgba(15, 23, 42, 0.72);
  --border-card: rgba(255, 255, 255, 0.08);
  --border-card-hover: rgba(245, 158, 11, 0.35);
  --accent-primary: #f59e0b;
  --accent-secondary: #d97706;
  --accent-glow: rgba(245, 158, 11, 0.25);
  --accent-contrast: #0f172a;
  --text-primary: #f8fafc;
  --text-muted: #94a3b8;
  --led-bar: #10b981;
}

/* Deluxe Saloon Theme Overrides */
body.theme-saloon {
  --bg-core: #0c0a09;
  --bg-card: rgba(28, 25, 23, 0.76);
  --border-card: rgba(255, 255, 255, 0.08);
  --border-card-hover: rgba(20, 184, 166, 0.35);
  --accent-primary: #14b8a6;
  --accent-secondary: #0d9488;
  --accent-glow: rgba(20, 184, 166, 0.25);
  --accent-contrast: #042f2e;
  --text-primary: #fafaf9;
  --text-muted: #a8a29e;
  --led-bar: #f59e0b;
}

* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-core);
  color: var(--text-primary);
  font-family: 'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  user-select: none;
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

.font-display {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Custom minimal scrollbar */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.16);
  border-radius: 999px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--accent-primary);
}

/* ============================================================
 * BRAND IDENTITY BADGE
 * ============================================================ */

.brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px 8px;
  border-radius: 9999px;
  background: rgba(9, 13, 22, 0.78);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
  transition: all 0.25s ease;
  user-select: none;
}

body.theme-saloon .brand-badge {
  background: rgba(24, 15, 10, 0.82);
  border-color: rgba(245, 158, 11, 0.25);
}

.brand-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #fbbf24, #d97706);
  color: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.4);
  flex-shrink: 0;
}

body.theme-saloon .brand-icon-box {
  background: linear-gradient(135deg, #2dd4bf, #0d9488);
  box-shadow: 0 2px 10px rgba(20, 184, 166, 0.4);
}

/* ============================================================
 * MODE SWITCHER COMPONENT
 * ============================================================ */

.mode-switch-wrapper {
  position: relative;
  display: inline-flex;
  padding: 3px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.70);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  min-width: 240px;
}

.mode-switch-slider {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc(50% - 3px);
  border-radius: 9999px;
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.28s ease;
  pointer-events: none;
  z-index: 1;
}

body:not(.theme-saloon) .mode-switch-slider {
  transform: translateX(0%);
  background: linear-gradient(135deg, #f59e0b, #d97706);
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.35);
}

body.theme-saloon .mode-switch-slider {
  transform: translateX(100%);
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  box-shadow: 0 2px 10px rgba(20, 184, 166, 0.35);
}

.mode-btn {
  position: relative;
  z-index: 2;
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 16px;
  border-radius: 9999px;
  border: none;
  outline: none !important;
  background: transparent;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 600;
  font-size: 12.5px;
  cursor: pointer;
  transition: color 0.2s ease;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  box-shadow: none !important;
}

.mode-btn:focus,
.mode-btn:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

.mode-switch-wrapper:focus-within {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.25), 0 4px 20px rgba(0, 0, 0, 0.4);
}

.mode-btn:hover {
  color: #ffffff;
}

body:not(.theme-saloon) .mode-btn.driver-active {
  color: #0f172a;
  font-weight: 700;
}

body.theme-saloon .mode-btn.saloon-active {
  color: #042f2e;
  font-weight: 700;
}

/* ============================================================
 * AUDIO DECK & CASSETTE CONTROLS
 * ============================================================ */

.audio-deck-frame {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.08);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.audio-deck-frame:hover {
  border-color: var(--border-card-hover);
}

/* Spinning Disc Vinyl / Cassette Art */
.cassette-disc {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: radial-gradient(circle, #27272a 20%, #09090b 65%, #18181b 100%);
  border: 2px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.cassette-disc:hover {
  transform: scale(1.05);
  border-color: var(--accent-primary);
}

.cassette-disc.spinning .disc-artwork {
  animation: discRotation 3.8s linear infinite;
}

@keyframes discRotation {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.disc-artwork {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}

.disc-center-hole {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  background: #09090b;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}

/* LED Equalizer Bars */
.eq-container {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
}

.eq-bar {
  width: 3px;
  background-color: var(--led-bar);
  border-radius: 1px;
  transition: height 0.12s ease;
  height: 3px;
}

.is-playing .eq-bar:nth-child(1) { animation: eqJump 0.5s ease-in-out infinite alternate; }
.is-playing .eq-bar:nth-child(2) { animation: eqJump 0.7s ease-in-out 0.1s infinite alternate; }
.is-playing .eq-bar:nth-child(3) { animation: eqJump 0.4s ease-in-out 0.2s infinite alternate; }
.is-playing .eq-bar:nth-child(4) { animation: eqJump 0.8s ease-in-out 0.15s infinite alternate; }
.is-playing .eq-bar:nth-child(5) { animation: eqJump 0.6s ease-in-out 0.05s infinite alternate; }

@keyframes eqJump {
  0% { height: 3px; }
  50% { height: 13px; }
  100% { height: 6px; }
}

/* ============================================================
 * INTERACTIVE BUTTONS & CONTROLS
 * ============================================================ */

.tactile-action-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(18, 24, 38, 0.6);
  color: rgba(255, 255, 255, 0.9);
  font-size: 12.5px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tactile-action-btn:hover {
  transform: translateY(-1px);
  background: rgba(30, 41, 59, 0.85);
  border-color: var(--accent-primary);
  color: #ffffff;
  box-shadow: 0 6px 18px var(--accent-glow);
}

.tactile-action-btn:active {
  transform: translateY(1px);
}

.tactile-action-btn.active {
  background: rgba(245, 158, 11, 0.18);
  border-color: var(--accent-primary);
  color: #ffffff;
}

body.theme-saloon .tactile-action-btn.active {
  background: rgba(20, 184, 166, 0.18);
}

/* Primary Highlight Action Button */
.horn-giant-btn {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  border-color: rgba(248, 113, 113, 0.4);
  color: #ffffff;
  box-shadow: 0 6px 20px rgba(220, 38, 38, 0.45);
}

.horn-giant-btn:hover {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.6);
}

/* ============================================================
 * PROGRESS & SEEK SLIDER
 * ============================================================ */

.progress-track {
  position: relative;
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  cursor: pointer;
  overflow: hidden;
  transition: height 0.15s ease;
}

.progress-track:hover {
  height: 7px;
}

.progress-fill {
  height: 100%;
  background: var(--accent-primary);
  width: 0%;
  border-radius: 999px;
  transition: width 0.1s linear, background-color 0.3s ease;
  box-shadow: 0 0 10px var(--accent-glow);
}

/* Volume Slider */
input[type="range"] {
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.18);
  height: 4px;
  border-radius: 999px;
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: transform 0.15s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.25);
  background: var(--accent-primary);
}

/* ============================================================
 * HERO TITLE COMPACT POSITIONING (PREVENTS COVERING CANVAS ART)
 * ============================================================ */

.hero-title-headline {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  line-height: 1 !important;
  font-size: clamp(2.2rem, 5.5vw, 4.2rem) !important;
  letter-spacing: 2.5px !important;
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.8) !important;
  pointer-events: none;
}

body.theme-saloon .hero-title-headline {
  font-size: clamp(1.8rem, 4vw, 3.2rem) !important;
  letter-spacing: 3.5px !important;
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.95) !important;
  color: #fef3c7 !important;
}

/* ============================================================
 * STATION PILLS (SOLID HIGH-CONTRAST VISIBILITY OVER ROAD & HEADLIGHTS)
 * ============================================================ */

.station-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: rgba(10, 15, 28, 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  font-size: 12px;
  font-weight: 600;
  color: #f8fafc;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.65);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.station-pill:hover {
  background: rgba(20, 30, 52, 0.96);
  border-color: rgba(255, 255, 255, 0.45);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.8);
}

.station-pill.active {
  background: linear-gradient(135deg, #f59e0b, #d97706) !important;
  color: #090d16 !important;
  font-weight: 700 !important;
  border-color: #f59e0b !important;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.65) !important;
  text-shadow: none !important;
}

body.theme-saloon .station-pill {
  background: rgba(20, 12, 8, 0.90);
  border-color: rgba(245, 158, 11, 0.25);
  color: #fef3c7;
}

body.theme-saloon .station-pill:hover {
  background: rgba(36, 20, 12, 0.96);
  border-color: rgba(245, 158, 11, 0.5);
  color: #ffffff;
}

body.theme-saloon .station-pill.active {
  background: linear-gradient(135deg, #14b8a6, #0d9488) !important;
  color: #042f2e !important;
  border-color: #14b8a6 !important;
  box-shadow: 0 0 20px rgba(20, 184, 166, 0.65) !important;
  text-shadow: none !important;
}

.sleep-pill.active, .time-pill.active {
  background: var(--accent-primary) !important;
  color: #0f172a !important;
  font-weight: 700 !important;
  border-color: var(--accent-primary) !important;
  box-shadow: 0 0 14px var(--accent-glow) !important;
}

/* ============================================================
 * MODALS & DRAWERS
 * ============================================================ */

.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 50;
  display: none;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.drawer-overlay.open {
  display: flex;
  opacity: 1;
}

.drawer-card {
  position: relative;
  background: #0f172a;
  background: radial-gradient(circle at top, #1e293b 0%, #090d16 100%);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
  max-height: 85vh;
  width: 100%;
  max-width: 620px;
  margin: auto;
  padding: 24px;
  overflow-y: auto;
  transform: translateY(16px) scale(0.97);
  transition: transform 0.25s cubic-bezier(0.34, 1.3, 0.64, 1);
}

body.theme-saloon .drawer-card {
  background: radial-gradient(circle at top, #281912 0%, #0e0a08 100%);
  border-color: rgba(245, 158, 11, 0.2);
}

.drawer-overlay.open .drawer-card {
  transform: translateY(0) scale(1);
}

/* Shuffle and Repeat Active Button States */
#shuffleBtn.active, #repeatBtn.active {
  color: var(--accent-primary) !important;
  filter: drop-shadow(0 0 8px var(--accent-glow));
}

/* Professional Travel Boarding Pass & Salon Receipt Styling */
.ticket-paper {
  background: #ffffff;
  color: #0f172a;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65);
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

body.theme-saloon .ticket-paper {
  background: #fdfcfb;
  border-color: #e7e5e4;
}

.ticket-notch-left, .ticket-notch-right {
  position: absolute;
  top: 60%;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #090d16;
  border: 1px solid rgba(255, 255, 255, 0.12);
  z-index: 5;
}

body.theme-saloon .ticket-notch-left, body.theme-saloon .ticket-notch-right {
  background: #0e0a08;
  border-color: rgba(245, 158, 11, 0.15);
}

.ticket-notch-left { left: -9px; margin-top: -9px; }
.ticket-notch-right { right: -9px; margin-top: -9px; }

/* Barcode Simulation Lines */
.barcode-bar {
  display: inline-block;
  height: 28px;
  background-color: #0f172a;
}

/* ============================================================
 * ACCESSIBILITY & UTILITY ADDITIONS
 * ============================================================ */

/* Hide scrollbars while allowing touch/mouse drag scroll */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Visible high-contrast focus ring for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--accent-primary) !important;
  outline-offset: 2px !important;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Print Styles for Souvenir Card */
@media print {
  body * {
    visibility: hidden;
  }
  #ticketModal, #ticketModal .ticket-paper, #ticketModal .ticket-paper * {
    visibility: visible;
  }
  #ticketModal {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: transparent;
    display: block !important;
    opacity: 1 !important;
  }
  #ticketModal .drawer-card {
    box-shadow: none;
    border: none;
    background: transparent;
    max-width: 100%;
    padding: 0;
  }
  #ticketModal button {
    display: none !important;
  }
}

```


/* ============================================================================== */
/* FILE: js/playlistData.js */
/* ============================================================================== */

```javascript:js/playlistData.js
/**
 * SAFAR & SALOON: DUAL RETRO RADIO PLATFORM
 * Curated retro stations for Bus Driver and Deluxe Saloon modes
 * 100% verified, active YouTube stream IDs
 */

window.playlistData = {
  "driver": {
    "name": "Bus Driver (Cabin Soundboard)",
    "tagline": "Late-night interstate travel, roadside tea stalls, and iconic retro highway cassettes",
    "dialogue": "Chalti ka naam gaadi. Lights on high beam, NH-48 awaits ahead.",
    "stations": [
      {
        "id": "nh48-sleeper",
        "name": "NH-48 Midnight Sleeper",
        "description": "Late night interstate coach ambiance: soulful melodies, gentle rumble, and endless asphalt.",
        "badge": "FM 93.5 • CASSETTE",
        "tracks": [
          {
            "id": "fvwyPGBOEgY",
            "title": "Main Rang Sharbaton Ka",
            "artist": "Atif Aslam, Chinmayi",
            "movie": "Phata Poster Nikhla Hero",
            "duration": "4:23",
            "thumb": "https://img.youtube.com/vi/fvwyPGBOEgY/hqdefault.jpg",
            "tag": "Midnight Vibe"
          },
          {
            "id": "Cb6wuzOurPc",
            "title": "Tum Se Hi",
            "artist": "Mohit Chauhan",
            "movie": "Jab We Met",
            "duration": "5:23",
            "thumb": "https://img.youtube.com/vi/Cb6wuzOurPc/hqdefault.jpg",
            "tag": "Rainy Cabin"
          },
          {
            "id": "T94PHkuydcw",
            "title": "Kun Faya Kun",
            "artist": "A.R. Rahman, Javed Ali, Mohit Chauhan",
            "movie": "Rockstar",
            "duration": "7:53",
            "thumb": "https://img.youtube.com/vi/T94PHkuydcw/hqdefault.jpg",
            "tag": "Sufi Journey"
          },
          {
            "id": "jfKfPfyJRdk",
            "title": "Kabira (Encore)",
            "artist": "Arijit Singh, Harshdeep Kaur",
            "movie": "Yeh Jawaani Hai Deewani",
            "duration": "4:29",
            "thumb": "https://img.youtube.com/vi/jfKfPfyJRdk/hqdefault.jpg",
            "tag": "Acoustic"
          },
          {
            "id": "Nbr_KJT0TIc",
            "title": "Pee Loon",
            "artist": "Mohit Chauhan",
            "movie": "Once Upon a Time in Mumbaai",
            "duration": "4:48",
            "thumb": "https://img.youtube.com/vi/Nbr_KJT0TIc/hqdefault.jpg",
            "tag": "Highway Dhaba"
          },
          {
            "id": "hbcGx4MGUMg",
            "title": "Zara Sa",
            "artist": "KK",
            "movie": "Jannat",
            "duration": "5:03",
            "thumb": "https://img.youtube.com/vi/hbcGx4MGUMg/hqdefault.jpg",
            "tag": "KK Nostalgia"
          },
          {
            "id": "BddP6PYo2gs",
            "title": "Kesariya",
            "artist": "Arijit Singh",
            "movie": "Brahmāstra",
            "duration": "4:28",
            "thumb": "https://img.youtube.com/vi/BddP6PYo2gs/hqdefault.jpg",
            "tag": "Golden Sunset"
          },
          {
            "id": "Umqb9KENgmk",
            "title": "Raabta (Kehte Hain Khuda)",
            "artist": "Arijit Singh",
            "movie": "Agent Vinod",
            "duration": "4:04",
            "thumb": "https://img.youtube.com/vi/Umqb9KENgmk/hqdefault.jpg",
            "tag": "Late Hours"
          },
          {
            "id": "fdubeMFwuGs",
            "title": "Ilahi",
            "artist": "Arijit Singh",
            "movie": "Yeh Jawaani Hai Deewani",
            "duration": "3:49",
            "thumb": "https://img.youtube.com/vi/fdubeMFwuGs/hqdefault.jpg",
            "tag": "Wanderlust"
          },
          {
            "id": "gvyUuxdRdR4",
            "title": "Mast Magan",
            "artist": "Arijit Singh, Chinmayi",
            "movie": "2 States",
            "duration": "4:40",
            "thumb": "https://img.youtube.com/vi/gvyUuxdRdR4/hqdefault.jpg",
            "tag": "Pure Devotion"
          },
          {
            "id": "sK7riqg2mr4",
            "title": "Agar Tum Saath Ho",
            "artist": "Alka Yagnik, Arijit Singh",
            "movie": "Tamasha",
            "duration": "5:41",
            "thumb": "https://img.youtube.com/vi/sK7riqg2mr4/hqdefault.jpg",
            "tag": "Late Night Heartbreak"
          }
        ]
      },
      {
        "id": "gulzar-ghazals",
        "name": "Gulzar Ghazals",
        "description": "Poetic masterpieces, heartfelt Nazms, and timeless acoustic ghazals penned by Gulzar Sahab.",
        "badge": "MW 603 • GULZAR",
        "tracks": [
          {
            "id": "_UEpGEXcMn4",
            "title": "Tujhse Naraz Nahin Zindagi",
            "artist": "Anup Ghoshal, Lata Mangeshkar",
            "movie": "Masoom (1983)",
            "duration": "5:41",
            "thumb": "https://img.youtube.com/vi/_UEpGEXcMn4/hqdefault.jpg",
            "tag": "Gulzar Masterpiece"
          },
          {
            "id": "Zm4V6ty4K6k",
            "title": "Tere Bina Zindagi Se Koi",
            "artist": "Kishore Kumar, Lata Mangeshkar",
            "movie": "Aandhi (1975)",
            "duration": "5:52",
            "thumb": "https://img.youtube.com/vi/Zm4V6ty4K6k/hqdefault.jpg",
            "tag": "Soulful Ghazal"
          },
          {
            "id": "MDXFi3avqo0",
            "title": "Woh Shaam Kuchh Ajeeb Thi",
            "artist": "Kishore Kumar",
            "movie": "Khamoshi (1969)",
            "duration": "4:46",
            "thumb": "https://img.youtube.com/vi/MDXFi3avqo0/hqdefault.jpg",
            "tag": "Poetic Solitude"
          },
          {
            "id": "XUexH7Xk1yk",
            "title": "Mera Kuchh Saamaan",
            "artist": "Asha Bhosle",
            "movie": "Ijaazat (1987)",
            "duration": "6:05",
            "thumb": "https://img.youtube.com/vi/XUexH7Xk1yk/hqdefault.jpg",
            "tag": "National Award Winner"
          },
          {
            "id": "3UsReAi_LIU",
            "title": "Shaam Se Aankh Mein Nami Si Hai",
            "artist": "Jagjit Singh, Gulzar",
            "movie": "Marasim (1999)",
            "duration": "5:22",
            "thumb": "https://img.youtube.com/vi/3UsReAi_LIU/hqdefault.jpg",
            "tag": "Acoustic Ghazal"
          },
          {
            "id": "Q87TZLzRfwU",
            "title": "Haath Chhoote Bhi Toh",
            "artist": "Jagjit Singh, Gulzar",
            "movie": "Marasim (1999)",
            "duration": "5:18",
            "thumb": "https://img.youtube.com/vi/Q87TZLzRfwU/hqdefault.jpg",
            "tag": "Marasim Classic"
          },
          {
            "id": "WKP5cqQvUBg",
            "title": "Dil Dhoondta Hai Phir Wohi",
            "artist": "Bhupinder Singh, Lata Mangeshkar",
            "movie": "Mausam (1975)",
            "duration": "4:15",
            "thumb": "https://img.youtube.com/vi/WKP5cqQvUBg/hqdefault.jpg",
            "tag": "Timeless Poetry"
          },
          {
            "id": "uLi3WcON1CU",
            "title": "Do Deewane Shahar Mein",
            "artist": "Bhupinder Singh, Runa Laila",
            "movie": "Ghar (1978)",
            "duration": "4:50",
            "thumb": "https://img.youtube.com/vi/uLi3WcON1CU/hqdefault.jpg",
            "tag": "Monsoon Ghazal"
          },
          {
            "id": "lySbCeZjVlw",
            "title": "Naam Gum Jayega",
            "artist": "Lata Mangeshkar, Bhupinder Singh",
            "movie": "Kinara (1977)",
            "duration": "5:25",
            "thumb": "https://img.youtube.com/vi/lySbCeZjVlw/hqdefault.jpg",
            "tag": "Everlasting Identity"
          },
          {
            "id": "dmm5lM9BR8o",
            "title": "Aap Ki Ankhon Mein Kuch",
            "artist": "Kishore Kumar, Lata Mangeshkar",
            "movie": "Ghar (1978)",
            "duration": "4:10",
            "thumb": "https://img.youtube.com/vi/dmm5lM9BR8o/hqdefault.jpg",
            "tag": "Pure Romanticism"
          },
          {
            "id": "Efx7BIzMEPI",
            "title": "Is Mod Se Jaate Hain",
            "artist": "Kishore Kumar, Lata Mangeshkar",
            "movie": "Aandhi (1975)",
            "duration": "4:55",
            "thumb": "https://img.youtube.com/vi/Efx7BIzMEPI/hqdefault.jpg",
            "tag": "Golden Nostalgia"
          }
        ]
      },
      {
        "id": "manache-ghaav",
        "name": "Manache Ghaav",
        "description": "Deeply emotional, poignant Marathi sad songs and heart-touching melancholy.",
        "badge": "AIR 747 • MARATHI",
        "tracks": [
          {
            "id": "2JZTIVd4XN0",
            "title": "Man Udhan Varyache",
            "artist": "Shankar Mahadevan, Ajay-Atul",
            "movie": "Agga Bai Arrecha (2004)",
            "duration": "5:12",
            "thumb": "https://img.youtube.com/vi/2JZTIVd4XN0/hqdefault.jpg",
            "tag": "Heartache Classic"
          },
          {
            "id": "3zdCPhX7ah4",
            "title": "Kiti Sangaychay Mala",
            "artist": "Jasraj Joshi, Anandi Joshi",
            "movie": "Double Seat (2015)",
            "duration": "4:48",
            "thumb": "https://img.youtube.com/vi/3zdCPhX7ah4/hqdefault.jpg",
            "tag": "Deep Sorrow"
          },
          {
            "id": "Y4TICMyl9Eg",
            "title": "Kadhi Tu Rimjhim Zharanari",
            "artist": "Saleel Kulkarni, Sandeep Khare",
            "movie": "Mumbai Pune Mumbai (2010)",
            "duration": "5:30",
            "thumb": "https://img.youtube.com/vi/Y4TICMyl9Eg/hqdefault.jpg",
            "tag": "Melancholic Rain"
          },
          {
            "id": "cRKNTAbnYRs",
            "title": "Deva Tujhya Gabharyala",
            "artist": "Adarsh Shinde, Kirti Killedar",
            "movie": "Duniyadari (2013)",
            "duration": "4:35",
            "thumb": "https://img.youtube.com/vi/cRKNTAbnYRs/hqdefault.jpg",
            "tag": "Soulful Agony"
          },
          {
            "id": "OkNLme6dCsE",
            "title": "Mee Raat Takali",
            "artist": "Lata Mangeshkar",
            "movie": "Jait Re Jait (1977)",
            "duration": "4:22",
            "thumb": "https://img.youtube.com/vi/OkNLme6dCsE/hqdefault.jpg",
            "tag": "Heartbreak Folklore"
          },
          {
            "id": "DQNxigVPh1s",
            "title": "Jeevalaga Rahile Re Door",
            "artist": "Lata Mangeshkar, Sudhir Phadke",
            "movie": "Bhavgeet Classic",
            "duration": "4:15",
            "thumb": "https://img.youtube.com/vi/DQNxigVPh1s/hqdefault.jpg",
            "tag": "Wounds of Heart"
          },
          {
            "id": "I9Ehun8Ahk4",
            "title": "Shravanat Ghan Neela",
            "artist": "Lata Mangeshkar, Hridaynath Mangeshkar",
            "movie": "Marathi Bhavgeet",
            "duration": "4:40",
            "thumb": "https://img.youtube.com/vi/I9Ehun8Ahk4/hqdefault.jpg",
            "tag": "Poignant Rain"
          },
          {
            "id": "UXJF8e90Nxc",
            "title": "Usavale Dhaage",
            "artist": "Hamsika Iyer, Rahul Ranade",
            "movie": "Mangalashtak Once More (2013)",
            "duration": "4:50",
            "thumb": "https://img.youtube.com/vi/UXJF8e90Nxc/hqdefault.jpg",
            "tag": "Emotional Solitude"
          },
          {
            "id": "0wWF0Lons_A",
            "title": "Tula Pahate Re",
            "artist": "Zee Marathi Special",
            "movie": "Tula Pahate Re (2018)",
            "duration": "4:20",
            "thumb": "https://img.youtube.com/vi/0wWF0Lons_A/hqdefault.jpg",
            "tag": "Haunting Melancholy"
          },
          {
            "id": "OU1fvtWggBk",
            "title": "Atasha Ase He Mala Kay Hote",
            "artist": "Sandeep Khare, Saleel Kulkarni",
            "movie": "Ayushyavar Bolu Kahi",
            "duration": "5:05",
            "thumb": "https://img.youtube.com/vi/OU1fvtWggBk/hqdefault.jpg",
            "tag": "Soulful Separation"
          }
        ]
      },
      {
        "id": "dhaba-banger",
        "name": "Highway Dhaba Beats",
        "description": "High-octane highway dhabas: piping hot kadak chai, loud subwoofers, and unstoppable energy.",
        "badge": "AM 1240 • HIGH BASS",
        "tracks": [
          {
            "id": "h6Ze5Hqa1wA",
            "title": "Bolo Ta Ra Ra",
            "artist": "Daler Mehndi",
            "movie": "Bolo Ta Ra Ra (1995)",
            "duration": "4:56",
            "thumb": "https://img.youtube.com/vi/h6Ze5Hqa1wA/hqdefault.jpg",
            "tag": "Punjabi Gold"
          },
          {
            "id": "M3UDnXE8m3A",
            "title": "Dardi Rab Rab Kardi",
            "artist": "Daler Mehndi",
            "movie": "Dardi Rab Rab (1996)",
            "duration": "4:50",
            "thumb": "https://img.youtube.com/vi/M3UDnXE8m3A/hqdefault.jpg",
            "tag": "Highway Favorite"
          },
          {
            "id": "92ydUdqWE1g",
            "title": "Tunak Tunak Tun",
            "artist": "Daler Mehndi",
            "movie": "Tunak Tunak Tun (1998)",
            "duration": "5:02",
            "thumb": "https://img.youtube.com/vi/92ydUdqWE1g/hqdefault.jpg",
            "tag": "All-Time Anthem"
          },
          {
            "id": "K-pX4qwtAxA",
            "title": "Chhaiyya Chhaiyya",
            "artist": "Sukhwinder Singh, Sapna Awasthi",
            "movie": "Dil Se (1998)",
            "duration": "6:54",
            "thumb": "https://img.youtube.com/vi/K-pX4qwtAxA/hqdefault.jpg",
            "tag": "A.R. Rahman Magic"
          },
          {
            "id": "x_elT6zkqN0",
            "title": "O O Jaane Jaana",
            "artist": "Kamaal Khan",
            "movie": "Pyaar Kiya To Darna Kya (1998)",
            "duration": "5:46",
            "thumb": "https://img.youtube.com/vi/x_elT6zkqN0/hqdefault.jpg",
            "tag": "90s Highway Classic"
          }
        ]
      },
      {
        "id": "ghats-rain",
        "name": "Monsoon Highway & Rain",
        "description": "Climbing through misty Western Ghats with windshield wipers slicing steady monsoon rain.",
        "badge": "SW 49m • MONSOON",
        "tracks": [
          {
            "id": "l9cR3CMyuzc",
            "title": "Barso Re",
            "artist": "Shreya Ghoshal, A.R. Rahman",
            "movie": "Guru (2007)",
            "duration": "5:29",
            "thumb": "https://img.youtube.com/vi/l9cR3CMyuzc/hqdefault.jpg",
            "tag": "Rain Anthem"
          },
          {
            "id": "VMsn5-a45-s",
            "title": "Tip Tip Barsa Paani",
            "artist": "Udit Narayan, Alka Yagnik",
            "movie": "Mohra (1994)",
            "duration": "5:58",
            "thumb": "https://img.youtube.com/vi/VMsn5-a45-s/hqdefault.jpg",
            "tag": "Monsoon Classic"
          },
          {
            "id": "AMuRRXCuy-4",
            "title": "Pal Pal Dil Ke Paas",
            "artist": "Kishore Kumar",
            "movie": "Blackmail (1973)",
            "duration": "5:28",
            "thumb": "https://img.youtube.com/vi/AMuRRXCuy-4/hqdefault.jpg",
            "tag": "Golden Retro"
          },
          {
            "id": "mZwJs1YQ-Wk",
            "title": "Kisi Din Banoongi Main",
            "artist": "Alka Yagnik, Udit Narayan",
            "movie": "Raja (1995)",
            "duration": "7:02",
            "thumb": "https://img.youtube.com/vi/mZwJs1YQ-Wk/hqdefault.jpg",
            "tag": "Nostalgic Romance"
          }
        ]
      },
      {
        "id": "bhojpuri-garda",
        "name": "Bhojpuri Garda",
        "description": "Powerhouse Bhojpuri beats, authentic desi dholak grooves, and high-energy rural anthems.",
        "badge": "AM 1080 • BHOJPURI",
        "tracks": [
          {
            "id": "Gr8G_ldltDE",
            "title": "Kamariya Kare Lapa Lop (Lollypop Lagelu)",
            "artist": "Pawan Singh",
            "movie": "Superhit Cassette (2008)",
            "duration": "4:15",
            "thumb": "https://img.youtube.com/vi/Gr8G_ldltDE/hqdefault.jpg",
            "tag": "World Anthem"
          },
          {
            "id": "2Mv8UOiyTq0",
            "title": "Rinkiya Ke Papa (Chat Deni Maar Deli)",
            "artist": "Manoj Tiwari",
            "movie": "Uparwali Ke Chakkar Mein",
            "duration": "4:42",
            "thumb": "https://img.youtube.com/vi/2Mv8UOiyTq0/hqdefault.jpg",
            "tag": "Desi Classic"
          },
          {
            "id": "N9Ylebtf8YI",
            "title": "Raate Diya Butake",
            "artist": "Pawan Singh, Amrapali Dubey",
            "movie": "Satya (2017)",
            "duration": "4:28",
            "thumb": "https://img.youtube.com/vi/N9Ylebtf8YI/hqdefault.jpg",
            "tag": "Blockbuster Beat"
          },
          {
            "id": "vwMR0yf4q04",
            "title": "Piyawa Se Pahile Hamar Rahlu",
            "artist": "Ritesh Pandey, Khushbu Tiwari",
            "movie": "Wave Music Superhit (2017)",
            "duration": "4:10",
            "thumb": "https://img.youtube.com/vi/vwMR0yf4q04/hqdefault.jpg",
            "tag": "Desi Sensation"
          },
          {
            "id": "c4JD7rEtIj8",
            "title": "Chhalakata Hamro Jawaniya",
            "artist": "Pawan Singh, Priyanka Singh",
            "movie": "Bhojpuriya Raja (2016)",
            "duration": "3:58",
            "thumb": "https://img.youtube.com/vi/c4JD7rEtIj8/hqdefault.jpg",
            "tag": "High Bass"
          }
        ]
      }
    ]
  },
  "saloon": {
    "name": "Deluxe Saloon (Barbershop Lounge)",
    "tagline": "Sunday morning grooming, vintage radio warmth, and timeless romantic melodies",
    "dialogue": "A warm shave, fresh aftershave, and soulful melodies on the radio.",
    "stations": [
      {
        "id": "deluxe-romance",
        "name": "Deluxe 90s Romance",
        "description": "The classic soundtrack of an unhurried morning haircut and warm towel treatment.",
        "badge": "MW 540 • PHILIPS",
        "tracks": [
          {
            "id": "RVQsBlI35vw",
            "title": "Mera Dil Bhi Kitna Pagal Hai",
            "artist": "Kumar Sanu, Alka Yagnik",
            "movie": "Saajan (1991)",
            "duration": "5:25",
            "thumb": "https://img.youtube.com/vi/RVQsBlI35vw/hqdefault.jpg",
            "tag": "Kumar Sanu Gold"
          },
          {
            "id": "KeyfUuXPOcY",
            "title": "Dheere Dheere Se Meri Zindagi",
            "artist": "Kumar Sanu, Anuradha Paudwal",
            "movie": "Aashiqui (1990)",
            "duration": "5:30",
            "thumb": "https://img.youtube.com/vi/KeyfUuXPOcY/hqdefault.jpg",
            "tag": "Nadeem-Shravan"
          },
          {
            "id": "uNt18l9UfjE",
            "title": "Nazar Ke Samne Jigar Ke Paas",
            "artist": "Kumar Sanu, Anuradha Paudwal",
            "movie": "Aashiqui (1990)",
            "duration": "5:36",
            "thumb": "https://img.youtube.com/vi/uNt18l9UfjE/hqdefault.jpg",
            "tag": "Vintage Masterpiece"
          },
          {
            "id": "cNV5hLSa9H8",
            "title": "Tujhe Dekha Toh Yeh Jaana Sanam",
            "artist": "Kumar Sanu, Lata Mangeshkar",
            "movie": "DDLJ (1995)",
            "duration": "5:04",
            "thumb": "https://img.youtube.com/vi/cNV5hLSa9H8/hqdefault.jpg",
            "tag": "90s Romance"
          },
          {
            "id": "htMvfOfixuM",
            "title": "Ek Ladki Ko Dekha Toh Aisa Laga",
            "artist": "Kumar Sanu",
            "movie": "1942: A Love Story (1994)",
            "duration": "4:36",
            "thumb": "https://img.youtube.com/vi/htMvfOfixuM/hqdefault.jpg",
            "tag": "Acoustic Melody"
          },
          {
            "id": "Mj3KyjuKbqI",
            "title": "Aaye Ho Meri Zindagi Mein",
            "artist": "Udit Narayan",
            "movie": "Raja Hindustani (1996)",
            "duration": "6:02",
            "thumb": "https://img.youtube.com/vi/Mj3KyjuKbqI/hqdefault.jpg",
            "tag": "Saloon Special"
          },
          {
            "id": "jspLMtqZFjY",
            "title": "Pardesi Pardesi Jaana Nahi",
            "artist": "Udit Narayan, Alka Yagnik",
            "movie": "Raja Hindustani (1996)",
            "duration": "7:31",
            "thumb": "https://img.youtube.com/vi/jspLMtqZFjY/hqdefault.jpg",
            "tag": "Everlasting"
          },
          {
            "id": "5y_TCKNzAMI",
            "title": "Tumse Milne Ko Dil Karta Hai",
            "artist": "Kumar Sanu, Alka Yagnik",
            "movie": "Phool Aur Kaante (1991)",
            "duration": "5:32",
            "thumb": "https://img.youtube.com/vi/5y_TCKNzAMI/hqdefault.jpg",
            "tag": "Retro Classic"
          },
          {
            "id": "bKZTnnFU9HA",
            "title": "Kuch Kuch Hota Hai",
            "artist": "Udit Narayan, Alka Yagnik",
            "movie": "Kuch Kuch Hota Hai (1998)",
            "duration": "4:56",
            "thumb": "https://img.youtube.com/vi/bKZTnnFU9HA/hqdefault.jpg",
            "tag": "Pure 90s"
          },
          {
            "id": "iqNS2Qe4pp0",
            "title": "Suraj Hua Maddham",
            "artist": "Sonu Nigam, Alka Yagnik",
            "movie": "K3G (2001)",
            "duration": "7:08",
            "thumb": "https://img.youtube.com/vi/iqNS2Qe4pp0/hqdefault.jpg",
            "tag": "Timeless"
          },
          {
            "id": "SBfPs-PMGTA",
            "title": "Pehla Nasha",
            "artist": "Udit Narayan, Sadhana Sargam",
            "movie": "Jo Jeeta Wohi Sikandar (1992)",
            "duration": "4:52",
            "thumb": "https://img.youtube.com/vi/SBfPs-PMGTA/hqdefault.jpg",
            "tag": "Slow Romance"
          }
        ]
      },
      {
        "id": "gulzar-ghazals",
        "name": "Gulzar Ghazals",
        "description": "Poetic masterpieces, heartfelt Nazms, and timeless acoustic ghazals penned by Gulzar Sahab.",
        "badge": "MW 603 • GULZAR",
        "tracks": [
          {
            "id": "_UEpGEXcMn4",
            "title": "Tujhse Naraz Nahin Zindagi",
            "artist": "Anup Ghoshal, Lata Mangeshkar",
            "movie": "Masoom (1983)",
            "duration": "5:41",
            "thumb": "https://img.youtube.com/vi/_UEpGEXcMn4/hqdefault.jpg",
            "tag": "Gulzar Masterpiece"
          },
          {
            "id": "Zm4V6ty4K6k",
            "title": "Tere Bina Zindagi Se Koi",
            "artist": "Kishore Kumar, Lata Mangeshkar",
            "movie": "Aandhi (1975)",
            "duration": "5:52",
            "thumb": "https://img.youtube.com/vi/Zm4V6ty4K6k/hqdefault.jpg",
            "tag": "Soulful Ghazal"
          },
          {
            "id": "MDXFi3avqo0",
            "title": "Woh Shaam Kuchh Ajeeb Thi",
            "artist": "Kishore Kumar",
            "movie": "Khamoshi (1969)",
            "duration": "4:46",
            "thumb": "https://img.youtube.com/vi/MDXFi3avqo0/hqdefault.jpg",
            "tag": "Poetic Solitude"
          },
          {
            "id": "XUexH7Xk1yk",
            "title": "Mera Kuchh Saamaan",
            "artist": "Asha Bhosle",
            "movie": "Ijaazat (1987)",
            "duration": "6:05",
            "thumb": "https://img.youtube.com/vi/XUexH7Xk1yk/hqdefault.jpg",
            "tag": "National Award Winner"
          },
          {
            "id": "3UsReAi_LIU",
            "title": "Shaam Se Aankh Mein Nami Si Hai",
            "artist": "Jagjit Singh, Gulzar",
            "movie": "Marasim (1999)",
            "duration": "5:22",
            "thumb": "https://img.youtube.com/vi/3UsReAi_LIU/hqdefault.jpg",
            "tag": "Acoustic Ghazal"
          },
          {
            "id": "Q87TZLzRfwU",
            "title": "Haath Chhoote Bhi Toh",
            "artist": "Jagjit Singh, Gulzar",
            "movie": "Marasim (1999)",
            "duration": "5:18",
            "thumb": "https://img.youtube.com/vi/Q87TZLzRfwU/hqdefault.jpg",
            "tag": "Marasim Classic"
          },
          {
            "id": "WKP5cqQvUBg",
            "title": "Dil Dhoondta Hai Phir Wohi",
            "artist": "Bhupinder Singh, Lata Mangeshkar",
            "movie": "Mausam (1975)",
            "duration": "4:15",
            "thumb": "https://img.youtube.com/vi/WKP5cqQvUBg/hqdefault.jpg",
            "tag": "Timeless Poetry"
          },
          {
            "id": "uLi3WcON1CU",
            "title": "Do Deewane Shahar Mein",
            "artist": "Bhupinder Singh, Runa Laila",
            "movie": "Ghar (1978)",
            "duration": "4:50",
            "thumb": "https://img.youtube.com/vi/uLi3WcON1CU/hqdefault.jpg",
            "tag": "Monsoon Ghazal"
          },
          {
            "id": "lySbCeZjVlw",
            "title": "Naam Gum Jayega",
            "artist": "Lata Mangeshkar, Bhupinder Singh",
            "movie": "Kinara (1977)",
            "duration": "5:25",
            "thumb": "https://img.youtube.com/vi/lySbCeZjVlw/hqdefault.jpg",
            "tag": "Everlasting Identity"
          },
          {
            "id": "dmm5lM9BR8o",
            "title": "Aap Ki Ankhon Mein Kuch",
            "artist": "Kishore Kumar, Lata Mangeshkar",
            "movie": "Ghar (1978)",
            "duration": "4:10",
            "thumb": "https://img.youtube.com/vi/dmm5lM9BR8o/hqdefault.jpg",
            "tag": "Pure Romanticism"
          },
          {
            "id": "Efx7BIzMEPI",
            "title": "Is Mod Se Jaate Hain",
            "artist": "Kishore Kumar, Lata Mangeshkar",
            "movie": "Aandhi (1975)",
            "duration": "4:55",
            "thumb": "https://img.youtube.com/vi/Efx7BIzMEPI/hqdefault.jpg",
            "tag": "Golden Nostalgia"
          }
        ]
      },
      {
        "id": "manache-ghaav",
        "name": "Manache Ghaav",
        "description": "Deeply emotional, poignant Marathi sad songs and heart-touching melancholy.",
        "badge": "AIR 747 • MARATHI",
        "tracks": [
          {
            "id": "2JZTIVd4XN0",
            "title": "Man Udhan Varyache",
            "artist": "Shankar Mahadevan, Ajay-Atul",
            "movie": "Agga Bai Arrecha (2004)",
            "duration": "5:12",
            "thumb": "https://img.youtube.com/vi/2JZTIVd4XN0/hqdefault.jpg",
            "tag": "Heartache Classic"
          },
          {
            "id": "3zdCPhX7ah4",
            "title": "Kiti Sangaychay Mala",
            "artist": "Jasraj Joshi, Anandi Joshi",
            "movie": "Double Seat (2015)",
            "duration": "4:48",
            "thumb": "https://img.youtube.com/vi/3zdCPhX7ah4/hqdefault.jpg",
            "tag": "Deep Sorrow"
          },
          {
            "id": "Y4TICMyl9Eg",
            "title": "Kadhi Tu Rimjhim Zharanari",
            "artist": "Saleel Kulkarni, Sandeep Khare",
            "movie": "Mumbai Pune Mumbai (2010)",
            "duration": "5:30",
            "thumb": "https://img.youtube.com/vi/Y4TICMyl9Eg/hqdefault.jpg",
            "tag": "Melancholic Rain"
          },
          {
            "id": "cRKNTAbnYRs",
            "title": "Deva Tujhya Gabharyala",
            "artist": "Adarsh Shinde, Kirti Killedar",
            "movie": "Duniyadari (2013)",
            "duration": "4:35",
            "thumb": "https://img.youtube.com/vi/cRKNTAbnYRs/hqdefault.jpg",
            "tag": "Soulful Agony"
          },
          {
            "id": "OkNLme6dCsE",
            "title": "Mee Raat Takali",
            "artist": "Lata Mangeshkar",
            "movie": "Jait Re Jait (1977)",
            "duration": "4:22",
            "thumb": "https://img.youtube.com/vi/OkNLme6dCsE/hqdefault.jpg",
            "tag": "Heartbreak Folklore"
          },
          {
            "id": "DQNxigVPh1s",
            "title": "Jeevalaga Rahile Re Door",
            "artist": "Lata Mangeshkar, Sudhir Phadke",
            "movie": "Bhavgeet Classic",
            "duration": "4:15",
            "thumb": "https://img.youtube.com/vi/DQNxigVPh1s/hqdefault.jpg",
            "tag": "Wounds of Heart"
          },
          {
            "id": "I9Ehun8Ahk4",
            "title": "Shravanat Ghan Neela",
            "artist": "Lata Mangeshkar, Hridaynath Mangeshkar",
            "movie": "Marathi Bhavgeet",
            "duration": "4:40",
            "thumb": "https://img.youtube.com/vi/I9Ehun8Ahk4/hqdefault.jpg",
            "tag": "Poignant Rain"
          },
          {
            "id": "UXJF8e90Nxc",
            "title": "Usavale Dhaage",
            "artist": "Hamsika Iyer, Rahul Ranade",
            "movie": "Mangalashtak Once More (2013)",
            "duration": "4:50",
            "thumb": "https://img.youtube.com/vi/UXJF8e90Nxc/hqdefault.jpg",
            "tag": "Emotional Solitude"
          },
          {
            "id": "0wWF0Lons_A",
            "title": "Tula Pahate Re",
            "artist": "Zee Marathi Special",
            "movie": "Tula Pahate Re (2018)",
            "duration": "4:20",
            "thumb": "https://img.youtube.com/vi/0wWF0Lons_A/hqdefault.jpg",
            "tag": "Haunting Melancholy"
          },
          {
            "id": "OU1fvtWggBk",
            "title": "Atasha Ase He Mala Kay Hote",
            "artist": "Sandeep Khare, Saleel Kulkarni",
            "movie": "Ayushyavar Bolu Kahi",
            "duration": "5:05",
            "thumb": "https://img.youtube.com/vi/OU1fvtWggBk/hqdefault.jpg",
            "tag": "Soulful Separation"
          }
        ]
      },
      {
        "id": "sunday-champi",
        "name": "Sunday Morning Session",
        "description": "Relaxing hair conditioning, soothing scissor snips, and lighthearted morning tunes.",
        "badge": "FM 102.6 • VINTAGE",
        "tracks": [
          {
            "id": "OgocnLh9P1M",
            "title": "Aankh Hai Bhari Bhari",
            "artist": "Kumar Sanu",
            "movie": "Tum Se Achcha Kaun Hai (2002)",
            "duration": "6:58",
            "thumb": "https://img.youtube.com/vi/OgocnLh9P1M/hqdefault.jpg",
            "tag": "Barber Favourite"
          },
          {
            "id": "C9efe0rjDlE",
            "title": "Dil Hai Ki Manta Nahin",
            "artist": "Kumar Sanu, Anuradha Paudwal",
            "movie": "Dil Hai Ke Manta Nahin (1991)",
            "duration": "6:10",
            "thumb": "https://img.youtube.com/vi/C9efe0rjDlE/hqdefault.jpg",
            "tag": "Sweet Classic"
          },
          {
            "id": "_IcVb6hFhPs",
            "title": "Ghar Se Nikalte Hi",
            "artist": "Udit Narayan",
            "movie": "Papa Kehte Hain (1996)",
            "duration": "6:12",
            "thumb": "https://img.youtube.com/vi/_IcVb6hFhPs/hqdefault.jpg",
            "tag": "Morning Breeze"
          },
          {
            "id": "UCsW7nea7sI",
            "title": "Ae Mere Humsafar",
            "artist": "Udit Narayan, Alka Yagnik",
            "movie": "Qayamat Se Qayamat Tak (1988)",
            "duration": "5:58",
            "thumb": "https://img.youtube.com/vi/UCsW7nea7sI/hqdefault.jpg",
            "tag": "Golden Hit"
          },
          {
            "id": "9b0iydtDZLU",
            "title": "Waada Raha Sanam",
            "artist": "Alka Yagnik, Abhijeet",
            "movie": "Khiladi (1992)",
            "duration": "6:03",
            "thumb": "https://img.youtube.com/vi/9b0iydtDZLU/hqdefault.jpg",
            "tag": "Classic Romance"
          }
        ]
      },
      {
        "id": "dard-e-dil",
        "name": "Heartbreak Melodies",
        "description": "Poignant vocal expressions, acoustic ghazals, and reflective ballads.",
        "badge": "AM 810 • NOSTALGIA",
        "tracks": [
          {
            "id": "G7AdjVDBLO8",
            "title": "Achha Sila Diya Toone Mere Pyar Ka",
            "artist": "Sonu Nigam",
            "movie": "Bewafa Sanam (1995)",
            "duration": "5:30",
            "thumb": "https://img.youtube.com/vi/G7AdjVDBLO8/hqdefault.jpg",
            "tag": "Soulful Ballad"
          },
          {
            "id": "vRh1bnbZt4M",
            "title": "Dil De Diya Hai",
            "artist": "Anand Raj Anand",
            "movie": "Masti (2004)",
            "duration": "5:54",
            "thumb": "https://img.youtube.com/vi/vRh1bnbZt4M/hqdefault.jpg",
            "tag": "Heartbreak"
          },
          {
            "id": "XWKazQwFFdY",
            "title": "Tere Dard Se Dil Aabad Raha",
            "artist": "Kumar Sanu",
            "movie": "Deewana (1992)",
            "duration": "4:52",
            "thumb": "https://img.youtube.com/vi/XWKazQwFFdY/hqdefault.jpg",
            "tag": "90s Drama"
          },
          {
            "id": "rXHY4Cv9cA8",
            "title": "Ab Tere Bin Jee Lenge Hum",
            "artist": "Kumar Sanu",
            "movie": "Aashiqui (1990)",
            "duration": "5:45",
            "thumb": "https://img.youtube.com/vi/rXHY4Cv9cA8/hqdefault.jpg",
            "tag": "Melancholic"
          }
        ]
      },
      {
        "id": "vividh-bharati",
        "name": "Vintage Transistor Radio",
        "description": "Classic transistor broadcasts: legendary recordings from the 1970s and 1980s.",
        "badge": "SW 31m • VINTAGE",
        "tracks": [
          {
            "id": "QnlknU6PPxM",
            "title": "Chura Liya Hai Tumne Jo Dil Ko",
            "artist": "Asha Bhosle, Mohd Rafi",
            "movie": "Yaadon Ki Baaraat (1973)",
            "duration": "4:48",
            "thumb": "https://img.youtube.com/vi/QnlknU6PPxM/hqdefault.jpg",
            "tag": "Evergreen"
          },
          {
            "id": "I9Ehun8Ahk4",
            "title": "Lag Ja Gale / Shravanat Ghan Neela",
            "artist": "Lata Mangeshkar",
            "movie": "Classic Recordings",
            "duration": "4:20",
            "thumb": "https://img.youtube.com/vi/I9Ehun8Ahk4/hqdefault.jpg",
            "tag": "Soulful"
          },
          {
            "id": "gTy1Dho3bJE",
            "title": "Yeh Shaam Mastani",
            "artist": "Kishore Kumar",
            "movie": "Kati Patang (1971)",
            "duration": "4:38",
            "thumb": "https://img.youtube.com/vi/gTy1Dho3bJE/hqdefault.jpg",
            "tag": "Retro Warmth"
          },
          {
            "id": "PnH56Koh_TY",
            "title": "Tumko Dekha Toh Yeh Khayal Aaya",
            "artist": "Jagjit Singh, Chitra Singh",
            "movie": "Saath Saath (1982)",
            "duration": "4:50",
            "thumb": "https://img.youtube.com/vi/PnH56Koh_TY/hqdefault.jpg",
            "tag": "Acoustic Ghazal"
          }
        ]
      }
    ]
  }
};

```


/* ============================================================================== */
/* FILE: js/player.js */
/* ============================================================================== */

```javascript:js/player.js
/**
 * SAFAR & SALOON - YouTube Audio Player & State Manager
 * Bridges YouTube IFrame API with custom physical dashboard deck controls
 */

class MusicPlayer {
  constructor() {
    this.ytPlayer = null;
    this.isReady = false;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 80;
    this.isShuffle = false;
    this.isRepeat = false;

    // Active state
    this.currentMode = 'driver'; // 'driver' | 'saloon'
    this.currentStationId = null;
    this.currentTrackIndex = 0;
    this.currentTrack = null;

    // Progress interval
    this.progressTimer = null;
    this.sleepTimerId = null;
    this.sleepTimerRemaining = 0;

    // Event listeners
    this.listeners = {
      trackChange: [],
      stateChange: [],
      progress: [],
      stationChange: [],
      volumeChange: []
    };
    this._pendingPlay = false;
  }

  init() {
    // Restore saved settings
    const savedMode = localStorage.getItem('safar_saloon_mode');
    if (savedMode && (savedMode === 'driver' || savedMode === 'saloon')) {
      this.currentMode = savedMode;
    }
    const savedVol = localStorage.getItem('safar_saloon_vol');
    if (savedVol !== null) {
      this.volume = parseInt(savedVol, 10);
    }

    // Default station
    const stations = window.playlistData[this.currentMode].stations;
    this.currentStationId = stations[0].id;
    this.currentTrackIndex = 0;
    this.currentTrack = stations[0].tracks[0];

    // Load YouTube API
    this.loadYouTubeIframeAPI();
  }

  loadYouTubeIframeAPI() {
    if (window.YT && window.YT.Player) {
      this.onYouTubeIframeAPIReady();
      return;
    }
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      this.onYouTubeIframeAPIReady();
    };
  }

  onYouTubeIframeAPIReady() {
    this.ytPlayer = new window.YT.Player('youtubeBridge', {
      height: '200',
      width: '200',
      videoId: this.currentTrack ? this.currentTrack.id : 'fvwyPGBOEgY',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
        playsinline: 1
      },
      events: {
        onReady: (event) => this.onPlayerReady(event),
        onStateChange: (event) => this.onPlayerStateChange(event),
        onError: (event) => this.onPlayerError(event)
      }
    });
  }

  onPlayerReady(event) {
    this.isReady = true;
    this.setVolume(this.volume);
    this.notify('trackChange', this.currentTrack);
    if (this._pendingPlay) {
      this._pendingPlay = false;
      this.play();
    }
  }

  onPlayerStateChange(event) {
    // YT.PlayerState: -1: unstarted, 0: ended, 1: playing, 2: paused, 3: buffering, 5: cued
    if (event.data === window.YT.PlayerState.PLAYING) {
      this.isPlaying = true;
      this.consecutiveErrors = 0;
      this.startProgressTracking();
      if (window.visualsEngine) window.visualsEngine.setPlayState(true);
      this.notify('stateChange', { state: 'playing', track: this.currentTrack });
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      this.isPlaying = false;
      this.stopProgressTracking();
      if (window.visualsEngine) window.visualsEngine.setPlayState(false);
      this.notify('stateChange', { state: 'paused', track: this.currentTrack });
    } else if (event.data === window.YT.PlayerState.ENDED) {
      if (this.isRepeat) {
        this.seekTo(0);
        this.play();
      } else {
        this.nextTrack(true);
      }
    } else if (event.data === window.YT.PlayerState.BUFFERING) {
      this.notify('stateChange', { state: 'buffering', track: this.currentTrack });
    }
  }

  onPlayerError(event) {
    console.warn("YouTube player encountered error:", event.data);
    this.consecutiveErrors = (this.consecutiveErrors || 0) + 1;

    // Do NOT auto-advance or trigger unwanted playback if user has not pressed play
    if (!this.isPlaying) {
      console.log("Player is not in active play state; skipping auto-advance.");
      this.notify('stateChange', { state: 'paused', track: this.currentTrack, error: event.data });
      return;
    }

    // Circuit breaker: stop infinite skipping loop if multiple tracks in a row fail
    if (this.consecutiveErrors >= 3) {
      console.warn("Multiple consecutive playback errors. Halting auto-advance loop.");
      this.isPlaying = false;
      this.stopProgressTracking();
      if (window.visualsEngine) window.visualsEngine.setPlayState(false);
      this.notify('stateChange', { state: 'error', track: this.currentTrack, error: 'Playback unavailable for selected tracks.' });
      return;
    }

    // Auto advance only when actively playing
    setTimeout(() => {
      if (this.isPlaying) {
        this.nextTrack(true);
      }
    }, 1500);
  }

  /* ============================================================
   * PLAYBACK CONTROLS
   * ============================================================ */

  play() {
    if (!this.isReady || !this.ytPlayer) {
      this._pendingPlay = true;
      return;
    }
    this._pendingPlay = false;
    try {
      this.ytPlayer.playVideo();
    } catch (e) {
      console.error(e);
    }
  }

  pause() {
    if (!this.isReady || !this.ytPlayer) return;
    try {
      this.ytPlayer.pauseVideo();
    } catch (e) {
      console.error(e);
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  nextTrack(autoPlay = this.isPlaying) {
    const station = this.getActiveStation();
    if (!station || !station.tracks.length) return;

    if (this.isShuffle) {
      let randIdx = Math.floor(Math.random() * station.tracks.length);
      if (randIdx === this.currentTrackIndex && station.tracks.length > 1) {
        randIdx = (randIdx + 1) % station.tracks.length;
      }
      this.currentTrackIndex = randIdx;
    } else {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % station.tracks.length;
    }
    this.loadCurrentTrack(autoPlay);
  }

  prevTrack(autoPlay = this.isPlaying) {
    const station = this.getActiveStation();
    if (!station || !station.tracks.length) return;

    // If more than 3 seconds in, restart track
    if (this.getCurrentTime() > 3) {
      this.seekTo(0);
      return;
    }

    this.currentTrackIndex = (this.currentTrackIndex - 1 + station.tracks.length) % station.tracks.length;
    this.loadCurrentTrack(autoPlay);
  }

  loadCurrentTrack(autoPlay = true) {
    const station = this.getActiveStation();
    this.currentTrack = station.tracks[this.currentTrackIndex];

    if (this.isReady && this.ytPlayer) {
      if (autoPlay) {
        this.ytPlayer.loadVideoById(this.currentTrack.id);
      } else {
        this.ytPlayer.cueVideoById(this.currentTrack.id);
      }
    }
    this.notify('trackChange', this.currentTrack);
  }

  playSpecificTrack(stationId, trackIndex) {
    this.currentStationId = stationId;
    this.currentTrackIndex = trackIndex;
    this.loadCurrentTrack(true);
    this.notify('stationChange', this.getActiveStation());
  }

  setStation(stationId) {
    if (this.currentStationId === stationId) return;
    this.currentStationId = stationId;
    this.currentTrackIndex = 0;
    this.loadCurrentTrack(this.isPlaying);
    this.notify('stationChange', this.getActiveStation());
  }

  setMode(mode) {
    if (this.currentMode === mode) return;
    this.currentMode = mode;
    localStorage.setItem('safar_saloon_mode', mode);

    const stations = window.playlistData[mode].stations;
    this.currentStationId = stations[0].id;
    this.currentTrackIndex = 0;
    this.loadCurrentTrack(this.isPlaying);
    this.notify('stationChange', this.getActiveStation());
  }

  seekTo(seconds) {
    if (!this.isReady || !this.ytPlayer) return;
    try {
      this.ytPlayer.seekTo(seconds, true);
    } catch (e) {}
  }

  seekToPercent(percent) {
    const duration = this.getDuration();
    if (duration > 0) {
      this.seekTo(duration * (percent / 100));
    }
  }

  setVolume(vol, unmuteIfMuted = false) {
    this.volume = Math.max(0, Math.min(100, vol));
    if (unmuteIfMuted && this.isMuted && this.volume > 0) {
      this.isMuted = false;
      if (window.audioEngine) window.audioEngine.setMute(false);
    }
    localStorage.setItem('safar_saloon_vol', this.volume);
    if (this.isReady && this.ytPlayer) {
      this.ytPlayer.setVolume(this.isMuted ? 0 : this.volume);
    }
    this.notify('volumeChange', { volume: this.volume, isMuted: this.isMuted });
  }

  // Audio Ducking: Instantly dips main music volume over 0.05s to simulate air pressure overpowering environment
  duckVolume(durationSeconds = 1.8) {
    if (!this.isReady || !this.ytPlayer || this.isMuted) return;

    if (this._duckTimer) {
      clearTimeout(this._duckTimer);
      this._duckTimer = null;
    }
    if (this._duckRampInterval) {
      clearInterval(this._duckRampInterval);
      this._duckRampInterval = null;
    }

    const originalVol = this.volume;
    const targetDuckedVol = Math.max(10, Math.floor(originalVol * 0.20));

    // Instant dip down over 0.05 seconds (50ms)
    try {
      this.ytPlayer.setVolume(targetDuckedVol);
    } catch (e) {}

    // When the horn sound tail ends, smoothly ramp back up to original volume
    this._duckTimer = setTimeout(() => {
      let current = targetDuckedVol;
      const step = Math.max(2, (originalVol - targetDuckedVol) / 8);
      this._duckRampInterval = setInterval(() => {
        current += step;
        if (current >= originalVol) {
          current = originalVol;
          clearInterval(this._duckRampInterval);
          this._duckRampInterval = null;
        }
        try {
          if (!this.isMuted) {
            this.ytPlayer.setVolume(Math.floor(current));
          }
        } catch (e) {}
      }, 35);
    }, durationSeconds * 1000);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isReady && this.ytPlayer) {
      this.ytPlayer.setVolume(this.isMuted ? 0 : this.volume);
    }
    if (window.audioEngine) {
      window.audioEngine.setMute(this.isMuted);
    }
    this.notify('volumeChange', { volume: this.volume, isMuted: this.isMuted });
    return this.isMuted;
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    return this.isShuffle;
  }

  toggleRepeat() {
    this.isRepeat = !this.isRepeat;
    return this.isRepeat;
  }

  extractYouTubeId(urlOrId) {
    if (!urlOrId || typeof urlOrId !== 'string') return null;
    const trimmed = urlOrId.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }
    const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  // Play custom YouTube Video or URL
  playCustomVideo(urlOrId) {
    const videoId = this.extractYouTubeId(urlOrId);
    if (videoId) {
      const customTrack = {
        id: videoId,
        title: "Custom YouTube Frequency",
        artist: "User Selected Track",
        movie: "Direct Cassette Feed",
        duration: "0:00",
        thumb: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        tag: "Live Tuning"
      };
      this.currentTrack = customTrack;
      if (this.isReady && this.ytPlayer) {
        this.ytPlayer.loadVideoById(videoId);
      }
      this.notify('trackChange', this.currentTrack);
      return true;
    }
    return false;
  }

  /* ============================================================
   * SLEEP TIMER
   * ============================================================ */

  setSleepTimer(minutes) {
    if (this.sleepTimerId) {
      clearInterval(this.sleepTimerId);
      this.sleepTimerId = null;
    }

    if (!minutes || minutes <= 0) {
      this.sleepTimerRemaining = 0;
      return 0;
    }

    this.sleepTimerRemaining = minutes * 60;
    this.sleepTimerId = setInterval(() => {
      this.sleepTimerRemaining--;
      if (this.sleepTimerRemaining <= 0) {
        clearInterval(this.sleepTimerId);
        this.sleepTimerId = null;
        // Fade out volume and pause
        let curVol = this.volume;
        const fadeInterval = setInterval(() => {
          curVol -= 10;
          if (curVol <= 0) {
            clearInterval(fadeInterval);
            this.pause();
            this.setVolume(this.volume); // Reset to original
          } else {
            if (this.ytPlayer) this.ytPlayer.setVolume(curVol);
          }
        }, 300);
      }
    }, 1000);

    return this.sleepTimerRemaining;
  }

  /* ============================================================
   * PROGRESS TRACKING & HELPERS
   * ============================================================ */

  startProgressTracking() {
    this.stopProgressTracking();
    this.progressTimer = setInterval(() => {
      if (this.isReady && this.ytPlayer) {
        const curTime = this.getCurrentTime();
        const duration = this.getDuration();
        const percent = duration > 0 ? (curTime / duration) * 100 : 0;
        this.notify('progress', {
          current: curTime,
          duration: duration,
          percent: percent,
          formattedCurrent: this.formatTime(curTime),
          formattedDuration: this.formatTime(duration)
        });
      }
    }, 400);
  }

  stopProgressTracking() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  getCurrentTime() {
    try {
      return this.ytPlayer ? this.ytPlayer.getCurrentTime() || 0 : 0;
    } catch(e) {
      return 0;
    }
  }

  getDuration() {
    try {
      return this.ytPlayer ? this.ytPlayer.getDuration() || 0 : 0;
    } catch(e) {
      return 0;
    }
  }

  formatTime(seconds) {
    const s = Math.floor(seconds || 0);
    const m = Math.floor(s / 60);
    const remS = s % 60;
    return `${m}:${remS < 10 ? '0' : ''}${remS}`;
  }

  getActiveStation() {
    const stations = window.playlistData[this.currentMode].stations;
    return stations.find(s => s.id === this.currentStationId) || stations[0];
  }

  // Observable subscription
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  notify(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }
}

// Export singleton
window.musicPlayer = new MusicPlayer();

```


/* ============================================================================== */
/* FILE: js/audioEngine.js */
/* ============================================================================== */

```javascript:js/audioEngine.js
/**
 * SAFAR & SALOON - Procedural Web Audio Engine
 * Generates all nostalgic sound effects & ambient soundscapes procedurally
 * without needing external mp3 files!
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;

    // Active ambient nodes
    this.ambients = {
      rain: null,
      engine: null,
      fan: null,
      champi: null,
      dhaba: null
    };

    // Volumes
    this.volumes = {
      sfx: 0.8,
      rain: 0.35,
      engine: 0.25,
      fan: 0.3,
      champi: 0.4,
      dhaba: 0.3
    };
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMute(muted) {
    this.isMuted = muted;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 1, this.ctx.currentTime);
    }
  }

  // Helper to create white/pink noise buffer
  createNoiseBuffer(duration = 2, type = 'pink') {
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else {
      // Pink noise approximation (Paul Kellet's filter)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  /* ============================================================
   * BUS DRIVER SOUND EFFECTS
   * ============================================================ */

  // Harsh distortion curve generator for blown-out PA horn speaker sound
  makeDistortionCurve(amount = 100) {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // Melodic Hook Notes Database for songs
  getSongHookMelody(track) {
    if (!track) {
      return [
        { time: 0.0,  dur: 0.16, freq: 293.66 },
        { time: 0.18, dur: 0.16, freq: 369.99 },
        { time: 0.36, dur: 0.35, freq: 440.00 },
        { time: 0.75, dur: 0.18, freq: 587.33 },
        { time: 0.96, dur: 0.42, freq: 440.00 }
      ];
    }

    const id = track.id || '';
    const title = (track.title || '').toLowerCase();

    // 1. Dil Ke Badle Sanam
    if (id === 'fvwyPGBOEgY' || title.includes('dil ke badle')) {
      return [
        { time: 0.0,  dur: 0.18, freq: 392.00 },
        { time: 0.22, dur: 0.18, freq: 440.00 },
        { time: 0.44, dur: 0.22, freq: 493.88 },
        { time: 0.70, dur: 0.22, freq: 440.00 },
        { time: 0.96, dur: 0.38, freq: 392.00 },
        { time: 1.38, dur: 0.46, freq: 329.63 }
      ];
    }

    // 2. Main Agar Saamne (Raaz flute theme)
    if (id === 'B2aHXbnu9dI' || title.includes('agar saamne')) {
      return [
        { time: 0.0,  dur: 0.22, freq: 329.63 },
        { time: 0.26, dur: 0.22, freq: 392.00 },
        { time: 0.52, dur: 0.36, freq: 440.00 },
        { time: 0.92, dur: 0.42, freq: 493.88 },
        { time: 1.38, dur: 0.30, freq: 440.00 },
        { time: 1.72, dur: 0.55, freq: 392.00 }
      ];
    }

    // 3. Har Dil Jo Pyar Karega
    if (id === 'V0jFYD0PirU' || title.includes('har dil jo')) {
      return [
        { time: 0.0,  dur: 0.18, freq: 293.66 },
        { time: 0.22, dur: 0.18, freq: 369.99 },
        { time: 0.44, dur: 0.24, freq: 440.00 },
        { time: 0.72, dur: 0.22, freq: 587.33 },
        { time: 0.98, dur: 0.25, freq: 493.88 },
        { time: 1.28, dur: 0.48, freq: 440.00 }
      ];
    }

    // 4. Hamne Tumko Dil Ye De Diya
    if (id === 'r4QnmrtiDGI' || title.includes('tumko dil ye')) {
      return [
        { time: 0.0,  dur: 0.20, freq: 440.00 },
        { time: 0.24, dur: 0.20, freq: 493.88 },
        { time: 0.48, dur: 0.35, freq: 523.25 },
        { time: 0.88, dur: 0.32, freq: 493.88 },
        { time: 1.25, dur: 0.50, freq: 440.00 }
      ];
    }

    // 5. Taaron Ka Chamakta
    if (id === 'XR7qvTgQ19o' || title.includes('taaron ka')) {
      return [
        { time: 0.0,  dur: 0.15, freq: 349.23 },
        { time: 0.18, dur: 0.15, freq: 349.23 },
        { time: 0.36, dur: 0.22, freq: 440.00 },
        { time: 0.62, dur: 0.22, freq: 523.25 },
        { time: 0.88, dur: 0.45, freq: 440.00 }
      ];
    }

    // 6. Oye Raju Pyar Na Kariyo
    if (id === 'nNhv8A_rJTg' || title.includes('oye raju')) {
      return [
        { time: 0.0,  dur: 0.16, freq: 293.66 },
        { time: 0.20, dur: 0.16, freq: 329.63 },
        { time: 0.40, dur: 0.25, freq: 369.99 },
        { time: 0.70, dur: 0.20, freq: 369.99 },
        { time: 0.95, dur: 0.42, freq: 440.00 }
      ];
    }

    // 7. Ho Gaya Hai Tujhko
    if (id === 'hw_HpTI_Wkw' || title.includes('ho gaya hai')) {
      return [
        { time: 0.0,  dur: 0.20, freq: 392.00 },
        { time: 0.24, dur: 0.20, freq: 440.00 },
        { time: 0.48, dur: 0.30, freq: 493.88 },
        { time: 0.82, dur: 0.25, freq: 440.00 },
        { time: 1.12, dur: 0.45, freq: 392.00 }
      ];
    }

    // 8. Bolo Ta Ra Ra
    if (id === 'G_eP3lYg2oU' || title.includes('bolo ta ra')) {
      return [
        { time: 0.0,  dur: 0.14, freq: 293.66 },
        { time: 0.16, dur: 0.14, freq: 293.66 },
        { time: 0.34, dur: 0.20, freq: 369.99 },
        { time: 0.58, dur: 0.20, freq: 440.00 },
        { time: 0.82, dur: 0.20, freq: 440.00 },
        { time: 1.06, dur: 0.45, freq: 293.66 }
      ];
    }

    // 9. Chhaiyya Chhaiyya
    if (id === 'PQmrmVs10X8' || title.includes('chhaiyya')) {
      return [
        { time: 0.0,  dur: 0.18, freq: 220.00 },
        { time: 0.22, dur: 0.18, freq: 293.66 },
        { time: 0.44, dur: 0.20, freq: 293.66 },
        { time: 0.68, dur: 0.22, freq: 329.63 },
        { time: 0.94, dur: 0.22, freq: 349.23 },
        { time: 1.20, dur: 0.45, freq: 293.66 }
      ];
    }

    // 10. O O Jaane Jaana
    if (id === 'x_elT6zkqN0' || title.includes('jaane jaana')) {
      return [
        { time: 0.0,  dur: 0.18, freq: 329.63 },
        { time: 0.22, dur: 0.18, freq: 392.00 },
        { time: 0.44, dur: 0.22, freq: 440.00 },
        { time: 0.70, dur: 0.28, freq: 493.88 },
        { time: 1.02, dur: 0.22, freq: 440.00 },
        { time: 1.30, dur: 0.45, freq: 392.00 }
      ];
    }

    // 11. Tip Tip Barsa Paani
    if (id === 'yT_3zO28p_8' || title.includes('tip tip')) {
      return [
        { time: 0.0,  dur: 0.20, freq: 392.00 },
        { time: 0.24, dur: 0.20, freq: 466.16 },
        { time: 0.48, dur: 0.25, freq: 523.25 },
        { time: 0.78, dur: 0.22, freq: 466.16 },
        { time: 1.04, dur: 0.45, freq: 392.00 }
      ];
    }

    // 12. Mera Dil Bhi Kitna Pagal Hai
    if (id === 'J2z_a0vLd-U' || title.includes('kitna pagal')) {
      return [
        { time: 0.0,  dur: 0.20, freq: 293.66 },
        { time: 0.24, dur: 0.20, freq: 369.99 },
        { time: 0.48, dur: 0.28, freq: 440.00 },
        { time: 0.80, dur: 0.22, freq: 493.88 },
        { time: 1.06, dur: 0.45, freq: 440.00 }
      ];
    }

    // 13. Dheere Dheere Se
    if (id === 'M3eXbS-B900' || title.includes('dheere dheere')) {
      return [
        { time: 0.0,  dur: 0.22, freq: 329.63 },
        { time: 0.26, dur: 0.22, freq: 392.00 },
        { time: 0.52, dur: 0.28, freq: 440.00 },
        { time: 0.84, dur: 0.25, freq: 392.00 },
        { time: 1.14, dur: 0.48, freq: 329.63 }
      ];
    }

    // 14. Tujhe Dekha Toh Yeh Jaana Sanam
    if (id === 'cNV5hLKh98s' || title.includes('tujhe dekha')) {
      return [
        { time: 0.0,  dur: 0.20, freq: 293.66 },
        { time: 0.24, dur: 0.20, freq: 329.63 },
        { time: 0.48, dur: 0.25, freq: 369.99 },
        { time: 0.78, dur: 0.25, freq: 392.00 },
        { time: 1.08, dur: 0.22, freq: 369.99 },
        { time: 1.34, dur: 0.45, freq: 293.66 }
      ];
    }

    // 15. Zingaat (Ajay-Atul)
    if (id === '2gcsgfzqN8k' || id === 'luhVm60Wiro' || title.includes('zingaat')) {
      return [
        { time: 0.0,  dur: 0.15, freq: 293.66 },
        { time: 0.16, dur: 0.15, freq: 329.63 },
        { time: 0.32, dur: 0.18, freq: 369.99 },
        { time: 0.52, dur: 0.22, freq: 440.00 },
        { time: 0.76, dur: 0.20, freq: 587.33 },
        { time: 0.98, dur: 0.22, freq: 523.25 },
        { time: 1.22, dur: 0.48, freq: 440.00 }
      ];
    }

    // 16. Apsara Aali (Natarang)
    if (id === 'mW67u_hWiSo' || title.includes('apsara aali')) {
      return [
        { time: 0.0,  dur: 0.20, freq: 440.00 },
        { time: 0.24, dur: 0.20, freq: 493.88 },
        { time: 0.48, dur: 0.25, freq: 523.25 },
        { time: 0.76, dur: 0.22, freq: 440.00 },
        { time: 1.00, dur: 0.25, freq: 392.00 },
        { time: 1.28, dur: 0.50, freq: 440.00 }
      ];
    }

    // 17. Kombdi Palali (Jatra)
    if (id === '2KaDL9TSja0' || title.includes('kombdi palali')) {
      return [
        { time: 0.0,  dur: 0.16, freq: 329.63 },
        { time: 0.18, dur: 0.16, freq: 329.63 },
        { time: 0.36, dur: 0.20, freq: 392.00 },
        { time: 0.58, dur: 0.20, freq: 440.00 },
        { time: 0.80, dur: 0.25, freq: 392.00 },
        { time: 1.08, dur: 0.45, freq: 329.63 }
      ];
    }

    // 18. Lollypop Lagelu (Pawan Singh)
    if (id === 'Gr8G_ldltDE' || title.includes('lollypop') || title.includes('kamariya kare')) {
      return [
        { time: 0.0,  dur: 0.18, freq: 392.00 },
        { time: 0.20, dur: 0.18, freq: 392.00 },
        { time: 0.40, dur: 0.20, freq: 440.00 },
        { time: 0.62, dur: 0.25, freq: 493.88 },
        { time: 0.90, dur: 0.28, freq: 587.33 },
        { time: 1.20, dur: 0.22, freq: 493.88 },
        { time: 1.45, dur: 0.48, freq: 392.00 }
      ];
    }

    // 19. Rinkiya Ke Papa (Manoj Tiwari)
    if (id === '2Mv8UOiyTq0' || title.includes('rinkiya')) {
      return [
        { time: 0.0,  dur: 0.18, freq: 329.63 },
        { time: 0.22, dur: 0.18, freq: 415.30 },
        { time: 0.44, dur: 0.22, freq: 493.88 },
        { time: 0.70, dur: 0.25, freq: 554.37 },
        { time: 0.98, dur: 0.22, freq: 493.88 },
        { time: 1.24, dur: 0.46, freq: 415.30 }
      ];
    }

    // 20. Raate Diya Butake
    if (id === 'N9Ylebtf8YI' || title.includes('diya butake')) {
      return [
        { time: 0.0,  dur: 0.16, freq: 349.23 },
        { time: 0.20, dur: 0.16, freq: 440.00 },
        { time: 0.40, dur: 0.22, freq: 523.25 },
        { time: 0.66, dur: 0.25, freq: 587.33 },
        { time: 0.94, dur: 0.22, freq: 523.25 },
        { time: 1.20, dur: 0.45, freq: 440.00 }
      ];
    }

    // Default 5-tone Indian road truck horn
    return [
      { time: 0.0,  dur: 0.16, freq: 293.66 },
      { time: 0.18, dur: 0.16, freq: 369.99 },
      { time: 0.36, dur: 0.35, freq: 440.00 },
      { time: 0.75, dur: 0.18, freq: 587.33 },
      { time: 0.96, dur: 0.42, freq: 440.00 }
    ];
  }

  // Play Song Melodic Hook via Truck Rooftop PA Pressure Horn
  // Uses WaveShaper distortion (100) + 1200Hz Bandpass filter as in PA Horn Converter
  playSongHookHorn(track) {
    this.init();
    if (this.isMuted) return null;

    const currentTrack = track || (window.musicPlayer ? window.musicPlayer.currentTrack : null);
    const melody = this.getSongHookMelody(currentTrack);
    const t = this.ctx.currentTime;

    // 1. Create Distortion (overdriven / blown-out metallic horn speaker rasp)
    const distortionNode = this.ctx.createWaveShaper();
    distortionNode.curve = this.makeDistortionCurve(100);
    distortionNode.oversample = '4x';

    // 2. Create Bandpass Filter (Limits frequency to sounding like an authentic PA horn speaker)
    const filterNode = this.ctx.createBiquadFilter();
    filterNode.type = 'bandpass';
    filterNode.frequency.setValueAtTime(1200, t);
    filterNode.Q.setValueAtTime(2.5, t);

    // Master horn gain
    const hornMasterGain = this.ctx.createGain();
    hornMasterGain.gain.setValueAtTime(0.38 * this.volumes.sfx, t);

    // Chain: Distortion -> Bandpass -> Gain -> Master
    distortionNode.connect(filterNode);
    filterNode.connect(hornMasterGain);
    hornMasterGain.connect(this.masterGain);

    melody.forEach(note => {
      const startTime = t + note.time;
      const endTime = startTime + note.dur;

      // Primary horn oscillator
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(note.freq, startTime);
      osc1.detune.setValueAtTime(-5, startTime);

      // Brass harmonic fifth oscillator (for musical air-horn warmth)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(note.freq * 1.498, startTime);
      osc2.detune.setValueAtTime(7, startTime);

      // Sub-harmonic body punch
      const oscSub = this.ctx.createOscillator();
      oscSub.type = 'triangle';
      oscSub.frequency.setValueAtTime(note.freq * 0.5, startTime);

      // Note envelope
      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0.001, startTime);
      noteGain.gain.linearRampToValueAtTime(1.0, startTime + 0.015);
      noteGain.gain.setValueAtTime(0.95, endTime - 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.001, endTime);

      osc1.connect(noteGain);
      osc2.connect(noteGain);
      oscSub.connect(noteGain);

      noteGain.connect(distortionNode);

      osc1.start(startTime);
      osc2.start(startTime);
      oscSub.start(startTime);

      osc1.stop(endTime);
      osc2.stop(endTime);
      oscSub.stop(endTime);
    });

    return currentTrack ? currentTrack.title : 'Highway Classic';
  }

  // Play Air Horn (triggers modular PressureHornSystem with realism pipeline, fallbacks, and ducking)
  playTruckAirHorn(track) {
    if (window.pressureHornSystem) {
      return window.pressureHornSystem.blowHorn(track);
    }
    return this.playSongHookHorn(track);
  }

  // Single Quick "Peep" Horn (Overtaking horn)
  playSingleHorn() {
    this.init();
    if (this.isMuted) return;
    const t = this.ctx.currentTime;
    const freqs = [330, 415]; // Dual acoustic disc horn

    freqs.forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.18 * this.volumes.sfx, t + 0.015);
      gain.gain.setValueAtTime(0.18 * this.volumes.sfx, t + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.22);
    });
  }

  // Wiper rubber sweep on wet windshield (Soft and realistic)
  playWiperSweep() {
    this.init();
    if (this.isMuted) return;
    if (window.visualsEngine && !window.visualsEngine.isRainActive) return;
    const t = this.ctx.currentTime;

    // 1. Friction sweep (soft filtered pink noise across wet glass)
    const noiseBuffer = this.createNoiseBuffer(0.6, 'pink');
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, t);
    filter.frequency.exponentialRampToValueAtTime(950, t + 0.3);
    filter.frequency.exponentialRampToValueAtTime(380, t + 0.58);
    filter.Q.setValueAtTime(2.2, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.045 * this.volumes.sfx, t + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noiseSource.start(t);

    // 2. Wiper motor direction pivot (very gentle low thud)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.frequency.setValueAtTime(75, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.08);
    oscGain.gain.setValueAtTime(0.035 * this.volumes.sfx, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.1);
  }

  // Heavy Diesel Engine Ambient Loop
  toggleEngineAmbient(enable) {
    this.init();
    if (this.ambients.engine) {
      try {
        this.ambients.engine.stop();
        this.ambients.engine.disconnect();
      } catch (e) {}
        this.ambients.engine = null;
    }

    if (!enable || this.isMuted) return;

    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Filter to deep heavy rumble
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(110, t);

    // 35Hz sub-bass engine cylinder stroke
    const osc = this.ctx.createOscillator();
    osc.frequency.setValueAtTime(42, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volumes.engine, t);

    source.connect(filter);
    filter.connect(gain);
    osc.connect(gain);
    gain.connect(this.masterGain);

    source.start(t);
    osc.start(t);

    this.ambients.engine = {
      stop: () => {
        source.stop();
        osc.stop();
      },
      disconnect: () => {
        gain.disconnect();
      },
      gainNode: gain
    };
  }

  // Highway Rain Ambient (Slow, gentle, atmospheric monsoon patter)
  toggleRainAmbient(enable) {
    this.init();
    if (this.ambients.rain) {
      try {
        this.ambients.rain.stop();
        this.ambients.rain.disconnect();
      } catch (e) {}
      this.ambients.rain = null;
    }

    if (!enable || this.isMuted) return;

    const t = this.ctx.currentTime;
    const noiseBuffer = this.createNoiseBuffer(4, 'pink');
    const source = this.ctx.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, t); // Softer, calmer rain tone

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.24 * this.volumes.rain, t + 1.2);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(t);

    this.ambients.rain = {
      stop: () => {
        const curT = this.ctx.currentTime;
        gain.gain.linearRampToValueAtTime(0.001, curT + 0.8);
        setTimeout(() => {
          try { source.stop(); } catch(e){}
        }, 850);
      },
      disconnect: () => gain.disconnect(),
      gainNode: gain
    };
  }

  /* ============================================================
   * DELUXE SALOON SOUND EFFECTS
   * ============================================================ */

  // Realistic Scissor Snip-Snip ("Chhuk-chhuk-chhuk")
  playScissorSnip() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    const snips = [0, 0.12, 0.24];

    snips.forEach(delay => {
      const startTime = t + delay;

      // High metallic shear burst
      const buffer = this.createNoiseBuffer(0.05, 'white');
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200 + Math.random() * 600, startTime);
      filter.Q.setValueAtTime(5, startTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.3 * this.volumes.sfx, startTime + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.045);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      source.start(startTime);

      // Resonant metallic ring
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(4500 + Math.random() * 400, startTime);
      oscGain.gain.setValueAtTime(0.08 * this.volumes.sfx, startTime);
      oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + 0.065);
    });
  }

  // Water Spray Spritzer ("Tssssssss-tssss")
  playSprayBottle() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    const bursts = [0, 0.22];

    bursts.forEach(delay => {
      const startTime = t + delay;
      const buffer = this.createNoiseBuffer(0.18, 'white');
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(5000, startTime);
      filter.frequency.exponentialRampToValueAtTime(2800, startTime + 0.15);
      filter.Q.setValueAtTime(2.5, startTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.28 * this.volumes.sfx, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      source.start(startTime);

      // Pump trigger click
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.frequency.setValueAtTime(1400, startTime);
      clickOsc.frequency.exponentialRampToValueAtTime(300, startTime + 0.015);
      clickGain.gain.setValueAtTime(0.12 * this.volumes.sfx, startTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.018);

      clickOsc.connect(clickGain);
      clickGain.connect(this.masterGain);
      clickOsc.start(startTime);
      clickOsc.stop(startTime + 0.02);
    });
  }

  // Champi Head Massage Vibrator Hum ("Gzzzzzzzzz")
  toggleChampiVibrator(enable) {
    this.init();
    if (this.ambients.champi) {
      try {
        this.ambients.champi.stop();
        this.ambients.champi.disconnect();
      } catch (e) {}
      this.ambients.champi = null;
    }

    if (!enable || this.isMuted) return;

    const t = this.ctx.currentTime;
    // Vibrator motor: 85 Hz buzzing saw with 25Hz tremolo modulation
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(88, t);

    const tremolo = this.ctx.createOscillator();
    tremolo.type = 'sine';
    tremolo.frequency.setValueAtTime(28, t);

    const tremoloGain = this.ctx.createGain();
    tremoloGain.gain.setValueAtTime(0.3, t);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volumes.champi, t);

    tremolo.connect(tremoloGain);
    tremoloGain.connect(gain.gain);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    tremolo.start(t);

    this.ambients.champi = {
      stop: () => {
        osc.stop();
        tremolo.stop();
      },
      disconnect: () => gain.disconnect(),
      gainNode: gain
    };
  }

  // Vintage Usha Ceiling Fan Drone
  toggleFanAmbient(enable) {
    this.init();
    if (this.ambients.fan) {
      try {
        this.ambients.fan.stop();
        this.ambients.fan.disconnect();
      } catch (e) {}
      this.ambients.fan = null;
    }

    if (!enable || this.isMuted) return;

    const t = this.ctx.currentTime;
    const noiseBuffer = this.createNoiseBuffer(3, 'pink');
    const source = this.ctx.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    // Filter to low whoosh
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, t);

    // Motor hum at 50Hz (Indian AC mains humming fan)
    const humOsc = this.ctx.createOscillator();
    humOsc.type = 'sine';
    humOsc.frequency.setValueAtTime(50, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volumes.fan, t);

    source.connect(filter);
    filter.connect(gain);
    humOsc.connect(gain);
    gain.connect(this.masterGain);

    source.start(t);
    humOsc.start(t);

    this.ambients.fan = {
      stop: () => {
        source.stop();
        humOsc.stop();
      },
      disconnect: () => gain.disconnect(),
      gainNode: gain
    };
  }

  /* ============================================================
   * UNIVERSAL SOUND EFFECTS
   * ============================================================ */

  // Radio Station Tuning Static (Crackle & hiss when station switches)
  playRadioTuning() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    const buffer = this.createNoiseBuffer(0.25, 'white');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, t);
    filter.frequency.exponentialRampToValueAtTime(1400, t + 0.12);
    filter.frequency.exponentialRampToValueAtTime(3200, t + 0.22);
    filter.Q.setValueAtTime(4, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.22 * this.volumes.sfx, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start(t);
  }

  // Tactile Toggle Switch Click (Mode flip)
  playModeSwitchSound(toMode = 'driver') {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    if (toMode === 'driver') {
      // Ignition key crank + starter cough
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.18);
      gain.gain.setValueAtTime(0.28 * this.volumes.sfx, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.2);

      // Followed by quick tap of single horn
      setTimeout(() => this.playSingleHorn(), 150);
    } else {
      // Scissors snip + barber chair hydraulic pump
      this.playScissorSnip();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.15);
      gain.gain.setValueAtTime(0.2 * this.volumes.sfx, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.2);
    }
  }

  // Stop all active ambients
  stopAllAmbients() {
    Object.keys(this.ambients).forEach(key => {
      if (this.ambients[key]) {
        try {
          this.ambients[key].stop();
          this.ambients[key].disconnect();
        } catch(e) {}
        this.ambients[key] = null;
      }
    });
  }
}

// Export singleton
window.audioEngine = new AudioEngine();

```


/* ============================================================================== */
/* FILE: js/pressureHorn.js */
/* ============================================================================== */

```javascript:js/pressureHorn.js
/**
 * PRESSURE HORN SYSTEM - Modular Web Audio Engine
 * High-Pressure Indian Musical & Truck Air Horn with Realism Processing Pipeline
 *
 * Architecture:
 * 1. Audio Realism Processing Pipeline:
 *    - BiquadFilterNode (Peaking @ 320Hz, +5.5dB) for heavy metallic body resonance
 *    - WaveShaperNode (Diaphragm saturation curve) for high-pressure distortion
 *    - Spatial Stereo Echo (Dual-tap delay: 65ms left, 120ms right with road damping)
 * 2. Smart Horn Selection Logic:
 *    - Custom-tuned musical horn configuration for signature songs
 *    - Fallback System: Random selection from 4 high-fidelity default pressure horns
 * 3. Audio Ducking Transition:
 *    - Dips main music volume over 0.05s, smoothly ramps back when echo tail ends
 */

class PressureHornSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.85;

    // Pipeline Nodes
    this.inputGain = null;
    this.bodyFilter = null;
    this.saturationNode = null;
    this.spatialEcho = null;
    this.masterGain = null;

    // Audio Buffer Cache for the 4 Default Pressure Horns
    this.assetBuffers = {};
    this.isLoadingAssets = false;

    // 4 High-Fidelity Default Fallback Pressure Horns
    this.defaultHorns = [
      {
        id: 'classic-single-tone',
        name: 'Classic Single-Tone Air Blast',
        description: 'Deep, sustained high-pressure truck horn',
        assetUrl: '/sounds/classic_single_tone.wav',
        fallbackUrl: 'https://actions.google.com/sounds/v1/transportation/truck_horn.ogg',
        duration: 1.6
      },
      {
        id: 'triple-tone-alternating',
        name: 'Triple-Tone Alternating Horn',
        description: 'Fast, switching musical rhythm',
        assetUrl: '/sounds/triple_tone_alternating.wav',
        fallbackUrl: 'https://actions.google.com/sounds/v1/transportation/air_horn.ogg',
        duration: 1.4
      },
      {
        id: 'reverse-siren',
        name: 'Reverse Siren Style Horn',
        description: 'Wailing pressure tone',
        assetUrl: '/sounds/reverse_siren.wav',
        fallbackUrl: 'https://actions.google.com/sounds/v1/emergency/siren_short.ogg',
        duration: 1.8
      },
      {
        id: 'sharp-city-clipper',
        name: 'Sharp City Bus Clipper',
        description: 'Short, aggressive double-tap blast',
        assetUrl: '/sounds/sharp_city_clipper.wav',
        fallbackUrl: 'https://actions.google.com/sounds/v1/transportation/car_horn.ogg',
        duration: 0.55
      }
    ];

    // Signature Song Hook Melodies Database
    this.songHookMap = {
      // 1. Dil Ke Badle Sanam
      'fvwyPGBOEgY': [
        { time: 0.0,  dur: 0.18, freq: 392.00 },
        { time: 0.22, dur: 0.18, freq: 440.00 },
        { time: 0.44, dur: 0.22, freq: 493.88 },
        { time: 0.70, dur: 0.22, freq: 440.00 },
        { time: 0.96, dur: 0.38, freq: 392.00 },
        { time: 1.38, dur: 0.46, freq: 329.63 }
      ],
      // 2. Main Agar Saamne (Raaz flute theme)
      'B2aHXbnu9dI': [
        { time: 0.0,  dur: 0.22, freq: 329.63 },
        { time: 0.26, dur: 0.22, freq: 392.00 },
        { time: 0.52, dur: 0.36, freq: 440.00 },
        { time: 0.92, dur: 0.42, freq: 493.88 },
        { time: 1.38, dur: 0.30, freq: 440.00 },
        { time: 1.72, dur: 0.55, freq: 392.00 }
      ],
      // 3. Har Dil Jo Pyar Karega
      'V0jFYD0PirU': [
        { time: 0.0,  dur: 0.18, freq: 293.66 },
        { time: 0.22, dur: 0.18, freq: 369.99 },
        { time: 0.44, dur: 0.24, freq: 440.00 },
        { time: 0.72, dur: 0.22, freq: 587.33 },
        { time: 0.98, dur: 0.25, freq: 493.88 },
        { time: 1.28, dur: 0.48, freq: 440.00 }
      ],
      // 4. Hamne Tumko Dil Ye De Diya
      'r4QnmrtiDGI': [
        { time: 0.0,  dur: 0.20, freq: 440.00 },
        { time: 0.24, dur: 0.20, freq: 493.88 },
        { time: 0.48, dur: 0.35, freq: 523.25 },
        { time: 0.88, dur: 0.32, freq: 493.88 },
        { time: 1.25, dur: 0.50, freq: 440.00 }
      ],
      // 5. Taaron Ka Chamakta
      'XR7qvTgQ19o': [
        { time: 0.0,  dur: 0.15, freq: 349.23 },
        { time: 0.18, dur: 0.15, freq: 349.23 },
        { time: 0.36, dur: 0.22, freq: 440.00 },
        { time: 0.62, dur: 0.22, freq: 523.25 },
        { time: 0.88, dur: 0.45, freq: 440.00 }
      ],
      // 6. Oye Raju Pyar Na Kariyo
      'nNhv8A_rJTg': [
        { time: 0.0,  dur: 0.16, freq: 293.66 },
        { time: 0.20, dur: 0.16, freq: 329.63 },
        { time: 0.40, dur: 0.25, freq: 369.99 },
        { time: 0.70, dur: 0.20, freq: 369.99 },
        { time: 0.95, dur: 0.42, freq: 440.00 }
      ],
      // 7. Ho Gaya Hai Tujhko
      'hw_HpTI_Wkw': [
        { time: 0.0,  dur: 0.20, freq: 392.00 },
        { time: 0.24, dur: 0.20, freq: 440.00 },
        { time: 0.48, dur: 0.30, freq: 493.88 },
        { time: 0.82, dur: 0.25, freq: 440.00 },
        { time: 1.12, dur: 0.45, freq: 392.00 }
      ],
      // 8. Bolo Ta Ra Ra
      'G_eP3lYg2oU': [
        { time: 0.0,  dur: 0.14, freq: 293.66 },
        { time: 0.16, dur: 0.14, freq: 293.66 },
        { time: 0.34, dur: 0.20, freq: 369.99 },
        { time: 0.58, dur: 0.20, freq: 440.00 },
        { time: 0.82, dur: 0.20, freq: 440.00 },
        { time: 1.06, dur: 0.45, freq: 293.66 }
      ],
      // 9. Chhaiyya Chhaiyya
      'PQmrmVs10X8': [
        { time: 0.0,  dur: 0.18, freq: 220.00 },
        { time: 0.22, dur: 0.18, freq: 293.66 },
        { time: 0.44, dur: 0.20, freq: 293.66 },
        { time: 0.68, dur: 0.22, freq: 329.63 },
        { time: 0.94, dur: 0.22, freq: 349.23 },
        { time: 1.20, dur: 0.45, freq: 293.66 }
      ],
      // 10. O O Jaane Jaana
      'x_elT6zkqN0': [
        { time: 0.0,  dur: 0.18, freq: 329.63 },
        { time: 0.22, dur: 0.18, freq: 392.00 },
        { time: 0.44, dur: 0.22, freq: 440.00 },
        { time: 0.70, dur: 0.28, freq: 493.88 },
        { time: 1.02, dur: 0.22, freq: 440.00 },
        { time: 1.30, dur: 0.45, freq: 392.00 }
      ],
      // 11. Tip Tip Barsa Paani
      'yT_3zO28p_8': [
        { time: 0.0,  dur: 0.20, freq: 392.00 },
        { time: 0.24, dur: 0.20, freq: 466.16 },
        { time: 0.48, dur: 0.25, freq: 523.25 },
        { time: 0.78, dur: 0.22, freq: 466.16 },
        { time: 1.04, dur: 0.45, freq: 392.00 }
      ],
      // 12. Mera Dil Bhi Kitna Pagal Hai
      'J2z_a0vLd-U': [
        { time: 0.0,  dur: 0.20, freq: 293.66 },
        { time: 0.24, dur: 0.20, freq: 369.99 },
        { time: 0.48, dur: 0.28, freq: 440.00 },
        { time: 0.80, dur: 0.22, freq: 493.88 },
        { time: 1.06, dur: 0.45, freq: 440.00 }
      ],
      // 13. Dheere Dheere Se
      'M3eXbS-B900': [
        { time: 0.0,  dur: 0.22, freq: 329.63 },
        { time: 0.26, dur: 0.22, freq: 392.00 },
        { time: 0.52, dur: 0.28, freq: 440.00 },
        { time: 0.84, dur: 0.25, freq: 392.00 },
        { time: 1.14, dur: 0.48, freq: 329.63 }
      ],
      // 14. Tujhe Dekha Toh Yeh Jaana Sanam
      'cNV5hLKh98s': [
        { time: 0.0,  dur: 0.20, freq: 293.66 },
        { time: 0.24, dur: 0.20, freq: 329.63 },
        { time: 0.48, dur: 0.25, freq: 369.99 },
        { time: 0.78, dur: 0.25, freq: 392.00 },
        { time: 1.08, dur: 0.22, freq: 369.99 },
        { time: 1.34, dur: 0.45, freq: 293.66 }
      ],
      // 15. Zingaat (Ajay-Atul)
      '2gcsgfzqN8k': [
        { time: 0.0,  dur: 0.15, freq: 293.66 },
        { time: 0.16, dur: 0.15, freq: 329.63 },
        { time: 0.32, dur: 0.18, freq: 369.99 },
        { time: 0.52, dur: 0.22, freq: 440.00 },
        { time: 0.76, dur: 0.20, freq: 587.33 },
        { time: 0.98, dur: 0.22, freq: 523.25 },
        { time: 1.22, dur: 0.48, freq: 440.00 }
      ],
      'luhVm60Wiro': [
        { time: 0.0,  dur: 0.15, freq: 293.66 },
        { time: 0.16, dur: 0.15, freq: 329.63 },
        { time: 0.32, dur: 0.18, freq: 369.99 },
        { time: 0.52, dur: 0.22, freq: 440.00 },
        { time: 0.76, dur: 0.20, freq: 587.33 },
        { time: 0.98, dur: 0.22, freq: 523.25 },
        { time: 1.22, dur: 0.48, freq: 440.00 }
      ],
      // 16. Apsara Aali (Natarang)
      'mW67u_hWiSo': [
        { time: 0.0,  dur: 0.20, freq: 440.00 },
        { time: 0.24, dur: 0.20, freq: 493.88 },
        { time: 0.48, dur: 0.25, freq: 523.25 },
        { time: 0.76, dur: 0.22, freq: 440.00 },
        { time: 1.00, dur: 0.25, freq: 392.00 },
        { time: 1.28, dur: 0.50, freq: 440.00 }
      ],
      // 17. Kombdi Palali (Jatra)
      '2KaDL9TSja0': [
        { time: 0.0,  dur: 0.16, freq: 329.63 },
        { time: 0.18, dur: 0.16, freq: 329.63 },
        { time: 0.36, dur: 0.20, freq: 392.00 },
        { time: 0.58, dur: 0.20, freq: 440.00 },
        { time: 0.80, dur: 0.25, freq: 392.00 },
        { time: 1.08, dur: 0.45, freq: 329.63 }
      ],
      // 18. Lollypop Lagelu (Pawan Singh)
      'Gr8G_ldltDE': [
        { time: 0.0,  dur: 0.18, freq: 392.00 },
        { time: 0.20, dur: 0.18, freq: 392.00 },
        { time: 0.40, dur: 0.20, freq: 440.00 },
        { time: 0.62, dur: 0.25, freq: 493.88 },
        { time: 0.90, dur: 0.28, freq: 587.33 },
        { time: 1.20, dur: 0.22, freq: 493.88 },
        { time: 1.45, dur: 0.48, freq: 392.00 }
      ],
      // 19. Rinkiya Ke Papa (Manoj Tiwari)
      '2Mv8UOiyTq0': [
        { time: 0.0,  dur: 0.18, freq: 329.63 },
        { time: 0.22, dur: 0.18, freq: 415.30 },
        { time: 0.44, dur: 0.22, freq: 493.88 },
        { time: 0.70, dur: 0.25, freq: 554.37 },
        { time: 0.98, dur: 0.22, freq: 493.88 },
        { time: 1.24, dur: 0.46, freq: 415.30 }
      ],
      // 20. Raate Diya Butake
      'N9Ylebtf8YI': [
        { time: 0.0,  dur: 0.16, freq: 349.23 },
        { time: 0.20, dur: 0.16, freq: 440.00 },
        { time: 0.40, dur: 0.22, freq: 523.25 },
        { time: 0.66, dur: 0.25, freq: 587.33 },
        { time: 0.94, dur: 0.22, freq: 523.25 },
        { time: 1.20, dur: 0.45, freq: 440.00 }
      ]
    };
  }

  /* ============================================================
   * 1. AUDIO REALISM PROCESSING PIPELINE
   * ============================================================ */

  init() {
    if (!this.ctx) {
      if (window.audioEngine && window.audioEngine.ctx) {
        this.ctx = window.audioEngine.ctx;
      } else {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.inputGain) {
      this.buildPipeline();
      this.preloadDefaultAssets();
    }
  }

  // Generate subtle diaphragm overdrive / saturation curve
  makeDiaphragmSaturationCurve(amount = 22) {
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const k = amount;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      // Soft saturation mimicking acoustic speaker diaphragm stress under high pressure
      curve[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
    }
    return curve;
  }

  buildPipeline() {
    const ctx = this.ctx;

    // A. Input Node (receives all raw horn oscillators and buffer sources)
    this.inputGain = ctx.createGain();
    this.inputGain.gain.setValueAtTime(1.0, ctx.currentTime);

    // B. Low-mid Resonance Filter (Boosts 200Hz - 500Hz for heavy metallic body vibration)
    this.bodyFilter = ctx.createBiquadFilter();
    this.bodyFilter.type = 'peaking';
    this.bodyFilter.frequency.setValueAtTime(340, ctx.currentTime); // Mid-low resonance center
    this.bodyFilter.Q.setValueAtTime(1.3, ctx.currentTime);
    this.bodyFilter.gain.setValueAtTime(5.8, ctx.currentTime); // +5.8dB metallic body vibration

    // C. WaveShaperNode (Diaphragm saturation & intense pressure overdrive)
    this.saturationNode = ctx.createWaveShaper();
    this.saturationNode.curve = this.makeDiaphragmSaturationCurve(22);
    this.saturationNode.oversample = '4x';

    // D. Master Horn Output Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);

    // E. Spatial Echo Network (Dual-tap stereo delay between 50ms - 150ms)
    const delayL = ctx.createDelay();
    delayL.delayTime.setValueAtTime(0.068, ctx.currentTime); // 68ms left reflection

    const delayR = ctx.createDelay();
    delayR.delayTime.setValueAtTime(0.128, ctx.currentTime); // 128ms right reflection

    const feedbackL = ctx.createGain();
    feedbackL.gain.setValueAtTime(0.26, ctx.currentTime); // Decaying highway flutter echo

    const feedbackR = ctx.createGain();
    feedbackR.gain.setValueAtTime(0.26, ctx.currentTime);

    // Damping Filter (Simulates highway asphalt and building acoustic absorption)
    const echoFilter = ctx.createBiquadFilter();
    echoFilter.type = 'lowpass';
    echoFilter.frequency.setValueAtTime(2600, ctx.currentTime);

    const splitter = ctx.createChannelSplitter(2);
    const merger = ctx.createChannelMerger(2);
    const wetGain = ctx.createGain();
    wetGain.gain.setValueAtTime(0.42, ctx.currentTime); // Spatial highway reverb mix level

    const dryGain = ctx.createGain();
    dryGain.gain.setValueAtTime(0.92, ctx.currentTime);

    // Connect Primary Processing Chain:
    // Input -> Body Filter (200-500Hz boost) -> WaveShaper (Diaphragm Saturation)
    this.inputGain.connect(this.bodyFilter);
    this.bodyFilter.connect(this.saturationNode);

    // Dry Path: Saturation -> Dry Gain -> Master
    this.saturationNode.connect(dryGain);
    dryGain.connect(this.masterGain);

    // Spatial Echo Path: Saturation -> Splitter -> Delays -> Feedback -> Merger -> Wet Gain -> Master
    this.saturationNode.connect(splitter);
    splitter.connect(delayL, 0);
    splitter.connect(delayR, 1);

    delayL.connect(feedbackL);
    feedbackL.connect(echoFilter);
    echoFilter.connect(delayL);

    delayR.connect(feedbackR);
    feedbackR.connect(echoFilter);

    delayL.connect(merger, 0, 0);
    delayR.connect(merger, 0, 1);

    merger.connect(wetGain);
    wetGain.connect(this.masterGain);

    // Connect to destination (or AudioEngine master bus)
    if (window.audioEngine && window.audioEngine.masterGain) {
      this.masterGain.connect(window.audioEngine.masterGain);
    } else {
      this.masterGain.connect(ctx.destination);
    }
  }

  // Preload and decode the 4 default fallback audio assets
  async preloadDefaultAssets() {
    if (this.isLoadingAssets) return;
    this.isLoadingAssets = true;

    for (const horn of this.defaultHorns) {
      try {
        const url = horn.assetUrl;
        const resp = await fetch(url);
        if (resp.ok) {
          const arrayBuf = await resp.arrayBuffer();
          const audioBuf = await this.ctx.decodeAudioData(arrayBuf);
          this.assetBuffers[horn.id] = audioBuf;
        }
      } catch (err) {
        console.warn(`Could not preload ${horn.id} audio asset; procedural synthesizer active:`, err.message);
      }
    }
  }

  /* ============================================================
   * 2. SMART HORN SELECTION & FALLBACK LOGIC
   * ============================================================ */

  // Check if a track has a dedicated custom-tuned musical horn
  hasSongHook(track) {
    if (!track) return false;
    const id = track.id || '';
    const title = (track.title || '').toLowerCase();

    if (this.songHookMap[id]) return true;

    // Check title matches
    const mappedTitles = [
      'dil ke badle', 'agar saamne', 'har dil jo', 'tumko dil ye', 'taaron ka',
      'oye raju', 'ho gaya hai', 'bolo ta ra', 'chhaiyya', 'jaane jaana',
      'tip tip', 'kitna pagal', 'dheere dheere', 'tujhe dekha', 'zingaat',
      'apsara aali', 'kombdi palali', 'lollypop', 'kamariya kare', 'rinkiya', 'diya butake'
    ];
    return mappedTitles.some(sub => title.includes(sub));
  }

  // Retrieve melody array for a mapped track
  getSongHookMelody(track) {
    if (!track) return null;
    const id = track.id || '';
    const title = (track.title || '').toLowerCase();

    if (this.songHookMap[id]) return this.songHookMap[id];

    for (const key of Object.keys(this.songHookMap)) {
      if (id === key) return this.songHookMap[key];
    }

    // Title fallback matches
    if (title.includes('dil ke badle')) return this.songHookMap['fvwyPGBOEgY'];
    if (title.includes('agar saamne')) return this.songHookMap['B2aHXbnu9dI'];
    if (title.includes('har dil jo')) return this.songHookMap['V0jFYD0PirU'];
    if (title.includes('tumko dil ye')) return this.songHookMap['r4QnmrtiDGI'];
    if (title.includes('taaron ka')) return this.songHookMap['XR7qvTgQ19o'];
    if (title.includes('oye raju')) return this.songHookMap['nNhv8A_rJTg'];
    if (title.includes('ho gaya hai')) return this.songHookMap['hw_HpTI_Wkw'];
    if (title.includes('bolo ta ra')) return this.songHookMap['G_eP3lYg2oU'];
    if (title.includes('chhaiyya')) return this.songHookMap['PQmrmVs10X8'];
    if (title.includes('jaane jaana')) return this.songHookMap['x_elT6zkqN0'];
    if (title.includes('tip tip')) return this.songHookMap['yT_3zO28p_8'];
    if (title.includes('kitna pagal')) return this.songHookMap['J2z_a0vLd-U'];
    if (title.includes('dheere dheere')) return this.songHookMap['M3eXbS-B900'];
    if (title.includes('tujhe dekha')) return this.songHookMap['cNV5hLKh98s'];
    if (title.includes('zingaat')) return this.songHookMap['2gcsgfzqN8k'];
    if (title.includes('apsara aali')) return this.songHookMap['mW67u_hWiSo'];
    if (title.includes('kombdi palali')) return this.songHookMap['2KaDL9TSja0'];
    if (title.includes('lollypop') || title.includes('kamariya kare')) return this.songHookMap['Gr8G_ldltDE'];
    if (title.includes('rinkiya')) return this.songHookMap['2Mv8UOiyTq0'];
    if (title.includes('diya butake')) return this.songHookMap['N9Ylebtf8YI'];

    return null;
  }

  // Synthesize musical hook notes through the realism pipeline
  playSongHook(melody, trackName = 'Highway Classic') {
    const t = this.ctx.currentTime;
    let maxEndTime = t;

    melody.forEach(note => {
      const startTime = t + note.time;
      const endTime = startTime + note.dur;
      if (endTime > maxEndTime) maxEndTime = endTime;

      // 1. Primary high-pressure brass reed oscillator
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(note.freq, startTime);
      osc1.detune.setValueAtTime(-6, startTime);

      // 2. Dual trumpet harmonic fifth (musical air-horn thickness)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(note.freq * 1.498, startTime);
      osc2.detune.setValueAtTime(8, startTime);

      // 3. Sub-octave pneumatic chest punch
      const oscSub = this.ctx.createOscillator();
      oscSub.type = 'triangle';
      oscSub.frequency.setValueAtTime(note.freq * 0.5, startTime);

      // Note acoustic pressure envelope
      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0.001, startTime);
      noteGain.gain.linearRampToValueAtTime(0.85, startTime + 0.018); // Instant pneumatic burst
      noteGain.gain.setValueAtTime(0.80, endTime - 0.035);
      noteGain.gain.exponentialRampToValueAtTime(0.001, endTime);

      osc1.connect(noteGain);
      osc2.connect(noteGain);
      oscSub.connect(noteGain);

      // Route through the realism pipeline
      noteGain.connect(this.inputGain);

      osc1.start(startTime);
      osc2.start(startTime);
      oscSub.start(startTime);

      osc1.stop(endTime);
      osc2.stop(endTime);
      oscSub.stop(endTime);
    });

    const totalDuration = maxEndTime - t;
    return {
      type: 'hook',
      name: trackName,
      description: 'Custom Melodic Song Hook Horn',
      duration: totalDuration
    };
  }

  // Play one of the 4 high-quality default fallback pressure horns
  playFallbackHorn(chosenHorn = null) {
    const horn = chosenHorn || this.defaultHorns[Math.floor(Math.random() * this.defaultHorns.length)];
    const t = this.ctx.currentTime;

    // Check if high-fidelity AudioBuffer is preloaded
    if (this.assetBuffers[horn.id]) {
      const source = this.ctx.createBufferSource();
      source.buffer = this.assetBuffers[horn.id];

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.95, t);

      source.connect(gain);
      gain.connect(this.inputGain);
      source.start(t);

      return {
        type: 'fallback',
        id: horn.id,
        name: horn.name,
        description: horn.description,
        duration: horn.duration
      };
    }

    // Procedural High-Fidelity Synthesizer for Fallbacks
    this.synthesizeFallback(horn.id, t);

    return {
      type: 'fallback',
      id: horn.id,
      name: horn.name,
      description: horn.description,
      duration: horn.duration
    };
  }

  // Procedural Synthesis Engine for the 4 Default Pressure Horns
  synthesizeFallback(hornId, t) {
    const ctx = this.ctx;

    // 1. Classic Single-Tone Air Blast (Deep, sustained high-pressure truck horn ~1.6s)
    if (hornId === 'classic-single-tone') {
      const dur = 1.6;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const oscSub = ctx.createOscillator();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(185, t); // F#3 heavy truck trumpet
      osc1.detune.setValueAtTime(-5, t);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(233, t); // Bb3 minor third resonance
      osc2.detune.setValueAtTime(6, t);

      oscSub.type = 'triangle';
      oscSub.frequency.setValueAtTime(92.5, t); // Deep chassis vibration

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.95, t + 0.025);
      gain.gain.setValueAtTime(0.90, t + dur - 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      oscSub.connect(gain);
      gain.connect(this.inputGain);

      osc1.start(t); osc2.start(t); oscSub.start(t);
      osc1.stop(t + dur); osc2.stop(t + dur); oscSub.stop(t + dur);
    }
    // 2. Triple-Tone Alternating Horn (Fast, switching musical rhythm ~1.4s)
    else if (hornId === 'triple-tone-alternating') {
      const notes = [
        { time: 0.0,  dur: 0.22, freq: 329.63 },
        { time: 0.22, dur: 0.22, freq: 415.30 },
        { time: 0.44, dur: 0.22, freq: 493.88 },
        { time: 0.68, dur: 0.65, freq: [329.63, 415.30, 493.88] } // Full triad chord blast
      ];

      notes.forEach(n => {
        const start = t + n.time;
        const end = start + n.dur;

        if (Array.isArray(n.freq)) {
          n.freq.forEach(f => {
            const osc = ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(f, start);

            const g = ctx.createGain();
            g.gain.setValueAtTime(0.001, start);
            g.gain.linearRampToValueAtTime(0.40, start + 0.02);
            g.gain.setValueAtTime(0.36, end - 0.06);
            g.gain.exponentialRampToValueAtTime(0.001, end);

            osc.connect(g);
            g.connect(this.inputGain);
            osc.start(start);
            osc.stop(end);
          });
        } else {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(n.freq, start);
          osc2.type = 'sawtooth';
          osc2.frequency.setValueAtTime(n.freq * 1.5, start);

          const g = ctx.createGain();
          g.gain.setValueAtTime(0.001, start);
          g.gain.linearRampToValueAtTime(0.85, start + 0.015);
          g.gain.setValueAtTime(0.80, end - 0.03);
          g.gain.exponentialRampToValueAtTime(0.001, end);

          osc1.connect(g);
          osc2.connect(g);
          g.connect(this.inputGain);

          osc1.start(start); osc2.start(start);
          osc1.stop(end); osc2.stop(end);
        }
      });
    }
    // 3. Reverse Siren Style Horn (Wailing pressure tone ~1.8s)
    else if (hornId === 'reverse-siren') {
      const dur = 1.8;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      // Ascending-then-descending pressure wail
      osc1.frequency.setValueAtTime(330, t);
      osc1.frequency.exponentialRampToValueAtTime(530, t + 0.7);
      osc1.frequency.exponentialRampToValueAtTime(390, t + dur);

      osc2.frequency.setValueAtTime(495, t);
      osc2.frequency.exponentialRampToValueAtTime(795, t + 0.7);
      osc2.frequency.exponentialRampToValueAtTime(585, t + dur);

      // Tremolo / fluttering air valve modulation
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(8.5, t); // 8.5Hz pneumatic flutter
      lfoGain.gain.setValueAtTime(0.14, t);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.85, t + 0.03);
      gain.gain.setValueAtTime(0.80, t + dur - 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.inputGain);

      lfo.start(t); osc1.start(t); osc2.start(t);
      lfo.stop(t + dur); osc1.stop(t + dur); osc2.stop(t + dur);
    }
    // 4. Sharp City Bus Clipper (Short, aggressive double-tap blast ~0.55s)
    else {
      const taps = [
        { start: 0.00, dur: 0.16 },
        { start: 0.24, dur: 0.22 }
      ];

      taps.forEach(tap => {
        const start = t + tap.start;
        const end = start + tap.dur;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(392, start); // G4
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(494, start); // B4

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.001, start);
        g.gain.linearRampToValueAtTime(0.92, start + 0.01); // Instant razor-sharp attack
        g.gain.setValueAtTime(0.88, end - 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, end);

        osc1.connect(g);
        osc2.connect(g);
        g.connect(this.inputGain);

        osc1.start(start); osc2.start(start);
        osc1.stop(end); osc2.stop(end);
      });
    }
  }

  /* ============================================================
   * 3. MASTER "BLOW HORN" TRIGGER & AUDIO DUCKING TRANSITION
   * ============================================================ */

  blowHorn(track = null) {
    this.init();
    if (this.isMuted) return null;

    const currentTrack = track || (window.musicPlayer ? window.musicPlayer.currentTrack : null);
    let hornResult = null;

    // Check if current song has a mapped musical hook
    const melody = this.getSongHookMelody(currentTrack);
    if (melody) {
      hornResult = this.playSongHook(melody, currentTrack ? currentTrack.title : 'Song Hook');
    } else {
      // Smart Fallback System: Random selection from 4 high-quality default pressure horns
      hornResult = this.playFallbackHorn();
    }

    // 3. Audio Ducking Transition:
    // Instantly dip main music volume over 0.05s, then smoothly restore once echo tail ends
    const totalDuckingDuration = (hornResult.duration || 1.6) + 0.35; // Horn duration + spatial highway echo tail
    if (window.musicPlayer && typeof window.musicPlayer.duckVolume === 'function') {
      window.musicPlayer.duckVolume(totalDuckingDuration);
    }

    return hornResult;
  }
}

// Instantiate global singleton
window.pressureHornSystem = new PressureHornSystem();

```


/* ============================================================================== */
/* FILE: js/visuals.js */
/* ============================================================================== */

```javascript:js/visuals.js
/**
 * SAFAR & SALOON - Dynamic Canvas & Visual Atmosphere Engine
 * High-performance 60FPS dual-mode visual systems:
 * Mode 1: 3D Perspective Highway with Real-Time Day/Night Cycle, Headlight Glow & NH-48 Journey
 * Mode 2: Graphic Indian Village Deluxe Barber Shop (Barber Shaving Beard & Patrons on Bench)
 */

class VisualsEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;
    this.activeMode = 'driver'; // 'driver' or 'saloon'
    this.isPlaying = false;

    // Window dimensions
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    // Time of Day Sync (null = auto real-time, or 'day', 'sunset', 'night', 'dawn')
    this.timeOverride = null;

    // NH-48 Interstate Highway Journey Corridor (13 Iconic Stages)
    this.routeLocations = [
      { city: "New Delhi", landmark: "ISBT Kashmere Gate", km: 0, nextCity: "Gurgaon", nextDist: 32, tag: "CAPITAL EXPRESS" },
      { city: "Gurgaon", landmark: "Cyber City Expressway", km: 38, nextCity: "Neemrana", nextDist: 85, tag: "EXPRESS TOLLWAY" },
      { city: "Neemrana", landmark: "Midway Heritage Dhaba", km: 122, nextCity: "Jaipur", nextDist: 145, tag: "HIGHWAY CORRIDOR" },
      { city: "Jaipur", landmark: "Amber Fort Bypass", km: 268, nextCity: "Ajmer", nextDist: 130, tag: "PINK CITY EXPEDITION" },
      { city: "Ajmer", landmark: "Kishangarh Toll Plaza", km: 395, nextCity: "Bhilwara", nextDist: 115, tag: "MARBLE HIGHWAY" },
      { city: "Bhilwara", landmark: "Textile Link Road", km: 510, nextCity: "Udaipur", nextDist: 150, tag: "TEXTILE CORRIDOR" },
      { city: "Udaipur", landmark: "Lake Aravali Pass", km: 660, nextCity: "Shamlaji", nextDist: 105, tag: "ARAVALI PASS" },
      { city: "Shamlaji", landmark: "Ratanpur Border Checkpost", km: 765, nextCity: "Ahmedabad", nextDist: 150, tag: "STATE BORDER" },
      { city: "Ahmedabad", landmark: "Ring Expressway", km: 915, nextCity: "Vadodara", nextDist: 110, tag: "HERITAGE EXPRESS" },
      { city: "Vadodara", landmark: "Golden Bridge Crossing", km: 1025, nextCity: "Surat", nextDist: 135, tag: "SANSKARI NAGARI" },
      { city: "Surat", landmark: "Tapi River Viaduct", km: 1160, nextCity: "Vapi", nextDist: 125, tag: "DIAMOND CORRIDOR" },
      { city: "Vapi & Manor", landmark: "Manor Ghat Misty Forest", km: 1285, nextCity: "Mumbai", nextDist: 135, tag: "COASTAL GHATS" },
      { city: "Mumbai", landmark: "Western Express Corridor", km: 1420, nextCity: "New Delhi", nextDist: 1420, tag: "METROPOLIS TERMINAL" }
    ];

    // Bus mode parameters
    this.roadSpeed = 3.5;
    this.travelPhase = 0;
    this.lastFrameTime = performance.now();
    this.milestones = [];
    this.oncomingCars = [];
    this.stars = [];
    this.rainDrops = [];
    this.windshieldDrops = [];
    this.wiperAngle = 0.10; // Parked at rest (~6 deg)
    this.wiperDirection = 1;
    this.isRainActive = false;
    this.isWiperActive = false;
    this.lightningTimer = 0;
    this.lightningIntensity = 0;

    // Day sky clouds, storm clouds & roadside landscape
    this.dayClouds = [];
    this.stormClouds = [];
    this.roadsideTrees = [];
    this.telegraphPoles = [];
    this.streetLights = [];
    this.horizonLights = [];

    // Saloon mode parameters
    this.poleRotation = 0;
    this.steamOpacity = 0.45;
    this.steamDrops = [];
    this.fanRotation = 0;
    this.isFanActive = true;
    this.fanSpeed = 0.028; // Authentic slow, unhurried vintage ceiling fan speed
    this.shavingStroke = 0; // Animation for barber arm shaving beard
    this.lampPulse = 0;
    this.mistOrigin = null;
    this.saloonDustMotes = [];
    this.mugSteam = [];

    // Mouse tracking for amulet sway
    this.mouse = { x: this.w / 2, y: this.h / 2, isDown: false };
    this.amuletSway = 0;
    this.amuletTargetSway = 0;
  }

  init(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.handleResize();

    window.addEventListener('resize', () => this.handleResize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.amuletTargetSway = ((e.clientX / this.w) - 0.5) * 45;
    });

    this.initRoadEntities();
    this.initStars();
    this.initClouds();
    this.initRain();
    this.initSaloonAtmosphere();
    this.startLoop();
  }

  handleResize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    if (this.canvas) {
      this.canvas.width = this.w;
      this.canvas.height = this.h;
    }
  }

  setMode(mode) {
    this.activeMode = mode;
  }

  setPlayState(playing) {
    this.isPlaying = playing;
  }

  toggleRain(active) {
    this.isRainActive = active;
    this.isWiperActive = active;
    if (!active) {
      this.wiperAngle = 0.10; // Parked at rest
      this.wiperDirection = 1;
      this.windshieldDrops = []; // Wipe screen clear when rain stops
    }
  }

  toggleWipers(active) {
    if (!this.isRainActive) {
      this.isWiperActive = false;
      this.wiperAngle = 0.10;
      return;
    }
    this.isWiperActive = active;
  }

  toggleFan(active) {
    this.isFanActive = active;
  }

  triggerMist() {
    const origin = this.mistOrigin || { x: this.w * 0.35, y: this.h * 0.50 };
    for (let i = 0; i < 45; i++) {
      const angle = (Math.PI * 0.82) + (Math.random() - 0.5) * 0.65;
      const speed = Math.random() * 4.8 + 2.2;
      this.steamDrops.push({
        x: origin.x - 4,
        y: origin.y - 8 + (Math.random() - 0.5) * 8,
        vx: -Math.cos(angle - Math.PI) * speed,
        vy: Math.sin(angle - Math.PI) * speed - 0.8,
        r: Math.random() * 2.8 + 1.2,
        alpha: Math.random() * 0.65 + 0.35
      });
    }
  }

  /* ============================================================
   * REAL-TIME TIME OF DAY & INTERSTATE HIGHWAY LOCATION SYNC
   * ============================================================ */

  setTimeOverride(override) {
    // null or 'day', 'sunset', 'night', 'dawn'
    this.timeOverride = override;
  }

  getTimeOfDay() {
    if (this.timeOverride) {
      let label = 'Night Mode (Headlights)';
      let timeStr = '22:00';
      if (this.timeOverride === 'day') {
        label = 'Daylight Highway';
        timeStr = '13:00';
      } else if (this.timeOverride === 'sunset') {
        label = 'Sunset Golden Hour';
        timeStr = '18:30';
      } else if (this.timeOverride === 'dawn') {
        label = 'Dawn & Sunrise';
        timeStr = '06:00';
      }
      return { period: this.timeOverride, timeStr, label, isManual: true };
    }

    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const val = h + m / 60;
    const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

    let period = 'night';
    let label = 'Midnight Highway';
    if (val >= 5.0 && val < 7.0) {
      period = 'dawn';
      label = 'Dawn & Sunrise';
    } else if (val >= 7.0 && val < 17.5) {
      period = 'day';
      label = 'Bright Daylight';
    } else if (val >= 17.5 && val < 20.0) {
      period = 'sunset';
      label = 'Golden Sunset';
    } else {
      period = 'night';
      label = 'Night Highway';
    }
    return { period, timeStr, label, isManual: false };
  }

  getCurrentLocation() {
    const t = this.getTimeOfDay();
    const now = new Date();
    const hourVal = t.isManual
      ? (t.period === 'day' ? 13 : (t.period === 'sunset' ? 18.5 : (t.period === 'dawn' ? 6 : 22)))
      : (now.getHours() + now.getMinutes() / 60);

    const idx = Math.floor((hourVal / 24) * this.routeLocations.length) % this.routeLocations.length;
    return this.routeLocations[idx];
  }

  /* ============================================================
   * BUS DRIVER MODE GRAPHICS ENGINE
   * ============================================================ */

  initStars() {
    this.stars = [];
    for (let i = 0; i < 90; i++) {
      this.stars.push({
        x: Math.random() * this.w,
        y: Math.random() * (this.h * 0.42),
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005
      });
    }
  }

  initClouds() {
    this.dayClouds = [
      { x: this.w * 0.1, y: this.h * 0.20, w: 160, h: 48, speed: 0.14 },
      { x: this.w * 0.45, y: this.h * 0.26, w: 230, h: 62, speed: 0.20 },
      { x: this.w * 0.82, y: this.h * 0.18, w: 180, h: 52, speed: 0.16 },
      { x: -120, y: this.h * 0.22, w: 210, h: 56, speed: 0.15 }
    ];

    // Turbulent Dark Storm Clouds for Rain Mode
    this.stormClouds = [
      { x: this.w * 0.05, y: this.h * 0.18, w: 290, h: 90, speed: 0.38 },
      { x: this.w * 0.38, y: this.h * 0.15, w: 350, h: 110, speed: 0.48 },
      { x: this.w * 0.72, y: this.h * 0.20, w: 320, h: 95, speed: 0.42 },
      { x: -160, y: this.h * 0.24, w: 360, h: 115, speed: 0.45 }
    ];
  }

  initRoadEntities() {
    const loc = this.getCurrentLocation();
    this.milestones = [
      { z: 0.15, label: `NH-48 • ${loc.nextCity.toUpperCase()} ${loc.nextDist} KM`, side: 1 },
      { z: 0.58, label: "SHREE GANESH DHABA 2 KM", side: -1 },
      { z: 0.92, label: `MUMBAI ${Math.max(15, 1420 - loc.km)} KM`, side: 1 }
    ];

    this.oncomingCars = [
      { z: 0.2, speed: 0.008, lane: -1 },
      { z: 0.7, speed: 0.010, lane: -1 }
    ];

    // Roadside Telephone / Telegraph Utility Poles (NH-48 Highway Verge)
    this.telegraphPoles = [
      { z: 0.08, side: 1.18 },
      { z: 0.28, side: 1.18 },
      { z: 0.48, side: 1.18 },
      { z: 0.68, side: 1.18 },
      { z: 0.88, side: 1.18 },
      { z: 1.08, side: 1.18 }
    ];

    // Electric Highway Street Light Poles (Curved steel streetlights with downward road lamps)
    this.streetLights = [
      { z: 0.12, side: 1.15 },
      { z: 0.38, side: 1.15 },
      { z: 0.64, side: 1.15 },
      { z: 0.90, side: 1.15 }
    ];

    // Lush Roadside Indian Highway Trees (Neem, Babul, Peepal, Eucalyptus)
    this.roadsideTrees = [
      { z: 0.08, side: -1.45, scale: 0.90, type: 'neem' },
      { z: 0.22, side: 1.55, scale: 1.10, type: 'babul' },
      { z: 0.38, side: -1.50, scale: 1.05, type: 'peepal' },
      { z: 0.54, side: 1.50, scale: 1.20, type: 'neem' },
      { z: 0.70, side: -1.42, scale: 0.95, type: 'babul' },
      { z: 0.86, side: 1.55, scale: 1.05, type: 'peepal' },
      { z: 0.98, side: -1.48, scale: 1.15, type: 'neem' }
    ];

    // Distant Foothill Dhaba & Village Valley Lights (Kept safely off the road corridor)
    this.horizonLights = [];
    for (let i = 0; i < 26; i++) {
      const isLeft = (i % 2 === 0);
      const xRatio = isLeft ? (0.02 + Math.random() * 0.36) : (0.64 + Math.random() * 0.34);
      this.horizonLights.push({
        xRatio,
        yOffset: Math.random() * 22 - 26,
        r: Math.random() * 1.5 + 1.0,
        color: i % 4 === 0 ? 'rgba(239, 68, 68, 0.85)' : (i % 3 === 0 ? 'rgba(56, 189, 248, 0.75)' : 'rgba(251, 191, 36, 0.9)'),
        twinkleSpeed: Math.random() * 0.03 + 0.012,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  initSaloonAtmosphere() {
    this.saloonDustMotes = [];
    for (let i = 0; i < 30; i++) {
      this.saloonDustMotes.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -Math.random() * 0.32 - 0.08,
        r: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.45 + 0.20,
        phase: Math.random() * Math.PI * 2
      });
    }
    this.mugSteam = [];
  }

  initRain() {
    this.rainDrops = [];
    this.windshieldDrops = [];
    for (let i = 0; i < 140; i++) {
      this.rainDrops.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        length: Math.random() * 20 + 12,
        speed: Math.random() * 6 + 9,
        alpha: Math.random() * 0.35 + 0.15
      });
    }
  }

  renderBusMode(dtScale = 1.0) {
    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;
    const horizon = h * 0.42;

    // Smooth highway travel kinematics (Gentle coach suspension heave & sway)
    const busHeave = this.isPlaying ? Math.sin(Date.now() * 0.005) * 1.0 : 0;
    const busSway = this.isPlaying ? Math.sin(Date.now() * 0.0018) * 1.5 : 0;

    const timeInfo = this.getTimeOfDay();
    const period = timeInfo.period;
    const isNight = period === 'night';
    const isSunset = period === 'sunset';
    const isDawn = period === 'dawn';
    const isDay = period === 'day';
    const loc = this.getCurrentLocation();

    const isRain = this.isRainActive;

    // 1. SKY GRADIENT ACCORDING TO REAL TIME & RAIN ENVIRONMENT
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizon);
    if (isRain) {
      // DRAMATIC STORMY BLACK & OVERCAST SKY ENVIRONMENT
      skyGrad.addColorStop(0, '#020408'); // Pure deep black storm canopy
      skyGrad.addColorStop(0.40, '#070c14'); // Charcoal storm cloud base
      skyGrad.addColorStop(0.75, '#0d1422'); // Deep stormy slate overcast
      skyGrad.addColorStop(1, '#131c2a'); // Horizon storm mist
    } else if (isNight) {
      skyGrad.addColorStop(0, '#030712');
      skyGrad.addColorStop(0.65, '#0b1626');
      skyGrad.addColorStop(1, '#1e140d'); // Horizon oncoming warm dust
    } else if (isDawn) {
      skyGrad.addColorStop(0, '#1e1026');
      skyGrad.addColorStop(0.4, '#701a35');
      skyGrad.addColorStop(0.8, '#b45309');
      skyGrad.addColorStop(1, '#fde047');
    } else if (isDay) {
      skyGrad.addColorStop(0, '#0284c7'); // Clear sky blue
      skyGrad.addColorStop(0.55, '#38bdf8');
      skyGrad.addColorStop(1, '#bae6fd');
    } else { // Sunset
      skyGrad.addColorStop(0, '#180d2b');
      skyGrad.addColorStop(0.4, '#831843');
      skyGrad.addColorStop(0.75, '#ea580c');
      skyGrad.addColorStop(1, '#fef08a');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, horizon);

    // 2. CELESTIAL BODIES OR DENSE STORM CLOUDS
    if (isRain) {
      // HEAVY DRIFTING TURBULENT STORM CLOUDS
      this.stormClouds.forEach(c => {
        if (this.isPlaying) {
          c.x += c.speed;
          if (c.x > w + 200) c.x = -c.w - 60;
        }
        ctx.save();
        const scGrad = ctx.createRadialGradient(c.x + c.w * 0.45, c.y + c.h * 0.35, 15, c.x + c.w * 0.5, c.y + c.h * 0.5, c.w * 0.65);
        scGrad.addColorStop(0, 'rgba(30, 41, 59, 0.95)');
        scGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.96)');
        scGrad.addColorStop(1, 'rgba(2, 6, 23, 0.88)');
        ctx.fillStyle = scGrad;
        ctx.beginPath();
        ctx.arc(c.x + c.w * 0.25, c.y + c.h * 0.5, c.h * 0.48, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.5, c.y + c.h * 0.35, c.h * 0.68, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.75, c.y + c.h * 0.5, c.h * 0.50, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.38, c.y + c.h * 0.65, c.h * 0.42, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.62, c.y + c.h * 0.65, c.h * 0.42, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // OCCASIONAL DISTANT HORIZON LIGHTNING PULSE
      if (this.isPlaying) {
        this.lightningTimer += 1;
        if (this.lightningTimer > 310) {
          this.lightningTimer = 0;
          this.lightningIntensity = 0.95;
        }
      }
      if (this.lightningIntensity > 0) {
        this.lightningIntensity -= 0.045;
        ctx.save();
        ctx.fillStyle = `rgba(215, 235, 255, ${Math.max(0, this.lightningIntensity * 0.38)})`;
        ctx.fillRect(0, 0, w, horizon + 30);
        ctx.restore();
      }
    } else if (isNight) {
      // Twinkling stars
      this.stars.forEach(s => {
        s.alpha += Math.sin(Date.now() * s.twinkleSpeed) * 0.01;
        ctx.fillStyle = `rgba(240, 245, 255, ${Math.max(0.1, Math.min(1, s.alpha))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Distant highway moon
      const moonX = w * 0.78;
      const moonY = horizon * 0.32;
      ctx.fillStyle = 'rgba(255, 255, 230, 0.9)';
      ctx.beginPath();
      ctx.arc(moonX, moonY, 16, 0, Math.PI * 2);
      ctx.fill();
      // Moon soft halo
      const moonHalo = ctx.createRadialGradient(moonX, moonY, 14, moonX, moonY, 48);
      moonHalo.addColorStop(0, 'rgba(255, 255, 240, 0.25)');
      moonHalo.addColorStop(1, 'rgba(255, 255, 240, 0)');
      ctx.fillStyle = moonHalo;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 48, 0, Math.PI * 2);
      ctx.fill();
    } else if (isDay) {
      // Golden High Sun with Lens Flare
      const sunX = w * 0.75;
      const sunY = horizon * 0.30;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 130);
      sunGlow.addColorStop(0, 'rgba(255, 255, 230, 0.95)');
      sunGlow.addColorStop(0.3, 'rgba(255, 220, 100, 0.45)');
      sunGlow.addColorStop(1, 'rgba(255, 200, 50, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 130, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 22, 0, Math.PI * 2);
      ctx.fill();

      // Drifting Fluffy Cumulus Clouds
      this.dayClouds.forEach(c => {
        if (this.isPlaying) {
          c.x += c.speed;
          if (c.x > w + 150) c.x = -200;
        }
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.h * 0.5, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.3, c.y - c.h * 0.25, c.h * 0.65, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.65, c.y, c.h * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    } else if (isSunset) {
      // Setting sun sinking into horizon
      const sunX = w * 0.5;
      const sunY = horizon - 12;
      const sunsetGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 140);
      sunsetGlow.addColorStop(0, 'rgba(255, 215, 0, 0.95)');
      sunsetGlow.addColorStop(0.4, 'rgba(234, 88, 12, 0.5)');
      sunsetGlow.addColorStop(1, 'rgba(153, 27, 27, 0)');
      ctx.fillStyle = sunsetGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. GRAND MULTI-DISTANCE ARAVALI MOUNTAIN RANGES
    // Layer 1: Great Far Aravali Massif (Extreme Distance - Towering Peaks)
    const farMtnColor = isRain ? '#04070e' : (isDay ? '#14532d' : (isSunset ? '#310a3d' : (isDawn ? '#270830' : '#03060a')));
    ctx.fillStyle = farMtnColor;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(w * 0.05, horizon - 110);
    ctx.lineTo(w * 0.16, horizon - 65);
    ctx.lineTo(w * 0.28, horizon - 120);
    ctx.lineTo(w * 0.42, horizon - 55);
    ctx.lineTo(w * 0.58, horizon - 115);
    ctx.lineTo(w * 0.72, horizon - 70);
    ctx.lineTo(w * 0.85, horizon - 125);
    ctx.lineTo(w * 0.95, horizon - 80);
    ctx.lineTo(w, horizon - 95);
    ctx.lineTo(w, horizon);
    ctx.closePath();
    ctx.fill();

    // Layer 2: Mid-Distance Rugged Ridge (Intermediate Distance)
    const midMtnColor = isRain ? '#070c14' : (isDay ? '#15803d' : (isSunset ? '#4c0519' : (isDawn ? '#380c2f' : '#050a10')));
    ctx.fillStyle = midMtnColor;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(w * 0.10, horizon - 65);
    ctx.lineTo(w * 0.22, horizon - 40);
    ctx.lineTo(w * 0.35, horizon - 75);
    ctx.lineTo(w * 0.50, horizon - 35);
    ctx.lineTo(w * 0.65, horizon - 68);
    ctx.lineTo(w * 0.78, horizon - 38);
    ctx.lineTo(w * 0.90, horizon - 72);
    ctx.lineTo(w, horizon - 45);
    ctx.lineTo(w, horizon);
    ctx.closePath();
    ctx.fill();

    // Layer 3: Near Highway Foothills & Escarpments (Close Distance)
    const nearMtnColor = isRain ? '#0b111a' : (isDay ? '#16a34a' : (isSunset ? '#6b1128' : (isDawn ? '#4a113e' : '#080f17')));
    ctx.fillStyle = nearMtnColor;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(w * 0.14, horizon - 36);
    ctx.lineTo(w * 0.28, horizon - 18);
    ctx.lineTo(w * 0.44, horizon - 32);
    ctx.lineTo(w * 0.60, horizon - 16);
    ctx.lineTo(w * 0.75, horizon - 38);
    ctx.lineTo(w * 0.88, horizon - 20);
    ctx.lineTo(w, horizon - 26);
    ctx.lineTo(w, horizon);
    ctx.closePath();
    ctx.fill();

    // 3B. DISTANT HORIZON DHABA & VALLEY LIGHTS (Alive at Night, Sunset & Rain - Kept off the road corridor)
    if (isNight || isSunset || isRain) {
      this.horizonLights.forEach(hl => {
        const lx = hl.xRatio * w;
        const ly = horizon + hl.yOffset;
        const twinkle = 0.45 + Math.sin(Date.now() * hl.twinkleSpeed + hl.phase) * 0.35;
        ctx.fillStyle = hl.color.replace(/[\d\.]+\)$/, `${twinkle})`);
        ctx.beginPath();
        ctx.arc(lx, ly, hl.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Distant Radio/Cell Tower with Blinking Red Aviation Beacon
      const towerX = w * 0.84;
      const towerBaseY = horizon - 14;
      const towerPeakY = horizon - 58;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(towerX - 4, towerBaseY);
      ctx.lineTo(towerX, towerPeakY);
      ctx.lineTo(towerX + 4, towerBaseY);
      ctx.stroke();

      const beaconBlink = Math.sin(Date.now() * 0.005) > 0.2 ? 0.95 : 0.12;
      ctx.fillStyle = `rgba(239, 68, 68, ${beaconBlink})`;
      ctx.beginPath();
      ctx.arc(towerX, towerPeakY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. HORIZON GLOW
    const horizonGlow = ctx.createRadialGradient(w * 0.5, horizon, 5, w * 0.5, horizon, w * 0.65);
    if (isDay) {
      horizonGlow.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      horizonGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    } else if (isSunset) {
      horizonGlow.addColorStop(0, 'rgba(255, 120, 40, 0.45)');
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      horizonGlow.addColorStop(0, 'rgba(255, 170, 70, 0.22)');
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    ctx.fillStyle = horizonGlow;
    ctx.fillRect(0, horizon - 50, w, 100);

    // 5. LUSH ROADSIDE EMBANKMENT GRASS SHOULDERS & TERRAIN
    const roadTopWidth = w * 0.08;
    const roadBottomWidth = w * 0.95;
    const roadCenterX = w * 0.5;

    const grassColorLeft = ctx.createLinearGradient(0, horizon, roadCenterX - roadBottomWidth / 2, h);
    const grassColorRight = ctx.createLinearGradient(roadCenterX + roadBottomWidth / 2, horizon, w, h);

    if (isDay) {
      grassColorLeft.addColorStop(0, '#15803d');
      grassColorLeft.addColorStop(0.4, '#166534');
      grassColorLeft.addColorStop(1, '#14532d');
      grassColorRight.addColorStop(0, '#15803d');
      grassColorRight.addColorStop(0.4, '#166534');
      grassColorRight.addColorStop(1, '#14532d');
    } else if (isSunset) {
      grassColorLeft.addColorStop(0, '#1b4332');
      grassColorLeft.addColorStop(0.5, '#193325');
      grassColorLeft.addColorStop(1, '#0e1c14');
      grassColorRight.addColorStop(0, '#1b4332');
      grassColorRight.addColorStop(0.5, '#193325');
      grassColorRight.addColorStop(1, '#0e1c14');
    } else { // Night & Rain
      grassColorLeft.addColorStop(0, '#061c12');
      grassColorLeft.addColorStop(0.6, '#04120b');
      grassColorLeft.addColorStop(1, '#020906');
      grassColorRight.addColorStop(0, '#061c12');
      grassColorRight.addColorStop(0.6, '#04120b');
      grassColorRight.addColorStop(1, '#020906');
    }

    // Left Shoulder Grass
    ctx.fillStyle = grassColorLeft;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(roadCenterX - roadTopWidth / 2, horizon);
    ctx.lineTo(roadCenterX - roadBottomWidth / 2, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Right Shoulder Grass
    ctx.fillStyle = grassColorRight;
    ctx.beginPath();
    ctx.moveTo(roadCenterX + roadTopWidth / 2, horizon);
    ctx.lineTo(w, horizon);
    ctx.lineTo(w, h);
    ctx.lineTo(roadCenterX + roadBottomWidth / 2, h);
    ctx.closePath();
    ctx.fill();

    // Natural grass tufts along the roadside verges (Smooth synchronized gliding)
    if (this.isPlaying) {
      this.travelPhase = (this.travelPhase + 0.0036 * dtScale) % 1;
    }

    const tuftColor = isDay ? 'rgba(34, 197, 94, 0.45)' : (isSunset ? 'rgba(74, 222, 128, 0.25)' : 'rgba(22, 101, 52, 0.35)');
    ctx.fillStyle = tuftColor;
    for (let g = 0; g < 10; g++) {
      const gz = ((g / 10) + this.travelPhase) % 1;
      if (gz > 0.06) {
        const gy = horizon + (h - horizon) * Math.pow(gz, 2.2);
        const rW = roadTopWidth + (roadBottomWidth - roadTopWidth) * Math.pow(gz, 2.2);
        const tuftW = 4 + gz * 24;

        const lx = roadCenterX - (rW * 0.52);
        ctx.beginPath();
        ctx.arc(lx - tuftW/2, gy, tuftW/2, Math.PI, 0);
        ctx.fill();

        const rx = roadCenterX + (rW * 0.52);
        ctx.beginPath();
        ctx.arc(rx + tuftW/2, gy, tuftW/2, Math.PI, 0);
        ctx.fill();
      }
    }

    // 6. ASPHALT ROAD WITH 3D PERSPECTIVE (WET REFLECTIVE IN RAIN)
    ctx.fillStyle = isRain ? '#0b0e14' : (isDay ? '#22252a' : '#14171c');
    ctx.beginPath();
    ctx.moveTo(roadCenterX - roadTopWidth / 2, horizon);
    ctx.lineTo(roadCenterX + roadTopWidth / 2, horizon);
    ctx.lineTo(roadCenterX + roadBottomWidth / 2, h);
    ctx.lineTo(roadCenterX - roadBottomWidth / 2, h);
    ctx.closePath();
    ctx.fill();

    // Road side markings (White border lines)
    ctx.strokeStyle = isRain ? 'rgba(200, 225, 255, 0.45)' : (isDay ? 'rgba(255, 255, 255, 0.75)' : 'rgba(240, 240, 240, 0.55)');
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(roadCenterX - roadTopWidth / 2, horizon);
    ctx.lineTo(roadCenterX - roadBottomWidth / 2, h);
    ctx.moveTo(roadCenterX + roadTopWidth / 2, horizon);
    ctx.lineTo(roadCenterX + roadBottomWidth / 2, h);
    ctx.stroke();

    // Wet Road Specular Sheen (Reflecting Headlights & Storm Ambiance)
    if (isRain) {
      const wetSheen = ctx.createLinearGradient(0, horizon, 0, h);
      wetSheen.addColorStop(0, 'rgba(15, 23, 42, 0)');
      wetSheen.addColorStop(0.5, 'rgba(56, 189, 248, 0.05)');
      wetSheen.addColorStop(1, 'rgba(255, 255, 255, 0.10)');
      ctx.fillStyle = wetSheen;
      ctx.beginPath();
      ctx.moveTo(roadCenterX - roadTopWidth / 2, horizon);
      ctx.lineTo(roadCenterX + roadTopWidth / 2, horizon);
      ctx.lineTo(roadCenterX + roadBottomWidth / 2, h);
      ctx.lineTo(roadCenterX - roadBottomWidth / 2, h);
      ctx.closePath();
      ctx.fill();
    }

    // 7. CENTER DASHED WHITE HIGHWAY DIVIDER STRIPES (BUTTER-SMOOTH SUB-PIXEL CONTINUITY)
    const numDashes = 14;
    for (let i = 0; i < numDashes; i++) {
      const baseZ = (i / numDashes + this.travelPhase) % 1;
      if (baseZ < 0.05) continue;
      const z = Math.pow(baseZ, 2.2);
      const dashLen = 0.038 * (1 - baseZ * 0.15);
      const nextZ = Math.min(1, Math.pow(Math.min(1, baseZ + dashLen), 2.2));

      const y1 = horizon + (h - horizon) * z;
      const y2 = horizon + (h - horizon) * nextZ;

      const halfW1 = (roadTopWidth + (roadBottomWidth - roadTopWidth) * z) * 0.018;
      const halfW2 = (roadTopWidth + (roadBottomWidth - roadTopWidth) * nextZ) * 0.018;

      // Clean white retroreflective highway lane divider
      const dashAlpha = (isNight || isSunset) ? (0.45 + z * 0.55) : (0.32 + z * 0.68);
      ctx.fillStyle = `rgba(255, 255, 255, ${dashAlpha})`;
      ctx.beginPath();
      ctx.moveTo(roadCenterX - halfW1, y1);
      ctx.lineTo(roadCenterX + halfW1, y1);
      ctx.lineTo(roadCenterX + halfW2, y2);
      ctx.lineTo(roadCenterX - halfW2, y2);
      ctx.closePath();
      ctx.fill();
    }

    // 8. POWERFUL HIGH-INTENSITY HEADLIGHT GLOW COVERING THE ROAD (PROMINENT ILLUMINATION)
    if (isNight || isSunset || isDawn || this.isRainActive) {
      ctx.save();
      // Clip headlight illumination to the asphalt road polygon
      ctx.beginPath();
      ctx.moveTo(roadCenterX - roadTopWidth / 2, horizon);
      ctx.lineTo(roadCenterX + roadTopWidth / 2, horizon);
      ctx.lineTo(roadCenterX + roadBottomWidth / 2, h);
      ctx.lineTo(roadCenterX - roadBottomWidth / 2, h);
      ctx.closePath();
      ctx.clip();

      const beamAlpha = isNight ? 0.86 : (isSunset ? 0.68 : (this.isRainActive ? 0.78 : 0.52));
      const beamFocusY = horizon + (h - horizon) * 0.12; // Far-reaching deep illumination down the highway!

      // Primary Forward Projector Light Field (Broad High-Intensity Road Surface Illumination)
      const forwardBeam = ctx.createRadialGradient(
        roadCenterX, h * 0.99, 30,
        roadCenterX, beamFocusY, roadBottomWidth * 0.88
      );
      forwardBeam.addColorStop(0, `rgba(255, 252, 235, ${beamAlpha * 1.55})`);
      forwardBeam.addColorStop(0.22, `rgba(254, 240, 138, ${beamAlpha * 1.15})`);
      forwardBeam.addColorStop(0.55, `rgba(250, 204, 21, ${beamAlpha * 0.65})`);
      forwardBeam.addColorStop(0.85, `rgba(234, 179, 8, ${beamAlpha * 0.28})`);
      forwardBeam.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = forwardBeam;
      ctx.fillRect(0, horizon, w, h - horizon);

      // Dual High-Beam Halogen Cones from Commercial Bus Headlights (Left & Right Lanes)
      const leftLightX = roadCenterX - roadBottomWidth * 0.28;
      const rightLightX = roadCenterX + roadBottomWidth * 0.28;

      [leftLightX, rightLightX].forEach((lx, idx) => {
        const aimOffset = (idx === 0 ? -1 : 1) * (roadTopWidth * 0.5);
        const coneGrad = ctx.createRadialGradient(lx, h, 15, roadCenterX + aimOffset, beamFocusY, w * 0.52);
        coneGrad.addColorStop(0, `rgba(255, 255, 245, ${beamAlpha * 1.45})`);
        coneGrad.addColorStop(0.30, `rgba(254, 240, 138, ${beamAlpha * 0.85})`);
        coneGrad.addColorStop(0.68, `rgba(251, 191, 36, ${beamAlpha * 0.35})`);
        coneGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = coneGrad;
        ctx.beginPath();
        ctx.moveTo(lx - 25, h);
        ctx.lineTo(roadCenterX + aimOffset - roadTopWidth * 0.7, beamFocusY);
        ctx.lineTo(roadCenterX + aimOffset + roadTopWidth * 0.7, beamFocusY);
        ctx.lineTo(lx + 25, h);
        ctx.closePath();
        ctx.fill();
      });

      // Foreground Asphalt Specular Texture Sheen
      const asphaltSheen = ctx.createLinearGradient(0, h * 0.65, 0, h);
      asphaltSheen.addColorStop(0, 'rgba(254, 240, 138, 0)');
      asphaltSheen.addColorStop(0.6, `rgba(255, 250, 200, ${beamAlpha * 0.22})`);
      asphaltSheen.addColorStop(1, `rgba(255, 255, 240, ${beamAlpha * 0.42})`);
      ctx.fillStyle = asphaltSheen;
      ctx.fillRect(0, h * 0.65, w, h * 0.35);

      ctx.restore();
    }

    // 9. ONCOMING TRAFFIC HEADLIGHTS (SMOOTH TIME-SCALED TRAVEL)
    this.oncomingCars.forEach(car => {
      if (this.isPlaying) {
        car.z += car.speed * dtScale;
        if (car.z > 1.1) car.z = 0.05;
      }
      const cz = Math.pow(car.z, 2.4);
      if (cz > 0.01 && cz <= 1.05) {
        const carY = horizon + (h - horizon) * cz;
        const roadWAtZ = roadTopWidth + (roadBottomWidth - roadTopWidth) * cz;
        const carX = roadCenterX + roadWAtZ * 0.22;

        const beamRadius = 3 + cz * 45;
        const alpha = Math.min(1, cz * 1.4);
        const lightGap = 2 + cz * 24;

        [-lightGap/2, lightGap/2].forEach(ox => {
          const glow = ctx.createRadialGradient(carX + ox, carY, 1, carX + ox, carY, beamRadius);
          glow.addColorStop(0, `rgba(255, 255, 220, ${alpha})`);
          glow.addColorStop(0.3, `rgba(255, 220, 140, ${alpha * 0.6})`);
          glow.addColorStop(1, 'rgba(255, 150, 50, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(carX + ox, carY, beamRadius, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    });

    // 10. ROADSIDE MILESTONES WITH DYNAMIC INTERSTATE CITIES (PERFECT ALIGNMENT)
    this.milestones.forEach(m => {
      if (this.isPlaying) {
        m.z += 0.0036 * dtScale;
        if (m.z > 1.15) {
          m.z = 0.05;
          m.label = `NH-48 • ${loc.nextCity.toUpperCase()} ${loc.nextDist} KM`;
        }
      }
      const mz = Math.pow(m.z, 2.4);
      if (mz > 0.04 && mz < 1.0) {
        const my = horizon + (h - horizon) * mz;
        const roadWAtZ = roadTopWidth + (roadBottomWidth - roadTopWidth) * mz;
        const mx = roadCenterX + (roadWAtZ * 0.58) * m.side;

        const stoneW = 14 + mz * 50;
        const stoneH = stoneW * 1.5;
        const domeR = stoneW / 2;
        const yellowH = stoneH * 0.38;

        ctx.save();
        // 3D Stone Drop Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.beginPath();
        ctx.ellipse(mx + stoneW * 0.08, my + 2, stoneW * 0.55, 4 + mz * 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // White Plaster Base Body (Lower Section)
        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(mx, my - stoneH + domeR, domeR, Math.PI, 0);
        ctx.lineTo(mx + domeR, my);
        ctx.lineTo(mx - domeR, my);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Canary Yellow Top Dome (National Highway Standard)
        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my - stoneH + domeR, domeR, Math.PI, 0);
        ctx.lineTo(mx + domeR, my - stoneH + yellowH);
        ctx.lineTo(mx - domeR, my - stoneH + yellowH);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.restore();

        // Crisp Dividing Line between Yellow & White
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mx - domeR, my - stoneH + yellowH);
        ctx.lineTo(mx + domeR, my - stoneH + yellowH);
        ctx.stroke();

        // Text on milestone if close enough
        if (mz > 0.28) {
          ctx.fillStyle = '#0f172a';
          ctx.textAlign = 'center';

          // Yellow Dome: Bold "NH 48"
          ctx.font = `bold ${Math.max(7, Math.floor(stoneW * 0.22))}px sans-serif`;
          ctx.fillText("NH 48", mx, my - stoneH + yellowH * 0.62);

          // White Base: Full Destination City Name & Distance
          const whiteH = stoneH - yellowH;
          const cityName = (loc.city || "DELHI").toUpperCase();
          const cityFontSize = Math.max(6, Math.floor(stoneW * (cityName.length > 8 ? 0.14 : 0.17)));
          ctx.font = `bold ${cityFontSize}px sans-serif`;
          ctx.fillText(cityName, mx, my - stoneH + yellowH + whiteH * 0.40);

          ctx.font = `600 ${Math.max(5, Math.floor(stoneW * 0.13))}px sans-serif`;
          ctx.fillStyle = '#334155';
          ctx.fillText(`${loc.nextDist || 45} KM`, mx, my - stoneH + yellowH + whiteH * 0.76);
        }
        ctx.restore();
      }
    });

    // 10B. ROADSIDE TELEGRAPH / UTILITY POLES & SAGGING WIRES (HIGHWAY SCENERY)
    const poleCoords = [];
    this.telegraphPoles.forEach(p => {
      if (this.isPlaying) {
        p.z += 0.0036 * dtScale;
        if (p.z > 1.15) p.z = 0.04;
      }
      const pz = Math.pow(p.z, 2.2);
      if (pz > 0.02 && pz < 1.05) {
        const py = horizon + (h - horizon) * pz;
        const roadWAtZ = roadTopWidth + (roadBottomWidth - roadTopWidth) * pz;
        const px = roadCenterX + (roadWAtZ * 0.5) * p.side;

        const poleH = 22 + pz * 115;
        const crossW = 8 + pz * 32;

        poleCoords.push({ x: px, y: py - poleH, pz });

        ctx.save();
        // Wooden/Concrete Pole Mast
        ctx.fillStyle = isDay ? '#57534e' : '#1c1917';
        ctx.fillRect(px - 1.5 - pz * 1.5, py - poleH, 3 + pz * 3, poleH);

        // Horizontal Crossarm
        ctx.fillStyle = isDay ? '#44403c' : '#0c0a09';
        ctx.fillRect(px - crossW / 2, py - poleH + poleH * 0.08, crossW, 2 + pz * 2.5);

        // Ceramic Insulators
        ctx.fillStyle = '#38bdf8';
        [-crossW * 0.42, crossW * 0.42].forEach(ox => {
          ctx.beginPath();
          ctx.arc(px + ox, py - poleH + poleH * 0.08 - 2, 1.2 + pz * 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }
    });

    // Sagging Wires connecting adjacent utility poles
    if (poleCoords.length >= 2) {
      poleCoords.sort((a, b) => a.pz - b.pz);
      ctx.save();
      ctx.strokeStyle = isDay ? 'rgba(68, 64, 60, 0.45)' : 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 1;
      for (let i = 0; i < poleCoords.length - 1; i++) {
        const p1 = poleCoords[i];
        const p2 = poleCoords[i + 1];
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2 + (p2.pz * 14); // Catenary sag
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 10C. ELECTRIC HIGHWAY STREET LIGHT POLES (CURVED STEEL WITH DOWNWARD LAMPS)
    this.streetLights.forEach(sl => {
      if (this.isPlaying) {
        sl.z += 0.0036 * dtScale;
        if (sl.z > 1.15) sl.z = 0.04;
      }
      const sz = Math.pow(sl.z, 2.2);
      if (sz > 0.03 && sz < 1.05) {
        const sy = horizon + (h - horizon) * sz;
        const roadWAtZ = roadTopWidth + (roadBottomWidth - roadTopWidth) * sz;
        const sx = roadCenterX + (roadWAtZ * 0.5) * sl.side;

        const poleH = 26 + sz * 130;
        const armReach = 10 + sz * 45;

        ctx.save();
        // Galvanized Steel Tubular Post
        ctx.strokeStyle = isDay ? '#64748b' : '#334155';
        ctx.lineWidth = Math.max(1.5, sz * 3.5);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx, sy - poleH * 0.75);
        // Curved Davit Arm arching out over the road verge
        ctx.quadraticCurveTo(sx, sy - poleH, sx - armReach, sy - poleH * 0.95);
        ctx.stroke();

        // Luminaire Lamp Fixture Head
        const lampHeadX = sx - armReach;
        const lampHeadY = sy - poleH * 0.95;
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(lampHeadX - 4, lampHeadY - 2, 8 + sz * 8, 4 + sz * 3, 2);
        ctx.fill();

        // Glowing Lamp & Light Pool in Sunset, Night & Rain
        if (isNight || isSunset || isDawn || this.isRainActive) {
          const lampGlow = ctx.createRadialGradient(lampHeadX, lampHeadY, 1, lampHeadX, lampHeadY, 12 + sz * 40);
          lampGlow.addColorStop(0, 'rgba(255, 255, 240, 0.95)');
          lampGlow.addColorStop(0.3, 'rgba(254, 240, 138, 0.55)');
          lampGlow.addColorStop(1, 'rgba(254, 240, 138, 0)');
          ctx.fillStyle = lampGlow;
          ctx.beginPath();
          ctx.arc(lampHeadX, lampHeadY, 12 + sz * 40, 0, Math.PI * 2);
          ctx.fill();

          // Downward Light Pool on Highway Verge
          const poolAlpha = isNight ? 0.35 : (isSunset ? 0.22 : 0.25);
          const poolGrad = ctx.createRadialGradient(lampHeadX, sy, 2, lampHeadX, sy, 18 + sz * 70);
          poolGrad.addColorStop(0, `rgba(254, 240, 138, ${poolAlpha * sz})`);
          poolGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
          ctx.fillStyle = poolGrad;
          ctx.beginPath();
          ctx.ellipse(lampHeadX, sy, 18 + sz * 70, 6 + sz * 24, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    });

    // 10D. LUSH ROADSIDE HIGHWAY TREES (NEEM, BABUL, PEEPAL, EUCALYPTUS)
    this.roadsideTrees.forEach(t => {
      if (this.isPlaying) {
        t.z += 0.0036 * dtScale;
        if (t.z > 1.15) t.z = 0.05;
      }
      const tz = Math.pow(t.z, 2.2);
      if (tz > 0.03 && tz < 1.05) {
        const ty = horizon + (h - horizon) * tz;
        const roadWAtZ = roadTopWidth + (roadBottomWidth - roadTopWidth) * tz;
        const tx = roadCenterX + (roadWAtZ * 0.5) * t.side;

        const treeH = (26 + tz * 115) * t.scale;
        const canopyR = (18 + tz * 74) * t.scale;

        ctx.save();
        // Trunk
        ctx.fillStyle = isDay ? '#3e2723' : '#140c06';
        ctx.beginPath();
        ctx.moveTo(tx - 2.5 * tz, ty);
        ctx.lineTo(tx + 2.5 * tz, ty);
        ctx.lineTo(tx + 1.2 * tz, ty - treeH * 0.65);
        ctx.lineTo(tx - 1.2 * tz, ty - treeH * 0.65);
        ctx.closePath();
        ctx.fill();

        // Lush Umbrella Canopy
        const foliageColor = isRain ? 'rgba(15, 23, 20, 0.94)' : (isDay ? 'rgba(22, 163, 74, 0.92)' : (isSunset ? 'rgba(88, 14, 38, 0.94)' : 'rgba(5, 18, 12, 0.90)'));
        ctx.fillStyle = foliageColor;
        ctx.beginPath();
        ctx.arc(tx, ty - treeH, canopyR * 0.60, 0, Math.PI * 2);
        ctx.arc(tx - canopyR * 0.38, ty - treeH * 0.92, canopyR * 0.45, 0, Math.PI * 2);
        ctx.arc(tx + canopyR * 0.38, ty - treeH * 0.92, canopyR * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    // 11. WINDSHIELD RAIN & WIPERS
    if (this.isRainActive) {
      ctx.strokeStyle = 'rgba(180, 215, 255, 0.40)';
      ctx.lineWidth = 1.4;
      this.rainDrops.forEach(drop => {
        drop.y += drop.speed;
        drop.x -= 1.8;
        if (drop.y > h) {
          drop.y = -20;
          drop.x = Math.random() * (w + 100);
        }
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 2.5, drop.y + drop.length);
        ctx.stroke();
      });

      if (this.windshieldDrops.length < 180 && Math.random() < 0.48) {
        this.windshieldDrops.push({
          x: Math.random() * w,
          y: Math.random() * (h * 0.88),
          r: Math.random() * 3.5 + 2.0,
          alpha: Math.random() * 0.4 + 0.45,
          vy: Math.random() * 0.2 + 0.04
        });
      }
    } else {
      if (this.windshieldDrops.length > 0) {
        this.windshieldDrops.forEach(d => d.alpha -= 0.04);
        this.windshieldDrops = this.windshieldDrops.filter(d => d.alpha > 0);
      }
    }

    // Wiper Kinematics & Sweep Physics
    const pivotY = h * 0.96;
    const armLength = Math.min(w * 0.32, h * 0.50);
    const pivots = [w * 0.30, w * 0.64];
    const minWiperAngle = 0.10;
    const maxWiperAngle = 2.05;

    if (this.isRainActive && this.isWiperActive) {
      this.wiperAngle += 0.024 * this.wiperDirection;

      if (this.wiperAngle >= maxWiperAngle) {
        this.wiperAngle = maxWiperAngle;
        this.wiperDirection = -1;
        if (window.audioEngine) window.audioEngine.playWiperSweep();
      } else if (this.wiperAngle <= minWiperAngle) {
        this.wiperAngle = minWiperAngle;
        this.wiperDirection = 1;
        if (window.audioEngine) window.audioEngine.playWiperSweep();
      }

      // Real-time water clearing
      const currentRad = this.wiperAngle;
      this.windshieldDrops.forEach(drop => {
        pivots.forEach(pivotX => {
          const dx = drop.x - pivotX;
          const dy = pivotY - drop.y;
          if (dy > 0) {
            const dist = Math.hypot(dx, dy);
            if (dist >= armLength * 0.24 && dist <= armLength * 1.05) {
              const dropAngle = Math.atan2(dy, dx);
              if (Math.abs(dropAngle - currentRad) < 0.12) {
                drop.wiped = true;
              }
            }
          }
        });
      });
      this.windshieldDrops = this.windshieldDrops.filter(d => !d.wiped);
    } else {
      this.wiperAngle = minWiperAngle;
      this.wiperDirection = 1;
    }

    // Render glass beads
    if (this.windshieldDrops.length > 0) {
      this.windshieldDrops.forEach(drop => {
        drop.y += drop.vy;
        if (drop.y > h * 0.92) drop.alpha -= 0.05;

        ctx.save();
        ctx.fillStyle = `rgba(0, 0, 0, ${drop.alpha * 0.32})`;
        ctx.beginPath();
        ctx.arc(drop.x + 0.8, drop.y + 1, drop.r, 0, Math.PI * 2);
        ctx.fill();

        const beadGrad = ctx.createRadialGradient(
          drop.x - drop.r * 0.3, drop.y - drop.r * 0.3, 0.4,
          drop.x, drop.y, drop.r
        );
        beadGrad.addColorStop(0, `rgba(240, 248, 255, ${drop.alpha * 0.85})`);
        beadGrad.addColorStop(0.65, `rgba(180, 215, 245, ${drop.alpha * 0.38})`);
        beadGrad.addColorStop(1, `rgba(130, 175, 220, ${drop.alpha * 0.55})`);
        ctx.fillStyle = beadGrad;
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    // Render Dual Commercial Wipers
    const rad = this.wiperAngle;
    pivots.forEach(pivotX => {
      const tipX = pivotX + Math.cos(rad) * armLength;
      const tipY = pivotY - Math.sin(rad) * armLength;
      const innerBladeX = pivotX + Math.cos(rad) * (armLength * 0.28);
      const innerBladeY = pivotY - Math.sin(rad) * (armLength * 0.28);

      ctx.save();
      // Base Hub
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Twin-rod wiper arm
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      // Rubber Squeegee Blade
      ctx.strokeStyle = '#09090b';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(innerBladeX, innerBladeY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      if (this.isRainActive) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(innerBladeX, innerBladeY);
        ctx.lineTo(tipX, tipY);
        ctx.stroke();
      }
      ctx.restore();
    });

    // 13. SUBTLE FRONT WINDSHIELD GLASS REFLECTION & CLEAN ZONE
    this.renderWindshieldGlass(w, h);

    // 14. HANGING NIMBU-MIRCHI AMULET
    this.renderNimbuMirchi(w * 0.22, h * 0.12);
  }

  renderWindshieldGlass(w, h) {
    const ctx = this.ctx;
    ctx.save();

    // 1. Subtle diagonal glass glare sheen reflection across top-left to bottom-right
    const glassGlare = ctx.createLinearGradient(0, 0, w * 0.85, h * 0.70);
    glassGlare.addColorStop(0, 'rgba(255, 255, 255, 0.045)');
    glassGlare.addColorStop(0.25, 'rgba(255, 255, 255, 0.012)');
    glassGlare.addColorStop(0.40, 'rgba(255, 255, 255, 0)');
    glassGlare.addColorStop(0.70, 'rgba(255, 255, 255, 0.020)');
    glassGlare.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glassGlare;
    ctx.fillRect(0, 0, w, h);

    // 2. Faint curved wiper sweep arc sheen (clean glass zone vs slightly dusty upper corners)
    const pivotY = h * 0.96;
    const armLength = Math.min(w * 0.32, h * 0.50);
    const pivots = [w * 0.30, w * 0.64];

    pivots.forEach(px => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(px, pivotY, armLength * 1.02, Math.PI * 0.92, Math.PI * 1.95, false);
      ctx.stroke();
    });

    // 3. Occasional subtle interior cabin / dashboard reflection
    const cabinPulse = 0.025 + Math.sin(Date.now() * 0.001) * 0.010;
    const dashReflect = ctx.createLinearGradient(0, h * 0.75, 0, h);
    dashReflect.addColorStop(0, 'rgba(0, 0, 0, 0)');
    dashReflect.addColorStop(1, `rgba(255, 235, 180, ${cabinPulse})`);
    ctx.fillStyle = dashReflect;
    ctx.fillRect(0, h * 0.75, w, h * 0.25);

    ctx.restore();
  }

  renderNimbuMirchi(rootX, rootY) {
    const ctx = this.ctx;
    this.amuletSway += (this.amuletTargetSway - this.amuletSway) * 0.06;
    const swayAngle = (this.amuletSway * Math.PI) / 180;

    ctx.save();
    ctx.translate(rootX, rootY);
    ctx.rotate(swayAngle);

    ctx.strokeStyle = '#111';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 50);
    ctx.stroke();

    // Lemon
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(0, 58, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.stroke();

    // 7 Green Chillies
    const chillies = [-8, -5, -2, 0, 2, 5, 8];
    chillies.forEach((cx, idx) => {
      ctx.fillStyle = idx % 2 === 0 ? '#16a34a' : '#15803d';
      ctx.beginPath();
      ctx.moveTo(cx, 70);
      ctx.quadraticCurveTo(cx + 3, 90, cx - 1, 105);
      ctx.quadraticCurveTo(cx - 3, 90, cx, 70);
      ctx.fill();
    });

    // Coal piece
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(0, 114, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /* ============================================================
   * DELUXE SALOON MODE GRAPHICS ENGINE
   * Complete Authentic Indian Village Barber Shop:
   * 1. Rustic wooden shack with corrugated tin roof & signboard
   * 2. Barber in white shirt shaving customer's beard ("Making Beard")
   * 3. Village patrons sitting on the wooden bench outside
   * 4. Framed mirror, 1994 calendar, shelf with shaving mug & radio
   * ============================================================ */

  renderSaloonMode(dtScale = 1.0) {
    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;

    // Time cycle for shaving animation & fan
    if (this.isPlaying) {
      this.shavingStroke += 0.055 * dtScale;
    }
    if (this.isFanActive) {
      this.fanSpeed = Math.min(0.032, this.fanSpeed + 0.0005 * dtScale);
    } else {
      this.fanSpeed = Math.max(0.003, this.fanSpeed * Math.pow(0.992, dtScale));
    }
    this.fanRotation += this.fanSpeed * dtScale;
    this.lampPulse += 0.03 * dtScale;

    // 1. AUTHENTIC INDIAN VILLAGE BARBER SHOP BACKGROUND (Continuous unified room structure)
    const villageWallGrad = ctx.createLinearGradient(0, 0, 0, h);
    villageWallGrad.addColorStop(0, '#10221f'); // Lime-wash plaster ceiling shadow
    villageWallGrad.addColorStop(0.35, '#16332d'); // Weathered seafoam/pista lime wall
    villageWallGrad.addColorStop(0.70, '#1d3e38'); // Warm village barber shop plaster
    villageWallGrad.addColorStop(1, '#132622');
    ctx.fillStyle = villageWallGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. SHOP GEOMETRY - FRAMED COMFORTABLY SO SHOP IS VISIBLE AND BEAUTIFULLY CENTERED
    const groundY = Math.max(h * 0.58, Math.min(h * 0.65, h - 225));
    const shopH = Math.min(300, groundY - 40);
    const roofY = groundY - shopH;

    // Seamless vertical retro gamthi wallpaper stripes across the FULL width of the room
    const stripeSpacing = 52;
    for (let lx = 0; lx < w; lx += stripeSpacing) {
      ctx.fillStyle = (Math.floor(lx / stripeSpacing) % 2 === 0) ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.022)';
      ctx.fillRect(lx, 0, stripeSpacing * 0.5, groundY);
    }

    // Rustic wooden dado rail / chair-rail dividing upper lime wall and lower timber wainscot across FULL WIDTH
    const dadoY = groundY - 100;
    ctx.fillStyle = '#3a1e10';
    ctx.fillRect(0, dadoY, w, 8);
    ctx.fillStyle = '#5c2d15';
    ctx.fillRect(0, dadoY + 1, w, 2);

    // Lower rustic teak wood wall paneling across FULL WIDTH
    const lowerWoodGrad = ctx.createLinearGradient(0, dadoY, 0, groundY);
    lowerWoodGrad.addColorStop(0, '#2b160b');
    lowerWoodGrad.addColorStop(1, '#180d06');
    ctx.fillStyle = lowerWoodGrad;
    ctx.fillRect(0, dadoY + 8, w, groundY - dadoY - 8);

    // Vertical teak wainscot beadboard grooves across FULL WIDTH
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.lineWidth = 1;
    for (let bx = 0; bx < w; bx += 24) {
      ctx.beginPath();
      ctx.moveTo(bx, dadoY + 8);
      ctx.lineTo(bx, groundY);
      ctx.stroke();
    }

    // Center the shop styling station horizontally with safe margin for barber pole
    const shopW = Math.min(Math.max(320, w - 80), 920);
    const shopLeft = Math.max(36, (w - shopW) / 2);
    const shopRight = shopLeft + shopW;

    // Warm tungsten ambient lamp glow from ceiling over the styling station
    const lampX = shopLeft + shopW * 0.44;
    const lampY = roofY + 65;
    const lampGlow = ctx.createRadialGradient(lampX, lampY, 10, lampX, lampY, 400);
    const flicker = 0.90 + Math.sin(this.lampPulse) * 0.08;
    lampGlow.addColorStop(0, `rgba(254, 240, 138, ${0.40 * flicker})`);
    lampGlow.addColorStop(0.4, `rgba(245, 158, 11, ${0.16 * flicker})`);
    lampGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = lampGlow;
    ctx.fillRect(0, 0, w, groundY);

    // Atmospheric floating dust motes drifting through warm tungsten light cone
    ctx.save();
    this.saloonDustMotes.forEach(m => {
      m.y += m.vy;
      m.x += m.vx + Math.sin(Date.now() * 0.002 + m.phase) * 0.18;
      if (m.y < roofY + 8) {
        m.y = groundY - 15;
        m.x = shopLeft + Math.random() * shopW;
      }
      if (m.x < shopLeft || m.x > shopRight) {
        m.x = shopLeft + Math.random() * shopW;
      }
      const dFromLamp = Math.hypot(m.x - lampX, m.y - lampY);
      const lightFactor = Math.max(0, 1 - dFromLamp / 340);
      const moteAlpha = m.alpha * (0.25 + lightFactor * 0.75);

      ctx.fillStyle = `rgba(254, 240, 138, ${moteAlpha})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r * (0.8 + lightFactor * 0.5), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // Vintage Indian Round Wall Clock with Ticking Hands (Upper Timber Wall)
    const clockX = shopLeft + shopW * 0.78;
    const clockY = roofY + 68;
    const clockR = 22;

    ctx.save();
    // Clock outer wood/brass bezel
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(clockX, clockY, clockR, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Vintage ivory dial face
    ctx.fillStyle = '#fefce8';
    ctx.beginPath();
    ctx.arc(clockX, clockY, clockR - 3.5, 0, Math.PI * 2);
    ctx.fill();

    // 12 hour tick marks
    ctx.strokeStyle = '#1c1917';
    ctx.lineWidth = 1;
    for (let th = 0; th < 12; th++) {
      const angle = (th / 12) * Math.PI * 2;
      const x1 = clockX + Math.sin(angle) * (clockR - 6.5);
      const y1 = clockY - Math.cos(angle) * (clockR - 6.5);
      const x2 = clockX + Math.sin(angle) * (clockR - 4.5);
      const y2 = clockY - Math.cos(angle) * (clockR - 4.5);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Real-time ticking hands
    const now = new Date();
    const secVal = (Date.now() / 1000) % 60;
    const minVal = now.getMinutes() + secVal / 60;
    const hrVal = (now.getHours() % 12) + minVal / 60;

    // Hour hand
    const hrAngle = (hrVal / 12) * Math.PI * 2;
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    ctx.lineTo(clockX + Math.sin(hrAngle) * 9, clockY - Math.cos(hrAngle) * 9);
    ctx.stroke();

    // Minute hand
    const minAngle = (minVal / 60) * Math.PI * 2;
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    ctx.lineTo(clockX + Math.sin(minAngle) * 13, clockY - Math.cos(minAngle) * 13);
    ctx.stroke();

    // Ticking red second hand
    const secAngle = (secVal / 60) * Math.PI * 2;
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(clockX - Math.sin(secAngle) * 3, clockY + Math.cos(secAngle) * 3);
    ctx.lineTo(clockX + Math.sin(secAngle) * 15, clockY - Math.cos(secAngle) * 15);
    ctx.stroke();

    // Brass center pin
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(clockX, clockY, 1.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Wooden Floor Planks across the FULL WIDTH of the salon room
    ctx.fillStyle = '#1c1009';
    ctx.fillRect(0, groundY, w, h - groundY);
    ctx.strokeStyle = '#2b190f';
    ctx.lineWidth = 1.5;
    for (let fx = -40; fx < w + 80; fx += 50) {
      ctx.beginPath();
      ctx.moveTo(fx, groundY);
      ctx.lineTo(fx - 40, h);
      ctx.stroke();
    }

    // 3. COUNTER SHELF & FRAMED MIRROR (Ergonomically Aligned with Barber & Chair)
    const shelfX = shopLeft + shopW * 0.11;
    const shelfW = shopW * 0.44;
    const shelfY = groundY - 72;
    const shelfH = 14;

    // Framed Mirror resting directly on the shelf
    const mirrorX = shelfX + 12;
    const mirrorW = shelfW - 24;
    const mirrorH = 120;
    const mirrorY = shelfY - mirrorH - 4; // From groundY - 196 to groundY - 76

    // Wooden Mirror Bevelled Frame
    ctx.fillStyle = '#451a03';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(mirrorX, mirrorY, mirrorW, mirrorH, 8);
    ctx.fill();
    ctx.stroke();

    // Brass corner brackets on mirror frame
    ctx.fillStyle = '#f59e0b';
    [
      [mirrorX + 4, mirrorY + 4],
      [mirrorX + mirrorW - 12, mirrorY + 4],
      [mirrorX + 4, mirrorY + mirrorH - 12],
      [mirrorX + mirrorW - 12, mirrorY + mirrorH - 12]
    ].forEach(([cx, cy]) => {
      ctx.fillRect(cx, cy, 8, 8);
    });

    // Reflective Mirror Glass
    const glassGrad = ctx.createLinearGradient(mirrorX, mirrorY, mirrorX + mirrorW, mirrorY + mirrorH);
    glassGrad.addColorStop(0, '#152528');
    glassGrad.addColorStop(0.5, '#1e3337');
    glassGrad.addColorStop(1, '#112022');
    ctx.fillStyle = glassGrad;
    ctx.beginPath();
    ctx.roundRect(mirrorX + 6, mirrorY + 6, mirrorW - 12, mirrorH - 12, 4);
    ctx.fill();

    // Mirror Glass Diagonal Glint
    ctx.fillStyle = 'rgba(255, 255, 255, 0.09)';
    ctx.beginPath();
    ctx.moveTo(mirrorX + 35, mirrorY + 6);
    ctx.lineTo(mirrorX + 90, mirrorY + 6);
    ctx.lineTo(mirrorX + 25, mirrorY + mirrorH - 6);
    ctx.lineTo(mirrorX - 30, mirrorY + mirrorH - 6);
    ctx.closePath();
    ctx.fill();

    // Reflection of customer & barber silhouette inside mirror
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(mirrorX + 6, mirrorY + 6, mirrorW - 12, mirrorH - 12, 4);
    ctx.clip();
    // Soft reflection of ceiling lamp
    ctx.fillStyle = 'rgba(254, 240, 138, 0.15)';
    ctx.beginPath();
    ctx.arc(mirrorX + mirrorW * 0.70, mirrorY + 28, 24, 0, Math.PI * 2);
    ctx.fill();
    // Reflected customer head silhouette in mirror
    ctx.fillStyle = 'rgba(180, 83, 9, 0.28)';
    ctx.beginPath();
    ctx.arc(mirrorX + mirrorW * 0.42, mirrorY + mirrorH - 26, 16, 0, Math.PI * 2);
    ctx.fill();
    // Reflected lather in mirror
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.beginPath();
    ctx.arc(mirrorX + mirrorW * 0.44, mirrorY + mirrorH - 18, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Polished Teak Counter Shelf
    ctx.fillStyle = '#5c2b0c';
    ctx.strokeStyle = '#2d1405';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(shelfX - 8, shelfY, shelfW + 16, shelfH, 4);
    ctx.fill();
    ctx.stroke();
    // Shelf upper highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillRect(shelfX - 8, shelfY, shelfW + 16, 2);

    // Hanging leather razor strop from left shelf edge
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.roundRect(shelfX - 4, shelfY + shelfH, 9, 44, 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(shelfX - 3, shelfY + shelfH, 7, 4); // Brass buckle

    // 4. COUNTER ACCESSORIES & WATER MIST SPRAY BOTTLE
    // A. CLASSIC BARBER WATER MIST SPRAY BOTTLE (Prominent on counter shelf)
    const sprayBottleX = shelfX + 26;
    const sprayBottleY = shelfY - 32;
    this.mistOrigin = { x: sprayBottleX - 6, y: sprayBottleY + 4 };

    // Translucent blue barber water mist bottle
    ctx.fillStyle = 'rgba(14, 165, 233, 0.70)';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(sprayBottleX - 8, sprayBottleY + 8, 16, 24, 3);
    ctx.fill();
    ctx.stroke();

    // Water level inside bottle
    ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.fillRect(sprayBottleX - 7, sprayBottleY + 16, 14, 15);

    // Dip tube
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sprayBottleX, sprayBottleY + 8);
    ctx.lineTo(sprayBottleX, sprayBottleY + 31);
    ctx.stroke();

    // Black ergonomic trigger spray head
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.roundRect(sprayBottleX - 5, sprayBottleY + 2, 10, 7, 2);
    ctx.roundRect(sprayBottleX - 8, sprayBottleY - 3, 14, 6, 2);
    ctx.fill();

    // Spray nozzle pointed towards customer (left)
    ctx.fillStyle = '#3f3f46';
    ctx.beginPath();
    ctx.moveTo(sprayBottleX - 8, sprayBottleY - 2);
    ctx.lineTo(sprayBottleX - 13, sprayBottleY - 1);
    ctx.lineTo(sprayBottleX - 13, sprayBottleY + 2);
    ctx.lineTo(sprayBottleX - 8, sprayBottleY + 3);
    ctx.closePath();
    ctx.fill();

    // Ergonomic trigger lever
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sprayBottleX - 6, sprayBottleY + 3);
    ctx.quadraticCurveTo(sprayBottleX - 11, sprayBottleY + 9, sprayBottleX - 8, sprayBottleY + 16);
    ctx.stroke();

    // B. Ceramic Shaving Mug with rich foam & brush
    const mugX = shelfX + 60;
    const mugY = shelfY - 24;
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(mugX, mugY + 4, 22, 20, 3);
    ctx.fill();
    ctx.stroke();
    // Frothy shaving foam
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(mugX + 6, mugY + 4, 7, 0, Math.PI * 2);
    ctx.arc(mugX + 14, mugY + 2, 8, 0, Math.PI * 2);
    ctx.fill();
    // Shaving brush wooden handle
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.roundRect(mugX + 8, mugY - 12, 6, 14, 2);
    ctx.fill();

    // Rising warm steam wisps from hot lather shaving mug
    if (this.mugSteam.length < 14 && Math.random() < 0.28) {
      this.mugSteam.push({
        x: mugX + 11 + (Math.random() - 0.5) * 6,
        y: mugY - 6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.60 - 0.35,
        r: Math.random() * 2.2 + 1.2,
        alpha: 0.38
      });
    }
    if (this.mugSteam.length > 0) {
      ctx.save();
      this.mugSteam.forEach(s => {
        s.x += s.vx + Math.sin(Date.now() * 0.003) * 0.18;
        s.y += s.vy;
        s.r += 0.04;
        s.alpha -= 0.007;
        ctx.fillStyle = `rgba(240, 248, 255, ${Math.max(0, s.alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      this.mugSteam = this.mugSteam.filter(s => s.alpha > 0);
      ctx.restore();
    }

    // C. Barbicide Sanitizing Jar with Combs
    const jarX = shelfX + 96;
    const jarY = shelfY - 36;
    ctx.fillStyle = 'rgba(14, 165, 233, 0.65)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(jarX, jarY + 4, 20, 32, 3);
    ctx.fill();
    ctx.stroke();
    // Stainless steel jar lid & knob
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(jarX - 2, jarY, 24, 5);
    ctx.beginPath();
    ctx.arc(jarX + 10, jarY - 2, 3, 0, Math.PI * 2);
    ctx.fill();
    // Submerged red & black combs
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(jarX + 4, jarY + 8, 3, 24);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(jarX + 11, jarY + 6, 3, 26);

    // D. Vintage Transistor Radio
    const radX = shelfX + 130;
    const radY = shelfY - 28;
    ctx.fillStyle = '#3b1c0b';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(radX, radY, 44, 28, 4);
    ctx.fill();
    ctx.stroke();
    // Glowing emerald frequency dial
    ctx.fillStyle = '#10b981';
    ctx.fillRect(radX + 5, radY + 5, 34, 7);
    // Telescopic chrome antenna
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(radX + 6, radY);
    ctx.lineTo(radX - 8, radY - 26);
    ctx.stroke();

    // Vintage 1994 Calendar beside mirror
    const calX = mirrorX + mirrorW + 16;
    const calY = mirrorY + 10;
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#b91c1c';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(calX, calY, 46, 62, 3);
    ctx.fill();
    ctx.stroke();
    // Red calendar header
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(calX, calY, 46, 15);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("1994", calX + 23, calY + 11);

    // Bollywood Hero Poster
    const postX = calX;
    const postY = calY + 70;
    ctx.fillStyle = '#fed7aa';
    ctx.strokeStyle = '#c2410c';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(postX, postY, 46, 56, 3);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#9a3412';
    ctx.font = 'bold 7px sans-serif';
    ctx.fillText("HERO NO. 1", postX + 23, postY + 16);

    // 5. THE BARBER CHAIR & CUSTOMER RECLINING WITH LATHERED BEARD ("Making Beard")
    const chairCenterX = shelfX + shelfW * 0.46;
    const chairBaseY = groundY - 10;

    // Vintage Hydraulic Barber Chair (Teal vinyl & chrome)
    ctx.save();
    // Chrome circular base on floor
    ctx.fillStyle = '#94a3b8';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(chairCenterX, chairBaseY, 36, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Chrome central hydraulic shaft
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(chairCenterX - 7, chairBaseY - 38, 14, 38);

    // Teal Cushioned Reclined Seat
    ctx.fillStyle = '#0d9488';
    ctx.strokeStyle = '#042f2e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(chairCenterX - 28, chairBaseY - 58, 56, 22, 5);
    ctx.fill();
    ctx.stroke();

    // Reclined Backrest
    ctx.save();
    ctx.translate(chairCenterX - 16, chairBaseY - 58);
    ctx.rotate(-0.25);
    ctx.fillStyle = '#0f766e';
    ctx.beginPath();
    ctx.roundRect(-7, -56, 18, 58, 5);
    ctx.fill();
    ctx.stroke();

    // Headrest
    ctx.fillStyle = '#115e59';
    ctx.beginPath();
    ctx.roundRect(-4, -74, 15, 16, 4);
    ctx.fill();
    ctx.restore();

    // Customer Reclining
    const custHeadX = chairCenterX - 26;
    const custHeadY = chairBaseY - 116;

    // White barber cape draping over customer body
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(custHeadX + 4, custHeadY + 16);
    ctx.quadraticCurveTo(chairCenterX + 24, custHeadY + 30, chairCenterX + 26, chairBaseY - 40);
    ctx.lineTo(chairCenterX - 34, chairBaseY - 40);
    ctx.quadraticCurveTo(chairCenterX - 36, custHeadY + 38, custHeadX - 4, custHeadY + 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Customer head tilted back on headrest
    ctx.fillStyle = '#b45309'; // Skin tone
    ctx.beginPath();
    ctx.arc(custHeadX, custHeadY, 14, 0, Math.PI * 2);
    ctx.fill();

    // Customer black hair
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(custHeadX - 4, custHeadY - 4, 13, Math.PI * 0.7, Math.PI * 1.8);
    ctx.fill();

    // RICH WHITE SHAVING LATHER / FOAM ON JAWLINE ("Making Beard")
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(custHeadX + 2, custHeadY);
    ctx.quadraticCurveTo(custHeadX + 15, custHeadY + 5, custHeadX + 11, custHeadY + 15);
    ctx.quadraticCurveTo(custHeadX + 3, custHeadY + 17, custHeadX - 3, custHeadY + 13);
    ctx.closePath();
    ctx.fill();

    // 6. THE BARBER WITH AUTHENTIC VILLAGE CLOTHING & SHAVING ACTION
    const barberX = chairCenterX + 26;
    const barberY = groundY;

    // Barber's leather sandals on floor
    ctx.fillStyle = '#451a03';
    ctx.fillRect(barberX - 8, barberY - 6, 12, 6);
    ctx.fillRect(barberX + 6, barberY - 6, 12, 6);

    // Barber's dark charcoal formal pleated trousers
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(barberX - 7, barberY - 72, 10, 66);
    ctx.fillRect(barberX + 5, barberY - 72, 10, 66);

    // Dark leather belt & metal buckle
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(barberX - 10, barberY - 76, 28, 5);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(barberX + 1, barberY - 76, 6, 5);

    // Barber's crisp white collared shirt
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(barberX - 11, barberY - 138, 30, 62, 5);
    ctx.fill();
    ctx.stroke();

    // Shirt placket and tiny buttons
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(barberX + 4, barberY - 136);
    ctx.lineTo(barberX + 4, barberY - 76);
    ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(barberX + 4, barberY - 124, 1.2, 0, Math.PI * 2);
    ctx.arc(barberX + 4, barberY - 108, 1.2, 0, Math.PI * 2);
    ctx.arc(barberX + 4, barberY - 92, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Shirt breast pocket with red comb peeking out
    ctx.fillStyle = '#f1f5f9';
    ctx.strokeStyle = '#94a3b8';
    ctx.beginPath();
    ctx.roundRect(barberX - 8, barberY - 118, 9, 12, 2);
    ctx.fill();
    ctx.stroke();
    // Red comb teeth in pocket
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(barberX - 6, barberY - 123, 5, 6);

    // TRADITIONAL WHITE & RED CHECK COTTON TOWEL (GAMCHA) ON LEFT SHOULDER
    ctx.fillStyle = '#f1f5f9';
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(barberX + 9, barberY - 142, 11, 46, 3);
    ctx.fill();
    ctx.stroke();
    // Red checks on gamcha
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.4)';
    ctx.lineWidth = 1;
    for (let gy = barberY - 138; gy < barberY - 100; gy += 6) {
      ctx.beginPath();
      ctx.moveTo(barberX + 9, gy);
      ctx.lineTo(barberX + 20, gy);
      ctx.stroke();
    }

    // Barber head & mustache
    ctx.fillStyle = '#a16207'; // Skin tone
    ctx.beginPath();
    ctx.arc(barberX + 3, barberY - 152, 13, 0, Math.PI * 2);
    ctx.fill();

    // Dark combed hair
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(barberX + 3, barberY - 156, 12, Math.PI, Math.PI * 2);
    ctx.fill();

    // Classic Indian mustache
    ctx.fillStyle = '#09090b';
    ctx.fillRect(barberX - 3, barberY - 149, 10, 3);

    // Barber's Left Arm supporting customer's jawline
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(barberX - 6, barberY - 128);
    ctx.lineTo(custHeadX + 6, custHeadY + 12);
    ctx.stroke();

    // Barber's Right Arm Shaving Beard with Straight Razor
    const strokeOffset = Math.sin(this.shavingStroke) * 5;
    const razorHandX = custHeadX + 9 + strokeOffset;
    const razorHandY = custHeadY + 6 + strokeOffset * 0.4;

    // Bent right arm
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(barberX - 4, barberY - 128);
    ctx.lineTo(barberX - 16, barberY - 112);
    ctx.lineTo(razorHandX, razorHandY);
    ctx.stroke();

    // Barber right hand
    ctx.fillStyle = '#a16207';
    ctx.beginPath();
    ctx.arc(razorHandX, razorHandY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Silver straight razor blade
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(razorHandX - 6, razorHandY + 2);
    ctx.lineTo(razorHandX + 6, razorHandY - 4);
    ctx.stroke();
    // Tortoiseshell razor handle
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(razorHandX + 6, razorHandY - 4);
    ctx.lineTo(razorHandX + 11, razorHandY - 8);
    ctx.stroke();

    ctx.restore();

    // 7. WAITING WOODEN BENCH WITH PROPERLY ATTIRED VILLAGE PATRONS
    const benchX = shopLeft + shopW * 0.58;
    const benchY = groundY - 32;
    const benchW = shopW * 0.38;

    ctx.save();
    // Rustic red-painted timber bench frame
    ctx.fillStyle = '#831843'; // Deep Indian red-brown timber
    ctx.strokeStyle = '#500724';
    ctx.lineWidth = 1.5;
    // Bench Seat Plank
    ctx.beginPath();
    ctx.roundRect(benchX, benchY, benchW, 10, 2);
    ctx.fill();
    ctx.stroke();
    // Bench Backrest Plank
    ctx.fillRect(benchX, benchY - 36, benchW, 8);
    // Bench Legs & Stanchions
    ctx.fillRect(benchX + 8, benchY + 10, 7, 22);
    ctx.fillRect(benchX + benchW * 0.5 - 3, benchY + 10, 7, 22);
    ctx.fillRect(benchX + benchW - 15, benchY + 10, 7, 22);
    ctx.fillRect(benchX + 8, benchY - 36, 7, 36);
    ctx.fillRect(benchX + benchW - 15, benchY - 36, 7, 36);

    // PATRON 1: In light blue striped collared shirt & khaki trousers
    const p1X = benchX + benchW * 0.18;
    // Chappals / sandals on floor
    ctx.fillStyle = '#451a03';
    ctx.fillRect(p1X - 7, groundY - 4, 6, 4);
    ctx.fillRect(p1X + 2, groundY - 4, 6, 4);
    // Khaki/beige trousers
    ctx.fillStyle = '#d4d4d8';
    ctx.fillRect(p1X - 6, benchY + 4, 6, 26);
    ctx.fillRect(p1X + 2, benchY + 4, 6, 26);
    // Light blue striped shirt
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.roundRect(p1X - 10, benchY - 44, 22, 46, 3);
    ctx.fill();
    // Stripes
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 1;
    for (let sx = p1X - 8; sx <= p1X + 10; sx += 4) {
      ctx.beginPath();
      ctx.moveTo(sx, benchY - 44);
      ctx.lineTo(sx, benchY + 2);
      ctx.stroke();
    }
    // Head & face
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(p1X + 1, benchY - 54, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(p1X + 1, benchY - 57, 9.5, Math.PI, Math.PI * 2);
    ctx.fill();

    // PATRON 2: Village elder in terracotta/saffron kurta & white pyjama with legs crossed
    const p2X = benchX + benchW * 0.52;
    // White pyjama legs (one crossed over knee)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(p2X - 5, benchY + 4, 6, 26); // Lower leg
    ctx.fillRect(p2X - 2, benchY + 8, 14, 7); // Crossed leg
    // Terracotta Indian Kurta with mandarin collar & buttons
    ctx.fillStyle = '#c2410c';
    ctx.beginPath();
    ctx.roundRect(p2X - 11, benchY - 42, 23, 48, 4);
    ctx.fill();
    // Kurta collar & buttons
    ctx.fillStyle = '#7c2d12';
    ctx.fillRect(p2X - 1, benchY - 40, 3, 14);
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(p2X + 0.5, benchY - 36, 1, 0, Math.PI * 2);
    ctx.arc(p2X + 0.5, benchY - 31, 1, 0, Math.PI * 2);
    ctx.fill();
    // Head with graying hair & mustache
    ctx.fillStyle = '#a16207';
    ctx.beginPath();
    ctx.arc(p2X + 1, benchY - 52, 9.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#52525b'; // Salt-and-pepper hair
    ctx.beginPath();
    ctx.arc(p2X + 1, benchY - 55, 9, Math.PI, Math.PI * 2);
    ctx.fill();

    // PATRON 3: Village man in dark jacket and yellow knitted monkey cap
    const p3X = benchX + benchW * 0.82;
    // Dark trousers
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(p3X - 5, benchY + 4, 6, 26);
    ctx.fillRect(p3X + 2, benchY + 4, 6, 26);
    // Dark jacket / sweater
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.roundRect(p3X - 10, benchY - 40, 21, 42, 4);
    ctx.fill();
    // Holding folded newspaper
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(p3X - 8, benchY - 14, 16, 12);
    ctx.fillStyle = '#475569';
    ctx.fillRect(p3X - 6, benchY - 11, 12, 2);
    ctx.fillRect(p3X - 6, benchY - 7, 12, 2);
    // Head & Yellow Village Knitted Cap
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(p3X + 1, benchY - 50, 9, 0, Math.PI * 2);
    ctx.fill();
    // Yellow cap
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(p3X + 1, benchY - 54, 9.5, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(p3X - 8, benchY - 54, 18, 4); // Folded rim of cap

    ctx.restore();

    // 8. VINTAGE DELUXE SALOON FASCIAS & SIGNBOARD
    ctx.save();
    const fasciaW = Math.min(w * 0.88, 860);
    const fasciaX = (w - fasciaW) / 2;
    const fasciaY = Math.max(16, roofY - 26);

    // Weathered Corrugated Zinc Roof Overhang behind Signboard
    const zincGrad = ctx.createLinearGradient(0, fasciaY - 14, 0, fasciaY);
    zincGrad.addColorStop(0, '#52525b');
    zincGrad.addColorStop(0.5, '#71717a');
    zincGrad.addColorStop(1, '#27272a');
    ctx.fillStyle = zincGrad;
    ctx.beginPath();
    ctx.moveTo(fasciaX - 12, fasciaY + 4);
    ctx.lineTo(fasciaX + 12, fasciaY - 14);
    ctx.lineTo(fasciaX + fasciaW - 12, fasciaY - 14);
    ctx.lineTo(fasciaX + fasciaW + 12, fasciaY + 4);
    ctx.closePath();
    ctx.fill();

    // Red Fascia Signboard with Gold Border
    ctx.fillStyle = '#991b1b';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(fasciaX, fasciaY, fasciaW, 26, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 11.5px sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText("DELUXE GENTLEMEN'S HAIR SALON & SHAVING • EST. 1994", w * 0.5, fasciaY + 17);
    ctx.restore();

    // 9. VINTAGE ROTATING BARBER POLE
    this.renderBarberPole(shopLeft - 30, roofY + 45, 20, 120);

    // 10. VINTAGE 3-BLADE CEILING FAN (Motor, Downrod & Spinning Blades with Perspective)
    this.renderCeilingFan(shopLeft + shopW * 0.44, roofY + 34);

    // 11. FINE WATER MIST EMISSION (Interactive when user clicks Water Mist)
    if (this.steamDrops.length > 0) {
      ctx.save();
      this.steamDrops.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.96;
        d.vy *= 0.96;
        d.alpha -= 0.016;
        d.r += 0.08;
        ctx.fillStyle = `rgba(224, 242, 254, ${Math.max(0, d.alpha)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      this.steamDrops = this.steamDrops.filter(d => d.alpha > 0);
      ctx.restore();
    }
  }

  renderBarberPole(x, y, width, height) {
    const ctx = this.ctx;
    this.poleRotation = (this.poleRotation + 1.8) % 60;

    ctx.save();
    ctx.fillStyle = '#d4d4d8';
    ctx.beginPath();
    ctx.roundRect(x - 4, y - 12, width + 8, 12, 4);
    ctx.roundRect(x - 4, y + height, width + 8, 12, 4);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 6);
    ctx.clip();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y, width, height);

    const stripeW = 20;
    for (let sy = y - height + this.poleRotation; sy < y + height * 2; sy += stripeW * 2) {
      // Red stripe
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(x, sy);
      ctx.lineTo(x + width, sy + stripeW);
      ctx.lineTo(x + width, sy + stripeW * 1.5);
      ctx.lineTo(x, sy + stripeW * 0.5);
      ctx.closePath();
      ctx.fill();

      // Blue stripe
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.moveTo(x, sy + stripeW);
      ctx.lineTo(x + width, sy + stripeW * 2);
      ctx.lineTo(x + width, sy + stripeW * 2.5);
      ctx.lineTo(x, sy + stripeW * 1.5);
      ctx.closePath();
      ctx.fill();
    }

    // Glass cylinder shine
    const shine = ctx.createLinearGradient(x, y, x + width, y);
    shine.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    shine.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
    shine.addColorStop(0.8, 'rgba(0, 0, 0, 0.25)');
    ctx.fillStyle = shine;
    ctx.fillRect(x, y, width, height);

    ctx.restore();
  }

  renderCeilingFan(centerX, centerY) {
    const ctx = this.ctx;
    ctx.save();

    // Rafter ceiling canopy (compact)
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 18, 5.5, 0, Math.PI);
    ctx.fill();

    // Steel downrod pipe hanging down from roof
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 18);
    ctx.lineTo(centerX, centerY);
    ctx.stroke();

    // Rear wall shadow of rotating blades (compact)
    ctx.save();
    ctx.translate(centerX + 6, centerY + 16);
    ctx.scale(1, 0.42); // Elliptical 3D perspective shadow
    ctx.rotate(this.fanRotation);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);
      ctx.beginPath();
      ctx.roundRect(8, -5, 50, 10, 3.5);
      ctx.fill();
    }
    ctx.restore();

    // Fan 3D Blades (elliptical projection from below - scaled down)
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(1, 0.44); // Perspective viewing angle
    ctx.rotate(this.fanRotation);

    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);

      // Blade chrome shank / bracket
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(5, -2.5, 7, 5);

      // Aerodynamic vintage metallic brown blade (compact 48px)
      const bladeGrad = ctx.createLinearGradient(12, -5.5, 60, 5.5);
      bladeGrad.addColorStop(0, '#5c2b0c');
      bladeGrad.addColorStop(0.5, '#78350f');
      bladeGrad.addColorStop(1, '#451a03');
      ctx.fillStyle = bladeGrad;
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(12, -5.5, 48, 11, 3.5);
      ctx.fill();
      ctx.stroke();

      // Gold pinstripe ridge along blade
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(56, 0);
      ctx.stroke();
    }
    ctx.restore();

    // Central motor hub (compact 10x6)
    ctx.fillStyle = '#451a03';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Gold center teardrop finial
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(centerX, centerY + 2, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /* ============================================================
   * MASTER RENDER LOOP (WITH DELTA-TIME SMOOTHING FOR BUTTER-SMOOTH TRAVEL)
   * ============================================================ */

  startLoop() {
    let lastTime = performance.now();
    const loop = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      const dtScale = dt > 0 ? (dt / 0.01667) : 1.0;

      this.ctx.clearRect(0, 0, this.w, this.h);

      if (this.activeMode === 'driver') {
        this.renderBusMode(dtScale);
      } else {
        this.renderSaloonMode(dtScale);
      }

      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  stopLoop() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
  }
}

// Export singleton
window.visualsEngine = new VisualsEngine();

```


/* ============================================================================== */
/* FILE: js/app.js */
/* ============================================================================== */

```javascript:js/app.js
/**
 * SAFAR & SALOON - Main Application Controller
 * English-only interface, clean Lucide SVG icons, zero emojis
 * Coordinates mode switching, visual canvas, procedural audio, and player states
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM References
  const canvasEl = document.getElementById('sceneCanvas');
  const modeSwitchDriver = document.getElementById('modeBtnDriver');
  const modeSwitchSaloon = document.getElementById('modeBtnSaloon');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroBadge = document.getElementById('heroBadge');

  // Interactive Action Containers
  const driverActionsContainer = document.getElementById('driverActions');
  const saloonActionsContainer = document.getElementById('saloonActions');

  // Player Elements
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const repeatBtn = document.getElementById('repeatBtn');
  const trackTitle = document.getElementById('trackTitle');
  const trackArtist = document.getElementById('trackArtist');
  const trackMovie = document.getElementById('trackMovie');
  const trackTag = document.getElementById('trackTag');
  const cassetteDisc = document.getElementById('cassetteDisc');
  const discArtwork = document.getElementById('discArtwork');
  const eqVisualizer = document.getElementById('eqVisualizer');

  // Progress & Time
  const progressTrack = document.getElementById('progressTrack');
  const progressFill = document.getElementById('progressFill');
  const timeCurrent = document.getElementById('timeCurrent');
  const timeDuration = document.getElementById('timeDuration');

  // Volume
  const volumeSlider = document.getElementById('volumeSlider');
  const muteBtn = document.getElementById('muteBtn');
  const volumeIcon = document.getElementById('volumeIcon');

  // Stations
  const stationsNav = document.getElementById('stationsNav');

  // Modals & Drawers
  const playlistDrawer = document.getElementById('playlistDrawer');
  const openPlaylistBtn = document.getElementById('openPlaylistBtn');
  const closePlaylistBtn = document.getElementById('closePlaylistBtn');
  const playlistItemsList = document.getElementById('playlistItemsList');
  const searchSongInput = document.getElementById('searchSongInput');

  const settingsModal = document.getElementById('settingsModal');
  const settingsGearBtn = document.getElementById('settingsGearBtn');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const sleepTimerOptions = document.getElementById('sleepTimerOptions');
  const settingsTimerStatus = document.getElementById('settingsTimerStatus');
  const activeTimerBadge = document.getElementById('activeTimerBadge');
  const timeOfDayOptions = document.getElementById('timeOfDayOptions');
  const settingsTimeStatus = document.getElementById('settingsTimeStatus');

  const customSongModal = document.getElementById('customSongModal');
  const openCustomSongBtn = document.getElementById('openCustomSongBtn');
  const closeCustomSongBtn = document.getElementById('closeCustomSongBtn');
  const customSongForm = document.getElementById('customSongForm');
  const customSongInput = document.getElementById('customSongInput');

  const ticketModal = document.getElementById('ticketModal');
  const openTicketBtn = document.getElementById('openTicketBtn');
  const closeTicketBtn = document.getElementById('closeTicketBtn');
  const ticketContent = document.getElementById('ticketContent');

  // 1. Initialize Visuals & Player
  if (window.visualsEngine && canvasEl) {
    window.visualsEngine.init(canvasEl);
  }
  if (window.musicPlayer) {
    window.musicPlayer.init();
  }

  // 2. Set Initial Mode
  const initialMode = window.musicPlayer.currentMode || 'driver';
  applyMode(initialMode, false);

  /* ============================================================
   * DYNAMIC HERO BADGE & REAL-TIME SYNC
   * ============================================================ */

  function updateHeroBadge(mode) {
    if (!heroBadge) return;
    if (mode === 'saloon') {
      heroBadge.textContent = 'DELUXE VILLAGE SALON • SHAVING & GROOMING • EST. 1994';
    } else {
      if (window.visualsEngine) {
        const loc = window.visualsEngine.getCurrentLocation();
        const tInfo = window.visualsEngine.getTimeOfDay();
        heroBadge.textContent = `NH-48 • ${loc.city.toUpperCase()} • ${tInfo.timeStr} ${tInfo.label.toUpperCase()}`;
      } else {
        heroBadge.textContent = 'HIGHWAY CABIN • NH-48';
      }
    }
  }

  // Periodic refresh for real-time clock & location
  setInterval(() => {
    if (window.musicPlayer && window.musicPlayer.currentMode === 'driver') {
      updateHeroBadge('driver');
    }
  }, 30000);

  /* ============================================================
   * MODE SWITCHING LOGIC
   * ============================================================ */

  function applyMode(mode, triggerSound = true) {
    if (triggerSound && window.audioEngine) {
      window.audioEngine.playModeSwitchSound(mode);
    }

    if (mode === 'saloon') {
      document.body.classList.add('theme-saloon');
      if (modeSwitchSaloon) modeSwitchSaloon.classList.add('saloon-active');
      if (modeSwitchDriver) modeSwitchDriver.classList.remove('driver-active');

      if (driverActionsContainer) driverActionsContainer.classList.add('hidden');
      if (saloonActionsContainer) saloonActionsContainer.classList.remove('hidden');

      if (heroTitle) heroTitle.textContent = 'DELUXE SALOON';
      updateHeroBadge('saloon');
      const shortcutHorn = document.getElementById('shortcutHornLabel');
      if (shortcutHorn) shortcutHorn.textContent = 'Scissors';
    } else {
      document.body.classList.remove('theme-saloon');
      if (modeSwitchDriver) modeSwitchDriver.classList.add('driver-active');
      if (modeSwitchSaloon) modeSwitchSaloon.classList.remove('saloon-active');

      if (driverActionsContainer) driverActionsContainer.classList.remove('hidden');
      if (saloonActionsContainer) saloonActionsContainer.classList.add('hidden');

      if (heroTitle) heroTitle.textContent = 'BUS DRIVER';
      updateHeroBadge('driver');
      const shortcutHorn = document.getElementById('shortcutHornLabel');
      if (shortcutHorn) shortcutHorn.textContent = 'BLOW HORN';
    }

    if (window.visualsEngine) {
      window.visualsEngine.setMode(mode);
    }
    if (window.musicPlayer && window.musicPlayer.currentMode !== mode) {
      window.musicPlayer.setMode(mode);
    }

    renderStations();
  }

  if (modeSwitchDriver) {
    modeSwitchDriver.addEventListener('click', () => applyMode('driver', true));
  }
  if (modeSwitchSaloon) {
    modeSwitchSaloon.addEventListener('click', () => applyMode('saloon', true));
  }

  /* ============================================================
   * STATIONS RENDERING
   * ============================================================ */

  function renderStations() {
    if (!stationsNav) return;
    stationsNav.innerHTML = '';

    const currentMode = window.musicPlayer.currentMode;
    const stations = window.playlistData[currentMode].stations;
    const activeStation = window.musicPlayer.getActiveStation();

    stations.forEach(station => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `station-pill ${station.id === activeStation.id ? 'active' : ''}`;
      btn.innerHTML = `
        <svg class="w-3.5 h-3.5 shrink-0 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="2"></circle>
          <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
        </svg>
        <span>${station.name}</span>
      `;
      btn.addEventListener('click', () => {
        window.musicPlayer.setStation(station.id);
        renderStations();
        renderPlaylistDrawer();
      });
      stationsNav.appendChild(btn);
    });
  }

  /* ============================================================
   * PLAYER EVENT HOOKS
   * ============================================================ */

  window.musicPlayer.on('trackChange', (track) => {
    if (!track) return;
    if (trackTitle) trackTitle.textContent = track.title;
    if (trackArtist) trackArtist.textContent = track.artist;
    if (trackMovie) trackMovie.textContent = track.movie;
    if (trackTag) trackTag.textContent = track.tag || 'Retro Hit';

    if (discArtwork) {
      discArtwork.style.backgroundImage = `url('${track.thumb}')`;
    }

    renderPlaylistDrawer();
  });

  window.musicPlayer.on('stateChange', ({ state, track }) => {
    if (state === 'playing') {
      if (playIcon) {
        playIcon.innerHTML = `
          <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/>
          <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>
        `;
      }
      if (cassetteDisc) cassetteDisc.classList.add('spinning');
      if (eqVisualizer) eqVisualizer.classList.add('is-playing');
    } else {
      if (playIcon) {
        playIcon.innerHTML = `
          <polygon points="6,4 20,12 6,20" fill="currentColor"/>
        `;
      }
      if (cassetteDisc) cassetteDisc.classList.remove('spinning');
      if (eqVisualizer) eqVisualizer.classList.remove('is-playing');
    }
  });

  window.musicPlayer.on('progress', (data) => {
    if (progressFill) progressFill.style.width = `${data.percent}%`;
    if (timeCurrent) timeCurrent.textContent = data.formattedCurrent;
    if (timeDuration) timeDuration.textContent = data.formattedDuration;
  });

  window.musicPlayer.on('stationChange', (station) => {
    renderStations();
    renderPlaylistDrawer();
  });

  // Controls Binding
  if (playBtn) {
    playBtn.addEventListener('click', () => window.musicPlayer.togglePlay());
  }
  if (cassetteDisc) {
    cassetteDisc.addEventListener('click', () => window.musicPlayer.togglePlay());
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => window.musicPlayer.prevTrack());
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => window.musicPlayer.nextTrack());
  }
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      const active = window.musicPlayer.toggleShuffle();
      shuffleBtn.classList.toggle('active', active);
      showToast(active ? 'Shuffle Mode: Enabled' : 'Shuffle Mode: Disabled');
    });
  }
  if (repeatBtn) {
    repeatBtn.addEventListener('click', () => {
      const active = window.musicPlayer.toggleRepeat();
      repeatBtn.classList.toggle('active', active);
      showToast(active ? 'Repeat Track: Enabled' : 'Repeat Track: Disabled');
    });
  }

  // Seek bar click
  if (progressTrack) {
    progressTrack.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      window.musicPlayer.seekToPercent(clickPos * 100);
    });
  }

  // Volume slider
  if (volumeSlider) {
    volumeSlider.value = window.musicPlayer.volume;
    volumeSlider.addEventListener('input', (e) => {
      window.musicPlayer.setVolume(parseInt(e.target.value, 10));
    });
  }
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      const isMuted = window.musicPlayer.toggleMute();
      if (volumeIcon) {
        volumeIcon.innerHTML = isMuted
          ? `<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>`
          : `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>`;
      }
    });
  }

  /* ============================================================
   * TOAST NOTIFICATION HELPER
   * ============================================================ */

  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastText = document.getElementById('toastText');
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.remove('opacity-0', '-translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', '-translate-y-2');
    }, 2500);
  }

  /* ============================================================
   * SOUNDBOARD & ATMOSPHERE CONTROLS
   * ============================================================ */

  // 1. Bus Mode Buttons
  const bigHornBtn = document.getElementById('bigHornBtn');
  const autoHornToggleBtn = document.getElementById('autoHornToggleBtn');
  const rainWiperToggleBtn = document.getElementById('rainWiperToggleBtn');
  const engineHumToggleBtn = document.getElementById('engineHumToggleBtn');

  let isAutoHornActive = false;
  let autoHornInterval = null;

  function triggerAirHornBlast() {
    if (window.pressureHornSystem) {
      const curTrack = window.musicPlayer ? window.musicPlayer.currentTrack : null;
      const res = window.pressureHornSystem.blowHorn(curTrack);
      if (res) {
        if (res.type === 'hook') {
          showToast(`BLOW HORN: "${res.name}" Musical Hook!`);
        } else {
          showToast(`BLOW HORN: ${res.name} (${res.description})`);
        }
      }
    } else if (window.audioEngine) {
      const trackTitle = window.audioEngine.playTruckAirHorn();
      showToast(`BLOW HORN: "${trackTitle}" PA Horn Blast!`);
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
        showToast('Auto Horn Active: Periodic blasts on highway');
        clearInterval(autoHornInterval);
        autoHornInterval = setInterval(() => {
          if (window.musicPlayer && window.musicPlayer.isPlaying && window.musicPlayer.currentMode === 'driver') {
            triggerAirHornBlast();
          }
        }, 35000);
      } else {
        clearInterval(autoHornInterval);
        showToast('Auto Horn Disabled');
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
    });
  }

  let isEngineActive = false;
  if (engineHumToggleBtn) {
    engineHumToggleBtn.addEventListener('click', () => {
      isEngineActive = !isEngineActive;
      if (window.audioEngine) window.audioEngine.toggleEngineAmbient(isEngineActive);
      engineHumToggleBtn.classList.toggle('active', isEngineActive);
      const stateBadge = engineHumToggleBtn.querySelector('.toggle-badge');
      if (stateBadge) stateBadge.textContent = isEngineActive ? 'ON' : 'OFF';
    });
  }

  // 2. Saloon Mode Buttons
  const scissorSnipBtn = document.getElementById('scissorSnipBtn');
  const sprayMistBtn = document.getElementById('sprayMistBtn');
  const champiVibratorBtn = document.getElementById('champiVibratorBtn');
  const ceilingFanBtn = document.getElementById('ceilingFanBtn');

  if (scissorSnipBtn) {
    scissorSnipBtn.addEventListener('click', () => {
      if (window.audioEngine) window.audioEngine.playScissorSnip();
      scissorSnipBtn.classList.add('scale-95');
      setTimeout(() => scissorSnipBtn.classList.remove('scale-95'), 150);
    });
  }

  if (sprayMistBtn) {
    sprayMistBtn.addEventListener('click', () => {
      if (window.audioEngine) window.audioEngine.playSprayBottle();
      if (window.visualsEngine) window.visualsEngine.triggerMist();
      sprayMistBtn.classList.add('scale-95');
      setTimeout(() => sprayMistBtn.classList.remove('scale-95'), 150);
    });
  }

  let isChampiActive = false;
  if (champiVibratorBtn) {
    champiVibratorBtn.addEventListener('click', () => {
      isChampiActive = !isChampiActive;
      if (window.audioEngine) window.audioEngine.toggleChampiVibrator(isChampiActive);
      champiVibratorBtn.classList.toggle('active', isChampiActive);
      const stateBadge = champiVibratorBtn.querySelector('.toggle-badge');
      if (stateBadge) stateBadge.textContent = isChampiActive ? 'ON' : 'OFF';
    });
  }

  let isFanActive = true;
  if (ceilingFanBtn) {
    // Default fan active
    ceilingFanBtn.classList.add('active');
    const initBadge = ceilingFanBtn.querySelector('.toggle-badge');
    if (initBadge) initBadge.textContent = 'ON';

    ceilingFanBtn.addEventListener('click', () => {
      isFanActive = !isFanActive;
      if (window.audioEngine) window.audioEngine.toggleFanAmbient(isFanActive);
      if (window.visualsEngine) window.visualsEngine.toggleFan(isFanActive);
      ceilingFanBtn.classList.toggle('active', isFanActive);
      const stateBadge = ceilingFanBtn.querySelector('.toggle-badge');
      if (stateBadge) stateBadge.textContent = isFanActive ? 'ON' : 'OFF';
    });
  }

  /* ============================================================
   * PLAYLIST DRAWER & SEARCH
   * ============================================================ */

  function renderPlaylistDrawer(searchQuery = '') {
    if (!playlistItemsList) return;
    playlistItemsList.innerHTML = '';

    const currentMode = window.musicPlayer.currentMode;
    const activeStation = window.musicPlayer.getActiveStation();
    const query = searchQuery.toLowerCase().trim();

    const filteredTracks = activeStation.tracks.filter(track => {
      if (!query) return true;
      return track.title.toLowerCase().includes(query) ||
             track.artist.toLowerCase().includes(query) ||
             track.movie.toLowerCase().includes(query);
    });

    if (filteredTracks.length === 0) {
      playlistItemsList.innerHTML = `
        <div class="text-center py-10 text-zinc-400 text-sm">
          No tracks found matching your search. Please try another song or artist name.
        </div>
      `;
      return;
    }

    filteredTracks.forEach((track, idx) => {
      const isCurrent = window.musicPlayer.currentTrack && window.musicPlayer.currentTrack.id === track.id;
      const originalIndex = activeStation.tracks.findIndex(t => t.id === track.id);

      const item = document.createElement('div');
      item.className = `flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
        isCurrent ? 'bg-white/10 border border-white/20 shadow-md' : 'hover:bg-white/5 border border-transparent'
      }`;
      item.innerHTML = `
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div class="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-zinc-900 border border-white/10">
            <img src="${track.thumb}" alt="${track.title}" class="w-full h-full object-cover"/>
            ${isCurrent ? '<div class="absolute inset-0 bg-black/50 flex items-center justify-center text-amber-400"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><polygon points="6,4 20,12 6,20"/></svg></div>' : ''}
          </div>
          <div class="min-w-0 flex-1">
            <div class="font-semibold text-xs sm:text-sm text-white truncate ${isCurrent ? 'text-amber-300' : ''}">
              ${track.title}
            </div>
            <div class="text-[11px] text-zinc-400 truncate">
              ${track.artist} • ${track.movie}
            </div>
          </div>
        </div>
        <div class="text-xs font-mono text-zinc-500 ml-3 shrink-0">
          ${track.duration}
        </div>
      `;

      item.addEventListener('click', () => {
        window.musicPlayer.playSpecificTrack(activeStation.id, originalIndex);
        playlistDrawer.classList.remove('open');
      });

      playlistItemsList.appendChild(item);
    });
  }

  if (openPlaylistBtn) {
    openPlaylistBtn.addEventListener('click', () => {
      renderPlaylistDrawer();
      playlistDrawer.classList.add('open');
    });
  }
  if (closePlaylistBtn) {
    closePlaylistBtn.addEventListener('click', () => {
      playlistDrawer.classList.remove('open');
    });
  }
  if (searchSongInput) {
    searchSongInput.addEventListener('input', (e) => {
      renderPlaylistDrawer(e.target.value);
    });
  }

  /* ============================================================
   * ATMOSPHERIC AUDIO MIXER SLIDERS
   * ============================================================ */

  const sfxVolSlider = document.getElementById('sfxVolSlider');
  const rainVolSlider = document.getElementById('rainVolSlider');
  const engineVolSlider = document.getElementById('engineVolSlider');
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
  if (engineVolSlider) {
    engineVolSlider.addEventListener('input', (e) => {
      if (window.audioEngine) {
        window.audioEngine.volumes.engine = parseFloat(e.target.value);
        if (window.audioEngine.ambients.engine && window.audioEngine.ambients.engine.gainNode) {
          window.audioEngine.ambients.engine.gainNode.gain.setValueAtTime(parseFloat(e.target.value), window.audioEngine.ctx.currentTime);
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

  /* ============================================================
   * CUSTOM YOUTUBE SONG MODAL
   * ============================================================ */

  if (openCustomSongBtn && customSongModal) {
    openCustomSongBtn.addEventListener('click', () => customSongModal.classList.add('open'));
  }
  if (closeCustomSongBtn && customSongModal) {
    closeCustomSongBtn.addEventListener('click', () => customSongModal.classList.remove('open'));
  }
  if (customSongForm) {
    customSongForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = customSongInput ? customSongInput.value.trim() : '';
      if (val) {
        const success = window.musicPlayer.playCustomVideo(val);
        if (success) {
          customSongModal.classList.remove('open');
          if (customSongInput) customSongInput.value = '';
          showToast('Custom YouTube Frequency Loaded');
        } else {
          showToast('Invalid YouTube Link. Please check URL or ID.');
        }
      }
    });
  }

  /* ============================================================
   * SOUVENIR TICKET & APPOINTMENT RECEIPT MAKER
   * ============================================================ */

  function renderTicket() {
    if (!ticketContent) return;
    const mode = window.musicPlayer.currentMode;
    const curTrack = window.musicPlayer.currentTrack || { title: "Nostalgic Melody", artist: "Retro Legend" };
    const dateStr = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    const randomSeat = Math.floor(Math.random() * 32) + 1;
    const randomTicketNo = Math.floor(Math.random() * 89999) + 10000;

    const currentLoc = window.visualsEngine ? window.visualsEngine.getCurrentLocation() : { city: "New Delhi", landmark: "ISBT Kashmere Gate" };
    const tInfo = window.visualsEngine ? window.visualsEngine.getTimeOfDay() : { timeStr: "22:00", label: "Night Service" };

    if (mode === 'driver') {
      ticketContent.innerHTML = `
        <div class="ticket-paper p-6 relative">
          <div class="ticket-notch-left"></div>
          <div class="ticket-notch-right"></div>
          <div class="flex items-center justify-between border-b border-zinc-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5 text-left">
              <span class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 font-black text-xs">NH</span>
              <div>
                <div class="text-[10px] uppercase tracking-widest font-bold text-amber-800">Interstate Highway Express Authority</div>
                <div class="text-xs font-semibold text-zinc-900">National Highway Passenger Audio Pass</div>
              </div>
            </div>
            <div class="text-right">
              <span class="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold tracking-wider uppercase">Confirmed</span>
              <div class="text-[10px] font-mono text-zinc-500 mt-0.5">PNR: #NH48-${randomTicketNo}</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs text-zinc-800 mb-4 bg-zinc-50/80 p-3.5 rounded-xl border border-zinc-200/80">
            <div>
              <span class="text-zinc-500 block text-[10px] uppercase font-semibold">Active Sector</span>
              <strong class="text-zinc-900 text-xs">${currentLoc.city} (${currentLoc.landmark})</strong>
            </div>
            <div>
              <span class="text-zinc-500 block text-[10px] uppercase font-semibold">Highway Destination</span>
              <strong class="text-zinc-900 text-xs">Mumbai Western Express (NH-48)</strong>
            </div>
            <div>
              <span class="text-zinc-500 block text-[10px] uppercase font-semibold">Scheduled Real-Time</span>
              <strong class="text-zinc-900 text-xs">${dateStr} • ${tInfo.timeStr} (${tInfo.label})</strong>
            </div>
            <div>
              <span class="text-zinc-500 block text-[10px] uppercase font-semibold">Berth Assignment</span>
              <strong class="text-zinc-900 text-xs">Seat ${randomSeat} (Upper Sleeper)</strong>
            </div>
            <div class="col-span-2 pt-2 border-t border-zinc-200">
              <span class="text-zinc-500 block text-[10px] uppercase font-semibold">Cabin Soundboard Tuning</span>
              <strong class="text-amber-900 text-xs font-semibold">${curTrack.title} — ${curTrack.artist}</strong>
            </div>
          </div>

          <!-- Simulated Barcode Strip -->
          <div class="flex items-center justify-between py-2 px-3 bg-zinc-100 rounded-lg border border-zinc-200 mb-3">
            <div class="flex items-center gap-1">
              <span class="barcode-bar w-1"></span>
              <span class="barcode-bar w-0.5"></span>
              <span class="barcode-bar w-1.5"></span>
              <span class="barcode-bar w-0.5"></span>
              <span class="barcode-bar w-2"></span>
              <span class="barcode-bar w-0.5"></span>
              <span class="barcode-bar w-1"></span>
              <span class="barcode-bar w-2.5"></span>
              <span class="barcode-bar w-1"></span>
              <span class="barcode-bar w-0.5"></span>
              <span class="barcode-bar w-2"></span>
              <span class="barcode-bar w-1"></span>
              <span class="barcode-bar w-0.5"></span>
              <span class="barcode-bar w-1.5"></span>
              <span class="barcode-bar w-1"></span>
              <span class="barcode-bar w-2"></span>
              <span class="barcode-bar w-0.5"></span>
            </div>
            <div class="text-[9px] font-mono text-zinc-500 tracking-wider">NH48-${randomTicketNo}-PASS</div>
          </div>

          <div class="border-t border-dashed border-zinc-300 pt-2 text-center">
            <div class="text-[10px] font-bold text-amber-900 uppercase tracking-widest">Horn OK Please • Safe Interstate Highway Journey</div>
          </div>
        </div>
      `;
    } else {
      ticketContent.innerHTML = `
        <div class="ticket-paper p-6 relative">
          <div class="ticket-notch-left"></div>
          <div class="ticket-notch-right"></div>
          <div class="flex items-center justify-between border-b border-zinc-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5 text-left">
              <span class="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-700 font-black text-xs">DX</span>
              <div>
                <div class="text-[10px] uppercase tracking-widest font-bold text-teal-800">Deluxe Gentlemen's Hair Salon</div>
                <div class="text-xs font-semibold text-zinc-900">Official Service Invoice & Bill</div>
              </div>
            </div>
            <div class="text-right">
              <span class="inline-block px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[9px] font-bold tracking-wider uppercase">PAID (CASH)</span>
              <div class="text-[10px] font-mono text-zinc-500 mt-0.5">TOKEN: #SALOON-${randomSeat}</div>
            </div>
          </div>

          <div class="bg-zinc-50/80 p-3 rounded-xl border border-zinc-200/80 mb-4 space-y-2 text-xs text-left">
            <div class="flex justify-between text-zinc-600 pb-1 border-b border-zinc-200 text-[10px] font-semibold uppercase">
              <span>Service Item</span>
              <span>Amount</span>
            </div>
            <div class="flex justify-between text-zinc-800">
              <span>Classic Haircut & Styling</span>
              <span class="font-mono font-medium">₹80.00</span>
            </div>
            <div class="flex justify-between text-zinc-800">
              <span>Herbal Head Massage (Champi)</span>
              <span class="font-mono font-medium">₹50.00</span>
            </div>
            <div class="flex justify-between text-zinc-800">
              <span>Straight Razor Beard Grooming</span>
              <span class="font-mono font-medium">₹40.00</span>
            </div>
            <div class="flex justify-between text-zinc-800">
              <span>Cool Mint Face Mist & Cologne</span>
              <span class="font-mono font-medium">₹20.00</span>
            </div>
            <div class="flex justify-between text-teal-800 text-[11px] pt-1 border-t border-dashed border-zinc-200">
              <span>Radio: ${curTrack.title}</span>
              <span class="font-bold">INCLUDED</span>
            </div>
            <div class="flex justify-between text-zinc-950 font-bold pt-1.5 border-t border-zinc-300 text-sm">
              <span>Total Settled</span>
              <span class="font-mono text-teal-800 font-bold">₹190.00</span>
            </div>
          </div>

          <!-- Simulated Barcode Strip -->
          <div class="flex items-center justify-between py-2 px-3 bg-zinc-100 rounded-lg border border-zinc-200 mb-3">
            <div class="flex items-center gap-1">
              <span class="barcode-bar w-1"></span>
              <span class="barcode-bar w-0.5"></span>
              <span class="barcode-bar w-2"></span>
              <span class="barcode-bar w-1"></span>
              <span class="barcode-bar w-0.5"></span>
              <span class="barcode-bar w-1.5"></span>
              <span class="barcode-bar w-0.5"></span>
              <span class="barcode-bar w-2"></span>
              <span class="barcode-bar w-1"></span>
              <span class="barcode-bar w-2.5"></span>
              <span class="barcode-bar w-0.5"></span>
              <span class="barcode-bar w-1"></span>
              <span class="barcode-bar w-1.5"></span>
              <span class="barcode-bar w-0.5"></span>
            </div>
            <div class="text-[9px] font-mono text-zinc-500 tracking-wider">SALOON-${randomSeat}-${dateStr}</div>
          </div>

          <div class="border-t border-dashed border-zinc-300 pt-2 text-center">
            <div class="text-[10px] font-bold text-teal-800 uppercase tracking-widest">Thank You for Visiting • Deluxe Grooming Est. 1994</div>
          </div>
        </div>
      `;
    }
  }

  if (openTicketBtn && ticketModal) {
    openTicketBtn.addEventListener('click', () => {
      renderTicket();
      ticketModal.classList.add('open');
    });
  }
  if (closeTicketBtn && ticketModal) {
    closeTicketBtn.addEventListener('click', () => ticketModal.classList.remove('open'));
  }

  const downloadTicketBtn = document.getElementById('downloadTicketBtn');
  const printTicketBtn = document.getElementById('printTicketBtn');

  if (printTicketBtn) {
    printTicketBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (downloadTicketBtn) {
    downloadTicketBtn.addEventListener('click', () => {
      downloadTicketReceipt();
    });
  }

  function downloadTicketReceipt() {
    const mode = window.musicPlayer ? window.musicPlayer.currentMode : 'driver';
    const isDriver = mode === 'driver';
    const curTrack = (window.musicPlayer && window.musicPlayer.currentTrack) ? window.musicPlayer.currentTrack : { title: "Nostalgic Melody", artist: "Retro Legend" };
    const dateStr = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    const currentLoc = window.visualsEngine ? window.visualsEngine.getCurrentLocation() : { city: "New Delhi", landmark: "ISBT Kashmere Gate", nextCity: "Gurgaon", nextDist: 32 };
    const tInfo = window.visualsEngine ? window.visualsEngine.getTimeOfDay() : { timeStr: "22:00", label: "Night Service" };

    const c = document.createElement('canvas');
    c.width = 700;
    c.height = 840;
    const ctx = c.getContext('2d');

    // Background Vintage Parchment
    ctx.fillStyle = '#faf8f2';
    ctx.beginPath();
    ctx.roundRect(20, 20, 660, 800, 16);
    ctx.fill();

    // Perforated edge notches
    ctx.fillStyle = '#121214';
    ctx.beginPath();
    ctx.arc(20, 420, 16, -Math.PI / 2, Math.PI / 2);
    ctx.arc(680, 420, 16, Math.PI / 2, -Math.PI / 2);
    ctx.fill();

    // Border
    ctx.strokeStyle = '#d4cebe';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(20, 20, 660, 800, 16);
    ctx.stroke();

    // Header Band
    ctx.fillStyle = isDriver ? '#f59e0b' : '#0d9488';
    ctx.beginPath();
    ctx.roundRect(30, 30, 640, 100, [12, 12, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(isDriver ? "NATIONAL HIGHWAY EXPRESS (NH-48)" : "DELUXE GENTLEMEN'S SALON", 50, 75);

    ctx.font = '14px sans-serif';
    ctx.fillText(isDriver ? "Official Passenger Interstate Audio Pass • Est. 1994" : "Traditional Roadside Grooming & Shaving • Est. 1994", 50, 105);

    ctx.textAlign = 'right';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(isDriver ? "PASSENGER COPY" : "TAX INVOICE", 650, 80);

    // Metadata Table Box
    ctx.fillStyle = '#f3efe6';
    ctx.beginPath();
    ctx.roundRect(40, 150, 620, 360, 12);
    ctx.fill();
    ctx.strokeStyle = '#e2dcce';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = 'left';

    const drawRow = (label, val, x, y) => {
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(label.toUpperCase(), x, y);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(val, x, y + 24);
    };

    if (isDriver) {
      drawRow("Current Sector", `${currentLoc.city} (${currentLoc.landmark})`, 60, 190);
      drawRow("Destination", "Mumbai Western Express (NH-48)", 360, 190);
      drawRow("Date & Time", `${dateStr} • ${tInfo.timeStr} (${tInfo.label})`, 60, 260);
      drawRow("Berth / Seat", "Seat 18 (Upper Sleeper Cabin)", 360, 260);
      drawRow("Status", "CONFIRMED & ISSUED", 60, 330);
      drawRow("Total Fare", "₹ 480.00 (Cash / Conductor Paid)", 360, 330);
      drawRow("Radio Soundboard Track", `${curTrack.title} — ${curTrack.artist}`, 60, 410);
    } else {
      drawRow("Salon Branch", "Deluxe Village Highway Chowk", 60, 190);
      drawRow("Master Barber", "Traditional Straight-Razor Specialist", 360, 190);
      drawRow("Service Date", `${dateStr} • ${tInfo.timeStr}`, 60, 260);
      drawRow("Customer Token", "Token #DX-14", 360, 260);
      drawRow("Services Rendered", "Haircut, Straight Razor Shave & Champi", 60, 330);
      drawRow("Total Settled", "₹ 190.00 (Paid in Full)", 360, 330);
      drawRow("Background Radio Melody", `${curTrack.title} — ${curTrack.artist}`, 60, 410);
    }

    // Perforated Dividing Line
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(30, 540);
    ctx.lineTo(670, 540);
    ctx.stroke();
    ctx.setLineDash([]);

    // Retro Barcode
    ctx.fillStyle = '#09090b';
    const barX = 60;
    const barY = 570;
    const barW = [3, 1, 4, 2, 6, 1, 3, 5, 2, 1, 4, 2, 6, 3, 1, 5, 2, 4, 1, 6, 3, 2, 5, 1, 4, 2, 5, 3, 1, 4];
    let curX = barX;
    barW.forEach((bw, idx) => {
      ctx.fillRect(curX, barY, bw, 65);
      curX += bw + (idx % 3 === 0 ? 4 : 2);
    });

    ctx.textAlign = 'left';
    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = '#475569';
    ctx.fillText(isDriver ? `PNR: #NH48-73921 • SAFAR & SALOON` : `INV: #SALOON-94 • AUTHENTIC GROOMING`, barX, 660);

    // Footer Slogan
    ctx.textAlign = 'center';
    ctx.fillStyle = isDriver ? '#92400e' : '#115e59';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(isDriver ? "HORN OK PLEASE • SAFE INTERSTATE HIGHWAY TRAVEL" : "THANK YOU FOR VISITING • DELUXE GROOMING EST. 1994", 350, 750);

    // Stamp
    ctx.save();
    ctx.translate(560, 680);
    ctx.rotate(-0.15);
    ctx.strokeStyle = isDriver ? 'rgba(217, 119, 6, 0.65)' : 'rgba(13, 148, 136, 0.65)';
    ctx.lineWidth = 3;
    ctx.strokeRect(-60, -25, 120, 50);
    ctx.fillStyle = isDriver ? 'rgba(217, 119, 6, 0.75)' : 'rgba(13, 148, 136, 0.75)';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(isDriver ? "NH-48 PASSED" : "OFFICIAL PAID", 0, -4);
    ctx.fillText(dateStr, 0, 14);
    ctx.restore();

    // Trigger Download
    const dataUrl = c.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = isDriver ? `Safar-Ticket-NH48-${dateStr}.png` : `Deluxe-Saloon-Receipt-${dateStr}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /* ============================================================
   * CONSOLIDATED SETTINGS & CALIBRATION MODAL
   * ============================================================ */

  if (settingsGearBtn && settingsModal) {
    settingsGearBtn.addEventListener('click', () => {
      settingsModal.classList.add('open');
    });
  }
  if (closeSettingsBtn && settingsModal) {
    closeSettingsBtn.addEventListener('click', () => {
      settingsModal.classList.remove('open');
    });
  }

  // Sleep Timer Selection Pills inside Settings Modal
  if (sleepTimerOptions) {
    sleepTimerOptions.querySelectorAll('.sleep-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const minutes = parseInt(pill.getAttribute('data-minutes'), 10) || 0;
        window.musicPlayer.setSleepTimer(minutes);

        // Update active class
        sleepTimerOptions.querySelectorAll('.sleep-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        // Update textual indicator & header gear badge
        if (settingsTimerStatus) {
          settingsTimerStatus.textContent = minutes === 0 ? 'Timer Disabled' : `Active: ${minutes} minutes`;
        }
        if (activeTimerBadge) {
          if (minutes > 0) {
            activeTimerBadge.textContent = `${minutes}m`;
            activeTimerBadge.classList.remove('hidden');
          } else {
            activeTimerBadge.classList.add('hidden');
          }
        }
        showToast(minutes === 0 ? 'Sleep timer cancelled' : `Sleep timer set for ${minutes} minutes`);
      });
    });
  }

  // Highway Time of Day & Headlight Atmosphere Pills inside Settings Modal
  if (timeOfDayOptions) {
    timeOfDayOptions.querySelectorAll('.time-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const mode = pill.getAttribute('data-time');
        const override = mode === 'auto' ? null : mode;
        if (window.visualsEngine) {
          window.visualsEngine.setTimeOverride(override);
        }
        timeOfDayOptions.querySelectorAll('.time-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        let statusText = 'Real-Time Sync (Auto)';
        if (mode === 'day') statusText = 'Daylight Highway (Active)';
        else if (mode === 'sunset') statusText = 'Sunset Golden Hour (Active)';
        else if (mode === 'night') statusText = 'Night Highway & Headlights (Active)';

        if (settingsTimeStatus) settingsTimeStatus.textContent = statusText;
        showToast(`Highway Atmosphere: ${statusText}`);
        updateHeroBadge(window.musicPlayer.currentMode);
      });
    });
  }

  /* ============================================================
   * GLOBAL KEYBOARD SHORTCUTS
   * Space: Play/Pause | A/Left: Prev | D/Right: Next
   * H: Horn/Scissors | S: Switch Mode | M: Mute
   * ============================================================ */

  window.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    if (e.code === 'Space') {
      e.preventDefault();
      window.musicPlayer.togglePlay();
    } else if (e.key === 'a' || e.key === 'A' || e.code === 'ArrowLeft') {
      window.musicPlayer.prevTrack();
    } else if (e.key === 'd' || e.key === 'D' || e.code === 'ArrowRight') {
      window.musicPlayer.nextTrack();
    } else if (e.key === 'h' || e.key === 'H') {
      if (window.musicPlayer.currentMode === 'driver') {
        triggerAirHornBlast();
      } else {
        if (window.audioEngine) window.audioEngine.playScissorSnip();
      }
    } else if (e.key === 'm' || e.key === 'M') {
      window.musicPlayer.toggleMute();
    } else if (e.key === 's' || e.key === 'S') {
      const nextMode = window.musicPlayer.currentMode === 'driver' ? 'saloon' : 'driver';
      applyMode(nextMode, true);
    } else if (e.key === '?') {
      if (settingsModal) settingsModal.classList.toggle('open');
    }
  });

  // Close modals on clicking backdrop
  document.querySelectorAll('.drawer-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  });
});

```


/* ============================================================================== */
/* FILE: README.md */
/* ============================================================================== */

```markdown:README.md
# Safar & Saloon 📻

> **Dual Retro Radio Web Experience — Midnight Highway Interstate Cabin & Vintage Deluxe Barbershop Lounge**

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](LICENSE)
[![HTML5 Canvas](https://img.shields.io/badge/Canvas-60_FPS_Procedural-blue?style=for-the-badge&logo=html5)](js/visuals.js)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesized_FX-purple?style=for-the-badge)](js/audioEngine.js)
[![YouTube IFrame API](https://img.shields.io/badge/YouTube-IFrame_Player-red?style=for-the-badge&logo=youtube)](js/player.js)
[![Zero Build Dependencies](https://img.shields.io/badge/Dependencies-Vanilla_JS-emerald?style=for-the-badge)](package.json)
[![Responsive](https://img.shields.io/badge/Design-Mobile_|_Tablet_|_Desktop-orange?style=for-the-badge)](css/styles.css)

---

## 🌟 Overview

**Safar & Saloon** is an interactive, browser-native audio-visual web application that revives two quintessential Indian cultural travel and leisure archetypes:

1. 🚌 **Bus Driver (Highway Cabin / Safar)**: Midnight interstate cruising along the **NH-48 corridor**, soulful 90s Bollywood cassette tape classics, a 3D perspective infinite asphalt highway, dynamic day/night/sunset/rain weather cycles, roadside kilometer milestone markers, oncoming vehicle headlight glows, and procedural multi-tone pressure air horns.
2. 💈 **Deluxe Saloon (Barbershop Lounge)**: Sunday morning haircut sessions, warm teak wood dado wainscoting, vintage gamthi striped wallpaper, an ornate gilded mirror, a rotating tricolor barber pole, a slow 3-blade ceiling fan casting sweeping shadows, and procedural soundboards for dual-blade scissors snips, spritzer water mist, and head massage machines.

Everything runs entirely in client-side vanilla JavaScript, modern CSS3, and HTML5 Canvas with **zero heavy frontend frameworks or build steps required**.

---

## 🎛️ The Two Modes

| Feature | 🚌 Bus Driver Mode | 💈 Deluxe Saloon Mode |
| :--- | :--- | :--- |
| **Theme / Vibe** | Midnight Highway Cabin & Interstate Long Haul | Sunday Morning Village Barbershop |
| **Visual Atmosphere** | 3D perspective highway, distant mountains, streetlights, poles, trees | Full-width saloon room, gamthi wallpaper, teak wood dado, mirror, barber pole |
| **Motion Physics** | Sub-pixel perspective asphalt glide, roadside entity scaling, cabin heave | 3-blade rotating ceiling fan with dynamic wall shadows, barber pole helix |
| **Weather / Sky** | Real-time Sunset, Night Halogen Beams, Dark Storm Rain with dual wipers | Warm indoor saloon ambient lighting and fluorescent tube glints |
| **Procedural Soundboard** | Melodic Song Hook Horn, Classic Dipper Horn, City Clipper, Diesel Rumble | Dual-blade scissor snips, pressurized water mist spritzer, head vibrator, fan hum |
| **Curated Radio Frequencies** | NH-48 Sleeper, Gulzar Ghazals, Manache Ghaav, Dhaba Beats, Monsoon Rain | Deluxe 90s Romance, Gulzar Ghazals, Manache Ghaav, Sunday Morning, Transistor 70s |
| **Souvenir Generator** | Interstate Highway Passenger Ticket (PNR, Seat, Route) | Deluxe Gentlemen's Hair Salon Appointment Receipt & Bill |

---

## ✨ Key Capabilities

### 1. 60 FPS Procedural HTML5 Canvas Visual Engine
- **Endless 3D Perspective Highway**: Mathematically computed perspective projection rendering moving dashed lane dividers with zero stutter and smooth continuous travel motion when music plays.
- **Dynamic Roadside Scenery**:
  - Distance-scaled kilometer milestone stones (e.g. *NH-48 • Jaipur 140 KM / Mumbai 380 KM*).
  - Overhead highway electric light poles, streetlamps, and roadside trees.
  - Distant multi-layered mountain silhouettes with atmospheric depth.
  - Approaching oncoming vehicles with high-beam halogen headlights emerging from the horizon.
- **Windshield Rain & Dynamic Dual Mechanical Wipers**:
  - Overcast storm sky with dark rain clouds and procedural falling rain droplets.
  - Dual synchronized mechanical wiper blades wiping water streaks across the windshield.
  - Hanging dashboard evil-eye amulet swaying with smooth cursor and acceleration physics.
- **Authentic Village Barbershop Interior**:
  - Continuous retro gamthi striped wallpaper and lower teak wood wainscoting spanning the full width of the canvas.
  - Gilded salon mirror with realistic reflection glints.
  - Continuously rotating 3D barber pole with helical red, white, and blue ribbons.
  - Handcrafted barbershop accessories: Barbicide comb jar, shaving cream mug, straight razor, and talcum powder.
  - Authentic red & gold shop fascia signboard: *"DELUXE GENTLEMEN'S HAIR SALON & SHAVING • EST. 1994"*.

### 2. Real-Time Procedural Web Audio API Synthesizer
Zero external audio sample downloads are needed for core tactile effects — all sounds are synthesized mathematically on the fly:
- **Bus Driver Soundboard**:
  - **Song Hook Melodic Air Horn**: Extracts the iconic melody hook of the currently playing track and chimes it through a custom Web Audio filter graph (peaking EQ at 340Hz, +5.8dB, WaveShaper diaphragm saturation, and dual-tap spatial delay).
  - **Single Passing Dipper Horn**: Quick high-low highway overtaker alert.
  - **Sharp City Clipper**: Crisp short pneumatic bursts.
  - **Reverse Siren**: Retro rhythmic reversing warning siren.
  - **Diesel Engine Idle & Cruise**: Low-frequency pink noise + pulse oscillator with sub-harmonic throttle modulation.
- **Deluxe Saloon Soundboard**:
  - **Dual-Blade Metallic Scissor Snips**: High-pass filtered noise bursts paired with twin metal resonance ringers.
  - **Pressurized Water Spritzer Mist**: White noise bursts shaped with an exponential volume decay envelope.
  - **Head Massage Machine Vibrator**: Low 120Hz square-wave modulation with harmonic buzzing overtones.
  - **Ceiling Fan Motor Hum & Drone**: Warm 50Hz hum combined with subtle blade-whoosh modulation.

### 3. Curated 91-Track Radio Station Library
Includes 91 verified, active YouTube stream tracks across 12 station channels:

#### Bus Driver Stations:
1. **NH-48 Midnight Sleeper** (11 tracks) — Soulful late-night road trip anthems (*Tum Se Hi*, *Kun Faya Kun*, *Pee Loon*, *Aao Milo Chalo*).
2. **Gulzar Ghazals** (11 tracks) — Timeless ghazals and poetic gems penned by Gulzar (*Tujhse Naraz Nahin*, *Mera Kuchh Saaman*, *Hazaaron Khwahishein Aisi*).
3. **Manache Ghaav** (10 tracks) — Deeply emotional, poignant Marathi sad songs (*Kadhi Tu*, *Majhya Mana*, *Mee Sindhutai Sapkal*).
4. **Highway Dhaba Beats** (5 tracks) — High-octane bhangra and dhaba anthems (*Tunak Tunak Tun*, *Gud Naal Ishq Mitha*).
5. **Monsoon Highway & Rain** (4 tracks) — Atmospheric monsoon road ballads (*Rimjhim Gire Sawan*, *Barso Re*).
6. **Bhojpuri Garda** (5 tracks) — Traditional earthy countryside transport hits.

#### Deluxe Saloon Stations:
1. **Deluxe 90s Romance** (11 tracks) — Nostalgic cassette classics (*Chura Ke Dil Mera*, *Tip Tip Barsa Paani*, *Bahon Ke Darmiyan*).
2. **Gulzar Ghazals** (11 tracks) — Soul-stirring poetry for leisurely haircut afternoons.
3. **Manache Ghaav** (10 tracks) — Melancholic Marathi masterpieces.
4. **Sunday Morning Session** (5 tracks) — Relaxing ragas and morning classical instrumentals.
5. **Heartbreak Melodies** (4 tracks) — Melancholic transistor radio classics.
6. **Vintage Transistor Radio** (4 tracks) — Kishore Kumar and R.D. Burman 70s golden hits.

### 4. Souvenir Passenger Ticket & Saloon Bill Generator
Generate, preview, print, or download high-resolution canvas receipts:
- **Interstate Bus Passenger Ticket**: Complete with PNR number, seat number, boarding point, destination, passenger fare (₹), security stamp, and retro bus authority crest.
- **Deluxe Saloon Invoice & Bill**: Includes Bill Number, barber master name, itemized services (Haircut, Shave, Head Massage), total in Indian Rupees (₹), and authorized signature stamp.
- **Export Formats**: One-click PNG image download or browser print layout.

### 5. Custom Track & YouTube URL Loader
Paste any YouTube link, Short, or 11-character video ID into the custom track modal to listen to your personal favorite playlists while enjoying the highway or barbershop environments.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Space</kbd> | Toggle Play / Pause |
| <kbd>D</kbd> or <kbd>→</kbd> | Next Track |
| <kbd>A</kbd> or <kbd>←</kbd> | Previous Track |
| <kbd>S</kbd> | Switch Mode (**Bus Driver** ⇄ **Deluxe Saloon**) |
| <kbd>H</kbd> | Trigger Pressure Air Horn (Driver) / Scissor Snip (Saloon) |
| <kbd>M</kbd> | Toggle Mute / Unmute |
| <kbd>?</kbd> | Open Settings & Audio Ducking Preferences |
| <kbd>Esc</kbd> | Close Active Modal / Drawer |

---

## 🏗️ Architecture & Project Structure

```
Safar-And-Saloon/
├── index.html                 # Main application layout, semantic DOM & modals
├── package.json               # Node.js project manifest & start script
├── server.js                  # Native zero-dependency static HTTP server
├── README.md                  # Comprehensive project documentation
├── AI_STUDIO_EXPORT.md        # Prompt & context export for Google AI Studio
├── Playlist                   # Consolidated all-in-one codebase file
├── Playlist.md                # Formatted markdown codebase archive
├── Playlist.txt               # Plaintext codebase archive
├── css/
│   └── styles.css             # Design tokens, glassmorphic UI, animations, themes
├── fonts/
│   ├── OFL.txt                # Open Font License
│   ├── README.txt             # Font documentation
│   ├── BigShoulders-VariableFont_opsz,wght.ttf
│   └── static/                # Big Shoulders static weights (Black, Bold, Light, etc.)
├── js/
│   ├── app.js                 # Central controller, UI bindings, ticket generator
│   ├── audioEngine.js         # Procedural Web Audio synthesizer (engine, fan, mist, snip)
│   ├── player.js              # YouTube IFrame API audio bridge & resilient playback
│   ├── playlistData.js        # 91 curated tracks across 12 radio stations
│   ├── pressureHorn.js        # Multi-tone highway air horn synthesizer
│   └── visuals.js             # 60 FPS HTML5 Canvas engine (Highway 3D & Saloon interior)
├── sounds/
│   ├── classic_single_tone.wav
│   ├── reverse_siren.wav
│   ├── sharp_city_clipper.wav
│   └── triple_tone_alternating.wav
└── scripts/
    ├── create_playlist_file.js # Generator for single-file codebase bundle
    ├── find_tracks.js          # Track search utility
    ├── patch_visuals.js        # Visual layer enhancement script
    ├── run_track_fetch.js      # YouTube track validator
    ├── update_playlist_data.js # Station metadata sync
    └── verified_tracks.json    # JSON cache of verified YouTube streams
```

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser with HTML5 Canvas and Web Audio API support (Chrome, Edge, Firefox, Safari).
- [Node.js](https://nodejs.org/) (v16 or newer recommended) or any static HTTP server.

### Local Installation & Launch

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbhijeetGoswami-07/Safar-And-Saloon.git
   cd Safar-And-Saloon
   ```

2. **Start the local server:**
   ```bash
   npm start
   # or run directly:
   node server.js
   ```

3. **Open the application:**
   Navigate to `http://localhost:3000` in your web browser.

> [!TIP]
> You can also run the project with Python:
> ```bash
> python -m http.server 3000
> ```
> Or use the VS Code **Live Server** extension on `index.html`.

---

## 🎨 Design System & Accessibility

- **Typography**: Display headlines powered by **Big Shoulders** (`font-big-shoulders`, weights 700 to 900) for authentic retro highway milestone and vintage Indian shop signage aesthetics.
- **Glassmorphism**: Backdrop blur overlays with high-contrast pill badges ensure readable navigation above dynamic road headlights and mirror reflections.
- **Strict English UI**: Clean, standardized typography with zero emojis in visible UI elements (pure Lucide SVG iconography).
- **Audio Ducking**: Procedural sound effects (horns, scissors, engine revs) automatically duck background music volume by 35% to 55% for realistic acoustic presence.
- **Hardware Acceleration**: Canvas rendering executes on `requestAnimationFrame` with normalized delta-time (`dtScale`) to guarantee buttery-smooth 60 FPS across both 60Hz and 120Hz/144Hz displays.

---

## 🤝 Contributing

Contributions, bug reports, and station suggestions are warmly welcome!
1. Fork the Project (`https://github.com/AbhijeetGoswami-07/Safar-And-Saloon/fork`)
2. Create your Feature Branch (`git checkout -b feature/NewStation`)
3. Commit your Changes (`git commit -m "Add new retro station"`)
4. Push to the Branch (`git push origin feature/NewStation`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Crafted with nostalgic love for Indian highway journeys and retro village barbershop mornings.</sub><br>
  <strong>Horn OK Please • Safar Shubh Ho</strong>
</div>

```


/* ============================================================================== */
/* FILE: AI_STUDIO_EXPORT.md */
/* ============================================================================== */

```markdown:AI_STUDIO_EXPORT.md
# Safar & Saloon — Google AI Studio Project Context & Instructions

Copy this entire prompt or upload this document into [Google AI Studio](https://aistudio.google.com/) to continue development with full context.

---

## 1. System Instructions (Paste into "System Instructions" in Google AI Studio)

```markdown
You are an expert full-stack developer, Web Audio engineer, and UI/UX designer assisting with the "Safar & Saloon" project.

### Project Overview:
"Safar & Saloon" is a dual-mode retro Indian radio web application:
1. Bus Driver Mode (Highway Cabin): 3D perspective animated highway canvas (NH-48 interstate corridor), real-time day/night sync with headlight road illumination, procedural pressure air horns with Web Audio realism pipeline (spatial delay, diaphragm saturation, body resonance filter, audio ducking), and roadside milestone markers.
2. Deluxe Saloon Mode (Barbershop Lounge): Authentically illustrated vintage village barbershop scene with mirror aligned to customer/barber height, 3-blade vintage ceiling fan with dynamic rotation and wall shadow, barber trigger water mist spray bottle with interactive aerosol particles, barber in authentic attire (collared shirt, pocket comb, gamcha towel, straight razor), and 3 waiting patrons on a timber bench.

### Strict Project Constraints:
- English-only user interface.
- Zero emojis across the entire user interface. Use clean Lucide SVG icons.
- Indian Rupee currency (₹) for all invoices and receipts.
- Maintain responsive layout across mobile (360px-430px), tablet (768px-1024px), and desktop (1280px+).
- Web Audio API and YouTube IFrame API audio bridge architecture.
```

---

## 2. File Inventory & Architecture

- **`index.html`**: Semantic HTML5 layout, Tailwind CSS, Lucide SVG icons, modal dialogs (Station Library Drawer, Dashboard Settings, Custom YouTube Video Form, Souvenir Ticket/Receipt).
- **`css/styles.css`**: Dual-theme CSS variables (`--bg-core`, `--accent-primary`), glassmorphism, responsive styles, `:focus-visible`, reduced motion, and print styles.
- **`server.js`**: Native Node.js HTTP server serving static assets on `http://localhost:3000`.
- **`js/app.js`**: Main UI controller, keyboard shortcuts (`Space`, `A`, `D`, `H`, `M`, `S`, `?`), modal triggers, volume synchronization, and tactile soundboard bindings.
- **`js/player.js`**: YouTube IFrame API audio bridge, volume ducking, sleep timer, track seek, shuffle, repeat, and custom YouTube URL parser (`extractYouTubeId`).
- **`js/visuals.js`**: 60 FPS HTML5 Canvas engine rendering both the 3D perspective Highway and the Deluxe Saloon Barbershop with rotating ceiling fan, spray mist, and animated barber.
- **`js/pressureHorn.js`**: Modular Web Audio API pressure horn synthesizer with low-mid peaking filter (340Hz, +5.8dB), WaveShaper diaphragm distortion, dual-tap spatial delay (68ms/128ms), 4 fallback audio buffers, and smart song hook mapper.
- **`js/audioEngine.js`**: Procedural sound synthesizer for ambient rain, diesel engine rumble, ceiling fan drone, scissors snips, and spray bottle spritz.
- **`js/playlistData.js`**: Verified playlist database containing 9 stations and 61 tracks across Hindi retro classics, Marathi Tadka, and Bhojpuri Garda.

---

## 3. Quick Run Command
```bash
node server.js
```
Local URL: `http://localhost:3000`

```


/* ============================================================================== */
/* FILE: scripts/patch_visuals.js */
/* ============================================================================== */

```javascript:scripts/patch_visuals.js
const fs = require('fs');
let code = fs.readFileSync('js/visuals.js', 'utf8');

const startIdx = code.indexOf('    // 8. RUSTIC TIMBER ROOF AWNING & FASCIAS');
const endIdx = code.indexOf('    // 9. VINTAGE ROTATING BARBER POLE');

if (startIdx !== -1 && endIdx !== -1) {
  const target = code.substring(startIdx, endIdx);
  const replacement = `    // 8. VINTAGE DELUXE SALOON FASCIAS & SIGNBOARD
    ctx.save();
    const fasciaW = Math.min(w * 0.88, 860);
    const fasciaX = (w - fasciaW) / 2;
    const fasciaY = Math.max(16, roofY - 26);

    // Weathered Corrugated Zinc Roof Overhang behind Signboard
    const zincGrad = ctx.createLinearGradient(0, fasciaY - 14, 0, fasciaY);
    zincGrad.addColorStop(0, '#52525b');
    zincGrad.addColorStop(0.5, '#71717a');
    zincGrad.addColorStop(1, '#27272a');
    ctx.fillStyle = zincGrad;
    ctx.beginPath();
    ctx.moveTo(fasciaX - 12, fasciaY + 4);
    ctx.lineTo(fasciaX + 12, fasciaY - 14);
    ctx.lineTo(fasciaX + fasciaW - 12, fasciaY - 14);
    ctx.lineTo(fasciaX + fasciaW + 12, fasciaY + 4);
    ctx.closePath();
    ctx.fill();

    // Red Fascia Signboard with Gold Border
    ctx.fillStyle = '#991b1b';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(fasciaX, fasciaY, fasciaW, 26, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 11.5px sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText("DELUXE GENTLEMEN'S HAIR SALON & SHAVING • EST. 1994", w * 0.5, fasciaY + 17);
    ctx.restore();

`;
  code = code.replace(target, replacement);
  fs.writeFileSync('js/visuals.js', code);
  console.log('Replaced section 8 successfully!');
} else {
  console.log('Not found:', startIdx, endIdx);
}

```


/* ============================================================================== */
/* FILE: scripts/find_tracks.js */
/* ============================================================================== */

```javascript:scripts/find_tracks.js
const https = require('https');

function searchYouTube(query) {
  return new Promise((resolve) => {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        const matches1 = [...body.matchAll(/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        const matches2 = [...body.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
        const combined = [...new Set([...matches1, ...matches2])];
        resolve(combined.slice(0, 10));
      });
    }).on('error', () => resolve([]));
  });
}

function verifyId(id) {
  return new Promise((resolve) => {
    https.get('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + id + '&format=json', (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const j = JSON.parse(d);
            resolve({ valid: true, id, title: j.title, author: j.author_name });
          } catch (e) {
            resolve({ valid: false });
          }
        } else {
          resolve({ valid: false });
        }
      });
    }).on('error', () => resolve({ valid: false }));
  });
}

async function findBestTrack(query) {
  const ids = await searchYouTube(query);
  for (const id of ids) {
    const res = await verifyId(id);
    if (res.valid) {
      return res;
    }
  }
  return null;
}

module.exports = { findBestTrack };

```


/* ============================================================================== */
/* FILE: scripts/run_track_fetch.js */
/* ============================================================================== */

```javascript:scripts/run_track_fetch.js
const { findBestTrack } = require('./find_tracks');
const fs = require('fs');

const gulzarQueries = [
  { title: "Tujhse Naraz Nahin Zindagi", query: "Tujhse Naraz Nahin Zindagi Masoom Gulzar official", movie: "Masoom (1983)", artist: "Anup Ghoshal, Lata Mangeshkar", tag: "Gulzar Masterpiece", duration: "5:41" },
  { title: "Tere Bina Zindagi Se Koi", query: "Tere Bina Zindagi Se Koi Aandhi Kishore Kumar Lata Gulzar", movie: "Aandhi (1975)", artist: "Kishore Kumar, Lata Mangeshkar", tag: "Soulful Ghazal", duration: "5:52" },
  { title: "Woh Shaam Kuchh Ajeeb Thi", query: "Woh Shaam Kuchh Ajeeb Thi Khamoshi Kishore Kumar Gulzar", movie: "Khamoshi (1969)", artist: "Kishore Kumar", tag: "Poetic Solitude", duration: "4:46" },
  { title: "Mera Kuchh Saamaan", query: "Mera Kuchh Saamaan Ijaazat Asha Bhosle Gulzar", movie: "Ijaazat (1987)", artist: "Asha Bhosle", tag: "National Award Winner", duration: "6:05" },
  { title: "Shaam Se Aankh Mein Nami Si Hai", query: "Shaam Se Aankh Mein Nami Si Hai Jagjit Singh Gulzar Marasim", movie: "Marasim (1999)", artist: "Jagjit Singh, Gulzar", tag: "Acoustic Ghazal", duration: "5:22" },
  { title: "Haath Chhoote Bhi Toh", query: "Haath Chhoote Bhi Toh Rishtey Nahi Chhoota Karte Jagjit Singh Gulzar", movie: "Marasim (1999)", artist: "Jagjit Singh, Gulzar", tag: "Marasim Classic", duration: "5:18" },
  { title: "Dil Dhoondta Hai Phir Wohi", query: "Dil Dhoondta Hai Phir Wohi Fursat Ke Raat Din Bhupinder Gulzar", movie: "Mausam (1975)", artist: "Bhupinder Singh, Lata Mangeshkar", tag: "Timeless Poetry", duration: "4:15" },
  { title: "Do Deewane Shahar Mein", query: "Do Deewane Shahar Mein Ghar Bhupinder Runa Laila Gulzar", movie: "Ghar (1978)", artist: "Bhupinder Singh, Runa Laila", tag: "Monsoon Ghazal", duration: "4:50" },
  { title: "Naam Gum Jayega", query: "Naam Gum Jayega Kinara Lata Bhupinder Gulzar", movie: "Kinara (1977)", artist: "Lata Mangeshkar, Bhupinder Singh", tag: "Everlasting Identity", duration: "5:25" },
  { title: "Aap Ki Ankhon Mein Kuch", query: "Aap Ki Ankhon Mein Kuch Mehke Hue Ghar Kishore Lata Gulzar", movie: "Ghar (1978)", artist: "Kishore Kumar, Lata Mangeshkar", tag: "Pure Romanticism", duration: "4:10" },
  { title: "Is Mod Se Jaate Hain", query: "Is Mod Se Jaate Hain Aandhi Kishore Lata Gulzar", movie: "Aandhi (1975)", artist: "Kishore Kumar, Lata Mangeshkar", tag: "Golden Nostalgia", duration: "4:55" }
];

const marathiSadQueries = [
  { title: "Man Udhan Varyache", query: "Man Udhan Varyache Agga Bai Arrecha Shankar Mahadevan Ajay Atul", movie: "Agga Bai Arrecha (2004)", artist: "Shankar Mahadevan, Ajay-Atul", tag: "Heartache Classic", duration: "5:12" },
  { title: "Kiti Sangayche Mala", query: "Kiti Sangayche Mala Double Seat Jasraj Joshi Anandi Joshi", movie: "Double Seat (2015)", artist: "Jasraj Joshi, Anandi Joshi", tag: "Deep Sorrow", duration: "4:48" },
  { title: "Kadhi Tu Rimjhim Zharanari", query: "Kadhi Tu Rimjhim Zharanari Barsat Sandeep Khare Saleel Kulkarni", movie: "Ayushyavar Bolu Kahi", artist: "Saleel Kulkarni, Sandeep Khare", tag: "Melancholic Poetry", duration: "5:30" },
  { title: "Mee Raat Takali", query: "Mee Raat Takali Jait Re Jait Lata Mangeshkar Hridaynath", movie: "Jait Re Jait (1977)", artist: "Lata Mangeshkar", tag: "Heartbreak Folklore", duration: "4:22" },
  { title: "Jeevalaga Rahile Re Door", query: "Jeevalaga Rahile Re Door Ghar Majhe Lata Mangeshkar", movie: "Bhavgeet Classic", artist: "Lata Mangeshkar, Sudhir Phadke", tag: "Wounds of Heart", duration: "4:15" },
  { title: "Deva Tujhya Gabharyala", query: "Deva Tujhya Gabharyala Duniyadari Adarsh Shinde", movie: "Duniyadari (2013)", artist: "Adarsh Shinde, Kirti Killedar", tag: "Soulful Agony", duration: "4:35" },
  { title: "Shravanat Ghan Neela", query: "Shravanat Ghan Neela Barasla Lata Mangeshkar", movie: "Marathi Bhavgeet", artist: "Lata Mangeshkar, Hridaynath Mangeshkar", tag: "Poignant Rain", duration: "4:40" },
  { title: "Usavale Dhaage", query: "Usavale Dhaage Kaksparsh Rahul Ranade", movie: "Kaksparsh (2012)", artist: "Hamsika Iyer, Rahul Ranade", tag: "Emotional Solitude", duration: "4:50" }
];

const saloonFixQueries = [
  { title: "Mera Dil Bhi Kitna Pagal Hai", query: "Mera Dil Bhi Kitna Pagal Hai Saajan Kumar Sanu Alka", movie: "Saajan (1991)", artist: "Kumar Sanu, Alka Yagnik", tag: "Kumar Sanu Gold", duration: "5:25" },
  { title: "Dheere Dheere Se Meri Zindagi", query: "Dheere Dheere Se Meri Zindagi Aashiqui Kumar Sanu Anuradha", movie: "Aashiqui (1990)", artist: "Kumar Sanu, Anuradha Paudwal", tag: "Nadeem-Shravan", duration: "5:30" },
  { title: "Nazar Ke Samne Jigar Ke Paas", query: "Nazar Ke Samne Jigar Ke Paas Aashiqui Kumar Sanu", movie: "Aashiqui (1990)", artist: "Kumar Sanu, Anuradha Paudwal", tag: "Vintage Masterpiece", duration: "5:36" },
  { title: "Tujhe Dekha Toh Yeh Jaana Sanam", query: "Tujhe Dekha Toh Yeh Jaana Sanam DDLJ Kumar Sanu Lata", movie: "DDLJ (1995)", artist: "Kumar Sanu, Lata Mangeshkar", tag: "90s Romance", duration: "5:04" },
  { title: "Ek Ladki Ko Dekha Toh Aisa Laga", query: "Ek Ladki Ko Dekha Toh Aisa Laga 1942 Kumar Sanu", movie: "1942: A Love Story (1994)", artist: "Kumar Sanu", tag: "Acoustic Melody", duration: "4:36" },
  { title: "Aaye Ho Meri Zindagi Mein", query: "Aaye Ho Meri Zindagi Mein Udit Narayan Raja Hindustani", movie: "Raja Hindustani (1996)", artist: "Udit Narayan", tag: "Saloon Special", duration: "6:02" },
  { title: "Pardesi Pardesi Jaana Nahi", query: "Pardesi Pardesi Jaana Nahi Raja Hindustani Udit Alka", movie: "Raja Hindustani (1996)", artist: "Udit Narayan, Alka Yagnik", tag: "Everlasting", duration: "7:31" },
  { title: "Tumse Milne Ko Dil Karta Hai", query: "Tumse Milne Ko Dil Karta Hai Phool Aur Kaante Kumar Sanu", movie: "Phool Aur Kaante (1991)", artist: "Kumar Sanu, Alka Yagnik", tag: "Retro Classic", duration: "5:32" },
  { title: "Kuch Kuch Hota Hai", query: "Kuch Kuch Hota Hai Title Song Udit Narayan Alka Yagnik", movie: "Kuch Kuch Hota Hai (1998)", artist: "Udit Narayan, Alka Yagnik", tag: "Pure 90s", duration: "4:56" },
  { title: "Suraj Hua Maddham", query: "Suraj Hua Maddham K3G Sonu Nigam Alka Yagnik", movie: "K3G (2001)", artist: "Sonu Nigam, Alka Yagnik", tag: "Timeless", duration: "7:08" },
  { title: "Pehla Nasha", query: "Pehla Nasha Jo Jeeta Wohi Sikandar Udit Sadhana", movie: "Jo Jeeta Wohi Sikandar (1992)", artist: "Udit Narayan, Sadhana Sargam", tag: "Slow Romance", duration: "4:52" },
  { title: "Chura Liya Hai Tumne Jo Dil Ko", query: "Chura Liya Hai Tumne Jo Dil Ko Yaadon Ki Baaraat Asha Rafi", movie: "Yaadon Ki Baaraat (1973)", artist: "Asha Bhosle, Mohd Rafi", tag: "Evergreen", duration: "4:48" },
  { title: "Yeh Shaam Mastani", query: "Yeh Shaam Mastani Kati Patang Kishore Kumar", movie: "Kati Patang (1971)", artist: "Kishore Kumar", tag: "Retro Warmth", duration: "4:38" },
  { title: "Tumko Dekha Toh Yeh Khayal Aaya", query: "Tumko Dekha Toh Yeh Khayal Aaya Saath Saath Jagjit Singh", movie: "Saath Saath (1982)", artist: "Jagjit Singh, Chitra Singh", tag: "Acoustic Ghazal", duration: "4:50" }
];

async function runAll() {
  const results = { gulzar: [], marathiSad: [], saloonFix: [] };
  
  console.log('--- Fetching Gulzar Ghazals ---');
  for (const item of gulzarQueries) {
    const res = await findBestTrack(item.query);
    if (res) {
      console.log('✓ Found:', item.title, '->', res.id, '(' + res.title + ')');
      results.gulzar.push({
        id: res.id,
        title: item.title,
        artist: item.artist,
        movie: item.movie,
        duration: item.duration,
        thumb: `https://img.youtube.com/vi/${res.id}/hqdefault.jpg`,
        tag: item.tag
      });
    } else {
      console.log('✗ NOT FOUND:', item.title);
    }
  }

  console.log('--- Fetching Manache Ghaav Marathi Sad Songs ---');
  for (const item of marathiSadQueries) {
    const res = await findBestTrack(item.query);
    if (res) {
      console.log('✓ Found:', item.title, '->', res.id, '(' + res.title + ')');
      results.marathiSad.push({
        id: res.id,
        title: item.title,
        artist: item.artist,
        movie: item.movie,
        duration: item.duration,
        thumb: `https://img.youtube.com/vi/${res.id}/hqdefault.jpg`,
        tag: item.tag
      });
    } else {
      console.log('✗ NOT FOUND:', item.title);
    }
  }

  console.log('--- Fetching Saloon Fix Tracks ---');
  for (const item of saloonFixQueries) {
    const res = await findBestTrack(item.query);
    if (res) {
      console.log('✓ Found:', item.title, '->', res.id, '(' + res.title + ')');
      results.saloonFix.push({
        id: res.id,
        title: item.title,
        artist: item.artist,
        movie: item.movie,
        duration: item.duration,
        thumb: `https://img.youtube.com/vi/${res.id}/hqdefault.jpg`,
        tag: item.tag
      });
    } else {
      console.log('✗ NOT FOUND:', item.title);
    }
  }

  fs.writeFileSync('scripts/verified_tracks.json', JSON.stringify(results, null, 2));
  console.log('Saved verified tracks to scripts/verified_tracks.json');
}

runAll();

```


/* ============================================================================== */
/* FILE: scripts/update_playlist_data.js */
/* ============================================================================== */

```javascript:scripts/update_playlist_data.js
const fs = require('fs');

const gulzarTracks = [
  {
    id: "_UEpGEXcMn4",
    title: "Tujhse Naraz Nahin Zindagi",
    artist: "Anup Ghoshal, Lata Mangeshkar",
    movie: "Masoom (1983)",
    duration: "5:41",
    thumb: "https://img.youtube.com/vi/_UEpGEXcMn4/hqdefault.jpg",
    tag: "Gulzar Masterpiece"
  },
  {
    id: "Zm4V6ty4K6k",
    title: "Tere Bina Zindagi Se Koi",
    artist: "Kishore Kumar, Lata Mangeshkar",
    movie: "Aandhi (1975)",
    duration: "5:52",
    thumb: "https://img.youtube.com/vi/Zm4V6ty4K6k/hqdefault.jpg",
    tag: "Soulful Ghazal"
  },
  {
    id: "MDXFi3avqo0",
    title: "Woh Shaam Kuchh Ajeeb Thi",
    artist: "Kishore Kumar",
    movie: "Khamoshi (1969)",
    duration: "4:46",
    thumb: "https://img.youtube.com/vi/MDXFi3avqo0/hqdefault.jpg",
    tag: "Poetic Solitude"
  },
  {
    id: "XUexH7Xk1yk",
    title: "Mera Kuchh Saamaan",
    artist: "Asha Bhosle",
    movie: "Ijaazat (1987)",
    duration: "6:05",
    thumb: "https://img.youtube.com/vi/XUexH7Xk1yk/hqdefault.jpg",
    tag: "National Award Winner"
  },
  {
    id: "3UsReAi_LIU",
    title: "Shaam Se Aankh Mein Nami Si Hai",
    artist: "Jagjit Singh, Gulzar",
    movie: "Marasim (1999)",
    duration: "5:22",
    thumb: "https://img.youtube.com/vi/3UsReAi_LIU/hqdefault.jpg",
    tag: "Acoustic Ghazal"
  },
  {
    id: "Q87TZLzRfwU",
    title: "Haath Chhoote Bhi Toh",
    artist: "Jagjit Singh, Gulzar",
    movie: "Marasim (1999)",
    duration: "5:18",
    thumb: "https://img.youtube.com/vi/Q87TZLzRfwU/hqdefault.jpg",
    tag: "Marasim Classic"
  },
  {
    id: "WKP5cqQvUBg",
    title: "Dil Dhoondta Hai Phir Wohi",
    artist: "Bhupinder Singh, Lata Mangeshkar",
    movie: "Mausam (1975)",
    duration: "4:15",
    thumb: "https://img.youtube.com/vi/WKP5cqQvUBg/hqdefault.jpg",
    tag: "Timeless Poetry"
  },
  {
    id: "uLi3WcON1CU",
    title: "Do Deewane Shahar Mein",
    artist: "Bhupinder Singh, Runa Laila",
    movie: "Ghar (1978)",
    duration: "4:50",
    thumb: "https://img.youtube.com/vi/uLi3WcON1CU/hqdefault.jpg",
    tag: "Monsoon Ghazal"
  },
  {
    id: "lySbCeZjVlw",
    title: "Naam Gum Jayega",
    artist: "Lata Mangeshkar, Bhupinder Singh",
    movie: "Kinara (1977)",
    duration: "5:25",
    thumb: "https://img.youtube.com/vi/lySbCeZjVlw/hqdefault.jpg",
    tag: "Everlasting Identity"
  },
  {
    id: "dmm5lM9BR8o",
    title: "Aap Ki Ankhon Mein Kuch",
    artist: "Kishore Kumar, Lata Mangeshkar",
    movie: "Ghar (1978)",
    duration: "4:10",
    thumb: "https://img.youtube.com/vi/dmm5lM9BR8o/hqdefault.jpg",
    tag: "Pure Romanticism"
  },
  {
    id: "Efx7BIzMEPI",
    title: "Is Mod Se Jaate Hain",
    artist: "Kishore Kumar, Lata Mangeshkar",
    movie: "Aandhi (1975)",
    duration: "4:55",
    thumb: "https://img.youtube.com/vi/Efx7BIzMEPI/hqdefault.jpg",
    tag: "Golden Nostalgia"
  }
];

const marathiSadTracks = [
  {
    id: "2JZTIVd4XN0",
    title: "Man Udhan Varyache",
    artist: "Shankar Mahadevan, Ajay-Atul",
    movie: "Agga Bai Arrecha (2004)",
    duration: "5:12",
    thumb: "https://img.youtube.com/vi/2JZTIVd4XN0/hqdefault.jpg",
    tag: "Heartache Classic"
  },
  {
    id: "3zdCPhX7ah4",
    title: "Kiti Sangaychay Mala",
    artist: "Jasraj Joshi, Anandi Joshi",
    movie: "Double Seat (2015)",
    duration: "4:48",
    thumb: "https://img.youtube.com/vi/3zdCPhX7ah4/hqdefault.jpg",
    tag: "Deep Sorrow"
  },
  {
    id: "Y4TICMyl9Eg",
    title: "Kadhi Tu Rimjhim Zharanari",
    artist: "Saleel Kulkarni, Sandeep Khare",
    movie: "Mumbai Pune Mumbai (2010)",
    duration: "5:30",
    thumb: "https://img.youtube.com/vi/Y4TICMyl9Eg/hqdefault.jpg",
    tag: "Melancholic Rain"
  },
  {
    id: "cRKNTAbnYRs",
    title: "Deva Tujhya Gabharyala",
    artist: "Adarsh Shinde, Kirti Killedar",
    movie: "Duniyadari (2013)",
    duration: "4:35",
    thumb: "https://img.youtube.com/vi/cRKNTAbnYRs/hqdefault.jpg",
    tag: "Soulful Agony"
  },
  {
    id: "OkNLme6dCsE",
    title: "Mee Raat Takali",
    artist: "Lata Mangeshkar",
    movie: "Jait Re Jait (1977)",
    duration: "4:22",
    thumb: "https://img.youtube.com/vi/OkNLme6dCsE/hqdefault.jpg",
    tag: "Heartbreak Folklore"
  },
  {
    id: "DQNxigVPh1s",
    title: "Jeevalaga Rahile Re Door",
    artist: "Lata Mangeshkar, Sudhir Phadke",
    movie: "Bhavgeet Classic",
    duration: "4:15",
    thumb: "https://img.youtube.com/vi/DQNxigVPh1s/hqdefault.jpg",
    tag: "Wounds of Heart"
  },
  {
    id: "I9Ehun8Ahk4",
    title: "Shravanat Ghan Neela",
    artist: "Lata Mangeshkar, Hridaynath Mangeshkar",
    movie: "Marathi Bhavgeet",
    duration: "4:40",
    thumb: "https://img.youtube.com/vi/I9Ehun8Ahk4/hqdefault.jpg",
    tag: "Poignant Rain"
  },
  {
    id: "UXJF8e90Nxc",
    title: "Usavale Dhaage",
    artist: "Hamsika Iyer, Rahul Ranade",
    movie: "Mangalashtak Once More (2013)",
    duration: "4:50",
    thumb: "https://img.youtube.com/vi/UXJF8e90Nxc/hqdefault.jpg",
    tag: "Emotional Solitude"
  },
  {
    id: "0wWF0Lons_A",
    title: "Tula Pahate Re",
    artist: "Zee Marathi Special",
    movie: "Tula Pahate Re (2018)",
    duration: "4:20",
    thumb: "https://img.youtube.com/vi/0wWF0Lons_A/hqdefault.jpg",
    tag: "Haunting Melancholy"
  },
  {
    id: "OU1fvtWggBk",
    title: "Atasha Ase He Mala Kay Hote",
    artist: "Sandeep Khare, Saleel Kulkarni",
    movie: "Ayushyavar Bolu Kahi",
    duration: "5:05",
    thumb: "https://img.youtube.com/vi/OU1fvtWggBk/hqdefault.jpg",
    tag: "Soulful Separation"
  }
];

const deluxeRomanceTracks = [
  {
    id: "RVQsBlI35vw",
    title: "Mera Dil Bhi Kitna Pagal Hai",
    artist: "Kumar Sanu, Alka Yagnik",
    movie: "Saajan (1991)",
    duration: "5:25",
    thumb: "https://img.youtube.com/vi/RVQsBlI35vw/hqdefault.jpg",
    tag: "Kumar Sanu Gold"
  },
  {
    id: "KeyfUuXPOcY",
    title: "Dheere Dheere Se Meri Zindagi",
    artist: "Kumar Sanu, Anuradha Paudwal",
    movie: "Aashiqui (1990)",
    duration: "5:30",
    thumb: "https://img.youtube.com/vi/KeyfUuXPOcY/hqdefault.jpg",
    tag: "Nadeem-Shravan"
  },
  {
    id: "uNt18l9UfjE",
    title: "Nazar Ke Samne Jigar Ke Paas",
    artist: "Kumar Sanu, Anuradha Paudwal",
    movie: "Aashiqui (1990)",
    duration: "5:36",
    thumb: "https://img.youtube.com/vi/uNt18l9UfjE/hqdefault.jpg",
    tag: "Vintage Masterpiece"
  },
  {
    id: "cNV5hLSa9H8",
    title: "Tujhe Dekha Toh Yeh Jaana Sanam",
    artist: "Kumar Sanu, Lata Mangeshkar",
    movie: "DDLJ (1995)",
    duration: "5:04",
    thumb: "https://img.youtube.com/vi/cNV5hLSa9H8/hqdefault.jpg",
    tag: "90s Romance"
  },
  {
    id: "htMvfOfixuM",
    title: "Ek Ladki Ko Dekha Toh Aisa Laga",
    artist: "Kumar Sanu",
    movie: "1942: A Love Story (1994)",
    duration: "4:36",
    thumb: "https://img.youtube.com/vi/htMvfOfixuM/hqdefault.jpg",
    tag: "Acoustic Melody"
  },
  {
    id: "Mj3KyjuKbqI",
    title: "Aaye Ho Meri Zindagi Mein",
    artist: "Udit Narayan",
    movie: "Raja Hindustani (1996)",
    duration: "6:02",
    thumb: "https://img.youtube.com/vi/Mj3KyjuKbqI/hqdefault.jpg",
    tag: "Saloon Special"
  },
  {
    id: "jspLMtqZFjY",
    title: "Pardesi Pardesi Jaana Nahi",
    artist: "Udit Narayan, Alka Yagnik",
    movie: "Raja Hindustani (1996)",
    duration: "7:31",
    thumb: "https://img.youtube.com/vi/jspLMtqZFjY/hqdefault.jpg",
    tag: "Everlasting"
  },
  {
    id: "5y_TCKNzAMI",
    title: "Tumse Milne Ko Dil Karta Hai",
    artist: "Kumar Sanu, Alka Yagnik",
    movie: "Phool Aur Kaante (1991)",
    duration: "5:32",
    thumb: "https://img.youtube.com/vi/5y_TCKNzAMI/hqdefault.jpg",
    tag: "Retro Classic"
  },
  {
    id: "bKZTnnFU9HA",
    title: "Kuch Kuch Hota Hai",
    artist: "Udit Narayan, Alka Yagnik",
    movie: "Kuch Kuch Hota Hai (1998)",
    duration: "4:56",
    thumb: "https://img.youtube.com/vi/bKZTnnFU9HA/hqdefault.jpg",
    tag: "Pure 90s"
  },
  {
    id: "iqNS2Qe4pp0",
    title: "Suraj Hua Maddham",
    artist: "Sonu Nigam, Alka Yagnik",
    movie: "K3G (2001)",
    duration: "7:08",
    thumb: "https://img.youtube.com/vi/iqNS2Qe4pp0/hqdefault.jpg",
    tag: "Timeless"
  },
  {
    id: "SBfPs-PMGTA",
    title: "Pehla Nasha",
    artist: "Udit Narayan, Sadhana Sargam",
    movie: "Jo Jeeta Wohi Sikandar (1992)",
    duration: "4:52",
    thumb: "https://img.youtube.com/vi/SBfPs-PMGTA/hqdefault.jpg",
    tag: "Slow Romance"
  }
];

const sundayChampiTracks = [
  {
    id: "OgocnLh9P1M",
    title: "Aankh Hai Bhari Bhari",
    artist: "Kumar Sanu",
    movie: "Tum Se Achcha Kaun Hai (2002)",
    duration: "6:58",
    thumb: "https://img.youtube.com/vi/OgocnLh9P1M/hqdefault.jpg",
    tag: "Barber Favourite"
  },
  {
    id: "C9efe0rjDlE",
    title: "Dil Hai Ki Manta Nahin",
    artist: "Kumar Sanu, Anuradha Paudwal",
    movie: "Dil Hai Ke Manta Nahin (1991)",
    duration: "6:10",
    thumb: "https://img.youtube.com/vi/C9efe0rjDlE/hqdefault.jpg",
    tag: "Sweet Classic"
  },
  {
    id: "_IcVb6hFhPs",
    title: "Ghar Se Nikalte Hi",
    artist: "Udit Narayan",
    movie: "Papa Kehte Hain (1996)",
    duration: "6:12",
    thumb: "https://img.youtube.com/vi/_IcVb6hFhPs/hqdefault.jpg",
    tag: "Morning Breeze"
  },
  {
    id: "UCsW7nea7sI",
    title: "Ae Mere Humsafar",
    artist: "Udit Narayan, Alka Yagnik",
    movie: "Qayamat Se Qayamat Tak (1988)",
    duration: "5:58",
    thumb: "https://img.youtube.com/vi/UCsW7nea7sI/hqdefault.jpg",
    tag: "Golden Hit"
  },
  {
    id: "9b0iydtDZLU",
    title: "Waada Raha Sanam",
    artist: "Alka Yagnik, Abhijeet",
    movie: "Khiladi (1992)",
    duration: "6:03",
    thumb: "https://img.youtube.com/vi/9b0iydtDZLU/hqdefault.jpg",
    tag: "Classic Romance"
  }
];

const dardEDilTracks = [
  {
    id: "G7AdjVDBLO8",
    title: "Achha Sila Diya Toone Mere Pyar Ka",
    artist: "Sonu Nigam",
    movie: "Bewafa Sanam (1995)",
    duration: "5:30",
    thumb: "https://img.youtube.com/vi/G7AdjVDBLO8/hqdefault.jpg",
    tag: "Soulful Ballad"
  },
  {
    id: "vRh1bnbZt4M",
    title: "Dil De Diya Hai",
    artist: "Anand Raj Anand",
    movie: "Masti (2004)",
    duration: "5:54",
    thumb: "https://img.youtube.com/vi/vRh1bnbZt4M/hqdefault.jpg",
    tag: "Heartbreak"
  },
  {
    id: "XWKazQwFFdY",
    title: "Tere Dard Se Dil Aabad Raha",
    artist: "Kumar Sanu",
    movie: "Deewana (1992)",
    duration: "4:52",
    thumb: "https://img.youtube.com/vi/XWKazQwFFdY/hqdefault.jpg",
    tag: "90s Drama"
  },
  {
    id: "rXHY4Cv9cA8",
    title: "Ab Tere Bin Jee Lenge Hum",
    artist: "Kumar Sanu",
    movie: "Aashiqui (1990)",
    duration: "5:45",
    thumb: "https://img.youtube.com/vi/rXHY4Cv9cA8/hqdefault.jpg",
    tag: "Melancholic"
  }
];

const vividhBharatiTracks = [
  {
    id: "QnlknU6PPxM",
    title: "Chura Liya Hai Tumne Jo Dil Ko",
    artist: "Asha Bhosle, Mohd Rafi",
    movie: "Yaadon Ki Baaraat (1973)",
    duration: "4:48",
    thumb: "https://img.youtube.com/vi/QnlknU6PPxM/hqdefault.jpg",
    tag: "Evergreen"
  },
  {
    id: "I9Ehun8Ahk4",
    title: "Lag Ja Gale / Shravanat Ghan Neela",
    artist: "Lata Mangeshkar",
    movie: "Classic Recordings",
    duration: "4:20",
    thumb: "https://img.youtube.com/vi/I9Ehun8Ahk4/hqdefault.jpg",
    tag: "Soulful"
  },
  {
    id: "gTy1Dho3bJE",
    title: "Yeh Shaam Mastani",
    artist: "Kishore Kumar",
    movie: "Kati Patang (1971)",
    duration: "4:38",
    thumb: "https://img.youtube.com/vi/gTy1Dho3bJE/hqdefault.jpg",
    tag: "Retro Warmth"
  },
  {
    id: "PnH56Koh_TY",
    title: "Tumko Dekha Toh Yeh Khayal Aaya",
    artist: "Jagjit Singh, Chitra Singh",
    movie: "Saath Saath (1982)",
    duration: "4:50",
    thumb: "https://img.youtube.com/vi/PnH56Koh_TY/hqdefault.jpg",
    tag: "Acoustic Ghazal"
  }
];

// Read existing nh48, dhaba, ghats, and bhojpuri
const nh48Tracks = [
  {
    id: "fvwyPGBOEgY",
    title: "Main Rang Sharbaton Ka",
    artist: "Atif Aslam, Chinmayi",
    movie: "Phata Poster Nikhla Hero",
    duration: "4:23",
    thumb: "https://img.youtube.com/vi/fvwyPGBOEgY/hqdefault.jpg",
    tag: "Midnight Vibe"
  },
  {
    id: "1poX_0u5oZk",
    title: "Tum Se Hi",
    artist: "Mohit Chauhan",
    movie: "Jab We Met",
    duration: "5:23",
    thumb: "https://img.youtube.com/vi/1poX_0u5oZk/hqdefault.jpg",
    tag: "Rainy Cabin"
  },
  {
    id: "x_TzE6fU5Z0",
    title: "Kun Faya Kun",
    artist: "A.R. Rahman, Javed Ali, Mohit Chauhan",
    movie: "Rockstar",
    duration: "7:53",
    thumb: "https://img.youtube.com/vi/x_TzE6fU5Z0/hqdefault.jpg",
    tag: "Sufi Journey"
  },
  {
    id: "jfKfPfyJRdk",
    title: "Kabira (Encore)",
    artist: "Arijit Singh, Harshdeep Kaur",
    movie: "Yeh Jawaani Hai Deewani",
    duration: "4:29",
    thumb: "https://img.youtube.com/vi/jfKfPfyJRdk/hqdefault.jpg",
    tag: "Acoustic"
  },
  {
    id: "Il4dDkCgl_M",
    title: "Pee Loon",
    artist: "Mohit Chauhan",
    movie: "Once Upon a Time in Mumbaai",
    duration: "4:48",
    thumb: "https://img.youtube.com/vi/Il4dDkCgl_M/hqdefault.jpg",
    tag: "Highway Dhaba"
  },
  {
    id: "hLSwL0iLq7c",
    title: "Phir Se Udd Chala",
    artist: "Mohit Chauhan",
    movie: "Rockstar",
    duration: "4:31",
    thumb: "https://img.youtube.com/vi/hLSwL0iLq7c/hqdefault.jpg",
    tag: "Night Glider"
  },
  {
    id: "hbcGx4MGUMg",
    title: "Zara Sa",
    artist: "KK",
    movie: "Jannat",
    duration: "5:03",
    thumb: "https://img.youtube.com/vi/hbcGx4MGUMg/hqdefault.jpg",
    tag: "KK Nostalgia"
  },
  {
    id: "BddP6PYo2gs",
    title: "Kesariya",
    artist: "Arijit Singh",
    movie: "Brahmāstra",
    duration: "4:28",
    thumb: "https://img.youtube.com/vi/BddP6PYo2gs/hqdefault.jpg",
    tag: "Golden Sunset"
  },
  {
    id: "Umqb9KENgmk",
    title: "Raabta (Kehte Hain Khuda)",
    artist: "Arijit Singh",
    movie: "Agent Vinod",
    duration: "4:04",
    thumb: "https://img.youtube.com/vi/Umqb9KENgmk/hqdefault.jpg",
    tag: "Late Hours"
  },
  {
    id: "Q_nL6i_c0zM",
    title: "Tera Ban Jaunga",
    artist: "Akhil Sachdeva, Tulsi Kumar",
    movie: "Kabir Singh",
    duration: "3:56",
    thumb: "https://img.youtube.com/vi/Q_nL6i_c0zM/hqdefault.jpg",
    tag: "Romantic Cruise"
  },
  {
    id: "v8L2tF6z3tY",
    title: "Subhanallah",
    artist: "Sreerama Chandra, Shilpa Rao",
    movie: "Yeh Jawaani Hai Deewani",
    duration: "4:09",
    thumb: "https://img.youtube.com/vi/v8L2tF6z3tY/hqdefault.jpg",
    tag: "Peaceful Cruise"
  },
  {
    id: "V1bFr2KGq1g",
    title: "Ilahi",
    artist: "Arijit Singh",
    movie: "Yeh Jawaani Hai Deewani",
    duration: "3:49",
    thumb: "https://img.youtube.com/vi/V1bFr2KGq1g/hqdefault.jpg",
    tag: "Wanderlust"
  },
  {
    id: "cUmE5yX4R7s",
    title: "Hawayein",
    artist: "Arijit Singh",
    movie: "Jab Harry Met Sejal",
    duration: "4:50",
    thumb: "https://img.youtube.com/vi/cUmE5yX4R7s/hqdefault.jpg",
    tag: "Window Breeze"
  },
  {
    id: "gvyUuxdRdR4",
    title: "Mast Magan",
    artist: "Arijit Singh, Chinmayi",
    movie: "2 States",
    duration: "4:40",
    thumb: "https://img.youtube.com/vi/gvyUuxdRdR4/hqdefault.jpg",
    tag: "Pure Devotion"
  },
  {
    id: "p8fA-NqP97Y",
    title: "Agar Tum Saath Ho",
    artist: "Alka Yagnik, Arijit Singh",
    movie: "Tamasha",
    duration: "5:41",
    thumb: "https://img.youtube.com/vi/p8fA-NqP97Y/hqdefault.jpg",
    tag: "Late Night Heartbreak"
  }
];

const dhabaTracks = [
  {
    id: "h6Ze5Hqa1wA",
    title: "Bolo Ta Ra Ra",
    artist: "Daler Mehndi",
    movie: "Bolo Ta Ra Ra (1995)",
    duration: "4:56",
    thumb: "https://img.youtube.com/vi/h6Ze5Hqa1wA/hqdefault.jpg",
    tag: "Punjabi Gold"
  },
  {
    id: "M3UDnXE8m3A",
    title: "Dardi Rab Rab Kardi",
    artist: "Daler Mehndi",
    movie: "Dardi Rab Rab (1996)",
    duration: "4:50",
    thumb: "https://img.youtube.com/vi/M3UDnXE8m3A/hqdefault.jpg",
    tag: "Highway Favorite"
  },
  {
    id: "fV6m7V75m6M",
    title: "Tunak Tunak Tun",
    artist: "Daler Mehndi",
    movie: "Tunak Tunak Tun (1998)",
    duration: "5:02",
    thumb: "https://img.youtube.com/vi/fV6m7V75m6M/hqdefault.jpg",
    tag: "All-Time Anthem"
  },
  {
    id: "K-pX4qwtAxA",
    title: "Chhaiyya Chhaiyya",
    artist: "Sukhwinder Singh, Sapna Awasthi",
    movie: "Dil Se (1998)",
    duration: "6:54",
    thumb: "https://img.youtube.com/vi/K-pX4qwtAxA/hqdefault.jpg",
    tag: "A.R. Rahman Magic"
  },
  {
    id: "s92u4r4wR0k",
    title: "O O Jaane Jaana",
    artist: "Kamaal Khan",
    movie: "Pyaar Kiya To Darna Kya (1998)",
    duration: "5:46",
    thumb: "https://img.youtube.com/vi/s92u4r4wR0k/hqdefault.jpg",
    tag: "90s Highway Classic"
  },
  {
    id: "G3m0iTfG0w0",
    title: "Gud Naal Ishq Mitha",
    artist: "Bally Sagoo, Malkit Singh",
    movie: "Bally Sagoo Hits",
    duration: "4:32",
    thumb: "https://img.youtube.com/vi/G3m0iTfG0w0/hqdefault.jpg",
    tag: "Dhaba Bhangra"
  }
];

const ghatsTracks = [
  {
    id: "l9cR3CMyuzc",
    title: "Barso Re",
    artist: "Shreya Ghoshal, A.R. Rahman",
    movie: "Guru (2007)",
    duration: "5:29",
    thumb: "https://img.youtube.com/vi/l9cR3CMyuzc/hqdefault.jpg",
    tag: "Rain Anthem"
  },
  {
    id: "VMsn5-a45-s",
    title: "Tip Tip Barsa Paani",
    artist: "Udit Narayan, Alka Yagnik",
    movie: "Mohra (1994)",
    duration: "5:58",
    thumb: "https://img.youtube.com/vi/VMsn5-a45-s/hqdefault.jpg",
    tag: "Monsoon Classic"
  },
  {
    id: "AMuRRXCuy-4",
    title: "Pal Pal Dil Ke Paas",
    artist: "Kishore Kumar",
    movie: "Blackmail (1973)",
    duration: "5:28",
    thumb: "https://img.youtube.com/vi/AMuRRXCuy-4/hqdefault.jpg",
    tag: "Golden Retro"
  },
  {
    id: "mZwJs1YQ-Wk",
    title: "Kisi Din Banoongi Main",
    artist: "Alka Yagnik, Udit Narayan",
    movie: "Raja (1995)",
    duration: "7:02",
    thumb: "https://img.youtube.com/vi/mZwJs1YQ-Wk/hqdefault.jpg",
    tag: "Nostalgic Romance"
  }
];

const bhojpuriTracks = [
  {
    id: "Gr8G_ldltDE",
    title: "Kamariya Kare Lapa Lop (Lollypop Lagelu)",
    artist: "Pawan Singh",
    movie: "Superhit Cassette (2008)",
    duration: "4:15",
    thumb: "https://img.youtube.com/vi/Gr8G_ldltDE/hqdefault.jpg",
    tag: "World Anthem"
  },
  {
    id: "2Mv8UOiyTq0",
    title: "Rinkiya Ke Papa (Chat Deni Maar Deli)",
    artist: "Manoj Tiwari",
    movie: "Uparwali Ke Chakkar Mein",
    duration: "4:42",
    thumb: "https://img.youtube.com/vi/2Mv8UOiyTq0/hqdefault.jpg",
    tag: "Desi Classic"
  },
  {
    id: "N9Ylebtf8YI",
    title: "Raate Diya Butake",
    artist: "Pawan Singh, Amrapali Dubey",
    movie: "Satya (2017)",
    duration: "4:28",
    thumb: "https://img.youtube.com/vi/N9Ylebtf8YI/hqdefault.jpg",
    tag: "Blockbuster Beat"
  },
  {
    id: "vwMR0yf4q04",
    title: "Piyawa Se Pahile Hamar Rahlu",
    artist: "Ritesh Pandey, Khushbu Tiwari",
    movie: "Wave Music Superhit (2017)",
    duration: "4:10",
    thumb: "https://img.youtube.com/vi/vwMR0yf4q04/hqdefault.jpg",
    tag: "Desi Sensation"
  },
  {
    id: "c4JD7rEtIj8",
    title: "Chhalakata Hamro Jawaniya",
    artist: "Pawan Singh, Priyanka Singh",
    movie: "Bhojpuriya Raja (2016)",
    duration: "3:58",
    thumb: "https://img.youtube.com/vi/c4JD7rEtIj8/hqdefault.jpg",
    tag: "High Bass"
  }
];

const playlistData = {
  driver: {
    name: "Bus Driver (Cabin Soundboard)",
    tagline: "Late-night interstate travel, roadside tea stalls, and iconic retro highway cassettes",
    dialogue: "Chalti ka naam gaadi. Lights on high beam, NH-48 awaits ahead.",
    stations: [
      {
        id: "nh48-sleeper",
        name: "NH-48 Midnight Sleeper",
        description: "Late night interstate coach ambiance: soulful melodies, gentle rumble, and endless asphalt.",
        badge: "FM 93.5 • CASSETTE",
        tracks: nh48Tracks
      },
      {
        id: "gulzar-ghazals",
        name: "Gulzar Ghazals",
        description: "Poetic masterpieces, heartfelt Nazms, and timeless acoustic ghazals penned by Gulzar Sahab.",
        badge: "MW 603 • GULZAR",
        tracks: gulzarTracks
      },
      {
        id: "manache-ghaav",
        name: "Manache Ghaav",
        description: "Deeply emotional, poignant Marathi sad songs and heart-touching melancholy.",
        badge: "AIR 747 • MARATHI",
        tracks: marathiSadTracks
      },
      {
        id: "dhaba-banger",
        name: "Highway Dhaba Beats",
        description: "High-octane highway dhabas: piping hot kadak chai, loud subwoofers, and unstoppable energy.",
        badge: "AM 1240 • HIGH BASS",
        tracks: dhabaTracks
      },
      {
        id: "ghats-rain",
        name: "Monsoon Highway & Rain",
        description: "Climbing through misty Western Ghats with windshield wipers slicing steady monsoon rain.",
        badge: "SW 49m • MONSOON",
        tracks: ghatsTracks
      },
      {
        id: "bhojpuri-garda",
        name: "Bhojpuri Garda",
        description: "Powerhouse Bhojpuri beats, authentic desi dholak grooves, and high-energy rural anthems.",
        badge: "AM 1080 • BHOJPURI",
        tracks: bhojpuriTracks
      }
    ]
  },

  saloon: {
    name: "Deluxe Saloon (Barbershop Lounge)",
    tagline: "Sunday morning grooming, vintage radio warmth, and timeless romantic melodies",
    dialogue: "A warm shave, fresh aftershave, and soulful melodies on the radio.",
    stations: [
      {
        id: "deluxe-romance",
        name: "Deluxe 90s Romance",
        description: "The classic soundtrack of an unhurried morning haircut and warm towel treatment.",
        badge: "MW 540 • PHILIPS",
        tracks: deluxeRomanceTracks
      },
      {
        id: "gulzar-ghazals",
        name: "Gulzar Ghazals",
        description: "Poetic masterpieces, heartfelt Nazms, and timeless acoustic ghazals penned by Gulzar Sahab.",
        badge: "MW 603 • GULZAR",
        tracks: gulzarTracks
      },
      {
        id: "manache-ghaav",
        name: "Manache Ghaav",
        description: "Deeply emotional, poignant Marathi sad songs and heart-touching melancholy.",
        badge: "AIR 747 • MARATHI",
        tracks: marathiSadTracks
      },
      {
        id: "sunday-champi",
        name: "Sunday Morning Session",
        description: "Relaxing hair conditioning, soothing scissor snips, and lighthearted morning tunes.",
        badge: "FM 102.6 • VINTAGE",
        tracks: sundayChampiTracks
      },
      {
        id: "dard-e-dil",
        name: "Heartbreak Melodies",
        description: "Poignant vocal expressions, acoustic ghazals, and reflective ballads.",
        badge: "AM 810 • NOSTALGIA",
        tracks: dardEDilTracks
      },
      {
        id: "vividh-bharati",
        name: "Vintage Transistor Radio",
        description: "Classic transistor broadcasts: legendary recordings from the 1970s and 1980s.",
        badge: "SW 31m • VINTAGE",
        tracks: vividhBharatiTracks
      }
    ]
  }
};

const fileContent = `/**
 * SAFAR & SALOON: DUAL RETRO RADIO PLATFORM
 * Curated retro stations for Bus Driver and Deluxe Saloon modes
 * 100% verified, active YouTube stream IDs
 */

window.playlistData = ${JSON.stringify(playlistData, null, 2)};
`;

fs.writeFileSync('js/playlistData.js', fileContent);
console.log('Successfully written updated js/playlistData.js!');

```


/* ============================================================================== */
/* FILE: scripts/verified_tracks.json */
/* ============================================================================== */

```json:scripts/verified_tracks.json
{
  "gulzar": [
    {
      "id": "_UEpGEXcMn4",
      "title": "Tujhse Naraz Nahin Zindagi",
      "artist": "Anup Ghoshal, Lata Mangeshkar",
      "movie": "Masoom (1983)",
      "duration": "5:41",
      "thumb": "https://img.youtube.com/vi/_UEpGEXcMn4/hqdefault.jpg",
      "tag": "Gulzar Masterpiece"
    },
    {
      "id": "Zm4V6ty4K6k",
      "title": "Tere Bina Zindagi Se Koi",
      "artist": "Kishore Kumar, Lata Mangeshkar",
      "movie": "Aandhi (1975)",
      "duration": "5:52",
      "thumb": "https://img.youtube.com/vi/Zm4V6ty4K6k/hqdefault.jpg",
      "tag": "Soulful Ghazal"
    },
    {
      "id": "MDXFi3avqo0",
      "title": "Woh Shaam Kuchh Ajeeb Thi",
      "artist": "Kishore Kumar",
      "movie": "Khamoshi (1969)",
      "duration": "4:46",
      "thumb": "https://img.youtube.com/vi/MDXFi3avqo0/hqdefault.jpg",
      "tag": "Poetic Solitude"
    },
    {
      "id": "XUexH7Xk1yk",
      "title": "Mera Kuchh Saamaan",
      "artist": "Asha Bhosle",
      "movie": "Ijaazat (1987)",
      "duration": "6:05",
      "thumb": "https://img.youtube.com/vi/XUexH7Xk1yk/hqdefault.jpg",
      "tag": "National Award Winner"
    },
    {
      "id": "3UsReAi_LIU",
      "title": "Shaam Se Aankh Mein Nami Si Hai",
      "artist": "Jagjit Singh, Gulzar",
      "movie": "Marasim (1999)",
      "duration": "5:22",
      "thumb": "https://img.youtube.com/vi/3UsReAi_LIU/hqdefault.jpg",
      "tag": "Acoustic Ghazal"
    },
    {
      "id": "Q87TZLzRfwU",
      "title": "Haath Chhoote Bhi Toh",
      "artist": "Jagjit Singh, Gulzar",
      "movie": "Marasim (1999)",
      "duration": "5:18",
      "thumb": "https://img.youtube.com/vi/Q87TZLzRfwU/hqdefault.jpg",
      "tag": "Marasim Classic"
    },
    {
      "id": "WKP5cqQvUBg",
      "title": "Dil Dhoondta Hai Phir Wohi",
      "artist": "Bhupinder Singh, Lata Mangeshkar",
      "movie": "Mausam (1975)",
      "duration": "4:15",
      "thumb": "https://img.youtube.com/vi/WKP5cqQvUBg/hqdefault.jpg",
      "tag": "Timeless Poetry"
    },
    {
      "id": "uLi3WcON1CU",
      "title": "Do Deewane Shahar Mein",
      "artist": "Bhupinder Singh, Runa Laila",
      "movie": "Ghar (1978)",
      "duration": "4:50",
      "thumb": "https://img.youtube.com/vi/uLi3WcON1CU/hqdefault.jpg",
      "tag": "Monsoon Ghazal"
    },
    {
      "id": "lySbCeZjVlw",
      "title": "Naam Gum Jayega",
      "artist": "Lata Mangeshkar, Bhupinder Singh",
      "movie": "Kinara (1977)",
      "duration": "5:25",
      "thumb": "https://img.youtube.com/vi/lySbCeZjVlw/hqdefault.jpg",
      "tag": "Everlasting Identity"
    },
    {
      "id": "dmm5lM9BR8o",
      "title": "Aap Ki Ankhon Mein Kuch",
      "artist": "Kishore Kumar, Lata Mangeshkar",
      "movie": "Ghar (1978)",
      "duration": "4:10",
      "thumb": "https://img.youtube.com/vi/dmm5lM9BR8o/hqdefault.jpg",
      "tag": "Pure Romanticism"
    },
    {
      "id": "Efx7BIzMEPI",
      "title": "Is Mod Se Jaate Hain",
      "artist": "Kishore Kumar, Lata Mangeshkar",
      "movie": "Aandhi (1975)",
      "duration": "4:55",
      "thumb": "https://img.youtube.com/vi/Efx7BIzMEPI/hqdefault.jpg",
      "tag": "Golden Nostalgia"
    }
  ],
  "marathiSad": [
    {
      "id": "2JZTIVd4XN0",
      "title": "Man Udhan Varyache",
      "artist": "Shankar Mahadevan, Ajay-Atul",
      "movie": "Agga Bai Arrecha (2004)",
      "duration": "5:12",
      "thumb": "https://img.youtube.com/vi/2JZTIVd4XN0/hqdefault.jpg",
      "tag": "Heartache Classic"
    },
    {
      "id": "Y4TICMyl9Eg",
      "title": "Kadhi Tu Rimjhim Zharanari",
      "artist": "Saleel Kulkarni, Sandeep Khare",
      "movie": "Ayushyavar Bolu Kahi",
      "duration": "5:30",
      "thumb": "https://img.youtube.com/vi/Y4TICMyl9Eg/hqdefault.jpg",
      "tag": "Melancholic Poetry"
    },
    {
      "id": "OkNLme6dCsE",
      "title": "Mee Raat Takali",
      "artist": "Lata Mangeshkar",
      "movie": "Jait Re Jait (1977)",
      "duration": "4:22",
      "thumb": "https://img.youtube.com/vi/OkNLme6dCsE/hqdefault.jpg",
      "tag": "Heartbreak Folklore"
    },
    {
      "id": "DQNxigVPh1s",
      "title": "Jeevalaga Rahile Re Door",
      "artist": "Lata Mangeshkar, Sudhir Phadke",
      "movie": "Bhavgeet Classic",
      "duration": "4:15",
      "thumb": "https://img.youtube.com/vi/DQNxigVPh1s/hqdefault.jpg",
      "tag": "Wounds of Heart"
    },
    {
      "id": "I9Ehun8Ahk4",
      "title": "Shravanat Ghan Neela",
      "artist": "Lata Mangeshkar, Hridaynath Mangeshkar",
      "movie": "Marathi Bhavgeet",
      "duration": "4:40",
      "thumb": "https://img.youtube.com/vi/I9Ehun8Ahk4/hqdefault.jpg",
      "tag": "Poignant Rain"
    },
    {
      "id": "UXJF8e90Nxc",
      "title": "Usavale Dhaage",
      "artist": "Hamsika Iyer, Rahul Ranade",
      "movie": "Kaksparsh (2012)",
      "duration": "4:50",
      "thumb": "https://img.youtube.com/vi/UXJF8e90Nxc/hqdefault.jpg",
      "tag": "Emotional Solitude"
    }
  ],
  "saloonFix": [
    {
      "id": "XOxz0Hr3Hzo",
      "title": "Mera Dil Bhi Kitna Pagal Hai",
      "artist": "Kumar Sanu, Alka Yagnik",
      "movie": "Saajan (1991)",
      "duration": "5:25",
      "thumb": "https://img.youtube.com/vi/XOxz0Hr3Hzo/hqdefault.jpg",
      "tag": "Kumar Sanu Gold"
    },
    {
      "id": "KeyfUuXPOcY",
      "title": "Dheere Dheere Se Meri Zindagi",
      "artist": "Kumar Sanu, Anuradha Paudwal",
      "movie": "Aashiqui (1990)",
      "duration": "5:30",
      "thumb": "https://img.youtube.com/vi/KeyfUuXPOcY/hqdefault.jpg",
      "tag": "Nadeem-Shravan"
    },
    {
      "id": "cNV5hLSa9H8",
      "title": "Tujhe Dekha Toh Yeh Jaana Sanam",
      "artist": "Kumar Sanu, Lata Mangeshkar",
      "movie": "DDLJ (1995)",
      "duration": "5:04",
      "thumb": "https://img.youtube.com/vi/cNV5hLSa9H8/hqdefault.jpg",
      "tag": "90s Romance"
    },
    {
      "id": "htMvfOfixuM",
      "title": "Ek Ladki Ko Dekha Toh Aisa Laga",
      "artist": "Kumar Sanu",
      "movie": "1942: A Love Story (1994)",
      "duration": "4:36",
      "thumb": "https://img.youtube.com/vi/htMvfOfixuM/hqdefault.jpg",
      "tag": "Acoustic Melody"
    },
    {
      "id": "Mj3KyjuKbqI",
      "title": "Aaye Ho Meri Zindagi Mein",
      "artist": "Udit Narayan",
      "movie": "Raja Hindustani (1996)",
      "duration": "6:02",
      "thumb": "https://img.youtube.com/vi/Mj3KyjuKbqI/hqdefault.jpg",
      "tag": "Saloon Special"
    },
    {
      "id": "jspLMtqZFjY",
      "title": "Pardesi Pardesi Jaana Nahi",
      "artist": "Udit Narayan, Alka Yagnik",
      "movie": "Raja Hindustani (1996)",
      "duration": "7:31",
      "thumb": "https://img.youtube.com/vi/jspLMtqZFjY/hqdefault.jpg",
      "tag": "Everlasting"
    },
    {
      "id": "5y_TCKNzAMI",
      "title": "Tumse Milne Ko Dil Karta Hai",
      "artist": "Kumar Sanu, Alka Yagnik",
      "movie": "Phool Aur Kaante (1991)",
      "duration": "5:32",
      "thumb": "https://img.youtube.com/vi/5y_TCKNzAMI/hqdefault.jpg",
      "tag": "Retro Classic"
    },
    {
      "id": "bKZTnnFU9HA",
      "title": "Kuch Kuch Hota Hai",
      "artist": "Udit Narayan, Alka Yagnik",
      "movie": "Kuch Kuch Hota Hai (1998)",
      "duration": "4:56",
      "thumb": "https://img.youtube.com/vi/bKZTnnFU9HA/hqdefault.jpg",
      "tag": "Pure 90s"
    },
    {
      "id": "iqNS2Qe4pp0",
      "title": "Suraj Hua Maddham",
      "artist": "Sonu Nigam, Alka Yagnik",
      "movie": "K3G (2001)",
      "duration": "7:08",
      "thumb": "https://img.youtube.com/vi/iqNS2Qe4pp0/hqdefault.jpg",
      "tag": "Timeless"
    },
    {
      "id": "SBfPs-PMGTA",
      "title": "Pehla Nasha",
      "artist": "Udit Narayan, Sadhana Sargam",
      "movie": "Jo Jeeta Wohi Sikandar (1992)",
      "duration": "4:52",
      "thumb": "https://img.youtube.com/vi/SBfPs-PMGTA/hqdefault.jpg",
      "tag": "Slow Romance"
    },
    {
      "id": "QnlknU6PPxM",
      "title": "Chura Liya Hai Tumne Jo Dil Ko",
      "artist": "Asha Bhosle, Mohd Rafi",
      "movie": "Yaadon Ki Baaraat (1973)",
      "duration": "4:48",
      "thumb": "https://img.youtube.com/vi/QnlknU6PPxM/hqdefault.jpg",
      "tag": "Evergreen"
    },
    {
      "id": "gTy1Dho3bJE",
      "title": "Yeh Shaam Mastani",
      "artist": "Kishore Kumar",
      "movie": "Kati Patang (1971)",
      "duration": "4:38",
      "thumb": "https://img.youtube.com/vi/gTy1Dho3bJE/hqdefault.jpg",
      "tag": "Retro Warmth"
    },
    {
      "id": "PnH56Koh_TY",
      "title": "Tumko Dekha Toh Yeh Khayal Aaya",
      "artist": "Jagjit Singh, Chitra Singh",
      "movie": "Saath Saath (1982)",
      "duration": "4:50",
      "thumb": "https://img.youtube.com/vi/PnH56Koh_TY/hqdefault.jpg",
      "tag": "Acoustic Ghazal"
    }
  ]
}
```

