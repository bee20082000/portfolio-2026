import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ExpTile({ onSelect }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [activeTopIdx, setActiveTopIdx] = useState(0);

  const containerRef = useRef(null);
  const tileRef = useRef(null);
  const prevExpandedRef = useRef(null);

  // Persistent click sound effect ref
  const audioRef = useRef(new Audio('/asset/audio/nock.mp3'));

  // Persistent subtle hover sound effect ref
  const hoverAudioRef = useRef(new Audio('/asset/audio/command-press.mp3'));

  // Curated premium pastel color palette (highly readable, high-contrast text pairs)
  const expData = [
    {
      r: 'Designer',
      c: 'Axon Active',
      y: '2024–now',
      bg: '#e8dbfd', // Lavender Mist
      fg: '#4f2b93',
      details: [
        'Drive end-to-end visual design across diverse digital media, ensuring pixel-perfect execution aligned with corporate branding.',
        'Produce multimedia assets—including motion graphics, video, and photography—to elevate the brand narrative and user engagement.',
        'Manage and optimize internal design systems and asset databases to streamline cross-functional workflows.'
      ]
    },
    {
      r: 'Freelance Designer',
      c: 'Lop Creative & Independent',
      y: '2023',
      bg: '#dcedfe', // Sky Blue
      fg: '#124385',
      details: [
        'Engineered visual identities and responsive marketing collateral across digital channels for independent clients.',
        'Translated creative briefs into high-fidelity design systems and engaging social media campaigns.',
        'Directed multimedia production, encompassing short-form video and motion graphics to boost user acquisition.'
      ]
    },
    {
      r: 'Creative Junior',
      c: 'DDB Việt Nam',
      y: '2022–24',
      bg: '#d2f4e8', // Minty Teal
      fg: '#0f5945',
      details: [
        'Steered website projects from initial UX/UI wireframing and user flow brainstorming through to final deployment.',
        'Translated complex client briefs into compelling, user-centric creative concepts and digital campaigns.',
        'Leveraged consumer insights and market research to pivot creative directions, driving measurable brand awareness.'
      ]
    },
    {
      r: 'Research Assistant',
      c: 'Ipsos',
      y: '2021–22',
      bg: '#ffe3d1', // Peach Sorbet
      fg: '#823b12',
      details: [
        'Synthesized quantitative and qualitative user data to uncover actionable insights for client briefs.',
        'Collaborated with senior stakeholders to build accurate research methodologies and define target user demographics.',
        'Supervised internal data processes to ensure the integrity and quality of deliverables handed off to management.'
      ]
    },
    {
      r: 'Marketing Assistant',
      c: 'SEA Education',
      y: '2020–21',
      bg: '#fcd9e8', // Rose Pink
      fg: '#7c1f4e',
      details: [
        'Analyzed client briefs alongside overseas teams to map out and build user-friendly informational websites.',
        'Performed market research to identify target user behaviors and competitor positioning, informing subsequent digital strategies.',
        'Orchestrated digital communication timelines and curated content for social touchpoints to maximize user acquisition.'
      ]
    }
  ];

  const playClickSound = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0; // Reset play pointer to beginning for rapid clicks
      audio.volume = 0.4;    // Comfortable listening volume
      audio.play().catch(err => console.log('Audio playback blocked or failed:', err));
    }
  };

  const playHoverSound = () => {
    const audio = hoverAudioRef.current;
    if (audio) {
      audio.currentTime = 0; // Reset play pointer to beginning for fast hovers
      audio.volume = 0.15;   // Very subtle volume
      audio.play().catch(() => { });
    }
  };

  const handleCardClick = (idx, e) => {
    e.stopPropagation();
    playClickSound();
    setActiveTopIdx(idx);
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  // High-performance GSAP rendering hook
  useGSAP(() => {
    if (!containerRef.current) return;

    // Detect if we are closing (transitioning expandedIdx from a number to null)
    const isClosing = prevExpandedRef.current !== null && expandedIdx === null;
    prevExpandedRef.current = expandedIdx;

    if (isClosing && tileRef.current) {
      gsap.killTweensOf(tileRef.current);
      // Signature ClockTile jelly-like rubber snap back growing down
      gsap.fromTo(tileRef.current,
        { scaleY: 0.93, scaleX: 0.98, transformOrigin: 'top center' },
        {
          scaleY: 1,
          scaleX: 1,
          duration: 0.45,
          ease: 'back.out(1.7)',
          overwrite: 'auto'
        }
      );
    }

    // 1. Smoothly animate the container height limits to fit expansion fanning snugly
    gsap.to(containerRef.current, {
      maxHeight: expandedIdx !== null ? 480 : 216,
      duration: 0.4,
      ease: 'back.out(0.8)',
      overwrite: 'auto'
    });

    // 2. Animate each card's stacking layout, scale, and details height using GSAP's physical engine
    expData.forEach((_, i) => {
      const isHovered = hoveredIdx === i;
      const isExpanded = expandedIdx === i;
      const focusedIdx = expandedIdx !== null ? expandedIdx : (hoveredIdx !== null ? hoveredIdx : activeTopIdx);

      const fannedY = -i * 56;
      const stackedScale = 1 - (Math.abs(i - focusedIdx) * 0.03);

      let translateY = fannedY;
      let scale = stackedScale;

      // Scale calculations
      if (expandedIdx !== null) {
        if (isExpanded) {
          scale = 1.02; // Pop slightly when open
        } else {
          scale = hoveredIdx === i ? stackedScale * 1.02 : stackedScale;
        }
      } else {
        if (hoveredIdx === null) {
          scale = stackedScale;
        } else if (isHovered) {
          scale = 1.04; // Gentle zoom on hover
        } else {
          scale = stackedScale * 0.98;
        }
      }

      // Tween the accordion details section height
      const detailsEl = containerRef.current.querySelector(`.details-${i}`);
      if (detailsEl) {
        gsap.to(detailsEl, {
          height: isExpanded ? 'auto' : 0,
          duration: 0.4,
          ease: 'back.out(0.8)',
          overwrite: 'auto'
        });
      }

      // Tween the card translations and scale with high-performance back.out
      const cardEl = containerRef.current.querySelector(`.card-${i}`);
      if (cardEl) {
        gsap.to(cardEl, {
          y: translateY,
          scale: scale,
          duration: 0.4,
          ease: 'back.out(0.8)',
          overwrite: 'auto',
          force3D: true,        // Forces crisp GPU layering
          roundProps: 'y'       // Prevents sub-pixel text blurring on settlement
        });
      }
    });
  }, [expandedIdx, hoveredIdx, activeTopIdx]);

  return (
    <div
      ref={tileRef}
      className="tile tile-exp r3"
      id="exp"
      data-i="4"
      onMouseLeave={() => {
        setHoveredIdx(null);
        setExpandedIdx(null);
      }}
    >
      <div className="inner" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="lbl" style={{ marginBottom: '16px' }}>work experience</div>

        <div
          ref={containerRef}
          className="exp-list-fixed"
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            paddingBottom: '12px',
            position: 'relative',
            maxHeight: '216px', // Fallback starting height
            overflow: 'visible'
          }}
        >
          {expData.map((e, i) => {
            const isHovered = hoveredIdx === i;
            const isExpanded = expandedIdx === i;
            const focusedIdx = expandedIdx !== null ? expandedIdx : (hoveredIdx !== null ? hoveredIdx : activeTopIdx);

            let zIndex = 50 - i * 10;

            // High-performance depth stacking
            if (expandedIdx !== null) {
              if (isExpanded) {
                zIndex = 100;
              } else if (hoveredIdx !== null) {
                if (isHovered) {
                  zIndex = 90;
                } else {
                  zIndex = 50 - Math.abs(i - hoveredIdx) * 10;
                }
              } else {
                zIndex = 50 - Math.abs(i - expandedIdx) * 10;
              }
            } else {
              if (hoveredIdx !== null) {
                zIndex = 50 - Math.abs(i - hoveredIdx) * 10;
              } else {
                zIndex = 50 - Math.abs(i - activeTopIdx) * 10;
              }
            }

            return (
              <div
                className={`exp-card-item card-${i}`}
                key={i}
                onMouseEnter={() => {
                  setHoveredIdx(i);
                  setActiveTopIdx(i);
                  playHoverSound();
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={(event) => handleCardClick(i, event)}
                style={{
                  backgroundColor: e.bg, // Sophisticated pastel background
                  color: e.fg,           // Deep matching contrast text color
                  border: '1px solid ' + e.fg, // Thin matching solid color border
                  padding: '16px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  cursor: 'pointer',
                  position: 'relative',
                  marginTop: i === 0 ? '0px' : '12px',
                  zIndex: zIndex,
                  flexShrink: 0,
                  width: '100%',
                  // ADD THESE PROPERTIES TO FIX THE BLUR:
                  willChange: 'transform',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'subpixel-antialiased',

                  // Height configurations
                  minHeight: '76px',
                  height: isExpanded ? 'auto' : '76px',
                  boxSizing: 'border-box',
                  opacity: 1,

                  // Transform and height are fully animated and overwritten smoothly by GSAP
                  boxShadow: 'none',
                  overflow: 'hidden'
                }}
              >
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '44px' }}>
                  <div className="exp-body" style={{ flex: 1, minWidth: 0 }}>
                    <div className="exp-role" style={{ color: 'inherit', fontWeight: 700, fontSize: '15px', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.r}</div>
                    <div className="exp-co" style={{ color: 'inherit', fontSize: '12.5px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.c}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    <span className="exp-yr" style={{ color: 'inherit', fontSize: '11.5px', fontWeight: 700 }}>{e.y}</span>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '300',
                      lineHeight: 1,
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'
                    }}>
                      +
                    </span>
                  </div>
                </div>

                {/* Expandable Details Area (GSAP Animated Height) */}
                <div
                  className={`details-${i}`}
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    height: isExpanded ? 'auto' : 0
                  }}
                >
                  <div style={{ minHeight: 0 }}>
                    <ul style={{
                      margin: '12px 0 0 0',
                      paddingLeft: '20px',
                      fontSize: '13px',
                      lineHeight: '1.5',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      fontWeight: 600,
                      paddingBottom: '4px'
                    }}>
                      {e.details.map((detail, idx) => (
                        <li key={idx} style={{ color: 'inherit' }}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
