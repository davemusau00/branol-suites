import heroExterior from '../assets/images/hero_branol_exterior_1791220708132.png';
import roomStandard from '../assets/images/room_branol_standard_1791220720497.jpg';
import dineRestaurant from '../assets/images/dine_branol_restaurant_1791220732403.jpg';
import meetConference from '../assets/images/meet_branol_conference_1791220745678.jpg';
import roomBathroom from '../assets/images/room_branol_bathroom_1791220755855.jpg';
import exploreLandscape from '../assets/images/explore_mwingi_landscape_1791220768508.png';

// Property Site Photography
import siteStayPavilion from '../assets/images/site_branol_stay_pavilion_1791222530486.jpg';
import siteDineCabana from '../assets/images/site_branol_dine_cabana_1791222541718.jpg';
import siteLobbyReception from '../assets/images/site_branol_lobby_reception_1791222554419.jpg';
import siteCorridorRooms from '../assets/images/site_branol_corridor_rooms_1791222564765.jpg';
import siteStaircasePlaque from '../assets/images/site_branol_staircase_plaque_1791222574733.jpg';
import siteMeetFoyer from '../assets/images/site_branol_meet_foyer_1791222584910.jpg';

export const BRANOL_INFO = {
  name: 'THE BRANOL HOTEL',
  location: 'Mwingi Town, Kitui County, Kenya',
  fullAddress: 'A3 Garissa Highway, Mwingi Town, Kitui County, Kenya',
  phone: '0781 768 611',
  phoneSecondary: '0713 333 357',
  whatsapp: '254781768611',
  email: 'hello@branol.co.ke',
  tagline: 'STAY COMPOSED.',
  subtagline: 'A modern hotel in Mwingi.',
  coordinates: { lat: -0.9351, lng: 38.0583 },
};

export const IMAGES = {
  heroExterior,
  roomStandard,
  dineRestaurant,
  meetConference,
  roomBathroom,
  exploreLandscape,
  // Property Site Photos
  siteStayPavilion,
  siteDineCabana,
  siteLobbyReception,
  siteCorridorRooms,
  siteStaircasePlaque,
  siteMeetFoyer,
};

export const SITE_SHOWCASE = [
  {
    id: 'stay-pavilion',
    title: 'Outdoor Garden Pavilion',
    category: 'STAY',
    description: 'Arched white pavilions and slate walkways leading to quiet garden suites.',
    image: siteStayPavilion,
  },
  {
    id: 'dine-cabana',
    title: 'Dine Garden Cabana',
    category: 'DINE',
    description: 'Private evening dining cabanas with woven lamps, curtains and ambient lighting.',
    image: siteDineCabana,
  },
  {
    id: 'lobby-reception',
    title: 'Front Desk & Reception',
    category: 'HOTEL',
    description: 'Fluted wood reception desk with marble tops and warm welcome foyer.',
    image: siteLobbyReception,
  },
  {
    id: 'corridor-rooms',
    title: 'Guest Rooms Corridor',
    category: 'STAY',
    description: 'Polished marble floor hallways with lit room signage and wood accents.',
    image: siteCorridorRooms,
  },
  {
    id: 'meet-foyer',
    title: 'Conference & Events Foyer',
    category: 'MEET',
    description: 'Dedicated reception and break foyer for executive meeting delegates.',
    image: siteMeetFoyer,
  },
  {
    id: 'staircase-plaque',
    title: 'Grand Staircase Lobby',
    category: 'HOTEL',
    description: 'Geometric black railings, marble stairs and copper B monogram plaque.',
    image: siteStaircasePlaque,
  },
];

export const ROOM_FACTS = [
  { label: 'CHECK-IN', value: '12:00 PM' },
  { label: 'CHECK-OUT', value: '10:00 AM' },
  { label: 'OCCUPANCY', value: 'Up to 2 Adults' },
  { label: 'BREAKFAST', value: 'Included in Rate' },
  { label: 'WI-FI', value: 'High-Speed Fiber' },
  { label: 'PARKING', value: 'Secure On-Site' },
];

