const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');

let server;
let port;

function makeRequest(method, reqPath, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: port,
      path: reqPath,
      method: method,
      headers: headers
    }, (res) => {
      let data = Buffer.alloc(0);
      res.on('data', chunk => {
        data = Buffer.concat([data, chunk]);
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data.toString('utf8'),
          rawBody: data
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

describe('HTTP Server Suite (server.js)', () => {
  before(async () => {
    server = require('../server.js');
    await new Promise(resolve => {
      server.listen(0, '127.0.0.1', () => {
        port = server.address().port;
        resolve();
      });
    });
  });

  after(async () => {
    if (server && server.listening) {
      await new Promise(resolve => server.close(resolve));
    }
  });

  test('GET / returns 200 OK with index.html', async () => {
    const res = await makeRequest('GET', '/');
    assert.equal(res.statusCode, 200);
    assert.match(res.headers['content-type'], /text\/html/);
    assert.ok(res.body.includes('<!DOCTYPE html>'));
    assert.ok(res.body.includes('Safar & Saloon'));
  });

  test('HEAD / returns 200 with headers but 0 body bytes', async () => {
    const res = await makeRequest('HEAD', '/');
    assert.equal(res.statusCode, 200);
    assert.match(res.headers['content-type'], /text\/html/);
    assert.equal(res.rawBody.length, 0);
    assert.ok(parseInt(res.headers['content-length'], 10) > 0);
  });

  test('GET /api/health returns 200 and healthy JSON schema', async () => {
    const res = await makeRequest('GET', '/api/health');
    assert.equal(res.statusCode, 200);
    assert.equal(res.headers['content-type'], 'application/json');
    const json = JSON.parse(res.body);
    assert.equal(json.status, 'ok');
    assert.equal(json.service, 'safar-and-saloon');
    assert.equal(json.version, '1.0.0');
    assert.ok(typeof json.uptime === 'number');
    assert.ok(new Date(json.timestamp).getTime() > 0);
  });

  test('GET /health alias returns 200 and healthy JSON schema', async () => {
    const res = await makeRequest('GET', '/health');
    assert.equal(res.statusCode, 200);
    const json = JSON.parse(res.body);
    assert.equal(json.status, 'ok');
  });

  test('GET static CSS and JS files with proper MIME types', async () => {
    const cssRes = await makeRequest('GET', '/css/styles.css');
    assert.equal(cssRes.statusCode, 200);
    assert.match(cssRes.headers['content-type'], /text\/css/);

    const jsRes = await makeRequest('GET', '/js/app.js');
    assert.equal(jsRes.statusCode, 200);
    assert.match(jsRes.headers['content-type'], /javascript/);
  });

  test('GET audio file with RFC 7233 byte-range request', async () => {
    const res = await makeRequest('GET', '/sounds/highway_air_horn_1.mp3', {
      'Range': 'bytes=0-1023'
    });
    assert.equal(res.statusCode, 206);
    assert.equal(res.headers['content-type'], 'audio/mpeg');
    assert.equal(res.headers['accept-ranges'], 'bytes');
    assert.equal(res.headers['content-length'], '1024');
    assert.match(res.headers['content-range'], /^bytes 0-1023\/\d+$/);
    assert.equal(res.rawBody.length, 1024);
  });

  test('GET invalid range returns 416 Range Not Satisfiable', async () => {
    const res = await makeRequest('GET', '/sounds/highway_air_horn_1.mp3', {
      'Range': 'bytes=9999999-99999999'
    });
    assert.equal(res.statusCode, 416);
  });

  test('POST / returns 405 Method Not Allowed', async () => {
    const res = await makeRequest('POST', '/');
    assert.equal(res.statusCode, 405);
  });

  test('GET non-existent file returns 404 Not Found', async () => {
    const res = await makeRequest('GET', '/non-existent-file-404.html');
    assert.equal(res.statusCode, 404);
  });

  test('Directory traversal attack attempt returns 403 Forbidden', async () => {
    const res = await makeRequest('GET', '/../../../../etc/passwd');
    assert.equal(res.statusCode, 403);
  });
});
