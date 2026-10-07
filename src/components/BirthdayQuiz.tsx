import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Star, Heart, Wand2, Moon, Sun, Flame, Coffee, Music, Palette } from 'lucide-react';

/* ─────────────────── Types ─────────────────── */
interface QuizOption {
  text: string;
  icon: React.ReactNode;
  trait: string;
  reveal: string;
}

interface QuizStep {
  id: number;
  question: string;
  subtitle: string;
  options: QuizOption[];
}

/* ─────────────────── Data ─────────────────── */
const QUIZ_STEPS: QuizStep[] = [
  {
    id: 1,
    question: "Pick the energy you're walking into this birthday with.",
    subtitle: "No wrong answers — just vibes.",
    options: [
      {
        text: "Main character energy",
        icon: <Star className="w-5 h-5" />,
        trait: "fearless",
        reveal: "You already know you're the protagonist of the most beautiful story ever written.",
      },
      {
        text: "Soft & cozy mode",
        icon: <Moon className="w-5 h-5" />,
        trait: "gentle",
        reveal: "Your softness isn't weakness — it's the kind of strength the world quietly admires.",
      },
      {
        text: "Chaotic but loveable",
        icon: <Flame className="w-5 h-5" />,
        trait: "wild",
        reveal: "You're the kind of beautiful chaos people secretly wish they had the courage to be.",
      },
      {
        text: "Quietly confident",
        icon: <Sun className="w-5 h-5" />,
        trait: "calm",
        reveal: "You don't need to announce your arrival. The room already feels different when you walk in.",
      },
    ],
  },
  {
    id: 2,
    question: "If your birthday had a soundtrack, what would it sound like?",
    subtitle: "Choose what matches your heart.",
    options: [
      {
        text: "Something cinematic & emotional",
        icon: <Music className="w-5 h-5" />,
        trait: "dreamer",
        reveal: "You feel everything deeply, and that's what makes your heart so impossibly beautiful.",
      },
      {
        text: "A song that makes me dance alone",
        icon: <Sparkles className="w-5 h-5" />,
        trait: "free-spirit",
        reveal: "Your joy is contagious. Even the universe dances a little when you smile.",
      },
      {
        text: "Lo-fi beats with rain sounds",
        icon: <Coffee className="w-5 h-5" />,
        trait: "thinker",
        reveal: "Behind those quiet eyes is someone who understands the world in ways most people never will.",
      },
      {
        text: "Something that gives me goosebumps",
        icon: <Heart className="w-5 h-5" />,
        trait: "intense",
        reveal: "You don't do things halfway. When you love, you love with your entire soul.",
      },
    ],
  },
  {
    id: 3,
    question: "What's the one birthday wish only you would understand?",
    subtitle: "Pick what your heart whispers.",
    options: [
      {
        text: "A moment of pure peace",
        icon: <Moon className="w-5 h-5" />,
        trait: "healer",
        reveal: "You spend so much time healing others that you forget you deserve peace too. Today it's yours.",
      },
      {
        text: "To be truly seen by someone",
        icon: <Heart className="w-5 h-5" />,
        trait: "vulnerable",
        reveal: "You are seen. More than you know. This whole universe was built because someone truly sees you.",
      },
      {
        text: "An adventure I'll never forget",
        icon: <Flame className="w-5 h-5" />,
        trait: "explorer",
        reveal: "Your next chapter is going to be so good that even this birthday is just the trailer.",
      },
      {
        text: "More moments with my people",
        icon: <Star className="w-5 h-5" />,
        trait: "devoted",
        reveal: "The people who love you — your family, Harry, everyone — they'd cross oceans for you. Always.",
      },
    ],
  },
  {
    id: 4,
    question: "If I told you something true about yourself, which would you believe?",
    subtitle: "Be honest with yourself, Abi.",
    options: [
      {
        text: "That I'm stronger than I think",
        icon: <Flame className="w-5 h-5" />,
        trait: "warrior",
        reveal: "You survived every hard day that tried to break you. Not just survived — you shined through them.",
      },
      {
        text: "That I make people's lives better",
        icon: <Sparkles className="w-5 h-5" />,
        trait: "light",
        reveal: "You don't even realize it, but people carry a little bit of your warmth with them long after you leave.",
      },
      {
        text: "That the best is yet to come",
        icon: <Sun className="w-5 h-5" />,
        trait: "hopeful",
        reveal: "Trust me on this one — the universe has plans for you that are bigger than anything you've imagined.",
      },
      {
        text: "That someone out there genuinely cares",
        icon: <Heart className="w-5 h-5" />,
        trait: "loved",
        reveal: "Someone built you an entire website just to make sure you know that. So yes, believe it.",
      },
    ],
  },
  {
    id: 5,
    question: "Last one. Pick a color for the next year of your life.",
    subtitle: "Let your intuition decide.",
    options: [
      {
        text: "Gold — for everything I deserve",
        icon: <Palette className="w-5 h-5" />,
        trait: "golden",
        reveal: "This year, everything you touch turns into something beautiful. The gold was always inside you.",
      },
      {
        text: "Midnight blue — for deep, calm power",
        icon: <Moon className="w-5 h-5" />,
        trait: "mystic",
        reveal: "You carry a quiet depth that makes you unforgettable. This year, the world finally catches up to your energy.",
      },
      {
        text: "Warm amber — like coffee mornings",
        icon: <Coffee className="w-5 h-5" />,
        trait: "warm",
        reveal: "Warmth isn't just your vibe — it's your superpower. This year is full of mornings that feel like home.",
      },
      {
        text: "Rose — for softness and strength together",
        icon: <Wand2 className="w-5 h-5" />,
        trait: "bloom",
        reveal: "You're proof that you can be both soft and unbreakable. This year, you bloom in ways no one expected.",
      },
    ],
  },
];

