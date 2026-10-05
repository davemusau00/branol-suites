import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { BookingModal } from './components/BookingModal';
import { ConferenceQuoteModal } from './components/ConferenceQuoteModal';
import { StaffPortalModal } from './components/StaffPortalModal';

// Home View Sections
import { Hero } from './components/Hero';
import { FirstScrollStory } from './components/FirstScrollStory';
import { StayDineMeetPanels } from './components/StayDineMeetPanels';
import { RoomFeaturedCard } from './components/RoomFeaturedCard';
import { ConferencePackagesSection } from './components/ConferencePackagesSection';
import { ExploreMwingiSection } from './components/ExploreMwingiSection';
import { GoogleReviewSection } from './components/GoogleReviewSection';

// Dedicated Sub-Pages
import { StayPage } from './components/StayPage';
import { DinePage } from './components/DinePage';
import { MeetPage } from './components/MeetPage';
import { ExplorePage } from './components/ExplorePage';
import { ContactPage } from './components/ContactPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('branol_theme') === 'dark';
  });
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [quoteOpen, setQuoteOpen] = useState<boolean>(false);
  const [quotePackageName, setQuotePackageName] = useState<string>('Full Day Conference');
  const [staffPortalOpen, setStaffPortalOpen] = useState<boolean>(false);

  // Sync Dark Mode class with DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('branol_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('branol_theme', 'light');
    }
  }, [darkMode]);

  // Dynamic Document Title Updates
  useEffect(() => {
    switch (activeTab) {
      case 'stay':
        document.title = 'Standard Rooms & Accommodation | Branol Hotel Mwingi';
        break;
      case 'dine':
        document.title = 'Restaurant & Lounge Menu | Branol Hotel Mwingi';
        break;
      case 'meet':
        document.title = 'Conference & Meeting Packages | Branol Hotel Mwingi';
        break;
      case 'explore':
        document.title = 'Explore Mwingi & Orientation | Branol Hotel Mwingi';
        break;
      case 'contact':
        document.title = 'Contact & Directions | Branol Hotel Mwingi';
        break;
      default:
        document.title = 'Branol Hotel | Rooms, Restaurant & Conferences in Mwingi';
    }
  }, [activeTab]);

  const handleOpenQuoteWithPackage = (pkgName: string) => {
    setQuotePackageName(pkgName);
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] dark:bg-[#0F0F0F] text-[#1F1F1F] dark:text-[#EDE9E1] font-sans antialiased transition-colors duration-300">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenStaffPortal={() => setStaffPortalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero
              onOpenBooking={() => setBookingOpen(true)}
              setActiveTab={setActiveTab}
            />
            <FirstScrollStory />
            <StayDineMeetPanels
              setActiveTab={setActiveTab}
              onOpenConferenceQuote={() => setQuoteOpen(true)}
            />
            <RoomFeaturedCard onOpenBooking={() => setBookingOpen(true)} />
            <ConferencePackagesSection
              onOpenQuoteModalWithPackage={handleOpenQuoteWithPackage}
            />
            <ExploreMwingiSection setActiveTab={setActiveTab} />
            <GoogleReviewSection />
          </>
        )}

        {activeTab === 'stay' && (
          <StayPage
            onOpenBooking={() => setBookingOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'dine' && <DinePage />}

        {activeTab === 'meet' && (
          <MeetPage onOpenQuoteModalWithPackage={handleOpenQuoteWithPackage} />
        )}

        {activeTab === 'explore' && (
          <ExplorePage onOpenBooking={() => setBookingOpen(true)} />
        )}

        {activeTab === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenStaffPortal={() => setStaffPortalOpen(true)}
      />

      {/* Persistent Mobile Bottom Action Bar */}
      <MobileActionBar onOpenBooking={() => setBookingOpen(true)} />

      {/* Modals & Overlays */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <ConferenceQuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultPackage={quotePackageName}
      />

      <StaffPortalModal
        isOpen={staffPortalOpen}
        onClose={() => setStaffPortalOpen(false)}
      />
    </div>
  );
}
