/* ── LOCAL HCMC TICKING CLOCK ────────────────── */
function tick() {
  const n = new Date();
  const utc = n.getTime() + n.getTimezoneOffset() * 60000;
  const HCMC = new Date(utc + 7 * 3600000); // GMT +7
  const pad = x => String(x).padStart(2, '0');

  const el = document.getElementById('clock');
  if (el) {
    el.textContent = `${pad(HCMC.getHours())}:${pad(HCMC.getMinutes())}:${pad(HCMC.getSeconds())}`;
  }
}
tick();
setInterval(tick, 1000);

/* ── CLIENT-SIDE LIGHT/DARK THEME TOGGLE ──────── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = html.dataset.theme === 'dark';
    html.dataset.theme = isDark ? 'light' : 'dark';
    const lbl = document.getElementById('themeLbl');
    if (lbl) lbl.textContent = isDark ? 'light' : 'dark';
  });
}

/* ── STAGGERED GRID REVEAL INTERSECTION OBSERVER ── */
const tiles = document.querySelectorAll('.tile');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = +(e.target.dataset.i || 0) * 40;
      e.target.style.animationDelay = delay + 'ms';
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.02 });
tiles.forEach(t => io.observe(t));

/* ── BENTO SWITCHER TAB TOGGLING ─────────────── */
const btnOverview = document.getElementById('btn-overview');
const btnCases = document.getElementById('btn-cases');
const gridOverview = document.getElementById('bento-overview');
const gridCases = document.getElementById('bento-cases');

if (btnOverview && btnCases && gridOverview && gridCases) {
  btnOverview.addEventListener('click', () => switchTab('overview'));
  btnCases.addEventListener('click', () => switchTab('cases'));
}

function switchTab(tab) {
  const currentGrid = tab === 'overview' ? gridCases : gridOverview;
  const targetGrid = tab === 'overview' ? gridOverview : gridCases;
  const activeBtn = tab === 'overview' ? btnOverview : btnCases;
  const inactiveBtn = tab === 'overview' ? btnCases : btnOverview;

  if (activeBtn.classList.contains('active')) return;

  activeBtn.classList.add('active');
  inactiveBtn.classList.remove('active');

  const currentTiles = currentGrid.querySelectorAll('.tile, .tile-case');
  const targetTiles = targetGrid.querySelectorAll('.tile, .tile-case');

  // Terminate any active staggered grid tweens
  gsap.killTweensOf([currentTiles, targetTiles]);

  // Stagger out active grid tiles
  gsap.to(currentTiles, {
    opacity: 0,
    y: tab === 'overview' ? 30 : -30,
    scale: 0.95,
    duration: 0.4,
    stagger: 0.02,
    ease: 'power2.in',
    onComplete: () => {
      currentGrid.style.display = 'none';
      targetGrid.style.display = 'grid';

      if (tab === 'overview') {
        setTimeout(animateToolBars, 150);
      }

      // Stagger assemble target grid tiles
      gsap.fromTo(targetTiles, {
        opacity: 0,
        y: tab === 'overview' ? -35 : 35,
        scale: 0.94
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.03,
        ease: 'power3.out'
      });
    }
  });
}

/* ── TOOL PROGRESS BAR FILL ───────────────────── */
function animateToolBars() {
  document.querySelectorAll('.tool-bar-fill').forEach(el => {
    gsap.to(el, { width: el.dataset.w + '%', duration: 1.3, ease: 'power3.out' });
  });
}
setTimeout(animateToolBars, 850);

/* ── SMOOTH SCROLL ANCHORS ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

/* ── GSAP LIQUID CUSTOM CURSOR PHYSICS ────────── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

gsap.ticker.add(() => {
  gsap.set(cur, { x: mx, y: my });
  gsap.to(ring, { x: mx, y: my, duration: 0.24, ease: 'power2.out' });
});

/* ── GSAP 3D TILT & MOUSE MAGNETIC PHYSICS ────── */
const allTiles = document.querySelectorAll('.tile, .tile-case');
allTiles.forEach(tile => {
  tile.addEventListener('mousemove', e => {
    const rect = tile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const dx = x - xc;
    const dy = y - yc;

    // Smooth 3D rotational tilt angle calculations (max 7deg)
    const rx = -(dy / yc) * 7;
    const ry = (dx / xc) * 7;

    // Magnetic translation offset (max 8px)
    const tx = (dx / xc) * 8;
    const ty = (dy / yc) * 8;

    gsap.to(tile, {
      rotateX: rx,
      rotateY: ry,
      x: tx,
      y: ty,
      scale: 1.015,
      borderColor: 'var(--border2)',
      boxShadow: 'var(--shadow)',
      duration: 0.35,
      ease: 'power2.out'
    });
  });

  tile.addEventListener('mouseleave', () => {
    gsap.to(tile, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      scale: 1,
      borderColor: 'var(--border)',
      boxShadow: '',
      duration: 0.55,
      ease: 'power2.out'
    });
  });
});

