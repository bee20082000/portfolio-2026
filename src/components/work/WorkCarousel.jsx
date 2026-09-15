import {
  forwardRef,
  memo,
  useRef,
  useEffect,
} from 'react';
import { audioManager } from '../../utils/audio';
import styles from './WorkCarousel.module.css';

/* ─── ALL 13 PROJECTS (NAKIVO ENLARGED TO SPAN-7 WIDE) ────────── */
export const WORKS = [
  {
    id: 'moe',
    name: 'Gori Coffee',
    cover: '/asset/images/Moe-Cafe/cover.mp4',
    category: 'Packaging, Branding',
    year: '2024',
    spanClass: 'span-7',
    aspectClass: 'aspect-wide',
  },
  {
    id: 'chivas',
    name: 'Chivas Tet Catalog',
    cover: '/asset/images/chivas/chivas-cover.mp4',
    category: 'Catalog, 3D Mockup',
    year: '2024',
    spanClass: 'span-5',
    aspectClass: 'aspect-tall',
  },
  {
    id: 'axon_active',
    name: 'Axon Active New Office',
    cover: '/asset/images/axon-active/TDC/cover.webp',
    category: 'Wayfinding & Signage',
    year: '2024',
    spanClass: 'span-12',
    aspectClass: 'aspect-hero',
  },
  {
    id: 'icoffee',
    name: 'GLCF & iCoffee',
    cover: '/asset/images/icoffee/cover.mp4',
    category: 'Social Campaign, Branding',
    year: '2025',
    spanClass: 'span-6',
    aspectClass: 'aspect-standard',
  },
  {
    id: 'suzuki_social',
    name: 'Suzuki Social',
    cover: '/asset/images/suzuki/web/cover.mp4',
    category: 'Social Campaign, Key Visual',
    year: '2024',
    spanClass: 'span-6',
    aspectClass: 'aspect-standard',
  },
  {
    id: 'panasonic_tho_dien',
    name: 'Panasonic ElectRI"CITY"',
    cover: '/asset/images/Panasonic/cover.mp4',
    category: 'Key Visual, Advertising',
    year: '2023',
    spanClass: 'span-8',
    aspectClass: 'aspect-wide',
  },
  {
    id: 'lipton_tet_2024',
    name: 'Lipton Tet',
    cover: '/asset/images/Lipton/tet/Mockup.jpg',
    category: 'Packaging, Key Visual',
    year: '2024',
    spanClass: 'span-4',
    aspectClass: 'aspect-tall',
  },
  {
    id: 'thuyen_xua_food',
    name: 'Thuyen Xua Food',
    cover: '/asset/images/Thuyen-xua/cover-1.webp',
    category: 'Branding, Packaging',
    year: '2024',
    spanClass: 'span-12',
    aspectClass: 'aspect-hero',
  },
  {
    id: 'nakivo',
    name: 'Nakivo Calendar',
    cover: '/asset/images/nakivo/cover.mp4',
    category: 'Calendar Design, Print',
    year: '2023',
    spanClass: 'span-7', // Made bigger as requested
    aspectClass: 'aspect-wide',
  },
  {
    id: 'nam_dinh_vu',
    name: 'Nam Dinh Vu Concept',
    cover: '/asset/images/Nam-Dinh-Vu/Cong/JPEG/Cong.webp',
    category: 'Visual Concept, Spatial',
    year: '2023',
    spanClass: 'span-5',
    aspectClass: 'aspect-wide',
  },
  {
    id: 'lipton',
    name: 'Lipton Summer',
    cover: '/asset/images/Lipton/summer/Lipton_logo_in_tropical_scene_202605232158.mp4',
    category: 'Key Visual, TVC Concept',
    year: '2025',
    spanClass: 'span-6',
    aspectClass: 'aspect-standard',
  },
  {
    id: 'tuongan',
    name: 'Tuong An Cooking Oil',
    cover: '/asset/images/Tuong-an/tuong-an-cover.webp',
    category: 'Social Content, Graphic Design',
    year: '2023',
    spanClass: 'span-6',
    aspectClass: 'aspect-standard',
  },
  {
    id: 'santen',
    name: 'Santen Social',
    cover: '/asset/images/santen/cover.webp',
    category: 'Social Campaign, Motion',
    year: '2024',
    spanClass: 'span-12',
    aspectClass: 'aspect-hero',
  },
];

/* ─── PERFORMANT MEDIA COVER (NO ZOOM, LAZY PLAYBACK) ────────── */
const CardCoverMedia = memo(({ work }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const isVideo = work.cover.endsWith('.mp4');

  useEffect(() => {
    if (!isVideo || !videoRef.current || !containerRef.current) return;

    const videoEl = videoRef.current;
    let isIntersecting = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.05, rootMargin: '100px 0px' }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      videoEl.pause();
    };
  }, [isVideo]);

  return isVideo ? (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <video
        ref={videoRef}
        src={work.cover}
        loop
        muted
        playsInline
        preload="metadata"
        className={styles['cover-media']}
      />
    </div>
  ) : (
    <img
      src={work.cover}
      alt={work.name}
      loading="lazy"
      decoding="async"
      width="1200"
      height="800"
      className={styles['cover-media']}
    />
  );
});

CardCoverMedia.displayName = 'CardCoverMedia';

/* ─── INDIVIDUAL WORK CARD (HOVER: JUST BIG MIDDLE TITLE) ───── */
const WorkGridCard = memo(({ work, onClick }) => {
  return (
    <div
      className={`work-card ${styles['card-item']} ${styles[work.spanClass]} ${styles[work.aspectClass]}`}
      onClick={() => onClick(work.id)}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${work.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(work.id);
        }
      }}
    >
      {/* Big Media Cover */}
      <div className={styles['media-wrap']}>
        <CardCoverMedia work={work} />
      </div>

      {/* Hover Overlay: Just a big middle title */}
      <div className={styles['card-overlay']}>
        <h3 className={styles['card-title']}>{work.name}</h3>
      </div>
    </div>
  );
});

WorkGridCard.displayName = 'WorkGridCard';

/* ─── MAIN WORK GRID COMPONENT (SCROLLING DOWN) ────────────── */
const WorkCarousel = forwardRef(({ onSelect, className, style, id }, ref) => {
  const containerRef = useRef(null);

  const handleCardClick = (workId) => {
    try {
      audioManager
        .play('/asset/audio/denielcz-immersivecontrol-button-click-sound-463065.mp3', 0.4)
        .catch(() => {});
    } catch (err) {}
    onSelect(workId);
  };

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      id={id}
      className={`${styles['grid-wrapper']} ${className || ''}`}
      style={style}
    >
      {/* Asymmetrical 12-Column Grid */}
      <div className={styles['work-grid']}>
        {WORKS.map((work) => (
          <WorkGridCard
            key={work.id}
            work={work}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
});

WorkCarousel.displayName = 'WorkCarousel';
export default WorkCarousel;
