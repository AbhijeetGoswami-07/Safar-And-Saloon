const https = require('https');

function searchYouTube(query) {
  return new Promise((resolve) => {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        const matches1 = [...body.matchAll(/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        const matches2 = [...body.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
        const combined = [...new Set([...matches1, ...matches2])];
        resolve(combined.slice(0, 10));
      });
    }).on('error', () => resolve([]));
  });
}

function verifyId(id) {
  return new Promise((resolve) => {
    https.get('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + id + '&format=json', (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const j = JSON.parse(d);
            resolve({ valid: true, id, title: j.title, author: j.author_name });
          } catch (e) {
            resolve({ valid: false });
          }
        } else {
          resolve({ valid: false });
        }
      });
    }).on('error', () => resolve({ valid: false }));
  });
}

async function findBestTrack(query) {
  const ids = await searchYouTube(query);
  for (const id of ids) {
    const res = await verifyId(id);
    if (res.valid) {
      return res;
    }
  }
  return null;
}

module.exports = { findBestTrack };
