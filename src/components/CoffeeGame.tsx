import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Sparkles, Coffee, Flame } from 'lucide-react';

interface FallingItem {
  id: number;
  x: number; // percentage
  y: number; // px from top
  speed: number;
  type: 'coffee' | 'chocolate' | 'icecream';
}

export const CoffeeGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [cupX, setCupX] = useState(50); // percentage 0 - 100

  const itemsRef = useRef<FallingItem[]>([]);
  const [, setRenderTrigger] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const itemIdCounterRef = useRef(0);

  // Key controls
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setCupX((prev) => Math.max(10, prev - 8));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setCupX((prev) => Math.min(90, prev + 8));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Touch & Mouse Movement in game area
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPlaying || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const percentage = Math.max(10, Math.min(90, (relativeX / rect.width) * 100));
    setCupX(percentage);
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setIsPlaying(false);
          setGameCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    let animationFrameId: number;

    const spawnInterval = setInterval(() => {
      if (itemsRef.current.length < 8) {
        const types: Array<'coffee' | 'chocolate' | 'icecream'> = ['coffee', 'chocolate', 'icecream'];
        const itemType = types[Math.floor(Math.random() * types.length)];
        
        itemsRef.current.push({
          id: ++itemIdCounterRef.current,
          x: Math.floor(Math.random() * 80) + 10,
          y: 0,
          speed: Math.random() * 2 + 2.5,
          type: itemType,
        });
      }
    }, 500);

    const updateLoop = () => {
      const containerHeight = gameAreaRef.current?.clientHeight || 400;

      itemsRef.current = itemsRef.current
        .map((item) => ({ ...item, y: item.y + item.speed }))
        .filter((item) => {
          if (item.y >= containerHeight - 80 && item.y <= containerHeight - 20) {
            if (Math.abs(item.x - cupX) < 14) {
              setScore((s) => s + 1);
              return false;
            }
          }
          return item.y < containerHeight;
        });

      setRenderTrigger((r) => r + 1);
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, cupX]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(20);
    setCupX(50);
    itemsRef.current = [];
    setGameCompleted(false);
    setIsPlaying(true);
  };

  const getItemIcon = (type: 'coffee' | 'chocolate' | 'icecream') => {
    switch (type) {
      case 'coffee':
        return <Coffee className="w-5 h-5 text-amber-300 stroke-[1.5]" />;
      case 'chocolate':
        return <Flame className="w-5 h-5 text-amber-200 stroke-[1.5]" />;
      case 'icecream':
        return <Sparkles className="w-5 h-5 text-amber-100 stroke-[1.5]" />;
    }
  };

  return (
    <section
      id="game"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 text-white overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full space-y-10 relative z-10">
        
        {/* Game Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full liquid-glass border border-amber-200/20 text-xs font-mono uppercase tracking-[0.25em] text-amber-200/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Mini Game</span>
          </div>
          <h2 className="font-heading italic text-5xl sm:text-7xl text-stone-100 font-light">
            Coffee & Happiness Catcher
          </h2>
          <p className="font-body text-base sm:text-lg text-stone-400 max-w-xl mx-auto font-light">
            Catch as many coffee, chocolate, and ice cream icons as you can in 20 seconds!
          </p>
        </div>

        {/* Game Canvas Container */}
        <div
          ref={gameAreaRef}
          onPointerMove={handlePointerMove}
          className="liquid-glass-strong rounded-3xl border border-white/20 h-[460px] relative overflow-hidden flex flex-col justify-between p-6 select-none touch-none shadow-2xl"
        >
          {/* Top Bar Stats */}
          <div className="flex items-center justify-between z-20 font-mono text-xs text-amber-200/80 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <span className="uppercase tracking-widest">TIME LEFT:</span>
              <span className="text-lg font-bold text-amber-300">{timeLeft}s</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="uppercase tracking-widest">HAPPINESS COLLECTED:</span>
              <span className="text-lg font-bold text-amber-300">{score}</span>
            </div>
          </div>

          {!isPlaying && !gameCompleted && (
            /* Start Screen */
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full liquid-glass flex items-center justify-center text-amber-300 border border-amber-200/40 shadow-lg">
                <Coffee className="w-8 h-8 stroke-[1.2]" />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="font-heading italic text-3xl text-stone-100 font-light">
                  Ready to Catch Some Happiness?
                </h3>
                <p className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                  Desktop: Use Left/Right Arrow Keys or Mouse<br />
                  Mobile: Drag your finger across the screen
                </p>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-4 rounded-full liquid-glass-strong hover:bg-white/10 text-amber-200 border border-amber-200/40 flex items-center space-x-3 text-sm font-mono uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_30px_rgba(230,200,150,0.2)]"
              >
                <Play className="w-4 h-4 fill-amber-200" />
                <span>Start Game</span>
              </button>
            </div>
          )}

          {/* Falling Items */}
          {isPlaying &&
            itemsRef.current.map((item) => (
              <div
                key={item.id}
                className="absolute pointer-events-none transform -translate-x-1/2 transition-transform duration-75"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}px`,
                }}
              >
                <div className="w-10 h-10 rounded-full liquid-glass border border-white/20 flex items-center justify-center shadow-lg">
                  {getItemIcon(item.type)}
                </div>
              </div>
            ))}

          {/* Player Cup / Basket */}
          <div
            className="absolute bottom-6 -translate-x-1/2 z-20 pointer-events-none transition-all duration-75"
            style={{ left: `${cupX}%` }}
          >
            <div className="w-20 h-14 rounded-b-2xl rounded-t-sm liquid-glass border-2 border-amber-200/60 shadow-[0_0_25px_rgba(230,200,150,0.3)] flex flex-col items-center justify-center relative">
              <Coffee className="w-5 h-5 text-amber-200 stroke-[1.5]" />
              <span className="text-[9px] font-mono tracking-widest text-amber-200 uppercase mt-0.5">
                ABI'S CUP
              </span>
            </div>
          </div>

          {gameCompleted && (
            /* Result Screen */
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full liquid-glass flex items-center justify-center text-amber-300 border border-amber-200/40">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-3 max-w-md">
                <span className="font-mono text-xs uppercase tracking-widest text-amber-200/80">
                  FINAL SCORE: {score} ITEMS
                </span>
                <h3 className="font-heading italic text-3xl sm:text-4xl text-stone-100 font-light">
                  You collected enough happiness for one birthday.
                </h3>
                <p className="font-heading italic text-2xl text-amber-200 font-light">
                  "But honestly... you deserve unlimited refills."
                </p>
              </div>

              <button
                onClick={startGame}
                className="px-6 py-3 rounded-full liquid-glass hover:liquid-glass-strong text-stone-200 hover:text-white border border-white/20 flex items-center space-x-2 text-xs font-mono uppercase tracking-widest transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