// Magnetic pull on micro-interactive tags, links, and switcher buttons
const magnets = document.querySelectorAll('.tag, .ctact-row, .switcher-btn, .theme-btn, .nav-link');
magnets.forEach(m => {
  m.addEventListener('mousemove', e => {
    const rect = m.getBoundingClientRect();
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = e.clientX - (rect.left + xc);
    const dy = e.clientY - (rect.top + yc);

    gsap.to(m, {
      x: dx * 0.32,
      y: dy * 0.32,
      scale: 1.04,
      duration: 0.2,
      ease: 'power2.out'
    });
  });

  m.addEventListener('mouseleave', () => {
    gsap.to(m, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out'
    });
  });
});

/* ── CASE STUDY DATA DICTIONARY ───────────────── */
const casesData = {
  panasonic: {
    title: "Panasonic Smart Home",
    category: "IOT UX/UI CASE STUDY",
    client: "Panasonic Việt Nam",
    role: "UX/UI Lead & Researcher",
    timeline: "4 Months (2024)",
    services: "Context-Aware UI, Usability Labs, Design Tokens",
    subtitle: "Redefining IoT interactions. Designing an intuitive, accessible ecosystem dashboard for control and intelligence.",
    challenge: "How do we centralize control of 20+ smart home appliances without overwhelming the user? The market was saturated with complex, technical dashboards. The client needed an interface that felt human, warm, and accessible to everyone from kids to senior citizens.",
    strategy1: "We conducted 15 in-depth user interviews and observed how families interact with their homes. We discovered that users don't think about 'devices'; they think about 'modes' or 'moods' (e.g., 'Good Morning', 'Leaving Home', 'Movie Night').",
    quote: "I don't want to adjust 10 different lights. I just want the living room to feel cozy for dinner.",
    quoteSrc: "Interview Subject, Mother of two",
    strategy2: "This insight led to a 'Context-First' UI framework. Instead of a grid of individual toggles, we designed a dashboard around responsive atmosphere presets, with detailed device controls layered one tap below.",
    solutionDesc: "We established a warm glassmorphic design system to blend digital tools into the physical warmth of modern interior styling.",
    solution: "The final product was deployed across premium smart apartments. Usability testing showed a 35% reduction in device setup time and a skyrocketing user satisfaction rate of 98%.",
    metrics: [
      { val: "98%", lbl: "Satisfaction Rate" },
      { val: "-35%", lbl: "Onboarding Friction" },
      { val: "+50%", lbl: "Daily Active Use" }
    ],
    images: [
      "https://images.unsplash.com/photo-1558882224-cca166733360?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=600&auto=format&fit=crop"
    ],
    accent: "#ff5c2b"
  },
  heineken: {
    title: "Heineken Green Energy",
    category: "BRAND & DIGITAL STRATEGY",
    client: "Heineken Việt Nam",
    role: "Creative Strategy & UX Lead",
    timeline: "3 Months (2023)",
    services: "Concept Ideation, WebGL Experience Design, Copywriting",
    subtitle: "Creating awareness for Heineken's sustainable brewing initiatives through a gamified immersive web experience.",
    challenge: "How do we make environmental sustainability engaging for a young, social consumer base? Traditional corporate reports go unread. Heineken needed a high-impact, gamified campaign that felt like a social-first digital activation, encouraging active participation.",
    strategy1: "Our primary research indicated that Gen-Z and Millennials are deeply interested in sustainability, but feel disconnected from corporate jargon. We decided to gamify the ecological process, translating gigawatt-hours into relatable, high-fidelity metaphors.",
    quote: "Make it a game, make it fast, and show me the actual positive impact in a fun way.",
    quoteSrc: "Gen-Z Focus Group Participant",
    strategy2: "We designed a WebGL virtual wind-farm simulator where users cooperated to power a virtual brewery. Every successfully brewed 'green pint' contributed to Heineken's real-world carbon offset commitment.",
    solutionDesc: "A vibrant neon green interface was combined with fluid, springy physics to create a rewarding gamified loop.",
    solution: "We launched the campaign across three SEA markets, achieving 2M+ unique visitors and recording a massive 45% lift in average brand engagement time.",
    metrics: [
      { val: "+45%", lbl: "Engagement Time" },
      { val: "2.4M", lbl: "Unique Visitors" },
      { val: "+18%", lbl: "Brand Affinity Lift" }
    ],
    images: [
      "https://images.unsplash.com/photo-1571645163064-77faa9676a46?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=600&auto=format&fit=crop"
    ],
    accent: "#00b0ff"
  },
  pepsico: {
    title: "PepsiCo Supply Hub",
    category: "E-COMMERCE REVOLUTION",
    client: "PepsiCo Asia-Pacific",
    role: "Product Designer & UX Lead",
    timeline: "6 Months (2023-2024)",
    services: "B2B E-Commerce, User Journey Optimization, Design Systems",
    subtitle: "Re-imagining merchant portal interfaces for high-velocity ordering, tracking, and localized promotions.",
    challenge: "Small local merchants were struggling with legacy distributor portals, leading to manual ordering errors, missed promotions, and lost revenue. We set out to design a lightning-fast, mobile-first ordering application with smart analytics.",
    strategy1: "We spent 2 weeks shadowing local convenience store owners in Vietnam and the Philippines. We noted they operate in cramped, high-distraction environments and place orders during short breaks between servicing customers.",
    quote: "I need to order 20 crates of Pepsi in less than 30 seconds. Any delay costs me sales.",
    quoteSrc: "Store Owner, Ho Chi Minh City",
    strategy2: "Our solution was a B2B app featuring an AI-assisted smart reordering engine. It forecasts stockouts based on local weather and event patterns and allows one-tap stock refills.",
    solutionDesc: "A modular card interface, tailored for rapid vertical scrolling, allows merchants to easily toggle promotions and verify stock status.",
    solution: "The pilot program delivered spectacular commercial results: order processing velocity rose by 40%, and B2B portal conversion surged, netting a $1.2M conversion uplift.",
    metrics: [
      { val: "$1.2M", lbl: "Conversion Lift" },
      { val: "+40%", lbl: "Ordering Speed" },
      { val: "96%", lbl: "Merchant Retention" }
    ],
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop"
    ],
    accent: "#ffd166"
  }
};

