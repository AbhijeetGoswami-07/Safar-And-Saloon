const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'visuals.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Replace Wet Road Specular Sheen (lines 698-712)
const wetStart = code.indexOf('    // Wet Road Specular Sheen (Reflecting Headlights & Storm Ambiance)');
const dividerStart = code.indexOf('    // 7. CENTER DASHED WHITE HIGHWAY DIVIDER STRIPES');

if (wetStart !== -1 && dividerStart !== -1) {
  const newWetSheen = `    // Wet Road Texture (Dark sleek wet asphalt, zero neon glow)
    if (isRain) {
      const wetSheen = ctx.createLinearGradient(0, horizon, 0, h);
      wetSheen.addColorStop(0, 'rgba(0, 0, 0, 0)');
      wetSheen.addColorStop(0.5, 'rgba(4, 7, 14, 0.25)'); // Dark moisture pooling
      wetSheen.addColorStop(1, 'rgba(2, 5, 10, 0.35)');
      ctx.fillStyle = wetSheen;
      ctx.beginPath();
      ctx.moveTo(roadCenterX - roadTopWidth / 2, horizon);
      ctx.lineTo(roadCenterX + roadTopWidth / 2, horizon);
      ctx.lineTo(roadCenterX + roadBottomWidth / 2, h);
      ctx.lineTo(roadCenterX - roadBottomWidth / 2, h);
      ctx.closePath();
      ctx.fill();
    }

`;
  code = code.substring(0, wetStart) + newWetSheen + code.substring(dividerStart);
} else {
  console.error('Could not find wetStart / dividerStart:', wetStart, dividerStart);
}

// 2. Replace Headlight Illumination section (Section 8)
const hlightStart = code.indexOf('    // 8. POWERFUL HIGH-INTENSITY HEADLIGHT GLOW');
const oncomingStart = code.indexOf('    // 9. ONCOMING TRAFFIC HEADLIGHTS');

if (hlightStart !== -1 && oncomingStart !== -1) {
  const newHlight = `    // 8. HIGHWAY HEADLIGHT ILLUMINATION (AUTHENTIC NON-GLOWING BEAM)
    // Only illuminate when dark/sunset/dawn. In rain, wet asphalt absorbs light; prevent overblown road glow!
    const needsHeadlights = isNight || isSunset || isDawn;
    if (needsHeadlights) {
      ctx.save();
      // Clip headlight illumination to the asphalt road polygon
      ctx.beginPath();
      ctx.moveTo(roadCenterX - roadTopWidth / 2, horizon);
      ctx.lineTo(roadCenterX + roadTopWidth / 2, horizon);
      ctx.lineTo(roadCenterX + roadBottomWidth / 2, h);
      ctx.lineTo(roadCenterX - roadBottomWidth / 2, h);
      ctx.closePath();
      ctx.clip();

      // Calibrated alpha that stays realistic and NEVER clamps or blows out into glowing road
      const beamAlpha = isNight ? (isRain ? 0.32 : 0.60) : (isSunset ? (isRain ? 0.22 : 0.42) : 0.20);
      const beamFocusY = horizon + (h - horizon) * 0.12;

      // Primary Forward Projector Light Field (Soft, natural warm halogen road beam)
      const forwardBeam = ctx.createRadialGradient(
        roadCenterX, h * 0.99, 30,
        roadCenterX, beamFocusY, roadBottomWidth * 0.88
      );
      forwardBeam.addColorStop(0, \`rgba(254, 243, 199, \${beamAlpha * 0.60})\`);
      forwardBeam.addColorStop(0.25, \`rgba(253, 230, 138, \${beamAlpha * 0.35})\`);
      forwardBeam.addColorStop(0.60, \`rgba(245, 158, 11, \${beamAlpha * 0.12})\`);
      forwardBeam.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = forwardBeam;
      ctx.fillRect(0, horizon, w, h - horizon);

      // Dual Halogen Cones from Bus Headlights
      const leftLightX = roadCenterX - roadBottomWidth * 0.28;
      const rightLightX = roadCenterX + roadBottomWidth * 0.28;

      [leftLightX, rightLightX].forEach((lx, idx) => {
        const aimOffset = (idx === 0 ? -1 : 1) * (roadTopWidth * 0.5);
        const coneGrad = ctx.createRadialGradient(lx, h, 15, roadCenterX + aimOffset, beamFocusY, w * 0.52);
        coneGrad.addColorStop(0, \`rgba(255, 255, 240, \${beamAlpha * 0.50})\`);
        coneGrad.addColorStop(0.35, \`rgba(254, 240, 138, \${beamAlpha * 0.25})\`);
        coneGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = coneGrad;
        ctx.beginPath();
        ctx.moveTo(lx - 25, h);
        ctx.lineTo(roadCenterX + aimOffset - roadTopWidth * 0.7, beamFocusY);
        ctx.lineTo(roadCenterX + aimOffset + roadTopWidth * 0.7, beamFocusY);
        ctx.lineTo(lx + 25, h);
        ctx.closePath();
        ctx.fill();
      });

      // Foreground Asphalt Specular Texture Sheen (Only in dry weather, never when raining)
      if (!isRain) {
        const asphaltSheen = ctx.createLinearGradient(0, h * 0.65, 0, h);
        asphaltSheen.addColorStop(0, 'rgba(254, 240, 138, 0)');
        asphaltSheen.addColorStop(0.6, \`rgba(255, 250, 200, \${beamAlpha * 0.15})\`);
        asphaltSheen.addColorStop(1, \`rgba(255, 255, 240, \${beamAlpha * 0.26})\`);
        ctx.fillStyle = asphaltSheen;
        ctx.fillRect(0, h * 0.65, w, h * 0.35);
      }

      ctx.restore();
    }

`;
  code = code.substring(0, hlightStart) + newHlight + code.substring(oncomingStart);
} else {
  console.error('Could not find hlightStart / oncomingStart:', hlightStart, oncomingStart);
}

// 3. Update streetlamps condition
code = code.replace(
  'if (isNight || isSunset || isDawn || this.isRainActive) {\n          const lampGlow',
  'if (isNight || isSunset || isDawn) {\n          const lampGlow'
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated js/visuals.js to prevent rain road glow!');
