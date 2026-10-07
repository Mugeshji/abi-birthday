import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_080827_a9e5ad52-b6ee-4e79-b393-d936f179cfd7.mp4';

export const GlobalCinematicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const strength = 18;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * strength;
      targetY = ((e.clientY - cy) / cy) * strength;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (containerRef.current) {
        gsap.set(containerRef.current, { x: currentX, y: currentY });
      }
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateParallax);

    // Ensure video plays smoothly
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-black">
      {/* Parallax Container */}
      <div
        ref={containerRef}
        className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] scale-105 origin-center"
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="w-full h-full object-cover opacity-75 filter brightness-110 contrast-105"
        />
      </div>

      {/* Cinematic Vignette & Atmospheric Light Bleed */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
};
