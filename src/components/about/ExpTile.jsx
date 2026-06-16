import { useState } from 'react';
import { audioManager } from '../../utils/audio';
import styles from './ExpTile.module.css';

const EXP = [
  { role: 'designer', company: 'axon active', year: '2024–now', desc: 'ux/ui design, interactive prototyping, and creative design systems.' },
  { role: 'freelance designer', company: 'lop creative', year: '2023–now', desc: 'brand systems, digital assets, and editorial print concepts.' },
  { role: 'creative junior', company: 'ddb việt nam', year: '2022–24', desc: 'creative strategy, social campaigns, and layout design.' },
  { role: 'research assistant', company: 'ipsos', year: '2021–22', desc: 'marketing research, consumer behaviour analysis, and motivation mapping.' },
  { role: 'marketing asst.', company: 'sea education', year: '2020–21', desc: 'campaign coordination, creative copywriting, and brand asset management.' },
];

export default function ExpTile() {
  const [active, setActive] = useState(0);

  const playCard = () => {
    setTimeout(() => {
      audioManager.play('/asset/audio/oxidvideos-taking-playing-card-522520.mp3', 0.4).catch(() => {});
    }, 0);
  };

  const handleSelect = (i, e) => {
    if (e) e.stopPropagation();
    if (i !== active) {
      playCard();
      setActive(i);
    }
  };

  return (
    <div className={styles['exp-container']}>
      {EXP.map((e, i) => {
        const isActive = i === active;
        return (
          <div
            key={`${e.company}-${e.role}`}
            onClick={(ev) => handleSelect(i, ev)}
            className={`swiss-grid ${styles['exp-row']} ${isActive ? styles.active : ''}`}
          >
            <div className="col-span-2 hide-mobile"></div>
            <div className="col-span-2">
              <span className={styles['exp-year']}>
                {e.year}
              </span>
            </div>
            <div className="col-span-3">
              <div className={styles['exp-role']}>
                {e.role}
              </div>
              <div className={styles['exp-company']}>
                {e.company}
              </div>
            </div>
            <div className="col-span-5">
              <div className={styles['exp-desc']}>
                {e.desc}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