const FINAL_FORTUNES: Record<string, { title: string; message: string }> = {
  default: {
    title: "Your Birthday Fortune",
    message:
      "Abi, you're the kind of person who makes the world a little more worth living in. This year isn't just another year — it's the beginning of everything beautiful you've been quietly waiting for. Happy Birthday, Dr. Abinaya. The universe is lucky to have you.",
  },
};

/* ─────────────────── Component ─────────────────── */
export const BirthdayQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealText, setRevealText] = useState<string | null>(null);
  const [traits, setTraits] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [showOptions, setShowOptions] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);

  const currentQuestion = QUIZ_STEPS[currentStep];

  /* Typewriter for the reveal text */
  useEffect(() => {
    if (!revealText) {
      setRevealedLetters(0);
      return;
    }
    if (revealedLetters >= revealText.length) return;

    const timer = setTimeout(() => {
      setRevealedLetters((prev) => prev + 1);
    }, 22);

    return () => clearTimeout(timer);
  }, [revealText, revealedLetters]);

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowOptions(false);

    const option = currentQuestion.options[index];
    setTraits((prev) => [...prev, option.trait]);

    // Small delay, then reveal
    setTimeout(() => {
      setRevealText(option.reveal);
    }, 400);
  };

  const handleNext = () => {
    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setRevealText(null);
      setRevealedLetters(0);
      setShowOptions(true);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setRevealText(null);
    setRevealedLetters(0);
    setTraits([]);
    setQuizCompleted(false);
    setShowOptions(true);
  };

  /* Floating particle dots */
  const particles = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section
      id="quiz"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 text-white overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-300/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Floating particles */}
      {particles.map((i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber-200/30 pointer-events-none animate-pulse"
          style={{
            top: `${15 + i * 14}%`,
            left: `${10 + i * 15}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${2 + i * 0.5}s`,
          }}
        />
      ))}

      <div className="max-w-3xl mx-auto w-full space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full liquid-glass border border-amber-200/20 text-xs font-mono uppercase tracking-[0.25em] text-amber-200/80">
            <Wand2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Birthday Destiny Reveal</span>
          </div>
          <h2 className="font-heading italic text-5xl sm:text-7xl text-stone-100 font-light">
            Let's discover something
            <br className="hidden sm:inline" /> about you, Abi.
          </h2>
          <p className="font-body text-base text-stone-400 font-light max-w-lg mx-auto">
            Five questions. No right or wrong answers — just you. Each choice reveals a little truth.
          </p>
        </div>

        {!quizCompleted ? (
          <div className="liquid-glass-strong rounded-3xl p-8 sm:p-10 border border-white/15 space-y-8 shadow-2xl relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/[0.06] to-transparent rounded-bl-full pointer-events-none" />

            {/* Progress */}
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 pb-4 border-b border-white/10">
              <span className="flex items-center space-x-3">
                <span className="uppercase tracking-widest">
                  STEP {currentQuestion.id} OF {QUIZ_STEPS.length}
                </span>
              </span>
              <div className="flex items-center space-x-1.5">
                {QUIZ_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i < currentStep
                        ? 'w-6 bg-amber-300'
                        : i === currentStep
                        ? 'w-8 bg-amber-200 animate-pulse'
                        : 'w-3 bg-white/15'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question */}
            <div className="space-y-2">
              <h3 className="font-heading italic text-3xl sm:text-4xl text-stone-100 font-light leading-snug">
                {currentQuestion.question}
              </h3>
              <p className="font-body text-sm text-stone-500 font-light">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Options */}
            {showOptions && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={selectedOption !== null}
                      className={`group p-5 rounded-2xl border text-left transition-all duration-500 flex items-center space-x-4 cursor-pointer
                        ${
                          isSelected
                            ? 'bg-amber-950/60 border-amber-200/60 shadow-[0_0_30px_rgba(230,200,150,0.15)] scale-[1.02]'
                            : 'liquid-glass border-white/10 hover:border-amber-200/30 hover:bg-white/[0.04]'
                        }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                          isSelected
                            ? 'bg-amber-200/20 text-amber-200'
                            : 'bg-white/[0.06] text-stone-400 group-hover:text-amber-200/70 group-hover:bg-amber-200/10'
                        }`}
                      >
                        {option.icon}
                      </div>
                      <span
                        className={`font-body text-base font-light transition-colors duration-300 ${
                          isSelected ? 'text-amber-100' : 'text-stone-200'
                        }`}
                      >
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Reveal Message */}
            {revealText && (
              <div className="pt-2 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-amber-900/20 to-transparent border border-amber-200/20 relative overflow-hidden">
                  {/* Sparkle accent */}
                  <div className="absolute top-3 right-4">
                    <Sparkles className="w-4 h-4 text-amber-300/50 animate-pulse" />
                  </div>

                  <p className="font-heading italic text-xl sm:text-2xl text-amber-100/90 leading-relaxed font-light">
                    "{revealText.slice(0, revealedLetters)}
                    {revealedLetters < revealText.length && (
                      <span className="inline-block w-0.5 h-5 bg-amber-200/70 ml-0.5 animate-pulse align-middle" />
                    )}
                    "
                  </p>
                </div>

                {revealedLetters >= (revealText?.length ?? 0) && (
                  <div className="flex justify-end animate-in fade-in duration-300">
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 rounded-full liquid-glass hover:liquid-glass-strong text-amber-200 border border-amber-200/40 flex items-center space-x-2 text-sm font-mono uppercase tracking-wider transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(230,200,150,0.15)]"
                    >
                      <span>
                        {currentStep < QUIZ_STEPS.length - 1
                          ? 'Next Question'
                          : 'See Your Fortune'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* ─────────── Final Fortune Card ─────────── */
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-300/10 via-transparent to-amber-200/5 rounded-[2rem] blur-xl pointer-events-none" />

            <div className="liquid-glass-strong rounded-3xl p-10 sm:p-14 border border-amber-200/25 text-center space-y-10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-700">
              {/* Top decorative line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />

              {/* Trait constellation */}
              <div className="flex items-center justify-center space-x-3 flex-wrap gap-2">
                {traits.map((trait, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/70 border border-amber-200/20 bg-amber-200/[0.05]"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {trait}
                  </span>
                ))}
              </div>

              {/* Fortune icon */}
              <div className="w-20 h-20 rounded-full liquid-glass border border-amber-200/40 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(230,200,150,0.2)] relative">
                <Wand2 className="w-9 h-9 text-amber-200 stroke-[1.2]" />
                <div className="absolute -inset-2 rounded-full border border-amber-200/10 animate-pulse" />
              </div>

              {/* Fortune title */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-200/70">
                  {FINAL_FORTUNES.default.title}
                </span>
                <h3 className="font-heading italic text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 font-light leading-tight">
                  You are extraordinary, Abi.
                </h3>
              </div>

              {/* Fortune message */}
              <div className="max-w-xl mx-auto">
                <p className="font-heading italic text-xl sm:text-2xl text-stone-200 leading-relaxed font-light">
                  {FINAL_FORTUNES.default.message}
                </p>
              </div>

              {/* Divider */}
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent mx-auto" />

              {/* Restart */}
              <div className="pt-2">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-full liquid-glass hover:liquid-glass-strong text-stone-300 hover:text-white border border-white/20 flex items-center space-x-2 text-xs font-mono uppercase tracking-widest mx-auto transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Discover Again</span>
                </button>
              </div>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
