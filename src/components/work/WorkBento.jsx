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
