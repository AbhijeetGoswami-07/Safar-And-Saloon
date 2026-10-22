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
