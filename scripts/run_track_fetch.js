const { findBestTrack } = require('./find_tracks');
const fs = require('fs');

const gulzarQueries = [
  { title: "Tujhse Naraz Nahin Zindagi", query: "Tujhse Naraz Nahin Zindagi Masoom Gulzar official", movie: "Masoom (1983)", artist: "Anup Ghoshal, Lata Mangeshkar", tag: "Gulzar Masterpiece", duration: "5:41" },
  { title: "Tere Bina Zindagi Se Koi", query: "Tere Bina Zindagi Se Koi Aandhi Kishore Kumar Lata Gulzar", movie: "Aandhi (1975)", artist: "Kishore Kumar, Lata Mangeshkar", tag: "Soulful Ghazal", duration: "5:52" },
  { title: "Woh Shaam Kuchh Ajeeb Thi", query: "Woh Shaam Kuchh Ajeeb Thi Khamoshi Kishore Kumar Gulzar", movie: "Khamoshi (1969)", artist: "Kishore Kumar", tag: "Poetic Solitude", duration: "4:46" },
  { title: "Mera Kuchh Saamaan", query: "Mera Kuchh Saamaan Ijaazat Asha Bhosle Gulzar", movie: "Ijaazat (1987)", artist: "Asha Bhosle", tag: "National Award Winner", duration: "6:05" },
  { title: "Shaam Se Aankh Mein Nami Si Hai", query: "Shaam Se Aankh Mein Nami Si Hai Jagjit Singh Gulzar Marasim", movie: "Marasim (1999)", artist: "Jagjit Singh, Gulzar", tag: "Acoustic Ghazal", duration: "5:22" },
  { title: "Haath Chhoote Bhi Toh", query: "Haath Chhoote Bhi Toh Rishtey Nahi Chhoota Karte Jagjit Singh Gulzar", movie: "Marasim (1999)", artist: "Jagjit Singh, Gulzar", tag: "Marasim Classic", duration: "5:18" },
  { title: "Dil Dhoondta Hai Phir Wohi", query: "Dil Dhoondta Hai Phir Wohi Fursat Ke Raat Din Bhupinder Gulzar", movie: "Mausam (1975)", artist: "Bhupinder Singh, Lata Mangeshkar", tag: "Timeless Poetry", duration: "4:15" },
  { title: "Do Deewane Shahar Mein", query: "Do Deewane Shahar Mein Ghar Bhupinder Runa Laila Gulzar", movie: "Ghar (1978)", artist: "Bhupinder Singh, Runa Laila", tag: "Monsoon Ghazal", duration: "4:50" },
  { title: "Naam Gum Jayega", query: "Naam Gum Jayega Kinara Lata Bhupinder Gulzar", movie: "Kinara (1977)", artist: "Lata Mangeshkar, Bhupinder Singh", tag: "Everlasting Identity", duration: "5:25" },
  { title: "Aap Ki Ankhon Mein Kuch", query: "Aap Ki Ankhon Mein Kuch Mehke Hue Ghar Kishore Lata Gulzar", movie: "Ghar (1978)", artist: "Kishore Kumar, Lata Mangeshkar", tag: "Pure Romanticism", duration: "4:10" },
  { title: "Is Mod Se Jaate Hain", query: "Is Mod Se Jaate Hain Aandhi Kishore Lata Gulzar", movie: "Aandhi (1975)", artist: "Kishore Kumar, Lata Mangeshkar", tag: "Golden Nostalgia", duration: "4:55" }
];

