# Safar & Saloon 📻

> **Dual Retro Radio Web Experience — Midnight Highway Interstate Cabin & Vintage Deluxe Barbershop Lounge**

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](LICENSE)
[![HTML5 Canvas](https://img.shields.io/badge/Canvas-60_FPS_Procedural-blue?style=for-the-badge&logo=html5)](js/visuals.js)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesized_FX-purple?style=for-the-badge)](js/audioEngine.js)
[![YouTube IFrame API](https://img.shields.io/badge/YouTube-IFrame_Player-red?style=for-the-badge&logo=youtube)](js/player.js)
[![Zero Build Dependencies](https://img.shields.io/badge/Dependencies-Vanilla_JS-emerald?style=for-the-badge)](package.json)
[![Responsive](https://img.shields.io/badge/Design-Mobile_|_Tablet_|_Desktop-orange?style=for-the-badge)](css/styles.css)

---

## 🌟 Overview

**Safar & Saloon** is an interactive, browser-native audio-visual web application that revives two quintessential Indian cultural travel and leisure archetypes:

1. 🚌 **Bus Driver (Highway Cabin / Safar)**: Midnight interstate cruising along the **NH-48 corridor**, soulful 90s Bollywood cassette tape classics, a 3D perspective infinite asphalt highway, dynamic day/night/sunset/rain weather cycles, roadside kilometer milestone markers, oncoming vehicle headlight glows, and procedural multi-tone pressure air horns.
2. 💈 **Deluxe Saloon (Barbershop Lounge)**: Sunday morning haircut sessions, warm teak wood dado wainscoting, vintage gamthi striped wallpaper, an ornate gilded mirror, a rotating tricolor barber pole, a slow 3-blade ceiling fan casting sweeping shadows, and procedural soundboards for dual-blade scissors snips, spritzer water mist, and head massage machines.

Everything runs entirely in client-side vanilla JavaScript, modern CSS3, and HTML5 Canvas with **zero heavy frontend frameworks or build steps required**.

---

## 🎛️ The Two Modes

| Feature | 🚌 Bus Driver Mode | 💈 Deluxe Saloon Mode |
| :--- | :--- | :--- |
| **Theme / Vibe** | Midnight Highway Cabin & Interstate Long Haul | Sunday Morning Village Barbershop |
| **Visual Atmosphere** | 3D perspective highway, distant mountains, streetlights, poles, trees | Full-width saloon room, gamthi wallpaper, teak wood dado, mirror, barber pole |
| **Motion Physics** | Sub-pixel perspective asphalt glide, roadside entity scaling, cabin heave | 3-blade rotating ceiling fan with dynamic wall shadows, barber pole helix |
| **Weather / Sky** | Real-time Sunset, Night Halogen Beams, Dark Storm Rain with dual wipers | Warm indoor saloon ambient lighting and fluorescent tube glints |
| **Procedural Soundboard** | Melodic Song Hook Horn, Classic Dipper Horn, City Clipper, Diesel Rumble | Dual-blade scissor snips, pressurized water mist spritzer, head vibrator, fan hum |
| **Curated Radio Frequencies** | NH-48 Sleeper, Gulzar Ghazals, Manache Ghaav, Dhaba Beats, Monsoon Rain | Deluxe 90s Romance, Gulzar Ghazals, Manache Ghaav, Sunday Morning, Transistor 70s |
| **Souvenir Generator** | Interstate Highway Passenger Ticket (PNR, Seat, Route) | Deluxe Gentlemen's Hair Salon Appointment Receipt & Bill |

---

## ✨ Key Capabilities

### 1. 60 FPS Procedural HTML5 Canvas Visual Engine
- **Endless 3D Perspective Highway**: Mathematically computed perspective projection rendering moving dashed lane dividers with zero stutter and smooth continuous travel motion when music plays.
- **Dynamic Roadside Scenery**:
  - Distance-scaled kilometer milestone stones (e.g. *NH-48 • Jaipur 140 KM / Mumbai 380 KM*).
  - Overhead highway electric light poles, streetlamps, and roadside trees.
  - Distant multi-layered mountain silhouettes with atmospheric depth.
  - Approaching oncoming vehicles with high-beam halogen headlights emerging from the horizon.
- **Windshield Rain & Dynamic Dual Mechanical Wipers**:
  - Overcast storm sky with dark rain clouds and procedural falling rain droplets.
  - Dual synchronized mechanical wiper blades wiping water streaks across the windshield.
  - Hanging dashboard evil-eye amulet swaying with smooth cursor and acceleration physics.
- **Authentic Village Barbershop Interior**:
  - Continuous retro gamthi striped wallpaper and lower teak wood wainscoting spanning the full width of the canvas.
  - Gilded salon mirror with realistic reflection glints.
  - Continuously rotating 3D barber pole with helical red, white, and blue ribbons.
  - Handcrafted barbershop accessories: Barbicide comb jar, shaving cream mug, straight razor, and talcum powder.
  - Authentic red & gold shop fascia signboard: *"DELUXE GENTLEMEN'S HAIR SALON & SHAVING • EST. 1994"*.

### 2. Real-Time Procedural Web Audio API Synthesizer
Zero external audio sample downloads are needed for core tactile effects — all sounds are synthesized mathematically on the fly:
- **Bus Driver Soundboard**:
  - **Song Hook Melodic Air Horn**: Extracts the iconic melody hook of the currently playing track and chimes it through a custom Web Audio filter graph (peaking EQ at 340Hz, +5.8dB, WaveShaper diaphragm saturation, and dual-tap spatial delay).
  - **Single Passing Dipper Horn**: Quick high-low highway overtaker alert.
  - **Sharp City Clipper**: Crisp short pneumatic bursts.
  - **Reverse Siren**: Retro rhythmic reversing warning siren.
  - **Diesel Engine Idle & Cruise**: Low-frequency pink noise + pulse oscillator with sub-harmonic throttle modulation.
- **Deluxe Saloon Soundboard**:
  - **Dual-Blade Metallic Scissor Snips**: High-pass filtered noise bursts paired with twin metal resonance ringers.
  - **Pressurized Water Spritzer Mist**: White noise bursts shaped with an exponential volume decay envelope.
  - **Head Massage Machine Vibrator**: Low 120Hz square-wave modulation with harmonic buzzing overtones.
  - **Ceiling Fan Motor Hum & Drone**: Warm 50Hz hum combined with subtle blade-whoosh modulation.

### 3. Curated 91-Track Radio Station Library
Includes 91 verified, active YouTube stream tracks across 12 station channels:

#### Bus Driver Stations:
1. **NH-48 Midnight Sleeper** (11 tracks) — Soulful late-night road trip anthems (*Tum Se Hi*, *Kun Faya Kun*, *Pee Loon*, *Aao Milo Chalo*).
2. **Gulzar Ghazals** (11 tracks) — Timeless ghazals and poetic gems penned by Gulzar (*Tujhse Naraz Nahin*, *Mera Kuchh Saaman*, *Hazaaron Khwahishein Aisi*).
3. **Manache Ghaav** (10 tracks) — Deeply emotional, poignant Marathi sad songs (*Kadhi Tu*, *Majhya Mana*, *Mee Sindhutai Sapkal*).
4. **Highway Dhaba Beats** (5 tracks) — High-octane bhangra and dhaba anthems (*Tunak Tunak Tun*, *Gud Naal Ishq Mitha*).
5. **Monsoon Highway & Rain** (4 tracks) — Atmospheric monsoon road ballads (*Rimjhim Gire Sawan*, *Barso Re*).
6. **Bhojpuri Garda** (5 tracks) — Traditional earthy countryside transport hits.

#### Deluxe Saloon Stations:
1. **Deluxe 90s Romance** (11 tracks) — Nostalgic cassette classics (*Chura Ke Dil Mera*, *Tip Tip Barsa Paani*, *Bahon Ke Darmiyan*).
2. **Gulzar Ghazals** (11 tracks) — Soul-stirring poetry for leisurely haircut afternoons.
3. **Manache Ghaav** (10 tracks) — Melancholic Marathi masterpieces.
4. **Sunday Morning Session** (5 tracks) — Relaxing ragas and morning classical instrumentals.
5. **Heartbreak Melodies** (4 tracks) — Melancholic transistor radio classics.
6. **Vintage Transistor Radio** (4 tracks) — Kishore Kumar and R.D. Burman 70s golden hits.

### 4. Souvenir Passenger Ticket & Saloon Bill Generator
Generate, preview, print, or download high-resolution canvas receipts:
- **Interstate Bus Passenger Ticket**: Complete with PNR number, seat number, boarding point, destination, passenger fare (₹), security stamp, and retro bus authority crest.
- **Deluxe Saloon Invoice & Bill**: Includes Bill Number, barber master name, itemized services (Haircut, Shave, Head Massage), total in Indian Rupees (₹), and authorized signature stamp.
- **Export Formats**: One-click PNG image download or browser print layout.

### 5. Custom Track & YouTube URL Loader
Paste any YouTube link, Short, or 11-character video ID into the custom track modal to listen to your personal favorite playlists while enjoying the highway or barbershop environments.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Space</kbd> | Toggle Play / Pause |
| <kbd>D</kbd> or <kbd>→</kbd> | Next Track |
| <kbd>A</kbd> or <kbd>←</kbd> | Previous Track |
| <kbd>S</kbd> | Switch Mode (**Bus Driver** ⇄ **Deluxe Saloon**) |
| <kbd>H</kbd> | Trigger Pressure Air Horn (Driver) / Scissor Snip (Saloon) |
| <kbd>M</kbd> | Toggle Mute / Unmute |
| <kbd>?</kbd> | Open Settings & Audio Ducking Preferences |
| <kbd>Esc</kbd> | Close Active Modal / Drawer |

---

## 🏗️ Architecture & Project Structure

```
Safar-And-Saloon/
├── START_PROJECT.bat          # One-click Windows project launcher
├── PUSH_TO_GITHUB.bat         # One-click Git commit & GitHub push sync
├── UPDATE_GITHUB.bat          # Alias for PUSH_TO_GITHUB.bat
├── index.html                 # Main application layout, semantic DOM & modals
├── package.json               # Node.js project manifest & start script
├── server.js                  # Native zero-dependency static HTTP server
├── README.md                  # Comprehensive project documentation
├── AI_STUDIO_EXPORT.md        # Prompt & context export for Google AI Studio
├── Playlist                   # Consolidated all-in-one codebase file
├── Playlist.md                # Formatted markdown codebase archive
├── Playlist.txt               # Plaintext codebase archive
├── css/
│   └── styles.css             # Design tokens, glassmorphic UI, animations, themes
├── fonts/
│   ├── OFL.txt                # Open Font License
│   ├── README.txt             # Font documentation
│   ├── BigShoulders-VariableFont_opsz,wght.ttf
│   └── static/                # Big Shoulders static weights (Black, Bold, Light, etc.)
├── js/
│   ├── app.js                 # Central controller, UI bindings, ticket generator
│   ├── audioEngine.js         # Procedural Web Audio synthesizer (engine, fan, mist, snip)
│   ├── player.js              # YouTube IFrame API audio bridge & resilient playback
│   ├── playlistData.js        # 91 curated tracks across 12 radio stations
│   ├── pressureHorn.js        # Multi-tone highway air horn synthesizer
│   └── visuals.js             # 60 FPS HTML5 Canvas engine (Highway 3D & Saloon interior)
├── sounds/
│   ├── classic_single_tone.wav
│   ├── reverse_siren.wav
│   ├── sharp_city_clipper.wav
│   └── triple_tone_alternating.wav
└── scripts/
    ├── create_playlist_file.js # Generator for single-file codebase bundle
    ├── find_tracks.js          # Track search utility
    ├── patch_visuals.js        # Visual layer enhancement script
    ├── run_track_fetch.js      # YouTube track validator
    ├── update_playlist_data.js # Station metadata sync
    └── verified_tracks.json    # JSON cache of verified YouTube streams
```

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser with HTML5 Canvas and Web Audio API support (Chrome, Edge, Firefox, Safari).
- [Node.js](https://nodejs.org/) (v16 or newer recommended) or any static HTTP server.

### One-Click Launch & GitHub Sync (Windows)
- **Start Project**: Double-click **`START_PROJECT.bat`** (or desktop shortcut **`Safar and Saloon`**) to launch the server and open your browser automatically.
- **Sync with GitHub**: Double-click **`PUSH_TO_GITHUB.bat`** or **`UPDATE_GITHUB.bat`** (or desktop shortcut **`Sync with GitHub - Safar & Saloon`**) to automatically refresh codebase bundles, formulate a semantic commit message, commit changes, and push directly to GitHub!

### Manual Terminal Launch

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbhijeetGoswami-07/Safar-And-Saloon.git
   cd Safar-And-Saloon
   ```

2. **Start the local server:**
   ```bash
   npm start
   # or run directly:
   node server.js
   ```

3. **Open the application:**
   Navigate to `http://localhost:3000` in your web browser.

> [!TIP]
> You can also run the project with Python:
> ```bash
> python -m http.server 3000
> ```
> Or use the VS Code **Live Server** extension on `index.html`.

---

## 🎨 Design System & Accessibility

- **Typography**: Display headlines powered by **Big Shoulders** (`font-big-shoulders`, weights 700 to 900) for authentic retro highway milestone and vintage Indian shop signage aesthetics.
- **Glassmorphism**: Backdrop blur overlays with high-contrast pill badges ensure readable navigation above dynamic road headlights and mirror reflections.
- **Strict English UI**: Clean, standardized typography with zero emojis in visible UI elements (pure Lucide SVG iconography).
- **Audio Ducking**: Procedural sound effects (horns, scissors, engine revs) automatically duck background music volume by 35% to 55% for realistic acoustic presence.
- **Hardware Acceleration**: Canvas rendering executes on `requestAnimationFrame` with normalized delta-time (`dtScale`) to guarantee buttery-smooth 60 FPS across both 60Hz and 120Hz/144Hz displays.

---

## 🤝 Contributing

Contributions, bug reports, and station suggestions are warmly welcome!
1. Fork the Project (`https://github.com/AbhijeetGoswami-07/Safar-And-Saloon/fork`)
2. Create your Feature Branch (`git checkout -b feature/NewStation`)
3. Commit your Changes (`git commit -m "Add new retro station"`)
4. Push to the Branch (`git push origin feature/NewStation`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Crafted with nostalgic love for Indian highway journeys and retro village barbershop mornings.</sub><br>
  <strong>Horn OK Please • Safar Shubh Ho</strong>
</div>
