const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Mock browser global environment
global.window = {};
require(path.join(ROOT, 'js', 'playlistData.js'));
const data = global.window.playlistData;

describe('Playlist Data Suite (playlistData.js)', () => {
  test('window.playlistData exists and contains driver and saloon modes', () => {
    assert.ok(data);
    assert.ok(data.driver);
    assert.ok(data.saloon);
    assert.ok(data.driver.name.includes('Bus Driver'));
    assert.ok(data.saloon.name.includes('Deluxe Saloon'));
  });

  test('Bus Driver mode has exactly 6 curated stations with valid schemas', () => {
    const stations = data.driver.stations;
    assert.equal(stations.length, 6);
    const stationIds = new Set();
    stations.forEach(station => {
      assert.ok(station.id);
      assert.ok(station.name);
      assert.ok(station.badge);
      assert.ok(Array.isArray(station.tracks));
      assert.ok(station.tracks.length > 0);
      assert.ok(!stationIds.has(station.id));
      stationIds.add(station.id);
    });
  });

  test('Deluxe Saloon mode has exactly 6 curated stations with valid schemas', () => {
    const stations = data.saloon.stations;
    assert.equal(stations.length, 6);
    const stationIds = new Set();
    stations.forEach(station => {
      assert.ok(station.id);
      assert.ok(station.name);
      assert.ok(station.badge);
      assert.ok(Array.isArray(station.tracks));
      assert.ok(station.tracks.length > 0);
      assert.ok(!stationIds.has(station.id));
      stationIds.add(station.id);
    });
  });

  test('All tracks across both modes have valid 11-char YouTube IDs and metadata', () => {
    let totalCount = 0;
    ['driver', 'saloon'].forEach(mode => {
      data[mode].stations.forEach(station => {
        station.tracks.forEach(track => {
          totalCount++;
          assert.equal(typeof track.id, 'string');
          assert.equal(track.id.length, 11, `Track ID length should be 11: ${track.id}`);
          assert.ok(track.title);
          assert.ok(track.artist);
          assert.ok(track.duration);
          assert.ok(track.thumb.startsWith('https://img.youtube.com/vi/'));
        });
      });
    });
    assert.equal(totalCount, 192, 'Should contain exactly 192 curated tracks across both modes');
  });

  test('Contains all 150 curated user-requested tracks across Hindi, Marathi, and Bhojpuri', () => {
    const fs = require('fs');
    const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'parsed_150_raw.json'), 'utf8'));
    assert.equal(raw.hindi.length, 50);
    assert.equal(raw.marathi.length, 50);
    assert.equal(raw.bhojpuri.length, 50);

    const allTrackIds = new Set();
    ['driver', 'saloon'].forEach(mode => {
      data[mode].stations.forEach(station => {
        station.tracks.forEach(track => {
          allTrackIds.add(track.id);
        });
      });
    });

    const cache = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'verified_150_cache.json'), 'utf8'));
    assert.equal(Object.keys(cache).length, 150);

    Object.values(cache).forEach(item => {
      assert.ok(allTrackIds.has(item.id), `Missing verified track in stations: ${item.title} (${item.id})`);
    });
  });
});
