const fs = require('fs');
const path = require('path');

global.window = {};
require('../js/playlistData.js');
const oldData = global.window.playlistData;

const newTracksByStation = JSON.parse(fs.readFileSync(path.join(__dirname, 'cleaned_150_by_station.json'), 'utf8'));

// Extract preserved stations
const gulzarTracks = oldData.driver.stations.find(s => s.id === 'gulzar-ghazals').tracks;
const ghatsTracks = oldData.driver.stations.find(s => s.id === 'ghats-rain').tracks;
const vividhTracks = oldData.saloon.stations.find(s => s.id === 'vividh-bharati').tracks;

const finalData = {
  driver: {
    name: "Bus Driver (Cabin Soundboard)",
    tagline: "Late-night interstate travel, roadside tea stalls, and iconic retro highway cassettes",
    dialogue: "Chalti ka naam gaadi. Lights on high beam, NH-48 awaits ahead.",
    stations: [
      {
        id: "nh48-sleeper",
        name: "NH-48 Midnight Sleeper",
        description: "Late night interstate coach ambiance: soulful melodies, gentle rumble, and endless asphalt.",
        badge: "FM 93.5 • CASSETTE",
        tracks: newTracksByStation['nh48-sleeper']
      },
      {
        id: "gulzar-ghazals",
        name: "Gulzar Ghazals",
        description: "Poetic evening journeys through the profound words of Gulzar and timeless voices.",
        badge: "AM 1080 • POETRY",
        tracks: gulzarTracks
      },
      {
        id: "manache-ghaav",
        name: "Manache Ghaav",
        description: "Soulful Marathi Bhavgeet and heartfelt melodies for quiet highway stretches.",
        badge: "FM 101.4 • BHAVGEET",
        tracks: newTracksByStation['manache-ghaav']
      },
      {
        id: "dhaba-banger",
        name: "Highway Dhaba Beats",
        description: "High-octane roadside dhabas with Halgi, Banjo, and iconic Marathi auto anthems.",
        badge: "DHABA 98.3 • HALGI",
        tracks: newTracksByStation['dhaba-banger']
      },
      {
        id: "ghats-rain",
        name: "Monsoon Highway & Rain",
        description: "Wipers in rhythm against the windshield as tires cut through misty mountain ghats.",
        badge: "MONSOON • AMBIENT",
        tracks: ghatsTracks
      },
      {
        id: "bhojpuri-garda",
        name: "Bhojpuri Garda",
        description: "Dehati dholak, cassette classics, and high-energy highway DJ beats that rock every truck and dhaba.",
        badge: "DESI 92.7 • BHOJPURI",
        tracks: newTracksByStation['bhojpuri-garda']
      }
    ]
  },
  saloon: {
    name: "Deluxe Saloon (Sunday Morning)",
    tagline: "A breezy neighborhood barber shop: scissors snipping, radio buzzing, warm towel nostalgia",
    dialogue: "Zara baal set kardo bhai. Sunday morning cassette classics on the transistor.",
    stations: [
      {
        id: "deluxe-romance",
        name: "Deluxe 90s Romance",
        description: "The golden decade of Bollywood cassettes: Kumar Sanu, Alka Yagnik, and breezy Sunday charm.",
        badge: "STEREO • 90S GOLD",
        tracks: newTracksByStation['deluxe-romance']
      },
      {
        id: "gulzar-ghazals",
        name: "Gulzar Ghazals",
        description: "Poetic evening journeys through the profound words of Gulzar and timeless voices.",
        badge: "AM 1080 • POETRY",
        tracks: gulzarTracks
      },
      {
        id: "manache-ghaav",
        name: "Manache Ghaav",
        description: "Soulful Marathi Bhavgeet and heartfelt melodies for quiet morning sessions.",
        badge: "FM 101.4 • BHAVGEET",
        tracks: newTracksByStation['manache-ghaav']
      },
      {
        id: "sunday-champi",
        name: "Sunday Morning Session",
        description: "Upbeat morning energy with vintage lavani, lokgeet, and breezy salon vibes.",
        badge: "SALOON 95.0 • CHAMPI",
        tracks: newTracksByStation['sunday-champi']
      },
      {
        id: "dard-e-dil",
        name: "Heartbreak Melodies",
        description: "Altaf Raja, Bewafa Sanam, and timeless tragic ghazals on worn-out magnetic tapes.",
        badge: "CASSETTE • DARD",
        tracks: newTracksByStation['dard-e-dil']
      },
      {
        id: "vividh-bharati",
        name: "Vintage Transistor Radio",
        description: "Crackling MW radio waves carrying Kishore Kumar, Asha Bhosle, and timeless AIR broadcasts.",
        badge: "MW 720 • ALL INDIA RADIO",
        tracks: vividhTracks
      }
    ]
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

window.playlistData = ${JSON.stringify(finalData, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.playlistData;
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'js', 'playlistData.js'), fileContent, 'utf8');
console.log('Successfully wrote updated js/playlistData.js!');
