import { useState } from "react";
import { gsap } from "gsap";

const BIO_PHOTOS = [
  '/asset/images/Bio/old/1.JPG',
  '/asset/images/Bio/old/2.JPG',
  '/asset/images/Bio/old/3.JPG',
  '/asset/images/Bio/old/4.JPG',
];

export default function BioModalContent() {
  const [bioPhotoIdx, setBioPhotoIdx] = useState(0);

  const handleBioPhotoClick = () => {
    setBioPhotoIdx(prev => (prev + 1) % BIO_PHOTOS.length);
  };

  return (
    <>
      <style>{`
        /* ── SWISS PRINT EDITORIAL CANVAS ── */
        .asymmetric-canvas {
          position: relative;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          column-gap: 36px;
          row-gap: 160px; /* Generous, premium editorial whitespace */
          width: 100%;
          font-family: var(--font-family);
          color: #000;
        }

        .canvas-row {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          column-gap: 36px;
          row-gap: 80px;
          align-items: start;
          position: relative;
        }

        .block-justified {
          font-size: clamp(16px, 1.8vw, 24px) !important;
          letter-spacing: -0.02em !important;
          line-height: 1.1 !important;
          text-transform: none !important;
          text-align: justify;
          hyphens: auto;
          font-weight: 700;
          color: #FFF;
          will-change: transform;
          position: relative;
          z-index: 5;
        }

        /* Technical crop/registration marks */
        .registration-mark {
          position: absolute;
          font-family: system-ui, sans-serif;
          font-size: 24px;
          font-weight: 100;
          color: rgba(255, 255, 255, 0.2);
          user-select: none;
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .asymmetric-canvas {
            row-gap: 80px;
          }
          .canvas-row {
            grid-template-columns: 1fr;
            row-gap: 40px;
          }
          .block-justified {
            grid-column: 1 / -1 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            text-align: justify;
          }
        }

        .hero-essay-photo {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 2 / 3;
          border-radius: 8px;
          overflow: hidden;
          will-change: transform;
          z-index: 1;
          opacity: 0.65;
          transition: opacity 0.3s ease;
        }

        .hero-essay-photo:hover {
          opacity: 0.95;
        }

        .hero-essay-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .essay-row {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          column-gap: 36px;
          align-items: center;
          position: relative;
        }
      `}</style>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1,
          pointerEvents: 'auto',
          padding: '0 5% 120px 5%',
        }}
      >
        <article style={{ width: '100%', position: 'relative' }}>
          <div style={{ padding: '160px 4% 200px 4%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>

            <div className="asymmetric-canvas">

              {/* THE SCATTERED PARALLAXING NARRATIVE BLOCKS */}

              {/* Heading Block */}
              <div className="scatter-letter block-justified" data-depth="0.04" style={{ gridColumn: '2 / 6' }}>
                my bio
              </div>

              {/* Row 1: Vietnam Origins & Photo 1 */}
              <div className="essay-row" style={{ marginTop: '130px' }}>

                <div className="scatter-letter block-justified" data-depth="0.10" style={{ gridColumn: '4 / 10' }}>
                  I was born and raised in Vietnam — a country where coffee is great, traffic is wild, and your relatives apparently need to know your salary, love life and future profession before they even ask how are you. Maybe that explains why I became interested in people in the first place: how they think, what they perceive, how they make decisions, and why certain things just feel emotionally right or painfully wrong.
                </div>
                <div
                  className="scatter-letter hero-essay-photo clickable"
                  data-depth="0.22"
                  style={{
                    gridColumn: '7 / 12',
                    cursor: 'none',
                    position: 'relative',
                    aspectRatio: '4 / 3',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    alignSelf: 'end',
                    zIndex: 2,
                  }}
                  onClick={handleBioPhotoClick}
                  title="click to cycle"
                  onMouseEnter={(e) => gsap.to(e.currentTarget.querySelector('img'), { scale: 1.1, duration: 1.2, ease: 'power3.out' })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 1.2, ease: 'power3.out' })}
                >
                  <img
                    src={BIO_PHOTOS[bioPhotoIdx]}
                    alt={`Bio photo ${bioPhotoIdx + 1}`}
                    draggable="false"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute', bottom: 6, right: 8,
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                    pointerEvents: 'none', userSelect: 'none',
                    fontFamily: 'monospace',
                  }}>
                    {bioPhotoIdx + 1} / {BIO_PHOTOS.length}
                  </span>
                </div>
              </div>

              {/* Row 2: Over-analyzing Superpower & Photo 2 */}
              <div className="essay-row" style={{ marginTop: '160px' }}>
                <div className="scatter-letter block-justified" data-depth="0.08" style={{ gridColumn: '2 / 8' }}>
                  Growing up, I spent an unreasonable amount of time playing games, Lego, watching cartoons and MTV music videos. What fascinated me was not just the entertainment itself, but the strange magic behind it. Why did certain ads jingle become unforgettable? Why did some music videos feel so cool for no explainable reason? Why could a game menu, soundtrack, or visual style completely pull someone into another world? I became obsessed with understanding how people create things that feel so catchy, memorable, and emotionally convincing.
                </div>
                <div className="scatter-letter hero-essay-photo" data-depth="0.24" style={{ gridColumn: '8 / 12', aspectRatio: 'auto' }}>
                  <img src="/asset/images/Bio/DSC01334.JPG" alt="Creative Mockup 2" draggable="false" loading="lazy" decoding="async" style={{ height: 'auto', objectFit: 'initial' }} />
                </div>
              </div>

              {/* Row 3: Marketing Study & Photo 3 */}
              <div className="essay-row" style={{ marginTop: '180px' }}>
                <div className="scatter-letter hero-essay-photo" data-depth="0.22" style={{ gridColumn: '2 / 5' }}>
                  <img src="/asset/images/chivas/4.jpg" alt="Creative Mockup 3" draggable="false" loading="lazy" decoding="async" />
                </div>
                <div className="scatter-letter block-justified" data-depth="0.10" style={{ gridColumn: '7 / 13' }}>
                  Then came the terrifying “choose your future” phase, I decided to study marketing at university. It sounded professional, business-like, and modern enough to confuse most Vietnamese adults in their 50s and 60s.
                </div>
              </div>

              {/* Row 4: Business Quote */}
              <div className="essay-row" style={{ marginTop: '180px' }}>
                <div className="scatter-letter block-justified" data-depth="0.22" style={{ gridColumn: '3 / 11' }}>
                  "Marketing? ...So what exactly do you do?"
                </div>
              </div>

              {/* Row 5: Flyers Concern */}
              <div className="essay-row" style={{ marginTop: '180px' }}>
                <div className="scatter-letter block-justified" data-depth="0.16" style={{ gridColumn: '7 / 13' }}>
                  There was also a concern that my future might involve standing outside supermarkets handing out flyers.
                </div>
              </div>

              {/* Row 6: University Lesson & Photo 4 */}
              <div className="essay-row" style={{ marginTop: '160px' }}>
                <div className="scatter-letter block-justified" data-depth="0.10" style={{ gridColumn: '5 / 11' }}>
                  University taught me many useful things: economics, business, creativity, communication, teamwork, and how brands influence their consumers behavior. But somehow, it also taught me another mysterious phenomenon of adult life — group projects always contain one completely invisible individual who magically appears on presentation day like a seasonal character unlock. Weird.
                </div>
                <div className="scatter-letter hero-essay-photo" data-depth="0.26" style={{ gridColumn: '10 / 13' }}>
                  <img src="/asset/images/Bio/E32140E4-A503-4EC4-85AB-96BBDA3F1B32.jpeg" alt="Creative Mockup 4" draggable="false" loading="lazy" decoding="async" />
                </div>
              </div>

              {/* Row 7: Ipsos Research & Photo 5 */}
              <div className="essay-row" style={{ marginTop: '180px' }}>
                <div className="scatter-letter block-justified" data-depth="0.10" style={{ gridColumn: '2 / 8' }}>
                  after graduating from university, I became a market researcher at Ipsos — an agency that can best be explained by spending lots of time trying to figure out the reason why millions of complete strangers make weird choices on a daily basis. I actually loved this job.
                </div>
                <div className="scatter-letter hero-essay-photo" data-depth="0.22" style={{ gridColumn: '8 / 11' }}>
                  <img src="/asset/images/Moe-Cafe/moe-2.jpg" alt="Creative Mockup 5" draggable="false" loading="lazy" decoding="async" />
                </div>
              </div>

              {/* Row 8: Consumer Motivation & Photo 6 */}
              <div className="essay-row" style={{ marginTop: '150px' }}>
                <div className="scatter-letter hero-essay-photo" data-depth="0.20" style={{ gridColumn: '2 / 5' }}>
                  <img src="/asset/images/Moe-Cafe/moe.jpg" alt="Creative Mockup 6" draggable="false" loading="lazy" decoding="async" />
                </div>
                <div className="scatter-letter block-justified" data-depth="0.06" style={{ gridColumn: '6 / 12' }}>
                  I was working on research projects for a range of brands, exploring consumer behavior, market trends, drivers of their choice and motivation, frustration, pain points, and the psychological background that influences their decision-making process.
                </div>
              </div>

              {/* Row 9: Humans Confusing */}
              <div className="essay-row" style={{ marginTop: '180px' }}>
                <div className="scatter-letter block-justified" data-depth="0.18" style={{ gridColumn: '4 / 10' }}>
                  it turns out that humans are fascinating creatures. or, at least, the reasons they make are completely confusing. some people buy things because they need them. others because their friends bought them. yet others because the package looks reliable or because, for some unknown reason, some color looked premium. human behavior is one of the most bizarre phenomena out there.
                </div>
              </div>

              {/* Row 10: Creative Side Quests & Photo 7 */}
              <div className="essay-row" style={{ marginTop: '160px' }}>
                <div className="scatter-letter hero-essay-photo" data-depth="0.22" style={{ gridColumn: '1 / 4' }}>
                  <img src="/asset/images/Moe-Cafe/photo-3.jpg" alt="Creative Mockup 7" draggable="false" loading="lazy" decoding="async" />
                </div>
                <div className="scatter-letter block-justified" data-depth="0.10" style={{ gridColumn: '7 / 13' }}>
                  at a certain point in time, though, i discovered the mild inconvenience that i quite enjoy creative tasks. not only did i continue researching, i ended up accumulating different side quests: photography, filmmaking, design, content production, websites, campaign ideas, social media presence, and random creative experiments.
                </div>
              </div>

              {/* Row 11: Try That Quote */}
              <div className="essay-row" style={{ marginTop: '180px' }}>
                <div className="scatter-letter block-justified" data-depth="0.20" style={{ gridColumn: '2 / 9' }}>
                  "yeah... let's try that."
                </div>
              </div>

              {/* Row 12: Moving to Advertising & Photo 8 */}
              <div className="essay-row" style={{ marginTop: '160px' }}>
                <div className="scatter-letter block-justified" data-depth="0.08" style={{ gridColumn: '4 / 11' }}>
                  obviously, this led to my move into advertising. a field combining brainstorming, telling stories, solving problems, changing ideas, changing ideas again, surviving deadlines, and hearing the sentence:
                </div>
                <div className="scatter-letter hero-essay-photo" data-depth="0.24" style={{ gridColumn: '10 / 13' }}>
                  <img src="/asset/images/Moe-Cafe/photo-4.jpg" alt="Creative Mockup 8" draggable="false" loading="lazy" decoding="async" />
                </div>
              </div>

              {/* Row 13: Premium Quote */}
              <div className="essay-row" style={{ marginTop: '180px' }}>
                <div className="scatter-letter block-justified" data-depth="0.24" style={{ gridColumn: '5 / 13', textAlign: 'right' }}>
                  "can we make this feel more premium?"
                </div>
              </div>

              {/* Row 14: DDB Campaigns & Photo 9 */}
              <div className="essay-row" style={{ marginTop: '150px' }}>
                <div className="scatter-letter block-justified" data-depth="0.08" style={{ gridColumn: '2 / 8' }}>
                  at DDB vietnam, i found myself working on various advertising campaigns, social media content, websites, and creative ideas and concepts for such brands as panasonic, tường an, lipton, bobby, and santen.
                </div>
                <div className="scatter-letter hero-essay-photo" data-depth="0.20" style={{ gridColumn: '8 / 11' }}>
                  <img src="/asset/images/Bio/68EF3D9A-7740-42CD-99EB-A276CDF72BC2_4_5005_c.jpeg" alt="Creative Mockup 9" draggable="false" loading="lazy" decoding="async" />
                </div>
              </div>

              {/* Row 15: Survival & Details */}
              <div className="essay-row" style={{ marginTop: '180px' }}>
                <div className="scatter-letter block-justified" data-depth="0.16" style={{ gridColumn: '6 / 12' }}>
                  sometimes, it required having a reasonable discussion on customer behavior. other times, it meant spending several hours on discussing just one sentence as the team couldn't agree. but the coolest part of advertising is creating solutions to invisible problems people encounter but do not notice. and these small details are the ones that make everything completely different.
                </div>
              </div>

              {/* Row 16: Figuring People Out */}
              <div className="essay-row" style={{ marginTop: '160px' }}>
                <div className="scatter-letter block-justified" data-depth="0.14" style={{ gridColumn: '3 / 9' }}>
                  slowly but surely, i started to realize that i really enjoy the process of figuring people out. not just how to make something look nice, but why people care, what will be memorable, what will make people stop scrolling, and why something is upsetting for no apparent reason.
                </div>
              </div>

              {/* Row 17: Brain Refuses to Shut Down */}
              <div className="essay-row" style={{ marginTop: '180px' }}>
                <div className="scatter-letter block-justified" data-depth="0.22" style={{ gridColumn: '7 / 13' }}>
                  unfortunately, this perspective accompanied me everywhere else, too. i sincerely try to relax. believe me. but somehow a coffee break leads to thinking questions about how to make a menu nicer. going out — noticing that this billboard could've been better. starting to open pinterest "just for 5 minutes" and ending with three lost hours. it seems that now, my brain refuses to shut down.
                </div>
              </div>

              {/* Row 18: Still Reading */}
              <div className="essay-row" style={{ marginTop: '200px' }}>
                <div className="scatter-letter block-justified" data-depth="0.08" style={{ gridColumn: '2 / 8' }}>
                  wait. you are still reading this? seriously? wow. respect!! recruiters might be skimming through hundreds of portfolios on a regular basis, and the fact that you got this far in my random story means a lot.
                </div>
              </div>

              {/* Row 19: Social Profile & Photo 10 */}
              <div className="essay-row" style={{ marginTop: '160px' }}>
                <div className="scatter-letter hero-essay-photo" data-depth="0.24" style={{ gridColumn: '1 / 4' }}>
                  <img src="/asset/images/axon-active/TDC/Lesonphoto-Axon-Active-2048px-7.jpg" alt="Creative Mockup 10" draggable="false" loading="lazy" decoding="async" />
                </div>
                <div className="scatter-letter block-justified" data-depth="0.12" style={{ gridColumn: '5 / 11' }}>
                  socially, i tend to be quite reserved at first. people usually think that i'm reserved and mysterious. it's partly true. there is just one problem. whenever something becomes interesting (branding, consumer behavior, internet culture, storytelling, human psychology, random observations, bad design of some restaurant, or, even worse, a specific topic nobody ever expected), something just clicks.
                </div>
              </div>

              {/* Row 20: Acc Detail Analyzer */}
              <div className="essay-row" style={{ marginTop: '160px' }}>
                <div className="scatter-letter block-justified" data-depth="0.12" style={{ gridColumn: '3 / 9' }}>
                  and suddenly, the reserved person who hasn't talked in the last hour ends up having too many ideas. the mechanism is completely unclear. including for me. if i needed to characterize myself in a brief way, i would say: quiet observer, accidental detail analyzer, a person who loves making ideas human, and somebody whose talks get out of control whenever curiosity wins.
                </div>
              </div>

              {/* Row 21: Coffee Outro */}
              <div className="essay-row" style={{ marginTop: '220px' }}>
                <div className="scatter-letter block-justified" data-depth="0.26" style={{ gridColumn: '4 / 12' }}>
                  oh. also. in case you managed to read all of this...<br />
                  you deserve a cup of coffee ☕ from me.
                </div>
              </div>

            </div>
          </div>
        </article>
      </div>
    </>
  );
}
