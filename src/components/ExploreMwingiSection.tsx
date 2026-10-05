import React from 'react';
import { MapPin, Navigation, Building, Mountain, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { IMAGES, MWINGI_LANDMARKS, BRANOL_INFO } from '../data/hotelData';

interface ExploreMwingiSectionProps {
  setActiveTab: (tab: string) => void;
}

export const ExploreMwingiSection: React.FC<ExploreMwingiSectionProps> = ({ setActiveTab }) => {
  return (
    <section className="py-20 lg:py-24 bg-[#FAF8F5] border-t border-[#EAE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B85228]">
                EXPLORE MWINGI
              </span>
              <span className="w-8 h-[1px] bg-[#B85228]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#121212] leading-tight">
              The modern side of Mwingi.
            </h2>

            <p className="text-xs sm:text-sm text-[#4A4641] leading-relaxed font-light">
              Conveniently located in Mwingi along the A3 Garissa Highway, Branol Hotel puts you closer to what matters — business, community institutions and the unique natural scenery of Kitui County.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#B85228] uppercase tracking-[0.15em] hover:underline"
              >
                <span>GET DIRECTIONS & ORIENTATION</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Landscape Image */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden border border-[#EAE5DD] shadow-md group">
              <img
                src={IMAGES.exploreLandscape}
                alt="Landscape of Mwingi Kitui County rock formations"
                className="w-full h-[280px] sm:h-[340px] object-cover transform group-hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-[#121212]/90 text-white px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border-l-2 border-[#B85228]">
                MWINGI LANDSCAPE · KITUI COUNTY
              </div>
            </div>
          </div>
        </div>

        {/* Custom Styled Architectural Map Representation */}
        <div className="bg-[#EAE5DD] border border-[#D6CEBE] p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Styled Map View (7 cols) */}
            <div className="lg:col-span-7 bg-[#F3EFEA] border border-[#D6CEBE] p-6 relative overflow-hidden h-[260px] flex flex-col justify-between">
              {/* Simulated Map Elements */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Highway Graphic */}
              <div className="absolute top-1/2 left-0 right-0 h-4 bg-[#D6CEBE]/80 -translate-y-1/2 rotate-[-5deg] flex items-center justify-between px-4 text-[9px] font-mono text-[#777]">
                <span>← To Kitui Town</span>
                <span className="font-bold text-[#121212]">A3 GARISSA HIGHWAY</span>
                <span>To Garissa / Nairobi →</span>
              </div>

              {/* Pin Marker */}
              <div className="relative z-10 self-center my-auto bg-[#121212] text-white p-3 border border-[#B85228] shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-[#B85228] flex items-center justify-center font-serif text-white font-bold text-sm">
                  B
                </div>
                <div>
                  <span className="font-serif text-lg font-semibold tracking-wider text-white block leading-none">
                    BRANOL HOTEL
                  </span>
                  <span className="text-[9px] uppercase font-mono text-[#D6CEBE]">
                    MWINGI TOWN · A3 HIGHWAY
                  </span>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#706B65]">
                <span>GPS: -0.9351° S, 38.0583° E</span>
                <span className="text-[#B85228] font-semibold">SECURE PARKING ON-SITE</span>
              </div>
            </div>

            {/* Destinations List (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#121212] border-b border-[#D6CEBE] pb-2">
                CLOSE TO KEY DESTINATIONS
              </h3>

              <div className="space-y-3">
                {MWINGI_LANDMARKS.map((lm, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white p-3 border border-[#D6CEBE] text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B85228]" />
                      <span className="font-medium text-[#121212]">{lm.name}</span>
                    </div>
                    <span className="font-mono text-xs text-[#B85228] font-semibold">
                      {lm.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
