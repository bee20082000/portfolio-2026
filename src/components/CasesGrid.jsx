import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const casesData = {
  panasonic: {
    title: 'Panasonic Smart Home',
    category: 'IOT UX/UI Case Study',
    client: 'Panasonic Việt Nam',
    role: 'UX/UI Lead & Researcher',
    timeline: '4 Months · 2024',
    services: 'Context-Aware UI, Usability Labs, Design Tokens',
    subtitle: 'Redefining IoT interactions — designing an intuitive, accessible ecosystem dashboard for control and intelligence.',
    challenge: 'How do we centralize control of 20+ smart home appliances without overwhelming the user? The market was saturated with complex, technical dashboards. The client needed an interface that felt human, warm, and accessible to everyone from kids to seniors.',
    strategy1: 'We conducted 15 in-depth user interviews and observed how families interact with their homes. Users don\'t think about "devices"; they think about "moods" — Good Morning, Leaving Home, Movie Night.',
    quote: 'I don\'t want to adjust 10 different lights. I just want the living room to feel cozy for dinner.',
    quoteSrc: 'Interview Subject, Mother of two',
    strategy2: 'This insight led to a "Context-First" UI framework — a dashboard around atmosphere presets, with device controls layered one tap below.',
    solutionDesc: 'We established a warm glassmorphic design system blending digital tools into the physical warmth of modern interior styling.',
    solution: 'Deployed across premium smart apartments. Usability testing showed a 35% reduction in setup time and 98% user satisfaction.',
    metrics: [{val:'98%',lbl:'Satisfaction Rate'},{val:'-35%',lbl:'Setup Friction'},{val:'+50%',lbl:'Daily Active Use'}],
    images: [
      'https://images.unsplash.com/photo-1558882224-cca166733360?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=600&auto=format&fit=crop',
    ],
    accent: '#ff5c2b',
    stats: [{val:'98%',lbl:'Satisfaction'},{val:'-35%',lbl:'Setup Time'}],
  },
  heineken: {
    title: 'Heineken Green Energy',
    category: 'Brand & Digital Strategy',
    client: 'Heineken Việt Nam',
    role: 'Creative Strategy & UX Lead',
    timeline: '3 Months · 2023',
    services: 'Concept Ideation, WebGL Experience, Copywriting',
    subtitle: 'Creating awareness for Heineken\'s sustainability via a gamified immersive web experience.',
    challenge: 'How do we make environmental sustainability engaging for young consumers? Heineken needed a high-impact, gamified campaign that felt social-first.',
    strategy1: 'Gen-Z and Millennials care deeply about sustainability but feel disconnected from corporate jargon. We gamified the ecological process, translating gigawatt-hours into relatable metaphors.',
    quote: 'Make it a game, make it fast, and show me the actual positive impact in a fun way.',
    quoteSrc: 'Gen-Z Focus Group Participant',
    strategy2: 'We designed a WebGL virtual wind-farm simulator where users cooperated to power a virtual brewery — every "green pint" contributed to Heineken\'s real carbon offset commitment.',
    solutionDesc: 'A vibrant neon green interface combined with fluid, springy physics created a rewarding gamified loop.',
    solution: 'Launched across three SEA markets achieving 2M+ unique visitors and a 45% lift in average brand engagement time.',
    metrics: [{val:'+45%',lbl:'Engagement Time'},{val:'2.4M',lbl:'Unique Visitors'},{val:'+18%',lbl:'Brand Affinity'}],
    images: [
      'https://images.unsplash.com/photo-1571645163064-77faa9676a46?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=600&auto=format&fit=crop',
    ],
    accent: '#00c896',
    stats: [{val:'+45%',lbl:'Engagement'},{val:'2.4M',lbl:'Visitors'}],
  },
  tuongan: {
    title: 'Tín Hiệu Cát Tường An Khang',
    category: 'Integrated Campaign Design',
    client: 'Tường An',
    role: 'Creative Designer · Campaign Ideation & Visual Development',
    timeline: '2 Months · 2022–2023',
    services: 'Creative Campaign, Social Content, Visual Direction, Trend Activation, Tet Communication',
    subtitle: 'Turning everyday “lucky signs” into a culturally resonant social trend for a heritage brand during Tet.',
    challenge: 'For younger audiences, Tet campaigns often feel repetitive — emotionally familiar yet visually predictable. The challenge was to help a long-established household brand reconnect with Gen Z without losing its warm, family-rooted identity. We needed to transform traditional New Year wishes into something shareable, culturally relevant, and socially engaging — a concept young people would voluntarily participate in rather than passively consume.',
    strategy1: 'Tet is filled with small “signals” that people associate with luck — meaningful coincidences, lucky encounters, familiar rituals, and hopeful moments. Instead of communicating prosperity in a conventional advertising tone, we explored a more participatory behavior: What if “Cát Tường An Khang” became something people could actively spot, share, and celebrate?',
    quote: 'Good fortune doesn’t only arrive at the beginning of the year — sometimes it appears in the smallest moments around us.',
    quoteSrc: 'Campaign Philosophy',
    strategy2: 'This insight evolved into the idea of “Tín Hiệu Cát Tường An Khang” — reframing positive everyday moments into social content that invited audiences to interpret and share their own lucky signs during the New Year season. The campaign transformed traditional Tet blessings into a modern, community-driven trend. My contribution extended beyond visual execution into brainstorming campaign directions, shaping creative narratives, and translating ideas into culturally resonant design assets.',
    solutionDesc: 'The visual language balanced traditional optimism with modern social-native aesthetics. We designed a system that felt youthful & shareable (optimized for social engagement and trend participation), warm & culturally familiar (preserving Tet symbolism and emotional closeness), and flexible & scalable (adaptable across social posts, campaign assets, and digital touchpoints).',
    solution: 'As part of the creative team, I developed key visual materials and contributed to ideation that helped shape the campaign’s social-first storytelling. Responsibilities included campaign visual exploration, brainstorming engagement concepts, translating ideas into accessible narratives, and supporting a cohesive visual language. The campaign gained traction through social sharing, contributing to broader cultural conversation online.',
    impact: 'The campaign successfully reframed a traditional Tet message into a participatory social trend, helping the brand feel more relevant to younger audiences while preserving its emotional heritage. Featured media coverage on Kenh14 and youth-focused platforms helped amplify campaign visibility.',
    metrics: [
      { val: 'Gen Z', lbl: 'Resonance' },
      { val: 'Cultural', lbl: 'Relevance' },
      { val: 'Brand', lbl: 'Affinity' }
    ],
    images: [
      'https://channel.mediacdn.vn/428462621602512896/2023/1/13/photo-1-16735816419511172277640.jpg',
      'https://channel.mediacdn.vn/428462621602512896/2023/1/13/photo-1-1673581649635521785855.jpg',
    ],
    accent: '#ef4444',
    stats: [
      { val: 'Gen Z', lbl: 'Resonance' },
      { val: 'Cultural', lbl: 'Relevance' }
    ],
  },
  experience: {
    title: 'Professional Journey',
    category: 'Work Experience Details',
    client: 'DDB, Ipsos, SEA Education, UEH',
    role: 'Creative Junior & UX/UI Researcher',
    timeline: '2018 — Present',
    services: 'UX Research, Campaign Execution, Copywriting, Creative Strategy',
    subtitle: 'Bridging consumer research and digital product interface execution.',
    challenge: 'How do we design experiences that actually resonate? Early on, I realized standard designs lacked analytical grounding, and marketing research was often trapped in boring PDF spreadsheets. The mission was to combine them.',
    strategy1: 'While working at Ipsos and DDB Việt Nam, I leveraged quantitative data and user behavior observations to structure digital layouts, ensuring that every button size and user flow is backed by real human habits.',
    quote: 'Data without design is invisible. Design without data is baseless.',
    quoteSrc: 'Huy Nguyen — Creative UX/UI Philosophy',
    strategy2: 'This duality lets me approach interface layout not just as an artist, but as a strategic architect focusing on conversion, speed, and retention.',
    solutionDesc: 'From integrated campaign designs at Tường An to interactive campaigns for Heineken, I build accessible digital interfaces.',
    solution: 'Designed digital systems achieving over 98% user satisfaction rate and 40% increased layout interaction velocities.',
    metrics: [{val:'98%',lbl:'Satisfaction'},{val:'+40%',lbl:'Speed Lift'},{val:'4+',lbl:'Years Work'}],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop',
    ],
    accent: '#3b82f6',
  },
  skills: {
    title: 'Core Capabilities',
    category: 'Specialization & Methods',
    client: 'Professional Practice',
    role: 'UX Architect & Storyteller',
    timeline: 'Continuous Mastery',
    services: 'Wireframing, High-Fi Prototyping, Brand Auditing, Storytelling',
    subtitle: 'Structuring digital touchpoints based on high-end visual alignment and strategic copywriting.',
    challenge: 'Interfaces must be highly dynamic and visually responsive without looking cluttered. Symmetrical alignment and geometric type scaling are vital to maintain a premium feel.',
    strategy1: 'I enforce a single-font geographic system using Outfit or SN Pro to establish absolute typographic consistency across all layout aspects.',
    quote: 'Consistency isn\'t lack of creativity; it\'s the foundation of premium design.',
    quoteSrc: 'Visual Alignment Guidelines',
    strategy2: 'I focus on clear information architecture: grouping relevant elements into solid bento cells with zero layout friction.',
    solutionDesc: 'We develop beautiful modular design tokens that translate smoothly from Figma visual components into raw CSS/JS assets.',
    solution: 'Resulted in ultra-premium designs featuring spring physics, frictionless horizontal scrolls, and borderless contrast panels.',
    metrics: [{val:'100%',lbl:'Single Font'},{val:'0px',lbl:'Borders'},{val:'1200px',lbl:'Figma Grid'}],
    images: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
    ],
    accent: '#10b981',
  },
  tools: {
    title: 'Tool Proficiency',
    category: 'Software & Technology Stack',
    client: 'Design Ecosystem',
    role: 'Figma & Code Integration Specialist',
    timeline: 'Daily Practice',
    services: 'Figma Components, Adobe CC Suite, Balsamiq Mockups, HTML5/CSS3/ES6',
    subtitle: 'Leveraging cutting-edge tools to construct mathematically perfect design files and smooth codebases.',
    challenge: 'Too many designer mockups fail to translate perfectly to production because they rely on auto-pixel styling rather than solid dynamic tokens.',
    strategy1: 'I design all Figma screens using proportional components, grid-based layouts, and absolute auto-layout properties matching CSS Flexbox structures.',
    quote: 'Build design files like code, and build code files like design.',
    quoteSrc: 'Design to Dev Handshake Standards',
    strategy2: 'This workflow enables a zero-friction developer handshake, ensuring the live website is 100% identical to the approved static layout.',
    solutionDesc: 'Using custom properties, absolute sizing systems, and GSAP/CSS spring transition loops to animate layouts naturally.',
    solution: 'Drastically reduced designer-to-developer translation friction, achieving pixel-perfect deployment in minutes.',
    metrics: [{val:'92%',lbl:'Figma Mastery'},{val:'88%',lbl:'Adobe Suite'},{val:'65%',lbl:'Front-End Code'}],
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005198143-d366800e4889?q=80&w=600&auto=format&fit=crop',
    ],
    accent: '#a855f7',
  },
  clients: {
    title: 'Brand Collaborations',
    category: 'Corporate & Agency Partners',
    client: 'Global Brands',
    role: 'Lead Designer & Creative Partner',
    timeline: '2020 — Present',
    services: 'Strategic Copywriting, High-Fi Web Design, Digital Identity',
    subtitle: 'Partnering with global industry leaders to execute visual design and strategic solutions.',
    challenge: 'Designing across distinct industries requires a highly adaptable approach — satisfying rigid brand guidelines while injecting modern visual trends.',
    strategy1: 'I analyze brand standards down to their color values and layout grids, then structure a custom bento system highlighting their specific product focus.',
    quote: 'A brand\'s identity is defined by how perfectly it executes small details.',
    quoteSrc: 'DDB Việt Nam Campaign Guidelines',
    strategy2: 'This approach ensures brand consistency while introducing breathtaking typography, subtle glass panels, and interactive physics.',
    solutionDesc: 'From high-conversions for Panasonic to WebGL microsites for Heineken, I create gorgeous interfaces.',
    solution: 'Successfully delivered strategic digital campaigns that were highly praised by marketing directors across the SEA region.',
    metrics: [{val:'7+',lbl:'Global Brands'},{val:'100%',lbl:'Compliance'},{val:'2M+',lbl:'Campaign Reach'}],
    images: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600&auto=format&fit=crop',
    ],
    accent: '#f43f5e',
  },
}

