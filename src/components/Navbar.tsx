import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Heart, Stethoscope } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'intro', 'coffee', 'doctor', 'icecream', 'harry', 'gallery', 'things-i-notice', 'quiz', 'game', 'cards', 'letter', 'final'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= 0) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Her Story', target: 'intro' },
    { label: 'Dr. Abinaya', target: 'doctor' },
    { label: 'Little Things', target: 'coffee' },
    { label: 'Memories', target: 'gallery' },
    { label: 'Play', target: 'quiz' },
    { label: 'Letter', target: 'letter' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-5 transition-all duration-500 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Custom Logo Pill */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="pointer-events-auto liquid-glass-strong hover:bg-white/15 px-4 py-2 rounded-full flex items-center space-x-2.5 transition-all duration-300 group cursor-pointer border border-white/20 shadow-xl"
        >
          <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-200/20 to-amber-100/40 border border-white/20 flex items-center justify-center font-heading italic text-amber-200 text-lg font-bold group-hover:scale-105 transition-transform">
            A
          </span>
          <span className="font-mono text-xs tracking-[0.25em] text-stone-200 font-medium group-hover:text-white transition-colors">
            {BIRTHDAY_DATA.dateShort}
          </span>
        </button>

        {/* Desktop Liquid Glass Pill Nav */}
        <nav className="hidden md:flex pointer-events-auto liquid-glass-strong px-6 py-2.5 rounded-full items-center space-x-7 border border-white/20 shadow-2xl backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleLinkClick(item.target)}
              className={`text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 relative py-1 cursor-pointer ${
                activeSection === item.target || (item.target === 'coffee' && ['coffee', 'icecream', 'harry'].includes(activeSection))
                  ? 'text-amber-200'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {item.label}
              {(activeSection === item.target || (item.target === 'coffee' && ['coffee', 'icecream', 'harry'].includes(activeSection))) && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-200 to-transparent rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Badge CTA */}
        <div className="hidden md:flex pointer-events-auto">
          <div className="liquid-glass-strong px-4 py-2 rounded-full flex items-center space-x-2 text-xs font-mono text-amber-200 border border-amber-200/30 shadow-xl">
            <Heart className="w-3.5 h-3.5 fill-amber-200/30 stroke-amber-200" />
            <span className="tracking-widest uppercase">For Abinaya</span>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden pointer-events-auto liquid-glass-strong p-2.5 rounded-full text-white/90 hover:text-white transition-colors cursor-pointer border border-white/20 shadow-xl"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto fixed inset-x-4 top-20 z-50 liquid-glass-strong rounded-3xl p-6 border border-white/20 flex flex-col space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-heading italic text-xl text-amber-200">
              A Birthday Universe
            </span>
            <span className="text-[10px] font-mono tracking-widest text-stone-300 uppercase">
              October 8th
            </span>
          </div>
          <div className="flex flex-col space-y-3 pt-2">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleLinkClick(item.target)}
                className="text-left font-heading italic text-2xl text-stone-200 hover:text-amber-200 py-1 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <Sparkles className="w-4 h-4 text-amber-200/50" />
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-stone-400">
            <span>Created for Abinaya</span>
            <span className="text-amber-200 font-semibold">— Mugi</span>
          </div>
        </div>
      )}
    </header>
  );
};
