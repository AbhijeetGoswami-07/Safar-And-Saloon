/**
 * SAFAR & SALOON - Dynamic Canvas & Visual Atmosphere Engine
 * High-performance 60FPS dual-mode visual systems:
 * Mode 1: 3D Perspective Highway with Real-Time Day/Night Cycle, Headlight Glow & NH-48 Journey
 * Mode 2: Graphic Indian Village Deluxe Barber Shop (Barber Shaving Beard & Patrons on Bench)
 */

class VisualsEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;
    this.activeMode = 'driver'; // 'driver' or 'saloon'
    this.isPlaying = false;

    // Window dimensions
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    // Time of Day Sync (null = auto real-time, or 'day', 'sunset', 'night', 'dawn')
    this.timeOverride = null;

    // NH-48 Interstate Highway Journey Corridor (13 Iconic Stages)
    this.routeLocations = [
      { city: "New Delhi", landmark: "ISBT Kashmere Gate", km: 0, nextCity: "Gurgaon", nextDist: 32, tag: "CAPITAL EXPRESS" },
      { city: "Gurgaon", landmark: "Cyber City Expressway", km: 38, nextCity: "Neemrana", nextDist: 85, tag: "EXPRESS TOLLWAY" },
      { city: "Neemrana", landmark: "Midway Heritage Dhaba", km: 122, nextCity: "Jaipur", nextDist: 145, tag: "HIGHWAY CORRIDOR" },
      { city: "Jaipur", landmark: "Amber Fort Bypass", km: 268, nextCity: "Ajmer", nextDist: 130, tag: "PINK CITY EXPEDITION" },
      { city: "Ajmer", landmark: "Kishangarh Toll Plaza", km: 395, nextCity: "Bhilwara", nextDist: 115, tag: "MARBLE HIGHWAY" },
      { city: "Bhilwara", landmark: "Textile Link Road", km: 510, nextCity: "Udaipur", nextDist: 150, tag: "TEXTILE CORRIDOR" },
      { city: "Udaipur", landmark: "Lake Aravali Pass", km: 660, nextCity: "Shamlaji", nextDist: 105, tag: "ARAVALI PASS" },
      { city: "Shamlaji", landmark: "Ratanpur Border Checkpost", km: 765, nextCity: "Ahmedabad", nextDist: 150, tag: "STATE BORDER" },
      { city: "Ahmedabad", landmark: "Ring Expressway", km: 915, nextCity: "Vadodara", nextDist: 110, tag: "HERITAGE EXPRESS" },
      { city: "Vadodara", landmark: "Golden Bridge Crossing", km: 1025, nextCity: "Surat", nextDist: 135, tag: "SANSKARI NAGARI" },
      { city: "Surat", landmark: "Tapi River Viaduct", km: 1160, nextCity: "Vapi", nextDist: 125, tag: "DIAMOND CORRIDOR" },
      { city: "Vapi & Manor", landmark: "Manor Ghat Misty Forest", km: 1285, nextCity: "Mumbai", nextDist: 135, tag: "COASTAL GHATS" },
      { city: "Mumbai", landmark: "Western Express Corridor", km: 1420, nextCity: "New Delhi", nextDist: 1420, tag: "METROPOLIS TERMINAL" }
    ];

    // Bus mode parameters
    this.roadSpeed = 3.5;
    this.travelPhase = 0;
    this.lastFrameTime = performance.now();
    this.milestones = [];
    this.oncomingCars = [];
    this.stars = [];
    this.rainDrops = [];
    this.windshieldDrops = [];
    this.wiperAngle = 0.10; // Parked at rest (~6 deg)
    this.wiperDirection = 1;
    this.isRainActive = false;
    this.isWiperActive = false;
    this.lightningTimer = 0;
    this.lightningIntensity = 0;

    // Day sky clouds, storm clouds & roadside landscape
    this.dayClouds = [];
    this.stormClouds = [];
    this.roadsideTrees = [];
    this.telegraphPoles = [];
    this.streetLights = [];
    this.horizonLights = [];

    // Saloon mode parameters
    this.poleRotation = 0;
    this.steamOpacity = 0.45;
    this.steamDrops = [];
    this.fanRotation = 0;
    this.isFanActive = true;
    this.fanSpeed = 0.028; // Authentic slow, unhurried vintage ceiling fan speed
    this.shavingStroke = 0; // Animation for barber arm shaving beard
    this.lampPulse = 0;
    this.mistOrigin = null;
    this.saloonDustMotes = [];
    this.mugSteam = [];

    // Mouse tracking for amulet sway
    this.mouse = { x: this.w / 2, y: this.h / 2, isDown: false };
    this.amuletSway = 0;
    this.amuletTargetSway = 0;
  }

  init(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.handleResize();

    window.addEventListener('resize', () => this.handleResize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.amuletTargetSway = ((e.clientX / this.w) - 0.5) * 45;
    });

    this.initRoadEntities();
    this.initStars();
    this.initClouds();
    this.initRain();
    this.initSaloonAtmosphere();
    this.startLoop();
  }

  handleResize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    if (this.canvas) {
      this.canvas.width = this.w;
      this.canvas.height = this.h;
    }
  }

  setMode(mode) {
    this.activeMode = mode;
  }

  setPlayState(playing) {
    this.isPlaying = playing;
  }

  toggleRain(active) {
    this.isRainActive = active;
    this.isWiperActive = active;
    if (!active) {
      this.wiperAngle = 0.10; // Parked at rest
      this.wiperDirection = 1;
      this.windshieldDrops = []; // Wipe screen clear when rain stops
    }
  }

  toggleWipers(active) {
    if (!this.isRainActive) {
      this.isWiperActive = false;
      this.wiperAngle = 0.10;
      return;
    }
    this.isWiperActive = active;
  }

  toggleFan(active) {
    this.isFanActive = active;
  }

  triggerMist() {
    const origin = this.mistOrigin || { x: this.w * 0.35, y: this.h * 0.50 };
    for (let i = 0; i < 45; i++) {
      const angle = (Math.PI * 0.82) + (Math.random() - 0.5) * 0.65;
      const speed = Math.random() * 4.8 + 2.2;
      this.steamDrops.push({
        x: origin.x - 4,
        y: origin.y - 8 + (Math.random() - 0.5) * 8,
        vx: -Math.cos(angle - Math.PI) * speed,
        vy: Math.sin(angle - Math.PI) * speed - 0.8,
        r: Math.random() * 2.8 + 1.2,
        alpha: Math.random() * 0.65 + 0.35
      });
    }
  }

  /* ============================================================
   * REAL-TIME TIME OF DAY & INTERSTATE HIGHWAY LOCATION SYNC
   * ============================================================ */

  setTimeOverride(override) {
    // null or 'day', 'sunset', 'night', 'dawn'
    this.timeOverride = override;
  }

  getTimeOfDay() {
    if (this.timeOverride) {
      let label = 'Night Mode (Headlights)';
      let timeStr = '22:00';
      if (this.timeOverride === 'day') {
        label = 'Daylight Highway';
        timeStr = '13:00';
      } else if (this.timeOverride === 'sunset') {
        label = 'Sunset Golden Hour';
        timeStr = '18:30';
      } else if (this.timeOverride === 'dawn') {
        label = 'Dawn & Sunrise';
        timeStr = '06:00';
      }
      return { period: this.timeOverride, timeStr, label, isManual: true };
    }

    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const val = h + m / 60;
    const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

    let period = 'night';
    let label = 'Midnight Highway';
    if (val >= 5.0 && val < 7.0) {
      period = 'dawn';
      label = 'Dawn & Sunrise';
    } else if (val >= 7.0 && val < 17.5) {
      period = 'day';
      label = 'Bright Daylight';
    } else if (val >= 17.5 && val < 20.0) {
      period = 'sunset';
      label = 'Golden Sunset';
    } else {
      period = 'night';
      label = 'Night Highway';
    }
    return { period, timeStr, label, isManual: false };
  }

  getCurrentLocation() {
    const t = this.getTimeOfDay();
    const now = new Date();
    const hourVal = t.isManual
      ? (t.period === 'day' ? 13 : (t.period === 'sunset' ? 18.5 : (t.period === 'dawn' ? 6 : 22)))
      : (now.getHours() + now.getMinutes() / 60);

    const idx = Math.floor((hourVal / 24) * this.routeLocations.length) % this.routeLocations.length;
    return this.routeLocations[idx];
  }

  /* ============================================================
   * BUS DRIVER MODE GRAPHICS ENGINE
   * ============================================================ */

  initStars() {
    this.stars = [];
    for (let i = 0; i < 90; i++) {
      this.stars.push({
        x: Math.random() * this.w,
        y: Math.random() * (this.h * 0.42),
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005
      });
    }
  }

  initClouds() {
    this.dayClouds = [
      { x: this.w * 0.1, y: this.h * 0.20, w: 160, h: 48, speed: 0.14 },
      { x: this.w * 0.45, y: this.h * 0.26, w: 230, h: 62, speed: 0.20 },
      { x: this.w * 0.82, y: this.h * 0.18, w: 180, h: 52, speed: 0.16 },
      { x: -120, y: this.h * 0.22, w: 210, h: 56, speed: 0.15 }
    ];

    // Turbulent Dark Storm Clouds for Rain Mode
    this.stormClouds = [
      { x: this.w * 0.05, y: this.h * 0.18, w: 290, h: 90, speed: 0.38 },
      { x: this.w * 0.38, y: this.h * 0.15, w: 350, h: 110, speed: 0.48 },
      { x: this.w * 0.72, y: this.h * 0.20, w: 320, h: 95, speed: 0.42 },
      { x: -160, y: this.h * 0.24, w: 360, h: 115, speed: 0.45 }
    ];
  }

  initRoadEntities() {
    const loc = this.getCurrentLocation();
    this.milestones = [
      { z: 0.15, label: `NH-48 • ${loc.nextCity.toUpperCase()} ${loc.nextDist} KM`, side: 1 },
      { z: 0.58, label: "SHREE GANESH DHABA 2 KM", side: -1 },
      { z: 0.92, label: `MUMBAI ${Math.max(15, 1420 - loc.km)} KM`, side: 1 }
    ];

    this.oncomingCars = [
      { z: 0.2, speed: 0.008, lane: -1 },
      { z: 0.7, speed: 0.010, lane: -1 }
    ];

    // Roadside Telephone / Telegraph Utility Poles (NH-48 Highway Verge)
    this.telegraphPoles = [
      { z: 0.08, side: 1.18 },
      { z: 0.28, side: 1.18 },
      { z: 0.48, side: 1.18 },
      { z: 0.68, side: 1.18 },
      { z: 0.88, side: 1.18 },
      { z: 1.08, side: 1.18 }
    ];

    // Electric Highway Street Light Poles (Curved steel streetlights with downward road lamps)
    this.streetLights = [
      { z: 0.12, side: 1.15 },
      { z: 0.38, side: 1.15 },
      { z: 0.64, side: 1.15 },
      { z: 0.90, side: 1.15 }
    ];

    // Lush Roadside Indian Highway Trees (Neem, Babul, Peepal, Eucalyptus)
    this.roadsideTrees = [
      { z: 0.08, side: -1.45, scale: 0.90, type: 'neem' },
      { z: 0.22, side: 1.55, scale: 1.10, type: 'babul' },
      { z: 0.38, side: -1.50, scale: 1.05, type: 'peepal' },
      { z: 0.54, side: 1.50, scale: 1.20, type: 'neem' },
      { z: 0.70, side: -1.42, scale: 0.95, type: 'babul' },
      { z: 0.86, side: 1.55, scale: 1.05, type: 'peepal' },
      { z: 0.98, side: -1.48, scale: 1.15, type: 'neem' }
    ];

    // Distant Foothill Dhaba & Village Valley Lights (Kept safely off the road corridor)
    this.horizonLights = [];
    for (let i = 0; i < 26; i++) {
      const isLeft = (i % 2 === 0);
      const xRatio = isLeft ? (0.02 + Math.random() * 0.36) : (0.64 + Math.random() * 0.34);
      this.horizonLights.push({
        xRatio,
        yOffset: Math.random() * 22 - 26,
        r: Math.random() * 1.5 + 1.0,
        color: i % 4 === 0 ? 'rgba(239, 68, 68, 0.85)' : (i % 3 === 0 ? 'rgba(56, 189, 248, 0.75)' : 'rgba(251, 191, 36, 0.9)'),
        twinkleSpeed: Math.random() * 0.03 + 0.012,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  initSaloonAtmosphere() {
    this.saloonDustMotes = [];
    for (let i = 0; i < 30; i++) {
      this.saloonDustMotes.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -Math.random() * 0.32 - 0.08,
        r: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.45 + 0.20,
        phase: Math.random() * Math.PI * 2
      });
    }
    this.mugSteam = [];
  }

  initRain() {
    this.rainDrops = [];
    this.windshieldDrops = [];
    for (let i = 0; i < 140; i++) {
      this.rainDrops.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        length: Math.random() * 20 + 12,
        speed: Math.random() * 6 + 9,
        alpha: Math.random() * 0.35 + 0.15
      });
    }
  }

  renderBusMode(dtScale = 1.0) {
    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;
    const horizon = h * 0.42;

    // Smooth highway travel kinematics (Gentle coach suspension heave & sway)
    const busHeave = this.isPlaying ? Math.sin(Date.now() * 0.005) * 1.0 : 0;
    const busSway = this.isPlaying ? Math.sin(Date.now() * 0.0018) * 1.5 : 0;

    const timeInfo = this.getTimeOfDay();
    const period = timeInfo.period;
    const isNight = period === 'night';
    const isSunset = period === 'sunset';
    const isDawn = period === 'dawn';
    const isDay = period === 'day';
    const loc = this.getCurrentLocation();

    const isRain = this.isRainActive;

    // 1. SKY GRADIENT ACCORDING TO REAL TIME & RAIN ENVIRONMENT
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizon);
    if (isRain) {
      // DRAMATIC STORMY BLACK & OVERCAST SKY ENVIRONMENT
      skyGrad.addColorStop(0, '#020408'); // Pure deep black storm canopy
      skyGrad.addColorStop(0.40, '#070c14'); // Charcoal storm cloud base
      skyGrad.addColorStop(0.75, '#0d1422'); // Deep stormy slate overcast
      skyGrad.addColorStop(1, '#131c2a'); // Horizon storm mist
    } else if (isNight) {
      skyGrad.addColorStop(0, '#030712');
      skyGrad.addColorStop(0.65, '#0b1626');
      skyGrad.addColorStop(1, '#1e140d'); // Horizon oncoming warm dust
    } else if (isDawn) {
      skyGrad.addColorStop(0, '#1e1026');
      skyGrad.addColorStop(0.4, '#701a35');
      skyGrad.addColorStop(0.8, '#b45309');
      skyGrad.addColorStop(1, '#fde047');
    } else if (isDay) {
      skyGrad.addColorStop(0, '#0284c7'); // Clear sky blue
      skyGrad.addColorStop(0.55, '#38bdf8');
      skyGrad.addColorStop(1, '#bae6fd');
    } else { // Sunset
      skyGrad.addColorStop(0, '#180d2b');
      skyGrad.addColorStop(0.4, '#831843');
      skyGrad.addColorStop(0.75, '#ea580c');
      skyGrad.addColorStop(1, '#fef08a');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, horizon);

    // 2. CELESTIAL BODIES OR DENSE STORM CLOUDS
    if (isRain) {
      // HEAVY DRIFTING TURBULENT STORM CLOUDS
      this.stormClouds.forEach(c => {
        if (this.isPlaying) {
          c.x += c.speed;
          if (c.x > w + 200) c.x = -c.w - 60;
        }
        ctx.save();
        const scGrad = ctx.createRadialGradient(c.x + c.w * 0.45, c.y + c.h * 0.35, 15, c.x + c.w * 0.5, c.y + c.h * 0.5, c.w * 0.65);
        scGrad.addColorStop(0, 'rgba(30, 41, 59, 0.95)');
        scGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.96)');
        scGrad.addColorStop(1, 'rgba(2, 6, 23, 0.88)');
        ctx.fillStyle = scGrad;
        ctx.beginPath();
        ctx.arc(c.x + c.w * 0.25, c.y + c.h * 0.5, c.h * 0.48, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.5, c.y + c.h * 0.35, c.h * 0.68, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.75, c.y + c.h * 0.5, c.h * 0.50, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.38, c.y + c.h * 0.65, c.h * 0.42, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.62, c.y + c.h * 0.65, c.h * 0.42, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // OCCASIONAL DISTANT HORIZON LIGHTNING PULSE
      if (this.isPlaying) {
        this.lightningTimer += 1;
        if (this.lightningTimer > 310) {
          this.lightningTimer = 0;
          this.lightningIntensity = 0.95;
        }
      }
      if (this.lightningIntensity > 0) {
        this.lightningIntensity -= 0.045;
        ctx.save();
        ctx.fillStyle = `rgba(215, 235, 255, ${Math.max(0, this.lightningIntensity * 0.38)})`;
        ctx.fillRect(0, 0, w, horizon + 30);
        ctx.restore();
      }
    } else if (isNight) {
      // Twinkling stars
      this.stars.forEach(s => {
        s.alpha += Math.sin(Date.now() * s.twinkleSpeed) * 0.01;
        ctx.fillStyle = `rgba(240, 245, 255, ${Math.max(0.1, Math.min(1, s.alpha))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Distant highway moon
      const moonX = w * 0.78;
      const moonY = horizon * 0.32;
      ctx.fillStyle = 'rgba(255, 255, 230, 0.9)';
      ctx.beginPath();
      ctx.arc(moonX, moonY, 16, 0, Math.PI * 2);
      ctx.fill();
      // Moon soft halo
      const moonHalo = ctx.createRadialGradient(moonX, moonY, 14, moonX, moonY, 48);
      moonHalo.addColorStop(0, 'rgba(255, 255, 240, 0.25)');
      moonHalo.addColorStop(1, 'rgba(255, 255, 240, 0)');
      ctx.fillStyle = moonHalo;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 48, 0, Math.PI * 2);
      ctx.fill();
    } else if (isDay) {
      // Golden High Sun with Lens Flare
      const sunX = w * 0.75;
      const sunY = horizon * 0.30;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 130);
      sunGlow.addColorStop(0, 'rgba(255, 255, 230, 0.95)');
      sunGlow.addColorStop(0.3, 'rgba(255, 220, 100, 0.45)');
      sunGlow.addColorStop(1, 'rgba(255, 200, 50, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 130, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 22, 0, Math.PI * 2);
      ctx.fill();

      // Drifting Fluffy Cumulus Clouds
      this.dayClouds.forEach(c => {
        if (this.isPlaying) {
          c.x += c.speed;
          if (c.x > w + 150) c.x = -200;
        }
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.h * 0.5, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.3, c.y - c.h * 0.25, c.h * 0.65, 0, Math.PI * 2);
        ctx.arc(c.x + c.w * 0.65, c.y, c.h * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    } else if (isSunset) {
      // Setting sun sinking into horizon
      const sunX = w * 0.5;
      const sunY = horizon - 12;
      const sunsetGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 140);
      sunsetGlow.addColorStop(0, 'rgba(255, 215, 0, 0.95)');
      sunsetGlow.addColorStop(0.4, 'rgba(234, 88, 12, 0.5)');
      sunsetGlow.addColorStop(1, 'rgba(153, 27, 27, 0)');
      ctx.fillStyle = sunsetGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. GRAND MULTI-DISTANCE ARAVALI MOUNTAIN RANGES
    // Layer 1: Great Far Aravali Massif (Extreme Distance - Towering Peaks)
    const farMtnColor = isRain ? '#04070e' : (isDay ? '#14532d' : (isSunset ? '#310a3d' : (isDawn ? '#270830' : '#03060a')));
    ctx.fillStyle = farMtnColor;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(w * 0.05, horizon - 110);
    ctx.lineTo(w * 0.16, horizon - 65);
    ctx.lineTo(w * 0.28, horizon - 120);
    ctx.lineTo(w * 0.42, horizon - 55);
    ctx.lineTo(w * 0.58, horizon - 115);
    ctx.lineTo(w * 0.72, horizon - 70);
    ctx.lineTo(w * 0.85, horizon - 125);
    ctx.lineTo(w * 0.95, horizon - 80);
    ctx.lineTo(w, horizon - 95);
    ctx.lineTo(w, horizon);
    ctx.closePath();
    ctx.fill();

    // Layer 2: Mid-Distance Rugged Ridge (Intermediate Distance)
    const midMtnColor = isRain ? '#070c14' : (isDay ? '#15803d' : (isSunset ? '#4c0519' : (isDawn ? '#380c2f' : '#050a10')));
    ctx.fillStyle = midMtnColor;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(w * 0.10, horizon - 65);
    ctx.lineTo(w * 0.22, horizon - 40);
    ctx.lineTo(w * 0.35, horizon - 75);
    ctx.lineTo(w * 0.50, horizon - 35);
    ctx.lineTo(w * 0.65, horizon - 68);
    ctx.lineTo(w * 0.78, horizon - 38);
    ctx.lineTo(w * 0.90, horizon - 72);
    ctx.lineTo(w, horizon - 45);
    ctx.lineTo(w, horizon);
    ctx.closePath();
    ctx.fill();

    // Layer 3: Near Highway Foothills & Escarpments (Close Distance)
    const nearMtnColor = isRain ? '#0b111a' : (isDay ? '#16a34a' : (isSunset ? '#6b1128' : (isDawn ? '#4a113e' : '#080f17')));
    ctx.fillStyle = nearMtnColor;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(w * 0.14, horizon - 36);
    ctx.lineTo(w * 0.28, horizon - 18);
    ctx.lineTo(w * 0.44, horizon - 32);
    ctx.lineTo(w * 0.60, horizon - 16);
    ctx.lineTo(w * 0.75, horizon - 38);
    ctx.lineTo(w * 0.88, horizon - 20);
    ctx.lineTo(w, horizon - 26);
    ctx.lineTo(w, horizon);
    ctx.closePath();
    ctx.fill();

    // 3B. DISTANT HORIZON DHABA & VALLEY LIGHTS (Alive at Night, Sunset & Rain - Kept off the road corridor)
    if (isNight || isSunset || isRain) {
      this.horizonLights.forEach(hl => {
        const lx = hl.xRatio * w;
        const ly = horizon + hl.yOffset;
        const twinkle = 0.45 + Math.sin(Date.now() * hl.twinkleSpeed + hl.phase) * 0.35;
        ctx.fillStyle = hl.color.replace(/[\d\.]+\)$/, `${twinkle})`);
        ctx.beginPath();
        ctx.arc(lx, ly, hl.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Distant Radio/Cell Tower with Blinking Red Aviation Beacon
      const towerX = w * 0.84;
      const towerBaseY = horizon - 14;
      const towerPeakY = horizon - 58;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(towerX - 4, towerBaseY);
      ctx.lineTo(towerX, towerPeakY);
      ctx.lineTo(towerX + 4, towerBaseY);
      ctx.stroke();

      const beaconBlink = Math.sin(Date.now() * 0.005) > 0.2 ? 0.95 : 0.12;
      ctx.fillStyle = `rgba(239, 68, 68, ${beaconBlink})`;
      ctx.beginPath();
      ctx.arc(towerX, towerPeakY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. HORIZON GLOW
    const horizonGlow = ctx.createRadialGradient(w * 0.5, horizon, 5, w * 0.5, horizon, w * 0.65);
    if (isDay) {
      horizonGlow.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      horizonGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    } else if (isSunset) {
      horizonGlow.addColorStop(0, 'rgba(255, 120, 40, 0.45)');
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      horizonGlow.addColorStop(0, 'rgba(255, 170, 70, 0.22)');
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    ctx.fillStyle = horizonGlow;
    ctx.fillRect(0, horizon - 50, w, 100);

    // 5. LUSH ROADSIDE EMBANKMENT GRASS SHOULDERS & TERRAIN
    const roadTopWidth = w * 0.08;
    const roadBottomWidth = w * 0.95;
    const roadCenterX = w * 0.5;

    const grassColorLeft = ctx.createLinearGradient(0, horizon, roadCenterX - roadBottomWidth / 2, h);
    const grassColorRight = ctx.createLinearGradient(roadCenterX + roadBottomWidth / 2, horizon, w, h);

    if (isDay) {
      grassColorLeft.addColorStop(0, '#15803d');
      grassColorLeft.addColorStop(0.4, '#166534');
      grassColorLeft.addColorStop(1, '#14532d');
      grassColorRight.addColorStop(0, '#15803d');
      grassColorRight.addColorStop(0.4, '#166534');
      grassColorRight.addColorStop(1, '#14532d');
    } else if (isSunset) {
      grassColorLeft.addColorStop(0, '#1b4332');
      grassColorLeft.addColorStop(0.5, '#193325');
      grassColorLeft.addColorStop(1, '#0e1c14');
      grassColorRight.addColorStop(0, '#1b4332');
      grassColorRight.addColorStop(0.5, '#193325');
      grassColorRight.addColorStop(1, '#0e1c14');
    } else { // Night & Rain
      grassColorLeft.addColorStop(0, '#061c12');
      grassColorLeft.addColorStop(0.6, '#04120b');
      grassColorLeft.addColorStop(1, '#020906');
      grassColorRight.addColorStop(0, '#061c12');
      grassColorRight.addColorStop(0.6, '#04120b');
      grassColorRight.addColorStop(1, '#020906');
    }

    // Left Shoulder Grass
    ctx.fillStyle = grassColorLeft;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(roadCenterX - roadTopWidth / 2, horizon);
    ctx.lineTo(roadCenterX - roadBottomWidth / 2, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Right Shoulder Grass
    ctx.fillStyle = grassColorRight;
    ctx.beginPath();
    ctx.moveTo(roadCenterX + roadTopWidth / 2, horizon);
    ctx.lineTo(w, horizon);
    ctx.lineTo(w, h);
    ctx.lineTo(roadCenterX + roadBottomWidth / 2, h);
    ctx.closePath();
    ctx.fill();

    // Natural grass tufts along the roadside verges (Smooth synchronized gliding)
    if (this.isPlaying) {
      this.travelPhase = (this.travelPhase + 0.0036 * dtScale) % 1;
    }

    const tuftColor = isDay ? 'rgba(34, 197, 94, 0.45)' : (isSunset ? 'rgba(74, 222, 128, 0.25)' : 'rgba(22, 101, 52, 0.35)');
    ctx.fillStyle = tuftColor;
    for (let g = 0; g < 10; g++) {
      const gz = ((g / 10) + this.travelPhase) % 1;
      if (gz > 0.06) {
        const gy = horizon + (h - horizon) * Math.pow(gz, 2.2);
        const rW = roadTopWidth + (roadBottomWidth - roadTopWidth) * Math.pow(gz, 2.2);
        const tuftW = 4 + gz * 24;

        const lx = roadCenterX - (rW * 0.52);
        ctx.beginPath();
        ctx.arc(lx - tuftW/2, gy, tuftW/2, Math.PI, 0);
        ctx.fill();

        const rx = roadCenterX + (rW * 0.52);
        ctx.beginPath();
        ctx.arc(rx + tuftW/2, gy, tuftW/2, Math.PI, 0);
        ctx.fill();
      }
    }

    // 6. ASPHALT ROAD WITH 3D PERSPECTIVE (WET REFLECTIVE IN RAIN)
    ctx.fillStyle = isRain ? '#0b0e14' : (isDay ? '#22252a' : '#14171c');
    ctx.beginPath();
    ctx.moveTo(roadCenterX - roadTopWidth / 2, horizon);
    ctx.lineTo(roadCenterX + roadTopWidth / 2, horizon);
    ctx.lineTo(roadCenterX + roadBottomWidth / 2, h);
    ctx.lineTo(roadCenterX - roadBottomWidth / 2, h);
    ctx.closePath();
    ctx.fill();

    // Road side markings (White border lines)
    ctx.strokeStyle = isRain ? 'rgba(200, 225, 255, 0.45)' : (isDay ? 'rgba(255, 255, 255, 0.75)' : 'rgba(240, 240, 240, 0.55)');
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(roadCenterX - roadTopWidth / 2, horizon);
    ctx.lineTo(roadCenterX - roadBottomWidth / 2, h);
    ctx.moveTo(roadCenterX + roadTopWidth / 2, horizon);
    ctx.lineTo(roadCenterX + roadBottomWidth / 2, h);
    ctx.stroke();

    // Wet Road Texture (Dark sleek wet asphalt, zero neon glow)
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

    // 7. CENTER DASHED WHITE HIGHWAY DIVIDER STRIPES (BUTTER-SMOOTH SUB-PIXEL CONTINUITY)
    const numDashes = 14;
    for (let i = 0; i < numDashes; i++) {
      const baseZ = (i / numDashes + this.travelPhase) % 1;
      if (baseZ < 0.05) continue;
      const z = Math.pow(baseZ, 2.2);
      const dashLen = 0.038 * (1 - baseZ * 0.15);
      const nextZ = Math.min(1, Math.pow(Math.min(1, baseZ + dashLen), 2.2));

      const y1 = horizon + (h - horizon) * z;
      const y2 = horizon + (h - horizon) * nextZ;

      const halfW1 = (roadTopWidth + (roadBottomWidth - roadTopWidth) * z) * 0.018;
      const halfW2 = (roadTopWidth + (roadBottomWidth - roadTopWidth) * nextZ) * 0.018;

      // Clean white retroreflective highway lane divider
      const dashAlpha = (isNight || isSunset) ? (0.45 + z * 0.55) : (0.32 + z * 0.68);
      ctx.fillStyle = `rgba(255, 255, 255, ${dashAlpha})`;
      ctx.beginPath();
      ctx.moveTo(roadCenterX - halfW1, y1);
      ctx.lineTo(roadCenterX + halfW1, y1);
      ctx.lineTo(roadCenterX + halfW2, y2);
      ctx.lineTo(roadCenterX - halfW2, y2);
      ctx.closePath();
      ctx.fill();
    }

    // 8. HIGHWAY HEADLIGHT ILLUMINATION (AUTHENTIC NON-GLOWING BEAM)
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
      forwardBeam.addColorStop(0, `rgba(254, 243, 199, ${beamAlpha * 0.60})`);
      forwardBeam.addColorStop(0.25, `rgba(253, 230, 138, ${beamAlpha * 0.35})`);
      forwardBeam.addColorStop(0.60, `rgba(245, 158, 11, ${beamAlpha * 0.12})`);
      forwardBeam.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = forwardBeam;
      ctx.fillRect(0, horizon, w, h - horizon);

      // Dual Halogen Cones from Bus Headlights
      const leftLightX = roadCenterX - roadBottomWidth * 0.28;
      const rightLightX = roadCenterX + roadBottomWidth * 0.28;

      [leftLightX, rightLightX].forEach((lx, idx) => {
        const aimOffset = (idx === 0 ? -1 : 1) * (roadTopWidth * 0.5);
        const coneGrad = ctx.createRadialGradient(lx, h, 15, roadCenterX + aimOffset, beamFocusY, w * 0.52);
        coneGrad.addColorStop(0, `rgba(255, 255, 240, ${beamAlpha * 0.50})`);
        coneGrad.addColorStop(0.35, `rgba(254, 240, 138, ${beamAlpha * 0.25})`);
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
        asphaltSheen.addColorStop(0.6, `rgba(255, 250, 200, ${beamAlpha * 0.15})`);
        asphaltSheen.addColorStop(1, `rgba(255, 255, 240, ${beamAlpha * 0.26})`);
        ctx.fillStyle = asphaltSheen;
        ctx.fillRect(0, h * 0.65, w, h * 0.35);
      }

      ctx.restore();
    }

    // 9. ONCOMING TRAFFIC HEADLIGHTS (SMOOTH TIME-SCALED TRAVEL)
    this.oncomingCars.forEach(car => {
      if (this.isPlaying) {
        car.z += car.speed * dtScale;
        if (car.z > 1.1) car.z = 0.05;
      }
      const cz = Math.pow(car.z, 2.4);
      if (cz > 0.01 && cz <= 1.05) {
        const carY = horizon + (h - horizon) * cz;
        const roadWAtZ = roadTopWidth + (roadBottomWidth - roadTopWidth) * cz;
        const carX = roadCenterX + roadWAtZ * 0.22;

        const beamRadius = 3 + cz * 45;
        const alpha = Math.min(1, cz * 1.4);
        const lightGap = 2 + cz * 24;

        [-lightGap/2, lightGap/2].forEach(ox => {
          const glow = ctx.createRadialGradient(carX + ox, carY, 1, carX + ox, carY, beamRadius);
          glow.addColorStop(0, `rgba(255, 255, 220, ${alpha})`);
          glow.addColorStop(0.3, `rgba(255, 220, 140, ${alpha * 0.6})`);
          glow.addColorStop(1, 'rgba(255, 150, 50, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(carX + ox, carY, beamRadius, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    });

    // 10. ROADSIDE MILESTONES WITH DYNAMIC INTERSTATE CITIES (PERFECT ALIGNMENT)
    this.milestones.forEach(m => {
      if (this.isPlaying) {
        m.z += 0.0036 * dtScale;
        if (m.z > 1.15) {
          m.z = 0.05;
          m.label = `NH-48 • ${loc.nextCity.toUpperCase()} ${loc.nextDist} KM`;
        }
      }
      const mz = Math.pow(m.z, 2.4);
      if (mz > 0.04 && mz < 1.0) {
        const my = horizon + (h - horizon) * mz;
        const roadWAtZ = roadTopWidth + (roadBottomWidth - roadTopWidth) * mz;
        const mx = roadCenterX + (roadWAtZ * 0.58) * m.side;

        const stoneW = 14 + mz * 50;
        const stoneH = stoneW * 1.5;
        const domeR = stoneW / 2;
        const yellowH = stoneH * 0.38;

        ctx.save();
        // 3D Stone Drop Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.beginPath();
        ctx.ellipse(mx + stoneW * 0.08, my + 2, stoneW * 0.55, 4 + mz * 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // White Plaster Base Body (Lower Section)
        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(mx, my - stoneH + domeR, domeR, Math.PI, 0);
        ctx.lineTo(mx + domeR, my);
        ctx.lineTo(mx - domeR, my);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Canary Yellow Top Dome (National Highway Standard)
        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my - stoneH + domeR, domeR, Math.PI, 0);
        ctx.lineTo(mx + domeR, my - stoneH + yellowH);
        ctx.lineTo(mx - domeR, my - stoneH + yellowH);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.restore();

        // Crisp Dividing Line between Yellow & White
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mx - domeR, my - stoneH + yellowH);
        ctx.lineTo(mx + domeR, my - stoneH + yellowH);
        ctx.stroke();

        // Text on milestone if close enough
        if (mz > 0.28) {
          ctx.fillStyle = '#0f172a';
          ctx.textAlign = 'center';

          // Yellow Dome: Bold "NH 48"
          ctx.font = `bold ${Math.max(7, Math.floor(stoneW * 0.22))}px sans-serif`;
          ctx.fillText("NH 48", mx, my - stoneH + yellowH * 0.62);

          // White Base: Full Destination City Name & Distance
          const whiteH = stoneH - yellowH;
          const cityName = (loc.city || "DELHI").toUpperCase();
          const cityFontSize = Math.max(6, Math.floor(stoneW * (cityName.length > 8 ? 0.14 : 0.17)));
          ctx.font = `bold ${cityFontSize}px sans-serif`;
          ctx.fillText(cityName, mx, my - stoneH + yellowH + whiteH * 0.40);

          ctx.font = `600 ${Math.max(5, Math.floor(stoneW * 0.13))}px sans-serif`;
          ctx.fillStyle = '#334155';
          ctx.fillText(`${loc.nextDist || 45} KM`, mx, my - stoneH + yellowH + whiteH * 0.76);
        }
        ctx.restore();
      }
    });

    // 10B. ROADSIDE TELEGRAPH / UTILITY POLES & SAGGING WIRES (HIGHWAY SCENERY)
    const poleCoords = [];
    this.telegraphPoles.forEach(p => {
      if (this.isPlaying) {
        p.z += 0.0036 * dtScale;
        if (p.z > 1.15) p.z = 0.04;
      }
      const pz = Math.pow(p.z, 2.2);
      if (pz > 0.02 && pz < 1.05) {
        const py = horizon + (h - horizon) * pz;
        const roadWAtZ = roadTopWidth + (roadBottomWidth - roadTopWidth) * pz;
        const px = roadCenterX + (roadWAtZ * 0.5) * p.side;

        const poleH = 22 + pz * 115;
        const crossW = 8 + pz * 32;

        poleCoords.push({ x: px, y: py - poleH, pz });

        ctx.save();
        // Wooden/Concrete Pole Mast
        ctx.fillStyle = isDay ? '#57534e' : '#1c1917';
        ctx.fillRect(px - 1.5 - pz * 1.5, py - poleH, 3 + pz * 3, poleH);

        // Horizontal Crossarm
        ctx.fillStyle = isDay ? '#44403c' : '#0c0a09';
        ctx.fillRect(px - crossW / 2, py - poleH + poleH * 0.08, crossW, 2 + pz * 2.5);

        // Ceramic Insulators
        ctx.fillStyle = '#38bdf8';
        [-crossW * 0.42, crossW * 0.42].forEach(ox => {
          ctx.beginPath();
          ctx.arc(px + ox, py - poleH + poleH * 0.08 - 2, 1.2 + pz * 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }
    });

    // Sagging Wires connecting adjacent utility poles
    if (poleCoords.length >= 2) {
      poleCoords.sort((a, b) => a.pz - b.pz);
      ctx.save();
      ctx.strokeStyle = isDay ? 'rgba(68, 64, 60, 0.45)' : 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 1;
      for (let i = 0; i < poleCoords.length - 1; i++) {
        const p1 = poleCoords[i];
        const p2 = poleCoords[i + 1];
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2 + (p2.pz * 14); // Catenary sag
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 10C. ELECTRIC HIGHWAY STREET LIGHT POLES (CURVED STEEL WITH DOWNWARD LAMPS)
    this.streetLights.forEach(sl => {
      if (this.isPlaying) {
        sl.z += 0.0036 * dtScale;
        if (sl.z > 1.15) sl.z = 0.04;
      }
      const sz = Math.pow(sl.z, 2.2);
      if (sz > 0.03 && sz < 1.05) {
        const sy = horizon + (h - horizon) * sz;
        const roadWAtZ = roadTopWidth + (roadBottomWidth - roadTopWidth) * sz;
        const sx = roadCenterX + (roadWAtZ * 0.5) * sl.side;

        const poleH = 26 + sz * 130;
        const armReach = 10 + sz * 45;

        ctx.save();
        // Galvanized Steel Tubular Post
        ctx.strokeStyle = isDay ? '#64748b' : '#334155';
        ctx.lineWidth = Math.max(1.5, sz * 3.5);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx, sy - poleH * 0.75);
        // Curved Davit Arm arching out over the road verge
        ctx.quadraticCurveTo(sx, sy - poleH, sx - armReach, sy - poleH * 0.95);
        ctx.stroke();

        // Luminaire Lamp Fixture Head
        const lampHeadX = sx - armReach;
        const lampHeadY = sy - poleH * 0.95;
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(lampHeadX - 4, lampHeadY - 2, 8 + sz * 8, 4 + sz * 3, 2);
        ctx.fill();

        // Glowing Lamp & Light Pool in Sunset, Night & Rain
        if (isNight || isSunset || isDawn || this.isRainActive) {
          const lampGlow = ctx.createRadialGradient(lampHeadX, lampHeadY, 1, lampHeadX, lampHeadY, 12 + sz * 40);
          lampGlow.addColorStop(0, 'rgba(255, 255, 240, 0.95)');
          lampGlow.addColorStop(0.3, 'rgba(254, 240, 138, 0.55)');
          lampGlow.addColorStop(1, 'rgba(254, 240, 138, 0)');
          ctx.fillStyle = lampGlow;
          ctx.beginPath();
          ctx.arc(lampHeadX, lampHeadY, 12 + sz * 40, 0, Math.PI * 2);
          ctx.fill();

          // Downward Light Pool on Highway Verge
          const poolAlpha = isNight ? 0.35 : (isSunset ? 0.22 : 0.25);
          const poolGrad = ctx.createRadialGradient(lampHeadX, sy, 2, lampHeadX, sy, 18 + sz * 70);
          poolGrad.addColorStop(0, `rgba(254, 240, 138, ${poolAlpha * sz})`);
          poolGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
          ctx.fillStyle = poolGrad;
          ctx.beginPath();
          ctx.ellipse(lampHeadX, sy, 18 + sz * 70, 6 + sz * 24, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    });

    // 10D. LUSH ROADSIDE HIGHWAY TREES (NEEM, BABUL, PEEPAL, EUCALYPTUS)
    this.roadsideTrees.forEach(t => {
      if (this.isPlaying) {
        t.z += 0.0036 * dtScale;
        if (t.z > 1.15) t.z = 0.05;
      }
      const tz = Math.pow(t.z, 2.2);
      if (tz > 0.03 && tz < 1.05) {
        const ty = horizon + (h - horizon) * tz;
        const roadWAtZ = roadTopWidth + (roadBottomWidth - roadTopWidth) * tz;
        const tx = roadCenterX + (roadWAtZ * 0.5) * t.side;

        const treeH = (26 + tz * 115) * t.scale;
        const canopyR = (18 + tz * 74) * t.scale;

        ctx.save();
        // Trunk
        ctx.fillStyle = isDay ? '#3e2723' : '#140c06';
        ctx.beginPath();
        ctx.moveTo(tx - 2.5 * tz, ty);
        ctx.lineTo(tx + 2.5 * tz, ty);
        ctx.lineTo(tx + 1.2 * tz, ty - treeH * 0.65);
        ctx.lineTo(tx - 1.2 * tz, ty - treeH * 0.65);
        ctx.closePath();
        ctx.fill();

        // Lush Umbrella Canopy
        const foliageColor = isRain ? 'rgba(15, 23, 20, 0.94)' : (isDay ? 'rgba(22, 163, 74, 0.92)' : (isSunset ? 'rgba(88, 14, 38, 0.94)' : 'rgba(5, 18, 12, 0.90)'));
        ctx.fillStyle = foliageColor;
        ctx.beginPath();
        ctx.arc(tx, ty - treeH, canopyR * 0.60, 0, Math.PI * 2);
        ctx.arc(tx - canopyR * 0.38, ty - treeH * 0.92, canopyR * 0.45, 0, Math.PI * 2);
        ctx.arc(tx + canopyR * 0.38, ty - treeH * 0.92, canopyR * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    // 11. WINDSHIELD RAIN & WIPERS
    if (this.isRainActive) {
      ctx.strokeStyle = 'rgba(180, 215, 255, 0.40)';
      ctx.lineWidth = 1.4;
      this.rainDrops.forEach(drop => {
        drop.y += drop.speed;
        drop.x -= 1.8;
        if (drop.y > h) {
          drop.y = -20;
          drop.x = Math.random() * (w + 100);
        }
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 2.5, drop.y + drop.length);
        ctx.stroke();
      });

      if (this.windshieldDrops.length < 180 && Math.random() < 0.48) {
        this.windshieldDrops.push({
          x: Math.random() * w,
          y: Math.random() * (h * 0.88),
          r: Math.random() * 3.5 + 2.0,
          alpha: Math.random() * 0.4 + 0.45,
          vy: Math.random() * 0.2 + 0.04
        });
      }
    } else {
      if (this.windshieldDrops.length > 0) {
        this.windshieldDrops.forEach(d => d.alpha -= 0.04);
        this.windshieldDrops = this.windshieldDrops.filter(d => d.alpha > 0);
      }
    }

    // Wiper Kinematics & Sweep Physics
    const pivotY = h * 0.96;
    const armLength = Math.min(w * 0.32, h * 0.50);
    const pivots = [w * 0.30, w * 0.64];
    const minWiperAngle = 0.10;
    const maxWiperAngle = 2.05;

    if (this.isRainActive && this.isWiperActive) {
      this.wiperAngle += 0.024 * this.wiperDirection;

      if (this.wiperAngle >= maxWiperAngle) {
        this.wiperAngle = maxWiperAngle;
        this.wiperDirection = -1;
        if (window.audioEngine) window.audioEngine.playWiperSweep();
      } else if (this.wiperAngle <= minWiperAngle) {
        this.wiperAngle = minWiperAngle;
        this.wiperDirection = 1;
        if (window.audioEngine) window.audioEngine.playWiperSweep();
      }

      // Real-time water clearing
      const currentRad = this.wiperAngle;
      this.windshieldDrops.forEach(drop => {
        pivots.forEach(pivotX => {
          const dx = drop.x - pivotX;
          const dy = pivotY - drop.y;
          if (dy > 0) {
            const dist = Math.hypot(dx, dy);
            if (dist >= armLength * 0.24 && dist <= armLength * 1.05) {
              const dropAngle = Math.atan2(dy, dx);
              if (Math.abs(dropAngle - currentRad) < 0.12) {
                drop.wiped = true;
              }
            }
          }
        });
      });
      this.windshieldDrops = this.windshieldDrops.filter(d => !d.wiped);
    } else {
      this.wiperAngle = minWiperAngle;
      this.wiperDirection = 1;
    }

    // Render glass beads
    if (this.windshieldDrops.length > 0) {
      this.windshieldDrops.forEach(drop => {
        drop.y += drop.vy;
        if (drop.y > h * 0.92) drop.alpha -= 0.05;

        ctx.save();
        ctx.fillStyle = `rgba(0, 0, 0, ${drop.alpha * 0.32})`;
        ctx.beginPath();
        ctx.arc(drop.x + 0.8, drop.y + 1, drop.r, 0, Math.PI * 2);
        ctx.fill();

        const beadGrad = ctx.createRadialGradient(
          drop.x - drop.r * 0.3, drop.y - drop.r * 0.3, 0.4,
          drop.x, drop.y, drop.r
        );
        beadGrad.addColorStop(0, `rgba(240, 248, 255, ${drop.alpha * 0.85})`);
        beadGrad.addColorStop(0.65, `rgba(180, 215, 245, ${drop.alpha * 0.38})`);
        beadGrad.addColorStop(1, `rgba(130, 175, 220, ${drop.alpha * 0.55})`);
        ctx.fillStyle = beadGrad;
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    // Render Dual Commercial Wipers
    const rad = this.wiperAngle;
    pivots.forEach(pivotX => {
      const tipX = pivotX + Math.cos(rad) * armLength;
      const tipY = pivotY - Math.sin(rad) * armLength;
      const innerBladeX = pivotX + Math.cos(rad) * (armLength * 0.28);
      const innerBladeY = pivotY - Math.sin(rad) * (armLength * 0.28);

      ctx.save();
      // Base Hub
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Twin-rod wiper arm
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      // Rubber Squeegee Blade
      ctx.strokeStyle = '#09090b';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(innerBladeX, innerBladeY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      if (this.isRainActive) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(innerBladeX, innerBladeY);
        ctx.lineTo(tipX, tipY);
        ctx.stroke();
      }
      ctx.restore();
    });

    // 13. SUBTLE FRONT WINDSHIELD GLASS REFLECTION & CLEAN ZONE
    this.renderWindshieldGlass(w, h);

    // 14. HANGING NIMBU-MIRCHI AMULET
    this.renderNimbuMirchi(w * 0.22, h * 0.12);
  }

  renderWindshieldGlass(w, h) {
    const ctx = this.ctx;
    ctx.save();

    // 1. Subtle diagonal glass glare sheen reflection across top-left to bottom-right
    const glassGlare = ctx.createLinearGradient(0, 0, w * 0.85, h * 0.70);
    glassGlare.addColorStop(0, 'rgba(255, 255, 255, 0.045)');
    glassGlare.addColorStop(0.25, 'rgba(255, 255, 255, 0.012)');
    glassGlare.addColorStop(0.40, 'rgba(255, 255, 255, 0)');
    glassGlare.addColorStop(0.70, 'rgba(255, 255, 255, 0.020)');
    glassGlare.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glassGlare;
    ctx.fillRect(0, 0, w, h);

    // 2. Faint curved wiper sweep arc sheen (clean glass zone vs slightly dusty upper corners)
    const pivotY = h * 0.96;
    const armLength = Math.min(w * 0.32, h * 0.50);
    const pivots = [w * 0.30, w * 0.64];

    pivots.forEach(px => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(px, pivotY, armLength * 1.02, Math.PI * 0.92, Math.PI * 1.95, false);
      ctx.stroke();
    });

    // 3. Occasional subtle interior cabin / dashboard reflection
    const cabinPulse = 0.025 + Math.sin(Date.now() * 0.001) * 0.010;
    const dashReflect = ctx.createLinearGradient(0, h * 0.75, 0, h);
    dashReflect.addColorStop(0, 'rgba(0, 0, 0, 0)');
    dashReflect.addColorStop(1, `rgba(255, 235, 180, ${cabinPulse})`);
    ctx.fillStyle = dashReflect;
    ctx.fillRect(0, h * 0.75, w, h * 0.25);

    ctx.restore();
  }

  renderNimbuMirchi(rootX, rootY) {
    const ctx = this.ctx;
    this.amuletSway += (this.amuletTargetSway - this.amuletSway) * 0.06;
    const swayAngle = (this.amuletSway * Math.PI) / 180;

    ctx.save();
    ctx.translate(rootX, rootY);
    ctx.rotate(swayAngle);

    ctx.strokeStyle = '#111';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 50);
    ctx.stroke();

    // Lemon
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(0, 58, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.stroke();

    // 7 Green Chillies
    const chillies = [-8, -5, -2, 0, 2, 5, 8];
    chillies.forEach((cx, idx) => {
      ctx.fillStyle = idx % 2 === 0 ? '#16a34a' : '#15803d';
      ctx.beginPath();
      ctx.moveTo(cx, 70);
      ctx.quadraticCurveTo(cx + 3, 90, cx - 1, 105);
      ctx.quadraticCurveTo(cx - 3, 90, cx, 70);
      ctx.fill();
    });

    // Coal piece
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(0, 114, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /* ============================================================
   * DELUXE SALOON MODE GRAPHICS ENGINE
   * Complete Authentic Indian Village Barber Shop:
   * 1. Rustic wooden shack with corrugated tin roof & signboard
   * 2. Barber in white shirt shaving customer's beard ("Making Beard")
   * 3. Village patrons sitting on the wooden bench outside
   * 4. Framed mirror, 1994 calendar, shelf with shaving mug & radio
   * ============================================================ */

  renderSaloonMode(dtScale = 1.0) {
    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;

    // Time cycle for shaving animation & fan
    if (this.isPlaying) {
      this.shavingStroke += 0.055 * dtScale;
    }
    if (this.isFanActive) {
      this.fanSpeed = Math.min(0.032, this.fanSpeed + 0.0005 * dtScale);
    } else {
      this.fanSpeed = Math.max(0.003, this.fanSpeed * Math.pow(0.992, dtScale));
    }
    this.fanRotation += this.fanSpeed * dtScale;
    this.lampPulse += 0.03 * dtScale;

    // 1. AUTHENTIC INDIAN VILLAGE BARBER SHOP BACKGROUND (Continuous unified room structure)
    const villageWallGrad = ctx.createLinearGradient(0, 0, 0, h);
    villageWallGrad.addColorStop(0, '#10221f'); // Lime-wash plaster ceiling shadow
    villageWallGrad.addColorStop(0.35, '#16332d'); // Weathered seafoam/pista lime wall
    villageWallGrad.addColorStop(0.70, '#1d3e38'); // Warm village barber shop plaster
    villageWallGrad.addColorStop(1, '#132622');
    ctx.fillStyle = villageWallGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. SHOP GEOMETRY - FRAMED COMFORTABLY SO SHOP IS VISIBLE AND BEAUTIFULLY CENTERED
    const groundY = Math.max(h * 0.58, Math.min(h * 0.65, h - 225));
    const shopH = Math.min(300, groundY - 40);
    const roofY = groundY - shopH;

    // Seamless vertical retro gamthi wallpaper stripes across the FULL width of the room
    const stripeSpacing = 52;
    for (let lx = 0; lx < w; lx += stripeSpacing) {
      ctx.fillStyle = (Math.floor(lx / stripeSpacing) % 2 === 0) ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.022)';
      ctx.fillRect(lx, 0, stripeSpacing * 0.5, groundY);
    }

    // Rustic wooden dado rail / chair-rail dividing upper lime wall and lower timber wainscot across FULL WIDTH
    const dadoY = groundY - 100;
    ctx.fillStyle = '#3a1e10';
    ctx.fillRect(0, dadoY, w, 8);
    ctx.fillStyle = '#5c2d15';
    ctx.fillRect(0, dadoY + 1, w, 2);

    // Lower rustic teak wood wall paneling across FULL WIDTH
    const lowerWoodGrad = ctx.createLinearGradient(0, dadoY, 0, groundY);
    lowerWoodGrad.addColorStop(0, '#2b160b');
    lowerWoodGrad.addColorStop(1, '#180d06');
    ctx.fillStyle = lowerWoodGrad;
    ctx.fillRect(0, dadoY + 8, w, groundY - dadoY - 8);

    // Vertical teak wainscot beadboard grooves across FULL WIDTH
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.lineWidth = 1;
    for (let bx = 0; bx < w; bx += 24) {
      ctx.beginPath();
      ctx.moveTo(bx, dadoY + 8);
      ctx.lineTo(bx, groundY);
      ctx.stroke();
    }

    // Center the shop styling station horizontally with safe margin for barber pole
    const shopW = Math.min(Math.max(320, w - 80), 920);
    const shopLeft = Math.max(36, (w - shopW) / 2);
    const shopRight = shopLeft + shopW;

    // Warm tungsten ambient lamp glow from ceiling over the styling station
    const lampX = shopLeft + shopW * 0.44;
    const lampY = roofY + 65;
    const lampGlow = ctx.createRadialGradient(lampX, lampY, 10, lampX, lampY, 400);
    const flicker = 0.90 + Math.sin(this.lampPulse) * 0.08;
    lampGlow.addColorStop(0, `rgba(254, 240, 138, ${0.40 * flicker})`);
    lampGlow.addColorStop(0.4, `rgba(245, 158, 11, ${0.16 * flicker})`);
    lampGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = lampGlow;
    ctx.fillRect(0, 0, w, groundY);

    // Atmospheric floating dust motes drifting through warm tungsten light cone
    ctx.save();
    this.saloonDustMotes.forEach(m => {
      m.y += m.vy;
      m.x += m.vx + Math.sin(Date.now() * 0.002 + m.phase) * 0.18;
      if (m.y < roofY + 8) {
        m.y = groundY - 15;
        m.x = shopLeft + Math.random() * shopW;
      }
      if (m.x < shopLeft || m.x > shopRight) {
        m.x = shopLeft + Math.random() * shopW;
      }
      const dFromLamp = Math.hypot(m.x - lampX, m.y - lampY);
      const lightFactor = Math.max(0, 1 - dFromLamp / 340);
      const moteAlpha = m.alpha * (0.25 + lightFactor * 0.75);

      ctx.fillStyle = `rgba(254, 240, 138, ${moteAlpha})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r * (0.8 + lightFactor * 0.5), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // Vintage Indian Round Wall Clock with Ticking Hands (Upper Timber Wall)
    const clockX = shopLeft + shopW * 0.78;
    const clockY = roofY + 68;
    const clockR = 22;

    ctx.save();
    // Clock outer wood/brass bezel
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(clockX, clockY, clockR, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Vintage ivory dial face
    ctx.fillStyle = '#fefce8';
    ctx.beginPath();
    ctx.arc(clockX, clockY, clockR - 3.5, 0, Math.PI * 2);
    ctx.fill();

    // 12 hour tick marks
    ctx.strokeStyle = '#1c1917';
    ctx.lineWidth = 1;
    for (let th = 0; th < 12; th++) {
      const angle = (th / 12) * Math.PI * 2;
      const x1 = clockX + Math.sin(angle) * (clockR - 6.5);
      const y1 = clockY - Math.cos(angle) * (clockR - 6.5);
      const x2 = clockX + Math.sin(angle) * (clockR - 4.5);
      const y2 = clockY - Math.cos(angle) * (clockR - 4.5);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Real-time ticking hands
    const now = new Date();
    const secVal = (Date.now() / 1000) % 60;
    const minVal = now.getMinutes() + secVal / 60;
    const hrVal = (now.getHours() % 12) + minVal / 60;

    // Hour hand
    const hrAngle = (hrVal / 12) * Math.PI * 2;
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    ctx.lineTo(clockX + Math.sin(hrAngle) * 9, clockY - Math.cos(hrAngle) * 9);
    ctx.stroke();

    // Minute hand
    const minAngle = (minVal / 60) * Math.PI * 2;
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(clockX, clockY);
    ctx.lineTo(clockX + Math.sin(minAngle) * 13, clockY - Math.cos(minAngle) * 13);
    ctx.stroke();

    // Ticking red second hand
    const secAngle = (secVal / 60) * Math.PI * 2;
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(clockX - Math.sin(secAngle) * 3, clockY + Math.cos(secAngle) * 3);
    ctx.lineTo(clockX + Math.sin(secAngle) * 15, clockY - Math.cos(secAngle) * 15);
    ctx.stroke();

    // Brass center pin
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(clockX, clockY, 1.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Wooden Floor Planks across the FULL WIDTH of the salon room
    ctx.fillStyle = '#1c1009';
    ctx.fillRect(0, groundY, w, h - groundY);
    ctx.strokeStyle = '#2b190f';
    ctx.lineWidth = 1.5;
    for (let fx = -40; fx < w + 80; fx += 50) {
      ctx.beginPath();
      ctx.moveTo(fx, groundY);
      ctx.lineTo(fx - 40, h);
      ctx.stroke();
    }

    // 3. COUNTER SHELF & FRAMED MIRROR (Ergonomically Aligned with Barber & Chair)
    const shelfX = shopLeft + shopW * 0.11;
    const shelfW = shopW * 0.44;
    const shelfY = groundY - 72;
    const shelfH = 14;

    // Framed Mirror resting directly on the shelf
    const mirrorX = shelfX + 12;
    const mirrorW = shelfW - 24;
    const mirrorH = 120;
    const mirrorY = shelfY - mirrorH - 4; // From groundY - 196 to groundY - 76

    // Wooden Mirror Bevelled Frame
    ctx.fillStyle = '#451a03';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(mirrorX, mirrorY, mirrorW, mirrorH, 8);
    ctx.fill();
    ctx.stroke();

    // Brass corner brackets on mirror frame
    ctx.fillStyle = '#f59e0b';
    [
      [mirrorX + 4, mirrorY + 4],
      [mirrorX + mirrorW - 12, mirrorY + 4],
      [mirrorX + 4, mirrorY + mirrorH - 12],
      [mirrorX + mirrorW - 12, mirrorY + mirrorH - 12]
    ].forEach(([cx, cy]) => {
      ctx.fillRect(cx, cy, 8, 8);
    });

    // Reflective Mirror Glass
    const glassGrad = ctx.createLinearGradient(mirrorX, mirrorY, mirrorX + mirrorW, mirrorY + mirrorH);
    glassGrad.addColorStop(0, '#152528');
    glassGrad.addColorStop(0.5, '#1e3337');
    glassGrad.addColorStop(1, '#112022');
    ctx.fillStyle = glassGrad;
    ctx.beginPath();
    ctx.roundRect(mirrorX + 6, mirrorY + 6, mirrorW - 12, mirrorH - 12, 4);
    ctx.fill();

    // Mirror Glass Diagonal Glint
    ctx.fillStyle = 'rgba(255, 255, 255, 0.09)';
    ctx.beginPath();
    ctx.moveTo(mirrorX + 35, mirrorY + 6);
    ctx.lineTo(mirrorX + 90, mirrorY + 6);
    ctx.lineTo(mirrorX + 25, mirrorY + mirrorH - 6);
    ctx.lineTo(mirrorX - 30, mirrorY + mirrorH - 6);
    ctx.closePath();
    ctx.fill();

    // Reflection of customer & barber silhouette inside mirror
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(mirrorX + 6, mirrorY + 6, mirrorW - 12, mirrorH - 12, 4);
    ctx.clip();
    // Soft reflection of ceiling lamp
    ctx.fillStyle = 'rgba(254, 240, 138, 0.15)';
    ctx.beginPath();
    ctx.arc(mirrorX + mirrorW * 0.70, mirrorY + 28, 24, 0, Math.PI * 2);
    ctx.fill();
    // Reflected customer head silhouette in mirror
    ctx.fillStyle = 'rgba(180, 83, 9, 0.28)';
    ctx.beginPath();
    ctx.arc(mirrorX + mirrorW * 0.42, mirrorY + mirrorH - 26, 16, 0, Math.PI * 2);
    ctx.fill();
    // Reflected lather in mirror
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.beginPath();
    ctx.arc(mirrorX + mirrorW * 0.44, mirrorY + mirrorH - 18, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Polished Teak Counter Shelf
    ctx.fillStyle = '#5c2b0c';
    ctx.strokeStyle = '#2d1405';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(shelfX - 8, shelfY, shelfW + 16, shelfH, 4);
    ctx.fill();
    ctx.stroke();
    // Shelf upper highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillRect(shelfX - 8, shelfY, shelfW + 16, 2);

    // Hanging leather razor strop from left shelf edge
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.roundRect(shelfX - 4, shelfY + shelfH, 9, 44, 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(shelfX - 3, shelfY + shelfH, 7, 4); // Brass buckle

    // 4. COUNTER ACCESSORIES & WATER MIST SPRAY BOTTLE
    // A. CLASSIC BARBER WATER MIST SPRAY BOTTLE (Prominent on counter shelf)
    const sprayBottleX = shelfX + 26;
    const sprayBottleY = shelfY - 32;
    this.mistOrigin = { x: sprayBottleX - 6, y: sprayBottleY + 4 };

    // Translucent blue barber water mist bottle
    ctx.fillStyle = 'rgba(14, 165, 233, 0.70)';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(sprayBottleX - 8, sprayBottleY + 8, 16, 24, 3);
    ctx.fill();
    ctx.stroke();

    // Water level inside bottle
    ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.fillRect(sprayBottleX - 7, sprayBottleY + 16, 14, 15);

    // Dip tube
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sprayBottleX, sprayBottleY + 8);
    ctx.lineTo(sprayBottleX, sprayBottleY + 31);
    ctx.stroke();

    // Black ergonomic trigger spray head
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.roundRect(sprayBottleX - 5, sprayBottleY + 2, 10, 7, 2);
    ctx.roundRect(sprayBottleX - 8, sprayBottleY - 3, 14, 6, 2);
    ctx.fill();

    // Spray nozzle pointed towards customer (left)
    ctx.fillStyle = '#3f3f46';
    ctx.beginPath();
    ctx.moveTo(sprayBottleX - 8, sprayBottleY - 2);
    ctx.lineTo(sprayBottleX - 13, sprayBottleY - 1);
    ctx.lineTo(sprayBottleX - 13, sprayBottleY + 2);
    ctx.lineTo(sprayBottleX - 8, sprayBottleY + 3);
    ctx.closePath();
    ctx.fill();

    // Ergonomic trigger lever
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sprayBottleX - 6, sprayBottleY + 3);
    ctx.quadraticCurveTo(sprayBottleX - 11, sprayBottleY + 9, sprayBottleX - 8, sprayBottleY + 16);
    ctx.stroke();

    // B. Ceramic Shaving Mug with rich foam & brush
    const mugX = shelfX + 60;
    const mugY = shelfY - 24;
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(mugX, mugY + 4, 22, 20, 3);
    ctx.fill();
    ctx.stroke();
    // Frothy shaving foam
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(mugX + 6, mugY + 4, 7, 0, Math.PI * 2);
    ctx.arc(mugX + 14, mugY + 2, 8, 0, Math.PI * 2);
    ctx.fill();
    // Shaving brush wooden handle
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.roundRect(mugX + 8, mugY - 12, 6, 14, 2);
    ctx.fill();

    // Rising warm steam wisps from hot lather shaving mug
    if (this.mugSteam.length < 14 && Math.random() < 0.28) {
      this.mugSteam.push({
        x: mugX + 11 + (Math.random() - 0.5) * 6,
        y: mugY - 6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.60 - 0.35,
        r: Math.random() * 2.2 + 1.2,
        alpha: 0.38
      });
    }
    if (this.mugSteam.length > 0) {
      ctx.save();
      this.mugSteam.forEach(s => {
        s.x += s.vx + Math.sin(Date.now() * 0.003) * 0.18;
        s.y += s.vy;
        s.r += 0.04;
        s.alpha -= 0.007;
        ctx.fillStyle = `rgba(240, 248, 255, ${Math.max(0, s.alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      this.mugSteam = this.mugSteam.filter(s => s.alpha > 0);
      ctx.restore();
    }

    // C. Barbicide Sanitizing Jar with Combs
    const jarX = shelfX + 96;
    const jarY = shelfY - 36;
    ctx.fillStyle = 'rgba(14, 165, 233, 0.65)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(jarX, jarY + 4, 20, 32, 3);
    ctx.fill();
    ctx.stroke();
    // Stainless steel jar lid & knob
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(jarX - 2, jarY, 24, 5);
    ctx.beginPath();
    ctx.arc(jarX + 10, jarY - 2, 3, 0, Math.PI * 2);
    ctx.fill();
    // Submerged red & black combs
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(jarX + 4, jarY + 8, 3, 24);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(jarX + 11, jarY + 6, 3, 26);

    // D. Vintage Transistor Radio
    const radX = shelfX + 130;
    const radY = shelfY - 28;
    ctx.fillStyle = '#3b1c0b';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(radX, radY, 44, 28, 4);
    ctx.fill();
    ctx.stroke();
    // Glowing emerald frequency dial
    ctx.fillStyle = '#10b981';
    ctx.fillRect(radX + 5, radY + 5, 34, 7);
    // Telescopic chrome antenna
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(radX + 6, radY);
    ctx.lineTo(radX - 8, radY - 26);
    ctx.stroke();

    // Vintage 1994 Calendar beside mirror
    const calX = mirrorX + mirrorW + 16;
    const calY = mirrorY + 10;
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#b91c1c';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(calX, calY, 46, 62, 3);
    ctx.fill();
    ctx.stroke();
    // Red calendar header
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(calX, calY, 46, 15);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("1994", calX + 23, calY + 11);

    // Bollywood Hero Poster
    const postX = calX;
    const postY = calY + 70;
    ctx.fillStyle = '#fed7aa';
    ctx.strokeStyle = '#c2410c';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(postX, postY, 46, 56, 3);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#9a3412';
    ctx.font = 'bold 7px sans-serif';
    ctx.fillText("HERO NO. 1", postX + 23, postY + 16);

    // 5. THE BARBER CHAIR & CUSTOMER RECLINING WITH LATHERED BEARD ("Making Beard")
    const chairCenterX = shelfX + shelfW * 0.46;
    const chairBaseY = groundY - 10;

    // Vintage Hydraulic Barber Chair (Teal vinyl & chrome)
    ctx.save();
    // Chrome circular base on floor
    ctx.fillStyle = '#94a3b8';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(chairCenterX, chairBaseY, 36, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Chrome central hydraulic shaft
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(chairCenterX - 7, chairBaseY - 38, 14, 38);

    // Teal Cushioned Reclined Seat
    ctx.fillStyle = '#0d9488';
    ctx.strokeStyle = '#042f2e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(chairCenterX - 28, chairBaseY - 58, 56, 22, 5);
    ctx.fill();
    ctx.stroke();

    // Reclined Backrest
    ctx.save();
    ctx.translate(chairCenterX - 16, chairBaseY - 58);
    ctx.rotate(-0.25);
    ctx.fillStyle = '#0f766e';
    ctx.beginPath();
    ctx.roundRect(-7, -56, 18, 58, 5);
    ctx.fill();
    ctx.stroke();

    // Headrest
    ctx.fillStyle = '#115e59';
    ctx.beginPath();
    ctx.roundRect(-4, -74, 15, 16, 4);
    ctx.fill();
    ctx.restore();

    // Customer Reclining
    const custHeadX = chairCenterX - 26;
    const custHeadY = chairBaseY - 116;

    // White barber cape draping over customer body
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(custHeadX + 4, custHeadY + 16);
    ctx.quadraticCurveTo(chairCenterX + 24, custHeadY + 30, chairCenterX + 26, chairBaseY - 40);
    ctx.lineTo(chairCenterX - 34, chairBaseY - 40);
    ctx.quadraticCurveTo(chairCenterX - 36, custHeadY + 38, custHeadX - 4, custHeadY + 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Customer head tilted back on headrest
    ctx.fillStyle = '#b45309'; // Skin tone
    ctx.beginPath();
    ctx.arc(custHeadX, custHeadY, 14, 0, Math.PI * 2);
    ctx.fill();

    // Customer black hair
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(custHeadX - 4, custHeadY - 4, 13, Math.PI * 0.7, Math.PI * 1.8);
    ctx.fill();

    // RICH WHITE SHAVING LATHER / FOAM ON JAWLINE ("Making Beard")
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(custHeadX + 2, custHeadY);
    ctx.quadraticCurveTo(custHeadX + 15, custHeadY + 5, custHeadX + 11, custHeadY + 15);
    ctx.quadraticCurveTo(custHeadX + 3, custHeadY + 17, custHeadX - 3, custHeadY + 13);
    ctx.closePath();
    ctx.fill();

    // 6. THE BARBER WITH AUTHENTIC VILLAGE CLOTHING & SHAVING ACTION
    const barberX = chairCenterX + 26;
    const barberY = groundY;

    // Barber's leather sandals on floor
    ctx.fillStyle = '#451a03';
    ctx.fillRect(barberX - 8, barberY - 6, 12, 6);
    ctx.fillRect(barberX + 6, barberY - 6, 12, 6);

    // Barber's dark charcoal formal pleated trousers
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(barberX - 7, barberY - 72, 10, 66);
    ctx.fillRect(barberX + 5, barberY - 72, 10, 66);

    // Dark leather belt & metal buckle
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(barberX - 10, barberY - 76, 28, 5);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(barberX + 1, barberY - 76, 6, 5);

    // Barber's crisp white collared shirt
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(barberX - 11, barberY - 138, 30, 62, 5);
    ctx.fill();
    ctx.stroke();

    // Shirt placket and tiny buttons
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(barberX + 4, barberY - 136);
    ctx.lineTo(barberX + 4, barberY - 76);
    ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(barberX + 4, barberY - 124, 1.2, 0, Math.PI * 2);
    ctx.arc(barberX + 4, barberY - 108, 1.2, 0, Math.PI * 2);
    ctx.arc(barberX + 4, barberY - 92, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Shirt breast pocket with red comb peeking out
    ctx.fillStyle = '#f1f5f9';
    ctx.strokeStyle = '#94a3b8';
    ctx.beginPath();
    ctx.roundRect(barberX - 8, barberY - 118, 9, 12, 2);
    ctx.fill();
    ctx.stroke();
    // Red comb teeth in pocket
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(barberX - 6, barberY - 123, 5, 6);

    // TRADITIONAL WHITE & RED CHECK COTTON TOWEL (GAMCHA) ON LEFT SHOULDER
    ctx.fillStyle = '#f1f5f9';
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(barberX + 9, barberY - 142, 11, 46, 3);
    ctx.fill();
    ctx.stroke();
    // Red checks on gamcha
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.4)';
    ctx.lineWidth = 1;
    for (let gy = barberY - 138; gy < barberY - 100; gy += 6) {
      ctx.beginPath();
      ctx.moveTo(barberX + 9, gy);
      ctx.lineTo(barberX + 20, gy);
      ctx.stroke();
    }

    // Barber head & mustache
    ctx.fillStyle = '#a16207'; // Skin tone
    ctx.beginPath();
    ctx.arc(barberX + 3, barberY - 152, 13, 0, Math.PI * 2);
    ctx.fill();

    // Dark combed hair
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(barberX + 3, barberY - 156, 12, Math.PI, Math.PI * 2);
    ctx.fill();

    // Classic Indian mustache
    ctx.fillStyle = '#09090b';
    ctx.fillRect(barberX - 3, barberY - 149, 10, 3);

    // Barber's Left Arm supporting customer's jawline
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(barberX - 6, barberY - 128);
    ctx.lineTo(custHeadX + 6, custHeadY + 12);
    ctx.stroke();

    // Barber's Right Arm Shaving Beard with Straight Razor
    const strokeOffset = Math.sin(this.shavingStroke) * 5;
    const razorHandX = custHeadX + 9 + strokeOffset;
    const razorHandY = custHeadY + 6 + strokeOffset * 0.4;

    // Bent right arm
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(barberX - 4, barberY - 128);
    ctx.lineTo(barberX - 16, barberY - 112);
    ctx.lineTo(razorHandX, razorHandY);
    ctx.stroke();

    // Barber right hand
    ctx.fillStyle = '#a16207';
    ctx.beginPath();
    ctx.arc(razorHandX, razorHandY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Silver straight razor blade
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(razorHandX - 6, razorHandY + 2);
    ctx.lineTo(razorHandX + 6, razorHandY - 4);
    ctx.stroke();
    // Tortoiseshell razor handle
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(razorHandX + 6, razorHandY - 4);
    ctx.lineTo(razorHandX + 11, razorHandY - 8);
    ctx.stroke();

    ctx.restore();

    // 7. WAITING WOODEN BENCH WITH PROPERLY ATTIRED VILLAGE PATRONS
    const benchX = shopLeft + shopW * 0.58;
    const benchY = groundY - 32;
    const benchW = shopW * 0.38;

    ctx.save();
    // Rustic red-painted timber bench frame
    ctx.fillStyle = '#831843'; // Deep Indian red-brown timber
    ctx.strokeStyle = '#500724';
    ctx.lineWidth = 1.5;
    // Bench Seat Plank
    ctx.beginPath();
    ctx.roundRect(benchX, benchY, benchW, 10, 2);
    ctx.fill();
    ctx.stroke();
    // Bench Backrest Plank
    ctx.fillRect(benchX, benchY - 36, benchW, 8);
    // Bench Legs & Stanchions
    ctx.fillRect(benchX + 8, benchY + 10, 7, 22);
    ctx.fillRect(benchX + benchW * 0.5 - 3, benchY + 10, 7, 22);
    ctx.fillRect(benchX + benchW - 15, benchY + 10, 7, 22);
    ctx.fillRect(benchX + 8, benchY - 36, 7, 36);
    ctx.fillRect(benchX + benchW - 15, benchY - 36, 7, 36);

    // PATRON 1: In light blue striped collared shirt & khaki trousers
    const p1X = benchX + benchW * 0.18;
    // Chappals / sandals on floor
    ctx.fillStyle = '#451a03';
    ctx.fillRect(p1X - 7, groundY - 4, 6, 4);
    ctx.fillRect(p1X + 2, groundY - 4, 6, 4);
    // Khaki/beige trousers
    ctx.fillStyle = '#d4d4d8';
    ctx.fillRect(p1X - 6, benchY + 4, 6, 26);
    ctx.fillRect(p1X + 2, benchY + 4, 6, 26);
    // Light blue striped shirt
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.roundRect(p1X - 10, benchY - 44, 22, 46, 3);
    ctx.fill();
    // Stripes
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 1;
    for (let sx = p1X - 8; sx <= p1X + 10; sx += 4) {
      ctx.beginPath();
      ctx.moveTo(sx, benchY - 44);
      ctx.lineTo(sx, benchY + 2);
      ctx.stroke();
    }
    // Head & face
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(p1X + 1, benchY - 54, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(p1X + 1, benchY - 57, 9.5, Math.PI, Math.PI * 2);
    ctx.fill();

    // PATRON 2: Village elder in terracotta/saffron kurta & white pyjama with legs crossed
    const p2X = benchX + benchW * 0.52;
    // White pyjama legs (one crossed over knee)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(p2X - 5, benchY + 4, 6, 26); // Lower leg
    ctx.fillRect(p2X - 2, benchY + 8, 14, 7); // Crossed leg
    // Terracotta Indian Kurta with mandarin collar & buttons
    ctx.fillStyle = '#c2410c';
    ctx.beginPath();
    ctx.roundRect(p2X - 11, benchY - 42, 23, 48, 4);
    ctx.fill();
    // Kurta collar & buttons
    ctx.fillStyle = '#7c2d12';
    ctx.fillRect(p2X - 1, benchY - 40, 3, 14);
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(p2X + 0.5, benchY - 36, 1, 0, Math.PI * 2);
    ctx.arc(p2X + 0.5, benchY - 31, 1, 0, Math.PI * 2);
    ctx.fill();
    // Head with graying hair & mustache
    ctx.fillStyle = '#a16207';
    ctx.beginPath();
    ctx.arc(p2X + 1, benchY - 52, 9.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#52525b'; // Salt-and-pepper hair
    ctx.beginPath();
    ctx.arc(p2X + 1, benchY - 55, 9, Math.PI, Math.PI * 2);
    ctx.fill();

    // PATRON 3: Village man in dark jacket and yellow knitted monkey cap
    const p3X = benchX + benchW * 0.82;
    // Dark trousers
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(p3X - 5, benchY + 4, 6, 26);
    ctx.fillRect(p3X + 2, benchY + 4, 6, 26);
    // Dark jacket / sweater
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.roundRect(p3X - 10, benchY - 40, 21, 42, 4);
    ctx.fill();
    // Holding folded newspaper
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(p3X - 8, benchY - 14, 16, 12);
    ctx.fillStyle = '#475569';
    ctx.fillRect(p3X - 6, benchY - 11, 12, 2);
    ctx.fillRect(p3X - 6, benchY - 7, 12, 2);
    // Head & Yellow Village Knitted Cap
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(p3X + 1, benchY - 50, 9, 0, Math.PI * 2);
    ctx.fill();
    // Yellow cap
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(p3X + 1, benchY - 54, 9.5, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.fillRect(p3X - 8, benchY - 54, 18, 4); // Folded rim of cap

    ctx.restore();

    // 8. VINTAGE DELUXE SALOON FASCIAS & SIGNBOARD
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

    // 9. VINTAGE ROTATING BARBER POLE
    this.renderBarberPole(shopLeft - 30, roofY + 45, 20, 120);

    // 10. VINTAGE 3-BLADE CEILING FAN (Motor, Downrod & Spinning Blades with Perspective)
    this.renderCeilingFan(shopLeft + shopW * 0.44, roofY + 34);

    // 11. FINE WATER MIST EMISSION (Interactive when user clicks Water Mist)
    if (this.steamDrops.length > 0) {
      ctx.save();
      this.steamDrops.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.96;
        d.vy *= 0.96;
        d.alpha -= 0.016;
        d.r += 0.08;
        ctx.fillStyle = `rgba(224, 242, 254, ${Math.max(0, d.alpha)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      this.steamDrops = this.steamDrops.filter(d => d.alpha > 0);
      ctx.restore();
    }
  }

  renderBarberPole(x, y, width, height) {
    const ctx = this.ctx;
    this.poleRotation = (this.poleRotation + 1.8) % 60;

    ctx.save();
    ctx.fillStyle = '#d4d4d8';
    ctx.beginPath();
    ctx.roundRect(x - 4, y - 12, width + 8, 12, 4);
    ctx.roundRect(x - 4, y + height, width + 8, 12, 4);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 6);
    ctx.clip();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y, width, height);

    const stripeW = 20;
    for (let sy = y - height + this.poleRotation; sy < y + height * 2; sy += stripeW * 2) {
      // Red stripe
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(x, sy);
      ctx.lineTo(x + width, sy + stripeW);
      ctx.lineTo(x + width, sy + stripeW * 1.5);
      ctx.lineTo(x, sy + stripeW * 0.5);
      ctx.closePath();
      ctx.fill();

      // Blue stripe
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.moveTo(x, sy + stripeW);
      ctx.lineTo(x + width, sy + stripeW * 2);
      ctx.lineTo(x + width, sy + stripeW * 2.5);
      ctx.lineTo(x, sy + stripeW * 1.5);
      ctx.closePath();
      ctx.fill();
    }

    // Glass cylinder shine
    const shine = ctx.createLinearGradient(x, y, x + width, y);
    shine.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    shine.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
    shine.addColorStop(0.8, 'rgba(0, 0, 0, 0.25)');
    ctx.fillStyle = shine;
    ctx.fillRect(x, y, width, height);

    ctx.restore();
  }

  renderCeilingFan(centerX, centerY) {
    const ctx = this.ctx;
    ctx.save();

    // Rafter ceiling canopy (compact)
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 18, 5.5, 0, Math.PI);
    ctx.fill();

    // Steel downrod pipe hanging down from roof
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 18);
    ctx.lineTo(centerX, centerY);
    ctx.stroke();

    // Rear wall shadow of rotating blades (compact)
    ctx.save();
    ctx.translate(centerX + 6, centerY + 16);
    ctx.scale(1, 0.42); // Elliptical 3D perspective shadow
    ctx.rotate(this.fanRotation);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);
      ctx.beginPath();
      ctx.roundRect(8, -5, 50, 10, 3.5);
      ctx.fill();
    }
    ctx.restore();

    // Fan 3D Blades (elliptical projection from below - scaled down)
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(1, 0.44); // Perspective viewing angle
    ctx.rotate(this.fanRotation);

    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);

      // Blade chrome shank / bracket
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(5, -2.5, 7, 5);

      // Aerodynamic vintage metallic brown blade (compact 48px)
      const bladeGrad = ctx.createLinearGradient(12, -5.5, 60, 5.5);
      bladeGrad.addColorStop(0, '#5c2b0c');
      bladeGrad.addColorStop(0.5, '#78350f');
      bladeGrad.addColorStop(1, '#451a03');
      ctx.fillStyle = bladeGrad;
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(12, -5.5, 48, 11, 3.5);
      ctx.fill();
      ctx.stroke();

      // Gold pinstripe ridge along blade
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(56, 0);
      ctx.stroke();
    }
    ctx.restore();

    // Central motor hub (compact 10x6)
    ctx.fillStyle = '#451a03';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Gold center teardrop finial
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(centerX, centerY + 2, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /* ============================================================
   * MASTER RENDER LOOP (WITH DELTA-TIME SMOOTHING FOR BUTTER-SMOOTH TRAVEL)
   * ============================================================ */

  startLoop() {
    let lastTime = performance.now();
    const loop = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      const dtScale = dt > 0 ? (dt / 0.01667) : 1.0;

      this.ctx.clearRect(0, 0, this.w, this.h);

      if (this.activeMode === 'driver') {
        this.renderBusMode(dtScale);
      } else {
        this.renderSaloonMode(dtScale);
      }

      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  stopLoop() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
  }
}

// Export singleton
window.visualsEngine = new VisualsEngine();
