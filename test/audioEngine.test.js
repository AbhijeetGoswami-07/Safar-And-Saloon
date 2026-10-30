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

class MockAudioContext {
  constructor() {
    this.currentTime = 0;
    this.sampleRate = 44100;
    this.state = 'running';
    this.destination = {};
  }
  createGain() { return new MockGainNode(); }
  createBuffer(channels, length, rate) {
    return {
      getChannelData: () => new Float32Array(length)
    };
  }
  createBufferSource() {
    return {
      buffer: null,
      loop: false,
      connect: () => {},
      start: () => {},
      stop: () => {},
      disconnect: () => {}
    };
  }
  createBiquadFilter() {
    return {
      type: 'lowpass',
      frequency: {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {},
        linearRampToValueAtTime: () => {}
      },
      Q: { setValueAtTime: () => {} },
      gain: { setValueAtTime: () => {} },
      connect: () => {},
      disconnect: () => {}
    };
  }
  createOscillator() {
    return {
      type: 'sine',
      frequency: {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {}
      },
      connect: () => {},
      start: () => {},
      stop: () => {},
      disconnect: () => {}
    };
  }
  resume() { return Promise.resolve(); }
}

global.window = {
  AudioContext: MockAudioContext
};

require(path.join(ROOT, 'js', 'audioEngine.js'));

describe('AudioEngine Unit Tests (audioEngine.js)', () => {
  let engine;

  beforeEach(() => {
    engine = new window.AudioEngine();
    engine.init();
  });

  test('AudioEngine initializes master gain connected to destination', () => {
    assert.ok(engine.ctx);
    assert.ok(engine.masterGain);
    assert.equal(engine.isMuted, false);
  });

  test('Noise buffer generator produces requested duration and samples', () => {
    const whiteNoise = engine.createNoiseBuffer(1, 'white');
    assert.ok(whiteNoise);
    assert.equal(whiteNoise.getChannelData(0).length, 44100);

    const pinkNoise = engine.createNoiseBuffer(1, 'pink');
    assert.ok(pinkNoise);
    assert.equal(pinkNoise.getChannelData(0).length, 44100);
  });

  test('Spray bottle water mist sound triggers cleanly without errors', () => {
    assert.doesNotThrow(() => {
      engine.playSprayBottle();
    });
  });

  test('Vintage ceiling fan ambient loop toggles on and off cleanly', () => {
    assert.doesNotThrow(() => {
      engine.toggleFanAmbient(true);
      assert.ok(engine.ambients.fan);
      engine.toggleFanAmbient(false);
      assert.equal(engine.ambients.fan, null);
    });
  });

  test('Highway rain ambient loop toggles on and off cleanly', () => {
    assert.doesNotThrow(() => {
      engine.toggleRainAmbient(true);
      assert.ok(engine.ambients.rain);
      engine.toggleRainAmbient(false);
      assert.equal(engine.ambients.rain, null);
    });
  });

  test('Mode switch sound triggers without throwing in both modes', () => {
    assert.doesNotThrow(() => {
      engine.playModeSwitchSound('driver');
      engine.playModeSwitchSound('saloon');
    });
  });
});
