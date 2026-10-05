import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showSubtag?: boolean;
  showMonogram?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'auto',
  showSubtag = true,
  showMonogram = true,
  size = 'md',
  onClick,
}) => {
  const sizeClasses = {
    sm: {
      box: 'w-7 h-7 text-xs',
      title: 'text-lg tracking-[0.2em]',
      sub: 'text-[8px] tracking-[0.3em]',
    },
    md: {
      box: 'w-9 h-9 text-base',
      title: 'text-xl sm:text-2xl tracking-[0.2em]',
      sub: 'text-[9px] tracking-[0.32em]',
    },
    lg: {
      box: 'w-12 h-12 text-xl',
      title: 'text-3xl sm:text-4xl tracking-[0.22em]',
      sub: 'text-[11px] tracking-[0.35em]',
    },
  };

  const isDark = variant === 'dark';

  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B85228]"
    >
      {showMonogram && (
        <div
          className={`shrink-0 ${sizeClasses[size].box} border flex items-center justify-center font-serif font-bold transition-all ${
            isDark
              ? 'border-white text-white group-hover:bg-white group-hover:text-[#0F0F0F]'
              : 'border-[#121212] text-[#121212] dark:border-white dark:text-white group-hover:bg-[#121212] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#0F0F0F]'
          }`}
        >
          B
        </div>
      )}

      <div className="flex flex-col">
        <span
          className={`font-serif font-semibold leading-none ${sizeClasses[size].title} ${
            isDark
              ? 'text-white'
              : 'text-[#121212] dark:text-white'
          }`}
        >
          BRANOL
        </span>

        {showSubtag && (
          <div className="flex flex-col mt-0.5">
            <span
              className={`uppercase font-medium tracking-[0.3em] ${sizeClasses[size].sub} ${
                isDark ? 'text-white/80' : 'text-[#706B65] dark:text-[#A3A3A3]'
              }`}
            >
              HOTEL · MWINGI
            </span>
            {/* Horizon Copper Accent Line */}
            <span className="w-8 h-[2px] bg-[#B85228] mt-1 group-hover:w-12 transition-all duration-300" />
          </div>
        )}
      </div>
    </button>
  );
};
