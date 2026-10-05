import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Lock } from 'lucide-react';
import { BRANOL_INFO } from '../data/hotelData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenStaffPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenStaffPortal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'stay', label: 'STAY' },
    { id: 'dine', label: 'DINE' },
    { id: 'meet', label: 'MEET' },
    { id: 'explore', label: 'EXPLORE' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DD] shadow-xs py-3'
          : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark & Architectural B Monogram */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B85228]"
        >
          {/* Monogram Box */}
          <div
            className={`w-9 h-9 border flex items-center justify-center font-serif text-lg font-semibold tracking-tighter transition-colors ${
              scrolled
                ? 'border-[#1A1A1A] text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white'
                : 'border-white/80 text-white group-hover:bg-white group-hover:text-[#1A1A1A]'
            }`}
          >
            B
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif text-xl sm:text-2xl font-normal tracking-[0.2em] leading-tight transition-colors ${
                scrolled ? 'text-[#121212]' : 'text-white'
              }`}
            >
              BRANOL
            </span>
            <span
              className={`text-[9px] uppercase tracking-[0.3em] font-medium ${
                scrolled ? 'text-[#706B65]' : 'text-white/80'
              }`}
            >
              HOTEL · MWINGI
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-xs tracking-[0.2em] font-medium transition-colors py-1 ${
                  scrolled
                    ? isActive
                      ? 'text-[#B85228] font-semibold'
                      : 'text-[#4A4641] hover:text-[#121212]'
                    : isActive
                    ? 'text-white font-semibold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B85228] transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Staff Portal Link */}
          <button
            onClick={onOpenStaffPortal}
            title="Branol Staff Portal / ServeOS"
            className={`p-2 rounded-full transition-colors ${
              scrolled
                ? 'text-[#706B65] hover:text-[#121212] hover:bg-[#EAE5DD]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Book A Room Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs tracking-[0.15em] font-medium uppercase transition-colors shadow-xs flex items-center gap-2 group"
          >
            <span>BOOK A ROOM</span>
            <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 bg-[#B85228] text-white text-[10px] tracking-[0.15em] font-medium uppercase"
          >
            BOOK
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors ${
              scrolled ? 'text-[#121212]' : 'text-white'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#121212] text-white border-b border-[#2A2A2A] px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-5">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#99938A] border-b border-[#2A2A2A] pb-2">
              NAVIGATION
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm tracking-[0.2em] font-medium py-1 transition-colors flex items-center justify-between ${
                  activeTab === item.id ? 'text-[#B85228]' : 'text-white/80 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <span className="text-xs text-[#B85228]">●</span>}
              </button>
            ))}

            <div className="pt-4 border-t border-[#2A2A2A] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-[#B85228] text-white text-xs tracking-[0.2em] font-medium uppercase text-center"
              >
                BOOK A ROOM
              </button>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`tel:${BRANOL_INFO.phone}`}
                  className="flex items-center gap-2 text-xs text-[#C5BFB5] hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B85228]" />
                  <span>Call Hotel</span>
                </a>
                <a
                  href={`https://wa.me/${BRANOL_INFO.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-[#C5BFB5] hover:text-white"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStaffPortal();
                  }}
                  className="flex items-center gap-1.5 text-xs text-[#99938A]"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Staff</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
