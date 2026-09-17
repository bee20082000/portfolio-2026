import { useRef, useEffect, useState, memo } from 'react';

const ModalVideo = memo(function ModalVideo({ src, style, className }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05, rootMargin: '120px 0px' }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', ...style }} className={className}>
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          height: style?.height === '100%' ? '100%' : 'auto',
          objectFit: style?.objectFit || 'cover',
          display: 'block',
        }}
      />
    </div>
  );
});

export default ModalVideo;
