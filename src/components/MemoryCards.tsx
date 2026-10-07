import React, { useState } from 'react';
import { Sparkles, ChevronRight, ChevronLeft, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

export const MemoryCards: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev + 1) % BIRTHDAY_DATA.cards.length);
  };

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev - 1 + BIRTHDAY_DATA.cards.length) % BIRTHDAY_DATA.cards.length);
  };

  return (
    <section
      id="cards"
      className="relative min-h-[90vh] w-full flex flex-col justify-center items-center px-6 py-28 text-white overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full text-center space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full liquid-glass border border-white/10 text-xs font-mono uppercase tracking-[0.25em] text-amber-200/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Gentle Reminders</span>
          </div>
          <h2 className="font-heading italic text-5xl sm:text-7xl text-stone-100 font-light">
            A few things I'd like you to remember.
          </h2>
        </div>

        {/* 3D Stack / Card Display */}
        <div className="relative max-w-3xl mx-auto h-[420px] sm:h-[380px] flex items-center justify-center">
          {BIRTHDAY_DATA.cards.map((card, idx) => {
            const isCurrent = idx === activeCardIndex;
            const isNext = idx === (activeCardIndex + 1) % BIRTHDAY_DATA.cards.length;
            const isPrev = idx === (activeCardIndex - 1 + BIRTHDAY_DATA.cards.length) % BIRTHDAY_DATA.cards.length;

            let cardStyle = "opacity-0 pointer-events-none scale-90 translate-y-12";

            if (isCurrent) {
              cardStyle = "opacity-100 z-30 scale-100 translate-y-0 shadow-[0_20px_50px_rgba(230,200,150,0.15)]";
            } else if (isNext) {
              cardStyle = "opacity-40 z-20 scale-95 translate-y-4 translate-x-4 pointer-events-none";
            } else if (isPrev) {
              cardStyle = "opacity-40 z-10 scale-90 -translate-y-4 -translate-x-4 pointer-events-none";
            }

            return (
              <div
                key={card.id}
                onClick={isCurrent ? handleNext : undefined}
                className={`absolute inset-0 liquid-glass-strong rounded-3xl p-8 sm:p-12 border border-white/20 flex flex-col justify-between transition-all duration-500 cursor-pointer ${cardStyle}`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>CARD 0{card.id} OF 0{BIRTHDAY_DATA.cards.length}</span>
                  <Heart className={`w-4 h-4 ${card.highlight ? 'text-amber-300 fill-amber-300' : 'text-stone-500'}`} />
                </div>

                <div className="my-auto py-6 flex items-center justify-center">
                  <p className={`font-heading italic text-2xl sm:text-3xl md:text-4xl leading-relaxed break-words ${card.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-normal text-glow' : 'text-stone-100 font-light'}`}>
                    "{card.text}"
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-amber-200/70 pt-4 border-t border-white/10">
                  <span>TAP CARD FOR NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Navigation Controls */}
        <div className="flex items-center justify-center space-x-6 pt-4">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full liquid-glass hover:liquid-glass-strong text-stone-300 hover:text-amber-200 border border-white/15 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="font-mono text-xs text-stone-400 uppercase tracking-widest">
            {activeCardIndex + 1} / {BIRTHDAY_DATA.cards.length}
          </span>

          <button
            onClick={handleNext}
            className="p-3 rounded-full liquid-glass hover:liquid-glass-strong text-stone-300 hover:text-amber-200 border border-white/15 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