export const STANDARD_ROOM_AMENITIES = [
  { icon: 'bed', name: 'Comfortable Queen Bed' },
  { icon: 'wifi', name: 'Free High-Speed Wi-Fi' },
  { icon: 'wind', name: 'Silent Air Conditioning' },
  { icon: 'tv', name: 'Smart Flat-Screen TV' },
  { icon: 'bath', name: 'En-Suite Rain Shower' },
  { icon: 'coffee', name: 'Tea & Coffee Maker' },
  { icon: 'shield', name: '24/7 Monitored Security' },
  { icon: 'desk', name: 'Architectural Work Desk' },
];

export const CONFERENCE_PACKAGES = [
  {
    id: 'half-day',
    title: 'Half Day',
    price: 12000,
    priceUnit: 'From KES 12,000 / Session',
    capacity: 'Up to 40 guests',
    features: [
      'Flexible meeting room setup',
      'Standard AV & HD presentation display',
      'High-speed Wi-Fi & power hubs',
      'Morning or afternoon tea & coffee break',
      'Writing pads, pens & bottled water',
    ],
  },
  {
    id: 'full-day',
    title: 'Full Day',
    price: 18000,
    priceUnit: 'From KES 18,000 / Session',
    capacity: 'Up to 40 guests',
    popular: true,
    features: [
      'Full day venue allocation (8am - 5pm)',
      'Standard AV, microphones & presentation screen',
      'High-speed Wi-Fi & dedicated technical support',
      '2 Tea & coffee breaks with freshly baked snacks',
      'Chef-curated 3-course buffet lunch',
      'Writing stationery & mints',
    ],
  },
  {
    id: 'residential',
    title: 'Residential',
    price: 28000,
    priceUnit: 'From KES 28,000 / Delegate Package',
    capacity: 'Overnight delegates',
    features: [
      'Standard Room overnight accommodation',
      'Full Day conference facility access',
      'Full Board (Breakfast, Lunch & 3-course Dinner)',
      'Morning & afternoon executive breaks',
      'Complimentary evening tea/coffee lounge access',
    ],
  },
  {
    id: 'private-event',
    title: 'Private Event & Banqueting',
    price: 0,
    priceUnit: 'Custom Quote',
    capacity: 'Tailored capacity',
    features: [
      'Exclusive hall or garden courtyard setup',
      'Customized buffet or cocktail menu',
      'Bespoke decor & sound arrangement',
      'Dedicated event host & service staff',
    ],
  },
];

export const MWINGI_LANDMARKS = [
  { name: 'Mwingi Town Center', distance: '5 mins', icon: 'building' },
  { name: 'St Joseph Seminary Mwingi', distance: '8 mins', icon: 'school' },
  { name: 'Local Produce Markets', distance: '5 mins', icon: 'shopping-bag' },
  { name: 'Mwingi Hills Viewpoint', distance: '20 mins', icon: 'mountain' },
  { name: 'Kitui Town Junction (A3)', distance: '45 mins', icon: 'navigation' },
];

export const FREQUENT_QUESTIONS = [
  {
    q: 'What is the price of a room at Branol Hotel?',
    a: 'Our Standard Room is available at a fixed transparent rate of KES 3,000 per night, including complimentary breakfast and high-speed Wi-Fi.',
  },
  {
    q: 'How do I confirm my room booking?',
    a: 'You can submit a booking enquiry directly through our website or via WhatsApp. Our team will verify room availability and confirm your reservation within minutes.',
  },
  {
    q: 'Does Branol Hotel offer conference and meeting facilities?',
    a: 'Yes, we offer modern, fully-equipped conference rooms for half-day, full-day, and residential corporate meetings, training sessions, and private workshops in Mwingi.',
  },
  {
    q: 'Is parking available on site?',
    a: 'Yes, we provide free, secure on-site parking monitored 24/7 for all hotel guests and conference attendees.',
  },
  {
    q: 'Where is Branol Hotel located in Mwingi?',
    a: 'Branol Hotel is located in Mwingi Town, Kitui County along the A3 Garissa Highway, conveniently close to major administrative offices, commercial centers, and St Joseph Seminary.',
  },
];
