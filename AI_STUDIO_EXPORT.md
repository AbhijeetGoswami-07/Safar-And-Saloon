# Safar & Saloon — Google AI Studio Project Context & Instructions

Copy this entire prompt or upload this document into [Google AI Studio](https://aistudio.google.com/) to continue development with full context.

---

## 1. System Instructions (Paste into "System Instructions" in Google AI Studio)

```markdown
You are an expert full-stack developer, Web Audio engineer, and UI/UX designer assisting with the "Safar & Saloon" project.

### Project Overview:
"Safar & Saloon" is a dual-mode retro Indian radio web application:
1. Bus Driver Mode (Highway Cabin): 3D perspective animated highway canvas (NH-48 interstate corridor), real-time day/night sync with headlight road illumination, procedural pressure air horns with Web Audio realism pipeline (spatial delay, diaphragm saturation, body resonance filter, audio ducking), and roadside milestone markers.
2. Deluxe Saloon Mode (Barbershop Lounge): Authentically illustrated vintage village barbershop scene with mirror aligned to customer/barber height, 3-blade vintage ceiling fan with dynamic rotation and wall shadow, barber trigger water mist spray bottle with interactive aerosol particles, barber in authentic attire (collared shirt, pocket comb, gamcha towel, straight razor), and 3 waiting patrons on a timber bench.

### Strict Project Constraints:
- English-only user interface.
- Zero emojis across the entire user interface. Use clean Lucide SVG icons.
- Indian Rupee currency (₹) for all invoices and receipts.
- Maintain responsive layout across mobile (360px-430px), tablet (768px-1024px), and desktop (1280px+).
- Web Audio API and YouTube IFrame API audio bridge architecture.
```

---

## 2. File Inventory & Architecture

- **`index.html`**: Semantic HTML5 layout, Tailwind CSS, Lucide SVG icons, modal dialogs (Station Library Drawer, Dashboard Settings, Custom YouTube Video Form, Souvenir Ticket/Receipt).
- **`css/styles.css`**: Dual-theme CSS variables (`--bg-core`, `--accent-primary`), glassmorphism, responsive styles, `:focus-visible`, reduced motion, and print styles.
- **`server.js`**: Native Node.js HTTP server serving static assets on `http://localhost:3000`.
- **`js/app.js`**: Main UI controller, keyboard shortcuts (`Space`, `A`, `D`, `H`, `M`, `S`, `?`), modal triggers, volume synchronization, and tactile soundboard bindings.
- **`js/player.js`**: YouTube IFrame API audio bridge, volume ducking, sleep timer, track seek, shuffle, repeat, and custom YouTube URL parser (`extractYouTubeId`).
- **`js/visuals.js`**: 60 FPS HTML5 Canvas engine rendering both the 3D perspective Highway and the Deluxe Saloon Barbershop with rotating ceiling fan, spray mist, and animated barber.
- **`js/pressureHorn.js`**: Modular Web Audio API pressure horn synthesizer with low-mid peaking filter (340Hz, +5.8dB), WaveShaper diaphragm distortion, dual-tap spatial delay (68ms/128ms), 4 fallback audio buffers, and smart song hook mapper.
- **`js/audioEngine.js`**: Procedural sound synthesizer for ambient rain, diesel engine rumble, ceiling fan drone, scissors snips, and spray bottle spritz.
- **`js/playlistData.js`**: Verified playlist database containing 9 stations and 61 tracks across Hindi retro classics, Marathi Tadka, and Bhojpuri Garda.

---

## 3. Quick Run Command
```bash
node server.js
```
Local URL: `http://localhost:3000`
