/**
 * WorkBento — thin wrapper that preserves the HomeGrid interface contract
 * (forwardRef, same props, same displayName) while delegating all
 * rendering and animation to WorkCarousel.
 *
 * The ref exposed here gives HomeGrid access to:
 *   - ref.current.getElement() → the DOM root (for GSAP visibility/height)
 *   - ref.current.dealCards()  → trigger the Balatro card-deal animation
 *
 * Previously WorkBento contained: a vertical list, scroll-skew GSAP logic,
 * a cover-preview portal, and hover tracking. All of that lives inside
 * WorkCarousel now.
 */
import { forwardRef, memo } from 'react';
import WorkCarousel from './WorkCarousel';

const WorkBento = memo(forwardRef(({ onSelect, className, style, id, scroller }, ref) => {
  return (
    <WorkCarousel
      ref={ref}
      id={id}
      className={className}
      style={style}
      onSelect={onSelect}
    />
  );
}));

WorkBento.displayName = 'WorkBento';
export default WorkBento;
