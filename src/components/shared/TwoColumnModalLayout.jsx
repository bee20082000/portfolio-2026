import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import styles from './TwoColumnModalLayout.module.css';

export default function TwoColumnModalLayout({ data, leftContent, children }) {
  const containerRef = useRef(null);

  // GSAP animation triggers automatically when this content mounts (fixing lazy loading popping)
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Fluid, layered slide-up for left-hand project details
    tl.fromTo('.modal-animate-el',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out' }
    );

    // 2. High-end staggered slide-in for the right-hand bento grid cells (no scale to prevent video clipping lag)
    tl.fromTo('.modal-bento-item',
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out', force3D: false },
      '-=0.55' // Elegant timeline overlap
    );
  }, { scope: containerRef });

  // Process children to inject the dynamic border radius span variable and animation class
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const gridColumn = child.props.style?.gridColumn || '';
    const match = gridColumn.match(/span\s+(\d+)/);
    const span = match ? parseInt(match[1], 10) : 12;

    const newStyle = {
      ...child.props.style,
      '--item-span': span,
    };

    const existingClassName = child.props.className || '';
    const newClassName = `${existingClassName} modal-bento-item ${styles.bentoItem}`.trim();

    return React.cloneElement(child, {
      style: newStyle,
      className: newClassName,
    });
  });



  return (
    <div
      ref={containerRef}
      style={{
        margin: '0 auto',
        marginTop: '-80px',
        marginBottom: '-180px', // Counteract the padding of .blog-body
        color: '#ffffff',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '60px',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      {/* --- REAL LEFT COLUMN: STICKY PROJECT INFO --- */}
      <div style={{
        position: 'sticky',
        top: '60px',
        width: '30%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div className="modal-animate-el" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '700', margin: '0 0 4px 0', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: '1.1' }}>
            {data.title}
          </h1>
          <p style={{ fontSize: '18px', color: '#9aa0a6', margin: '10px 0 0 0', fontWeight: '400' }}>
            {data.category}
          </p>
        </div>



        {/* Custom Text Blocks */}
        <div className="modal-animate-el" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {leftContent}
        </div>
      </div>

      {/* --- RIGHT COLUMN: BENTO GRID CONTAINER --- */}
      <div className={styles.rightColumn}>
        {enhancedChildren}

        {/* Spacer to absorb the parent's bottom padding and keep the left column sticky */}
        <div style={{ gridColumn: 'span 12', height: '180px' }}></div>
      </div>
    </div>
  );
}

