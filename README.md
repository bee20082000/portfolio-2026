# Huy Nguyen — Creative & Visual Designer Portfolio (2026)

<p align="center">
  <a href="https://portfolio-2026-self-sigma.vercel.app/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Live_Demo-portfolio--2026.vercel.app-ff48b0?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-8.0.16-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP 3" />
  <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-000000?style=flat-square" alt="Lenis" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel" alt="Vercel" />
</p>

---

## ✦ Overview

> *"I'm a creative designer. I've worked on many projects, mainly making brands more memorable and campaigns less forgettable."*  
> — **Huy Nguyen**

This repository contains the source code for the personal portfolio of **Huy Nguyen (Nguyen Quoc Huy)** — a Saigon-based Creative Designer, Art Director, and Visual Identity Specialist. 

Engineered with **React 18**, **Vite**, **GSAP**, and **Lenis**, the site delivers an editorial, bento-inspired digital exhibition featuring high-refresh tactile physics, liquid cursor choreography, interactive card decks, spatial coordinate morphing, and sensory audio feedback.

🔗 **Live Experience:** [portfolio-2026-self-sigma.vercel.app](https://portfolio-2026-self-sigma.vercel.app/)

---

## ✦ Key Highlights & Creative Engineering

### 1. 🎴 Dynamic Card Decks & Inertial Transforms
- **Interactive About Deck:** Multi-layered postcard stack with calculated rotational offsets, depth-sorting (`z-index`), and physics-based fly-in/fly-out navigation.
- **Scroll-Scrubbed Contact Cards:** As users reach the contact section, branded contact & social cards execute simultaneous multi-axis translations and 500°+ rotational scrubs powered by **GSAP ScrollTrigger**.

### 2. ⚡ 60+ FPS Liquid Cursor Follower
- Powered directly through native `gsap.ticker` rendering loops rather than standard React state ticks, eliminating component re-render overhead.
- Features elastic stretching, velocity scaling, magnetic snaps on interactive pills, and context-aware blend modes.

### 3. 📐 Spatial Coordinate Morphing (Zero-CLS Modals)
- Seamless case study transitions: clicking any project card extracts its real-time viewport bounding box via `getBoundingClientRect()`.
- The case study modal springs outward from the card's exact position and reverse-morphs back into place upon dismissal, maintaining spatial continuity even across viewport resizes.

### 4. 🔊 Sensory Audio UX (INP-Optimized)
- Tactile, subtle click and interaction audio feedback across buttons, pills, and interactive cards.
- Scheduled via `requestIdleCallback` to keep main-thread interaction latency ultra-low and safeguard **Interaction to Next Paint (INP)** scores.

### 5. 🌊 Lenis Inertial Smooth Scrolling
- Integrated smooth scrolling synchronized with GSAP ScrollTrigger updates.
- Dynamic programmatic scroll locking for full-screen modals, bio cards, and quick-access topbar links.

---

## ✦ Featured Case Studies

The portfolio features 13 commercial works across branding, packaging, key visuals, 3D mockups, and spatial environments:

| Project | Category / Discipline | Timeline |
| :--- | :--- | :---: |
| **Gori Coffee** | Packaging, Visual Identity & Branding | 2024 |
| **Chivas Tet Catalog** | Catalog Design & 3D Mockup | 2024 |
| **Axon Active New Office** | Wayfinding, Signage & Spatial Design | 2024 |
| **GLCF & iCoffee** | Social Campaign & Brand System | 2025 |
| **Suzuki Social** | Social Campaign & Key Visual Design | 2024 |
| **Panasonic ElectRI"CITY"** | Key Visual & Advertising Campaign | 2023 |
| **Lipton Tet** | Seasonal Packaging & Key Visual | 2024 |
| **Thuyen Xua Food** | Master Branding & Product Packaging | 2024 |
| **Nakivo Calendar** | Custom Print Design & Editorial Calendar | 2023 |
| **Nam Dinh Vu Concept** | Spatial Architecture & Visual Concept | 2023 |
| **Lipton Summer** | Key Visual & TVC Concept Direction | 2025 |
| **Tuong An Cooking Oil** | Social Content & Graphic Design | 2023 |
| **Santen Social** | Motion Graphics & Social Campaign | 2024 |

---

## ✦ Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | [React 18](https://react.dev/) | Component architecture, lazy loading & state transitions |
| **Build Tool** | [Vite 8](https://vite.dev/) | Instant HMR and optimized production bundling |
| **Animation Engine** | [GSAP 3](https://greensock.com/gsap/) + [@gsap/react](https://greensock.com/react/) | ScrollTrigger timelines, flip transforms, ticker loops |
| **Smooth Scroll** | [Lenis](https://github.com/darkroomengineering/lenis) | Fluid inertial scrolling and scroll-lock management |
| **Audio** | Custom Audio Manager | Low-latency micro-haptics with idle callback scheduling |
| **Analytics** | [@vercel/analytics](https://vercel.com/analytics), Speed Insights | Real-time Core Web Vitals tracking and visitor metrics |
| **Styling** | Vanilla CSS Modules | Zero-runtime CSS with modern variables & custom easing |

---

## ✦ Project Architecture

```text
portfolio-2026/
├── public/
│   ├── asset/                # Video covers, posters, audio soundscapes & CV
│   ├── favicon.svg           # Site favicon
│   └── robots.txt            # Search engine crawler instructions
├── src/
│   ├── assets/               # Local fonts (Install, Maroni, Pardon 4x4)
│   ├── components/
│   │   ├── about/            # Interactive stacked About deck (AboutBento)
│   │   ├── home/             # Hero banner, bento grid & contact section
│   │   │   └── hero/         # HeroTile with ScrollTrigger choreography
│   │   ├── layout/           # Mobile blocker & layout shells
│   │   ├── modals/           # Dynamic spatial morphing case study modal (BlogModal)
│   │   ├── ui/               # Fluid cursor, loading screen, close buttons
│   │   └── work/             # Responsive project showcase carousel & individual case studies
│   ├── hooks/                # useSmoothScroll (Lenis wrapper)
│   ├── utils/                # audioManager & audio utilities
│   ├── App.jsx               # Top-level state coordinator, theme & audio triggers
│   ├── main.jsx              # Application bootstrap & DOM root mount
│   └── style.css             # Typography definitions & global theme variables
├── index.html                # Entrypoint with font preloading & initial loader
├── package.json              # Project dependencies & build scripts
└── vite.config.js            # Vite configuration & React plugin
```

---

## ✦ Getting Started

### Prerequisites
Make sure you have **Node.js** (version 18 or newer) installed:
```bash
node -v
npm -v
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bee20082000/portfolio-2026.git
   cd portfolio-2026
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to explore the project with instant Hot Module Replacement (HMR).

### Build for Production

To create an optimized, minified production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## ✦ Typography & Credits

Special appreciation to the following independent type foundries and designers whose typefaces define the visual tone of this portfolio:

- **Install Rounded** & **Maroni Condensed** — Designed by [Arthur Calame](https://www.arthurcalame.com/)
- **Pardon 4x4** — Designed by [PFA Typefaces](https://pfa-typefaces.com/)
- **Dela Gothic One** — Open-source display font via [Google Fonts](https://fonts.google.com/specimen/Dela+Gothic+One)

---

<p align="center">
  <sub>© 2026 Huy Nguyen. Built with care & Google Antigravity.</sub>
</p>

