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
