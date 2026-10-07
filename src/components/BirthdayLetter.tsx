import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

gsap.registerPlugin(ScrollTrigger);

export const BirthdayLetter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lines = el.querySelectorAll('.letter-line');

    gsap.fromTo(
      lines,
      {
        opacity: 0,
        y: 20,
        filter: 'blur(4px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="letter"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-32 text-white overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10 space-y-12">
        {/* Header Badge */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full liquid-glass border border-white/10 text-xs font-mono uppercase tracking-[0.25em] text-amber-200/80">
            <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300/30" />
            <span>A Personal Message</span>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
            A little something from me.
          </p>
        </div>

        {/* Letter Card */}
        <div className="liquid-glass-strong rounded-3xl p-8 sm:p-14 border border-white/10 relative overflow-hidden shadow-2xl">
          {/* Subtle gradient corner accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="absolute top-7 right-8">
            <Sparkles className="w-5 h-5 text-amber-200/30 stroke-[1.5]" />
          </div>

          <div className="space-y-6 font-body">
            <p className="letter-line font-heading italic text-4xl sm:text-5xl text-amber-100 font-normal">
              {BIRTHDAY_DATA.letter.salutation}
            </p>

            <div className="space-y-5 pt-2 text-stone-300 font-light text-lg sm:text-xl leading-relaxed">
              {BIRTHDAY_DATA.letter.lines.map((line, idx) => {
                const isSpecial = line.includes("Happy Birthday, Abi");
                const isHighlight = line.includes("You're one of those people for me");

                if (isSpecial) {
                  return (
                    <p key={idx} className="letter-line font-heading italic text-3xl sm:text-4xl text-amber-200 pt-4 font-normal">
                      {line}
                    </p>
                  );
                }
                if (isHighlight) {
                  return (
                    <p key={idx} className="letter-line font-heading italic text-2xl sm:text-3xl text-amber-200 font-normal py-2">
                      "{line}"
                    </p>
                  );
                }
                return (
                  <p key={idx} className="letter-line text-stone-300">
                    {line}
                  </p>
                );
              })}
            </div>

            <div className="letter-line pt-8 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-stone-500">
                With thought & care
              </span>
              <span className="font-heading italic text-3xl sm:text-4xl text-amber-200 font-bold">
                {BIRTHDAY_DATA.letter.signOff}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
