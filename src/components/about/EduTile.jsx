import styles from './EduTile.module.css';

export default function EduTile() {
  return (
    <div className="swiss-grid">
      <div className="col-span-2 hide-mobile"></div>

      <div className="col-span-2">
        <div className={styles['edu-year']}>
          2018 — 2022
        </div>
      </div>

      <div className="col-span-4">
        <div className={styles['edu-degree']}>
          marketing degree
        </div>
      </div>

      <div className="col-span-4">
        <div className={styles['edu-school']}>
          ueh university, ho chi minh city
        </div>
      </div>
    </div>
  );
}