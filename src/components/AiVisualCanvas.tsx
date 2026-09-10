import React from 'react';

export const AiVisualCanvas: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#08090f] flex items-center justify-center select-none">
      {/* Ambient background glow layers */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#9333ea]/25 via-[#3b82f6]/20 to-[#06b6d4]/15 blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute w-44 h-44 rounded-full bg-[#c084fc]/15 blur-2xl pointer-events-none"></div>

      <svg
        viewBox="0 0 500 375"
        className="w-full h-full block relative z-10"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Continuously animated AI neural energy ribbon and particle visualization"
      >
        <defs>
          {/* Neon Glow Filters */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="coreGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients */}
          <linearGradient id="ribbonGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="25%" stopColor="#9333ea" />
            <stop offset="55%" stopColor="#3b82f6" />
            <stop offset="80%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          <linearGradient id="ribbonGradSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="35%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>

          <linearGradient id="ribbonGradTertiary" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <radialGradient id="coreRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#9333ea" stopOpacity="0.6" />
            <stop offset="85%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#08090f" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="bgAmbientRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#3b82f6" stopOpacity="0.12" />
            <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#08090f" stopOpacity="0" />
          </radialGradient>

          <style>
            {`
              /* Continuous Animation Keyframes */
              @keyframes aistudio-spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes aistudio-spin-reverse {
                from { transform: rotate(360deg); }
                to { transform: rotate(0deg); }
              }
              @keyframes aistudio-spin-medium {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes aistudio-ribbon-wave {
                0% { transform: scale(1) translateY(0px) rotate(0deg); }
                50% { transform: scale(1.025) translateY(-5px) rotate(1.5deg); }
                100% { transform: scale(1) translateY(0px) rotate(0deg); }
              }
              @keyframes aistudio-ribbon-wave-sec {
                0% { transform: scale(1.02) translateY(-4px) rotate(-1deg); }
                50% { transform: scale(0.98) translateY(4px) rotate(1.5deg); }
                100% { transform: scale(1.02) translateY(-4px) rotate(-1deg); }
              }
              @keyframes aistudio-dash-flow {
                to { stroke-dashoffset: -320; }
              }
              @keyframes aistudio-dash-flow-rev {
                to { stroke-dashoffset: 320; }
              }
              @keyframes aistudio-core-breathe {
                0%, 100% { transform: scale(0.95); opacity: 0.9; }
                50% { transform: scale(1.08); opacity: 1; }
              }
              @keyframes aistudio-halo-pulse {
                0%, 100% { transform: scale(0.92); opacity: 0.4; }
                50% { transform: scale(1.15); opacity: 0.75; }
              }
              @keyframes aistudio-ring-expand {
                0% { r: 20px; opacity: 0.85; stroke-width: 1.5; }
                100% { r: 68px; opacity: 0; stroke-width: 0.5; }
              }
              @keyframes aistudio-ring-expand-delayed {
                0% { r: 18px; opacity: 0; }
                20% { opacity: 0.7; stroke-width: 1.2; }
                100% { r: 62px; opacity: 0; stroke-width: 0.4; }
              }
              @keyframes aistudio-particle-drift-1 {
                0% { transform: translate(0px, 0px); opacity: 0.4; }
                50% { transform: translate(5px, -7px); opacity: 0.9; }
                100% { transform: translate(-4px, -12px); opacity: 0.3; }
              }
              @keyframes aistudio-particle-drift-2 {
                0% { transform: translate(0px, 0px); opacity: 0.3; }
                50% { transform: translate(-6px, -6px); opacity: 0.85; }
                100% { transform: translate(4px, -11px); opacity: 0.2; }
              }
              @keyframes aistudio-particle-drift-3 {
                0% { transform: translate(0px, 0px); opacity: 0.5; }
                50% { transform: translate(7px, 6px); opacity: 0.95; }
                100% { transform: translate(-5px, 10px); opacity: 0.4; }
              }

              .anim-spin-slow {
                transform-origin: 250px 187px;
                animation: aistudio-spin-slow 32s linear infinite;
              }
              .anim-spin-reverse {
                transform-origin: 250px 187px;
                animation: aistudio-spin-reverse 26s linear infinite;
              }
              .anim-spin-medium {
                transform-origin: 250px 187px;
                animation: aistudio-spin-medium 18s linear infinite;
              }
              .anim-ribbon-wave {
                transform-origin: 250px 187px;
                animation: aistudio-ribbon-wave 7s ease-in-out infinite;
              }
              .anim-ribbon-wave-sec {
                transform-origin: 250px 187px;
                animation: aistudio-ribbon-wave-sec 9s ease-in-out infinite;
              }
              .anim-dash-flow {
                animation: aistudio-dash-flow 12s linear infinite;
              }
              .anim-dash-flow-fast {
                animation: aistudio-dash-flow 7s linear infinite;
              }
              .anim-dash-flow-rev {
                animation: aistudio-dash-flow-rev 10s linear infinite;
              }
              .anim-core-pulse {
                transform-origin: 250px 187px;
                animation: aistudio-core-breathe 3.5s ease-in-out infinite;
              }
              .anim-halo-pulse {
                transform-origin: 250px 187px;
                animation: aistudio-halo-pulse 4s ease-in-out infinite;
              }
              .anim-ring-expand-1 {
                animation: aistudio-ring-expand 3.6s cubic-bezier(0.1, 0.7, 0.3, 1) infinite;
              }
              .anim-ring-expand-2 {
                animation: aistudio-ring-expand-delayed 3.6s cubic-bezier(0.1, 0.7, 0.3, 1) infinite 1.8s;
              }
              .anim-particle-1 {
                animation: aistudio-particle-drift-1 4.5s ease-in-out infinite alternate;
              }
              .anim-particle-2 {
                animation: aistudio-particle-drift-2 5.5s ease-in-out infinite alternate;
              }
              .anim-particle-3 {
                animation: aistudio-particle-drift-3 6s ease-in-out infinite alternate;
              }

              /* Accessibility: Reduced motion support */
              @media (prefers-reduced-motion: reduce) {
                .anim-spin-slow,
                .anim-spin-reverse,
                .anim-spin-medium,
                .anim-ribbon-wave,
                .anim-ribbon-wave-sec,
                .anim-dash-flow,
                .anim-dash-flow-fast,
                .anim-dash-flow-rev,
                .anim-core-pulse,
                .anim-halo-pulse,
                .anim-ring-expand-1,
                .anim-ring-expand-2,
                .anim-particle-1,
                .anim-particle-2,
                .anim-particle-3 {
                  animation: none !important;
                }
              }
            `}
          </style>
        </defs>

        {/* 1. Background Ambient Radial Glow */}
        <circle cx="250" cy="187" r="170" fill="url(#bgAmbientRadial)" />

        {/* 2. Geometric Coordinate Ring System */}
        <g className="anim-spin-slow" opacity="0.45">
          <circle cx="250" cy="187" r="145" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="3 7" fill="none" />
          <circle cx="250" cy="187" r="128" stroke="#9333ea" strokeWidth="0.6" strokeDasharray="2 8" fill="none" />
          <circle cx="250" cy="187" r="105" stroke="#06b6d4" strokeWidth="0.7" strokeDasharray="4 6" fill="none" />

          {/* Coordinate Crosshairs */}
          <line x1="250" y1="35" x2="250" y2="339" stroke="#262938" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="98" y1="187" x2="402" y2="187" stroke="#262938" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="142" y1="79" x2="358" y2="295" stroke="#9333ea" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="2 6" />
          <line x1="142" y1="295" x2="358" y2="79" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="2 6" />
        </g>

        {/* 3. Orbiting Particles & Planetary Track 1 (Inclined Orbit - Clockwise) */}
        <g className="anim-spin-medium">
          <ellipse
            cx="250"
            cy="187"
            rx="160"
            ry="68"
            stroke="#9333ea"
            strokeWidth="0.9"
            strokeDasharray="6 8"
            strokeOpacity="0.4"
            fill="none"
            transform="rotate(-24 250 187)"
          />
          {/* Luminous Node on Orbit 1 */}
          <g transform="rotate(-24 250 187)">
            <circle cx="90" cy="187" r="4.5" fill="#c084fc" filter="url(#softGlow)" />
            <circle cx="90" cy="187" r="2" fill="#ffffff" />
            <circle cx="410" cy="187" r="3.5" fill="#3b82f6" filter="url(#softGlow)" />
            <circle cx="410" cy="187" r="1.5" fill="#ffffff" />
          </g>
        </g>

        {/* 4. Orbiting Particles & Track 2 (Counter-Clockwise Inclined Orbit) */}
        <g className="anim-spin-reverse">
          <ellipse
            cx="250"
            cy="187"
            rx="140"
            ry="85"
            stroke="#06b6d4"
            strokeWidth="0.8"
            strokeDasharray="5 7"
            strokeOpacity="0.4"
            fill="none"
            transform="rotate(32 250 187)"
          />
          {/* Luminous Nodes on Orbit 2 */}
          <g transform="rotate(32 250 187)">
            <circle cx="390" cy="187" r="4" fill="#06b6d4" filter="url(#softGlow)" />
            <circle cx="390" cy="187" r="1.8" fill="#ffffff" />
            <circle cx="110" cy="187" r="3" fill="#f472b6" filter="url(#softGlow)" />
            <circle cx="110" cy="187" r="1.2" fill="#ffffff" />
          </g>
        </g>

        {/* 5. Flowing 3D AI Neural Ribbon - Layer 1 (Back Shadow Ribbon) */}
        <g className="anim-ribbon-wave-sec">
          <path
            d="M 105,187 C 105,108 205,92 250,187 C 295,282 395,266 395,187 C 395,108 295,92 250,187 C 205,282 105,266 105,187 Z"
            fill="none"
            stroke="url(#ribbonGradSecondary)"
            strokeWidth="8"
            strokeOpacity="0.25"
            filter="url(#neonGlow)"
          />
          <path
            d="M 105,187 C 105,108 205,92 250,187 C 295,282 395,266 395,187 C 395,108 295,92 250,187 C 205,282 105,266 105,187 Z"
            fill="none"
            stroke="url(#ribbonGradSecondary)"
            strokeWidth="2.2"
            strokeDasharray="16 8 8 8"
            className="anim-dash-flow-rev"
            filter="url(#softGlow)"
          />
        </g>

        {/* 6. Flowing 3D AI Neural Ribbon - Layer 2 (Main Glowing Ribbon) */}
        <g className="anim-ribbon-wave">
          <path
            d="M 112,187 C 112,112 212,96 250,187 C 288,278 388,262 388,187 C 388,112 288,96 250,187 C 212,278 112,262 112,187 Z"
            fill="none"
            stroke="url(#ribbonGradPrimary)"
            strokeWidth="4.5"
            strokeOpacity="0.85"
            filter="url(#neonGlow)"
          />
          {/* Core bright stroke with continuous forward energy dash flow */}
          <path
            d="M 112,187 C 112,112 212,96 250,187 C 288,278 388,262 388,187 C 388,112 288,96 250,187 C 212,278 112,262 112,187 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeDasharray="18 12 6 12"
            className="anim-dash-flow-fast"
            filter="url(#softGlow)"
          />
        </g>

        {/* 7. Neural Synaptic Bridge Filaments (Connecting Curves) */}
        <g className="anim-ribbon-wave" opacity="0.6">
          <line x1="165" y1="130" x2="185" y2="160" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="220" y1="160" x2="235" y2="175" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="265" y1="200" x2="280" y2="215" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="315" y1="215" x2="335" y2="245" stroke="#f472b6" strokeWidth="1" strokeDasharray="2 3" />

          {/* Ribbon Junction Nodes */}
          <circle cx="165" cy="130" r="3" fill="#06b6d4" filter="url(#softGlow)" />
          <circle cx="335" cy="245" r="3" fill="#f472b6" filter="url(#softGlow)" />
          <circle cx="185" cy="160" r="2.5" fill="#c084fc" />
          <circle cx="315" cy="215" r="2.5" fill="#3b82f6" />
        </g>

        {/* 8. Secondary Flowing Elliptical Energy Ring (3D Inclined Tilted Ring) */}
        <g className="anim-spin-slow">
          <ellipse
            cx="250"
            cy="187"
            rx="125"
            ry="48"
            fill="none"
            stroke="url(#ribbonGradTertiary)"
            strokeWidth="2.5"
            strokeDasharray="14 10 4 10"
            className="anim-dash-flow"
            filter="url(#neonGlow)"
            transform="rotate(45 250 187)"
          />
        </g>

        {/* 9. Floating Ambient Neural Sparks & Constellation Particles */}
        <g className="anim-particle-1">
          <circle cx="135" cy="95" r="1.8" fill="#c084fc" filter="url(#softGlow)" />
          <circle cx="375" cy="115" r="2.2" fill="#06b6d4" filter="url(#softGlow)" />
          <circle cx="340" cy="290" r="1.6" fill="#3b82f6" />
          <circle cx="160" cy="275" r="2.0" fill="#f472b6" filter="url(#softGlow)" />
        </g>

        <g className="anim-particle-2">
          <circle cx="210" cy="65" r="2.0" fill="#3b82f6" filter="url(#softGlow)" />
          <circle cx="295" cy="75" r="1.5" fill="#c084fc" />
          <circle cx="395" cy="210" r="2.4" fill="#06b6d4" filter="url(#softGlow)" />
          <circle cx="105" cy="155" r="1.7" fill="#c084fc" filter="url(#softGlow)" />
        </g>

        <g className="anim-particle-3">
          <circle cx="220" cy="315" r="2.2" fill="#06b6d4" filter="url(#softGlow)" />
          <circle cx="280" cy="305" r="1.8" fill="#9333ea" />
          <circle cx="310" cy="140" r="1.5" fill="#ffffff" />
          <circle cx="190" cy="235" r="1.6" fill="#c084fc" />
        </g>

        {/* 10. Expanding Resonance Wave Rings from Core */}
        <circle
          cx="250"
          cy="187"
          fill="none"
          stroke="#c084fc"
          className="anim-ring-expand-1"
          filter="url(#softGlow)"
        />
        <circle
          cx="250"
          cy="187"
          fill="none"
          stroke="#06b6d4"
          className="anim-ring-expand-2"
          filter="url(#softGlow)"
        />

        {/* 11. Central Pulsing AI Neural Core Nucleus */}
        <g className="anim-core-pulse">
          {/* Outer Halo */}
          <circle
            cx="250"
            cy="187"
            r="38"
            fill="url(#coreRadial)"
            className="anim-halo-pulse"
            filter="url(#coreGlow)"
          />

          {/* Mid Sphere */}
          <circle
            cx="250"
            cy="187"
            r="22"
            fill="#9333ea"
            fillOpacity="0.8"
            stroke="#c084fc"
            strokeWidth="1.8"
            filter="url(#neonGlow)"
          />

          {/* Inner Radiant Gradient */}
          <circle
            cx="250"
            cy="187"
            r="15"
            fill="#3b82f6"
            fillOpacity="0.9"
            stroke="#06b6d4"
            strokeWidth="1.2"
          />

          {/* Central Bright Luminous Core Node */}
          <circle
            cx="250"
            cy="187"
            r="7"
            fill="#ffffff"
            filter="url(#softGlow)"
          />
        </g>
      </svg>
    </div>
  );
};
