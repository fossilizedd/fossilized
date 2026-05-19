"use client";

const PARTICLES = [
  { x: 7,  y: 68, size: 3, duration: 12, delay: 0   },
  { x: 14, y: 42, size: 2, duration: 9,  delay: 2.5 },
  { x: 21, y: 78, size: 4, duration: 14, delay: 5   },
  { x: 31, y: 28, size: 2, duration: 11, delay: 1   },
  { x: 38, y: 55, size: 3, duration: 8,  delay: 3.5 },
  { x: 46, y: 72, size: 2, duration: 16, delay: 7   },
  { x: 54, y: 35, size: 5, duration: 10, delay: 4   },
  { x: 61, y: 62, size: 3, duration: 13, delay: 6   },
  { x: 69, y: 48, size: 2, duration: 9,  delay: 1.5 },
  { x: 76, y: 22, size: 4, duration: 15, delay: 8   },
  { x: 82, y: 74, size: 3, duration: 11, delay: 0.5 },
  { x: 89, y: 58, size: 2, duration: 12, delay: 5.5 },
  { x: 25, y: 18, size: 3, duration: 7,  delay: 9   },
  { x: 71, y: 85, size: 2, duration: 14, delay: 3   },
  { x: 50, y: 15, size: 4, duration: 10, delay: 6.5 },
  { x: 93, y: 38, size: 2, duration: 13, delay: 2   },
];

export function AlmanacHeader() {
  return (
    <header className="almanac-header">
      <div className="almanac-bg" />
      <div className="almanac-sky" />
      <div className="almanac-atmosphere" />
      <div className="almanac-shaft-left" />
      <div className="almanac-shaft-right" />

      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="almanac-particle"
          style={{
            left: `${p.x}%`,
            bottom: `${20 + p.y * 0.55}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className="almanac-content">
        <h1 className="almanac-title">Fossilized</h1>
        <p className="almanac-subtitle">Midwest Seasonal Almanac</p>
      </div>

      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="almanac-landscape"
        aria-hidden="true"
      >
        <path
          d="M0,90 L0,62 C80,48 160,58 240,52 C320,46 400,56 480,50 C560,44 640,54 720,48 C800,42 880,52 960,46 C1040,40 1120,52 1200,46 C1280,40 1360,50 1440,44 L1440,90 Z"
          fill="#142040"
          opacity="0.65"
        />
        <path
          d="M0,90 L0,74 C100,64 200,76 320,70 C440,64 520,74 640,70 C760,66 860,76 980,72 C1100,68 1200,78 1310,74 C1360,72 1400,76 1440,74 L1440,90 Z"
          fill="#0e1e38"
          opacity="0.8"
        />
        <path
          d="M0,90 L0,82 C180,76 360,84 540,80 C720,76 900,84 1080,80 C1260,76 1380,82 1440,80 L1440,90 Z"
          fill="#0a1628"
        />
      </svg>
    </header>
  );
}
