import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { GlobalCinematicBackground } from './components/GlobalCinematicBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { DoctorSection } from './components/DoctorSection';
import { CoffeeSection } from './components/CoffeeSection';
import { IceCreamSection } from './components/IceCreamSection';
import { HarrySection } from './components/HarrySection';
import { Gallery } from './components/Gallery';
import { ThingsINotice } from './components/ThingsINotice';
import { BirthdayQuiz } from './components/BirthdayQuiz';
import { CoffeeGame } from './components/CoffeeGame';
import { MemoryCards } from './components/MemoryCards';
import { BirthdayLetter } from './components/BirthdayLetter';
import { FinalReveal } from './components/FinalReveal';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-white font-body relative overflow-x-hidden selection:bg-amber-200/30 selection:text-white bg-black">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Full-Page Persistent Cinematic Video Background */}
      <GlobalCinematicBackground />

      {/* Cinematic Loading Overlay */}
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {/* Liquid Glass Navigation */}
          <Navbar onNavigate={scrollToSection} />

          {/* Main Cinematic Experience Journey */}
          <main className="relative z-10">
            <HeroSection onEnter={() => scrollToSection('intro')} />
            <IntroSection />
            <DoctorSection />
            <CoffeeSection />
            <IceCreamSection />
            <HarrySection />
            <Gallery />
            <ThingsINotice />
            <BirthdayQuiz />
            <CoffeeGame />
            <MemoryCards />
            <BirthdayLetter />
            <FinalReveal onReplay={handleReplay} />
          </main>
        </>
      )}
    </div>
  );
};

export default App;
