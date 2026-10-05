import React, { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, Utensils, Star, RefreshCw, Check, AlertCircle, Plus } from 'lucide-react';

interface StaffPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StaffPortalModal: React.FC<StaffPortalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'quotes' | 'feedback' | 'menu'>('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // New Menu Item State
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<any>('Main Dishes');
  const [newItemDesc, setNewItemDesc] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, qRes, fRes, mRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/quotes'),
        fetch('/api/feedback'),
        fetch('/api/menu'),
      ]);
      if (bRes.ok) setBookings(await bRes.json());
      if (qRes.ok) setQuotes(await qRes.json());
      if (fRes.ok) setFeedbacks(await fRes.json());
      if (mRes.ok) setMenuItems(await mRes.json());
    } catch (err) {
      console.error('Error loading portal data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchData();
  }, [isOpen]);

  if (!isOpen) return null;

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;
    try {
      await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: newItemCategory,
          name: newItemName,
          description: newItemDesc,
          priceKes: Number(newItemPrice),
          available: true,
        }),
      });
      setNewItemName('');
      setNewItemPrice('');
      setNewItemDesc('');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#EAE5DD] w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-[#121212] text-white p-6 flex items-center justify-between border-b border-[#262626] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#B85228] text-[#B85228] flex items-center justify-center font-serif font-bold text-sm">
              B
            </div>
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
                BRANOL HOTEL SERVEOS / STAFF PORTAL
              </span>
              <h3 className="font-serif text-2xl font-normal text-white">
                Operations & Enquiry Management
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 text-[#99938A] hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={onClose} className="text-[#99938A] hover:text-white p-1 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="bg-[#EAE5DD] border-b border-[#D6CEBE] px-6 flex gap-1 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'bookings'
                ? 'border-[#B85228] text-[#121212] bg-[#FAF8F5]'
                : 'border-transparent text-[#666] hover:text-[#121212]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#B85228]" />
            <span>Room Requests ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'quotes'
                ? 'border-[#B85228] text-[#121212] bg-[#FAF8F5]'
                : 'border-transparent text-[#666] hover:text-[#121212]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#B85228]" />
            <span>Conference Quotes ({quotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'feedback'
                ? 'border-[#B85228] text-[#121212] bg-[#FAF8F5]'
                : 'border-transparent text-[#666] hover:text-[#121212]'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-[#B85228]" />
            <span>Guest Feedback ({feedbacks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'menu'
                ? 'border-[#B85228] text-[#121212] bg-[#FAF8F5]'
                : 'border-transparent text-[#666] hover:text-[#121212]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-[#B85228]" />
            <span>Restaurant Menu ({menuItems.length})</span>
          </button>
        </div>

        {/* Tab Panels */}
        <div className="p-6 overflow-y-auto grow space-y-4">
          {activeTab === 'bookings' && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[#706B65]">
                Incoming Room Reservation Requests
              </h4>
              {bookings.length === 0 ? (
                <p className="text-xs text-[#888] italic py-8 text-center">No room requests received yet.</p>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white border border-[#D6CEBE] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#121212]">{b.id}</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-semibold uppercase ${
                              b.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : b.status === 'Cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                        <p className="font-semibold text-sm text-[#121212]">{b.fullName}</p>
                        <p className="text-[#555]">Phone: {b.phone} · Email: {b.email || 'N/A'}</p>
                        <p className="text-[#555]">
                          Dates: <span className="font-medium">{b.checkIn} to {b.checkOut}</span> ({b.guests} Guests)
                        </p>
                        {b.notes && <p className="text-[#777] italic">Note: "{b.notes}"</p>}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {b.status !== 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase"
                          >
                            Mark Confirmed
                          </button>
                        )}
                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[#706B65]">
                Conference & Event Quotes
              </h4>
              {quotes.length === 0 ? (
                <p className="text-xs text-[#888] italic py-8 text-center">No quote requests received yet.</p>
              ) : (
                <div className="space-y-3">
                  {quotes.map((q) => (
                    <div
                      key={q.id}
                      className="bg-white border border-[#D6CEBE] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#121212]">{q.id}</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-semibold uppercase ${
                              q.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {q.status}
                          </span>
                        </div>
                        <p className="font-semibold text-sm text-[#121212]">{q.organisation}</p>
                        <p className="text-[#555]">Contact: {q.contactPerson} ({q.phone})</p>
                        <p className="text-[#555]">
                          {q.meetingType} · {q.guestCount} Delegates on {q.date}
                        </p>
                        {q.notes && <p className="text-[#777] italic">Note: "{q.notes}"</p>}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {q.status !== 'Confirmed' && (
                          <button
                            onClick={() => updateQuoteStatus(q.id, 'Confirmed')}
                            className="px-3 py-1.5 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold uppercase"
                          >
                            Mark Handled
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[#706B65]">
                Private Guest Feedback & Reviews
              </h4>
              {feedbacks.length === 0 ? (
                <p className="text-xs text-[#888] italic py-8 text-center">No guest feedback entries recorded.</p>
              ) : (
                <div className="space-y-3">
                  {feedbacks.map((f) => (
                    <div key={f.id} className="bg-white border border-[#D6CEBE] p-4 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#121212]">{f.guestName}</span>
                        <div className="flex text-amber-500 text-sm">
                          {'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}
                        </div>
                      </div>
                      <p className="text-[#444] italic">"{f.comment}"</p>
                      {f.contactInfo && (
                        <p className="text-[#777] text-[11px]">Contact Info: {f.contactInfo}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-6">
              {/* Add New Menu Item */}
              <form onSubmit={handleAddMenuItem} className="bg-[#EAE5DD] p-4 border border-[#D6CEBE] space-y-3">
                <h5 className="text-xs font-semibold tracking-wider uppercase text-[#121212] flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[#B85228]" />
                  <span>Add New Menu Offering</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="bg-white border border-[#D6CEBE] text-xs py-2 px-3"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Main Dishes">Main Dishes</option>
                    <option value="Grill & Nyama">Grill & Nyama</option>
                    <option value="Soups & Salads">Soups & Salads</option>
                    <option value="Beverages & Coffee">Beverages & Coffee</option>
                  </select>

                  <input
                    type="text"
                    required
                    placeholder="Dish / Beverage Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="bg-white border border-[#D6CEBE] text-xs py-2 px-3"
                  />

                  <input
                    type="number"
                    required
                    placeholder="Price (KES)"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="bg-white border border-[#D6CEBE] text-xs py-2 px-3"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Short description / ingredients"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full bg-white border border-[#D6CEBE] text-xs py-2 px-3"
                />

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold tracking-wider uppercase"
                >
                  ADD TO LIVE DIGITAL MENU
                </button>
              </form>

              {/* Menu List */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-[#706B65]">
                  Active Menu Offerings ({menuItems.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {menuItems.map((item) => (
                    <div key={item.id} className="bg-white border border-[#D6CEBE] p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between font-semibold text-[#121212]">
                        <span>{item.name}</span>
                        <span className="font-mono text-[#B85228]">KES {item.priceKes}</span>
                      </div>
                      <span className="inline-block text-[10px] uppercase tracking-wider text-[#888] font-medium">
                        {item.category}
                      </span>
                      <p className="text-[#666] text-[11px]">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
