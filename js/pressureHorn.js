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
