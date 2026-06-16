import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { audioManager } from '../../utils/audio';
import styles from './ContactTile.module.css';

const CONTACTS = [
  { type: 'email', value: 'huy.nguyen20800@gmail.com', href: null },
  { type: 'phone', value: '0938051535', href: null },
  { type: 'linkedin', value: 'huy nguyen', href: 'https://www.linkedin.com/in/huy-nguyen-20820/' },
];

export default function ContactTile() {
  const [toast, setToast] = useState('');
  const timeoutRef = useRef(null);

  const animClick = (el) => {
    gsap.timeline()
      .to(el, { scale: 0.98, duration: 0.07, ease: 'power2.out' })
      .to(el, { scale: 1, duration: 0.15, ease: 'back.out(2)' });
  };

  const handleCopy = (text, type, e) => {
    e.stopPropagation();
    animClick(e.currentTarget);
    audioManager.play('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3', 0.4).catch(() => {});
    navigator.clipboard.writeText(text).then(() => {
      setToast(`${type} copied`);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setToast(''), 1800);
    }).catch(() => {});
  };

  // Cancel pending toast on unmount to avoid setState on unmounted component
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <div className={styles['contact-container']}>
      {CONTACTS.map(({ type, value, href }) => {
        const isLink = !!href;
        const Tag = isLink ? 'a' : 'div';
        const extraProps = isLink ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

        return (
          <Tag
            key={type}
            {...extraProps}
            onClick={isLink
              ? (e) => {
                  audioManager.play('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3', 0.4).catch(() => {});
                  animClick(e.currentTarget);
                }
              : (e) => handleCopy(value, type, e)
            }
            className={`swiss-grid ${styles['contact-row']}`}
          >
            <div className="col-span-2 hide-mobile"></div>
            <div className="col-span-2">
              <span className={styles['contact-type']}>
                {type}
              </span>
            </div>
            <div className="col-span-5">
              <span className={styles['contact-value']}>
                {value}
              </span>
            </div>
            <div className="col-span-3 flex-end">
              <span className={styles['contact-action']}>
                {isLink ? '↗' : 'copy'}
              </span>
            </div>
          </Tag>
        );
      })}

      {/* Toast */}
      {toast && (
        <div className={styles['contact-toast']}>
          ✓ {toast}
        </div>
      )}
    </div>
  );
}

