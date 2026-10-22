const fs = require('fs');
let code = fs.readFileSync('js/visuals.js', 'utf8');

const startIdx = code.indexOf('    // 8. RUSTIC TIMBER ROOF AWNING & FASCIAS');
const endIdx = code.indexOf('    // 9. VINTAGE ROTATING BARBER POLE');

if (startIdx !== -1 && endIdx !== -1) {
  const target = code.substring(startIdx, endIdx);
  const replacement = `    // 8. VINTAGE DELUXE SALOON FASCIAS & SIGNBOARD
    ctx.save();
    const fasciaW = Math.min(w * 0.88, 860);
    const fasciaX = (w - fasciaW) / 2;
    const fasciaY = Math.max(16, roofY - 26);

    // Weathered Corrugated Zinc Roof Overhang behind Signboard
    const zincGrad = ctx.createLinearGradient(0, fasciaY - 14, 0, fasciaY);
    zincGrad.addColorStop(0, '#52525b');
    zincGrad.addColorStop(0.5, '#71717a');
    zincGrad.addColorStop(1, '#27272a');
    ctx.fillStyle = zincGrad;
    ctx.beginPath();
    ctx.moveTo(fasciaX - 12, fasciaY + 4);
    ctx.lineTo(fasciaX + 12, fasciaY - 14);
    ctx.lineTo(fasciaX + fasciaW - 12, fasciaY - 14);
    ctx.lineTo(fasciaX + fasciaW + 12, fasciaY + 4);
    ctx.closePath();
    ctx.fill();

    // Red Fascia Signboard with Gold Border
    ctx.fillStyle = '#991b1b';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(fasciaX, fasciaY, fasciaW, 26, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 11.5px sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText("DELUXE GENTLEMEN'S HAIR SALON & SHAVING • EST. 1994", w * 0.5, fasciaY + 17);
    ctx.restore();

`;
  code = code.replace(target, replacement);
  fs.writeFileSync('js/visuals.js', code);
  console.log('Replaced section 8 successfully!');
} else {
  console.log('Not found:', startIdx, endIdx);
}
