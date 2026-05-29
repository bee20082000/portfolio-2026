import styles from "./SkillsBlog.module.css";
import { useState, useEffect } from 'react'

export default function SkillsBlog({ data }) {
  const [warnings, setWarnings] = useState([])
  const [alertCount, setAlertCount] = useState(0)

  const triggerWarning = () => {
    const alerts = [
      "SYSTEM FAILURE: perfectionism detected. Terminating chill vibes.",
      "CRITICAL: Kerning is off by 0.02px. Visual alignment police dispatched.",
      "WARNING: Zoomed to 5000%. Your pixel grid is screaming for help.",
      "INTERCEPTED: 'Can you make it pop?' request safely sent to recycle bin.",
      "MEMORY LEAK: 4,800 fonts active. Your system processor is currently weeping.",
      "COFFEE ERROR 404: Caffeine level empty. Creative velocity reduced by 98%.",
      "ANXIETY ENGAGED: Are you sure that alignment is center-mathematical?"
    ];
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    setWarnings(prev => [...prev, { id: Date.now(), msg: randomAlert }]);
    setAlertCount(c => c + 1)
  }

  const removeWarning = (id) => {
    setWarnings(prev => prev.filter(w => w.id !== id))
  }

  return (
    <div className={styles['meme-skills-container']}>
      
      {/* Toast Warning Stack */}
      <div className={styles['fake-alert-stack']}>
        {warnings.map(w => (
          <div className={styles['fake-alert-toast']} key={w.id} onClick={() => removeWarning(w.id)}>
            <div className={styles['alert-toast-header']}>
              <span>⚠️ DIAGNOSTIC ALARM</span>
              <span className={styles['toast-dismiss']}>×</span>
            </div>
            <p className={styles['alert-toast-body']}>{w.msg}</p>
          </div>
        ))}
      </div>

      {/* SECTION 1: HERO */}
      <section className={`blog-slide ${styles['meme-hero-redesign']}`} onClick={triggerWarning}>
        <div className={styles['meme-hero-text']}>
          <span className={styles['meme-label-light']}>OPERATIONAL PROFILE // SKILLS</span>
          <h1 className={styles['meme-title-huge']}>Unfortunately…<br />I’m actually good at this.</h1>
          <p className={styles['meme-subtitle-thin']}>Designer. Idea machine. Professional ‘move-it-2px-left’ specialist.</p>
          
          <div className={styles['status-indicators-grid']}>
            <span className={styles['status-item']}><span className="dot dot-green"></span> Creative juice: 87%</span>
            <span className={styles['status-item']}><span className="dot dot-red"></span> Sleep schedule: corrupted</span>
            <span className={styles['status-item']}><span className="dot dot-yellow"></span> Mental stability during revisions: unstable</span>
          </div>
        </div>

        {/* Crying Cat Meme in ultra-premium B&W style */}
        <div className={styles['meme-hero-img-box']}>
          <img 
            src="/asset/images/never-think-again-v0-vwtk4ydjciag1.webp" 
            alt="Never Think Again Meme" 
            className={styles['meme-cat-img']}
          />
          <div className={styles['image-caption']}>Fig 1.1: Designer during typical stakeholder reviews</div>
        </div>
      </section>

      {/* SECTION 2: MEME SKILL CARDS */}
      <section className={`blog-slide ${styles['meme-skills-grid-section']}`}>
        <span className={styles['section-label-unserious']}>SKILLS & EXPERTISE // THE UNFILTERED TRUTH</span>
        
        <div className={styles['meme-interactive-grid']}>
          
          {/* CARD 1: VISUAL DESIGN */}
          <div className={styles['meme-flip-card']} onClick={triggerWarning}>
            <div className={`${styles['card-face']} ${styles['face-front']}`}>
              <span className={styles['card-emoji']}>🎨</span>
              <h3>Visual Design</h3>
              <p>“Can smell bad spacing from 3 kilometers away.”</p>
              
              <div className={styles['card-meme-thumb']}>
                <img src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=250&auto=format&fit=crop" alt="Suspicious Cat Face" />
              </div>
            </div>
            <div className={`${styles['card-face']} ${styles['face-back']}`}>
              <span className={styles['card-reveal-badge']}>HOVER // INTERNAL CRITIC</span>
              <h4>“Why is this button 1px off 😭”</h4>
            </div>
          </div>

          {/* CARD 2: CREATIVE IDEAS */}
          <div className={styles['meme-flip-card']} onClick={triggerWarning}>
            <div className={`${styles['card-face']} ${styles['face-front']}`}>
              <span className={styles['card-emoji']}>🧠</span>
              <h3>Creative Ideas</h3>
              <p>“Random shower thoughts become campaigns.”</p>
              
              <div className={styles['card-meme-thumb']}>
                <img src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=250&auto=format&fit=crop" alt="Galaxy Brain" />
              </div>
            </div>
            <div className={`${styles['card-face']} ${styles['face-back']}`}>
              <span className={styles['card-reveal-badge']}>HOVER // BRAIN FLUID</span>
              <h4>“Wait… this might actually cook.”</h4>
            </div>
          </div>

          {/* CARD 3: CLIENT SURVIVAL */}
          <div className={styles['meme-flip-card']} onClick={triggerWarning}>
            <div className={`${styles['card-face']} ${styles['face-front']}`}>
              <span className={styles['card-emoji']}>💀</span>
              <h3>Client Survival</h3>
              <p>“Expert in decoding:<br />‘Can you make it more premium?’”</p>
              
              <div className={styles['card-meme-thumb']}>
                <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=250&auto=format&fit=crop" alt="Confused Chalkboard Lady" />
              </div>
            </div>
            <div className={`${styles['card-face']} ${styles['face-back']}`}>
              <span className={styles['card-reveal-badge']}>HOVER // B2B ADVISORY</span>
              <h4>“what does premium even mean bro”</h4>
            </div>
          </div>

          {/* CARD 4: DEADLINE MODE */}
          <div className={styles['meme-flip-card']} onClick={triggerWarning}>
            <div className={`${styles['card-face']} ${styles['face-front']}`}>
              <span className={styles['card-emoji']}>⚡</span>
              <h3>Deadline Mode</h3>
              <p>“8 hours of work.<br />Completed in the final 24 minutes.”</p>
              
              <div className={styles['card-meme-thumb']}>
                <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=250&auto=format&fit=crop" alt="Intense focused side-eye dog" />
              </div>
            </div>
            <div className={`${styles['card-face']} ${styles['face-back']}`}>
              <span className={styles['card-reveal-badge']}>HOVER // PANIC METRICS</span>
              <h4>“Creativity peaks near danger.”</h4>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: DESIGNER STARTER PACK */}
      <section className={`blog-slide ${styles['meme-starter-pack-section']}`}>
        <span className={styles['section-label-unserious']}>DESIGNER STARTER PACK // CHAOTIC STICKERS</span>
        
        <div className={styles['sticker-pack-layout']}>
          
          <div className={styles['sticker-cloud']}>
            <span className={styles['sticker']} onClick={triggerWarning}>Ctrl + Z addict</span>
            <span className={styles['sticker']} onClick={triggerWarning}>Pinterest archaeologist</span>
            <span className={styles['sticker']} onClick={triggerWarning}>Font hoarder</span>
            <span className={styles['sticker']} onClick={triggerWarning}>Version_FINAL_v12_REAL.psd</span>
            <span className={styles['sticker']} onClick={triggerWarning}>Zoom at 5000%</span>
            <span className={styles['sticker']} onClick={triggerWarning}>Professional overthinker</span>
            <span className={styles['sticker']} onClick={triggerWarning}>“just one more revision”</span>
            <span className={styles['sticker']} onClick={triggerWarning}>Kerning police 🚨</span>
            <span className={styles['sticker']} onClick={triggerWarning}>Makes rectangles expensive™</span>
          </div>

          <div className={styles['mini-meme-gallery']}>
            <div className={styles['mini-meme-item']} onClick={triggerWarning}>
              <img src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=150&auto=format&fit=crop" alt="Shocked Pikachu Placeholder" />
              <span>Shocked Pikachu Reaction</span>
            </div>
            <div className={styles['mini-meme-item']} onClick={triggerWarning}>
              <img src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=150&auto=format&fit=crop" alt="Crying Cat Close" />
              <span>Crying Cat State</span>
            </div>
            <div className={styles['mini-meme-item']} onClick={triggerWarning}>
              <img src="https://images.unsplash.com/photo-1537151625747-7ae85efd7979?q=80&w=150&auto=format&fit=crop" alt="Side-Eye Dog" />
              <span>Side-Eye Inspector</span>
            </div>
            <div className={styles['mini-meme-item']} onClick={triggerWarning}>
              <div className={styles['mini-battery-indicator']}>
                <span className={styles['battery-low-icon']}>⚡ 2%</span>
                <span>Low Battery</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: ENDING */}
      <section className={`blog-slide ${styles['meme-composition-ending']}`}>
        <span className={styles['section-label-unserious']}>PROJECT COMPOSITION CHART</span>
        <h2 className={styles['composition-title']}>How projects are made</h2>

        <div className={styles['composition-chart-stack']}>
          {[
            { label: 'Inspiration', val: '10%', color: 'rgba(255,255,255,0.06)' },
            { label: 'Pinterest Archaeology', val: '15%', color: 'rgba(255,255,255,0.12)' },
            { label: 'Overthinking layout margins', val: '25%', color: 'rgba(255,255,255,0.18)' },
            { label: 'Pure unadulterated panic', val: '40%', color: '#ef4444' },
            { label: 'Somehow works in production', val: '10%', color: '#22c55e' }
          ].map((bar, i) => (
            <div className={styles['chart-row']} key={bar.label} onClick={triggerWarning}>
              <div className={styles['chart-row-info']}>
                <span>{bar.label}</span>
                <strong>{bar.val}</strong>
              </div>
              <div className={styles['chart-row-track']}>
                <div className={styles['chart-row-fill']} style={{ width: bar.val, background: bar.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className={styles['ending-action-box']}>
          <button className={styles['hire-exploding-btn']} onClick={triggerWarning}>
            🔥 hire me before my laptop explodes {alertCount > 0 && `(warnings active: ${alertCount})`}
          </button>
        </div>
      </section>

    </div>
  )
}
