import React from 'react';
import { ActiveScreen } from '../types';
import { PORTFOLIO_INFO, SKILL_CATEGORIES } from '../data/portfolioData';
import { AiVisualCanvas } from './AiVisualCanvas';

interface HomeScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenContact: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <div className="relative w-full overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-32 left-1/4 w-[600px] h-[350px] bg-gradient-to-br from-[#9333ea]/20 to-[#3b82f6]/15 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-[#ec4899]/15 rounded-full blur-[140px] pointer-events-none"></div>

        <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Availability Eyebrow */}
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#1c1f30] border border-[#262938]/80 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="font-sora text-xs text-white tracking-wide uppercase font-semibold">
                  {PORTFOLIO_INFO.status}
                </span>
              </div>

              {/* Hero Headline */}
              <div className="flex flex-col gap-3">
                <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white tracking-tight leading-[1.15] font-bold">
                  Building{' '}
                  <span className="bg-gradient-to-r from-[#c084fc] via-[#3b82f6] to-[#f472b6] bg-clip-text text-transparent">
                    AI Applications
                  </span>
                  , Web Experiences &amp; Android Apps
                </h1>
                <p className="text-base sm:text-lg text-[#9ca3af] max-w-2xl leading-relaxed">
                  I build AI-powered applications, custom AI agents, chatbots, websites, Android apps and games — turning ideas into useful digital experiences.
                </p>
              </div>

              {/* Dual CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sora text-sm font-semibold text-white bg-gradient-to-r from-[#9333ea] via-purple-600 to-[#3b82f6] shadow-[0_0_24px_-2px_rgba(147,51,234,0.45)] hover:shadow-[0_0_32px_0px_rgba(147,51,234,0.65)] hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <span>Explore My Work</span>
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
                <button
                  onClick={() => onNavigate('flappy-ai')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sora text-sm font-semibold text-white bg-[#1c1f30] hover:bg-[#24283c] border border-[#c084fc]/40 hover:border-[#c084fc] shadow-[0_0_20px_-3px_rgba(147,51,234,0.25)] transition-all duration-300"
                >
                  <span className="text-[#c084fc] text-base">✨</span>
                  <span>Ask Flappy AI</span>
                </button>
              </div>
            </div>

            {/* Right Column: Animated AI Visual Canvas (Continuous Glowing Ribbon & Particles) */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden bg-[#11131c] p-2 border border-[#262938]/60 shadow-2xl">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#08090f]">
                  <AiVisualCanvas />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090f]/70 via-transparent to-transparent pointer-events-none"></div>

                  {/* Corner Status Badges (Stitch Design) */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#08090f]/80 backdrop-blur-md border border-[#262938]/60 text-[10px] font-mono text-[#9ca3af] pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>AI • WEB • ANDROID</span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#1c1f30]/80 backdrop-blur-md border border-[#262938]/60 text-[10px] font-mono text-[#c084fc] pointer-events-none">
                    NEURAL INTERFACE
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Key Strengths Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-16">
            <div
              onClick={() => onNavigate('skills')}
              className="flex flex-col p-5 rounded-xl bg-[#11131c] border border-[#262938]/50 hover:border-[#c084fc]/40 transition-all cursor-pointer group shadow-sm hover:shadow-[0_10px_30px_rgba(147,51,234,0.15)]"
            >
              <div className="w-10 h-10 rounded-lg bg-[#c084fc]/15 flex items-center justify-center text-[#c084fc] mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">smart_toy</span>
              </div>
              <h3 className="font-sora text-sm md:text-base text-white font-semibold mb-1">
                AI Agents &amp; Custom Chatbots
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Building conversational bots, task-oriented agents, prompt architectures, and AI API integrations.
              </p>
            </div>

            <div
              onClick={() => onNavigate('skills')}
              className="flex flex-col p-5 rounded-xl bg-[#11131c] border border-[#262938]/50 hover:border-[#3b82f6]/40 transition-all cursor-pointer group shadow-sm hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]"
            >
              <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/15 flex items-center justify-center text-[#3b82f6] mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">language</span>
              </div>
              <h3 className="font-sora text-sm md:text-base text-white font-semibold mb-1">
                Web Applications &amp; Websites
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Developing responsive, modern web applications and websites using React, TypeScript, and clean UI/UX.
              </p>
            </div>

            <div
              onClick={() => onNavigate('android')}
              className="flex flex-col p-5 rounded-xl bg-[#11131c] border border-[#262938]/50 hover:border-[#f472b6]/40 transition-all cursor-pointer group shadow-sm hover:shadow-[0_10px_30px_rgba(244,114,182,0.15)]"
            >
              <div className="w-10 h-10 rounded-lg bg-[#f472b6]/15 flex items-center justify-center text-[#f472b6] mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">phone_android</span>
              </div>
              <h3 className="font-sora text-sm md:text-base text-white font-semibold mb-1">
                Android Apps &amp; Games
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Creating mobile applications and interactive 2D games for Android, prepared for testing and Google Play.
              </p>
            </div>

            <div
              onClick={() => onNavigate('creative')}
              className="flex flex-col p-5 rounded-xl bg-[#11131c] border border-[#262938]/50 hover:border-[#c084fc]/40 transition-all cursor-pointer group shadow-sm hover:shadow-[0_10px_30px_rgba(147,51,234,0.15)]"
            >
              <div className="w-10 h-10 rounded-lg bg-[#c084fc]/15 flex items-center justify-center text-[#c084fc] mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">palette</span>
              </div>
              <h3 className="font-sora text-sm md:text-base text-white font-semibold mb-1">
                AI &amp; Digital Content
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Using modern AI tools to produce creative digital images, video content, and social media media.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 2. ABOUT ME SECTION */}
      <section className="w-full bg-[#08090f] py-16 md:py-24 border-y border-[#262938]/50" id="about">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="font-sora text-xs text-[#c084fc] font-semibold uppercase tracking-wider">
              About Me
            </span>
            <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl text-white font-semibold tracking-tight">
              Developer Philosophy &amp; Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <blockquote className="p-6 md:p-8 rounded-2xl bg-[#11131c] border-l-4 border-[#c084fc] shadow-md">
                <p className="text-base sm:text-lg text-white italic leading-relaxed">
                  "{PORTFOLIO_INFO.philosophyQuote}"
                </p>
              </blockquote>

              {/* 4 Pillars of Philosophy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {PORTFOLIO_INFO.bioPhilosophy.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#11131c] border border-[#262938]/40 flex flex-col gap-2 hover:border-[#262938] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined text-base ${
                          item.color === 'primary' ? 'text-[#c084fc]' : 'text-[#3b82f6]'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`font-sora text-xs font-semibold uppercase tracking-wider ${
                          item.color === 'primary' ? 'text-[#c084fc]' : 'text-[#3b82f6]'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Overview Card */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#151722] border border-[#262938]/70 flex flex-col gap-4 shadow-xl">
              <span className="font-sora text-xs text-[#3b82f6] font-semibold uppercase tracking-wider">
                Profile Overview
              </span>

              {/* Profile Photo Area */}
              <div
                className="relative w-full aspect-[3/4] max-h-[480px] mx-auto my-1 rounded-2xl border border-[#262938]/60 bg-[#11131c]/80 overflow-hidden shadow-inner group"
                style={{ aspectRatio: '3 / 4' }}
              >
                <img
                  src={PORTFOLIO_INFO.heroImage || '/assets/profile-photo.jpg'}
                  alt={PORTFOLIO_INFO.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: 'center 35%' }}
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col gap-3.5 pt-1">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#c084fc] text-xl mt-0.5">person</span>
                  <div>
                    <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider block font-semibold">
                      Name
                    </span>
                    <span className="text-sm text-white font-medium">{PORTFOLIO_INFO.name}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#3b82f6] text-xl mt-0.5">location_on</span>
                  <div>
                    <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider block font-semibold">
                      Location
                    </span>
                    <span className="text-sm text-white font-medium">{PORTFOLIO_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#f472b6] text-xl mt-0.5">verified</span>
                  <div>
                    <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider block font-semibold">
                      Status
                    </span>
                    <span className="text-sm text-emerald-400 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {PORTFOLIO_INFO.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS SECTION */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 w-full" id="skills">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="font-sora text-xs text-[#3b82f6] font-semibold uppercase tracking-wider">
              Core Disciplines
            </span>
            <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl text-white font-semibold tracking-tight">
              Skills &amp; Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-2xl bg-[#11131c] border border-[#262938]/60 flex flex-col justify-between gap-6 shadow-lg hover:border-[#c084fc]/50 transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        cat.accent === 'primary'
                          ? 'bg-[#c084fc]/15 text-[#c084fc]'
                          : cat.accent === 'secondary'
                          ? 'bg-[#3b82f6]/15 text-[#3b82f6]'
                          : 'bg-[#f472b6]/15 text-[#f472b6]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-sora text-base md:text-lg text-white font-semibold">
                        {cat.name}
                      </h3>
                      <span className="font-mono text-xs text-[#c084fc] uppercase">
                        {cat.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg bg-[#1c1f30] text-[#f9fafb] font-sora text-xs border border-[#262938]/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORK / SELECTED PROJECT */}
      <section className="w-full bg-[#08090f] py-16 md:py-24 border-t border-[#262938]/50" id="featured-work">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="font-sora text-xs text-[#c084fc] font-semibold uppercase tracking-wider">
              Featured Work
            </span>
            <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl text-white font-semibold tracking-tight">
              Selected Project
            </h2>
          </div>

          {/* Flappy - Personal AI Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 rounded-2xl bg-[#11131c] border border-[#262938]/70 hover:border-[#c084fc]/50 transition-all duration-300 shadow-xl items-center">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#9333ea]/20 text-[#c084fc] font-sora text-xs font-semibold">
                  AI Assistant
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-sora text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Completed
                </span>
              </div>

              <h3 className="font-sora text-xl sm:text-2xl md:text-3xl text-white font-bold tracking-tight">
                Flappy – Personal AI
              </h3>

              <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                A personal AI assistant designed for natural conversations, helpful interactions, and an engaging conversational experience.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-md bg-[#1c1f30] text-white text-xs border border-[#262938]/60">
                  AI Assistant
                </span>
                <span className="px-3 py-1 rounded-md bg-[#1c1f30] text-white text-xs border border-[#262938]/60">
                  Conversational AI
                </span>
                <span className="px-3 py-1 rounded-md bg-[#1c1f30] text-white text-xs border border-[#262938]/60">
                  Prompt Engineering
                </span>
                <span className="px-3 py-1 rounded-md bg-[#1c1f30] text-white text-xs border border-[#262938]/60">
                  Natural Dialogue
                </span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onNavigate('flappy-ai')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#9333ea] to-[#3b82f6] shadow-md hover:shadow-lg transition-all"
                >
                  <span>Launch Assistant</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Project Visual Container */}
            <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-xl overflow-hidden bg-[#24283c] border border-[#262938]/60 shadow-inner flex items-center justify-center p-4">
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#151722] via-[#1c1f30] to-[#24283c] p-5 flex flex-col justify-between border border-[#262938]/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#c084fc] uppercase">
                    AI Assistant Interface
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-[#11131c]/80 border border-[#262938]/60 max-w-[85%]">
                    <p className="text-xs text-[#9ca3af] font-mono">
                      "Hello! How can I assist with your workflow today?"
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#9333ea]/20 border border-[#9333ea]/40 max-w-[85%] ml-auto text-right">
                    <p className="text-xs text-[#c084fc] font-mono">
                      "Let's explore building an autonomous agent pipeline."
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded bg-[#08090f]/80 flex items-center justify-between text-xs text-[#9ca3af] font-mono">
                  <span>STATUS: COMPLETED</span>
                  <span className="text-[#3b82f6] font-semibold">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE INTRODUCING FLAPPY AI BANNER */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 w-full" id="flappy-preview">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#151722] via-[#1c1f30] to-[#151722] p-8 md:p-12 border border-[#262938]/80 shadow-2xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#9333ea]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#2563eb]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1 rounded-full bg-[#c084fc]/10 border border-[#c084fc]/30 shadow-sm">
                <span className="text-[#c084fc] text-xs font-semibold uppercase tracking-wider">
                  ✨ Integration Ready • Personal AI Portfolio Assistant
                </span>
              </div>
              <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
                Introducing Flappy AI
              </h2>
              <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                Ask Flappy AI about Aaron Cchan's projects, Android apps, games, skills, or collaboration opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('flappy-ai')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-sora text-sm font-semibold text-white bg-gradient-to-r from-[#9333ea] via-purple-600 to-[#3b82f6] shadow-xl hover:shadow-[#9333ea]/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Launch Flappy AI</span>
                <span className="material-symbols-outlined text-lg">smart_toy</span>
              </button>
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sora text-sm font-semibold text-white bg-[#24283c] hover:bg-[#2e334d] border border-[#262938] shadow-md transition-all"
              >
                <span>Get In Touch</span>
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
