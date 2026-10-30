const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
// Load playlistData.js in a mock browser global context
global.window = {};
require(path.join(root, 'js', 'playlistData.js'));

const data = global.window.playlistData;

if (!data) {
  console.error('FAIL: window.playlistData is not defined!');
  process.exit(1);
}

console.log('Validating playlistData.js structure and track integrity...');
const modes = ['driver', 'saloon'];
let totalTracks = 0;
const stationIds = new Set();
let errors = 0;
let warnings = 0;

modes.forEach(mode => {
  if (!data[mode]) {
    console.error(`FAIL: Missing mode "${mode}" in playlistData`);
    errors++;
    return;
  }
  const stations = data[mode].stations;
  if (!Array.isArray(stations) || stations.length === 0) {
    console.error(`FAIL: No stations found for mode "${mode}"`);
    errors++;
    return;
  }
  console.log(`\nMode [${mode}] - ${stations.length} stations:`);
  stations.forEach(station => {
    if (!station.id || !station.name || !Array.isArray(station.tracks)) {
      console.error(`FAIL: Malformed station object:`, station);
      errors++;
      return;
    }
    if (stationIds.has(`${mode}:${station.id}`)) {
      console.error(`FAIL: Duplicate station id "${station.id}" in mode "${mode}"`);
      errors++;
    }
    stationIds.add(`${mode}:${station.id}`);

    console.log(`  - "${station.name}" (${station.id}): ${station.tracks.length} tracks`);
    
    station.tracks.forEach((track, index) => {
      totalTracks++;
      if (!track.id) {
        console.error(`FAIL: Track at index ${index} in station "${station.name}" missing id:`, track);
        errors++;
      } else if (typeof track.id !== 'string' || track.id.length !== 11) {
        console.error(`FAIL: Track "${track.title || index}" has invalid YouTube id: "${track.id}" (expected 11 chars)`);
        errors++;
      }

      if (!track.title || typeof track.title !== 'string') {
        console.error(`FAIL: Track ${track.id} has invalid title:`, track.title);
        errors++;
      }

      if (!track.artist || typeof track.artist !== 'string') {
        console.error(`FAIL: Track ${track.id} has invalid artist:`, track.artist);
        errors++;
      }

      if (!track.duration || typeof track.duration !== 'string') {
        console.warn(`WARN: Track "${track.title}" (${track.id}) missing duration string`);
        warnings++;
      }

      if (!track.thumb || typeof track.thumb !== 'string') {
        console.warn(`WARN: Track "${track.title}" (${track.id}) missing thumbnail`);
        warnings++;
      }
    });
  });
});

console.log(`\nSummary:`);
console.log(`- Total tracks: ${totalTracks}`);
console.log(`- Warnings: ${warnings}`);
console.log(`- Errors: ${errors}`);

if (errors > 0) {
  console.error(`\nFAILED with ${errors} error(s)!`);
  process.exit(1);
} else {
  console.log(`\nSUCCESS: playlistData.js passed all integrity tests cleanly!`);
}
