import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { BRANOL_INFO } from '../data/hotelData';

interface MobileActionBarProps {
  onOpenBooking: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#121212]/95 backdrop-blur-md border-t border-[#2A2A2A] px-2 py-2 flex items-center justify-around text-white shadow-2xl">
      {/* CALL Button */}
      <a
        href={`tel:${BRANOL_INFO.phone.replace(/\s/g, '')}`}
        className="flex-1 flex flex-col items-center justify-center py-1.5 text-center transition-colors hover:text-[#B85228]"
      >
        <Phone className="w-4 h-4 mb-0.5 text-[#B85228]" />
        <span className="text-[10px] tracking-[0.15em] font-medium uppercase">CALL</span>
      </a>

      <div className="w-[1px] h-6 bg-[#2A2A2A]" />

      {/* WHATSAPP Button */}
      <a
          href={`https://wa.me/${BRANOL_INFO.whatsapp}?text=${encodeURIComponent('Hello The Branol Hotel, I would like to enquire about room availability.')}`}
        target="_blank"
        rel="noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1.5 text-center transition-colors hover:text-[#25D366]"
      >
        <MessageSquare className="w-4 h-4 mb-0.5 text-[#25D366]" />
        <span className="text-[10px] tracking-[0.15em] font-medium uppercase">WHATSAPP</span>
      </a>

      <div className="w-[1px] h-6 bg-[#2A2A2A]" />

      {/* BOOK Button */}
      <button
        onClick={onOpenBooking}
        className="flex-1 flex flex-col items-center justify-center py-1.5 text-center transition-colors text-[#B85228] font-semibold"
      >
        <Calendar className="w-4 h-4 mb-0.5 text-[#B85228]" />
        <span className="text-[10px] tracking-[0.15em] uppercase">BOOK</span>
      </button>
    </div>
  );
};
