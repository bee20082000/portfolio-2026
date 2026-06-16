import { Children, cloneElement, isValidElement, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function ModalHeaderContent({ data, customPills }) {
  const pills = customPills || [
    {
      label: data.category || data.role || 'Project',
      bg: '#A0FF81',
      color: '#000000',
    }
  ]

  const pillStyle = (bg, color) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bg,
    color,
    padding: '8px 12px',
    borderRadius: '99px',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: '1',
    letterSpacing: '0em',
    zIndex: 1,

  })

  const sectionLabelStyle = {
    fontSize: '16px',
    fontWeight: '700',
    color: '#9aa0a6',
    letterSpacing: '0em',
    marginBottom: '8px',
    textAlign: 'center',
  }

  const bodyTextStyle = {
    fontSize: '16px',
    color: '#e8eaed',
    margin: 0,
    fontWeight: '400',
    lineHeight: '1.3',
    letterSpacing: '0em',
    textAlign: 'center',
  }

  const contextText =
    data.challenge || data.context || data.description || 'Project context details...'

  const approachText = data.strategy1
    ? `${data.strategy1} ${data.strategy2 || ''} ${data.solutionDesc || ''}`.trim()
    : data.approach || data.description || 'Project approach and strategy...'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      {/* Metadata Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {pills.map((pill) => (
          <div key={pill.label} style={pillStyle(pill.bg, pill.color)}>
            {pill.label}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', width: '100%', maxWidth: '800px' }}>
        {/* Context */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={sectionLabelStyle}>Context</h3>
          <p style={bodyTextStyle}>{contextText}</p>
        </div>

        {/* Approach */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={sectionLabelStyle}>Approach</h3>
          <p style={bodyTextStyle}>{approachText}</p>
        </div>
      </div>
    </div>
  )
}

export default function WorkModalLayout({ data, customPills, children }) {
  const containerRef = useRef(null);

  // GSAP animation triggers automatically when this content mounts (fixing lazy loading popping)
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Fluid, layered slide-up for left-hand project details
    tl.fromTo('.modal-animate-el',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out' }
    );

    // 2. Fun, bouncy, blur-reveal effect for the whole year text
    // Separate the smooth fade/blur from the bouncy transforms
    tl.fromTo('.year-animate-wrap',
      { scale: 0, rotation: -25, y: 80 },
      { scale: 1, rotation: 0, y: 0, duration: 0.7, ease: 'power3.out' },
      0.15
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
          max-width: 1200px;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-flow: row dense;
          align-items: start;
          /* UNIFIED GAP: Edit this value to change the spacing between all modal photos globally */
          gap: 8px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .work-modal-grid {
            grid-template-columns: 1fr !important;
            gap: 8px 0 !important;
            display: grid !important;
          }
        }

        .work-modal-bento-item {
          overflow: hidden !important;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
        }
      `}</style>

      {/* --- CENTERED HEADER SECTION --- */}
      <div
        className="modal-animate-el"
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '56px',
        }}
      >
        {/* Title (Maroni, Big) */}
        <h1
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'nowrap',
            width: '100%',
            textAlign: 'center',
            fontFamily: "'Maroni Condensed', 'Maroni Trial', serif",
            fontSize: 'clamp(60px, 8vw, 104px)',
            fontWeight: '400',
            lineHeight: '0.9',
            letterSpacing: '0em',
            color: '#ffffff',
            textTransform: 'uppercase',
            margin: '0 0 -8px 0',
            maxWidth: '100%',
            zIndex: 1,
          }}
        >
          {data.title}

          {/* Inline Year Text */}
          <span
            className="year-overlay-text"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Nothing You Could Do', cursive",
              fontWeight: 400,
              lineHeight: 1,
              fontSize: 'clamp(64px, 12vw, 140px)',
              letterSpacing: '-0.15em',
              paddingRight: '0.15em',
              color: '#ff81cfff',
              pointerEvents: 'none',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              transform: 'rotate(-4deg) translateY(-4px)',
            }}
          >
            <span
              className="year-animate-wrap"
              style={{
                display: 'inline-block',
                transformOrigin: 'center center',
                fontFamily: "'Nothing You Could Do', cursive",
                fontWeight: 400,
                letterSpacing: 'inherit',
              }}
            >
              {data.timeline || '2024'}
            </span>
          </span>
        </h1>

        {/* Text Blocks (Pills, Context, Approach) */}
        <div style={{ width: '100%' }}>
          <ModalHeaderContent data={data} customPills={customPills} />
        </div>
      </div>

      {/* --- GRID CONTAINER --- */}
      <div className="work-modal-grid">
        {enhancedChildren}

        {/* Spacer to absorb parent padding with generous easing room at the bottom */}
        <div style={{ gridColumn: 'span 12', height: '10px' }}></div>
      </div>
    </div >
  );
}
