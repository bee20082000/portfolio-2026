import styles from './ProfileTile.module.css';

export default function ProfileTile() {
  return (
    <>
      <div className="swiss-grid" style={{ marginBottom: '6vw' }}>
        <div className="col-span-2 hide-mobile"></div>
        <div className="col-span-5">
          <div className={styles['text-white']}>
            i am huy nguyen.
          </div>
        </div>
        <div className="col-span-5">
          <div className={styles['text-accent']}>
            creative designer.
          </div>
        </div>
      </div>

      <div className="swiss-grid">
        <div className="col-span-2 hide-mobile"></div>

        <div className="col-span-5">
          <div className={styles['stat-number']}>
            4+
          </div>
          <div className={styles['stat-label']}>
            years experience
          </div>
        </div>

        <div className="col-span-5">
          <div className={styles['stat-number']}>
            12+
          </div>
          <div className={styles['stat-label']}>
            projects delivered
          </div>
        </div>
      </div>
    </>
  );
}
