import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { preloadAllImages } from '../utils/preloadImages';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start preloading all images in parallel immediately in the background
    preloadAllImages();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // Step 1: Initial state
      gsap.set(textRef.current, { opacity: 0, y: 15, filter: 'blur(10px)' });
      gsap.set(dateRef.current, { opacity: 0, scale: 0.8 });

      // Step 2: Reveal intro quote line
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.8,
        ease: 'power3.out',
        delay: 0.3
      })
      // Step 3: Reveal 08.10 date counter
      .to(dateRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.7)'
      }, '-=0.4')
      // Hold for emotional beat
      .to({}, { duration: 1.2 })
      // Fade out screen
      .to(containerRef.current, {
        opacity: 0,
        filter: 'blur(20px)',
        duration: 1.4,
        ease: 'power2.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white p-6 select-none"
    >
      <div className="max-w-xl text-center space-y-8">
        <p
          ref={textRef}
          className="font-heading italic text-2xl sm:text-3xl md:text-4xl text-stone-200/90 tracking-wide leading-relaxed font-light"
        >
          "For someone who makes ordinary moments<br className="hidden sm:inline" /> feel a little less ordinary..."
        </p>

        <div
          ref={dateRef}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full liquid-glass border border-white/10"
        >
          <span className="font-mono text-sm sm:text-base tracking-[0.35em] text-amber-200/90 font-medium pl-1">
            08.10
          </span>
        </div>
      </div>
    </div>
  );
};
