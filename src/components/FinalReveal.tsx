import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

gsap.registerPlugin(ScrollTrigger);

interface FinalRevealProps {
  onReplay: () => void;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({ onReplay }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dateBoxRef = useRef<HTMLDivElement>(null);
  const textBigRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });

      gsap.set(dateBoxRef.current, { opacity: 0, scale: 0.8, filter: 'blur(10px)' });
      gsap.set(textBigRef.current, { opacity: 0, y: 50, filter: 'blur(15px)' });
      gsap.set(subtextRef.current, { opacity: 0, y: 30 });

      tl.to(dateBoxRef.current, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'power3.out'
      })
      .to(textBigRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.6,
        ease: 'power4.out'
      }, '-=0.6')
      .to(subtextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.8');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="final"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 py-24 text-white overflow-hidden select-none"
    >
      {/* Background Soft Starlight & Light Bloom */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-amber-500/10 via-amber-200/5 to-transparent rounded-full blur-[180px]" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-amber-200/5 rounded-full blur-[80px]" />
      </div>

      {/* Top Date Counter Reveal */}
      <div ref={dateBoxRef} className="pt-12 text-center z-10">
        <div className="inline-flex items-center space-x-6 px-8 py-3 rounded-full liquid-glass border border-amber-200/25">
          <span className="font-mono text-xl sm:text-2xl tracking-[0.3em] text-stone-300 font-light">
            08
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
          <span className="font-mono text-xl sm:text-2xl tracking-[0.3em] text-amber-200 font-light">
            OCTOBER
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
          <span className="font-mono text-xl sm:text-2xl tracking-[0.3em] text-stone-300 font-light">
            2026
          </span>
        </div>
      </div>

      {/* Main Enormous Editorial Reveal */}
      <div ref={textBigRef} className="my-auto text-center space-y-2 z-10 py-12">
        <h2 className="font-heading italic text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight leading-none text-stone-300 font-light">
          HAPPY
        </h2>
        <h2 className="font-heading italic text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight leading-none text-stone-100 font-normal">
          BIRTHDAY
        </h2>
        <h2 className="font-heading italic text-7xl sm:text-9xl md:text-[10rem] lg:text-[13rem] tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-bold text-glow">
          ABINAYA
        </h2>
      </div>

      {/* Subtitle & Signature */}
      <div ref={subtextRef} className="text-center space-y-8 z-10 max-w-xl pb-6">
        <div className="space-y-3">
          <p className="font-heading italic text-2xl sm:text-4xl text-amber-100 font-light">
            "My happiest birthday wishes to Abi."
          </p>
          <p className="font-heading italic text-2xl text-amber-200 font-semibold">
            — Mugi
          </p>
        </div>

        {/* Replay CTA */}
        <div className="pt-6 border-t border-white/10 flex flex-col items-center space-y-4">
          <button
            onClick={onReplay}
            className="group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full liquid-glass-strong hover:bg-white/10 border border-white/20 text-stone-100 font-medium text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer hover:border-amber-200/50 hover:shadow-[0_0_30px_rgba(230,200,150,0.25)]"
          >
            <RotateCcw className="w-4 h-4 text-amber-300 group-hover:rotate-[-180deg] transition-transform duration-500" />
            <span>Replay the little universe</span>
          </button>

          <p className="font-body text-xs text-stone-400 font-light flex items-center space-x-1.5 pt-2">
            <span>Made with a little coffee, a little chaos, and a lot of thought.</span>
            <Heart className="w-3 h-3 text-amber-200 fill-amber-200 inline" />
            <span className="font-mono text-amber-200/80 font-semibold">— Mugesh</span>
          </p>
        </div>
      </div>

    </section>
  );
};
