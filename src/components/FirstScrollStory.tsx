import React, { useState } from 'react';
import { IMAGES, SITE_SHOWCASE } from '../data/hotelData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const FirstScrollStory: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SITE_SHOWCASE.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SITE_SHOWCASE.length) % SITE_SHOWCASE.length);
  };

  return (
    <section id="first-scroll-story" className="py-20 lg:py-28 bg-[#FAF8F4] dark:bg-[#0F0F0F] text-[#1F1F1F] dark:text-[#EDE9E1] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Positioning Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B85228] dark:text-[#C87952]">
                BRANOL / MWINGI
              </span>
              <span className="w-10 h-[1px] bg-[#B85228] dark:bg-[#C87952]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.15]">
              Away from the rush.
              <br />
              <span className="italic text-[#B85228] dark:text-[#C87952]">Not away from what matters.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#696868] dark:text-[#A3A3A3] leading-relaxed font-light">
              Branol is a contemporary hotel for staying, dining and meeting in Mwingi. Thoughtful rooms, generous gathering spaces and warm hospitality, designed around a quieter pace.
            </p>

            <div className="pt-4 border-t border-[#D6C7B8]/40 dark:border-[#262626] flex items-center gap-8 text-xs font-mono text-[#696868] dark:text-[#A3A3A3]">
              <div>
                <span className="block font-serif text-2xl font-semibold text-[#1F1F1F] dark:text-white">10</span>
                <span className="uppercase text-[10px] tracking-wider">Rooms</span>
              </div>
              <div className="w-[1px] h-8 bg-[#D6C7B8]/40 dark:bg-[#262626]" />
              <div>
                <span className="block font-serif text-2xl font-semibold text-[#1F1F1F] dark:text-white">A3</span>
                <span className="uppercase text-[10px] tracking-wider">Garissa Hwy</span>
              </div>
              <div className="w-[1px] h-8 bg-[#D6C7B8]/40 dark:bg-[#262626]" />
              <div>
                <span className="block font-serif text-2xl font-semibold text-[#1F1F1F] dark:text-white">24/7</span>
                <span className="uppercase text-[10px] tracking-wider">Hospitality</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative group overflow-hidden border border-[#D6C7B8]/60 dark:border-[#262626] shadow-lg">
              <img
                src={IMAGES.siteStayPavilion}
                alt="Branol Hotel outdoor garden pavilion with arches"
                className="w-full h-[380px] sm:h-[460px] object-cover transform group-hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-[#0F0F0F]/90 backdrop-blur-xs text-white px-4 py-2 text-[10px] font-mono tracking-widest uppercase border-l-2 border-[#B85228]">
                OUTDOOR GAZEBO & GARDEN SUITES · MWINGI
              </div>
            </div>
          </div>
        </div>

        {/* Property Site Photography Showcase */}
        <div className="pt-8 border-t border-[#D6C7B8]/40 dark:border-[#262626] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] dark:text-[#C87952] font-semibold">
                PROPERTY ARCHITECTURE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-1">
                Real Spaces & Design Language
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2 border border-[#D6C7B8] dark:border-[#262626] hover:bg-[#B85228] hover:text-white dark:hover:bg-[#C87952] transition-colors"
                aria-label="Previous property photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 border border-[#D6C7B8] dark:border-[#262626] hover:bg-[#B85228] hover:text-white dark:hover:bg-[#C87952] transition-colors"
                aria-label="Next property photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Property Showcase Slider / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const itemIndex = (activeSlide + offset) % SITE_SHOWCASE.length;
              const item = SITE_SHOWCASE[itemIndex];
              return (
                <div
                  key={item.id}
                  className="bg-[#EAE2D8] dark:bg-[#1B1B1B] border border-[#D6C7B8]/60 dark:border-[#262626] overflow-hidden group transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#0F0F0F]/85 text-white px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase border-l-2 border-[#B85228]">
                      BRANOL / {item.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-serif text-lg font-semibold text-[#1F1F1F] dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#696868] dark:text-[#A3A3A3] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