/* ── GSAP HERO CARD SHIFT & EXPANSION MORPH ───── */
const caseTiles = document.querySelectorAll('.tile-case');
const blogOverlay = document.getElementById('blog-overlay');
const blogCloseBtn = document.getElementById('blog-close-btn');
let activeTile = null;

caseTiles.forEach(tile => {
  tile.addEventListener('click', () => {
    const caseName = tile.dataset.case;
    const data = casesData[caseName];
    if (!data) return;

    activeTile = tile;
    populateBlog(data);

    // 1. Capture the bounding rect coordinates of the clicked bento card
    const rect = tile.getBoundingClientRect();

    // 2. Spawn a temporary physical morph container card at those exact coordinates
    const morph = document.createElement('div');
    morph.className = 'morph-card';
    morph.style.left = rect.left + 'px';
    morph.style.top = rect.top + 'px';
    morph.style.width = rect.width + 'px';
    morph.style.height = rect.height + 'px';
    morph.style.backgroundImage = `url('${data.images[0]}')`;

    const morphOverlay = document.createElement('div');
    morphOverlay.className = 'morph-card-overlay';
    morph.appendChild(morphOverlay);
    document.body.appendChild(morph);

    // 3. Hide the original stationary grid tile
    gsap.set(tile, { visibility: 'hidden' });

    // 4. Elastic morph animation expanding into the full screen viewport limits
    gsap.to(morph, {
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      duration: 0.68,
      ease: 'expo.inOut',
      onComplete: () => {
        // Render the actual interactive blog overlay
        blogOverlay.style.visibility = 'visible';
        blogOverlay.style.pointerEvents = 'auto';

        gsap.to(blogOverlay, {
          opacity: 1,
          duration: 0.3,
          onComplete: () => {
            morph.remove(); // Dispose of morph container
          }
        });

        // Slide in Close Pill
        gsap.fromTo('#blog-close-btn', {
          opacity: 0,
          y: -24
        }, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out'
        });

        // Stagger in paragraphs, sidebars, and mockup images
        gsap.fromTo('.blog-hero-content, .blog-sidebar, .blog-section', {
          opacity: 0,
          y: 35
        }, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out'
        });
      }
    });
  });
});

