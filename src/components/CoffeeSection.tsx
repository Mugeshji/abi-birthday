import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { ImageWithFallback } from './ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

export const CoffeeSection: React.FC = () => {
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCupClick = () => {
    setCoffeeCount((prev) => prev + 1);
    setShowToast(true);

    if (cupRef.current) {
      gsap.fromTo(
        cupRef.current,
        { scale: 0.95, rotate: -3 },
        { scale: 1, rotate: 0, duration: 0.5, ease: 'elastic.out(1.2, 0.4)' }
      );
    }

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <section
      id="coffee"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-24 text-white overflow-hidden"
    >
      {/* Background Coffee Warmth Shimmer */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Column - Text Content */}
        <div className="lg:col-span-6 space-y-8">

          <div className="flex items-center space-x-4">
            <span className="font-heading italic text-6xl text-amber-200/40 font-light">
              {BIRTHDAY_DATA.coffee.number}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-200/30 to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
              {BIRTHDAY_DATA.coffee.badge}
            </span>
          </div>

          <h2 className="font-heading italic text-6xl sm:text-7xl md:text-8xl text-stone-100 font-light tracking-tight">
            {BIRTHDAY_DATA.coffee.title}
          </h2>

          <div className="space-y-6 pt-2">
            <p className="font-heading italic text-2xl sm:text-3xl text-amber-100/90 leading-relaxed font-light">
              "{BIRTHDAY_DATA.coffee.quote}"
            </p>
            <p className="font-body text-lg sm:text-xl text-stone-300 font-light leading-relaxed">
              {BIRTHDAY_DATA.coffee.text}
            </p>
          </div>

          <div className="pt-4 flex items-center space-x-4">
            <button
              onClick={handleCupClick}
              className="liquid-glass hover:liquid-glass-strong px-6 py-3.5 rounded-full flex items-center space-x-3 text-amber-200 hover:text-white border border-amber-200/30 transition-all cursor-pointer group"
            >
              <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform stroke-[1.5]" />
              <span className="font-body text-sm tracking-wider uppercase font-medium">
                Tap for Coffee
              </span>
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-amber-200/20 text-xs font-mono">
                {coffeeCount}
              </span>
            </button>

            {showToast && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300 flex items-center space-x-2 text-amber-200 font-heading italic text-lg bg-amber-950/40 px-5 py-2.5 rounded-full border border-amber-200/40 shadow-lg">
                <Coffee className="w-4 h-4 text-amber-300 stroke-[1.5]" />
                <span>One coffee for you</span>
              </div>
            )}
          </div>

        </div>

        {/* Right Column - Interactive Coffee Cup / Photo Frame */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            ref={cupRef}
            onClick={handleCupClick}
            className="relative group cursor-pointer w-full max-w-md"
          >
            {/* Steam animation overlays */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex space-x-4 pointer-events-none z-20">
              <div className="w-2 h-16 bg-gradient-to-t from-white/30 to-transparent rounded-full animate-steam" />
              <div className="w-1.5 h-14 bg-gradient-to-t from-white/20 to-transparent rounded-full animate-steam [animation-delay:0.7s]" />
              <div className="w-2 h-18 bg-gradient-to-t from-white/25 to-transparent rounded-full animate-steam [animation-delay:1.4s]" />
            </div>

            {/* Coffee Card Box */}
            <div className="liquid-glass-strong p-8 rounded-3xl border border-white/15 relative overflow-hidden transition-all duration-500 group-hover:border-amber-200/40 group-hover:shadow-[0_0_50px_rgba(92,58,33,0.3)]">

              <div className="absolute top-4 right-4 text-amber-200/40 group-hover:text-amber-200 transition-colors">
                <Coffee className="w-8 h-8 stroke-[1.2]" />
              </div>

              <div className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={BIRTHDAY_DATA.coffee.image || "/images/coffee.jpg"}
                  alt="Freshly Brewed Coffee for Abinaya"
                  aspectRatio="landscape"
                  placeholderLabel="COFFEE HOUR"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-amber-200/80 uppercase tracking-widest">
                  <span>Abinaya's Preferred Roast</span>
                  <span>100% Warmth</span>
                </div>
                <p className="font-heading italic text-xl text-stone-200">
                  "A little cup of quiet magic."
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-body text-stone-400">
                <span className="flex items-center space-x-1.5">
                  <Heart className="w-3.5 h-3.5 text-amber-200 fill-amber-200/20" />
                  <span>Always served with care</span>
                </span>
                <span className="font-mono text-[10px] text-amber-200/60">CLICK CUP</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
