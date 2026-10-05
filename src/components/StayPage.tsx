import React from 'react';
import { RoomFeaturedCard } from './RoomFeaturedCard';
import { FREQUENT_QUESTIONS, BRANOL_INFO } from '../data/hotelData';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface StayPageProps {
  onOpenBooking: () => void;
  setActiveTab: (tab: string) => void;
}

export const StayPage: React.FC<StayPageProps> = ({ onOpenBooking, setActiveTab }) => {
  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] text-[#121212]">
      {/* Header Banner */}
      <div className="bg-[#121212] text-white py-16 lg:py-20 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B85228]">
              BRANOL / STAY
            </span>
            <span className="w-8 h-[1px] bg-[#B85228]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            A simpler kind of stay.
          </h1>

          <p className="text-sm sm:text-base text-[#D6CEBE] font-light max-w-xl leading-relaxed">
            Comfortable, contemporary rooms designed for rest, work and an unhurried night in Mwingi.
          </p>
        </div>
      </div>

      {/* Main Room Card */}
      <RoomFeaturedCard onOpenBooking={onOpenBooking} />

      {/* FAQ Section */}
      <section className="py-16 bg-[#F3EFEA] border-t border-b border-[#E0D8CB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
              INFORMED CHOICE
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#121212]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FREQUENT_QUESTIONS.map((faq, i) => (
              <div key={i} className="bg-white p-5 border border-[#E0D8CB] space-y-2">
                <h3 className="text-sm font-semibold text-[#121212] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#B85228] shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-[#555] leading-relaxed pl-6 font-light">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Sell Footer */}
      <section className="py-12 bg-[#FAF8F5] text-center">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#706B65] font-semibold">
            HERE FOR MORE THAN THE NIGHT?
          </span>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('dine')}
              className="px-6 py-2.5 bg-[#121212] text-white text-xs uppercase tracking-wider hover:bg-[#B85228] transition-colors"
            >
              EXPLORE DINE
            </button>
            <button
              onClick={() => setActiveTab('meet')}
              className="px-6 py-2.5 border border-[#121212] text-[#121212] text-xs uppercase tracking-wider hover:bg-[#121212] hover:text-white transition-colors"
            >
              PLAN A MEETING
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
