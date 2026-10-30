const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Setup mock browser global environment
global.window = {};
global.document = {
  createElement: () => ({}),
  getElementsByTagName: () => [{ parentNode: { insertBefore: () => {} } }],
  getElementById: () => null
};
global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; }
};

// Load dependencies
require(path.join(ROOT, 'js', 'playlistData.js'));
require(path.join(ROOT, 'js', 'player.js'));

describe('MusicPlayer Unit Tests (player.js)', () => {
  let player;

  beforeEach(() => {
    player = new window.MusicPlayer();
    player.init();
  });

  test('extractYouTubeId extracts IDs from multiple YouTube URL formats', () => {
    // 11-char ID
    assert.equal(player.extractYouTubeId('dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
    // Standard watch URL
    assert.equal(player.extractYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
    // youtu.be short URL
    assert.equal(player.extractYouTubeId('https://youtu.be/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
    // YouTube Short URL
    assert.equal(player.extractYouTubeId('https://www.youtube.com/shorts/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
    // Embed URL
    assert.equal(player.extractYouTubeId('https://www.youtube.com/embed/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
    // Invalid URLs
    assert.equal(player.extractYouTubeId('https://google.com'), null);
    assert.equal(player.extractYouTubeId('not-a-valid-youtube-link'), null);
    assert.equal(player.extractYouTubeId('short'), null);
    assert.equal(player.extractYouTubeId(''), null);
    assert.equal(player.extractYouTubeId(null), null);
  });

  test('Player initializes with default driver mode and first track of first station', () => {
    assert.equal(player.currentMode, 'driver');
    assert.equal(player.currentStationId, 'nh48-sleeper');
    assert.equal(player.currentTrackIndex, 0);
    assert.ok(player.currentTrack);
    const expectedFirstTrackId = global.window.playlistData.driver.stations[0].tracks[0].id;
    assert.equal(player.currentTrack.id, expectedFirstTrackId);
  });

  test('setMode correctly switches between driver and saloon stations', () => {
    player.setMode('saloon');
    assert.equal(player.currentMode, 'saloon');
    assert.equal(player.currentStationId, 'deluxe-romance');
    assert.equal(player.getActiveStation().id, 'deluxe-romance');

    player.setMode('driver');
    assert.equal(player.currentMode, 'driver');
    assert.equal(player.currentStationId, 'nh48-sleeper');
  });

  test('setStation changes current station and resets track index', () => {
    player.setStation('gulzar-ghazals');
    assert.equal(player.currentStationId, 'gulzar-ghazals');
    assert.equal(player.currentTrackIndex, 0);
    assert.equal(player.getActiveStation().name, 'Gulzar Ghazals');
  });

  test('nextTrack and prevTrack navigate cyclically through current station', () => {
    const station = player.getActiveStation();
    const trackCount = station.tracks.length;

    // Next track
    player.nextTrack();
    assert.equal(player.currentTrackIndex, 1);

    // Prev track
    player.prevTrack();
    assert.equal(player.currentTrackIndex, 0);

    // Wrap around backward
    player.prevTrack();
    assert.equal(player.currentTrackIndex, trackCount - 1);

    // Wrap around forward
    player.nextTrack();
    assert.equal(player.currentTrackIndex, 0);
  });

  test('Volume controls and mute toggle operate within valid bounds', () => {
    player.setVolume(50);
    assert.equal(player.volume, 50);

    player.setVolume(150);
    assert.equal(player.volume, 100);

    player.setVolume(-10);
    assert.equal(player.volume, 0);

    assert.equal(player.isMuted, false);
    player.toggleMute();
    assert.equal(player.isMuted, true);
    player.toggleMute();
    assert.equal(player.isMuted, false);
  });

  test('Event listener subscription and notification mechanism functions properly', () => {
    let notified = false;
    let trackReceived = null;

    player.on('trackChange', (t) => {
      notified = true;
      trackReceived = t;
    });

    player.nextTrack();
    assert.equal(notified, true);
    assert.ok(trackReceived);
  });
});
