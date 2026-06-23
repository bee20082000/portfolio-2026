import { useState, useEffect } from 'react';
import WorkModalLayout from '../shared/WorkModalLayout';

const data = {
  title: 'Axon Active New Office',
  category: 'Workspace & Architecture Design',
  client: 'Axon Active',
  timeline: '2024 - 2025',
  challenge: 'How do we shape a hybrid workplace that balances focus and collaboration in an agile environment? For Axon Active new office in Thu Duc City, the goal was to create a contemporary workspace that supports dynamic teamwork while maintaining clarity, calm, and flexibility.',
  strategy1: 'Inspired by Swiss workplace principles, the spatial approach focused on precision, adaptability, and human-centered flow. I supported the design of selected workplace experiences, helping shape collaborative zones, quiet focus areas, and flexible touchpoints that encourage seamless interaction. A restrained material palette, acoustic comfort, natural textures, and subtle biophilic elements created a calm yet efficient environment tailored to an IT-driven, agile culture.',
  accent: '#0088ff',
}

const img = (name) => `/asset/images/axon-active/${name}`;
const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
const cell = (span, extra = {}) => ({
  gridColumn: `span ${span}`,
  borderRadius: '8px',
  overflow: 'hidden',
  height: '100%',
  ...extra,
});

export default function AxonActiveModal() {
  const [trainIndex, setTrainIndex] = useState(0);
  const trainImages = [
    img('CT/train-1.jpg'),
    img('CT/train-2.jpg'),
    img('CT/train-3.jpg'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTrainIndex((prev) => (prev + 1) % trainImages.length);
    }, 500);
    return () => clearInterval(interval);
  }, [trainImages.length]);

  return (
    <WorkModalLayout data={data}>

      {/* 2nd project */}
      <div style={{
        gridColumn: '1 / -1',
        display: 'block',
        padding: '32px 4px 16px 4px',
      }}>
        <h1 className="work-modal-title" style={{
          fontFamily: "'Maroni Condensed'",
          fontSize: 'clamp(4rem, 6vw, 8rem)',
          fontWeight: '400',
          lineHeight: '0.9',
          letterSpacing: '0em',
          color: '#ffffff',
          textTransform: 'uppercase',
        }}>
          Thu Duc Office
        </h1>
      </div>


      {/* ══════════════════════════════════════════════
          HERO COVER
      ══════════════════════════════════════════════ */}
      <div style={cell(12)}>
        <img src={img('TDC/cover.jpg')} alt="Axon Active Cover" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(12)}>
        <img src={img('TDC/blueprint-1.jpg')} alt="Wayfinding Blueprint Plan" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      {/* Blueprint plan for workspace zone */}
      <div style={cell(12)}>
        <img src={img('TDC/blueprint-2.jpg')} alt="Workspace Zone Blueprint" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      {/* Row filler — completes the row so description lands on its own row below */}
      <div style={{ gridColumn: 'span 6' }} />

      {/* Wayfinding description — own row, starts at col 8, no bg, no border */}
      <div style={{
        gridColumn: '7 / -1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'justify',
        padding: '0 4px',
      }}>
        <p className="work-modal-body-text">
          Rather than relying on traditional corporate branding, we brought Swiss culture into the workplace through experiential spaces, intuitive wayfinding, and memorable destinations. At the same time, the layout supports agile software teams with flexible collaboration areas, quick meeting spots and focused work zones that adapt to different ways of working.
        </p>
      </div>


      {/* ══════════════════════════════════════════════
          SECTION 1 — SWISS TRAIN SPATIAL LANGUAGE
          Blueprint / Ref → Actual Photos
      ══════════════════════════════════════════════ */}

      {/* Blueprint + train refs side by side */}
      <div style={cell(6)}>
        <img src={img('TDC/glacier-express-3-652fe3cfc907a.avif')} alt="Glacier Express Reference" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      <div style={cell(6)}>
        <img src={img('TDC/blueprint-train.jpg')} alt="Train Layout Blueprint" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      {/* Train detail refs — interior textures */}
      <div style={cell(6)}>
        <img src={img('TDC/train-2.jpg')} alt="Train Interior Reference" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        <img src={img('TDC/train-3.jpg')} alt="Train Detail Reference" loading="lazy" decoding="async" style={imgStyle} />
      </div>


      {/* Row filler — completes the row so description lands on its own row below */}
      <div style={{ gridColumn: 'span 6' }} />

      {/* Wayfinding description — own row, starts at col 8, no bg, no border */}
      <div style={{
        gridColumn: '7 / -1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '0 4px',
      }}>
        <p className="work-modal-body-text">
          Drawing from the Glacier Express, Switzerland's most iconic rail journey, the pantry was designed as a miniature escape within the workplace.
          <br /><br />
          A train-inspired installation and panoramic alpine painting recreate the feeling of traveling through the Swiss Alps, while the expansive scenery visually extends the space, making the compact pantry feel more open, inviting, and memorable.        </p>
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 2 — WAYFINDING & SIGNAGE
          Blueprint / Ref → Actual Photo
      ══════════════════════════════════════════════ */}

      {/* Blueprint plan + hiking sign reference */}

      <div style={cell(6)}>
        <img src={img('TDC/hiking-sign-ref.jpg')} alt="Hiking Sign Reference" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      {/* → Actual result: the sign in the office */}
      <div style={cell(6)}>
        <img src={img('TDC/hiking-sign.jpg')} alt="Hiking Sign in Office" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      {/* Row filler — completes the row so description lands on its own row below */}
      <div style={{ gridColumn: 'span 6' }} />

      {/* Wayfinding description — own row, starts at col 8, no bg, no border */}
      <div style={{
        gridColumn: '7 / -1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'justify',
        padding: '0 4px',
      }}>
        <p className="work-modal-body-text">
          Drawing inspiration from Swiss alpine trail markers, we developed a workplace wayfinding system rooted in clarity, consistency, and orientation.
          <br /><br />
          The signage transforms everyday navigation into a seamless experience, helping employees move effortlessly between focus, collaboration, and social spaces.        </p>
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 3 — WORKSPACE ZONES
          Blueprint / Ref → Actual Photos
      ══════════════════════════════════════════════ */}

      {/* → Actual result: finished zones */}

      {/* → Actual result: large open workspace */}
      <div style={cell(12)}>
        <img src={img('TDC/Lesonphoto-Axon-Active-2048px-4.jpg')} alt="Office Open Space" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        <img src={img('TDC/Lesonphoto-Axon-Active-2048px-7.jpg')} alt="Office Collaboration Zone" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        <img src={img('TDC/Lesonphoto-Axon-Active-2048px-20.jpg')} alt="Office Interior Detail" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(12)}>
        <img src={img('TDC/Lesonphoto-Axon-Active-2048px-31.jpg')} alt="Workspace Zone" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(12)}>
        <img src={img('TDC/Lesonphoto-Axon-Active-2048px-39.jpg')} alt="Workspace Detail" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        <img src={img('TDC/Lesonphoto-Axon-Active-2048px-43.jpg')} alt="Office Finishing" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        <img src={img('TDC/Lesonphoto-Axon-Active-2048px-46.jpg')} alt="Completed Office" loading="lazy" decoding="async" style={imgStyle} />
      </div>

      {/* 2nd project */}
      <div style={{
        gridColumn: '1 / -1',
        display: 'block',
        padding: '32px 4px 16px 4px',
      }}>
        <h1 className="work-modal-title" style={{
          fontFamily: "'Maroni Condensed'",
          fontSize: 'clamp(4rem, 6vw, 8rem)',
          fontWeight: '400',
          lineHeight: '0.9',
          letterSpacing: '0em',
          color: '#ffffff',
          textTransform: 'uppercase',
        }}>
          Can Tho Office
        </h1>
      </div>
      <div style={cell(12)}>
        <img src={img('CT/plan-CT.jpg')} alt="Axon Active Cover" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        <img src={img('CT/plan-CT-2.jpg')} alt="Axon Active Cover" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        {trainImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Train Reference Loop ${idx + 1}`}
            style={{
              ...imgStyle,
              display: trainIndex === idx ? 'block' : 'none',
            }}
          />
        ))}
      </div>
      <div style={cell(12)}>
        <img src={img('CT/train-5.jpg')} alt="Axon Active Cover" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(12)}>
        <img src={img('CT/off-1.jpg')} alt="Axon Active Cover" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(12)}>
        <img src={img('CT/off-2.jpg')} alt="Axon Active Cover" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        <img src={img('CT/off-4.jpg')} alt="Axon Active Cover" loading="lazy" decoding="async" style={imgStyle} />
      </div>
      <div style={cell(6)}>
        <img src={img('CT/off-3.jpg')} alt="Axon Active Cover" loading="lazy" decoding="async" style={imgStyle} />
      </div>
    </WorkModalLayout >
  )
}
