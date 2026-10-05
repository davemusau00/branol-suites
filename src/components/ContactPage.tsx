import React, { useState } from 'react';
import { BRANOL_INFO } from '../data/hotelData';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSent(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] text-[#121212]">
      {/* Header Banner */}
      <div className="bg-[#121212] text-white py-16 lg:py-20 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B85228]">
              BRANOL / CONTACT
            </span>
            <span className="w-8 h-[1px] bg-[#B85228]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            Find us. Stay awhile.
          </h1>

          <p className="text-sm sm:text-base text-[#D6CEBE] font-light max-w-xl leading-relaxed">
            Reach out directly to Branol Hotel Mwingi for reservations, room inquiries, conference bookings, or directions.
          </p>
        </div>
      </div>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Direct Contact Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
                  DIRECT CHANNELS
                </span>
                <h2 className="font-serif text-3xl font-normal text-[#121212] mt-1">
                  Branol Hotel Contact Info
                </h2>
              </div>

              <div className="space-y-4 text-xs text-[#333]">
                <div className="bg-white p-4 border border-[#EAE5DD] flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B85228] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#121212] block mb-0.5">LOCATION ADDRESS</span>
                    <p className="text-[#555]">{BRANOL_INFO.fullAddress}</p>
                  </div>
                </div>

                <div className="bg-white p-4 border border-[#EAE5DD] flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#B85228] shrink-0" />
                  <div>
                    <span className="font-bold text-[#121212] block mb-0.5">PHONE DIRECT</span>
                    <a href={`tel:${BRANOL_INFO.phone}`} className="text-[#B85228] hover:underline font-mono">
                      {BRANOL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="bg-white p-4 border border-[#EAE5DD] flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-[#25D366] shrink-0" />
                  <div>
                    <span className="font-bold text-[#121212] block mb-0.5">WHATSAPP DIRECT</span>
                    <a
                      href={`https://wa.me/${BRANOL_INFO.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#25D366] hover:underline font-mono"
                    >
                      +254 700 123 456
                    </a>
                  </div>
                </div>

                <div className="bg-white p-4 border border-[#EAE5DD] flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#B85228] shrink-0" />
                  <div>
                    <span className="font-bold text-[#121212] block mb-0.5">EMAIL</span>
                    <a href={`mailto:${BRANOL_INFO.email}`} className="text-[#121212] hover:underline">
                      {BRANOL_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Message Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 border border-[#EAE5DD] shadow-xs space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
                  ENQUIRY FORM
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#121212] mt-1">
                  Send a Direct Message
                </h3>
              </div>

              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-[#555] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mary Nthenya"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D6CEBE] text-xs py-2.5 px-3 focus:outline-none focus:border-[#B85228]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-[#555] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+254 7XX XXX XXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#D6CEBE] text-xs py-2.5 px-3 focus:outline-none focus:border-[#B85228]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-[#555] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D6CEBE] text-xs py-2.5 px-3 focus:outline-none focus:border-[#B85228]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-[#555] mb-1">
                      Your Message or Question *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D6CEBE] text-xs py-2.5 px-3 focus:outline-none focus:border-[#B85228]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <span>SEND MESSAGE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#25D366] mx-auto" />
                  <h4 className="font-serif text-2xl text-[#121212]">Message Sent</h4>
                  <p className="text-xs text-[#666]">
                    Thank you, {name}. We will get back to you shortly on {phone}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
