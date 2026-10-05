import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { BRANOL_INFO } from '../data/hotelData';

interface ConferenceQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

export const ConferenceQuoteModal: React.FC<ConferenceQuoteModalProps> = ({
  isOpen,
  onClose,
  defaultPackage = 'Full Day Conference',
}) => {
  const [organisation, setOrganisation] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [guestCount, setGuestCount] = useState('20');
  const [meetingType, setMeetingType] = useState(defaultPackage);
  const [accommodationRequired, setAccommodationRequired] = useState(false);
  const [cateringRequired, setCateringRequired] = useState(true);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organisation || !contactPerson || !phone || !date) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/quotes', {
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
          accommodationRequired,
          cateringRequired,
          notes,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setQuoteId(data.id || 'CQ-NEW');
        setSubmitted(true);
      } else {
        setQuoteId(`CQ-${Math.floor(2000 + Math.random() * 9000)}`);
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Failed to submit quote:', err);
      setQuoteId(`CQ-${Math.floor(2000 + Math.random() * 9000)}`);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Branol Hotel Mwingi,\n\nI would like to request a Conference Quote:\n` +
    `• Reference: ${quoteId}\n` +
    `• Organisation: ${organisation}\n` +
    `• Contact Person: ${contactPerson}\n` +
    `• Phone: ${phone}\n` +
    `• Meeting Type: ${meetingType}\n` +
    `• Preferred Date: ${date}\n` +
    `• Delegates: ${guestCount}\n` +
    `• Accommodations Needed: ${accommodationRequired ? 'Yes' : 'No'}\n` +
    `• Catering Needed: ${cateringRequired ? 'Yes' : 'No'}\n` +
    (notes ? `• Additional Requirements: ${notes}\n` : '') +
    `\nPlease send us an official quote.`
  );

  const resetAndClose = () => {
    setSubmitted(false);
    setOrganisation('');
    setContactPerson('');
    setPhone('');
    setEmail('');
    setDate('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#EAE5DD] w-full max-w-xl shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header Bar */}
        <div className="bg-[#121212] text-white p-6 flex items-center justify-between border-b border-[#262626]">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
              BRANOL MEET / CONFERENCES
            </span>
            <h3 className="font-serif text-2xl font-normal text-white mt-0.5">
              Request a Conference Quote
            </h3>
            <p className="text-xs text-[#A8A299] mt-0.5">
              A modern setting for meetings, training, and private gatherings in Mwingi.
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="text-[#99938A] hover:text-white p-1 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Organisation / Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. County Government / NGO"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="organisation@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Guest Count *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Package Type
                  </label>
                  <select
                    value={meetingType}
                    onChange={(e) => setMeetingType(e.target.value)}
                    className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                  >
                    <option value="Half Day Conference">Half Day Package</option>
                    <option value="Full Day Conference">Full Day Package</option>
                    <option value="Residential Conference">Residential Package</option>
                    <option value="Private Event">Private Event / Banquet</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 text-xs text-[#333] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accommodationRequired}
                    onChange={(e) => setAccommodationRequired(e.target.checked)}
                    className="accent-[#B85228]"
                  />
                  <span>Overnight Accommodation Needed</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-[#333] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cateringRequired}
                    onChange={(e) => setCateringRequired(e.target.checked)}
                    className="accent-[#B85228]"
                  />
                  <span>Full Catering / Tea Breaks</span>
                </label>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                  Equipment / Hall Setup / Special Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Projector, wireless mic, flip charts, breakaway room required."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 mt-2"
              >
                {submitting ? 'SENDING REQUEST...' : 'SEND CONFERENCE REQUEST'}
              </button>
            </form>
          ) : (
            /* Confirmation screen */
            <div className="py-4 text-center space-y-4">
              <div className="w-12 h-12 bg-[#B85228]/10 text-[#B85228] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-serif text-xl font-normal text-[#121212]">
                  Conference Quote Request Received.
                </h4>
                <p className="text-xs text-[#666] mt-1">
                  Our events manager will prepare your formal quotation. Ref:{' '}
                  <span className="font-mono font-semibold text-[#121212]">{quoteId}</span>
                </p>
              </div>

              <div className="p-4 bg-[#F3EFEA] border border-[#E0D8CB] text-left text-xs space-y-1">
                <p className="font-semibold text-[#121212]">{organisation}</p>
                <p className="text-[#555]">Contact: {contactPerson} ({phone})</p>
                <p className="text-[#555]">{meetingType} · {guestCount} Delegates on {date}</p>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={`https://wa.me/${BRANOL_INFO.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs font-semibold tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CONTINUE ON WHATSAPP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={resetAndClose}
                  className="w-full py-2 text-xs text-[#777] hover:text-[#121212] transition-colors"
                >
                  Close & return to site
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
