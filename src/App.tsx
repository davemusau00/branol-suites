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
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [quoteOpen, setQuoteOpen] = useState<boolean>(false);
  const [quotePackageName, setQuotePackageName] = useState<string>('Full Day Conference');
  const [staffPortalOpen, setStaffPortalOpen] = useState<boolean>(false);

  // Dynamic Title Management for SEO & User Context
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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
