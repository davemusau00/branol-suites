import React, { useState } from 'react';
import { Check, Send, Sparkles } from 'lucide-react';
import { CONFERENCE_PACKAGES, BRANOL_INFO } from '../data/hotelData';

interface ConferencePackagesSectionProps {
  onOpenQuoteModalWithPackage: (packageName: string) => void;
}

export const ConferencePackagesSection: React.FC<ConferencePackagesSectionProps> = ({
  onOpenQuoteModalWithPackage,
}) => {
  const [organisation, setOrganisation] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [guestCount, setGuestCount] = useState('20');
  const [meetingType, setMeetingType] = useState('Full Day Conference');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organisation || !contactPerson || !phone || !date) return;

    setSubmitting(true);
    try {
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organisation,
          contactPerson,
          phone,
          email,
          date,
          guestCount: Number(guestCount),
          meetingType,
          accommodationRequired: false,
          cateringRequired: true,
          notes: 'Submitted via homepage quote form',
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="conference-packages" className="py-20 lg:py-24 bg-[#FAF8F5] text-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
            CONFERENCES & EVENTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#121212]">
            Spaces for brighter ideas.
          </h2>
          <p className="text-xs sm:text-sm text-[#555] font-light max-w-lg mx-auto">
            Bring the team, the conversation and the agenda. From strategic meetings to corporate retreats and private celebrations in Mwingi.
          </p>
        </div>

        {/* 4 Conference Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CONFERENCE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white border p-6 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular ? 'border-[#B85228] shadow-md' : 'border-[#EAE5DD] hover:border-[#121212]'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 right-4 bg-[#B85228] text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5">
                  MOST POPULAR
                </div>
              )}

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#706B65]">
                  {pkg.capacity}
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#121212] mt-1 mb-2">
                  {pkg.title}
                </h3>

                <div className="font-mono text-sm font-semibold text-[#B85228] border-b border-[#EAE5DD] pb-3 mb-4">
                  {pkg.priceUnit}
                </div>

                <ul className="space-y-2.5 text-xs text-[#4A4641] mb-6">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B85228] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenQuoteModalWithPackage(pkg.title)}
                className={`w-full py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                  pkg.popular
                    ? 'bg-[#B85228] hover:bg-[#9A421E] text-white'
                    : 'border border-[#121212] hover:bg-[#121212] hover:text-white text-[#121212]'
                }`}
              >
                REQUEST QUOTE
              </button>
            </div>
          ))}
        </div>

        {/* Integrated Quote Request Form Container */}
        <div className="bg-[#121212] text-white p-8 lg:p-12 border border-[#262626] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
                DIRECT ENQUIRY
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white leading-tight">
                Request a Conference Quote
              </h3>
              <p className="text-xs text-[#A8A299] font-light leading-relaxed">
                Fill out your event details. Our events coordinator will send a detailed proforma quotation directly to your email or WhatsApp.
              </p>
              <div className="pt-2 text-xs text-[#B85228] font-mono">
                Direct Line: +254 700 123 456
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#1A1A1A] p-6 border border-[#2A2A2A]">
              {!submitted ? (
                <form onSubmit={handleSubmitInline} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Organisation / Company *"
                      value={organisation}
                      onChange={(e) => setOrganisation(e.target.value)}
                      className="bg-[#262626] border border-[#3A3A3A] text-white text-xs py-2.5 px-3 focus:outline-none focus:border-[#B85228]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Contact Person *"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="bg-[#262626] border border-[#3A3A3A] text-white text-xs py-2.5 px-3 focus:outline-none focus:border-[#B85228]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-[#262626] border border-[#3A3A3A] text-white text-xs py-2.5 px-3 focus:outline-none focus:border-[#B85228]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#262626] border border-[#3A3A3A] text-white text-xs py-2.5 px-3 focus:outline-none focus:border-[#B85228]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-[#262626] border border-[#3A3A3A] text-white text-xs py-2.5 px-3 focus:outline-none focus:border-[#B85228]"
                    />
                    <input
                      type="number"
                      min="5"
                      placeholder="Guest Count"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="bg-[#262626] border border-[#3A3A3A] text-white text-xs py-2.5 px-3 focus:outline-none focus:border-[#B85228]"
                    />
                    <select
                      value={meetingType}
                      onChange={(e) => setMeetingType(e.target.value)}
                      className="bg-[#262626] border border-[#3A3A3A] text-white text-xs py-2.5 px-3 focus:outline-none focus:border-[#B85228]"
                    >
                      <option value="Half Day Conference">Half Day</option>
                      <option value="Full Day Conference">Full Day</option>
                      <option value="Residential Conference">Residential</option>
                      <option value="Private Event">Private Event</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{submitting ? 'SENDING...' : 'SEND REQUEST'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="text-[#B85228] font-serif text-2xl">Thank you.</div>
                  <p className="text-xs text-[#C5BFB5]">
                    Your request for <span className="text-white font-semibold">{organisation}</span> has been logged. Our conference lead will contact you directly at <span className="text-white font-semibold">{phone}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#B85228] underline pt-2 block mx-auto"
                  >
                    Send another enquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
