import { forwardRef } from 'react';

import LiptonTile from './lipton/Tile';
import AxonActiveTile from './axon_active/Tile';
import TuonganTile from './tuongan/Tile';
import ThuyenXuaFoodTile from './thuyen_xua_food/Tile';
import ChivasTile from './chivas/Tile';
import LiptonTet2024Tile from './lipton_tet_2024/Tile';
import PanasonicThoDienTile from './panasonic_tho_dien/Tile';
import MoeTile from './moe/Tile';

const WorkBento = forwardRef(({ onSelect, className, style, id }, ref) => {
  return (
    <div
      className={className}
      id={id}
      ref={ref}
      style={style}
    >
      <LiptonTet2024Tile onSelect={onSelect} index={4} />
      <LiptonTile onSelect={onSelect} index={1} />
      <ThuyenXuaFoodTile onSelect={onSelect} index={7} />
      <TuonganTile onSelect={onSelect} index={5} />

      <PanasonicThoDienTile onSelect={onSelect} index={6} />
      <ChivasTile onSelect={onSelect} index={2} />
      <MoeTile onSelect={onSelect} index={8} />
      <AxonActiveTile onSelect={onSelect} index={3} />
    </div>
  );
});

WorkBento.displayName = 'WorkBento';

export default WorkBento;
