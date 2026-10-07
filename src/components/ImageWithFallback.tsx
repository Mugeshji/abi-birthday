import React, { useState } from 'react';
import { Camera } from 'lucide-react';

export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'auto' | 'none';
  fit?: 'cover' | 'contain';
  position?: string;
  placeholderLabel?: string;
  style?: React.CSSProperties;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'square',
  fit = 'cover',
  position = 'center',
  placeholderLabel = 'MEMORIES',
  style = {}
}) => {
  const [error, setError] = useState(false);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'portrait':
        return 'aspect-[3/4]';
      case 'landscape':
        return 'aspect-[16/10]';
      case 'square':
        return 'aspect-square';
      case 'auto':
      case 'none':
      default:
        return '';
    }
  };

  const getFitClass = () => {
    return fit === 'contain' ? 'object-contain' : 'object-cover';
  };

  if (error || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-neutral-900 via-stone-900 to-black rounded-xl border border-white/10 flex flex-col items-center justify-center p-4 group transition-all duration-500 hover:border-amber-200/30 ${getAspectClass() || 'aspect-square'} ${className}`}
        style={style}
      >
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,200,150,0.08)_0%,transparent_70%)]" />
        <div className="absolute top-2.5 left-3 text-[9px] tracking-[0.2em] text-amber-200/50 uppercase font-mono">
          {placeholderLabel}
        </div>
        <div className="absolute bottom-2.5 right-3 text-[9px] tracking-[0.2em] text-white/30 font-mono">
          08.10
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-2 p-2">
          <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-amber-200/70 group-hover:scale-110 group-hover:text-amber-200 transition-all duration-300 shadow-md">
            <Camera className="w-4 h-4 stroke-[1.5]" />
          </div>
          <p className="font-heading italic text-base sm:text-lg text-amber-100/90 leading-snug line-clamp-2 max-w-[220px]">
            {alt}
          </p>
          <span className="text-[10px] text-white/40 tracking-wider uppercase font-mono">
            Photo Slot
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={`${getAspectClass()} ${getFitClass()} object-center ${className}`}
      style={{ objectPosition: position, ...style }}
      loading="lazy"
    />
  );
};
