/**
 * SAFAR & SALOON: HIGHWAY PRESSURE AIR HORN ENGINE
 * High-Pressure Authentic Indian Commercial Truck Air Horns (Horn OK Please)
 *
 * Supports user-provided multi-tone highway horns with seamless preloading,
 * zero-latency playback, alternating tune cycles, volume ducking, and procedural fallback.
 */

class PressureHornSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.90;

    // Pipeline Nodes
    this.inputGain = null;
    this.bodyFilter = null;
    this.saturationNode = null;
    this.masterGain = null;

    // Currently Playing Source Node (prevents overlapping clashes)
    this.currentSourceNode = null;
    this.currentGainNode = null;

    // Dual Authentic Highway Horn Definitions (Uploaded by User)
    this.horns = [
      {
        id: 'highway-air-horn-1',
        name: 'Highway Pressure Air Horn (Tune 1)',
        description: 'Authentic Indian Commercial Highway Truck Air Horn',
        assetUrl: 'sounds/highway_air_horn_1.mp3',
        duration: 11.6
      },
      {
        id: 'highway-air-horn-2',
        name: 'Highway Pressure Air Horn (Tune 2)',
        description: 'Authentic Indian Interstate Truck Melody Horn',
        assetUrl: 'sounds/highway_air_horn_2.mp3',
        duration: 11.0
      }
    ];

    // Audio Buffer Caches
    this.assetBuffers = [];
    this.assetBuffer = null; // Backwards compatibility
    this.activeHornIndex = 0;
    this.isLoadingAssets = false;

    // Default definition fallback
    this.singleHorn = this.horns[0];
  }

  // Lazy Initialization of AudioContext and Realism Pipeline
  init() {
    if (this.ctx && this.ctx.state !== 'closed') {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('Web Audio API is not supported in this browser environment.');
      return;
    }

    if (window.audioEngine && window.audioEngine.ctx) {
      this.ctx = window.audioEngine.ctx;
    } else {
      this.ctx = new AudioContextClass();
    }

    this.buildRealismPipeline();
    this.preloadAssets();
  }

  // Make Soft-Clipping Saturation Curve for Diaphragm Air Pressure
  makeDistortionCurve(amount = 25) {
    const k = typeof amount === 'number' ? amount : 25;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // Build the Realism Pipeline
  buildRealismPipeline() {
    const ctx = this.ctx;

    this.inputGain = ctx.createGain();
    this.inputGain.gain.setValueAtTime(1.0, ctx.currentTime);

    // 1. Acoustic Body Resonance Filter (peaking filter at 340Hz, +5.8dB boost)
    this.bodyFilter = ctx.createBiquadFilter();
    this.bodyFilter.type = 'peaking';
    this.bodyFilter.frequency.setValueAtTime(340, ctx.currentTime);
    this.bodyFilter.Q.setValueAtTime(1.6, ctx.currentTime);
    this.bodyFilter.gain.setValueAtTime(5.8, ctx.currentTime);

    // 2. WaveShaper Saturation Node (Diaphragm saturation)
    this.saturationNode = ctx.createWaveShaper();
    this.saturationNode.curve = this.makeDistortionCurve(28);
    this.saturationNode.oversample = '4x';

    // 3. Spatial Highway Stereo Echo (Dual-tap delay for outdoor ambient realism)
    const delayL = ctx.createDelay();
    const delayR = ctx.createDelay();
    delayL.delayTime.setValueAtTime(0.068, ctx.currentTime);
    delayR.delayTime.setValueAtTime(0.128, ctx.currentTime);

    const feedbackL = ctx.createGain();
    const feedbackR = ctx.createGain();
    feedbackL.gain.setValueAtTime(0.24, ctx.currentTime);
    feedbackR.gain.setValueAtTime(0.20, ctx.currentTime);

    const echoFilter = ctx.createBiquadFilter();
    echoFilter.type = 'lowpass';
    echoFilter.frequency.setValueAtTime(1400, ctx.currentTime);

    const dryGain = ctx.createGain();
    dryGain.gain.setValueAtTime(0.85, ctx.currentTime);

    const wetGain = ctx.createGain();
    wetGain.gain.setValueAtTime(0.25, ctx.currentTime);

    const splitter = ctx.createChannelSplitter(2);
    const merger = ctx.createChannelMerger(2);

    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);

    // Wire Up Graph
    this.inputGain.connect(this.bodyFilter);
    this.bodyFilter.connect(this.saturationNode);

    // Dry Path
    this.saturationNode.connect(dryGain);
    dryGain.connect(this.masterGain);

    // Spatial Echo Path
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

    // Connect to destination or audioEngine master
    if (window.audioEngine && window.audioEngine.masterGain) {
      this.masterGain.connect(window.audioEngine.masterGain);
    } else {
      this.masterGain.connect(ctx.destination);
    }
  }

  // Preload Both Authentic Highway Air Horn Audio Assets
  async preloadAssets() {
    if (this.isLoadingAssets || this.assetBuffers.length === this.horns.length) return;
    this.isLoadingAssets = true;

    for (let i = 0; i < this.horns.length; i++) {
      const horn = this.horns[i];
      if (this.assetBuffers[i]) continue;

      try {
        const resp = await fetch(horn.assetUrl);
        if (resp.ok) {
          const arrayBuf = await resp.arrayBuffer();
          const decoded = await this.ctx.decodeAudioData(arrayBuf);
          this.assetBuffers[i] = decoded;
          if (i === 0) {
            this.assetBuffer = decoded;
          }
        }
      } catch (err) {
        console.warn(`Could not preload horn audio asset [${horn.assetUrl}]:`, err.message);
      }
    }

    this.isLoadingAssets = false;
  }

  // Backward compatibility alias
  preloadSingleAsset() {
    return this.preloadAssets();
  }

  // Synthesize Procedural Fallback Horn
  synthesizeSingleHorn(t) {
    const ctx = this.ctx;
    const dur = 1.6;

    // Dual Trumpet Harmonics (F#3 fundamental @ 185Hz, Bb3 minor 3rd @ 233Hz, F#4 @ 370Hz)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const oscSub = ctx.createOscillator();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(185, t);
    osc1.detune.setValueAtTime(-4, t);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(233.08, t);
    osc2.detune.setValueAtTime(5, t);

    osc3.type = 'sawtooth';
    osc3.frequency.setValueAtTime(370, t);
    osc3.detune.setValueAtTime(2, t);

    oscSub.type = 'triangle';
    oscSub.frequency.setValueAtTime(92.5, t);

    const hornGain = ctx.createGain();
    hornGain.gain.setValueAtTime(0.001, t);
    hornGain.gain.linearRampToValueAtTime(0.96, t + 0.018); // Instant pneumatic attack
    hornGain.gain.setValueAtTime(0.92, t + dur - 0.22);
    hornGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    osc1.connect(hornGain);
    osc2.connect(hornGain);
    osc3.connect(hornGain);
    oscSub.connect(hornGain);

    hornGain.connect(this.inputGain);

    osc1.start(t); osc2.start(t); osc3.start(t); oscSub.start(t);
    osc1.stop(t + dur); osc2.stop(t + dur); osc3.stop(t + dur); oscSub.stop(t + dur);
  }

  /* ============================================================
   * MASTER SINGLE "BLOW HORN" TRIGGER
   * ============================================================ */

  blowHorn() {
    this.init();
    if (this.isMuted) return null;

    const t = this.ctx.currentTime;
    let hornResult = null;

    // 1. Stop any currently playing horn instance to avoid clashing overlaps
    if (this.currentSourceNode) {
      try {
        if (this.currentGainNode) {
          this.currentGainNode.gain.setValueAtTime(this.currentGainNode.gain.value, t);
          this.currentGainNode.gain.linearRampToValueAtTime(0.001, t + 0.05);
        }
        this.currentSourceNode.stop(t + 0.05);
      } catch (e) {}
      this.currentSourceNode = null;
      this.currentGainNode = null;
    }

    // 2. Select buffer (alternating between user's authentic horn recordings)
    const hornIdx = this.activeHornIndex % this.horns.length;
    const hornDef = this.horns[hornIdx];
    const buffer = this.assetBuffers[hornIdx] || this.assetBuffer || this.assetBuffers[0];

    // Cycle to next tune for subsequent horn blasts
    this.activeHornIndex = (this.activeHornIndex + 1) % this.horns.length;

    if (buffer) {
      // High-Fidelity Audio Buffer Playback
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(1.0, t);

      // Connect directly to masterGain for maximum clarity, plus subtle spatial echo
      source.connect(gain);
      gain.connect(this.masterGain);

      // Subtle atmospheric echo
      if (this.inputGain) {
        const echoSend = this.ctx.createGain();
        echoSend.gain.setValueAtTime(0.18, t);
        gain.connect(echoSend);
        echoSend.connect(this.inputGain);
      }

      this.currentSourceNode = source;
      this.currentGainNode = gain;

      source.onended = () => {
        if (this.currentSourceNode === source) {
          this.currentSourceNode = null;
          this.currentGainNode = null;
        }
      };

      source.start(t);

      hornResult = {
        type: 'authentic',
        name: hornDef.name,
        description: hornDef.description,
        duration: buffer.duration || hornDef.duration
      };
    } else {
      // Fallback: Check if HTML5 audio is possible or use procedural synthesizer
      try {
        const audio = new Audio(hornDef.assetUrl);
        audio.volume = this.volume;
        audio.play().catch(() => {});
        hornResult = {
          type: 'html5',
          name: hornDef.name,
          duration: hornDef.duration
        };
      } catch (e) {
        this.synthesizeSingleHorn(t);
        hornResult = {
          type: 'synthesized',
          name: 'Highway Air Horn',
          duration: 1.6
        };
      }
    }

    // 3. Audio Ducking Transition:
    // Instantly dip main YouTube music volume, then smoothly restore once horn ends
    const totalDuckingDuration = (hornResult.duration || 11.2) + 0.35;
    if (window.musicPlayer && typeof window.musicPlayer.duckVolume === 'function') {
      window.musicPlayer.duckVolume(totalDuckingDuration);
    }

    return hornResult;
  }
}

// Export class and singleton
window.PressureHornSystem = PressureHornSystem;
window.pressureHornSystem = new PressureHornSystem();
