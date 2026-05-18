import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroTile({ onSelect }) {
  const catImg = "/asset/images/help_me_create_a_fat_202605190030.png";
  const catRef = useRef(null);

  useEffect(() => {
    // 1. Create a GSAP timeline
    const tl = gsap.timeline();

    // 2. The Slide In (Matches your original animation)
    tl.fromTo(
      catRef.current,
      {
        opacity: 1,
        y: 500
      },
      {
        y: 0,
        duration: 3,
        delay: 2, // Initial wait before jumping up
        ease: "bounce.inOut"
      }
    )
      // 3. The Slide Out (Chains automatically after the first one finishes)
      .to(
        catRef.current,
        {
          y: 500, // Slides back down
          duration: 1.5, // Faster exit
          delay: 3, // Waits exactly 3 seconds after the bounce finishes
          ease: "power3.in" // Accelerates smoothly on the way out
        }
      );

    // Cleanup timeline if the component unmounts mid-animation
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="tile tile-hero c2r2" data-i="0" onClick={() => onSelect && onSelect('hero')} style={{ cursor: 'pointer' }}>
      <div className="inner">
        <div className="hero-avail"><span className="dot-live"></span>Senior Designer</div>
        <div className="h1">Huy <em>Nguyen</em></div>
        <div className="hero-sub">A creative with a research background — transforming ideas into seamless digital experiences.</div>
        <img
          ref={catRef}
          src={catImg}
          alt="fatcat"
          width={400}
          style={{ opacity: 0, position: 'absolute', right: -90, bottom: -40, transformOrigin: 'bottom right' }}
        />
      </div>
    </div>
  )
}