const marathiSadQueries = [
  { title: "Man Udhan Varyache", query: "Man Udhan Varyache Agga Bai Arrecha Shankar Mahadevan Ajay Atul", movie: "Agga Bai Arrecha (2004)", artist: "Shankar Mahadevan, Ajay-Atul", tag: "Heartache Classic", duration: "5:12" },
  { title: "Kiti Sangayche Mala", query: "Kiti Sangayche Mala Double Seat Jasraj Joshi Anandi Joshi", movie: "Double Seat (2015)", artist: "Jasraj Joshi, Anandi Joshi", tag: "Deep Sorrow", duration: "4:48" },
  { title: "Kadhi Tu Rimjhim Zharanari", query: "Kadhi Tu Rimjhim Zharanari Barsat Sandeep Khare Saleel Kulkarni", movie: "Ayushyavar Bolu Kahi", artist: "Saleel Kulkarni, Sandeep Khare", tag: "Melancholic Poetry", duration: "5:30" },
  { title: "Mee Raat Takali", query: "Mee Raat Takali Jait Re Jait Lata Mangeshkar Hridaynath", movie: "Jait Re Jait (1977)", artist: "Lata Mangeshkar", tag: "Heartbreak Folklore", duration: "4:22" },
  { title: "Jeevalaga Rahile Re Door", query: "Jeevalaga Rahile Re Door Ghar Majhe Lata Mangeshkar", movie: "Bhavgeet Classic", artist: "Lata Mangeshkar, Sudhir Phadke", tag: "Wounds of Heart", duration: "4:15" },
  { title: "Deva Tujhya Gabharyala", query: "Deva Tujhya Gabharyala Duniyadari Adarsh Shinde", movie: "Duniyadari (2013)", artist: "Adarsh Shinde, Kirti Killedar", tag: "Soulful Agony", duration: "4:35" },
  { title: "Shravanat Ghan Neela", query: "Shravanat Ghan Neela Barasla Lata Mangeshkar", movie: "Marathi Bhavgeet", artist: "Lata Mangeshkar, Hridaynath Mangeshkar", tag: "Poignant Rain", duration: "4:40" },
  { title: "Usavale Dhaage", query: "Usavale Dhaage Kaksparsh Rahul Ranade", movie: "Kaksparsh (2012)", artist: "Hamsika Iyer, Rahul Ranade", tag: "Emotional Solitude", duration: "4:50" }
];

const saloonFixQueries = [
  { title: "Mera Dil Bhi Kitna Pagal Hai", query: "Mera Dil Bhi Kitna Pagal Hai Saajan Kumar Sanu Alka", movie: "Saajan (1991)", artist: "Kumar Sanu, Alka Yagnik", tag: "Kumar Sanu Gold", duration: "5:25" },
  { title: "Dheere Dheere Se Meri Zindagi", query: "Dheere Dheere Se Meri Zindagi Aashiqui Kumar Sanu Anuradha", movie: "Aashiqui (1990)", artist: "Kumar Sanu, Anuradha Paudwal", tag: "Nadeem-Shravan", duration: "5:30" },
  { title: "Nazar Ke Samne Jigar Ke Paas", query: "Nazar Ke Samne Jigar Ke Paas Aashiqui Kumar Sanu", movie: "Aashiqui (1990)", artist: "Kumar Sanu, Anuradha Paudwal", tag: "Vintage Masterpiece", duration: "5:36" },
  { title: "Tujhe Dekha Toh Yeh Jaana Sanam", query: "Tujhe Dekha Toh Yeh Jaana Sanam DDLJ Kumar Sanu Lata", movie: "DDLJ (1995)", artist: "Kumar Sanu, Lata Mangeshkar", tag: "90s Romance", duration: "5:04" },
  { title: "Ek Ladki Ko Dekha Toh Aisa Laga", query: "Ek Ladki Ko Dekha Toh Aisa Laga 1942 Kumar Sanu", movie: "1942: A Love Story (1994)", artist: "Kumar Sanu", tag: "Acoustic Melody", duration: "4:36" },
  { title: "Aaye Ho Meri Zindagi Mein", query: "Aaye Ho Meri Zindagi Mein Udit Narayan Raja Hindustani", movie: "Raja Hindustani (1996)", artist: "Udit Narayan", tag: "Saloon Special", duration: "6:02" },
  { title: "Pardesi Pardesi Jaana Nahi", query: "Pardesi Pardesi Jaana Nahi Raja Hindustani Udit Alka", movie: "Raja Hindustani (1996)", artist: "Udit Narayan, Alka Yagnik", tag: "Everlasting", duration: "7:31" },
  { title: "Tumse Milne Ko Dil Karta Hai", query: "Tumse Milne Ko Dil Karta Hai Phool Aur Kaante Kumar Sanu", movie: "Phool Aur Kaante (1991)", artist: "Kumar Sanu, Alka Yagnik", tag: "Retro Classic", duration: "5:32" },
  { title: "Kuch Kuch Hota Hai", query: "Kuch Kuch Hota Hai Title Song Udit Narayan Alka Yagnik", movie: "Kuch Kuch Hota Hai (1998)", artist: "Udit Narayan, Alka Yagnik", tag: "Pure 90s", duration: "4:56" },
  { title: "Suraj Hua Maddham", query: "Suraj Hua Maddham K3G Sonu Nigam Alka Yagnik", movie: "K3G (2001)", artist: "Sonu Nigam, Alka Yagnik", tag: "Timeless", duration: "7:08" },
  { title: "Pehla Nasha", query: "Pehla Nasha Jo Jeeta Wohi Sikandar Udit Sadhana", movie: "Jo Jeeta Wohi Sikandar (1992)", artist: "Udit Narayan, Sadhana Sargam", tag: "Slow Romance", duration: "4:52" },
  { title: "Chura Liya Hai Tumne Jo Dil Ko", query: "Chura Liya Hai Tumne Jo Dil Ko Yaadon Ki Baaraat Asha Rafi", movie: "Yaadon Ki Baaraat (1973)", artist: "Asha Bhosle, Mohd Rafi", tag: "Evergreen", duration: "4:48" },
  { title: "Yeh Shaam Mastani", query: "Yeh Shaam Mastani Kati Patang Kishore Kumar", movie: "Kati Patang (1971)", artist: "Kishore Kumar", tag: "Retro Warmth", duration: "4:38" },
  { title: "Tumko Dekha Toh Yeh Khayal Aaya", query: "Tumko Dekha Toh Yeh Khayal Aaya Saath Saath Jagjit Singh", movie: "Saath Saath (1982)", artist: "Jagjit Singh, Chitra Singh", tag: "Acoustic Ghazal", duration: "4:50" }
];

