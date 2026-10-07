import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BIRTHDAY_DATA } from '../data/birthdayData';

gsap.registerPlugin(ScrollTrigger);

export const IntroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Reveal Text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Staggered Tags
      if (tagsRef.current) {
        const tagElements = tagsRef.current.children;
        gsap.fromTo(
          tagElements,
          { opacity: 0, scale: 0.9, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: tagsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative min-h-[90vh] w-full flex flex-col items-center justify-center px-6 py-28 text-white"
    >
      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
        
        {/* Editorial Sub-header */}
        <div className="inline-block">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-amber-200 liquid-glass-strong px-5 py-2 rounded-full border border-amber-200/30 backdrop-blur-md shadow-lg">
            A Birthday Dedicated To You
          </span>
        </div>

        {/* Huge Heading */}
        <h2
          ref={headingRef}
          className="font-heading italic text-5xl sm:text-7xl md:text-8xl text-stone-100 leading-tight font-light drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
        >
          {BIRTHDAY_DATA.intro.header}
        </h2>

        {/* Revealing Subhead */}
        <p
          ref={textRef}
          className="font-body text-xl sm:text-2xl md:text-3xl text-amber-100 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
        >
          {BIRTHDAY_DATA.intro.subhead}
        </p>

        {/* Interactive Staggered Item Chips */}
        <div
          ref={tagsRef}
          className="flex flex-wrap items-center justify-center gap-3 pt-6 max-w-3xl mx-auto"
        >
          {BIRTHDAY_DATA.intro.tags.map((tag, idx) => (
            <div
              key={idx}
              className={`liquid-glass-strong hover:bg-white/20 px-5 py-3 rounded-full border border-white/20 transition-all duration-300 group backdrop-blur-md shadow-lg ${
                idx === 0 || idx === BIRTHDAY_DATA.intro.tags.length - 1
                  ? 'border-amber-200/50 text-amber-200 font-medium'
                  : 'text-stone-200 hover:text-white hover:border-amber-200/40'
              }`}
            >
              <span className="font-body text-base sm:text-lg tracking-wide group-hover:scale-105 inline-block transition-transform">
                {tag}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
