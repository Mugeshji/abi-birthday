import React, { useState } from 'react';
import { Heart, Sparkles, Dog, Gift } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { ImageWithFallback } from './ImageWithFallback';

export const HarrySection: React.FC = () => {
  const [wagCount, setWagCount] = useState(0);
  const [isWagging, setIsWagging] = useState(false);

  const handleGiveTreat = () => {
    setWagCount((prev) => prev + 1);
    setIsWagging(true);
    setTimeout(() => setIsWagging(false), 1200);
  };

  return (
    <section
      id="harry"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-24 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Harry Photo Frame */}
        <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
          <div className="relative w-full max-w-md group">
            
            {/* Ambient Warm Backlight */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/10 via-amber-200/5 to-transparent rounded-3xl blur-2xl group-hover:bg-amber-400/15 transition-all duration-500" />

            <div className="liquid-glass-strong p-6 rounded-3xl border border-white/15 relative z-10 transition-all duration-500 group-hover:border-amber-200/40">
              
              {/* Photo Frame Badge */}
              <div className="flex items-center justify-between text-xs font-mono text-amber-200/80 mb-4 px-2">
                <span className="uppercase tracking-widest flex items-center space-x-2">
                  <Dog className="w-4 h-4 stroke-[1.5]" />
                  <span>HARRY'S CORNER</span>
                </span>
                <span>VIP SIDEKICK</span>
              </div>

              {/* Photo Container */}
              <div className="rounded-2xl overflow-hidden mb-6 relative">
                <ImageWithFallback
                  src={BIRTHDAY_DATA.harry.image}
                  alt="Abinaya's Dog Harry"
                  aspectRatio="portrait"
                  placeholderLabel="HARRY PHOTO"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Paw / Treat Interactive Button */}
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <p className="font-heading italic text-xl text-stone-200 flex items-center space-x-2">
                    <span>Harry the Dog</span>
                    <Dog className="w-4 h-4 text-amber-200 stroke-[1.5]" />
                  </p>
                  <p className="text-xs font-body text-stone-400">
                    Abinaya's most loyal companion
                  </p>
                </div>

                <button
                  onClick={handleGiveTreat}
                  className="liquid-glass hover:liquid-glass-strong px-4 py-2 rounded-full flex items-center space-x-2 text-xs font-mono text-amber-200 border border-amber-200/30 hover:border-amber-200 transition-all cursor-pointer"
                >
                  <Gift className={`w-4 h-4 text-amber-300 stroke-[1.5] ${isWagging ? 'animate-bounce' : ''}`} />
                  <span>Treat ({wagCount})</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
          
          <div className="flex items-center space-x-4">
            <span className="font-heading italic text-6xl text-amber-200/40 font-light">
              {BIRTHDAY_DATA.harry.number}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-200/30 to-transparent max-w-xs" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
              LOYAL SIDEKICK
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading italic text-6xl sm:text-7xl md:text-8xl text-stone-100 font-light tracking-tight">
              {BIRTHDAY_DATA.harry.title}
            </h2>
            <p className="font-heading italic text-2xl sm:text-3xl text-amber-200 font-normal">
              {BIRTHDAY_DATA.harry.subtitle}
            </p>
          </div>

          <div className="space-y-6 pt-4 text-stone-300 font-light text-lg sm:text-xl leading-relaxed">
            <p className="font-body">
              {BIRTHDAY_DATA.harry.text1}
            </p>
            <p className="font-heading italic text-2xl text-amber-100/90 font-light">
              "{BIRTHDAY_DATA.harry.text2}"
            </p>
            <p className="font-body text-stone-300">
              {BIRTHDAY_DATA.harry.text3}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
