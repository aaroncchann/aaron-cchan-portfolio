import React from 'react';

interface FlappyAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
  className?: string;
}

export const FlappyAvatar: React.FC<FlappyAvatarProps> = ({
  size = 'md',
  showGlow = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const glowClass = showGlow ? 'drop-shadow-[0_0_15px_rgba(6,182,212,0.45)]' : '';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#11131c] via-[#0d0f17] to-[#1c1f30] border border-[#c084fc]/30 p-1.5 transition-all duration-300 ${sizeClasses[size]} ${glowClass} ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <linearGradient id="innerGlow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>

        {/* Orbit Ring */}
        <circle
          cx="50"
          cy="50"
          r="43"
          stroke="url(#avatarGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          opacity="0.4"
        />

        {/* Left Wing / Aero Foil */}
        <path
          d="M48 24 C30 24 16 38 20 60 C24 68 32 72 40 70 C33 60 35 48 42 42 C45 37 48 32 48 24 Z"
          fill="url(#avatarGrad)"
          opacity="0.5"
        />

        {/* Right Wing / Cyber Wing */}
        <path
          d="M52 20 C70 20 86 36 82 58 C78 68 70 72 60 72 C68 62 67 48 58 40 C55 35 52 28 52 20 Z"
          fill="url(#avatarGrad)"
        />

        {/* Core AI Ring */}
        <circle
          cx="50"
          cy="50"
          r="14"
          fill="#08090f"
          stroke="url(#avatarGrad)"
          strokeWidth="2.5"
        />

        {/* Pulsing Eye / Energy Core */}
        <circle cx="50" cy="50" r="6" fill="url(#innerGlow)" />

        {/* High-tech accent node */}
        <circle cx="70" cy="32" r="2.5" fill="#22d3ee" />
      </svg>
    </div>
  );
};
