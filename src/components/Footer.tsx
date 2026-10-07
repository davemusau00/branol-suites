import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from 'lucide-react';
import { BRANOL_INFO } from '../data/hotelData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenStaffPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenBooking,
  onOpenStaffPortal,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] text-[#E5DFD5] pt-16 pb-12 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#262626]">
          {/* Column 1: Brand & Monogram (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-[#FAF8F5] flex items-center justify-center font-serif text-xl text-white font-semibold">
                  B
                </div>
                <div>
                  <h2 className="font-serif text-3xl tracking-[0.2em] text-white leading-none">
                    THE BRANOL
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#99938A] mt-1">
                    HOTEL · MWINGI
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#A8A299] max-w-sm leading-relaxed font-light">
                A modern hotel in Mwingi, Kitui County. Contemporary rooms, generous gathering spaces, and warm hospitality designed around a quieter pace.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-xs text-[#B85228] font-medium tracking-wider uppercase">
                <span>STAY</span>
                <span className="text-[#555] font-light">/</span>
                <span>DINE</span>
                <span className="text-[#555] font-light">/</span>
                <span>MEET</span>
              </div>
            </div>

            <div className="text-xs text-[#736E67]">
              <span>Mwingi · Kitui County · Kenya</span>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-white border-b border-[#262626] pb-2">
              EXPLORE BRANOL
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A8A299]">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('stay');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Stay — Contemporary Rooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('dine');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Dine — Restaurant & Bar Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('meet');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Meet — Conferences & Quotes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('explore');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Explore Mwingi — Orientation & Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact & Directions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-[#B85228] font-medium hover:underline flex items-center gap-1 mt-1"
                >
                  <span>Request Room Reservation</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-white border-b border-[#262626] pb-2">
              CONTACT & LOCATION
            </h3>
            <div className="space-y-3 text-xs text-[#A8A299]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B85228] shrink-0 mt-0.5" />
                <span>{BRANOL_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B85228] shrink-0" />
                <div className="flex flex-col items-start">
                  <a href={`tel:${BRANOL_INFO.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                    {BRANOL_INFO.phone}
                  </a>
                  <a href={`tel:${BRANOL_INFO.phoneSecondary.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                    {BRANOL_INFO.phoneSecondary}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${BRANOL_INFO.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {BRANOL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B85228] shrink-0" />
                <a href={`mailto:${BRANOL_INFO.email}`} className="hover:text-white transition-colors">
                  {BRANOL_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 border border-[#3A3A3A] hover:border-[#B85228] text-xs text-white uppercase tracking-[0.15em] transition-colors text-center"
              >
                GET DIRECTIONS TO BRANOL
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#736E67] gap-4">
          <div className="flex items-center gap-4">
          <span>© {currentYear} The Branol Hotel Mwingi. All rights reserved.</span>
            <span>·</span>
            <button onClick={onOpenStaffPortal} className="hover:text-white transition-colors">
              Staff Portal
            </button>
          </div>

          {/* Iconic Slogan Line */}
          <div className="text-center sm:text-right">
            <span className="font-serif italic text-sm tracking-widest text-[#B85228] font-medium">
              STAY COMPOSED.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
