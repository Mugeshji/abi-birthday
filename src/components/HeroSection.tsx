import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Sparkles } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

interface HeroSectionProps {
  onEnter: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);
  const word3Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  // GSAP Typography Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      gsap.set([word1Ref.current, word2Ref.current, word3Ref.current], {
        opacity: 0,
        y: 60,
        rotateX: -20,
        filter: 'blur(12px)'
      });
      gsap.set([subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 30
      });

      tl.to(word1Ref.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power4.out'
      })
      .to(word2Ref.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power4.out'
      }, '-=0.8')
      .to(word3Ref.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'power4.out'
      }, '-=0.8')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6')
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.5)'
      }, '-=0.4');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 overflow-hidden text-white pt-24 pb-12 select-none"
    >
      {/* Main Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8 my-auto pt-8">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full liquid-glass-strong border border-amber-200/40 text-xs font-mono text-amber-200 uppercase tracking-[0.25em] shadow-[0_0_25px_rgba(230,200,150,0.25)] backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-300 stroke-[1.5]" />
          <span>{BIRTHDAY_DATA.hero.tagline}</span>
        </div>

        {/* Enormous Editorial Typography */}
        <div className="space-y-1 sm:space-y-2 select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          <h1
            ref={word1Ref}
            className="font-heading italic text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight leading-none text-stone-200 font-light"
          >
            {BIRTHDAY_DATA.hero.titleLine1}
          </h1>
          <h1
            ref={word2Ref}
            className="font-heading italic text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight leading-none text-white font-normal"
          >
            {BIRTHDAY_DATA.hero.titleLine2}
          </h1>
          <h1
            ref={word3Ref}
            className="font-heading italic text-7xl sm:text-9xl md:text-[10rem] lg:text-[13rem] tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-bold text-glow"
          >
            {BIRTHDAY_DATA.hero.titleLine3}
          </h1>
        </div>

        {/* Subtitles */}
        <div ref={subtitleRef} className="max-w-2xl space-y-2 pt-2">
          <p className="font-body text-lg sm:text-xl md:text-2xl text-stone-100 font-light tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {BIRTHDAY_DATA.hero.subtitle}
          </p>
        </div>

        {/* Magnetic CTA Button */}
        <div className="pt-4">
          <button
            ref={ctaRef}
            onClick={onEnter}
            className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full liquid-glass-strong hover:bg-white/20 border border-white/30 text-stone-100 font-medium text-sm sm:text-base tracking-widest uppercase transition-all duration-300 cursor-pointer hover:border-amber-200/60 hover:shadow-[0_0_40px_rgba(230,200,150,0.4)] backdrop-blur-md"
          >
            <span className="relative z-10 text-stone-100 group-hover:text-amber-200 transition-colors">
              {BIRTHDAY_DATA.hero.cta}
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-200/20 flex items-center justify-center group-hover:bg-amber-200 group-hover:text-black text-amber-200 transition-all duration-300 group-hover:translate-y-0.5">
              <ArrowDown className="w-4 h-4 stroke-[2]" />
            </div>
          </button>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 pb-4 flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-300 mb-2 drop-shadow">
          Scroll to explore
        </span>
        <div className="w-5 h-9 rounded-full border border-white/40 flex justify-center p-1 bg-black/20 backdrop-blur-sm">
          <div className="w-1 h-2 rounded-full bg-amber-200 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
