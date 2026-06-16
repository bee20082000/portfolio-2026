# Huy Nguyen — Creative & UX/UI React Bento Portfolio

A highly immersive, professional Bento Grid portfolio built with **Vite**, **React**, **GSAP (GreenSock Animation Platform)**, and **Vanilla CSS**. This repository has been structured as an industry-standard React component codebase.

---

## 📁 Modular React Architecture

Your portfolio has been decomposed into modular, isolated React components:

```text
Portfolio/
├── .gitignore          # Keeps build and dependency folders out of git history
├── README.md           # This comprehensive documentation guide
├── index.html          # Clean entrypoint with react mounting point
├── package.json        # NPM package descriptor defining React & GSAP packages
├── vite.config.js      # Vite compilation configuration for React presets
└── src/
    ├── main.jsx        # Bootstrap file mounting React inside index.html root
    ├── App.jsx         # Global controller tracking theme state, tab selector, and modals
    ├── style.css       # Visual HSL variables, desktop coord configurations, and metrics CSS
    └── components/
        ├── Cursor.jsx        # Stretchy custom cursor running inside GSAP ticker context
        ├── Topbar.jsx        # Navigation bar incorporating SVG theme toggles & magnetic pulls
        ├── BentoSwitcher.jsx # Pill select button triggering staggers & spring attractions
        ├── OverviewGrid.jsx  # Stagger-assembles the 15 tiles, attaching 3D tilts and triggers
        ├── CasesGrid.jsx     # Controls case cards, capturing boundary coords on expand click
        └── BlogModal.jsx     # Renders parallax articles, stats blocks, and handles reverse morphs
```

---

## 🚀 Setup & Launch on Windows

Follow these simple steps to run your React app locally:

### 1. Download and Install Node.js
If you haven't installed it yet:
*   Press your **Windows Key**, type **PowerShell**.
*   Right-click on **Windows PowerShell** and choose **Run as Administrator**.
*   Paste the following command and press Enter:
    ```powershell
    choco install nodejs-lts -y
    ```
*   Close the Administrator shell and reopen your normal terminal in your workspace directory.

### 2. Install Project Dependencies
Run this in your normal terminal to download all the React, GSAP, and Vite compilation libraries:
```bash
npm install
```
This will create your local `node_modules/` folder.

### 3. Start the Hot-Reloading Development Server
Launch your ultra-fast Vite dev server:
```bash
npm run dev
```
Open the provided URL (usually `http://localhost:5173`) in your browser to experience your high-fidelity React portfolio! Any edits you make to components in `/src` will instantly hot-reload in the browser without losing application state.

### 4. Build for Production
To compile a highly optimized, minified bundle ready for immediate production hosting (e.g. Vercel, Netlify, or GitHub Pages), run:
```bash
npm run build
```
This outputs a lightweight `/dist` folder that you can deploy with one-click.

---

## 💎 Custom React & GSAP Orchestrations

Here is a look at the modern development patterns we deployed:

1.  **Scoped GSAP Contexts**: We utilized the official `@gsap/react` hook framework. This guarantees that all interactive GSAP animations are scoped cleanly to their specific DOM components and safely garbage-collected when components mount/unmount.
2.  **60+ FPS Mouse Follower**: Stretchy liquid followers run inside native high-frequency `gsap.ticker` rendering callbacks, avoiding standard React component re-renders to unlock solid 60+ FPS visual speed.
3.  **Physical Morphing Coordinates**: Clicking a project card captures its exact layout coordinates via `getBoundingClientRect()`. This is passed as a React ref to our `<BlogModal />`, which fires a reverse-morph shrink transition back into the exact card bounds when closed, regardless of active window resizing!
4.  **HCMC Live Time Tracker**: A React-native interval timer ticks the clock inside HCMC's timezone (`GMT+7`), keeping your local time perfectly synchronized.
