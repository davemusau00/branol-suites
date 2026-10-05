import React from 'react';
import { IMAGES } from '../data/hotelData';

export const FirstScrollStory: React.FC = () => {
  return (
    <section id="first-scroll-story" className="py-20 lg:py-28 bg-[#FAF8F5] text-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B85228]">
                BRANOL / MWINGI
              </span>
              <span className="w-10 h-[1px] bg-[#B85228]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#121212] leading-[1.15]">
              Away from the rush.
              <br />
              <span className="italic text-[#B85228]">Not away from what matters.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#4A4641] leading-relaxed font-light">
              Branol is a contemporary hotel for staying, dining and meeting in Mwingi. Thoughtful rooms, generous gathering spaces and warm hospitality, designed around a quieter pace.
            </p>

            <div className="pt-4 border-t border-[#E2DBD0] flex items-center gap-8 text-xs font-mono text-[#706B65]">
              <div>
                <span className="block font-serif text-2xl font-semibold text-[#121212]">10</span>
                <span className="uppercase text-[10px] tracking-wider">Rooms</span>
              </div>
              <div className="w-[1px] h-8 bg-[#E2DBD0]" />
              <div>
                <span className="block font-serif text-2xl font-semibold text-[#121212]">A3</span>
                <span className="uppercase text-[10px] tracking-wider">Garissa Hwy</span>
              </div>
              <div className="w-[1px] h-8 bg-[#E2DBD0]" />
              <div>
                <span className="block font-serif text-2xl font-semibold text-[#121212]">24/7</span>
                <span className="uppercase text-[10px] tracking-wider">Hospitality</span>
              </div>
            </div>
          </div>

          {/* Right Image Frame */}
          <div className="lg:col-span-6">
            <div className="relative group overflow-hidden border border-[#EAE5DD] shadow-lg">
              <img
                src={IMAGES.heroExterior}
                alt="Branol Hotel courtyard and architectural entrance"
                className="w-full h-[380px] sm:h-[460px] object-cover transform group-hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-[#121212]/90 backdrop-blur-xs text-white px-4 py-2 text-[10px] font-mono tracking-widest uppercase border-l-2 border-[#B85228]">
                ARCHITECTURAL COURTYARD · MWINGI
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
