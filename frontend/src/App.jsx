import { useState , useEffect } from 'react'
import { getFeaturedEvents } from './services/eventService'
import './index.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import MyBookings from './pages/MyBookings'
import Dashboard from './admin/Dashboard'
import { AuthProvider, useAuth } from './context/AuthContext'
import {createBooking} from './services/bookingServices'

const EVENTS_DATA = [
  {
    id: 1,
    title: 'Sunburn Goa 2026',
    category: 'Music',
    date: '15 JUL',
    fullDate: '15 July 2026',
    time: '4:00 PM - 11:00 PM',
    location: 'Vagator Beach, Goa',
    shortLocation: 'Goa',
    price: 2499,
    rating: 4.8,
    reviews: '320 Reviews',
    description: 'Get ready for the biggest music festival of the year! Sunburn Goa 2026 brings together top DJs, amazing vibes and an unforgettable experience by the beach.',
    badges: ['Music Festival', 'Live Concert'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    lineup: [
      { name: 'DJ Snake', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60' },
      { name: 'Alan Walker', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60' },
      { name: 'Lost Stories', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60' },
      { name: 'Martin Garrix', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60' },
      { name: 'R3HAB', avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop&q=60' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 2,
    title: 'React Summit 2026',
    category: 'Tech',
    date: '20 MAY',
    fullDate: '20 May 2026',
    time: '9:00 AM - 5:00 PM',
    location: 'Bengaluru',
    shortLocation: 'Bengaluru',
    price: 999,
    rating: 4.7,
    reviews: '180 Reviews',
    description: 'Join thousands of developers in Bengaluru for the premier React conference. Keynotes, technical workshops, and networking with core team members.',
    badges: ['Tech Conference', 'Frontend'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
    lineup: [
      { name: 'Dan Abramov', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60' },
      { name: 'Sophie Alpert', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 3,
    title: 'Startup Grind 2026',
    category: 'Workshops',
    date: '05 JUN',
    fullDate: '05 June 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'Mumbai',
    shortLocation: 'Mumbai',
    price: 0,
    rating: 4.6,
    reviews: '95 Reviews',
    description: 'Learn how to build, launch, and scale your startup. Panel discussions with top founders and VCs, interactive pitch sessions, and networking.',
    badges: ['Business', 'Networking'],
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80',
    lineup: [
      { name: 'Kunal Shah', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 4,
    title: 'India Design Week',
    category: 'Art & Theatre',
    date: '28 MAY',
    fullDate: '28 May 2026',
    time: '10:00 AM - 6:00 PM',
    location: 'Delhi',
    shortLocation: 'Delhi',
    price: 799,
    rating: 4.5,
    reviews: '140 Reviews',
    description: 'A celebration of modern Indian design. Featuring interior decor displays, product prototypes, digital art, architecture panels, and creative crafts.',
    badges: ['Design', 'Exhibition'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
    lineup: [
      { name: 'Nisha Gupta', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 5,
    title: 'Gaming Tournament',
    category: 'Sports',
    date: '10 JUN',
    fullDate: '10 June 2026',
    time: '2:00 PM - 9:00 PM',
    location: 'Hyderabad',
    shortLocation: 'Hyderabad',
    price: 499,
    rating: 4.6,
    reviews: '210 Reviews',
    description: 'Compete or watch live esports action at the Hyderabad convention center. Top teams clash in leading multiplayer battle arena and tactical shooters.',
    badges: ['Esports', 'Tournament'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    lineup: [
      { name: 'ScoutOP', avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop&q=60' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=60'
    ]
  }
]

function AppContent() {
  const { logout } = useAuth()
  const [page, setPage] = useState('home')
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(EVENTS_DATA[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchLocation, setSearchLocation] = useState('Delhi')
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('')
  
  const [bookings, setBookings] = useState([
    {
      id: 1,
      title: 'Sunburn Goa 2026',
      date: '15 July 2026 - 4:00 PM',
      location: 'Vagator Beach, Goa',
      tickets: 2,
      price: '₹4,998',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'React Summit 2026',
      date: '20 May 2026 - 9:00 AM',
      location: 'Bengaluru',
      tickets: 1,
      price: '₹999',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'India Design Week',
      date: '28 May 2026 - 10:00 AM',
      location: 'Delhi',
      tickets: 1,
      price: '₹799',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
      status: 'upcoming'
    }
  ])
  useEffect(() => {
  const loadEvents = async () => {
    try {
      const data = await getFeaturedEvents()

      console.log("MongoDB Events:", data)

      setEvents(data)
    } catch (error) {
      console.error(error)
    }
  }

  loadEvents()
}, [])

  const handleNavigate = (nextPage) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleViewEventDetails = (event) => {
    setSelectedEvent(event)
    handleNavigate('details')
  }

const handleAddBooking = async (
  eventItem,
  ticketsCount,
  totalPriceString
) => {
  console.log("eventItem:", eventItem);
  console.log("tickets:", ticketsCount);
  console.log("price:", totalPriceString);
  console.log("Selected Event:", eventItem);

  if (!eventItem) {
    alert("eventItem is undefined");
    return;
  }
  try {
    const bookingData = {
      eventId: eventItem._id || eventItem.id,
      title: eventItem.title,
      location: eventItem.location,
      tickets: ticketsCount,
      price: totalPriceString,
    };
    
const savedBooking = await createBooking(
  bookingData
);

console.log("savedBooking =", savedBooking);

if (!savedBooking) {
  alert("savedBooking is undefined");
  return;
}

    const newBooking = {
      id: savedBooking._id || Date.now(),
      title: savedBooking.title,
      date: `${eventItem.date} - ${eventItem.time}`,
      location: savedBooking.location,
      tickets: savedBooking.tickets,
      price: savedBooking.price,
      image: eventItem.image,
      status: "upcoming",
    };

    setBookings((prev) => [
      newBooking,
      ...prev,
    ]);

    alert(
      "Booking Confirmed!"
    );

    handleNavigate(
      "bookings"
    );
  } catch (error) {
    console.error(error);

    alert(
      "Failed to save booking"
    );
  }
};

  return (
    <div className="app-shell">
      <Navbar
        onNavigate={handleNavigate}
        currentPage={page}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
      />

      <main className="page-shell">
        {page === 'home' && (
          <Home
            events={events}
            onSelectEvent={handleViewEventDetails}
            onSearchSubmit={() => handleNavigate('events')}
            setSelectedCategoryFilter={setSelectedCategoryFilter}
            onNavigate={handleNavigate}
          />
        )}
        {page === 'events' && (
          <Events
            events={events}
            onSelectEvent={handleViewEventDetails}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchLocation={searchLocation}
            selectedCategoryFilter={selectedCategoryFilter}
            setSelectedCategoryFilter={setSelectedCategoryFilter}
          />
        )}
        {page === 'details' && (
          <EventDetails
            event={selectedEvent}
            onBack={() => handleNavigate('home')}
            onConfirmBooking={handleAddBooking}
          />
        )}
        {page === 'login' && <Login onNavigate={handleNavigate} />}
        {page === 'register' && <Register onNavigate={handleNavigate} />}
        {page === 'bookings' && (
          <MyBookings
            onNavigate={handleNavigate}
            onLogout={() => {
              logout()
              handleNavigate('home')
            }}
          />
        )}
        {page === 'admin' && (
          <Dashboard
            events={events}
            bookings={bookings}
            onNavigate={handleNavigate}
            onLogout={() => {
              logout()
              handleNavigate('home')
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
