const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const desktopPath = path.join(process.env.USERPROFILE, 'OneDrive', 'Desktop');
const targetBat = path.join(__dirname, '..', 'PUSH_TO_GITHUB.bat');
const shortcutPath = path.join(desktopPath, 'Sync with GitHub - Safar & Saloon.lnk');

const psScript = `
$ws = New-Object -ComObject WScript.Shell
$shortcut = $ws.CreateShortcut('${shortcutPath.replace(/'/g, "''")}')
$shortcut.TargetPath = '${targetBat.replace(/'/g, "''")}'
$shortcut.WorkingDirectory = '${path.dirname(targetBat).replace(/'/g, "''")}'
$shortcut.Description = 'Automatically Commit and Push Safar & Saloon to GitHub'
$shortcut.Save()
`;

try {
  execSync(`powershell -NoProfile -Command "${psScript.replace(/\n/g, '; ')}"`);
  console.log('Successfully created Desktop shortcut:', shortcutPath);
} catch (e) {
  console.error('Error creating shortcut:', e.message);
}
