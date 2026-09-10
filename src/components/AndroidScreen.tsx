import React from 'react';
import { ActiveScreen } from '../types';
import { ANDROID_APPS, ANDROID_GAMES, CREATIVE_ITEMS } from '../data/portfolioData';

interface AndroidScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenContact: () => void;
}

export const AndroidScreen: React.FC<AndroidScreenProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Subtle Ambient Glows */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-[#9333ea]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-[-100px] w-[500px] h-[500px] bg-[#3b82f6]/10 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute bottom-20 left-10 w-[450px] h-[450px] bg-[#ec4899]/10 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-20 flex flex-col gap-16 relative z-10">
          {/* Section 1: Page Header */}
          <section className="flex flex-col gap-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#1c1f30]/80 border border-[#262938]/60 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#c084fc] animate-pulse"></span>
              <span className="font-sora text-xs text-[#c084fc] uppercase tracking-widest font-semibold">
                Android Ecosystem
              </span>
              <span className="text-xs text-[#9ca3af]">• Native Mobile &amp; Interactive Media</span>
            </div>
            <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-bold">
              Android Apps &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] via-[#3b82f6] to-[#f472b6]">
                Games
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#9ca3af] max-w-3xl leading-relaxed">
              Mobile applications and interactive 2D games engineered for Android, prepared for testing and Google Play.
            </p>
          </section>

          {/* Section 2: Android Apps Showcase (Grid of 4) */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#262938]/60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c084fc] text-2xl">
                  phone_android
                </span>
                <h2 className="font-sora text-xl md:text-2xl text-white font-semibold">
                  Android Apps
                </h2>
              </div>
              <span className="font-mono text-[11px] text-[#9ca3af] bg-[#1c1f30] px-2.5 py-1 rounded border border-[#262938]/60 font-semibold">
                CATEGORY: ANDROID APPS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ANDROID_APPS.map((app) => {
                const isPurple = app.accentColor === 'primary';
                const isBlue = app.accentColor === 'secondary';
                return (
                  <div
                    key={app.id}
                    className="flex flex-col rounded-2xl bg-[#11131c]/90 border border-[#262938]/60 backdrop-blur-xl shadow-xl overflow-hidden group hover:border-[#c084fc]/50 hover:shadow-[0_16px_48px_-8px_rgba(147,51,234,0.25)] transition-all duration-300"
                  >
                    <div className="relative h-44 w-full bg-gradient-to-br from-[#1c1f30] via-[#151722] to-[#08090f] flex items-center justify-center p-6 overflow-hidden">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                          isPurple
                            ? 'bg-[#9333ea]/20 border border-[#9333ea]/30 text-[#c084fc] shadow-[0_0_24px_rgba(147,51,234,0.3)]'
                            : isBlue
                            ? 'bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-[#3b82f6] shadow-[0_0_24px_rgba(5,102,217,0.3)]'
                            : 'bg-pink-500/20 border border-pink-500/30 text-pink-400 shadow-[0_0_24px_rgba(196,37,122,0.3)]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-3xl">{app.icon}</span>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full font-sora text-[11px] font-semibold bg-[#9333ea]/80 text-white border border-[#9333ea]/30">
                          {app.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col p-5 gap-3 flex-1 justify-between">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-sora text-base text-white group-hover:text-[#c084fc] transition-colors font-semibold">
                          {app.name}
                        </h3>
                        <span
                          className={`font-sora text-xs font-semibold ${
                            isPurple ? 'text-[#c084fc]' : isBlue ? 'text-[#3b82f6]' : 'text-pink-400'
                          }`}
                        >
                          {app.subtitle}
                        </span>
                        <p className="text-xs text-[#9ca3af] mt-1 leading-relaxed">
                          {app.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#262938]/40 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-[#9ca3af]">
                          <span className="w-2 h-2 rounded-full bg-amber-400/90"></span>
                          {app.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Android Games Showcase (2 Games) */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#262938]/60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3b82f6] text-2xl">
                  sports_esports
                </span>
                <h2 className="font-sora text-xl md:text-2xl text-white font-semibold">
                  Android Games Showcase
                </h2>
              </div>
              <span className="font-mono text-[11px] text-[#9ca3af] bg-[#1c1f30] px-2.5 py-1 rounded border border-[#262938]/60 font-semibold">
                CATEGORY: ANDROID GAMES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ANDROID_GAMES.map((game) => {
                const isBlue = game.accentColor === 'secondary';
                return (
                  <div
                    key={game.id}
                    className="flex flex-col rounded-2xl bg-[#11131c]/90 border border-[#262938]/60 backdrop-blur-xl shadow-xl overflow-hidden group hover:border-[#3b82f6]/50 hover:shadow-[0_16px_48px_-8px_rgba(59,130,246,0.25)] transition-all duration-300"
                  >
                    <div className="relative h-52 w-full bg-gradient-to-br from-[#1c1f30] via-[#151722] to-[#08090f] flex items-center justify-center p-6 overflow-hidden">
                      <div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                          isBlue
                            ? 'bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-[#3b82f6] shadow-[0_0_32px_rgba(5,102,217,0.35)]'
                            : 'bg-pink-500/20 border border-pink-500/30 text-pink-400 shadow-[0_0_32px_rgba(196,37,122,0.35)]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-4xl">{game.icon}</span>
                      </div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-2.5 py-0.5 rounded-full font-sora text-[11px] font-semibold bg-[#3b82f6]/80 text-white border border-[#3b82f6]/30">
                          Android Games
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full font-sora text-[11px] font-medium bg-[#1c1f30]/80 text-[#f9fafb] border border-[#262938]/60">
                          {game.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col p-6 gap-3 flex-1 justify-between">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-sora text-lg text-white group-hover:text-[#3b82f6] transition-colors font-semibold">
                            {game.name}
                          </h3>
                          <span
                            className={`font-sora text-xs font-semibold ${
                              isBlue ? 'text-[#3b82f6]' : 'text-pink-400'
                            }`}
                          >
                            {game.subtitle}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#9ca3af] mt-1 leading-relaxed">
                          {game.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#262938]/40 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#9ca3af]">
                          <span className="w-2 h-2 rounded-full bg-amber-400/90"></span>
                          {game.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 4: Creative Showcase (4 Exact Categories) */}
          <section className="flex flex-col gap-6" id="creative-section">
            <div className="flex flex-col gap-1 border-b border-[#262938]/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f472b6] text-2xl">
                  auto_awesome
                </span>
                <h2 className="font-sora text-xl md:text-2xl text-white font-semibold">
                  AI &amp; Digital Creativity
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#9ca3af]">
                Creative exploration using modern AI tools for digital media and assets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CREATIVE_ITEMS.map((item) => {
                const isPurple = item.accentColor === 'primary';
                const isBlue = item.accentColor === 'secondary';
                return (
                  <div
                    key={item.id}
                    className="flex flex-col rounded-2xl bg-[#11131c]/90 border border-[#262938]/60 backdrop-blur-xl shadow-xl overflow-hidden group hover:border-[#c084fc]/50 transition-all duration-300"
                  >
                    <div className="relative h-44 w-full bg-gradient-to-br from-[#1c1f30] via-[#151722] to-[#08090f] flex flex-col items-center justify-center p-6 border-b border-[#262938]/30">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-2 ${
                          isPurple
                            ? 'bg-[#9333ea]/20 border border-[#9333ea]/30 text-[#c084fc]'
                            : isBlue
                            ? 'bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-[#3b82f6]'
                            : 'bg-pink-500/20 border border-pink-500/30 text-pink-400'
                        }`}
                      >
                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                      </div>
                      <span
                        className={`font-mono text-[11px] ${
                          isPurple ? 'text-[#c084fc]' : isBlue ? 'text-[#3b82f6]' : 'text-pink-400'
                        }`}
                      >
                        {item.placeholderText}
                      </span>
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded font-sora text-[10px] bg-[#1c1f30] text-[#f9fafb] border border-[#262938]/60">
                          {item.format}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col p-5 gap-3 flex-1 justify-between">
                      <div>
                        <h3 className="font-sora text-sm md:text-base text-white group-hover:text-[#c084fc] transition-colors font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#9ca3af] mt-2">
                          Portfolio Samples Coming Soon
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#262938]/40">
                        <span className="text-xs text-[#9ca3af] flex items-center gap-1.5 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-pulse"></span>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Bottom Collaboration Banner */}
          <section className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1c1f30]/90 via-[#11131c]/80 to-[#1c1f30]/90 border border-[#262938]/60 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-[#24283c] flex items-center justify-center text-[#c084fc] border border-[#9333ea]/30">
                <span className="material-symbols-outlined text-2xl">rocket_launch</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sora text-base md:text-lg text-white font-semibold">
                  Looking to Collaborate or Test Builds?
                </span>
                <span className="text-xs sm:text-sm text-[#9ca3af]">
                  Reach out to Aaron Cchan for testing access, project discussions, or mobile app collaboration.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-shrink-0">
              <button
                onClick={onOpenContact}
                className="px-5 py-2.5 rounded-xl font-sora text-xs md:text-sm text-white bg-[#1c1f30] hover:bg-[#24283c] transition-all shadow-sm border border-[#262938]"
              >
                Get in Touch
              </button>
              <button
                onClick={() => onNavigate('flappy-ai')}
                className="px-6 py-2.5 rounded-xl font-sora text-xs md:text-sm text-white bg-gradient-to-r from-[#9333ea] via-[#c084fc] to-[#3b82f6] shadow-[0_0_24px_-2px_rgba(147,51,234,0.45)] hover:shadow-[0_0_32px_0px_rgba(147,51,234,0.7)] transition-all transform hover:-translate-y-0.5 font-semibold"
              >
                ✨ Ask Flappy AI
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
