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

    // Preload authentic highway air horns on first user touch / interaction
    const preloadHorns = () => {
      if (window.pressureHornSystem) window.pressureHornSystem.init();
    };
    document.addEventListener('pointerdown', preloadHorns, { once: true });
    document.addEventListener('keydown', preloadHorns, { once: true });
  }

  // 2. Set Initial Mode
  const initialMode = window.musicPlayer.currentMode || 'driver';
  applyMode(initialMode, false);

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
      const shortcutHorn = document.getElementById('shortcutHornLabel');
      if (shortcutHorn) shortcutHorn.textContent = 'WATER MIST';
    } else {
      document.body.classList.remove('theme-saloon');
      if (modeSwitchDriver) modeSwitchDriver.classList.add('driver-active');
      if (modeSwitchSaloon) modeSwitchSaloon.classList.remove('saloon-active');

      if (driverActionsContainer) driverActionsContainer.classList.remove('hidden');
      if (saloonActionsContainer) saloonActionsContainer.classList.add('hidden');

      if (heroTitle) heroTitle.textContent = 'BUS DRIVER';
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
    setTimeout(updateDockNavState, 100);
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

    stations.forEach((station, index) => {
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
      setTimeout(updateDockNavState, 60);
    } else {
      setTimeout(() => {
        const activeBtn = stationsNav.querySelector('.station-pill.active');
                if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
        setTimeout(updateDockNavState, 350);
      }, 50);
    }
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
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  /* ============================================================
   * SOUNDBOARD & ATMOSPHERE CONTROLS
   * ============================================================ */

  // 1. Bus Mode Buttons
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
      if (window.musicPlayer && window.musicPlayer.currentMode === 'driver') {
        triggerAirHornBlast();
      } else {
        triggerWaterMist();
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

});
