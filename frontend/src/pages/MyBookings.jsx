import { useState, useEffect } from 'react'
import { getBookings } from '../services/bookingServices'
import { useAuth } from '../context/AuthContext'

function MyBookings({  onNavigate, onLogout }) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('Upcoming')
const [bookings, setBookings] = useState([])

useEffect(() => {
  fetchBookings()
}, [])

const fetchBookings = async () => {
  try {
    const data = await getBookings()

    const formattedBookings = data.map(
      (booking) => ({
        id: booking._id,
        title: booking.title,
        date: booking.createdAt,
        location: booking.location,
        tickets: booking.tickets,
        price: booking.price,
        status: 'upcoming',
        image:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
      })
    )

    setBookings(formattedBookings)
  } catch (error) {
    console.error(error)
  }
}

  // Filter based on tab selection
  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'Upcoming') {
      return b.status === 'upcoming' || !b.status
    }
    // Completed/Cancelled can be empty or have mock items
    return false
  })

  const menuItems = [
    { label: 'Dashboard', id: 'admin' },
    { label: 'My Bookings', id: 'bookings', active: true },
    { label: 'Saved Events', id: 'saved' },
    { label: 'Notifications', id: 'notifications' },
    { label: 'Payments', id: 'payments' },
    { label: 'Profile Settings', id: 'profile' }
  ]

  const handleMenuClick = (item) => {
    if (item.id === 'admin') {
      onNavigate('admin')
    } else if (item.id === 'bookings') {
      onNavigate('bookings')
    } else {
      // Allow user to click without errors, just show alerts/placeholders if desired
      alert(`Navigate to ${item.label} (mocked view)`)
    }
  }

  const profileImageUrl = user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'

  return (
    <div className="details-main-layout" style={{ gridTemplateColumns: '260px 1fr' }}>
      
      {/* Sidebar Section */}
      <aside className="bookings-profile-sidebar">
        <div className="profile-card-widget">
          <img src={profileImageUrl} alt={user?.name || 'User'} className="profile-avatar-circle" />
          <div className="profile-widget-details">
            <span className="profile-widget-greeting">Hey, {user?.name || 'Ananya'}</span>
            <span className="profile-widget-view-link" onClick={() => alert('Editing Profile...')}>
              View Profile
            </span>
          </div>
        </div>

        <nav className="sidebar-navigation-menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`side-nav-btn ${item.active ? 'active' : ''}`}
              onClick={() => handleMenuClick(item)}
            >
              {/* Simple inline bullet indicator */}
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>•</span>
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className="side-nav-btn"
            style={{ color: '#ef4444', marginTop: '12px' }}
            onClick={onLogout}
          >
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>•</span>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <section className="bookings-main-content">
        <h1 className="bookings-section-title">My Bookings</h1>

        {/* Tab Headers */}
        <div className="bookings-tab-headers">
          {['Upcoming', 'Completed', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`booking-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List of bookings */}
        <div className="bookings-vertical-list">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <article key={booking.id} className="booking-event-card-horizontal">
                <img src={booking.image} alt={booking.title} className="horizontal-card-img" />
                
                <div className="horizontal-card-content">
                  <div className="horizontal-card-left-info">
                    <h3 className="horizontal-card-title">{booking.title}</h3>
                    <span className="horizontal-card-date">{booking.date}</span>
                    <div className="horizontal-card-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{booking.location}</span>
                    </div>
                  </div>

                  <div className="horizontal-card-right-status">
                    <span className="horizontal-card-tickets-count">{booking.tickets} {booking.tickets === 1 ? 'Ticket' : 'Tickets'}</span>
                    <span className="horizontal-card-price-value">{booking.price}</span>
                    <button
                      type="button"
                      className="btn-view-ticket"
                      onClick={() => alert(`Showing digital ticket PDF/QR for ${booking.title}`)}
                    >
                      View Ticket
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-light)' }}>
              <h3>No bookings found in this category.</h3>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

export default MyBookings
