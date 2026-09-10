import React, { useState, useEffect } from 'react';
import { ActiveScreen } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { ProjectsScreen } from './components/ProjectsScreen';
import { AndroidScreen } from './components/AndroidScreen';
import { FlappyAIScreen } from './components/FlappyAIScreen';
import { FlappyAIModal } from './components/FlappyAIModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [contactOpen, setContactOpen] = useState(false);
  const [flappyOpen, setFlappyOpen] = useState(false);

  const handleNavigate = (screen: ActiveScreen) => {
    if (screen === 'contact') {
      setContactOpen(true);
      return;
    }

    if (screen === 'flappy-ai') {
      setFlappyOpen(true);
      return;
    }

    setActiveScreen(screen);

    const anchorMap: Partial<Record<ActiveScreen, string>> = {
      about: 'about',
      skills: 'skills',
      journey: 'journey',
      services: 'services',
      creative: 'creative-section',
    };

    const targetId = anchorMap[screen];
    if (targetId) {
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Screen selection mapping
  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
      case 'about':
      case 'skills':
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            onOpenContact={() => setContactOpen(true)}
          />
        );
      case 'projects':
      case 'journey':
      case 'services':
        return (
          <ProjectsScreen
            onNavigate={handleNavigate}
            onOpenContact={() => setContactOpen(true)}
          />
        );
      case 'android':
      case 'creative':
        return (
          <AndroidScreen
            onNavigate={handleNavigate}
            onOpenContact={() => setContactOpen(true)}
          />
        );
      case 'flappy-ai':
        return (
          <FlappyAIScreen
            onNavigate={handleNavigate}
            onOpenContact={() => setContactOpen(true)}
          />
        );
      default:
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            onOpenContact={() => setContactOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#08090f] text-[#f9fafb] flex flex-col font-manrope selection:bg-[#9333ea]/40 selection:text-white antialiased">
      {/* Top Fixed Header */}
      <Navbar
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        onOpenFlappyAI={() => setFlappyOpen(true)}
        isFlappyOpen={flappyOpen}
      />

      {/* Main Screen Content Area */}
      <main className="flex-1 pt-20 flex flex-col">
        {renderScreen()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      {/* Flappy AI Full-Height Modal Panel */}
      <FlappyAIModal
        isOpen={flappyOpen}
        onClose={() => setFlappyOpen(false)}
        onNavigate={handleNavigate}
        onOpenContact={() => {
          setFlappyOpen(false);
          setContactOpen(true);
        }}
      />
    </div>
  );
}