/* ── METADATA BINDINGS FOR THE DUMP BLOG ──────── */
function populateBlog(data) {
  document.getElementById('blog-hero').style.backgroundImage = `url('${data.images[0]}')`;
  document.getElementById('blog-meta-category').textContent = data.category;
  document.getElementById('blog-meta-category').style.color = data.accent;
  document.getElementById('blog-meta-title').textContent = data.title;
  document.getElementById('blog-meta-subtitle').textContent = data.subtitle;

  document.getElementById('blog-meta-client').textContent = data.client;
  document.getElementById('blog-meta-role').textContent = data.role;
  document.getElementById('blog-meta-timeline').textContent = data.timeline;
  document.getElementById('blog-meta-services').textContent = data.services;

  document.getElementById('blog-content-challenge').textContent = data.challenge;
  document.getElementById('blog-content-strategy-1').textContent = data.strategy1;
  document.getElementById('blog-content-quote').innerHTML = `"${data.quote}"<span class="blog-quote-src">— ${data.quoteSrc}</span>`;
  document.getElementById('blog-content-quote').style.color = data.accent;
  document.getElementById('blog-content-quote').style.borderLeftColor = data.accent;
  document.getElementById('blog-content-strategy-2').textContent = data.strategy2;
  document.getElementById('blog-content-solution-desc').textContent = data.solutionDesc;
  document.getElementById('blog-content-solution').textContent = data.solution;

  document.getElementById('blog-img-1').style.backgroundImage = `url('${data.images[1]}')`;
  document.getElementById('blog-img-caption-1').textContent = `${data.title} UX Workflow`;
  document.getElementById('blog-img-2').style.backgroundImage = `url('${data.images[2]}')`;
  document.getElementById('blog-img-caption-2').textContent = `${data.title} Interface Iteration`;

  document.getElementById('blog-metric-1').textContent = data.metrics[0].val;
  document.getElementById('blog-metric-1').style.color = data.accent;
  document.getElementById('blog-metric-lbl-1').textContent = data.metrics[0].lbl;

  document.getElementById('blog-metric-2').textContent = data.metrics[1].val;
  document.getElementById('blog-metric-2').style.color = data.accent;
  document.getElementById('blog-metric-lbl-2').textContent = data.metrics[1].lbl;

  document.getElementById('blog-metric-3').textContent = data.metrics[2].val;
  document.getElementById('blog-metric-3').style.color = data.accent;
  document.getElementById('blog-metric-lbl-3').textContent = data.metrics[2].lbl;
}

/* ── REVERSE ELASTIC MORPH SHRINK TRANSITION ──── */
if (blogCloseBtn) {
  blogCloseBtn.addEventListener('click', () => {
    if (!activeTile) return;
    const rect = activeTile.getBoundingClientRect();
    const data = casesData[activeTile.dataset.case];

    // Fade out article components
    gsap.to(blogOverlay, {
      opacity: 0,
      duration: 0.35,
      onComplete: () => {
        blogOverlay.style.visibility = 'hidden';
        blogOverlay.style.pointerEvents = 'none';

        // Spawn a fullscreen morph card representation
        const morph = document.createElement('div');
        morph.className = 'morph-card';
        morph.style.left = '0px';
        morph.style.top = '0px';
        morph.style.width = '100vw';
        morph.style.height = '100vh';
        morph.style.borderRadius = '0px';
        morph.style.backgroundImage = `url('${data.images[0]}')`;

        const morphOverlay = document.createElement('div');
        morphOverlay.className = 'morph-card-overlay';
        morph.appendChild(morphOverlay);
        document.body.appendChild(morph);

        // Shrink that card cleanly back to the coordinate limits of its bento box
        gsap.to(morph, {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          borderRadius: '20px',
          duration: 0.58,
          ease: 'expo.out',
          onComplete: () => {
            morph.remove(); // Dispose
            gsap.set(activeTile, { visibility: 'visible' }); // Re-reveal bento card
            activeTile = null;
          }
        });
      }
    });
  });
}
