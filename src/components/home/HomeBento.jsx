import { forwardRef, memo } from 'react';
import HeroTile from './hero/HeroTile';

const HomeBento = memo(forwardRef(({ className, style, id, activeTab, onSelect, loaded, introReady, activeCase }, ref) => {
  return (
    <div
      className={className}
      id={id}
      ref={ref}
      style={style}
    >
      <HeroTile activeTab={activeTab} onSelect={onSelect} activeCase={activeCase} bentoClassName={className} loaded={loaded} introReady={introReady} />
    </div>
  );
}));

HomeBento.displayName = 'HomeBento';

export default HomeBento;
