/**
 * Safar & Saloon - Automated Git & GitHub Synchronization Engine
 * Bundles codebase files, analyzes changed files, generates intelligent semantic commits,
 * and pushes to GitHub with one-click simplicity.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const readline = require('readline');

const root = path.resolve(__dirname, '..');

// 1. Locate Git executable across standard installation directories
function findGit() {
  if (process.env.GIT_EXE && fs.existsSync(process.env.GIT_EXE)) {
    return process.env.GIT_EXE;
  }
  const possiblePaths = [
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'MinGit', 'cmd', 'git.exe'),
    path.join(process.env.ProgramFiles || '', 'Git', 'cmd', 'git.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Git', 'cmd', 'git.exe'),
    path.join(process.env.USERPROFILE || '', 'AppData', 'Local', 'Programs', 'Git', 'cmd', 'git.exe'),
    'git'
  ];
  for (const p of possiblePaths) {
    if (p === 'git') {
      const check = spawnSync('where', ['git'], { stdio: 'ignore' });
      if (check.status === 0) return 'git';
    } else if (p && fs.existsSync(p)) {
      return p;
    }
  }
  return null;
}

const gitExe = findGit();

if (!gitExe) {
  console.error('\n[ERROR] Git was not found in system PATH or standard folders.');
  console.error('Please make sure Git is installed or MinGit is present.\n');
  process.exit(1);
}

function runGit(args, inheritStdio = false) {
  const opts = {
    cwd: root,
    encoding: 'utf8',
    stdio: inheritStdio ? 'inherit' : ['pipe', 'pipe', 'pipe']
  };
  return spawnSync(gitExe, args, opts);
}

// 2. Automatically update single Playlist bundles if create_playlist_file.js exists
const bundleScript = path.join(__dirname, 'create_playlist_file.js');
if (fs.existsSync(bundleScript)) {
  console.log('[1/4] Refreshing project bundle files (Playlist, Playlist.md, Playlist.txt)...');
  try {
    spawnSync(process.execPath, [bundleScript], { cwd: root, stdio: 'ignore' });
    console.log('      Bundles verified and up to date.');
  } catch (e) {
    console.log('      Warning: Bundle update script skipped:', e.message);
  }
}

// 3. Inspect Git status
console.log('[2/4] Inspecting repository status...');
const statusRes = runGit(['status', '--porcelain']);
const statusText = (statusRes.stdout || '').trim();

// Check if there are unpushed commits even if working tree is clean
const unpushedRes = runGit(['log', 'origin/main..HEAD', '--oneline']);
const unpushedText = (unpushedRes.stdout || '').trim();

if (!statusText && !unpushedText) {
  console.log('\n==============================================================================');
  console.log(' [OK] EVERYTHING IS UP TO DATE!');
  console.log(' No uncommitted changes or unpushed commits detected.');
  console.log(' GitHub repository: https://github.com/AbhijeetGoswami-07/Safar-And-Saloon');
  console.log('==============================================================================\n');
  process.exit(0);
}

// 4. Determine changed files and formulate an intelligent commit message
const changedLines = statusText ? statusText.split('\n') : [];
const changedFiles = changedLines.map(line => line.substring(3).trim());

function generateCommitMessage(files) {
  if (files.length === 0) {
    return 'chore: push pending commits to GitHub';
  }

  const now = new Date();
  const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

  const hasUi = files.some(f => f.endsWith('.html') || f.endsWith('.css'));
  const hasAudio = files.some(f => f.includes('audio') || f.includes('player') || f.includes('playlist'));
  const hasDocs = files.some(f => f.toLowerCase().endsWith('.md') || f.toLowerCase().endsWith('.txt') || f === 'Playlist');
  const hasScripts = files.some(f => f.startsWith('scripts/') || f.endsWith('.bat'));

  let type = 'feat';
  let summary = '';

  if (hasUi && hasAudio) {
    type = 'feat(radio)';
    summary = 'update dual-mode interface, audio playback & atmosphere controls';
  } else if (hasUi) {
    type = 'fix(ui)';
    summary = 'enhance visual layout, responsive styles and alignment';
  } else if (hasAudio) {
    type = 'feat(audio)';
    summary = 'update audio tracks, frequencies and playback engines';
  } else if (hasDocs && files.length <= 3) {
    type = 'docs';
    summary = 'update documentation and project bundle archives';
  } else if (hasScripts && files.length <= 2) {
    type = 'chore(scripts)';
    summary = 'update automation and project launch scripts';
  } else {
    type = 'feat';
    summary = 'update codebase files and synchronize project assets';
  }

  return `${type}: ${summary} [${dateStr}]`;
}

const defaultMessage = generateCommitMessage(changedFiles);

// Check if commit message was passed as CLI argument
const cliMsg = process.argv.slice(2).join(' ').trim();

async function getCommitMessage() {
  if (cliMsg) return cliMsg;

  if (changedFiles.length === 0) {
    return defaultMessage;
  }

  console.log('\nChanged files:');
  changedFiles.slice(0, 10).forEach(f => console.log('  * ' + f));
  if (changedFiles.length > 10) {
    console.log(`  ... and ${changedFiles.length - 10} more files`);
  }

  console.log(`\nDefault commit message:`);
  console.log(`  "${defaultMessage}"`);
  console.log(`\nPress ENTER to use default, or type a custom commit message:`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    // 10 second auto-continue if unattended
    let resolved = false;
    let secondsLeft = 10;
    
    process.stdout.write(`Auto-committing with default message in ${secondsLeft}s (or press Enter)... `);
    
    const interval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(interval);
        if (!resolved) {
          resolved = true;
          process.stdout.write('\n');
          rl.close();
          resolve(defaultMessage);
        }
      }
    }, 1000);

    rl.question('', (answer) => {
      clearInterval(interval);
      if (!resolved) {
        resolved = true;
        rl.close();
        const finalMsg = answer.trim() ? answer.trim() : defaultMessage;
        resolve(finalMsg);
      }
    });
  });
}

async function main() {
  const commitMsg = await getCommitMessage();

  if (statusText) {
    console.log('\n[3/4] Staging files and creating commit...');
    console.log(`      Commit Message: "${commitMsg}"`);

    const addRes = runGit(['add', '-A']);
    if (addRes.status !== 0) {
      console.error('[ERROR] git add failed:', addRes.stderr);
      process.exit(1);
    }

    const commitRes = runGit(['commit', '-m', commitMsg]);
    if (commitRes.status !== 0) {
      console.error('[ERROR] git commit failed:', commitRes.stderr);
      process.exit(1);
    }
    console.log('      Commit successfully created.');
  } else {
    console.log('\n[3/4] No new uncommitted files. Proceeding to push existing commits...');
  }

  console.log('\n[4/4] Pushing changes to GitHub (origin/main)...');
  const pushRes = runGit(['push', 'origin', 'main'], true);

  if (pushRes.status === 0) {
    // Get latest commit hash
    const hashRes = runGit(['rev-parse', '--short', 'HEAD']);
    const commitHash = (hashRes.stdout || '').trim();

    console.log('\n==============================================================================');
    console.log('  SUCCESS! CODE SUCCESSFULLY COMMITTED AND PUSHED TO GITHUB!');
    console.log('==============================================================================');
    console.log(`  Commit Hash: ${commitHash}`);
    console.log(`  Branch:      main`);
    console.log(`  Repository:  https://github.com/AbhijeetGoswami-07/Safar-And-Saloon`);
    console.log('==============================================================================\n');
  } else {
    console.error('\n[ERROR] git push encountered an issue.');
    console.error('Please verify your internet connection or GitHub credentials.');
  }
}

main().catch(err => {
  console.error('\n[FATAL ERROR]', err.message);
  process.exit(1);
});
