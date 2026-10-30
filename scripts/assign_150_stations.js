const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'parsed_150_raw.json'), 'utf8'));

// Define the exact station mapping
const mappings = [];

// 1. Hindi (50)
raw.hindi.forEach((item, idx) => {
  let station = 'nh48-sleeper';
  let tag = '90s Cassette Gold';
  
  // Heartbreak / Altaf Raja / Bewafa Sanam / Ghazal -> dard-e-dil
  if (
    item.includes('Altaf Raja') ||
    item.includes('Bewafa Sanam') ||
    item.includes('Jeeye To Jeeye Kaise') ||
    item.includes('Tere Dar Par Sanam') ||
    item.includes('Ghungroo Toot Gaye') ||
    item.includes('Woh Ladki Bahut Yaad Aati Hai') ||
    item.includes('Aankh Hai Bhari Bhari') ||
    item.includes('Dil Pardesi Ho Gaya')
  ) {
    station = 'dard-e-dil';
    tag = 'Dard-e-Dil Classic';
  } 
  // Romantic / Soft -> deluxe-romance
  else if (
    item.includes('Aashiqui') ||
    item.includes('Saajan') ||
    item.includes('Dhadkan') ||
    item.includes('Deewana') ||
    item.includes('1942: A Love Story') ||
    item.includes('Dil To Pagal Hai') ||
    item.includes('Sapne Saajan Ke') ||
    item.includes('Zakhm') ||
    item.includes('Chandi Jaisa Rang Hai Tera') ||
    item.includes('Tujhe Dekha Toh Yeh Jaana Sanam')
  ) {
    station = 'deluxe-romance';
    tag = 'Deluxe 90s Romance';
  }
  // Highway / Fast / Drive / Cassette Anthems -> nh48-sleeper
  else {
    station = 'nh48-sleeper';
    tag = 'NH-48 Sleeper Gold';
  }

  mappings.push({ section: 'hindi', index: idx, original: item, station, tag });
});

// 2. Marathi (50)
raw.marathi.forEach((item, idx) => {
  let station = 'dhaba-banger';
  let tag = 'Highway Halgi Banjo';

  // Soulful / Bhavgeet / Emotional -> manache-ghaav
  if (
    item.includes('Sairat') ||
    item.includes('Swapnil Bandodkar') ||
    item.includes('Khel Mandala') ||
    item.includes('Duniyadari') ||
    item.includes('Jiv Lagala') ||
    item.includes('Sajani Chehara Tuza') ||
    item.includes('Jeev Rangla')
  ) {
    station = 'manache-ghaav';
    tag = 'Manache Ghaav Classic';
  }
  // Morning / Champi / Lavani / Upbeat Saloon -> sunday-champi
  else if (
    item.includes('Gori Gori Paan') ||
    item.includes('Tu Hi Re') ||
    item.includes('Mala Jau De Na Ghari') ||
    item.includes('Aga Bai Arechhaa') ||
    item.includes('Natarang') ||
    item.includes('Halgi Mix') ||
    item.includes('Bugadi Majhi Sandli Ga') ||
    item.includes('English Vinglish') ||
    item.includes('Gomu Sangtina') ||
    item.includes('Chandramukhi') ||
    item.includes('Chabidar Chhabi')
  ) {
    station = 'sunday-champi';
    tag = 'Morning Champi & Lavani';
  }
  // Halgi / Banjo / Rikshawala / Anand Shinde -> dhaba-banger
  else {
    station = 'dhaba-banger';
    tag = 'Highway Dhaba Banjo';
  }

  mappings.push({ section: 'marathi', index: idx, original: item, station, tag });
});

// 3. Bhojpuri (50)
raw.bhojpuri.forEach((item, idx) => {
  mappings.push({
    section: 'bhojpuri',
    index: idx,
    original: item,
    station: 'bhojpuri-garda',
    tag: 'Dehati Dholak & DJ Beat'
  });
});

console.log('Total mappings:', mappings.length);
const counts = {};
mappings.forEach(m => counts[m.station] = (counts[m.station] || 0) + 1);
console.log('Station counts:');
Object.entries(counts).forEach(([st, cnt]) => console.log(`  ${st}: ${cnt} tracks`));

fs.writeFileSync(path.join(__dirname, 'station_assignments.json'), JSON.stringify(mappings, null, 2), 'utf8');