async function runAll() {
  const results = { gulzar: [], marathiSad: [], saloonFix: [] };
  
  console.log('--- Fetching Gulzar Ghazals ---');
  for (const item of gulzarQueries) {
    const res = await findBestTrack(item.query);
    if (res) {
      console.log('✓ Found:', item.title, '->', res.id, '(' + res.title + ')');
      results.gulzar.push({
        id: res.id,
        title: item.title,
        artist: item.artist,
        movie: item.movie,
        duration: item.duration,
        thumb: `https://img.youtube.com/vi/${res.id}/hqdefault.jpg`,
        tag: item.tag
      });
    } else {
      console.log('✗ NOT FOUND:', item.title);
    }
  }

  console.log('--- Fetching Manache Ghaav Marathi Sad Songs ---');
  for (const item of marathiSadQueries) {
    const res = await findBestTrack(item.query);
    if (res) {
      console.log('✓ Found:', item.title, '->', res.id, '(' + res.title + ')');
      results.marathiSad.push({
        id: res.id,
        title: item.title,
        artist: item.artist,
        movie: item.movie,
        duration: item.duration,
        thumb: `https://img.youtube.com/vi/${res.id}/hqdefault.jpg`,
        tag: item.tag
      });
    } else {
      console.log('✗ NOT FOUND:', item.title);
    }
  }

  console.log('--- Fetching Saloon Fix Tracks ---');
  for (const item of saloonFixQueries) {
    const res = await findBestTrack(item.query);
    if (res) {
      console.log('✓ Found:', item.title, '->', res.id, '(' + res.title + ')');
      results.saloonFix.push({
        id: res.id,
        title: item.title,
        artist: item.artist,
        movie: item.movie,
        duration: item.duration,
        thumb: `https://img.youtube.com/vi/${res.id}/hqdefault.jpg`,
        tag: item.tag
      });
    } else {
      console.log('✗ NOT FOUND:', item.title);
    }
  }

  fs.writeFileSync('scripts/verified_tracks.json', JSON.stringify(results, null, 2));
  console.log('Saved verified tracks to scripts/verified_tracks.json');
}

runAll();
