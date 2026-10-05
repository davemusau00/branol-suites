import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory data store with sensible initial mock data
interface Booking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}

interface ConferenceQuote {
  id: string;
  organisation: string;
  contactPerson: string;
  phone: string;
  email: string;
  date: string;
  guestCount: number;
  meetingType: string;
  accommodationRequired: boolean;
  cateringRequired: boolean;
  notes?: string;
  status: 'Pending' | 'Quoted' | 'Confirmed';
  createdAt: string;
}

interface GuestFeedback {
  id: string;
  guestName: string;
  rating: number;
  comment: string;
  contactInfo?: string;
  createdAt: string;
}

interface MenuItem {
  id: string;
  category: 'Breakfast' | 'Main Dishes' | 'Grill & Nyama' | 'Soups & Salads' | 'Beverages & Coffee';
  name: string;
  description: string;
  priceKes: number;
  available: boolean;
}

// Initial Data
const bookings: Booking[] = [
  {
    id: 'BK-1001',
    fullName: 'Peter Musyoka',
    phone: '+254 712 345 678',
    email: 'pmusyoka@example.com',
    checkIn: '2026-10-12',
    checkOut: '2026-10-14',
    guests: 1,
    roomType: 'Standard Room',
    notes: 'Late check-in around 8 PM after road trip from Nairobi.',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'BK-1002',
    fullName: 'Grace Wambui',
    phone: '+254 722 987 654',
    email: 'grace.wambui@sem.org',
    checkIn: '2026-10-18',
    checkOut: '2026-10-19',
    guests: 2,
    roomType: 'Standard Room',
    notes: 'Visiting St Joseph Seminary in Mwingi.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  }
];

const quotes: ConferenceQuote[] = [
  {
    id: 'CQ-2001',
    organisation: 'Kitui Development Initiative',
    contactPerson: 'David Kilonzo',
    phone: '+254 733 112 233',
    email: 'dkilonzo@kdi.or.ke',
    date: '2026-10-25',
    guestCount: 25,
    meetingType: 'Full Day Conference',
    accommodationRequired: true,
    cateringRequired: true,
    notes: 'Requires projector, flipcharts, and morning/afternoon tea breaks with local snacks.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

const feedbacks: GuestFeedback[] = [
  {
    id: 'FB-3001',
    guestName: 'James Mutua',
    rating: 5,
    comment: 'Quiet rooms, extremely polite staff, and exceptional breakfast. Mwingi needed a place like Branol.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  }
];

const menuItems: MenuItem[] = [
  {
    id: 'MN-01',
    category: 'Breakfast',
    name: 'Branol Country Breakfast',
    description: 'Two organic eggs to order, sausage, baked beans, toasted homemade bread & fresh juice or tea.',
    priceKes: 850,
    available: true,
  },
  {
    id: 'MN-02',
    category: 'Breakfast',
    name: 'Mwingi Spiced Tea & Mandazi',
    description: 'Freshly brewed ginger milk tea served with warm cardamom mandazi.',
    priceKes: 350,
    available: true,
  },
  {
    id: 'MN-03',
    category: 'Main Dishes',
    name: 'Pan-Seared Tilapia Fillet',
    description: 'Served with lemon butter sauce, wilted spinach & steamed ugali or parsley potatoes.',
    priceKes: 1200,
    available: true,
  },
  {
    id: 'MN-04',
    category: 'Main Dishes',
    name: 'Kienyeji Chicken Stew',
    description: 'Slow-simmered local free-range chicken in rich tomato onion gravy with traditional greens.',
    priceKes: 1400,
    available: true,
  },
  {
    id: 'MN-05',
    category: 'Grill & Nyama',
    name: 'Prime Goat Choma (500g)',
    description: 'Charcoal grilled tender goat meat with kachumbari and ugali or chips.',
    priceKes: 1300,
    available: true,
  },
  {
    id: 'MN-06',
    category: 'Grill & Nyama',
    name: 'Branol Executive Beef Burger',
    description: 'Handcrafted beef patty, aged cheddar, caramelized onions, house relish & rustic fries.',
    priceKes: 1100,
    available: true,
  },
  {
    id: 'MN-07',
    category: 'Soups & Salads',
    name: 'Cream of Butternut & Ginger Soup',
    description: 'Roasted butternut soup laced with fresh ginger, served with toasted garlic bread.',
    priceKes: 550,
    available: true,
  },
  {
    id: 'MN-08',
    category: 'Beverages & Coffee',
    name: 'Single Origin Kenyan Espresso / Americano',
    description: 'Rich dark roast AA beans from central Kenya highlands.',
    priceKes: 300,
    available: true,
  },
  {
    id: 'MN-09',
    category: 'Beverages & Coffee',
    name: 'Fresh Passion Fruit & Mint Lemonade',
    description: 'Chilled freshly squeezed seasonal fruit craft beverage.',
    priceKes: 400,
    available: true,
  }
];

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // REST API Routes
  
  // Bookings API
  app.get('/api/bookings', (req, res) => {
    res.json(bookings);
  });

  app.post('/api/bookings', (req, res) => {
    const { fullName, phone, email, checkIn, checkOut, guests, roomType, notes } = req.body;
    if (!fullName || !phone || !checkIn || !checkOut) {
      return res.status(400).json({ error: 'Full name, phone, check-in and check-out dates are required.' });
    }
    const newBooking: Booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName,
      phone,
      email: email || '',
      checkIn,
      checkOut,
      guests: Number(guests) || 1,
      roomType: roomType || 'Standard Room',
      notes: notes || '',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    bookings.unshift(newBooking);
    res.status(201).json(newBooking);
  });

  app.patch('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const booking = bookings.find(b => b.id === id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (status) booking.status = status;
    res.json(booking);
  });

  // Conference Quotes API
  app.get('/api/quotes', (req, res) => {
    res.json(quotes);
  });

  app.post('/api/quotes', (req, res) => {
    const { organisation, contactPerson, phone, email, date, guestCount, meetingType, accommodationRequired, cateringRequired, notes } = req.body;
    if (!organisation || !contactPerson || !phone || !date) {
      return res.status(400).json({ error: 'Organisation, contact person, phone and date are required.' });
    }
    const newQuote: ConferenceQuote = {
      id: `CQ-${Math.floor(2000 + Math.random() * 9000)}`,
      organisation,
      contactPerson,
      phone,
      email: email || '',
      date,
      guestCount: Number(guestCount) || 10,
      meetingType: meetingType || 'Full Day Conference',
      accommodationRequired: Boolean(accommodationRequired),
      cateringRequired: Boolean(cateringRequired),
      notes: notes || '',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    quotes.unshift(newQuote);
    res.status(201).json(newQuote);
  });

  app.patch('/api/quotes/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const quote = quotes.find(q => q.id === id);
    if (!quote) return res.status(404).json({ error: 'Quote not found' });
    if (status) quote.status = status;
    res.json(quote);
  });

  // Guest Feedback API
  app.get('/api/feedback', (req, res) => {
    res.json(feedbacks);
  });

  app.post('/api/feedback', (req, res) => {
    const { guestName, rating, comment, contactInfo } = req.body;
    if (!comment || !rating) {
      return res.status(400).json({ error: 'Rating and comment are required.' });
    }
    const newFeedback: GuestFeedback = {
      id: `FB-${Math.floor(3000 + Math.random() * 9000)}`,
      guestName: guestName || 'Anonymous Guest',
      rating: Number(rating),
      comment,
      contactInfo: contactInfo || '',
      createdAt: new Date().toISOString(),
    };
    feedbacks.unshift(newFeedback);
    res.status(201).json(newFeedback);
  });

  // Restaurant Menu API
  app.get('/api/menu', (req, res) => {
    res.json(menuItems);
  });

  app.post('/api/menu', (req, res) => {
    const { category, name, description, priceKes, available } = req.body;
    if (!name || !priceKes) {
      return res.status(400).json({ error: 'Item name and price are required.' });
    }
    const newItem: MenuItem = {
      id: `MN-${Math.floor(10 + Math.random() * 90)}`,
      category: category || 'Main Dishes',
      name,
      description: description || '',
      priceKes: Number(priceKes),
      available: available !== undefined ? Boolean(available) : true,
    };
    menuItems.push(newItem);
    res.status(201).json(newItem);
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[Branol Hotel Server] Running at http://localhost:${PORT}`);
  });
}

startServer();
