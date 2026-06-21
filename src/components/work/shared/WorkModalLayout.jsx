import { Children, cloneElement, isValidElement, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function WorkModalLayout({ data, customPills, children }) {
  const containerRef = useRef(null);

  const pills = customPills || [
    {
      label: data.category || data.role || 'Project',
      bg: '#A0FF81',
      color: '#000000',
    }
  ];

  const pillStyle = (bg, color) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bg,
    color,
    padding: '8px 12px',
    borderRadius: '99px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.1em',
    letterSpacing: '0em',
    zIndex: 1,
  });

  const pillStyle2 = () => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f39bffff',
    color: '#000000',
    padding: '8px 12px',
    borderRadius: '99px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.1em',
    letterSpacing: '0em',
    zIndex: 1,
  });

  const bodyTextStyle = {
    fontSize: '16px',
    color: '#ffffffff',
    margin: 0,
    fontWeight: '400',
    lineHeight: '1.2em',
    letterSpacing: '0em',
    textAlign: 'justify',
    hyphens: 'auto',
  };

  const contextText = data.challenge;
  const approachText = data.strategy1;

  // GSAP animation triggers automatically when this content mounts (fixing lazy loading popping)
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Fluid, layered slide-up for left-hand project details
    tl.fromTo('.modal-animate-el',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out' }
    );

    // 3. High-end staggered slide-in for the bento grid cells (no scale to prevent video clipping lag)
    tl.fromTo('.modal-bento-item',
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out', force3D: false },
      0.3
    );
  }, { scope: containerRef });

  // Process children to inject the dynamic border radius span variable and animation class
  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    const gridColumn = child.props.style?.gridColumn || '';
    const match = gridColumn.match(/span\s+(\d+)/);
    const span = match ? parseInt(match[1], 10) : 12;

    const newStyle = {
      ...child.props.style,
      '--item-span': span,
    };

    const existingClassName = child.props.className || '';
    const newClassName = `${existingClassName} modal-bento-item work-modal-bento-item`.trim();

    return cloneElement(child, {
      style: newStyle,
      className: newClassName,
    });
  });

  return (
    <div
      ref={containerRef}
      style={{
        margin: '0 auto',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '0 24px 40px 24px',
      }}
    >
      <style>{`
        .work-modal-grid {
          width: 100%;
          max-width: 1400px;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-flow: row dense;
          align-items: start;
          /* UNIFIED GAP: Edit this value to change the spacing between all modal photos globally */
          gap: 8px;
          margin: 0 auto;
        }

        .work-modal-header {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          column-gap: 24px;
          row-gap: 24px;
          align-items: start;
        }

        .work-modal-challenge {
          grid-column: 7 / -1;
        }

        .work-modal-title {
          grid-column: 1 / 6;
        }

        .work-modal-pills {
          grid-column: 1 / -1;
          margin-top: -1em;
          margin-bottom: 20vh
        }

        .work-modal-approach {
          grid-column: 7 / -1;
        }

        @media (max-width: 0px) {
          .work-modal-grid {
            grid-template-columns: 1fr !important;
            gap: 8px 0 !important;
            display: grid !important;
          }
          .work-modal-header {
            grid-template-columns: 1fr !important;
            row-gap: 24px !important;
          }
          .work-modal-title {
            grid-column: 1 / -1 !important;
          }
          .work-modal-challenge {
            grid-column: 1 / -1 !important;
          }
          .work-modal-pills {
            grid-column: 1 / -1 !important;
          }
          .work-modal-approach {
            grid-column: 1 / -1 !important;
          }
        }

        .work-modal-bento-item {
          overflow: hidden !important;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
        }

        /* ── Unified body text used inside the bento grid ── */
        .work-modal-body-text {
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
          line-height: 1.2;
          margin: 20px 0;
          font-weight: 400;
          letter-spacing: 0em;
          text-align: justify;
          hyphens: auto;
        }
      `}</style>

      {/* --- HEADER SECTION — 12-col grid --- */}
      <div
        className="modal-animate-el work-modal-header"
        style={{
          width: '100%',
          maxWidth: '1400px',
          marginBottom: '50px',
        }}
      >
        {/* Title */}
        <h1
          className="work-modal-title"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'nowrap',
            width: '100%',
            textAlign: 'left',
            fontFamily: "'Maroni Condensed'",
            fontSize: 'clamp(100px, 10vw, 140px)',
            fontWeight: '400',
            lineHeight: '0.9',
            letterSpacing: '0em',
            color: '#ffffff',
            textTransform: 'uppercase',
            margin: 0,
            maxWidth: '100%',
            zIndex: 1,
          }}
        >
          {data.title}
        </h1>

        {/* Year and Category Pills */}
        <div className="work-modal-pills" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {data.timeline && (
            <div style={pillStyle2()}>
              {data.timeline}
            </div>
          )}
          {pills.map((pill) => (
            <div key={pill.label} style={pillStyle(pill.bg, pill.color)}>
              {data.category || pill.label}
            </div>
          ))}
        </div>


        {/* Challenge/Context */}
        <div className="work-modal-challenge">
          <p style={bodyTextStyle}>{contextText}</p>
        </div>


        {/* Approach */}
        <div className="work-modal-approach" style={{ marginTop: '10px' }}>
          <p style={bodyTextStyle}>{approachText}</p>
        </div>
      </div>

      {/* --- GRID CONTAINER --- */}
      <div className="work-modal-grid">
        {enhancedChildren}

        {/* Spacer to absorb parent padding with generous easing room at the bottom */}
        <div style={{ gridColumn: 'span 12', height: '10px' }}></div>
      </div>
    </div>
  );
}
