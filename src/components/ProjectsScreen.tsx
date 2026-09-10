import React from 'react';
import { ActiveScreen } from '../types';
import { MILESTONES, SERVICES, PORTFOLIO_INFO } from '../data/portfolioData';

interface ProjectsScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenContact: () => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Ambient Atmospheric Glows */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[550px] h-[550px] bg-[#9333ea]/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute top-96 right-10 w-[500px] h-[500px] bg-[#3b82f6]/15 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        <div className="absolute top-[1500px] left-10 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[180px] pointer-events-none -z-10"></div>

        {/* 1. Header & Breadcrumb Section */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pt-12 pb-8 w-full">
          <div className="flex flex-col gap-3 max-w-4xl">
            {/* Breadcrumb Pill */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#1c1f30]/80 border border-[#262938]/60 text-[#c084fc] shadow-sm backdrop-blur-md">
              <span className="material-symbols-outlined text-sm text-[#3b82f6]">folder_open</span>
              <span className="font-sora text-xs uppercase tracking-widest text-[#c084fc] font-semibold">
                PORTFOLIO INDEX
              </span>
              <span className="text-[#374151]">•</span>
              <span className="text-xs text-[#9ca3af]">Selected Works</span>
            </div>

            <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight leading-tight">
              Projects &amp; Featured Work
            </h1>

            <p className="text-base sm:text-lg text-[#9ca3af] max-w-3xl">
              Explore custom AI agents, web applications, and interactive mobile builds.
            </p>
          </div>
        </section>

        {/* 2. Featured Project (Prominent Spotlight Card) */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 mb-16 md:mb-24 w-full">
          <div className="relative rounded-3xl p-1 bg-gradient-to-r from-[#9333ea] via-purple-500/50 to-[#3b82f6] shadow-[0_0_50px_-10px_rgba(147,51,234,0.35)] overflow-hidden">
            <div className="rounded-[22px] bg-[#13151f] p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
              {/* Subtle Background Glows inside Card */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#9333ea]/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#3b82f6]/20 rounded-full blur-3xl pointer-events-none"></div>

              {/* Content Left */}
              <div className="flex flex-col gap-5 flex-1 max-w-2xl z-10">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Completed
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#9333ea]/20 border border-[#9333ea]/40 text-xs text-[#c084fc] font-sora font-semibold">
                    AI Assistant
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#1c1f30] text-[#9ca3af] text-xs font-medium">
                    Featured Spotlight
                  </span>
                </div>

                {/* Project Title & Subtitle */}
                <div className="flex flex-col gap-1">
                  <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
                    Flappy – Personal AI
                  </h2>
                  <span className="font-sora text-sm text-[#3b82f6] font-medium">
                    Intelligent Conversational Companion
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                  A personal AI assistant designed for natural conversations, helpful interactions, and an engaging conversational experience.
                </p>

                {/* Core Capability Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-[#08090f]/80 border border-[#262938]/60 my-1">
                  <div className="flex flex-col p-2">
                    <span className="text-[11px] text-[#374151] uppercase font-semibold">Interaction Mode</span>
                    <span className="font-sora text-xs md:text-sm text-white font-medium">Natural Dialogue</span>
                  </div>
                  <div className="flex flex-col p-2">
                    <span className="text-[11px] text-[#374151] uppercase font-semibold">Personality Core</span>
                    <span className="font-sora text-xs md:text-sm text-[#c084fc] font-medium">Adaptive &amp; Helpful</span>
                  </div>
                  <div className="flex flex-col p-2">
                    <span className="text-[11px] text-[#374151] uppercase font-semibold">Experience</span>
                    <span className="font-sora text-xs md:text-sm text-[#3b82f6] font-medium">Engaging UX</span>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onNavigate('flappy-ai')}
                    className="py-3 px-6 rounded-xl font-sora text-xs md:text-sm font-semibold text-white bg-gradient-to-r from-[#9333ea] to-[#3b82f6] shadow-lg hover:shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Explore Project</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => onNavigate('flappy-ai')}
                    className="py-3 px-6 rounded-xl font-sora text-xs md:text-sm font-semibold bg-[#1c1f30] border border-[#262938] text-white hover:bg-[#24283c] hover:border-[#c084fc]/50 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[#c084fc] text-base">smart_toy</span>
                    <span>Ask Flappy AI</span>
                  </button>
                </div>
              </div>

              {/* Graphic / Interactive Display Container Right */}
              <div className="w-full lg:w-[420px] flex flex-col items-center justify-center z-10">
                <div className="w-full rounded-2xl bg-[#08090f]/90 border border-[#c084fc]/30 p-6 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-[#262938]/60 pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9333ea] to-purple-400 flex items-center justify-center text-white font-bold text-xs">
                        F
                      </div>
                      <div>
                        <div className="font-sora text-xs font-semibold text-white">Flappy AI</div>
                        <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online &amp; Ready
                        </div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#374151] text-lg">auto_awesome</span>
                  </div>

                  {/* Simulated Conversation Snippet */}
                  <div className="flex flex-col gap-2.5">
                    <div className="p-3 rounded-xl bg-[#1c1f30]/60 border border-[#262938]/50 text-[#9ca3af] text-xs self-start max-w-[90%]">
                      "Hello! How can I assist you with your day, projects, or creative ideas today?"
                    </div>
                    <div className="p-3 rounded-xl bg-[#9333ea]/20 border border-[#9333ea]/40 text-[#c084fc] text-xs self-end max-w-[85%] text-right font-medium">
                      "Help me organize a roadmap for my new app build."
                    </div>
                    <div className="p-3 rounded-xl bg-[#1c1f30]/60 border border-[#262938]/50 text-white text-xs self-start max-w-[95%]">
                      "I've outlined a modular architecture and step-by-step phases ready for review."
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#262938]/60 flex items-center justify-between text-[#9ca3af] text-xs font-mono">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#3b82f6]">verified_user</span>
                      Responsive conversational flow
                    </span>
                    <span className="text-[#c084fc] font-semibold">Personal Agent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Journey Milestones (The 5 exact journey categories) */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 mb-16 md:mb-24 w-full" id="journey">
          <div className="flex flex-col gap-6">
            {/* Section Title */}
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#1c1f30] border border-[#262938]/60 text-[#3b82f6]">
                <span className="material-symbols-outlined text-sm">timeline</span>
                <span className="font-sora text-xs uppercase tracking-widest font-semibold">
                  EVOLUTION &amp; CRAFT
                </span>
              </div>
              <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
                Milestones &amp; Development Journey
              </h2>
              <p className="text-sm md:text-base text-[#9ca3af] max-w-2xl">
                A chronological overview of development practice across software, web, and mobile ecosystems.
              </p>
            </div>

            {/* Milestone Cards Stack */}
            <div className="relative flex flex-col gap-4 mt-2">
              {/* Timeline vertical line on desktop */}
              <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#9333ea] via-[#3b82f6] to-pink-500/20 -z-0"></div>

              {MILESTONES.map((m) => {
                const isPurple = m.color === 'primary';
                const isBlue = m.color === 'secondary';
                return (
                  <div
                    key={m.id}
                    className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-5 md:p-6 rounded-2xl bg-[#11131c]/90 border border-[#262938]/60 hover:border-[#c084fc]/50 hover:bg-[#151722] transition-all group shadow-md"
                  >
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
                        isPurple
                          ? 'bg-[#9333ea]/20 border border-[#9333ea]/40 text-[#c084fc] shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                          : isBlue
                          ? 'bg-[#3b82f6]/15 border border-[#3b82f6]/40 text-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                          : 'bg-pink-500/15 border border-pink-500/40 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl md:text-3xl">{m.icon}</span>
                    </div>

                    <div className="flex flex-col flex-1 gap-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-sora text-base md:text-lg text-white group-hover:text-[#c084fc] transition-colors font-semibold">
                          {m.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                            isPurple
                              ? 'bg-[#9333ea]/15 border border-[#9333ea]/30 text-[#c084fc]'
                              : isBlue
                              ? 'bg-[#3b82f6]/15 border border-[#3b82f6]/30 text-[#adc6ff]'
                              : 'bg-pink-500/15 border border-pink-500/30 text-pink-300'
                          }`}
                        >
                          {isPurple && <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-pulse"></span>}
                          {m.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Services Showcase (The EXACT 7 services) */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 mb-16 md:mb-24 w-full" id="services">
          <div className="flex flex-col gap-8 p-6 sm:p-10 md:p-12 rounded-3xl bg-[#11131d] border border-[#262938]/60 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#9333ea]/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#1c1f30] border border-[#262938]/60 text-[#c084fc]">
                <span className="material-symbols-outlined text-sm">build</span>
                <span className="font-sora text-xs uppercase tracking-widest font-semibold">
                  DELIVERY OFFERINGS
                </span>
              </div>
              <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight">
                Services &amp; Capabilities
              </h2>
              <p className="text-xs sm:text-sm text-[#9ca3af] max-w-2xl">
                Tailored digital solutions built from concept through deployment with precision standards and user-first utility.
              </p>
            </div>

            {/* 7 Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((s) => {
                const isPurple = s.color === 'primary';
                const isBlue = s.color === 'secondary';
                return (
                  <div
                    key={s.id}
                    onClick={onOpenContact}
                    className="p-5 md:p-6 rounded-2xl bg-[#151722] border border-[#262938]/60 hover:border-[#c084fc]/60 hover:bg-[#1c1f30] transition-all flex flex-col justify-between gap-4 group shadow-sm cursor-pointer"
                  >
                    <div className="flex flex-col gap-2">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                          isPurple
                            ? 'bg-[#9333ea]/20 border border-[#9333ea]/30 text-[#c084fc]'
                            : isBlue
                            ? 'bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-[#3b82f6]'
                            : 'bg-pink-500/20 border border-pink-500/30 text-pink-400'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">{s.icon}</span>
                      </div>
                      <h3 className="font-sora text-base text-white group-hover:text-[#c084fc] transition-colors font-semibold mt-1">
                        {s.title}
                      </h3>
                      <p className="text-xs text-[#9ca3af] leading-relaxed">
                        {s.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center text-[#c084fc] text-xs font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Explore Capabilities</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Inquiry / Collaboration Banner */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 mb-20 w-full" id="contact-banner">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1c142e] via-[#11131c] to-[#0f1424] border border-[#c084fc]/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_0_40px_rgba(147,51,234,0.25)] relative overflow-hidden">
            <div className="absolute -left-20 top-0 w-72 h-72 bg-[#3b82f6]/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col gap-3 max-w-2xl z-10">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#9333ea]/15 border border-[#9333ea]/30 text-[#c084fc]">
                <span className="material-symbols-outlined text-sm">mail</span>
                <span className="font-sora text-xs uppercase tracking-widest font-semibold">
                  GET IN TOUCH
                </span>
              </div>
              <h3 className="font-sora text-2xl sm:text-3xl text-white font-bold">
                Interested in collaborating or have a project in mind?
              </h3>
              <p className="text-xs sm:text-sm text-[#9ca3af]">
                Whether you need a bespoke conversational assistant, an offline-first mobile app, or modern web engineering, let's connect and build it.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-white">
                <a
                  href={`mailto:${PORTFOLIO_INFO.email}`}
                  className="flex items-center gap-2 text-xs text-white hover:text-[#c084fc] transition-colors"
                  title={`Email Aaron directly at ${PORTFOLIO_INFO.email}`}
                >
                  <span className="material-symbols-outlined text-[#c084fc] text-base">
                    alternate_email
                  </span>
                  <span>{PORTFOLIO_INFO.email}</span>
                </a>
                <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                  <span className="material-symbols-outlined text-[#3b82f6] text-base">
                    location_on
                  </span>
                  <span>{PORTFOLIO_INFO.location}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto z-10">
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-sora text-xs md:text-sm bg-gradient-to-r from-[#9333ea] via-purple-600 to-[#3b82f6] text-white font-semibold shadow-lg hover:shadow-xl hover:brightness-110 transition-all text-center"
              >
                Get in Touch
              </button>
              <button
                onClick={() => onNavigate('flappy-ai')}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-sora text-xs md:text-sm bg-[#1c1f30] border border-[#262938] text-white hover:bg-[#24283c] transition-all text-center flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[#c084fc] text-base">smart_toy</span>
                <span>Ask Flappy AI</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
