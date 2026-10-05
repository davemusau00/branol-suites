import React, { useState } from 'react';
import { IMAGES, MWINGI_LANDMARKS, BRANOL_INFO } from '../data/hotelData';
import { Compass } from 'lucide-react';

interface ExplorePageProps {
  onOpenBooking: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ onOpenBooking }) => {
  const [filter, setFilter] = useState<string>('All');

  const galleryImages = [
    { src: IMAGES.siteStayPavilion, title: 'Outdoor White Arched Pavilion', category: 'Stay' },
    { src: IMAGES.siteDineCabana, title: 'Private Garden Dining Cabana', category: 'Dine' },
    { src: IMAGES.siteLobbyReception, title: 'Hotel Front Desk & Reception', category: 'Architecture' },
    { src: IMAGES.siteCorridorRooms, title: 'Marble Corridor & Suite Entries', category: 'Stay' },
    { src: IMAGES.siteMeetFoyer, title: 'Conference & Events Reception Foyer', category: 'Meet' },
    { src: IMAGES.siteStaircasePlaque, title: 'Staircase Lobby & Monogram Plaque', category: 'Architecture' },
    { src: IMAGES.exploreLandscape, title: 'Mwingi Landscape Rock Formations', category: 'Mwingi' },
    { src: IMAGES.heroExterior, title: 'Architectural Courtyard Entry', category: 'Architecture' },
  ];

  const categories = ['All', 'Architecture', 'Stay', 'Dine', 'Meet', 'Mwingi'];

  const filteredGallery = galleryImages.filter(
    (item) => filter === 'All' || item.category === filter
  );

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F4] dark:bg-[#0F0F0F] text-[#1F1F1F] dark:text-[#EDE9E1] transition-colors duration-300">
      {/* Header Banner */}
      <div className="bg-[#0F0F0F] text-white py-16 lg:py-20 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B85228]">
              YOU'RE IN MWINGI
            </span>
            <span className="w-8 h-[1px] bg-[#B85228]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            The modern side of Mwingi.
          </h1>

          <p className="text-sm sm:text-base text-[#D6CEBE] font-light max-w-xl leading-relaxed">
            Orientation, local landmarks, access directions and editorial photography showcasing Branol Hotel property and Kitui County.
          </p>
        </div>
      </div>

      {/* Editorial Photo Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-4 border-b border-[#D6C7B8]/40 dark:border-[#262626]">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] dark:text-[#C87952] font-semibold">
                EDITORIAL GALLERY
              </span>
              <h2 className="font-serif text-3xl font-normal">
                Property Spaces & Architectural Language
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    filter === cat
                      ? 'bg-[#1F1F1F] dark:bg-white text-white dark:text-[#0F0F0F]'
                      : 'bg-[#EAE2D8] dark:bg-[#1B1B1B] text-[#696868] dark:text-[#A3A3A3] hover:text-[#1F1F1F] dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-[#0F0F0F] overflow-hidden border border-[#D6C7B8]/40 dark:border-[#262626] shadow-xs"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-[260px] object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9px] font-mono tracking-widest text-[#B85228] uppercase block">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-normal text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access & Road Guide */}
      <section className="py-16 bg-[#EAE2D8]/40 dark:bg-[#1B1B1B] border-t border-b border-[#D6C7B8]/40 dark:border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] dark:text-[#C87952] font-semibold flex items-center justify-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>TRAVEL & ORIENTATION</span>
            </span>
            <h2 className="font-serif text-3xl font-normal">
              Arriving in Mwingi by Road
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#262626] p-6 border border-[#D6C7B8]/40 dark:border-[#333] space-y-2">
              <div className="font-mono text-xs font-bold text-[#B85228] dark:text-[#C87952]">FROM NAIROBI (A3)</div>
              <p className="text-xs text-[#696868] dark:text-[#A3A3A3] font-light leading-relaxed">
                Take the Thika Superhighway onto the Garissa Highway (A3) through Matuu and Thika. Drive approximately 175 km (2.5 to 3 hours). Branol Hotel is conveniently located along the main road upon entering Mwingi Town.
              </p>
            </div>

            <div className="bg-white dark:bg-[#262626] p-6 border border-[#D6C7B8]/40 dark:border-[#333] space-y-2">
              <div className="font-mono text-xs font-bold text-[#B85228] dark:text-[#C87952]">FROM KITUI TOWN</div>
              <p className="text-xs text-[#696868] dark:text-[#A3A3A3] font-light leading-relaxed">
                Drive north on the Kitui-Mwingi Road for approximately 45 km (40 minutes). Upon reaching the A3 junction in Mwingi Town, turn into our secure entrance.
              </p>
            </div>

            <div className="bg-white dark:bg-[#262626] p-6 border border-[#D6C7B8]/40 dark:border-[#333] space-y-2">
              <div className="font-mono text-xs font-bold text-[#B85228] dark:text-[#C87952]">NEARBY SEMINARY & INSTITUTIONS</div>
              <p className="text-xs text-[#696868] dark:text-[#A3A3A3] font-light leading-relaxed">
                Located just 8 minutes from St Joseph Seminary Mwingi and 5 minutes from Mwingi Level 4 Hospital and Sub-County Offices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
