import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { ImageWithFallback } from './ImageWithFallback';

export const ChocolateSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      id="chocolate"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-24 bg-black text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16">

        {/* Header Block */}
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center space-x-4">
            <span className="font-heading italic text-6xl text-amber-200/40 font-light">
              {BIRTHDAY_DATA.chocolate.number}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-200/30 to-transparent max-w-xs" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
              PRIORITY LEVEL 100
            </span>
          </div>

          <h2 className="font-heading italic text-6xl sm:text-7xl md:text-8xl text-stone-100 font-light tracking-tight">
            {BIRTHDAY_DATA.chocolate.title}
          </h2>

          <div className="space-y-3 pt-2">
            <p className="font-body text-2xl sm:text-3xl text-stone-200 font-light">
              {BIRTHDAY_DATA.chocolate.line1}
            </p>
            <p className="font-heading italic text-3xl sm:text-4xl text-amber-200 font-normal">
              {BIRTHDAY_DATA.chocolate.line2}
            </p>
            <p className="font-body text-lg text-amber-200/80 font-mono pt-2">
              "{BIRTHDAY_DATA.chocolate.playful}"
            </p>
          </div>
        </div>

        {/* Chocolate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BIRTHDAY_DATA.chocolate.cards.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveCard(idx)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => setActiveCard(idx)}
              className={`liquid-glass hover:liquid-glass-strong p-6 rounded-3xl border border-white/10 transition-all duration-500 cursor-pointer group flex flex-col justify-between min-h-[240px] relative overflow-hidden ${activeCard === idx ? 'border-amber-200/50 shadow-[0_0_35px_rgba(230,200,150,0.15)] translate-y-[-4px]' : ''
                }`}
            >
              {/* Card top badge */}
              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <span>02.{idx + 1}</span>
                <Sparkles className={`w-4 h-4 transition-colors ${activeCard === idx ? 'text-amber-300' : 'text-stone-600'}`} />
              </div>

              {/* Card Title */}
              <div className="my-auto py-4">
                <h3 className="font-heading italic text-3xl text-stone-100 group-hover:text-amber-100 transition-colors">
                  {card.title}
                </h3>
              </div>

              {/* Card Secret Reveal Note */}
              <div className="pt-4 border-t border-white/10">
                <div className={`transition-all duration-300 ${activeCard === idx ? 'opacity-100 translate-y-0' : 'opacity-70 group-hover:opacity-100'}`}>
                  <p className="font-heading italic text-lg text-amber-200 flex items-center space-x-2">
                    <Heart className="w-3.5 h-3.5 fill-amber-200/30 text-amber-200 shrink-0" />
                    <span>{card.note}</span>
                  </p>
                </div>
              </div>

              {/* Hover Ambient Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Featured Chocolate Image Banner */}
        <div className="liquid-glass-strong rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/3">
            <ImageWithFallback
              src="/images/chocolate.jpg"
              alt="Abinaya's Chocolate Collection"
              aspectRatio="landscape"
              placeholderLabel="CHOCOLATE VAULT"
              className="rounded-2xl object-cover w-full"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-200/70">
              OFFICIAL VERDICT
            </span>
            <p className="font-heading italic text-2xl sm:text-3xl text-stone-200 leading-relaxed font-light">
              "Life is short. Eat the chocolate first. Especially on October 8th."
            </p>
            <p className="font-body text-sm text-stone-400">
              — Undisputed rules of Abinaya's birthday universe
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
