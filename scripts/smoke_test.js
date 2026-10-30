const http = require('http');

async function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 3000,
      path: path,
      method: options.method || 'GET',
      headers: options.headers || {}
    }, (res) => {
      let data = Buffer.alloc(0);
      res.on('data', chunk => data = Buffer.concat([data, chunk]));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data.toString('utf8'),
          rawLength: data.length
        });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function smokeTest() {
  console.log('=== RUNTIME SMOKE TEST SUITE ===');

  let passed = 0;
  let failed = 0;

  async function check(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
      failed++;
    }
  }

  // 1. Health endpoint
  await check('GET /api/health returns 200 OK with valid JSON', async () => {
    const res = await request('/api/health');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    const json = JSON.parse(res.body);
    if (json.status !== 'ok') throw new Error(`Status field is ${json.status}`);
    if (json.service !== 'safar-and-saloon') throw new Error(`Service name mismatch`);
  });

  // 2. HEAD /api/health
  await check('HEAD /api/health returns 200 with 0 body bytes', async () => {
    const res = await request('/api/health', { method: 'HEAD' });
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (res.rawLength !== 0) throw new Error(`Expected 0 body bytes, got ${res.rawLength}`);
  });

  // 3. Root index.html
  await check('GET / returns 200 with complete HTML document', async () => {
    const res = await request('/');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.includes('<!DOCTYPE html>')) throw new Error('Missing doctype');
    if (!res.body.includes('Safar & Saloon')) throw new Error('Missing title');
  });

  // 4. Stylesheet
  await check('GET /css/styles.css returns 200 text/css', async () => {
    const res = await request('/css/styles.css');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.headers['content-type'].includes('text/css')) throw new Error('Wrong Content-Type');
  });

  // 5. JavaScript bundles
  const jsFiles = ['app.js', 'audioEngine.js', 'player.js', 'playlistData.js', 'pressureHorn.js', 'visuals.js'];
  for (const js of jsFiles) {
    await check(`GET /js/${js} returns 200 application/javascript`, async () => {
      const res = await request(`/js/${js}`);
      if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
      if (!res.headers['content-type'].includes('javascript')) throw new Error('Wrong Content-Type');
    });
  }

  // 6. Font asset
  await check('GET /fonts/BigShoulders-VariableFont_opsz,wght.ttf returns 200 font/ttf', async () => {
    const res = await request('/fonts/BigShoulders-VariableFont_opsz,wght.ttf');
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.headers['content-type'].includes('font/ttf')) throw new Error('Wrong Content-Type');
    if (res.rawLength < 10000) throw new Error('File truncated');
  });

  // 7. Sound asset with Range Header
  await check('GET /sounds/highway_air_horn_1.mp3 with Range header returns 206 Partial Content', async () => {
    const res = await request('/sounds/highway_air_horn_1.mp3', {
      headers: { 'Range': 'bytes=0-511' }
    });
    if (res.statusCode !== 206) throw new Error(`Status ${res.statusCode}`);
    if (!res.headers['content-range']) throw new Error('Missing Content-Range header');
    if (res.rawLength !== 512) throw new Error(`Expected 512 bytes, got ${res.rawLength}`);
  });

  // 8. Security traversal check
  await check('GET /../../package.json returns 403 Forbidden', async () => {
    const res = await request('/../../package.json');
    if (res.statusCode !== 403) throw new Error(`Expected 403, got ${res.statusCode}`);
  });

  console.log(`\n=== SMOKE TEST RESULTS: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
}

smokeTest();
