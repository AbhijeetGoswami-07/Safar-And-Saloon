const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'audioEngine.js');
let code = fs.readFileSync(filePath, 'utf8');

const targetStart = code.indexOf('  // Play Song Melodic Hook via Truck Rooftop PA Pressure Horn');
const targetEnd = code.indexOf('  // Single Quick');

if (targetStart !== -1 && targetEnd !== -1) {
  const replacement = `  // Play Air Horn (triggers modular PressureHornSystem with single signature trumpet)
  playTruckAirHorn() {
    if (window.pressureHornSystem) {
      return window.pressureHornSystem.blowHorn();
    }
    return this.playSingleHighwayHorn();
  }

  playSingleHighwayHorn() {
    this.init();
    if (this.isMuted) return null;
    const t = this.ctx.currentTime;
    const dur = 1.55;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const oscSub = this.ctx.createOscillator();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(185, t);
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(233.08, t);
    oscSub.type = 'triangle';
    oscSub.frequency.setValueAtTime(92.5, t);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.42 * this.volumes.sfx, t + 0.02);
    g.gain.setValueAtTime(0.38 * this.volumes.sfx, t + dur - 0.2);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);

    osc1.connect(g); osc2.connect(g); oscSub.connect(g);
    g.connect(this.masterGain);

    osc1.start(t); osc2.start(t); oscSub.start(t);
    osc1.stop(t + dur); osc2.stop(t + dur); oscSub.stop(t + dur);
    return 'Highway Air Horn';
  }

`;
  code = code.substring(0, targetStart) + replacement + code.substring(targetEnd);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('Successfully updated js/audioEngine.js!');
} else {
  console.error('Could not find target in audioEngine.js:', targetStart, targetEnd);
}
