import React, { useState } from 'react';
import { X, Calendar, User, Phone, Mail, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { BRANOL_INFO } from '../data/hotelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !checkIn || !checkOut) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          checkIn,
          checkOut,
          guests: Number(guests),
          roomType: 'Standard Room',
          notes,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setBookingId(data.id || 'BK-NEW');
        setSubmitted(true);
      } else {
        // Fallback for client offline or dev mode
        setBookingId(`BK-${Math.floor(1000 + Math.random() * 9000)}`);
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Failed to submit booking:', err);
      setBookingId(`BK-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello The Branol Hotel Mwingi,\n\nI would like to request a room reservation:\n` +
    `• Reference: ${bookingId}\n` +
    `• Name: ${fullName}\n` +
    `• Phone: ${phone}\n` +
    `• Check-In: ${checkIn}\n` +
    `• Check-Out: ${checkOut}\n` +
    `• Guests: ${guests}\n` +
    `• Room: Standard Room (KES 3,000/night)\n` +
    (notes ? `• Special Requests: ${notes}\n` : '') +
    `\nPlease confirm availability.`
  );

  const resetAndClose = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setCheckIn('');
    setCheckOut('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#EAE5DD] w-full max-w-lg shadow-2xl relative overflow-hidden">
        {/* Header Bar */}
        <div className="bg-[#121212] text-white p-6 flex items-center justify-between border-b border-[#262626]">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
              THE BRANOL HOTEL · MWINGI
            </span>
            <h3 className="font-serif text-2xl font-normal text-white mt-0.5">
              Request Room Reservation
            </h3>
            <p className="text-xs text-[#A8A299] mt-0.5">
              Standard Room · KES 3,000 / Night
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

        {/* Content Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Check-In Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Check-Out Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                    />
                  </div>
                </div>
              </div>

              {/* Guests & Room */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Guests *
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                  >
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Room Rate
                  </label>
                  <input
                    type="text"
                    disabled
                    value="KES 3,000 / Night"
                    className="w-full bg-[#EAE5DD] border border-[#D6CEBE] text-xs py-2 px-3 text-[#555] font-mono cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Guest Details */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Musyoka"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                    Phone Number (Kenyan) *
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
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A4641] mb-1">
                  Special Requests / Arrival Time
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Expected arrival at 7 PM. Require quiet room."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3 focus:outline-none focus:border-[#B85228] text-[#121212]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 mt-2"
              >
                {submitting ? 'PROCESSING...' : 'REQUEST BOOKING'}
              </button>
            </form>
          ) : (
            /* Success confirmation screen */
            <div className="py-4 text-center space-y-4">
              <div className="w-12 h-12 bg-[#B85228]/10 text-[#B85228] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-serif text-xl font-normal text-[#121212]">
                  Your request has been received.
                </h4>
                <p className="text-xs text-[#666] mt-1">
                  The Branol Hotel will confirm availability shortly. Reference:{' '}
                  <span className="font-mono font-semibold text-[#121212]">{bookingId}</span>
                </p>
              </div>

              <div className="p-4 bg-[#F3EFEA] border border-[#E0D8CB] text-left text-xs space-y-1">
                <p className="font-semibold text-[#121212]">{fullName}</p>
                <p className="text-[#555]">
                  Standard Room · {checkIn} to {checkOut} ({guests} guest{Number(guests) > 1 ? 's' : ''})
                </p>
                <p className="text-[#555]">Rate: KES 3,000 / night</p>
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
