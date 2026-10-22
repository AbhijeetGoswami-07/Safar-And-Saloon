const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const filesToInclude = [
  'package.json',
  'server.js',
  'index.html',
  'css/styles.css',
  'js/playlistData.js',
  'js/player.js',
  'js/audioEngine.js',
  'js/pressureHorn.js',
  'js/visuals.js',
  'js/app.js',
  'README.md',
  'AI_STUDIO_EXPORT.md',
  'scripts/patch_visuals.js',
  'scripts/find_tracks.js',
  'scripts/run_track_fetch.js',
  'scripts/update_playlist_data.js',
  'scripts/verified_tracks.json'
];

let bundle = `# ==============================================================================
# SAFAR & SALOON (PLAYLIST) - COMPLETE CONSOLIDATED CODEBASE
# ==============================================================================
# Project: Safar & Saloon (Bus Driver & Deluxe Saloon Dual Retro Radio)
# Repository: https://github.com/AbhijeetGoswami-07/Safar-And-Saloon
# Total Files: ${filesToInclude.length}
# ==============================================================================

`;

for (const relPath of filesToInclude) {
  const fullPath = path.join(projectRoot, relPath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(relPath).toLowerCase();
    let lang = 'plaintext';
    if (ext === '.js') lang = 'javascript';
    else if (ext === '.html') lang = 'html';
    else if (ext === '.css') lang = 'css';
    else if (ext === '.json') lang = 'json';
    else if (ext === '.md') lang = 'markdown';

    const content = fs.readFileSync(fullPath, 'utf8');
    bundle += `\n/* ============================================================================== */\n`;
    bundle += `/* FILE: ${relPath} */\n`;
    bundle += `/* ============================================================================== */\n\n`;
    bundle += `\`\`\`${lang}:${relPath}\n`;
    bundle += content;
    bundle += `\n\`\`\`\n\n`;
  } else {
    console.warn(`File not found: ${fullPath}`);
  }
}

// 1. Create file named 'Playlist' (exact name specified by user)
const playlistFilePath = path.join(projectRoot, 'Playlist');
fs.writeFileSync(playlistFilePath, bundle, 'utf8');

// 2. Also create 'Playlist.txt' and 'Playlist.md' for convenience across platforms/editors
fs.writeFileSync(path.join(projectRoot, 'Playlist.txt'), bundle, 'utf8');
fs.writeFileSync(path.join(projectRoot, 'Playlist.md'), bundle, 'utf8');

console.log('Successfully created:');
console.log(' - ' + playlistFilePath);
console.log(' - ' + path.join(projectRoot, 'Playlist.txt'));
console.log(' - ' + path.join(projectRoot, 'Playlist.md'));
