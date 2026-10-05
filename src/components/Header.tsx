import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Lock, Sun, Moon } from 'lucide-react';
import { BRANOL_INFO } from '../data/hotelData';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenBooking: () => void;
  onOpenStaffPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
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
          ? 'bg-[#FAF8F4]/95 dark:bg-[#0F0F0F]/95 backdrop-blur-md border-b border-[#D6C7B8]/40 dark:border-[#262626] shadow-xs py-3'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark & Architectural Monogram */}
        <BrandLogo
          variant={scrolled ? (darkMode ? 'dark' : 'auto') : 'dark'}
          onClick={() => handleNavClick('home')}
        />

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
                      ? 'text-[#B85228] dark:text-[#C87952] font-semibold'
                      : 'text-[#4A4641] dark:text-[#A3A3A3] hover:text-[#121212] dark:hover:text-white'
                    : isActive
                    ? 'text-white font-semibold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B85228] dark:bg-[#C87952] transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle & Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-colors ${
              scrolled
                ? 'text-[#706B65] dark:text-[#A3A3A3] hover:text-[#121212] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Staff Portal Link */}
          <button
            onClick={onOpenStaffPortal}
            title="Branol Staff Portal / ServeOS"
            className={`p-2 rounded-full transition-colors ${
              scrolled
                ? 'text-[#706B65] dark:text-[#A3A3A3] hover:text-[#121212] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
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

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-1.5 transition-colors ${
              scrolled ? 'text-[#121212] dark:text-white' : 'text-white'
            }`}
            aria-label="Toggle theme mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 bg-[#B85228] text-white text-[10px] tracking-[0.15em] font-medium uppercase"
          >
            BOOK
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors ${
              scrolled ? 'text-[#121212] dark:text-white' : 'text-white'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0F0F0F] text-white border-b border-[#2A2A2A] px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-5">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#99938A] border-b border-[#2A2A2A] pb-2 flex items-center justify-between">
              <span>NAVIGATION</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-xs text-[#B85228] flex items-center gap-1"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
              </button>
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
