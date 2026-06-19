import { useState } from 'react'

function EventDetails({ event, onBack, onConfirmBooking }) {
  const [vipCount, setVipCount] = useState(0)
  const [generalCount, setGeneralCount] = useState(1) // Default to 1 General Pass to make booking quick
  const [earlyCount, setEarlyCount] = useState(0)

  const handleBookNow = () => {
    const totalTickets = vipCount + generalCount + earlyCount
    if (totalTickets === 0) {
      alert('Please select at least 1 ticket to book.')
      return
    }

    const priceVIP = vipCount * 4999
    const priceGen = generalCount * 2499
    const priceEarly = earlyCount * 1499
    const totalSum = priceVIP + priceGen + priceEarly

    const formattedPrice = `₹${totalSum.toLocaleString('en-IN')}`
    onConfirmBooking(event, totalTickets, formattedPrice)
  }

  // Pre-calculated or mock gallery details if not present on event
  const galleryPhotos = event.gallery || [
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&auto=format&fit=crop&q=60'
  ]

  const artistList = event.lineup || [
    { name: 'DJ Snake', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60' },
    { name: 'Alan Walker', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60' },
    { name: 'Lost Stories', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60' },
    { name: 'Martin Garrix', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60' },
    { name: 'R3HAB', avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop&q=60' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      
      {/* Back button and Favorite icon header */}
      <div className="details-back-header">
        <button type="button" className="back-btn-link" onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back</span>
        </button>

        <button type="button" className="details-heart-btn" aria-label="Favorite">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="details-main-layout">
        
        {/* Left Content Area */}
        <div className="details-content-left">
          
          <div className="details-banner-container">
            <img src={event.image} alt={event.title} className="details-banner-img" />
            <div className="details-banner-overlay" />
          </div>

          <div className="details-header-card">
            <div className="details-date-large-box">
              <span className="details-date-large-day">
                {new Date(event.date).getDate()}
              </span>

              <span className="details-date-large-month">
                {new Date(event.date).toLocaleString("en-US", {
                  month: "short",
                })}
              </span>           
            </div>

            <div className="details-title-block">
              <h1 className="details-title-text">{event.title}</h1>
              
              <div className="details-pills-row">
                <span className="details-pill-badge music">{event.category}</span>
                <span className="details-pill-badge concert">Live Concert</span>
              </div>

              <div className="details-meta-items-row">
                <span className="details-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {event.location}
                </span>

                <span className="details-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {event.time}
                </span>

                <span className="details-meta-item">
                  <span style={{ color: '#fbbf24', marginRight: '4px' }}>★</span>
                  {event.rating || 4.5} (120 reviews)
                </span>
              </div>
            </div>
          </div>

          {/* About Event */}
          <div className="details-about-section">
            <h2 className="details-section-heading">About Event</h2>
            <p className="details-about-text">
              {event.description}
              <span className="read-more-link">Read More</span>
            </p>
          </div>

          {/* Lineup */}
          <div className="details-lineup-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 className="details-section-heading" style={{ margin: 0 }}>Artists / Lineup</h2>
              <button type="button" style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600 }}>View All</button>
            </div>
            
            <div className="lineup-avatars-row">
              {artistList.map((artist, idx) => (
                <div key={idx} className="lineup-member-card">
                  <img src={artist.avatar} alt={artist.name} className="lineup-avatar-circle" />
                  <span className="lineup-name">{artist.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Event Gallery */}
          <div className="details-gallery-section">
            <h2 className="details-section-heading">Event Gallery</h2>
            <div className="gallery-grid-thumbnails">
              {galleryPhotos.map((photo, idx) => (
                <img key={idx} src={photo} alt="Gallery item" className="gallery-thumbnail-img" />
              ))}
            </div>
          </div>

        </div>

        {/* Right Sticky Booking Panel */}
        <div className="sticky-sidebar-panel">
          <div className="tickets-selection-card">
            <h3 className="details-section-heading" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '8px' }}>
              Select Tickets
            </h3>

            {/* VIP Pass */}
            <div className="ticket-item-row">
              <div className="ticket-info-left">
                <span className="ticket-type-title">VIP Pass</span>
                <span className="ticket-type-desc">Access to VIP area, fast entry, food & drinks</span>
              </div>
              <div className="ticket-control-right">
                <span className="ticket-price-value">₹4,999</span>
                <div className="numeric-counter-group">
                  <button type="button" className="counter-btn" onClick={() => setVipCount(Math.max(0, vipCount - 1))}>-</button>
                  <span className="counter-value-text">{vipCount}</span>
                  <button type="button" className="counter-btn" onClick={() => setVipCount(vipCount + 1)}>+</button>
                </div>
              </div>
            </div>

            {/* General Pass */}
            <div className="ticket-item-row">
              <div className="ticket-info-left">
                <span className="ticket-type-title">General Pass</span>
                <span className="ticket-type-desc">Access to main event area</span>
              </div>
              <div className="ticket-control-right">
                <span className="ticket-price-value">₹2,499</span>
                <div className="numeric-counter-group">
                  <button type="button" className="counter-btn" onClick={() => setGeneralCount(Math.max(0, generalCount - 1))}>-</button>
                  <span className="counter-value-text">{generalCount}</span>
                  <button type="button" className="counter-btn" onClick={() => setGeneralCount(generalCount + 1)}>+</button>
                </div>
              </div>
            </div>

            {/* Early Bird */}
            <div className="ticket-item-row">
              <div className="ticket-info-left">
                <span className="ticket-type-title">Early Bird</span>
                <span className="ticket-type-desc">Limited time offer</span>
              </div>
              <div className="ticket-control-right">
                <span className="ticket-price-value">₹1,499</span>
                <div className="numeric-counter-group">
                  <button type="button" className="counter-btn" onClick={() => setEarlyCount(Math.max(0, earlyCount - 1))}>-</button>
                  <span className="counter-value-text">{earlyCount}</span>
                  <button type="button" className="counter-btn" onClick={() => setEarlyCount(earlyCount + 1)}>+</button>
                </div>
              </div>
            </div>

            {/* Book Button */}
            <button
              type="button"
              className="btn-primary"
              style={{ width: '100%', marginTop: '24px', padding: '14px', borderRadius: '12px', fontSize: '1rem' }}
              onClick={handleBookNow}
            >
              Book Now
            </button>

            {/* Features Checklist */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="booking-checkout-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Secure Checkout</span>
              </div>
              <div className="booking-checkout-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Instant Confirmation</span>
              </div>
              <div className="booking-checkout-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Mobile Ticket</span>
              </div>
              <div className="booking-checkout-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Refund Available</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default EventDetails
