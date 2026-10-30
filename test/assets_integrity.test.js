const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

describe('Assets & Bundle Integrity Suite', () => {
  test('index.html contains all unique IDs with zero duplicates', () => {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const idRegex = /\sid=["']([^"']+)["']/g;
    const idCount = {};
    let match;
    while ((match = idRegex.exec(html)) !== null) {
      const id = match[1];
      idCount[id] = (idCount[id] || 0) + 1;
    }

    const duplicates = Object.keys(idCount).filter(id => idCount[id] > 1);
    assert.deepEqual(duplicates, [], `Found duplicate IDs: ${duplicates.join(', ')}`);
  });

  test('All DOM getElementById calls in js/app.js match real elements in index.html', () => {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const app = fs.readFileSync(path.join(ROOT, 'js', 'app.js'), 'utf8');
    const regex = /getElementById\(['"]([^'"]+)['"]\)/g;
    let match;
    const missing = [];
    while ((match = regex.exec(app)) !== null) {
      const id = match[1];
      const hasId = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
      if (!hasId) {
        missing.push(id);
      }
    }
    assert.deepEqual(missing, [], `Missing DOM IDs in index.html: ${missing.join(', ')}`);
  });

  test('All script and style asset links in index.html resolve to valid files', () => {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["']/gi;
    let match;
    while ((match = scriptRegex.exec(html)) !== null) {
      const src = match[1];
      if (!src.startsWith('http://') && !src.startsWith('https://')) {
        const cleanSrc = src.split('?')[0];
        assert.ok(fs.existsSync(path.join(ROOT, cleanSrc)), `Script must exist: ${cleanSrc}`);
      }
    }

    const linkRegex = /<link\s+[^>]*href=["']([^"']+)["']/gi;
    while ((match = linkRegex.exec(html)) !== null) {
      const href = match[1];
      if (!href.startsWith('http://') && !href.startsWith('https://')) {
        const cleanHref = href.split('?')[0];
        assert.ok(fs.existsSync(path.join(ROOT, cleanHref)), `Asset link must exist: ${cleanHref}`);
      }
    }
  });

  test('Custom fonts and sounds referenced in code exist on disk with valid file sizes', () => {
    const font1 = path.join(ROOT, 'fonts', 'BigShoulders-VariableFont_opsz,wght.ttf');
    const font2 = path.join(ROOT, 'fonts', 'static', 'BigShoulders_60pt-Black.ttf');
    const sound1 = path.join(ROOT, 'sounds', 'highway_air_horn_1.mp3');
    const sound2 = path.join(ROOT, 'sounds', 'highway_air_horn_2.mp3');

    assert.ok(fs.existsSync(font1) && fs.statSync(font1).size > 10000);
    assert.ok(fs.existsSync(font2) && fs.statSync(font2).size > 10000);
    assert.ok(fs.existsSync(sound1) && fs.statSync(sound1).size > 10000);
    assert.ok(fs.existsSync(sound2) && fs.statSync(sound2).size > 10000);
  });

  test('create_playlist_file.js compiles full project bundles without errors', () => {
    const result = spawnSync(process.execPath, ['scripts/create_playlist_file.js'], {
      cwd: ROOT,
      encoding: 'utf8'
    });
    assert.equal(result.status, 0);

    const bundlePath = path.join(ROOT, 'Playlist');
    const bundleMdPath = path.join(ROOT, 'Playlist.md');
    const bundleTxtPath = path.join(ROOT, 'Playlist.txt');

    assert.ok(fs.existsSync(bundlePath) && fs.statSync(bundlePath).size > 100000);
    assert.ok(fs.existsSync(bundleMdPath) && fs.statSync(bundleMdPath).size > 100000);
    assert.ok(fs.existsSync(bundleTxtPath) && fs.statSync(bundleTxtPath).size > 100000);
  });
});
