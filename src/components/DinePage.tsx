import React, { useState, useEffect } from 'react';
import { Utensils, Search, Download, Clock, Calendar, MessageSquare, Check } from 'lucide-react';
import { IMAGES, BRANOL_INFO } from '../data/hotelData';

export const DinePage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Table reservation form state
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('19:00');
  const [resGuests, setResGuests] = useState('2');
  const [resSubmitted, setResSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMenuItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const categories = ['All', 'Breakfast', 'Main Dishes', 'Grill & Nyama', 'Soups & Salads', 'Beverages & Coffee'];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadPDFMenu = () => {
    // Generate a clean printable menu view
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>THE BRANOL HOTEL MWINGI - RESTAURANT MENU</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 40px; color: #121212; line-height: 1.5; }
            h1 { font-size: 32px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 4px; }
            .subtitle { font-size: 12px; font-family: sans-serif; text-transform: uppercase; letter-spacing: 3px; color: #666; border-bottom: 2px solid #B85228; pb: 10px; margin-bottom: 30px; }
            .category { font-size: 18px; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 25px; color: #B85228; text-transform: uppercase; }
            .item { display: flex; justify-content: space-between; margin-top: 12px; }
            .item-name { font-weight: bold; font-size: 14px; }
            .item-price { font-family: monospace; font-size: 14px; font-weight: bold; }
            .item-desc { font-size: 11px; color: #555; font-style: italic; margin-bottom: 8px; }
            .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #ccc; padding-top: 15px; }
          </style>
        </head>
        <body>
          <h1>THE BRANOL HOTEL</h1>
          <div class="subtitle">MWINGI · KITUI COUNTY · RESTAURANT MENU</div>
          ${categories
            .filter((c) => c !== 'All')
            .map((cat) => {
              const catItems = menuItems.filter((i) => i.category === cat);
              if (catItems.length === 0) return '';
              return `
                <div class="category">${cat}</div>
                ${catItems
                  .map(
                    (item) => `
                  <div class="item">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">KES ${item.priceKes}</span>
                  </div>
                  <div class="item-desc">${item.description}</div>
                `
                  )
                  .join('')}
              `;
            })
            .join('')}
          <div class="footer">THE BRANOL HOTEL MWINGI · TEL: ${BRANOL_INFO.phone} / ${BRANOL_INFO.phoneSecondary} · STAY COMPOSED.</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  const handleTableReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName || !resPhone || !resDate) return;
    setResSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] text-[#121212]">
      {/* Header Banner */}
      <div className="bg-[#121212] text-white py-16 lg:py-20 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B85228]">
              BRANOL / DINE
            </span>
            <span className="w-8 h-[1px] bg-[#B85228]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            Dine at your own pace.
          </h1>

          <p className="text-sm sm:text-base text-[#D6CEBE] font-light max-w-xl leading-relaxed">
            Freshly prepared breakfast, lunch, dinner and relaxed dining for hotel guests, Mwingi residents and corporate groups.
          </p>
        </div>
      </div>

      {/* Restaurant Overview Story */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#B85228]">
                RESTAURANT & LOUNGE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#121212]">
                Come hungry. Stay awhile.
              </h2>
              <p className="text-xs sm:text-sm text-[#4A4641] leading-relaxed font-light">
                Our kitchen emphasizes honest, fresh flavors from Kenya’s regional markets combined with contemporary executive dining. Whether stopping for early morning ginger tea, a business lunch, or evening goat choma with colleagues, Branol provides a serene setting.
              </p>

              <div className="pt-2 flex items-center gap-6 text-xs text-[#706B65] font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B85228]" />
                  <span>Breakfast: 6:30 AM – 10:00 AM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#B85228]" />
                  <span>All-Day Dining: 11:00 AM – 10:00 PM</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative border border-[#EAE5DD] shadow-md overflow-hidden">
                <img
                  src={IMAGES.dineRestaurant}
                  alt="Branol Hotel Dining Area"
                  className="w-full h-[320px] sm:h-[380px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Menu Section */}
      <section className="py-16 bg-[#F3EFEA] border-t border-b border-[#E0D8CB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#D6CEBE]">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
                RESPONSIVE WEB MENU
              </span>
              <h2 className="font-serif text-3xl font-normal text-[#121212] mt-0.5">
                Current Kitchen Offerings
              </h2>
            </div>

            <button
              onClick={handleDownloadPDFMenu}
              className="px-5 py-2.5 bg-[#121212] hover:bg-[#B85228] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>PRINT / DOWNLOAD PDF MENU</span>
            </button>
          </div>

          {/* Controls: Search & Category Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#121212] text-white'
                      : 'bg-white text-[#555] hover:text-[#121212] border border-[#D6CEBE]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-[#888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#D6CEBE] text-xs focus:outline-none focus:border-[#B85228]"
              />
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E0D8CB] p-5 space-y-1 hover:border-[#B85228] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-sm text-[#121212]">{item.name}</h3>
                  <span className="font-mono font-bold text-sm text-[#B85228] shrink-0">
                    KES {item.priceKes.toLocaleString()}
                  </span>
                </div>
                <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-[#888]">
                  {item.category}
                </span>
                <p className="text-xs text-[#555] font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table Reservation Box */}
      <section className="py-16 bg-[#121212] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B85228] font-semibold">
              TABLE RESERVATION
            </span>
            <h2 className="font-serif text-3xl font-normal text-white">
              Reserve a Table or Group Dining
            </h2>
            <p className="text-xs text-[#A8A299] max-w-md mx-auto">
              Ensure immediate seating for your family, business group or special dinner in Mwingi.
            </p>
          </div>

          {!resSubmitted ? (
            <form onSubmit={handleTableReservation} className="bg-[#1A1A1A] p-6 border border-[#2A2A2A] space-y-3 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={resName}
                  onChange={(e) => setResName(e.target.value)}
                  className="bg-[#262626] border border-[#3A3A3A] text-white text-xs p-2.5 focus:outline-none focus:border-[#B85228]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={resPhone}
                  onChange={(e) => setResPhone(e.target.value)}
                  className="bg-[#262626] border border-[#3A3A3A] text-white text-xs p-2.5 focus:outline-none focus:border-[#B85228]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <input
                  type="date"
                  required
                  value={resDate}
                  onChange={(e) => setResDate(e.target.value)}
                  className="bg-[#262626] border border-[#3A3A3A] text-white text-xs p-2.5 focus:outline-none focus:border-[#B85228]"
                />
                <input
                  type="time"
                  required
                  value={resTime}
                  onChange={(e) => setResTime(e.target.value)}
                  className="bg-[#262626] border border-[#3A3A3A] text-white text-xs p-2.5 focus:outline-none focus:border-[#B85228]"
                />
                <select
                  value={resGuests}
                  onChange={(e) => setResGuests(e.target.value)}
                  className="bg-[#262626] border border-[#3A3A3A] text-white text-xs p-2.5 focus:outline-none focus:border-[#B85228]"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="4">4 People</option>
                  <option value="6">6+ Group</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B85228] hover:bg-[#9A421E] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors mt-2"
              >
                REQUEST TABLE RESERVATION
              </button>
            </form>
          ) : (
            <div className="bg-[#1A1A1A] p-6 border border-[#2A2A2A] space-y-2">
              <Check className="w-8 h-8 text-[#25D366] mx-auto" />
              <h3 className="font-serif text-xl text-white">Table Request Received.</h3>
              <p className="text-xs text-[#A8A299]">
                Thank you, {resName}. Our restaurant team will hold your table for {resGuests} on {resDate} at {resTime}.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
