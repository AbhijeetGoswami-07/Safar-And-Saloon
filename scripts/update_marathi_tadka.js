const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
global.window = {};
require(path.join(root, 'js', 'playlistData.js'));
const currentData = global.window.playlistData;

const cleanedByStation = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaned_150_by_station.json'), 'utf8'));

// Combine all 37 Driver mode Marathi tracks for marathi-tadka
const manacheTracks = cleanedByStation['manache-ghaav'] || [];
const dhabaTracks = cleanedByStation['dhaba-banger'] || [];

const marathiTadkaTracks = [...manacheTracks, ...dhabaTracks].map(track => ({
  ...track,
  tag: 'Marathi Tadka Hit'
}));

// Build Driver Mode stations:
// 1. nh48-sleeper (19 tracks)
// 2. marathi-tadka (37 tracks)
// 3. bhojpuri-garda (50 tracks)
// 4. ghats-rain (4 tracks)
const driverStations = [
  {
    id: "nh48-sleeper",
    name: "NH-48 Midnight Sleeper",
    description: "Late night interstate coach ambiance: soulful melodies, gentle rumble, and endless asphalt.",
    badge: "FM 93.5 • CASSETTE",
    tracks: cleanedByStation['nh48-sleeper']
  },
  {
    id: "marathi-tadka",
    name: "Marathi Tadka",
    description: "High-octane Marathi Lokgeet, Halgi-Banjo auto anthems, Lavani, and chartbusting energy.",
    badge: "FM 98.3 • TADKA",
    tracks: marathiTadkaTracks
  },
  {
    id: "bhojpuri-garda",
    name: "Bhojpuri Garda",
    description: "Dehati dholak, cassette classics, and high-energy highway DJ beats that rock every truck and dhaba.",
    badge: "DESI 92.7 • BHOJPURI",
    tracks: cleanedByStation['bhojpuri-garda']
  },
  {
    id: "ghats-rain",
    name: "Monsoon Highway & Rain",
    description: "Wipers in rhythm against the windshield as tires cut through misty mountain ghats.",
    badge: "MONSOON • AMBIENT",
    tracks: currentData.driver.stations.find(s => s.id === 'ghats-rain').tracks
  }
];

// Saloon Mode stations remain 6 stations:
// 1. deluxe-romance (19 tracks)
// 2. gulzar-ghazals (11 tracks)
// 3. manache-ghaav (12 tracks)
// 4. sunday-champi (13 tracks)
// 5. dard-e-dil (12 tracks)
// 6. vividh-bharati (4 tracks)
const saloonStations = currentData.saloon.stations;

const finalPlaylistData = {
  driver: {
    name: "Bus Driver (Cabin Soundboard)",
    tagline: "Late-night interstate travel, roadside tea stalls, and iconic retro highway cassettes",
    dialogue: "Chalti ka naam gaadi. Lights on high beam, NH-48 awaits ahead.",
    stations: driverStations
  },
  saloon: {
    name: "Deluxe Saloon (Sunday Morning)",
    tagline: "A breezy neighborhood barber shop: scissors snipping, radio buzzing, warm towel nostalgia",
    dialogue: "Zara baal set kardo bhai. Sunday morning cassette classics on the transistor.",
    stations: saloonStations
  }
};

const fileContent = `/**
 * SAFAR & SALOON: DUAL RETRO RADIO PLATFORM
 * Curated retro stations for Bus Driver and Deluxe Saloon modes
 * 100% verified, active YouTube stream IDs
 * Includes 150 curated Hindi, Marathi, and Bhojpuri classics
 */

if (typeof window === 'undefined') {
  global.window = {};
}

window.playlistData = ${JSON.stringify(finalPlaylistData, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.playlistData;
}
`;

fs.writeFileSync(path.join(root, 'js', 'playlistData.js'), fileContent, 'utf8');
console.log('Successfully updated js/playlistData.js with Marathi Tadka and removed Gulzar Ghazals from Driver mode!');
