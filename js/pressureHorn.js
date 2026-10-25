/**
 * SAFAR & SALOON: HIGHWAY PRESSURE AIR HORN ENGINE
 * Single Signature Indian Commercial Truck Pressure Air Horn (Horn OK Please)
 *
 * Realism Audio Graph Pipeline:
 * [Input Gain] -> [Body Resonance Filter (340Hz)] -> [WaveShaper Saturation]
 *       |---> [Spatial Highway Delay (Stereo 68ms / 128ms)] ---> [Feedback]
 *       |---> [Dry Gain] -----------------------------------------> [Master Gain]
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
    this.masterGain = null;

    // Single Signature Audio Buffer Cache
    this.assetBuffer = null;
    this.isLoadingAsset = false;

    // Single Unified Highway Pressure Horn Definition
    this.singleHorn = {
      id: 'classic-single-tone',
      name: 'Highway Pressure Air Horn',
      description: 'Single Authentic Indian Interstate Truck Trumpet',
      assetUrl: 'sounds/classic_single_tone.wav',
      duration: 1.55
    };
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
    this.preloadSingleAsset();
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

    // 3. Spatial Highway Stereo Echo (Dual-tap delay)
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
    dryGain.gain.setValueAtTime(0.82, ctx.currentTime);

    const wetGain = ctx.createGain();
    wetGain.gain.setValueAtTime(0.32, ctx.currentTime);

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

  // Preload the Single Highway Air Horn Sound Asset
  async preloadSingleAsset() {
    if (this.isLoadingAsset || this.assetBuffer) return;
    this.isLoadingAsset = true;

    try {
      const resp = await fetch(this.singleHorn.assetUrl);
      if (resp.ok) {
        const arrayBuf = await resp.arrayBuffer();
        this.assetBuffer = await this.ctx.decodeAudioData(arrayBuf);
      }
    } catch (err) {
      console.warn('Procedural synthesizer active for highway air horn:', err.message);
    } finally {
      this.isLoadingAsset = false;
    }
  }

  // Synthesize Single Iconic Indian Highway Pressure Air Horn
  synthesizeSingleHorn(t) {
    const ctx = this.ctx;
    const dur = this.singleHorn.duration;

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

    // 1. Play Preloaded High-Fidelity Audio Buffer if Available
    if (this.assetBuffer) {
      const source = this.ctx.createBufferSource();
      source.buffer = this.assetBuffer;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.95, t);

      source.connect(gain);
      gain.connect(this.inputGain);
      source.start(t);

      hornResult = {
        type: 'single',
        name: 'Highway Air Horn',
        description: 'Classic High-Pressure Indian Interstate Truck Horn',
        duration: this.singleHorn.duration
      };
    } else {
      // 2. Procedural Realism Synthesizer Fallback
      this.synthesizeSingleHorn(t);
      hornResult = {
        type: 'single',
        name: 'Highway Air Horn',
        description: 'Classic High-Pressure Indian Interstate Truck Horn',
        duration: this.singleHorn.duration
      };
    }

    // 3. Audio Ducking Transition:
    // Instantly dip main music volume over 0.05s, then smoothly restore once echo tail ends
    const totalDuckingDuration = (hornResult.duration || 1.55) + 0.35;
    if (window.musicPlayer && typeof window.musicPlayer.duckVolume === 'function') {
      window.musicPlayer.duckVolume(totalDuckingDuration);
    }

    return hornResult;
  }
}

// Instantiate global singleton
window.pressureHornSystem = new PressureHornSystem();
