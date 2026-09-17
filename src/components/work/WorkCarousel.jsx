import {
  forwardRef,
  memo,
  useRef,
  useEffect,
  useState,
} from 'react';
import { audioManager } from '../../utils/audio';
import styles from './WorkCarousel.module.css';

/* ─── ALL 13 PROJECTS (NAKIVO ENLARGED TO SPAN-7 WIDE) ────────── */
export const WORKS = [
  {
    id: 'moe',
    name: 'Gori Coffee',
    cover: '/asset/images/Moe-Cafe/cover.mp4',
    poster: '/asset/images/Moe-Cafe/cover.poster.webp',
    category: 'Packaging, Branding',
    year: '2024',
    spanClass: 'span-7',
    aspectClass: 'aspect-wide',
  },
  {
    id: 'chivas',
    name: 'Chivas Tet Catalog',
    cover: '/asset/images/chivas/chivas-cover.mp4',
    poster: '/asset/images/chivas/chivas-cover.poster.webp',
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
    poster: '/asset/images/icoffee/cover.poster.webp',
    category: 'Social Campaign, Branding',
    year: '2025',
    spanClass: 'span-6',
    aspectClass: 'aspect-standard',
  },
  {
    id: 'suzuki_social',
    name: 'Suzuki Social',
    cover: '/asset/images/suzuki/web/cover.mp4',
    poster: '/asset/images/suzuki/web/cover.poster.webp',
    category: 'Social Campaign, Key Visual',
    year: '2024',
    spanClass: 'span-6',
    aspectClass: 'aspect-standard',
  },
  {
    id: 'panasonic_tho_dien',
    name: 'Panasonic ElectRI"CITY"',
    cover: '/asset/images/Panasonic/cover.mp4',
    poster: '/asset/images/Panasonic/cover.poster.webp',
    category: 'Key Visual, Advertising',
    year: '2023',
    spanClass: 'span-8',
    aspectClass: 'aspect-wide',
  },
  {
    id: 'lipton_tet_2024',
    name: 'Lipton Tet',
    cover: '/asset/images/Lipton/tet/Mockup.webp',
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
    poster: '/asset/images/nakivo/cover.poster.webp',
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
    poster: '/asset/images/Lipton/summer/Lipton_logo_in_tropical_scene_202605232158.poster.webp',
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

/* ─── PERFORMANT MEDIA COVER (NO ZOOM, LAZY MOUNT & PLAYBACK) ─── */
const CardCoverMedia = memo(({ work }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const isVideo = work.cover.endsWith('.mp4');
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // 1. Defer video src mounting until card is near viewport (250px margin)
  useEffect(() => {
    if (!isVideo || !containerRef.current) return;
    const container = containerRef.current;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );

    loadObserver.observe(container);
    return () => loadObserver.disconnect();
  }, [isVideo]);

  // 2. Play video when visible, pause when scrolled away
  useEffect(() => {
    if (!isVideo || !shouldLoadVideo || !videoRef.current || !containerRef.current) return;
    const videoEl = videoRef.current;

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.1, rootMargin: '50px 0px' }
    );

    playObserver.observe(containerRef.current);
    return () => {
      playObserver.disconnect();
      videoEl.pause();
    };
  }, [isVideo, shouldLoadVideo]);

  return isVideo ? (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Poster thumbnail loads immediately so card is never empty */}
      <img
        src={work.poster}
        alt={work.name}
        loading="lazy"
        decoding="async"
        className={styles['cover-media']}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      />
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          src={work.cover}
          poster={work.poster}
          loop
          muted
          playsInline
          preload="metadata"
          className={styles['cover-media']}
          style={{ position: 'relative', zIndex: 2 }}
        />
      )}
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
      className={`tile-case work-card ${styles['card-item']} ${styles[work.spanClass]} ${styles[work.aspectClass]}`}
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
