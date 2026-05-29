import { forwardRef } from 'react';
import HeroTile from './hero/HeroTile';

const HomeBento = forwardRef(({ className, style, id }, ref) => {
  return (
    <div
      className={className}
      id={id}
      ref={ref}
      style={style}
    >
      <HeroTile />
    </div>
  );
});

HomeBento.displayName = 'HomeBento';

export default HomeBento;
