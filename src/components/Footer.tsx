import React from 'react';
import { ActiveScreen } from '../types';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <footer className="w-full bg-[#08090f] py-12 md:py-16 border-t border-[#262938]/60 mt-auto">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8">
          {/* Identity Column */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-sora text-xl text-white font-semibold">
                {PORTFOLIO_INFO.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#c084fc] px-2 py-0.5 rounded bg-[#9333ea]/15 border border-[#9333ea]/30">
                AI DEVELOPER
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#9ca3af] max-w-md leading-relaxed">
              Architecting next-generation cognitive interfaces, fluid Android runtimes, and precision web experiences from Diphu, Assam. Blending computational intelligence with architectural design discipline.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#3b82f6] pt-1">
              <span className="material-symbols-outlined text-base">location_on</span>
              <span>Diphu, Assam</span>
            </div>
            <a
              href={`mailto:${PORTFOLIO_INFO.email}`}
              className="flex items-center gap-2 text-xs text-[#9ca3af] hover:text-[#c084fc] transition-colors"
              title={`Email Aaron directly at ${PORTFOLIO_INFO.email}`}
            >
              <span className="material-symbols-outlined text-base text-[#c084fc]">mail</span>
              <span className="font-mono">
                {PORTFOLIO_INFO.email}
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-sora text-xs text-white tracking-wider uppercase font-semibold">
              Navigation
            </span>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate('home')}
                className="text-xs text-[#9ca3af] hover:text-white transition-colors text-left"
              >
                Home Core
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="text-xs text-[#9ca3af] hover:text-white transition-colors text-left"
              >
                Production Builds
              </button>
              <button
                onClick={() => onNavigate('android')}
                className="text-xs text-[#9ca3af] hover:text-white transition-colors text-left"
              >
                Android Ecosystem
              </button>
              <button
                onClick={() => onNavigate('creative')}
                className="text-xs text-[#9ca3af] hover:text-white transition-colors text-left"
              >
                Creative Lab
              </button>
            </div>
          </div>

          {/* Intelligence Links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-sora text-xs text-white tracking-wider uppercase font-semibold">
              Intelligence
            </span>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate('skills')}
                className="text-xs text-[#9ca3af] hover:text-white transition-colors text-left"
              >
                Skills &amp; Stacks
              </button>
              <button
                onClick={() => onNavigate('journey')}
                className="text-xs text-[#9ca3af] hover:text-white transition-colors text-left"
              >
                Research Journey
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-xs text-[#9ca3af] hover:text-white transition-colors text-left"
              >
                Engineering Tiers
              </button>
              <button
                onClick={() => onNavigate('flappy-ai')}
                className="text-xs text-[#c084fc] hover:text-white transition-colors text-left flex items-center gap-1 font-semibold"
              >
                <span>✨ Ask Flappy AI</span>
              </button>
            </div>
          </div>

          {/* Network & Comms */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-sora text-xs text-white tracking-wider uppercase font-semibold">
              Network &amp; Comms
            </span>
            <div className="flex flex-col gap-2">
              <a
                href={PORTFOLIO_INFO.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#9ca3af] hover:text-white flex items-center justify-between py-1 transition-colors group"
                title="GitHub (Opens in new tab)"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#c084fc] group-hover:scale-110 transition-transform">code</span>
                  <span>GitHub</span>
                </div>
                <span className="material-symbols-outlined text-xs text-[#9ca3af]/40 group-hover:text-[#c084fc] transition-colors">
                  arrow_outward
                </span>
              </a>

              <a
                href={PORTFOLIO_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#9ca3af] hover:text-white flex items-center justify-between py-1 transition-colors group"
                title="LinkedIn (Opens in new tab)"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#3b82f6] group-hover:scale-110 transition-transform">work</span>
                  <span>LinkedIn</span>
                </div>
                <span className="material-symbols-outlined text-xs text-[#9ca3af]/40 group-hover:text-[#3b82f6] transition-colors">
                  arrow_outward
                </span>
              </a>

              <a
                href={PORTFOLIO_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#9ca3af] hover:text-white flex items-center justify-between py-1 transition-colors group"
                title="Instagram (Opens in new tab)"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#f472b6] group-hover:scale-110 transition-transform">photo_camera</span>
                  <span>Instagram</span>
                </div>
                <span className="material-symbols-outlined text-xs text-[#9ca3af]/40 group-hover:text-[#f472b6] transition-colors">
                  arrow_outward
                </span>
              </a>

              <a
                href={PORTFOLIO_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#9ca3af] hover:text-white flex items-center justify-between py-1 transition-colors group"
                title="Facebook (Opens in new tab)"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#3b82f6] group-hover:scale-110 transition-transform">public</span>
                  <span>Facebook</span>
                </div>
                <span className="material-symbols-outlined text-xs text-[#9ca3af]/40 group-hover:text-[#3b82f6] transition-colors">
                  arrow_outward
                </span>
              </a>

              <a
                href={PORTFOLIO_INFO.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#9ca3af] hover:text-white flex items-center justify-between py-1 transition-colors group"
                title="X/Twitter (Opens in new tab)"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#38bdf8] group-hover:scale-110 transition-transform">tag</span>
                  <span>X/Twitter</span>
                </div>
                <span className="material-symbols-outlined text-xs text-[#9ca3af]/40 group-hover:text-[#38bdf8] transition-colors">
                  arrow_outward
                </span>
              </a>

              <a
                href={PORTFOLIO_INFO.socialLinks.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#9ca3af] hover:text-white flex items-center justify-between py-1 transition-colors group"
                title="Threads (Opens in new tab)"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#c084fc] group-hover:scale-110 transition-transform">forum</span>
                  <span>Threads</span>
                </div>
                <span className="material-symbols-outlined text-xs text-[#9ca3af]/40 group-hover:text-[#c084fc] transition-colors">
                  arrow_outward
                </span>
              </a>

              <a
                href={PORTFOLIO_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#9ca3af] hover:text-white flex items-center justify-between py-1 transition-colors group"
                title="YouTube (Opens in new tab)"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#ef4444] group-hover:scale-110 transition-transform">play_circle</span>
                  <span>YouTube</span>
                </div>
                <span className="material-symbols-outlined text-xs text-[#9ca3af]/40 group-hover:text-[#ef4444] transition-colors">
                  arrow_outward
                </span>
              </a>

              <button
                type="button"
                onClick={onOpenContact || (() => onNavigate('contact'))}
                className="w-full text-xs text-[#9ca3af] hover:text-white flex items-center justify-between py-1 transition-colors group pt-1 border-t border-[#262938]/40 cursor-pointer text-left"
                title="Direct Contact"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#3b82f6] group-hover:scale-110 transition-transform">mail</span>
                  <span>Direct Contact</span>
                </div>
                <span className="material-symbols-outlined text-xs text-[#9ca3af]/40 group-hover:text-[#3b82f6] transition-colors">
                  alternate_email
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[#262938]/40">
          <span className="text-xs text-[#9ca3af]">
            © 2026 {PORTFOLIO_INFO.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <span className="text-xs text-[#9ca3af]">{PORTFOLIO_INFO.location}</span>
            <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              {PORTFOLIO_INFO.status}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
