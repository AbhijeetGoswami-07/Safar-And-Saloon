const http = require('http');

async function testEndpoint(method, path, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 3000,
      path: path,
      method: method,
      headers: headers
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('Testing server endpoints...');
  try {
    const rootRes = await testEndpoint('GET', '/');
    console.log('GET / ->', rootRes.statusCode, rootRes.headers['content-type']);

    const headRes = await testEndpoint('HEAD', '/');
    console.log('HEAD / ->', headRes.statusCode, headRes.headers['content-type']);

    const healthRes = await testEndpoint('GET', '/api/health');
    console.log('GET /api/health ->', healthRes.statusCode, healthRes.body.slice(0, 100));

    const soundRes = await testEndpoint('GET', '/sounds/highway_air_horn_1.mp3', { 'Range': 'bytes=0-1024' });
    console.log('GET /sounds/... (Range) ->', soundRes.statusCode, soundRes.headers['content-range'] || 'No range header');
  } catch (e) {
    console.log('Server not currently running or error:', e.message);
  }
}

run();
