import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroBlog({ onClose }) {
  const [step, setStep] = useState("intro");

  // ── New State to track if they reached the bottom ──
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const [beggingLevel, setBeggingLevel] = useState(1);
  const fillPercentage = ((beggingLevel - 1) / (10 - 1)) * 100;
  const trackColor = beggingLevel >= 6 ? '#ff4d4d' : '#ffffff';

  const introRef = useRef(null);
  const skipBtnRef = useRef(null);
  const finalRef = useRef(null);
  const bottomTextRef = useRef(null); // Ref for our scroll tripwire

  // ── 1. Intersection Observer to detect scroll to bottom ──
  useEffect(() => {
    if (step !== "intro") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // If the bottom text enters the viewport, update the state
        if (entries[0].isIntersecting) {
          setHasReachedEnd(true);
        }
      },
      { threshold: 0.5 } // Triggers when 50% of the element is visible
    );

    if (bottomTextRef.current) {
      observer.observe(bottomTextRef.current);
    }

    return () => observer.disconnect();
  }, [step]);

  // ── 2. Fade in on mount ──
  useEffect(() => {
    if (step === "intro" && introRef.current) {
      gsap.fromTo(introRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    if (step === "final-blog" && finalRef.current) {
      gsap.fromTo(finalRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [step]);

  // ── 3. Handle Button Hover Effects ──
  const handleMouseEnter = () => {
    if (!skipBtnRef.current) return;
    gsap.to(skipBtnRef.current, { scale: 1.05, duration: 0.2, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!skipBtnRef.current) return;
    gsap.to(skipBtnRef.current, { scale: 1, duration: 0.2, ease: "power2.in" });
  };

  // ── 4. Handle Skip Click Animation & Page Transition ──
  const handleSkip = () => {
    if (!skipBtnRef.current || !introRef.current) return;

    // Punchy, satisfying click effect
    gsap.to(skipBtnRef.current, {
      scale: 0.85,
      rotation: -3, // Slight tilt for character
      backgroundColor: '#22c55e', // Flash green
      color: '#ffffff',
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        // Smoothly fade out the entire intro text/page
        gsap.to(introRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            // Find the overlay scroll container and snap it back to the top
            const scrollContainer = introRef.current?.closest('.bio-modal-overlay');
            if (scrollContainer) {
              scrollContainer.scrollTop = 0;
            }
            setStep("final-blog");
          }
        });
      }
    });
  };

  const beggingTexts = [
    "Yeah, I’m Huy. <em>Senior Designer.</em> I make things look better or whatever. Nothing too dramatic.",
    "Hey, I’m Huy. I do branding, campaigns, websites, and random creative things people suddenly remember at the last minute. <em>Pretty normal stuff.</em>",
    "I’m Huy, a Senior Designer who likes good ideas, nice visuals, and asking <em>“but would people actually care?”</em> more often than necessary.",
    "Hello, I’m Huy. I work somewhere between branding, storytelling, campaigns, and digital experiences — basically helping ideas become things people might actually remember.",
    "Okay, maybe I should introduce myself properly. I’m Huy — a Senior Designer who somehow mixes research thinking, creative instincts, and design into one surprisingly useful person.",
    "Look, I’m actually pretty flexible. Branding? Campaigns? Websites? Microsites? Content? Creative problem-solving? <em>I’ve probably touched all of them at some point.</em>",
    "Respectfully, I do more than make things look nice. I think about human behavior, storytelling, emotional feel, strategy, and how to make people actually care. <em>That part matters.</em>",
    "Okay, serious for a second. I genuinely care about doing good work. I care about details, ideas, systems, and making things feel thoughtful and memorable. <em>Probably more than I should.</em>",
    "CALL ME NOW! I can design, brainstorm, solve problems, build campaigns, shape brand ideas, survive chaos, and I still not even mad after 12 ROUNDS. <em>Please understand how useful this is.</em>",
    "HELLO. IT’S HUY. <em>CALL ME NOW!</em> I can do branding, campaigns, websites, storytelling, strategy, creative thinking, random last-minute panic, and somehow still lock in under pressure. <br><em>PLEASE LET ME DRAMATICALLY PROVE HOW USEFUL I AM.</em></br>"
  ];

  const getCardClasses = () => {
    let classes = "bio-blog-article";
    if (step === "final-blog") {
      if (beggingLevel === 10) classes += " bio-card-shake bio-card-siren";
      else if (beggingLevel >= 6) classes += " bio-card-redtint";
    }
    return classes;
  };

  if (step === "intro") {
    return (
      <article
        ref={introRef}
        style={{
          width: '100%',
          position: 'relative',
          fontFamily: 'var(--font-family, sans-serif)',
          color: 'var(--text)',
          opacity: 0,
          padding: '0 0 80px 0'
        }}
      >
        {/* Fix: Switch to position: sticky so it survives inside CSS transforms safely */}
        <div style={{
          position: 'sticky',
          top: '50vh', // Halfway down the viewport
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          paddingRight: '40px',
          zIndex: 100000001,
          pointerEvents: 'none', // Prevents the invisible row from blocking clicks in the center
          marginTop: '20px',
          marginBottom: '-70px' // Pulls the underlying text container back up 
        }}>
          <button
            ref={skipBtnRef}
            onClick={handleSkip}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              pointerEvents: 'auto', // Restore clicks just for the button itself
              padding: '12px 28px',
              background: hasReachedEnd ? '#22c55e' : 'var(--text)', // Stays green when reached end
              color: hasReachedEnd ? '#ffffff' : 'var(--bg, #fff)',
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transformOrigin: 'center center',
              transform: 'translateY(-50%)', // Center it perfectly on the 50vh axis
              transform: 'translateX(40%)', // Center it perfectly on the 50vh axis

              transition: 'background-color 0.3s ease, color 0.3s ease' // Smooth color transition when state changes
            }}
          >
            {hasReachedEnd ? "Congrats! ➔" : "Skip ➔"}
          </button>
        </div>

        <div
          style={{
            padding: '80px 80px 32px 32px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <div style={{ fontSize: 'clamp(16px, 2vw, 24px)', lineHeight: '1.6' }}>
            <h2 style={{ fontSize: '2em', marginBottom: '24px' }}>About Me</h2>
            <p>Hello. I’m Huy Nguyen.</p><br></br>
            <p>I was born and raised in Vietnam — a place where coffee is strong, traffic is creative, and people somehow ask about your salary, marriage plans, and future before even learning your hobbies. Growing up here probably explains why I became strangely interested in people: how they think, what they notice, what they ignore, and why some things instantly feel right while others feel… emotionally incorrect.</p>
            <br></br><p>Back then, I didn’t know this tendency of over-observing everything would eventually become useful. I simply thought I was the kind of person who noticed unnecessary details. A weird restaurant menu? noticed. A badly designed poster? unfortunately noticed. A website button sitting 2px too far left? devastatingly noticed.</p>
            <p>Like many responsible young adults trying to figure life out, I studied Marketing at university because it sounded practical, respectable, and vaguely adult-like. I thought:</p>

            <blockquote style={{ paddingLeft: '16px', margin: '24px 0', borderLeft: '2px solid var(--text)' }}>
              “Yes. Business. Very stable. Very serious.”
            </blockquote>

            <p>University was also where I learned an important life lesson:<br />
              Group projects somehow always contain exactly one person doing everything, one person pretending to help, and one mysterious individual who disappears entirely until presentation day.</p>
            <br></br><p>After graduation, I stepped into market research at Ipsos — which, if I had to explain simply, was basically spending a lot of time trying to understand why millions of strangers make weird decisions every day.</p>
            <p>And honestly? I kind of loved it.</p>
            <br></br><p>I worked with research projects for brands across industries, digging into consumer behaviors, market trends, motivations, frustrations, and the mysterious psychology behind why people choose one thing over another.</p>
            <br></br><p>Turns out humans are fascinating. And occasionally very confusing.</p>
            <br></br><p>Some people buy things because they need them. Some buy because their friends bought them. Some buy because the packaging looked trustworthy. Some buy because a random color somehow felt “premium.”</p>
            <br></br><p>Human behavior is honestly one of the weirdest things ever.</p>
            <br></br><p>At some point, though, I realized something mildly inconvenient: I unfortunately enjoyed creative work too much.</p>
            <br></br><p>Instead of staying peacefully in one lane like a focused and disciplined adult, I somehow started collecting side quests: Photography. Filmmaking. Design. Content. Websites. Campaign ideas. Social media. Random creative experiments.</p>
            <p>Basically, if something looked interesting, my brain immediately said:</p>

            <blockquote style={{ paddingLeft: '16px', margin: '24px 0', borderLeft: '2px solid var(--text)' }}>
              “Yeah… let’s try that.”
            </blockquote>

            <p>So naturally, I moved into advertising. Which turned out to be a combination of brainstorming, storytelling, solving problems, changing ideas, changing those ideas again, surviving deadlines, and hearing the sentence:</p>

            <blockquote style={{ paddingLeft: '16px', margin: '24px 0', borderLeft: '2px solid var(--text)' }}>
              “Can we make it feel more premium?”
            </blockquote>
            <br></br>
            <p>At DDB, I found myself working across campaigns, social content, websites, creative concepts, visual storytelling, and strategy for brands like Panasonic, Tường An, Lipton, Bobby, and Santen.</p>
            <br></br><p>Some days involved serious discussions about customer behavior. Other days somehow involved entire meetings debating one headline for three hours. Creativity is strange like that.</p>
            <p>You spend days solving problems people may never consciously notice — yet somehow, those tiny details change everything.</p>
            <br></br><p>Over time, I realized I genuinely enjoy the process of figuring people out. Not just: “How do we make this look nice?” But: “Why would someone care?” “Why does this feel memorable?” “Why would someone stop scrolling?” “Why is this button emotionally upsetting?”</p>
            <br></br><p>Unfortunately, this mindset followed me into everyday life. I genuinely try to relax. I really do. But somehow, a simple coffee break becomes: “Wait… why is this menu designed like this?” Walking outside becomes: “This billboard could’ve been better.” Opening Figma “for 5 minutes” somehow becomes an entirely new design direction and three missing hours.</p>
            <br></br><p>At this point, I’ve accepted that my brain simply refuses to clock out.</p>
            <br></br><p>Wait. You’re actually still reading this? Wow. Respect!!</p>
            <br></br><p>Recruiters probably skim hundreds of portfolios every week, so the fact that you made it this far into my accidental autobiography honestly means a lot. At this point, we’re basically coworkers.</p>
            <br></br><p>Anyway. Back to the story.</p>
            <br></br><p>Socially, I tend to be quiet at first. People often assume I’m calm. Reserved. Mysterious, maybe. This is partially true. But there is one unfortunate side effect.</p>
            <br></br><p>If something becomes interesting — branding, weird consumer behavior, internet culture, storytelling, human psychology, random observations, strangely designed restaurants, or a suspiciously specific topic nobody expected — something activates. And suddenly, the quiet person who said six words in the past hour somehow has way too many thoughts.</p>
            <br></br><p>Nobody fully understands how this transformation happens. Including me.</p>
            <br></br><p>So if I had to describe myself briefly: I’m someone who quietly observes, accidentally overthinks details, enjoys making ideas feel human, and occasionally cannot stop talking once curiosity wins.</p>
            <br></br>

            {/* ── Tripwire Text ── */}
            <p
              ref={bottomTextRef}
              style={{
                transition: 'all 0.5s ease',
                color: hasReachedEnd ? '#22c55e' : 'inherit', // Turns green when they reach it
                fontWeight: hasReachedEnd ? 'bold' : 'normal'
              }}
            >
              {hasReachedEnd
                ? "Also, if you actually finished reading all of this… you definitely deserve a beer 🍻."
                : "Also, if you actually finished reading all of this… you definitely deserve a beer 🍻."}
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={finalRef}
      className={getCardClasses()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        opacity: 0,
        width: '100%',
        padding: '0 0 40px 0',
        overflow: 'hidden',
        position: 'relative',
        transition: 'background 0.3s ease, border-color 0.3s ease'
      }}
    >
      <img
        src="/asset/images/Huy.png"
        alt="Huy Nguyen"
        style={{
          height: 'auto',
          width: 'auto',
          objectFit: 'contain',
          zIndex: 2,
          display: 'block' // Prevents baseline layout alignment spacing gaps
        }}
      />

      <div style={{ padding: '0 32px', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
        <div style={{ borderBottom: '0px solid var(--border-blog-divider, rgba(0,0,0,0.08))', marginBottom: '2px' }}>
          <h2 style={{
            fontSize: 'clamp(40px, 5.5vw, 75px)',
            lineHeight: '1.05',
            margin: 0,
            fontWeight: '400',
            letterSpacing: '-0.01em',
            fontFamily: 'Instrument Serif',
            color: 'var(--text)'
          }}>
            Tired of reading, right? <br />
          </h2>
          <h2 style={{
            fontSize: 'clamp(40px, 5.5vw, 75px)',
            lineHeight: '1.05',
            margin: 0,
            fontWeight: '400',
            letterSpacing: '-0.01em',
            fontFamily: 'Instrument Serif',
            color: 'var(--text)'
          }}>
            Let me keep it short for you.
          </h2>
        </div>

        <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center' }}>
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 24px)',
              maxWidth: '85%',
              lineHeight: '1.4',
              margin: '0',
              transition: 'color 0.5s ease',
              color: beggingLevel >= 9 ? '#ff4d4d' : 'var(--text2)',
              fontWeight: '600',
              fontFamily: 'var(--font-family)'
            }}
            dangerouslySetInnerHTML={{ __html: beggingTexts[beggingLevel - 1] }}
          />
        </div>

        <div style={{
          marginTop: '32px',
          paddingTop: '32px',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          position: 'relative'
        }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text3)', fontWeight: '800', marginBottom: '10px' }}>
              <span>Just taking it easy</span>
              <span>DESPERATED CRYING</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={beggingLevel}
              onChange={(e) => setBeggingLevel(parseInt(e.target.value))}
              className={`bio-slider begging-${beggingLevel}`}
              style={{
                width: '100%',
                cursor: 'pointer',
                accentColor: beggingLevel >= 6 ? '#ff4d4d' : '#22c55e',
                '--fill-percentage': `${fillPercentage}%`,
                '--track-color': trackColor
              }}
            />

          </div>

        </div>

      </div>

    </article >

  );
}