import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, MessageSquare, Calendar } from 'lucide-react';
import { IMAGES, ROOM_FACTS, STANDARD_ROOM_AMENITIES, BRANOL_INFO } from '../data/hotelData';

interface RoomFeaturedCardProps {
  onOpenBooking: () => void;
}

export const RoomFeaturedCard: React.FC<RoomFeaturedCardProps> = ({ onOpenBooking }) => {
  const roomImages = [IMAGES.roomStandard, IMAGES.roomBathroom];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const nextImg = () => {
    setCurrentImgIndex((prev) => (prev + 1) % roomImages.length);
  };

  const prevImg = () => {
    setCurrentImgIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length);
  };

  const whatsappLink = `https://wa.me/${BRANOL_INFO.whatsapp}?text=${encodeURIComponent(
    'Hello Branol Hotel, I would like to check availability for the Standard Room (KES 3,000/night).'
  )}`;

  return (
    <section className="py-20 lg:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E2DBD0]">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
              FEATURED ACCOMMODATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#121212] mt-1">
              Standard Room
            </h2>
            <p className="text-xs text-[#706B65] mt-1 font-light">
              Comfortable. Modern. A restful stay in Mwingi.
            </p>
          </div>

          <div className="mt-4 md:mt-0 font-mono">
            <span className="font-serif text-3xl font-semibold text-[#121212]">KES 3,000</span>
            <span className="text-xs text-[#706B65] uppercase tracking-wider ml-1">/ NIGHT</span>
          </div>
        </div>

        {/* Room Gallery & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Gallery Carousel (7 cols) */}
          <div className="lg:col-span-7 relative group bg-[#121212] border border-[#EAE5DD] shadow-md flex items-center">
            <img
              src={roomImages[currentImgIndex]}
              alt={`Branol Hotel Standard Room photo ${currentImgIndex + 1}`}
              className="w-full h-[360px] sm:h-[450px] object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Carousel Controls */}
            <button
              onClick={prevImg}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[#B85228] text-white flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextImg}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[#B85228] text-white flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {roomImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentImgIndex === idx ? 'bg-[#B85228] w-6' : 'bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Details & Verified Facts (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#EAE5DD] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#121212] border-b border-[#E2DBD0] pb-2 mb-4">
                VERIFIED STAY FACTS
              </h3>

              {/* Verified Facts Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {ROOM_FACTS.map((fact, i) => (
                  <div key={i} className="bg-[#FAF8F5] p-3 border border-[#EAE5DD]">
                    <span className="block text-[9px] font-mono tracking-widest text-[#706B65] uppercase">
                      {fact.label}
                    </span>
                    <span className="text-xs font-semibold text-[#121212] mt-0.5 block">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <h4 className="text-[11px] font-semibold tracking-wider uppercase text-[#706B65] mb-3">
                INCLUDED AMENITIES
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#4A4641]">
                {STANDARD_ROOM_AMENITIES.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#B85228] shrink-0" />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#EAE5DD]">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK THIS ROOM — KES 3,000</span>
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 border border-[#25D366] text-[#121212] hover:bg-[#25D366] hover:text-white text-xs font-semibold tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                <span>BOOK ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
