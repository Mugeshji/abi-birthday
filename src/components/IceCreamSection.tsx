import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Plus, RefreshCw, Check, Coffee, Layers, Flower2, Flame, Star, Grid2X2, IceCream } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { ImageWithFallback } from './ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

export const IceCreamSection: React.FC = () => {
  const [scoopCount, setScoopCount] = useState(3);
  const [selectedFlavor, setSelectedFlavor] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const flavors = [
    { name: "Coffee Crunch", icon: Coffee, note: "Infused with rich espresso crunch", glow: "rgba(180, 120, 70, 0.4)" },
    { name: "Dark Chocolate", icon: Layers, note: "Silky 70% Belgian chocolate", glow: "rgba(90, 50, 40, 0.4)" },
    { name: "Wild Strawberry", icon: Flower2, note: "Fresh picked summer berries", glow: "rgba(220, 80, 110, 0.4)" },
    { name: "Salted Caramel", icon: Flame, note: "Golden ribbon of sea-salt caramel", glow: "rgba(217, 140, 40, 0.4)" },
    { name: "Classic Vanilla", icon: Star, note: "Madagascar bourbon vanilla bean", glow: "rgba(240, 220, 170, 0.4)" },
    { name: "Cookies & Cream", icon: Grid2X2, note: "Crushed artisan cookie chunks", glow: "rgba(140, 140, 140, 0.4)" }
  ];

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

  const handleAddScoop = (flavorName?: string) => {
    const activeName = flavorName || flavors[selectedFlavor].name;
    setScoopCount((prev) => prev + 1);
    setToastMessage(`Added +1 scoop of ${activeName}!`);
    setShowToast(true);

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.96, rotate: 1.5 },
        { scale: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.4)' }
      );
    }

    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 1.4, rotate: 15 },
        { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(2)' }
      );
    }

    setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  const handleReset = () => {
    setScoopCount(1);
    setToastMessage('Fresh cone ready! Build your dream stack');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  return (
    <section
      id="icecream"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-24 text-white overflow-hidden"
    >
      {/* Background Soft Warm Shimmer */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-700"
        style={{ backgroundColor: flavors[selectedFlavor].glow }}
      />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Column - Text & Content (matching Coffee Section style) */}
        <div className="lg:col-span-6 space-y-8">

          <div className="flex items-center space-x-4">
            <span className="font-heading italic text-6xl text-amber-200/40 font-light">
              {BIRTHDAY_DATA.iceCream.number}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-200/30 to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
              SWEETEST RITUAL
            </span>
          </div>

          <h2 className="font-heading italic text-6xl sm:text-7xl md:text-8xl text-stone-100 font-light tracking-tight">
            {BIRTHDAY_DATA.iceCream.title}
          </h2>

          <div className="space-y-6 pt-2">
            <div className="space-y-1">
              <p className="font-heading italic text-2xl sm:text-3xl text-amber-100/90 leading-relaxed font-light">
                "{BIRTHDAY_DATA.iceCream.question} <span className="text-amber-300 font-normal">{BIRTHDAY_DATA.iceCream.answer}</span>"
              </p>
              <p className="font-body text-sm font-mono tracking-wider text-amber-200/70 uppercase">
                {BIRTHDAY_DATA.iceCream.rule}
              </p>
            </div>

            <p className="font-body text-lg sm:text-xl text-stone-300 font-light leading-relaxed">
              Because joy comes in towering scoops. Pick your favorite flavors, pile them high, and celebrate the sweetness you bring into the world every day.
            </p>
          </div>

          {/* Flavor Selection Grid */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 uppercase tracking-wider">
              <span>Choose Your Flavors</span>
              <span className="text-amber-200/80">{flavors[selectedFlavor].name} selected</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {flavors.map((flavor, idx) => {
                const isSelected = selectedFlavor === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedFlavor(idx);
                      handleAddScoop(flavor.name);
                    }}
                    className={`liquid-glass hover:liquid-glass-strong px-3.5 py-2.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group cursor-pointer ${isSelected
                        ? 'border-amber-200/60 bg-white/10 shadow-[0_0_20px_rgba(230,200,150,0.2)]'
                        : 'border-white/10 hover:border-amber-200/30'
                      }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <flavor.icon className="w-3.5 h-3.5 shrink-0 group-hover:scale-125 transition-transform text-amber-300/80" />
                      <span className={`text-xs font-body tracking-wide truncate ${isSelected ? 'text-amber-200 font-medium' : 'text-stone-300'}`}>
                        {flavor.name}
                      </span>
                    </div>
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5 text-amber-300 shrink-0 ml-1" />
                    ) : (
                      <Plus className="w-3 h-3 text-stone-500 group-hover:text-amber-200 shrink-0 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleAddScoop()}
              className="liquid-glass hover:liquid-glass-strong px-6 py-3.5 rounded-full flex items-center space-x-3 text-amber-200 hover:text-white border border-amber-200/30 transition-all cursor-pointer group shadow-lg hover:shadow-amber-500/10"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform text-amber-300 stroke-[1.5]" />
              <span className="font-body text-sm tracking-wider uppercase font-medium">
                Add Another Scoop
              </span>
              <span
                ref={badgeRef}
                className="ml-2 px-2.5 py-0.5 rounded-full bg-amber-200/20 text-xs font-mono font-bold text-amber-200"
              >
                {scoopCount}
              </span>
            </button>

            {scoopCount > 1 && (
              <button
                onClick={handleReset}
                title="Reset cone"
                className="liquid-glass hover:liquid-glass-strong p-3.5 rounded-full text-stone-400 hover:text-amber-200 border border-white/10 hover:border-amber-200/30 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 hover:rotate-180 transition-transform duration-500" />
              </button>
            )}

            {showToast && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300 flex items-center space-x-2 text-amber-200 font-heading italic text-base sm:text-lg bg-amber-950/60 px-5 py-2.5 rounded-full border border-amber-200/40 shadow-xl backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{toastMessage}</span>
              </div>
            )}
          </div>

        </div>

        {/* Right Column - Luxury Ice Cream Photo Frame & Interactive Showcase (matching Coffee Section) */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            ref={cardRef}
            onClick={() => handleAddScoop()}
            className="relative group cursor-pointer w-full max-w-md"
          >
            {/* Ambient Sparkles around frame */}
            <div className="absolute -top-6 -right-6 text-amber-300/60 animate-pulse pointer-events-none z-20">
              <Sparkles className="w-8 h-8" />
            </div>

            {/* Ice Cream Card Box */}
            <div className="liquid-glass-strong p-8 rounded-3xl border border-white/15 relative overflow-hidden transition-all duration-500 group-hover:border-amber-200/40 group-hover:shadow-[0_0_50px_rgba(230,200,150,0.25)]">

              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-amber-200/60 uppercase">
                  UNLIMITED REFILLS
                </span>
                <Sparkles className="w-5 h-5 text-amber-200/60 group-hover:text-amber-200 transition-colors" />
              </div>

              {/* Gourmet Image */}
              <div className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-amber-200/30 transition-all">
                <ImageWithFallback
                  src={BIRTHDAY_DATA.iceCream.image || "/images/icecream.jpg"}
                  alt="Gourmet Artisanal Ice Cream for Abinaya"
                  aspectRatio="landscape"
                  placeholderLabel="SWEETEST DESSERT"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Scoop Count Badge */}
                <div className="absolute bottom-3 left-3 liquid-glass-strong px-3.5 py-1.5 rounded-full border border-amber-200/40 flex items-center space-x-2 shadow-lg backdrop-blur-md">
                  <IceCream className="w-3.5 h-3.5 text-amber-300" />
                  <span className="font-mono text-xs text-amber-200 font-medium">
                    {scoopCount} {scoopCount === 1 ? 'Scoop' : 'Scoops'} Stacked
                  </span>
                </div>
              </div>

              {/* Tasting Note & Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-amber-200/80 uppercase tracking-widest">
                  <span>Current: {flavors[selectedFlavor].name}</span>
                  <span className="text-stone-400">100% Sweet Joy</span>
                </div>

                <p className="font-heading italic text-xl text-stone-200 group-hover:text-amber-100 transition-colors">
                  "{flavors[selectedFlavor].note}"
                </p>
              </div>

              {/* Footer Meta */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-body text-stone-400">
                <span className="flex items-center space-x-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
                  <span>Birthday rules: Unlimited refills</span>
                </span>
                <span className="font-mono text-[10px] text-amber-200/70 group-hover:text-amber-200 transition-colors">
                  TAP TO ADD SCOOP +
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
