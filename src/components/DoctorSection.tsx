import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Heart, Stethoscope, Building2, ShieldCheck } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';

gsap.registerPlugin(ScrollTrigger);

export const DoctorSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [heartRate, setHeartRate] = useState(72);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ecgCanvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamic ECG Heartbeat animation loop on canvas
  useEffect(() => {
    const canvas = ecgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let x = 0;
    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;

    // Reset background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, width, height);

    const step = () => {
      // Fade trailing line softly
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, width, height);

      // Grid dots
      ctx.fillStyle = 'rgba(230, 200, 150, 0.08)';
      for (let gx = 0; gx < width; gx += 40) {
        for (let gy = 0; gy < height; gy += 40) {
          ctx.fillRect(gx, gy, 1.5, 1.5);
        }
      }

      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#e6c896';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#e6c896';

      const prevX = x;
      x = (x + 3) % width;

      // Calculate ECG waveform Y
      let y = midY;
      const cycle = x % 160;

      if (cycle > 50 && cycle < 60) {
        y = midY - 12; // P wave
      } else if (cycle > 70 && cycle < 75) {
        y = midY + 8; // Q dip
      } else if (cycle >= 75 && cycle < 85) {
        y = midY - 60; // R peak (UP)
      } else if (cycle >= 85 && cycle < 95) {
        y = midY + 35; // S valley (DOWN)
      } else if (cycle > 110 && cycle < 130) {
        y = midY - 18; // T wave
      } else {
        y = midY + (Math.random() * 2 - 1); // Baseline rhythm
      }

      ctx.moveTo(prevX, midY);
      ctx.lineTo(x, y);
      ctx.stroke();

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    // Heart rate fluctuation
    const hrInterval = setInterval(() => {
      setHeartRate(Math.floor(70 + Math.random() * 8));
    }, 2000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(hrInterval);
    };
  }, []);

  return (
    <section
      id="doctor"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16 relative z-10">

        {/* Header Block */}
        <div className="space-y-6 max-w-4xl">
          <div className="flex items-center space-x-4">
            <span className="font-heading italic text-6xl text-amber-200/40 font-light">
              {BIRTHDAY_DATA.doctor.number}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-200/40 to-transparent max-w-xs" />
            <div className="flex items-center space-x-2 liquid-glass-strong px-4 py-1.5 rounded-full border border-amber-200/30 text-xs font-mono uppercase tracking-[0.25em] text-amber-200">
              <Building2 className="w-3.5 h-3.5" />
              <span>{BIRTHDAY_DATA.doctor.badge}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading italic text-6xl sm:text-7xl md:text-8xl text-stone-100 font-light tracking-tight">
              {BIRTHDAY_DATA.doctor.title}
            </h2>
            <p className="font-heading italic text-2xl sm:text-3xl text-amber-200 flex items-center space-x-3">
              <Stethoscope className="w-6 h-6 stroke-[1.5] text-amber-300" />
              <span>{BIRTHDAY_DATA.doctor.hospital}</span>
            </p>
          </div>

          {/* Life Philosophy Quote & ECG Heartbeat Monitor Box */}
          <div className="liquid-glass-strong p-8 rounded-3xl border border-amber-200/30 relative overflow-hidden shadow-[0_0_50px_rgba(230,200,150,0.15)] space-y-6">

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3 text-xs font-mono text-amber-200/90 tracking-widest uppercase">
                <Activity className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>ACTIVE CARDIAC RHYTHM • LIVE MONITOR</span>
              </div>
              <div className="flex items-center space-x-4 text-xs font-mono">
                <span className="text-stone-400">PULSE:</span>
                <span className="text-xl font-bold text-amber-300 flex items-center space-x-1">
                  <span>{heartRate}</span>
                  <span className="text-xs font-normal text-amber-200/70">BPM</span>
                </span>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400/40 animate-ping" />
              </div>
            </div>

            {/* Interactive Animated ECG Canvas */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/90">
              <canvas
                ref={ecgCanvasRef}
                width={800}
                height={160}
                className="w-full h-36 sm:h-40 block"
              />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-amber-200/60 uppercase">
                ECG: LEAD II • REAL-TIME HEARTBEAT
              </div>
            </div>

            {/* The Metaphor of Life */}
            <div className="space-y-3 pt-2">
              <p className="font-heading italic text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-normal leading-relaxed text-glow">
                "{BIRTHDAY_DATA.doctor.ecgQuote}"
              </p>
              <p className="font-body text-base sm:text-lg text-stone-300 font-light leading-relaxed">
                {BIRTHDAY_DATA.doctor.philosophy}
              </p>
            </div>

          </div>
        </div>

        {/* 4 Tribute Cards (Doctor, Family, Father, ECG Philosophy) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BIRTHDAY_DATA.doctor.cards.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveCard(idx)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => setActiveCard(idx)}
              className={`liquid-glass hover:liquid-glass-strong p-6 rounded-3xl border border-white/15 transition-all duration-500 cursor-pointer group flex flex-col justify-between min-h-[260px] relative overflow-hidden backdrop-blur-md ${activeCard === idx ? 'border-amber-200/60 shadow-[0_0_35px_rgba(230,200,150,0.25)] translate-y-[-4px]' : ''
                }`}
            >
              {/* Card top badge */}
              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <span className="text-amber-200/80 font-medium">{card.id}</span>
                {idx === 0 && <Stethoscope className="w-4 h-4 text-amber-300" />}
                {idx === 1 && <Heart className="w-4 h-4 text-rose-400 fill-rose-400/30" />}
                {idx === 2 && <ShieldCheck className="w-4 h-4 text-amber-300" />}
                {idx === 3 && <Activity className="w-4 h-4 text-amber-300 animate-pulse" />}
              </div>

              {/* Card Title */}
              <div className="my-auto py-3 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-200/70 block">
                  {card.subtitle}
                </span>
                <h3 className="font-heading italic text-3xl text-stone-100 group-hover:text-amber-100 transition-colors">
                  {card.title}
                </h3>
              </div>

              {/* Card Note */}
              <div className="pt-3 border-t border-white/10">
                <p className="font-body text-sm text-stone-300 font-light leading-relaxed">
                  {card.note}
                </p>
              </div>

              {/* Ambient Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Devotion Banner */}
        <div className="liquid-glass-strong rounded-3xl p-8 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
          <div className="w-16 h-16 rounded-full liquid-glass border border-amber-200/40 flex items-center justify-center text-amber-200 shrink-0 shadow-lg">
            <Heart className="w-8 h-8 fill-amber-200/20 stroke-[1.5]" />
          </div>
          <div className="space-y-2 text-left flex-1">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-200/80">
              FAMILY • LOVE • DEVOTION
            </span>
            <p className="font-heading italic text-2xl sm:text-3xl text-stone-100 leading-relaxed font-light">
              "{BIRTHDAY_DATA.doctor.familyText}"
            </p>
            <p className="font-body text-xs font-mono text-stone-400">
              A heart rooted in endless family love and boundless compassion.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