const cases = [
  { id: 'panasonic', span: 'c2r2', img: casesData.panasonic.images[0] },
  { id: 'heineken',  span: 'c2',   img: casesData.heineken.images[0]  },
  { id: 'tuongan',   span: 'c2',   img: casesData.tuongan.images[0]   },
]

export default function CasesGrid({ onSelect, loaded }) {
  const gridRef = useRef(null)

  useGSAP(() => {
    if (!loaded) return

    const grid = gridRef.current
    if (!grid) return

    const tiles = grid.querySelectorAll('.tile')
    
    // Intersection Observer for Reveal via pure GSAP to avoid CSS forwards animation transform locks
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = (+e.target.dataset.i * 80) / 1000
          gsap.fromTo(e.target, {
            opacity: 0,
            y: 20,
            scale: 0.97
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.62,
            delay: delay,
            ease: 'power3.out',
            clearProps: 'transform'
          })
          io.unobserve(e.target)
        }
      })
    }, { threshold: .05 })
    tiles.forEach(t => io.observe(t))

    // 3D Tilt Physics (Dousanmiao Ultra-premium Spring)
    const RADIUS = 450, FORCE = 10, SCALE_UP = 1.03, SCALE_DOWN = 0.98
    const SPRING = 0.15, FRICTION = 0.78
    const state = {}
    tiles.forEach((_, i) => { state[i] = { rx: 0, ry: 0, tz: 0, sc: 1, trx: 0, try: 0, ttz: 0, tsc: 1, vrx: 0, vry: 0, vtz: 0, vsc: 0 } })

    let onGrid = false
    const enter = () => {
      if (window.innerWidth <= 768) return
      onGrid = true
    }
    const leave = () => {
      if (window.innerWidth <= 768) return
      onGrid = false
      tiles.forEach((_, i) => { state[i].trx = 0; state[i].try = 0; state[i].ttz = 0; state[i].tsc = 1 })
    }
    grid.addEventListener('mouseenter', enter)
    grid.addEventListener('mouseleave', leave)

    const move = e => {
      if (window.innerWidth <= 768 || !onGrid) return
      const gridRect = grid.getBoundingClientRect()
      const mx = e.clientX - gridRect.left
      const my = e.clientY - gridRect.top

      tiles.forEach((tile, i) => {
        const r = {
          left: tile.offsetLeft,
          top: tile.offsetTop,
          width: tile.offsetWidth,
          height: tile.offsetHeight
        }
        r.right = r.left + r.width
        r.bottom = r.top + r.height

        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = mx - cx
        const dy = my - cy
        const dist = Math.hypot(dx, dy)
        
        if (dist < RADIUS && dist > 0) {
          const inside = mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom
          if (inside) {
            const nx = (mx - r.left) / r.width - 0.5
            const ny = (my - r.top) / r.height - 0.5
            state[i].try = nx * 15; // less dramatic (was 38)
            state[i].trx = -ny * 15; // less dramatic (was 38)
            state[i].ttz = 30;       // less dramatic (was 60)
            state[i].tsc = SCALE_UP;
            gsap.set(tile, { zIndex: 20 })
          } else {
            const norm = (RADIUS - dist) / RADIUS
            const f = norm * norm * FORCE
            const a = Math.atan2(dy, dx)
            state[i].trx = Math.sin(a) * f * 1.5;
            state[i].try = -Math.cos(a) * f * 1.5;
            state[i].ttz = -norm * 20; // less dramatic (was -norm * 45)
            state[i].tsc = 1 - norm * (1 - SCALE_DOWN);
            gsap.set(tile, { zIndex: 1 })
          }
        } else {
          state[i].trx = 0; state[i].try = 0; state[i].ttz = 0; state[i].tsc = 1;
          gsap.set(tile, { zIndex: '' })
        }
      })
    }
    document.addEventListener('mousemove', move)

    const phys = () => {
      tiles.forEach((tile, i) => {
        const s = state[i]
        
        s.vrx += (s.trx - s.rx) * SPRING
        s.vry += (s.try - s.ry) * SPRING
        s.vtz += (s.ttz - s.tz) * SPRING
        s.vsc += (s.tsc - s.sc) * SPRING
        
        s.vrx *= FRICTION
        s.vry *= FRICTION
        s.vtz *= FRICTION
        s.vsc *= FRICTION
        
        s.rx += s.vrx
        s.ry += s.vry
        s.tz += s.vtz
        s.sc += s.vsc

        if (Math.abs(s.rx) > .01 || Math.abs(s.ry) > .01 || Math.abs(s.tz) > .01 || Math.abs(s.sc - 1) > .001 || Math.abs(s.vrx) > .01) {
           gsap.set(tile, { rotationX: s.rx, rotationY: s.ry, z: s.tz, scale: s.sc, transformPerspective: 1200 })
        } else {
           gsap.set(tile, { clearProps: 'transform' })
        }
      })
    }
    gsap.ticker.add(phys)

    return () => {
      grid.removeEventListener('mouseenter', enter)
      grid.removeEventListener('mouseleave', leave)
      document.removeEventListener('mousemove', move)
      gsap.ticker.remove(phys)
      io.disconnect()
    }
  }, { dependencies: [loaded], scope: gridRef })

  return (
    <div className="cases-container">
      <div className="section-divider">
        <h2 className="section-divider-text">Selected Work</h2>
        <div className="section-divider-line"></div>
        <span className="scroll-hint">↓ scroll</span>
      </div>

      <div className="bento" ref={gridRef}>
        {cases.map(({ id, span, img }, i) => {
          const d = casesData[id]
          return (
            <div
              key={id}
              className={`tile tile-case ${span}`}
              data-i={i}
              onClick={() => onSelect(id)}
            >
              <div className="case-img" style={{ backgroundImage: `url('${img}')` }}></div>
              <div className="case-grad"></div>
              <div className="case-inner">
                <div className="case-cat" style={{ color: d.accent }}>{d.category}</div>
                <div className="case-title">{d.title}</div>
                <div className="case-desc">{d.subtitle}</div>
                <div className="case-stats">
                  {d.stats.map(s => (
                    <div key={s.lbl}>
                      <span className="case-stat-val" style={{ color: d.accent }}>{s.val}</span>
                      <span className="case-stat-lbl">{s.lbl}</span>
                    </div>
                  ))}
                </div>
                <div className="case-cta">Read case study →</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
