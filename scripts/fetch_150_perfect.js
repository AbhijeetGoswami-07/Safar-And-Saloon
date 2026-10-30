const https = require('https');
const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, 'verified_150_cache.json');
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (e) {
    cache = {};
  }
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

function searchYouTube(query) {
  return new Promise((resolve) => {
    const cleanQuery = query.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, ' ').replace(/\s+/g, ' ').trim();
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(cleanQuery);
    const req = https.get(url, {
      headers: {
        'User-Agent': UA,
        'Accept-Language': 'en-US,en;q=0.9'
      }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        const matches1 = [...body.matchAll(/watch\?v=([a-zA-Z0-9_-]{11})/g)].map(m => m[1]);
        const matches2 = [...body.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
        const combined = [...new Set([...matches1, ...matches2])];
        resolve(combined.slice(0, 20));
      });
    });
    req.on('error', () => resolve([]));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve([]);
    });
  });
}

function verifyId(id) {
  return new Promise((resolve) => {
    const req = https.get('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + id + '&format=json', {
      headers: {
        'User-Agent': UA
      }
    }, (res) => {
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
    });
    req.on('error', () => resolve({ valid: false }));
    req.setTimeout(4000, () => {
      req.destroy();
      resolve({ valid: false });
    });
  });
}

function parseTrackLine(line) {
  let title = '';
  let artist = '';
  let movie = '';
  
  if (line.includes('–')) {
    const parts = line.split('–').map(s => s.trim());
    title = parts[0];
    const rest = parts.slice(1).join('–').trim();
    const movieMatch = rest.match(/\((.*?)\)/);
    if (movieMatch) {
      movie = movieMatch[1];
      artist = rest.replace(/\((.*?)\)/, '').trim();
    } else {
      artist = rest;
    }
  } else if (line.includes('-')) {
    const parts = line.split('-').map(s => s.trim());
    title = parts[0];
    const rest = parts.slice(1).join('-').trim();
    const movieMatch = rest.match(/\((.*?)\)/);
    if (movieMatch) {
      movie = movieMatch[1];
      artist = rest.replace(/\((.*?)\)/, '').trim();
    } else {
      artist = rest;
    }
  } else {
    const movieMatch = line.match(/\((.*?)\)/);
    if (movieMatch) {
      movie = movieMatch[1];
      title = line.replace(/\((.*?)\)/, '').trim();
    } else {
      title = line;
    }
  }
  
  if (!artist && movie) {
    artist = movie;
  }
  return { original: line, title, artist, movie };
}

async function findEmbeddableForSong(item) {
  const parsed = parseTrackLine(item.original);
  
  const queries = [
    `${parsed.title} ${parsed.artist} audio`,
    `${parsed.title} ${parsed.movie} song`,
    `${parsed.title} audio`,
    `${parsed.title} ${parsed.artist}`,
    `${parsed.title}`
  ].filter(Boolean);

  const seenIds = new Set();

  for (const q of queries) {
    const ids = await searchYouTube(q);
    const newIds = ids.filter(id => !seenIds.has(id));
    newIds.forEach(id => seenIds.add(id));

    if (newIds.length > 0) {
      const verifications = await Promise.all(newIds.map(id => verifyId(id)));
      const valid = verifications.filter(v => v.valid);
      if (valid.length > 0) {
        return {
          id: valid[0].id,
          title: parsed.title,
          artist: parsed.artist || valid[0].author,
          movie: parsed.movie || '',
          ytTitle: valid[0].title,
          author: valid[0].author
        };
      }
    }
    await new Promise(r => setTimeout(r, 200));
  }

  return null;
}

async function run() {
  const assignments = JSON.parse(fs.readFileSync(path.join(__dirname, 'station_assignments.json'), 'utf8'));
  console.log(`Starting fetch_150_perfect for all ${assignments.length} tracks...`);

  let completed = 0;
  let successful = 0;

  for (let i = 0; i < assignments.length; i++) {
    const item = assignments[i];
    const key = `${item.section}:${item.index}:${item.original}`;

    if (cache[key] && cache[key].id && cache[key].valid) {
      completed++;
      successful++;
      // console.log(`[${i+1}/${assignments.length}] Cached: ${item.original.slice(0, 30)} -> ${cache[key].id}`);
      continue;
    }

    console.log(`[${i + 1}/${assignments.length}] Searching: "${item.original}" (${item.station})`);
    const found = await findEmbeddableForSong(item);
    completed++;

    if (found) {
      successful++;
      cache[key] = {
        valid: true,
        id: found.id,
        title: found.title,
        artist: found.artist,
        movie: found.movie,
        ytTitle: found.ytTitle,
        author: found.author,
        thumb: `https://img.youtube.com/vi/${found.id}/hqdefault.jpg`,
        duration: '4:30',
        original: item.original,
        section: item.section,
        station: item.station,
        tag: item.tag
      };
      console.log(`  -> SUCCESS: ${found.id} | ${found.title} (${found.ytTitle.slice(0, 35)}...)`);
    } else {
      console.error(`  -> FAILED: ${item.original}`);
    }

    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n================ FETCH COMPLETE ================`);
  console.log(`Total: ${assignments.length}`);
  console.log(`Verified 200 OK: ${successful}`);
  console.log(`Missing: ${assignments.length - successful}`);
}

run();
