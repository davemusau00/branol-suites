import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { IMAGES, BRANOL_INFO } from '../data/hotelData';

interface HeroProps {
  onOpenBooking: () => void;
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, setActiveTab }) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-end justify-start bg-[#121212] text-white pt-24 pb-16 lg:pb-20 overflow-hidden">
      {/* Background Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.heroExterior}
          alt="Branol Hotel exterior view at twilight in Mwingi"
          className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Top Kicker */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#E5DFD5] font-medium">
              A MODERN HOTEL IN MWINGI
            </span>
            <span className="w-8 h-[1px] bg-[#B85228]" />
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[0.95]">
            STAY COMPOSED.
          </h1>

          {/* Subheading & Brand Architecture */}
          <div className="space-y-2">
            <p className="text-sm sm:text-base text-[#D6CEBE] font-light max-w-lg leading-relaxed">
              A modern hotel in Mwingi. Contemporary architecture, thoughtful rooms, and warm hospitality designed around a quieter pace.
            </p>
            <div className="pt-2 text-xs font-mono tracking-[0.25em] text-[#B85228] font-medium flex items-center gap-3">
              <span>STAY</span>
              <span className="text-white/40">/</span>
              <span>DINE</span>
              <span className="text-white/40">/</span>
              <span>MEET</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-lg flex items-center gap-3 group"
            >
              <span>BOOK A ROOM</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const storyElem = document.getElementById('first-scroll-story');
                if (storyElem) {
                  storyElem.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveTab('stay');
                }
              }}
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-xs border border-white/30 text-white text-xs font-medium tracking-[0.2em] uppercase transition-all"
            >
              EXPLORE BRANOL
            </button>
          </div>

          {/* Location Line */}
          <div className="pt-6 border-t border-white/15 flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-[#A8A299] uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#B85228]" />
            <span>MWINGI · KITUI COUNTY · KENYA</span>
          </div>
        </div>
      </div>
    </section>
  );
};
