import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn, Sparkles, ChevronLeft, ChevronRight, Filter, Heart } from 'lucide-react';
import { BIRTHDAY_DATA, type MemoryItem } from '../data/birthdayData';
import { ImageWithFallback } from './ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

export const Gallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<MemoryItem | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeTag, setActiveTag] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<HTMLDivElement>(null);

  const memories = BIRTHDAY_DATA.memories as MemoryItem[];

  // Filter memories based on active tag
  const filteredMemories = activeTag === 'all' 
    ? memories 
    : memories.filter((m) => m.aspectRatio === activeTag || m.tag?.toLowerCase().includes(activeTag.toLowerCase()));

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (masonryRef.current) {
        const cards = masonryRef.current.querySelectorAll('.gallery-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: masonryRef.current,
              start: 'top 85%'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeTag]);

  const openLightbox = (photo: MemoryItem) => {
    const idx = memories.findIndex((m) => m.id === photo.id);
    setActiveIndex(idx >= 0 ? idx : 0);
    setActivePhoto(photo);
  };

  const closeLightbox = () => {
    setActivePhoto(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (activeIndex + 1) % memories.length;
    setActiveIndex(nextIdx);
    setActivePhoto(memories[nextIdx]);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (activeIndex - 1 + memories.length) % memories.length;
    setActiveIndex(prevIdx);
    setActivePhoto(memories[prevIdx]);
  };

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-24 text-white"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Gallery Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full liquid-glass border border-white/10 text-xs font-mono uppercase tracking-[0.25em] text-amber-200/80 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Visual Storybook • {memories.length} Moments</span>
          </div>
          
          <h2 className="font-heading italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-100 font-light tracking-tight">
            Photo Memories
          </h2>
          
          <p className="font-body text-base sm:text-lg text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
            Every snapshot holds a story. Tap any photo to expand into high definition.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveTag('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTag === 'all'
                  ? 'bg-amber-200/20 text-amber-200 border border-amber-200/60 shadow-[0_0_15px_rgba(230,200,150,0.2)]'
                  : 'liquid-glass text-stone-400 hover:text-white border border-white/10'
              }`}
            >
              All Photos ({memories.length})
            </button>
            <button
              onClick={() => setActiveTag('portrait')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTag === 'portrait'
                  ? 'bg-amber-200/20 text-amber-200 border border-amber-200/60 shadow-[0_0_15px_rgba(230,200,150,0.2)]'
                  : 'liquid-glass text-stone-400 hover:text-white border border-white/10'
              }`}
            >
              Portraits
            </button>
            <button
              onClick={() => setActiveTag('landscape')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTag === 'landscape'
                  ? 'bg-amber-200/20 text-amber-200 border border-amber-200/60 shadow-[0_0_15px_rgba(230,200,150,0.2)]'
                  : 'liquid-glass text-stone-400 hover:text-white border border-white/10'
              }`}
            >
              Moments & Places
            </button>
          </div>
        </div>

        {/* Masonry Layout - Eliminates empty gaps and aligns naturally by photo height */}
        <div
          ref={masonryRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]"
        >
          {filteredMemories.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className="gallery-card break-inside-avoid mb-6 group cursor-pointer liquid-glass hover:liquid-glass-strong rounded-2xl p-3 sm:p-3.5 border border-white/10 transition-all duration-500 hover:border-amber-200/40 hover:-translate-y-1 relative overflow-hidden flex flex-col shadow-lg hover:shadow-2xl"
            >
              {/* Photo Header Tag & Date */}
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-2.5 px-1">
                <span className="uppercase tracking-widest text-amber-200/70 font-medium">
                  {photo.tag || 'MEMORY'}
                </span>
                <span className="text-stone-500">08.10</span>
              </div>

              {/* Image Container with Natural/Proportional Fit */}
              <div className="rounded-xl overflow-hidden relative bg-stone-900/60">
                <ImageWithFallback
                  src={photo.image}
                  alt={photo.caption}
                  aspectRatio={photo.aspectRatio || 'auto'}
                  fit={photo.fit || 'cover'}
                  position={photo.position || 'center'}
                  placeholderLabel={photo.tag || 'MEMORIES'}
                  className="w-full h-auto max-h-[500px] object-center transition-transform duration-700 group-hover:scale-105 block"
                />
                
                {/* Hover Overlay Zoom Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full liquid-glass-strong flex items-center justify-center text-amber-200 border border-white/30 scale-90 group-hover:scale-100 transition-transform shadow-lg">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Caption Section - Compact and Hugged */}
              <div className="pt-3 pb-1 px-1 space-y-1">
                <p className="font-heading italic text-lg sm:text-xl text-stone-200 group-hover:text-amber-100 transition-colors leading-snug">
                  "{photo.caption}"
                </p>
                {photo.subcaption && (
                  <p className="text-xs font-body text-stone-400 line-clamp-2">
                    {photo.subcaption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 rounded-full liquid-glass text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full liquid-glass text-white/80 hover:text-amber-200 border border-white/20 transition-all cursor-pointer hidden sm:flex shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full liquid-glass text-white/80 hover:text-amber-200 border border-white/20 transition-all cursor-pointer hidden sm:flex shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Main Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center space-y-5 animate-in zoom-in-95 duration-300"
          >
            <div className="relative rounded-3xl overflow-hidden liquid-glass-strong border border-white/20 p-2 sm:p-3 max-h-[70vh] flex items-center justify-center shadow-2xl">
              <ImageWithFallback
                src={activePhoto.image}
                alt={activePhoto.caption}
                aspectRatio="auto"
                fit="contain"
                position="center"
                placeholderLabel={activePhoto.tag || 'MEMORY'}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl mx-auto"
              />
            </div>

            {/* Lightbox Captions */}
            <div className="text-center max-w-xl space-y-2 px-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-200/80 uppercase tracking-widest">
                <span>{activePhoto.tag || 'MEMORY'}</span>
                <span>•</span>
                <span>{activeIndex + 1} of {memories.length}</span>
              </div>
              <h3 className="font-heading italic text-2xl sm:text-3xl text-stone-100 font-light leading-snug">
                "{activePhoto.caption}"
              </h3>
              {activePhoto.subcaption && (
                <p className="font-body text-sm text-stone-300">
                  {activePhoto.subcaption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
