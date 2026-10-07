import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BIRTHDAY_DATA } from '../data/birthdayData';

gsap.registerPlugin(ScrollTrigger);

export const ThingsINotice: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      // Staggered Lines Reveal with ScrollTrigger
      if (linesRef.current) {
        const lineNodes = linesRef.current.children;
        gsap.fromTo(
          lineNodes,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: linesRef.current,
              start: 'top 75%',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="things-i-notice"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-32 text-white overflow-hidden"
    >
      {/* Background Soft Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center space-y-16 relative z-10">
        
        {/* Header */}
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-200/60 liquid-glass px-4 py-1.5 rounded-full border border-amber-200/20">
            A Quiet Reflection
          </span>
          <h2
            ref={titleRef}
            className="font-heading italic text-6xl sm:text-8xl md:text-9xl text-stone-100 font-light tracking-tight"
          >
            Things I Notice<br className="hidden sm:inline" /> About You
          </h2>
        </div>

        {/* Revealing Lines */}
        <div ref={linesRef} className="space-y-8 pt-6">
          {BIRTHDAY_DATA.thingsINotice.map((line, idx) => {
            const isHighlight = idx === BIRTHDAY_DATA.thingsINotice.length - 2;
            const isClosing = idx === BIRTHDAY_DATA.thingsINotice.length - 1;

            if (isHighlight) {
              return (
                <div key={idx} className="pt-8 pb-4">
                  <p className="font-heading italic text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-normal leading-relaxed text-glow max-w-3xl mx-auto">
                    "{line}"
                  </p>
                </div>
              );
            }

            if (isClosing) {
              return (
                <div key={idx} className="pt-4">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-200/70 inline-block px-5 py-2 rounded-full liquid-glass border border-amber-200/30">
                    {line}
                  </span>
                </div>
              );
            }

            return (
              <p
                key={idx}
                className="font-body text-xl sm:text-2xl md:text-3xl text-stone-300 font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
              >
                {line}
              </p>
            );
          })}
        </div>

      </div>
    </section>
  );
};
