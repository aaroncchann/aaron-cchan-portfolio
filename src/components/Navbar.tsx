import React, { useState } from 'react';
import { ActiveScreen } from '../types';

interface NavbarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenFlappyAI?: () => void;
  isFlappyOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  onNavigate,
  onOpenFlappyAI,
  isFlappyOpen = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleFlappyClick = () => {
    if (onOpenFlappyAI) {
      onOpenFlappyAI();
    } else {
      onNavigate('flappy-ai');
    }
    setMobileMenuOpen(false);
  };

  const navItems: { id: ActiveScreen; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'android', label: 'Android' },
    { id: 'creative', label: 'Creative' },
    { id: 'journey', label: 'Journey' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (screen: ActiveScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0d0f17]/85 backdrop-blur-xl border-b border-[#262938]/60 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.7)]">
      <div className="h-20 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Profile */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9333ea] to-[#3b82f6] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:shadow-[0_0_22px_rgba(147,51,234,0.8)] transition-all">
            AC
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-sora text-base md:text-lg text-white tracking-tight font-semibold">
                Aaron Cchan
              </span>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse"></span>
                <span className="text-[11px] font-semibold text-[#adc6ff]">Diphu, Assam</span>
              </div>
            </div>
            <span className="hidden sm:inline-block text-xs text-[#9ca3af]">
              AI Developer • Web &amp; Android App Creator
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#11131c]/90 p-1.5 rounded-xl border border-[#262938]/60">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'text-white bg-[#1c1f30] border border-[#c084fc]/30 shadow-[0_0_12px_rgba(147,51,234,0.25)]'
                    : 'text-[#9ca3af] hover:text-white hover:bg-[#151722]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleFlappyClick}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold text-white transition-all transform hover:-translate-y-0.5 ${
              isFlappyOpen || activeScreen === 'flappy-ai'
                ? 'bg-gradient-to-r from-[#9333ea] via-purple-600 to-[#3b82f6] shadow-[0_0_30px_rgba(147,51,234,0.8)] border border-white/30'
                : 'bg-gradient-to-r from-[#9333ea] via-purple-600 to-[#3b82f6] shadow-[0_0_24px_-2px_rgba(147,51,234,0.55)] hover:shadow-[0_0_32px_0px_rgba(147,51,234,0.8)]'
            }`}
          >
            <span>✨ Ask Flappy AI</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#151722] text-[#9ca3af] hover:text-white border border-[#262938]/60"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0f17]/95 border-b border-[#262938] px-5 py-4 flex flex-col gap-2 backdrop-blur-2xl">
          <div className="grid grid-cols-3 gap-2">
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg text-center transition-all ${
                    isActive
                      ? 'text-white bg-[#1c1f30] border border-[#c084fc]/30'
                      : 'text-[#9ca3af] hover:text-white bg-[#151722]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={handleFlappyClick}
            className="w-full mt-2 py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#9333ea] to-[#3b82f6] text-center shadow-lg"
          >
            ✨ Open Flappy AI Assistant
          </button>
        </div>
      )}
    </header>
  );
};
