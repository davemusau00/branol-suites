import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../data/hotelData';

interface StayDineMeetPanelsProps {
  setActiveTab: (tab: string) => void;
  onOpenConferenceQuote: () => void;
}

export const StayDineMeetPanels: React.FC<StayDineMeetPanelsProps> = ({
  setActiveTab,
}) => {
  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F4] dark:bg-[#0F0F0F] text-[#1F1F1F] dark:text-[#EDE9E1] border-t border-b border-[#D6C7B8]/40 dark:border-[#262626] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] dark:text-[#C87952] font-semibold">
            BRAND ARCHITECTURE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal">
            Three distinct experiences in Mwingi.
          </h2>
          <div className="w-12 h-[2px] bg-[#B85228] dark:bg-[#C87952] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel 1: STAY */}
          <div className="bg-[#EAE2D8]/40 dark:bg-[#1B1B1B] border border-[#D6C7B8]/60 dark:border-[#262626] shadow-xs flex flex-col justify-between group hover:border-[#B85228] dark:hover:border-[#C87952] transition-all duration-300">
            <div>
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={IMAGES.siteStayPavilion}
                  alt="Branol Stay Garden Suite Pavilion"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#0F0F0F]/85 text-white px-3 py-1 text-[10px] font-mono tracking-widest uppercase border-l-2 border-[#B85228]">
                  BRANOL / STAY
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-2xl font-normal text-[#1F1F1F] dark:text-white">
                  Your room.
                  <br />
                  <span className="italic">Your quiet.</span>
                </h3>

                <p className="text-xs text-[#696868] dark:text-[#A3A3A3] leading-relaxed font-light">
                  Contemporary accommodation from <span className="font-mono font-semibold text-[#1F1F1F] dark:text-white">KES 3,000</span> per night. High-speed Wi-Fi, en-suite rain shower, and serene garden comfort.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => {
                  setActiveTab('stay');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 border border-[#1F1F1F] dark:border-white group-hover:bg-[#1F1F1F] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#0F0F0F] text-[#1F1F1F] dark:text-white text-xs font-semibold tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>EXPLORE ROOMS</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Panel 2: DINE */}
          <div className="bg-[#EAE2D8]/40 dark:bg-[#1B1B1B] border border-[#D6C7B8]/60 dark:border-[#262626] shadow-xs flex flex-col justify-between group hover:border-[#B85228] dark:hover:border-[#C87952] transition-all duration-300">
            <div>
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={IMAGES.siteDineCabana}
                  alt="Branol Dine Outdoor Garden Cabana"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#0F0F0F]/85 text-white px-3 py-1 text-[10px] font-mono tracking-widest uppercase border-l-2 border-[#B85228]">
                  BRANOL / DINE
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-2xl font-normal text-[#1F1F1F] dark:text-white">
                  Dine at
                  <br />
                  <span className="italic">your own pace.</span>
                </h3>

                <p className="text-xs text-[#696868] dark:text-[#A3A3A3] leading-relaxed font-light">
                  Breakfast, lunch, dinner and relaxed garden cabana dining for hotel guests, Mwingi residents and groups.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => {
                  setActiveTab('dine');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 border border-[#1F1F1F] dark:border-white group-hover:bg-[#1F1F1F] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#0F0F0F] text-[#1F1F1F] dark:text-white text-xs font-semibold tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>EXPLORE DINING</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Panel 3: MEET */}
          <div className="bg-[#EAE2D8]/40 dark:bg-[#1B1B1B] border border-[#D6C7B8]/60 dark:border-[#262626] shadow-xs flex flex-col justify-between group hover:border-[#B85228] dark:hover:border-[#C87952] transition-all duration-300">
            <div>
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={IMAGES.siteMeetFoyer}
                  alt="Branol Meet Conference Hall Foyer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#0F0F0F]/85 text-white px-3 py-1 text-[10px] font-mono tracking-widest uppercase border-l-2 border-[#B85228]">
                  BRANOL / MEET
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-2xl font-normal text-[#1F1F1F] dark:text-white">
                  Room to think.
                </h3>

                <p className="text-xs text-[#696868] dark:text-[#A3A3A3] leading-relaxed font-light">
                  A modern setting for conferences, training sessions, corporate meetings and private gatherings in Mwingi.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => {
                  setActiveTab('meet');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 border border-[#1F1F1F] dark:border-white group-hover:bg-[#1F1F1F] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#0F0F0F] text-[#1F1F1F] dark:text-white text-xs font-semibold tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>PLAN A MEETING</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
