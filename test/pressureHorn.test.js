const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Mock Web Audio Context
class MockGainNode {
  constructor() {
    this.gain = {
      value: 1,
      setValueAtTime: () => {},
      linearRampToValueAtTime: () => {},
      exponentialRampToValueAtTime: () => {}
    };
  }
  connect() {}
  disconnect() {}
}

class MockBiquadFilter {
  constructor() {
    this.frequency = { setValueAtTime: () => {} };
    this.Q = { setValueAtTime: () => {} };
    this.gain = { setValueAtTime: () => {} };
  }
  connect() {}
  disconnect() {}
}

class MockDelayNode {
  constructor() {
    this.delayTime = { setValueAtTime: () => {} };
  }
  connect() {}
  disconnect() {}
}

class MockAudioContext {
  constructor() {
    this.currentTime = 0;
    this.state = 'running';
    this.destination = {};
  }
  createGain() { return new MockGainNode(); }
  createBiquadFilter() { return new MockBiquadFilter(); }
  createWaveShaper() { return { curve: null, oversample: '', connect: () => {} }; }
  createDelay() { return new MockDelayNode(); }
  createChannelSplitter() { return { connect: () => {} }; }
  createChannelMerger() { return { connect: () => {} }; }
  createBufferSource() {
    return {
      buffer: null,
      connect: () => {},
      start: () => {},
      stop: () => {}
    };
  }
  createOscillator() {
    return {
      frequency: { setValueAtTime: () => {} },
      detune: { setValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {}
    };
  }
  resume() { return Promise.resolve(); }
}

global.window = {
  AudioContext: MockAudioContext,
  musicPlayer: {
    ducked: false,
    duckVolume: function(dur) { this.ducked = true; }
  }
};

require(path.join(ROOT, 'js', 'pressureHorn.js'));

describe('PressureHornSystem Unit Tests (pressureHorn.js)', () => {
  let hornSystem;

  beforeEach(() => {
    hornSystem = new window.PressureHornSystem();
  });

  test('Initializes audio graph and realism pipeline', () => {
    hornSystem.init();
    assert.ok(hornSystem.ctx);
    assert.ok(hornSystem.inputGain);
    assert.ok(hornSystem.bodyFilter);
    assert.ok(hornSystem.saturationNode);
    assert.ok(hornSystem.masterGain);
  });

  test('Contains both user-uploaded authentic horn sound definitions', () => {
    assert.equal(hornSystem.horns.length, 2);
    assert.equal(hornSystem.horns[0].id, 'highway-air-horn-1');
    assert.equal(hornSystem.horns[0].assetUrl, 'sounds/highway_air_horn_1.mp3');
    assert.equal(hornSystem.horns[1].id, 'highway-air-horn-2');
    assert.equal(hornSystem.horns[1].assetUrl, 'sounds/highway_air_horn_2.mp3');
  });

  test('Alternates tune index on each consecutive blowHorn() blast', () => {
    hornSystem.init();
    // Simulate preloaded mock buffers
    hornSystem.assetBuffers = [{}, {}];

    assert.equal(hornSystem.activeHornIndex, 0);
    const blast1 = hornSystem.blowHorn();
    assert.equal(blast1.name, 'Highway Pressure Air Horn (Tune 1)');
    assert.equal(hornSystem.activeHornIndex, 1);

    const blast2 = hornSystem.blowHorn();
    assert.equal(blast2.name, 'Highway Pressure Air Horn (Tune 2)');
    assert.equal(hornSystem.activeHornIndex, 0);

    const blast3 = hornSystem.blowHorn();
    assert.equal(blast3.name, 'Highway Pressure Air Horn (Tune 1)');
  });

  test('Triggers audio ducking transition on blowHorn()', () => {
    hornSystem.init();
    window.musicPlayer.ducked = false;
    hornSystem.blowHorn();
    assert.equal(window.musicPlayer.ducked, true);
  });

  test('Mute flag suppresses horn blast', () => {
    hornSystem.init();
    hornSystem.isMuted = true;
    const res = hornSystem.blowHorn();
    assert.equal(res, null);
  });
});
