import { useState } from 'react'

function Home({
  events,
  onSelectEvent,
  onSearchSubmit,
  setSelectedCategoryFilter,
  onNavigate
}) {
  const [heroSearch, setHeroSearch] = useState('')
  const [heroLocation, setHeroLocation] = useState('Delhi')

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault()
    onSearchSubmit()
  }

  const handleCategoryClick = (categoryName) => {
    setSelectedCategoryFilter(categoryName)
    onNavigate('events')
  }

  const trendingEvents = events.slice(0, 5)
  const nearbyEvents = events.slice(0, 4)

  const categories = [
    { name: 'Music', count: '125 Events', icon: '🎵', class: 'music' },
    { name: 'Tech', count: '98 Events', icon: '💻', class: 'tech' },
    { name: 'Workshops', count: '76 Events', icon: '✍️', class: 'workshop' },
    { name: 'Sports', count: '64 Events', icon: '⚽', class: 'sports' },
    { name: 'Festivals', count: '52 Events', icon: '🎉', class: 'festivals' },
    { name: 'Art & Theatre', count: '43 Events', icon: '🎭', class: 'art' }
  ]

  const featuredEvent = {
  title: "Sunburn Goa 2026",
  subtitle: "India's Biggest EDM Festival",
  image:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
  location: "Goa",
  date: "12-14 Dec 2026"
} 
const organizers = [
  {
    id: 1,
    name: "TechX",
    followers: "12K Followers",
    logo: "💻"
  },
  {
    id: 2,
    name: "Music Nation",
    followers: "28K Followers",
    logo: "🎵"
  },
  {
    id: 3,
    name: "Startup Delhi",
    followers: "8K Followers",
    logo: "🚀"
  },
  {
    id: 4,
    name: "Hack India",
    followers: "18K Followers",
    logo: "⚡"
  }
]
  return (
    <div
  className="fade-up"
  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
>
      
      {/* HERO SECTION */}
      <section className="home-hero-section">
        <div className="hero-text-content">
          <span className="hero-badge">Featured Events</span>
          <h1 className="hero-title">
            Find Your Next <br />
            <span className="hero-title-gradient">Experience</span>
          </h1>
          <p className="hero-subtitle">
            Discover concerts, workshops, hackathons, festivals and events that match your vibe.
          </p>

          <form onSubmit={handleHeroSearchSubmit} className="hero-search-overlay">
            <span style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center', marginRight: '12px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search events..."
              className="hero-search-input"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
            />
            <div style={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid var(--border-light)', paddingLeft: '14px', marginRight: '14px' }}>
              <span style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center', marginRight: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
              <select
                value={heroLocation}
                onChange={(e) => setHeroLocation(e.target.value)}
                style={{ background: 'none', border: 'none', color: 'var(--text-white)', fontSize: '0.85rem', outline: 'none', cursor: 'pointer' }}
              >
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.88rem' }}>
              Search
            </button>
          </form>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <span className="hero-stat-number">10K+</span>
              <span className="hero-stat-label">Events</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">500K+</span>
              <span className="hero-stat-label">Happy Users</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">5K+</span>
              <span className="hero-stat-label">Organizers</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">25+</span>
              <span className="hero-stat-label">Cities</span>
            </div>
          </div>
        </div>

        <div className="hero-graphic-container">
          <img
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80"
            alt="Concert background"
            className="hero-bg-image"
          />
          <div className="hero-image-overlay" />

          {/* Floating Badges */}
          <div className="hero-floating-widget w1" onClick={() => handleCategoryClick('Music')} style={{ cursor: 'pointer' }}>
            <div className="widget-icon-circle music">🎵</div>
            <div className="widget-info">
              <span className="widget-title">Music Festival</span>
              <span className="widget-subtitle">12 Events</span>
              <div className="widget-avatars">
                <img className="widget-avatar-img" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60" alt="avatar" />
                <img className="widget-avatar-img" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60" alt="avatar" />
                <img className="widget-avatar-img" src="https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop&q=60" alt="avatar" />
              </div>
            </div>
          </div>

          <div className="hero-floating-widget w2" onClick={() => handleCategoryClick('Workshops')} style={{ cursor: 'pointer' }}>
            <div className="widget-icon-circle workshop">✍️</div>
            <div className="widget-info">
              <span className="widget-title">Workshops</span>
              <span className="widget-subtitle">18 Events</span>
              <div className="widget-avatars">
                <img className="widget-avatar-img" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60" alt="avatar" />
                <img className="widget-avatar-img" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60" alt="avatar" />
              </div>
            </div>
          </div>

          <div className="hero-floating-widget w3" onClick={() => handleCategoryClick('Tech')} style={{ cursor: 'pointer' }}>
            <div className="widget-icon-circle tech">💻</div>
            <div className="widget-info">
              <span className="widget-title">Tech Events</span>
              <span className="widget-subtitle">34 Events</span>
              <div className="widget-avatars">
                <img className="widget-avatar-img" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60" alt="avatar" />
                <img className="widget-avatar-img" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60" alt="avatar" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  Trending Spotlight */}
      <section className="featured-event-section">
  <div className="featured-image-container">
    <img
      src={featuredEvent.image}
      alt={featuredEvent.title}
      className="featured-event-image"
    />
  </div>

  <div className="featured-content">
    <span className="featured-tag">
      🔥 Featured Event
    </span>

    <h2>{featuredEvent.title}</h2>

    <p>{featuredEvent.subtitle}</p>

    <div className="featured-meta">
      <span>📍 {featuredEvent.location}</span>
      <span>📅 {featuredEvent.date}</span>
    </div>

    <button className="btn-primary">
      Book Now
    </button>
  </div>
</section>

      {/* TRENDING THIS WEEK SECTION */}
      <section className="section-wrapper">
        <div className="section-header-row">
          <div className="section-title-wrap">
            <span className="section-title">Trending This Week 🔥</span>
          </div>
          <button type="button" className="btn-secondary" style={{ padding: '6px 18px', fontSize: '0.85rem' }} onClick={() => onNavigate('events')}>
            View All
          </button>
        </div>

        <div className="trending-cards-flex">
          {trendingEvents.map((event) => (
            <article
              key={event._id}
              className="trending-event-card"
              onClick={() => onSelectEvent(event)}
            >
              <div className="card-image-wrap">
                <img src={event.image} alt={event.title} className="card-img" />
                <span className="card-badge-trending">Trending</span>
                <button
                  type="button"
                  className="card-heart-button"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  aria-label="Add to favorites"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>

              <div className="card-info-wrap">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="card-date-box">
                    <span className="card-date-day">{event.date.split(' ')[0]}</span>
                    <span className="card-date-month">{event.date.split(' ')[1]}</span>
                  </div>
                </div>

                <div>
                  <h3 className="card-title-text">{event.title}</h3>
                  <div className="card-location-line">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{event.shortLocation}</span>
                  </div>
                </div>

                <div className="card-footer-row">
                  <span className="card-price-value">
                    {event.price === 0 ? 'Free' : `₹${event.price.toLocaleString('en-IN')}`}
                  </span>
                  <span className="card-rating-value">
                    ★ {event.rating}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BROWSE CATEGORIES SECTION */}
      <section id="browse-categories-section" className="section-wrapper">
        <h2 className="section-title" style={{ marginBottom: '24px' }}>Browse Categories</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`category-pill-card ${cat.class}`}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="category-icon-wrapper">{cat.icon}</div>
              <span className="category-pill-title">{cat.name}</span>
              <span className="category-pill-count">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>
      {/* EVENTS NEAR YOU */}
<section className="section-wrapper">
  <div className="section-header-row">
    <h2 className="section-title">
      📍 Events Near You
    </h2>

    <button
      className="btn-secondary"
      onClick={() => onNavigate('events')}
    >
      View All
    </button>
  </div>

  <div className="nearby-events-grid">
    {nearbyEvents.map((event) => (
      <div
        key={event._id}
        className="nearby-card"
        onClick={() => onSelectEvent(event)}
      >
        <img
          src={event.image}
          alt={event.title}
          className="nearby-image"
        />

        <div className="nearby-content">
          <h4>{event.title}</h4>
          <p>{event.shortLocation}</p>
        </div>
      </div>
    ))}
  </div>
</section>
{/* POPULAR ORGANIZERS */}
<section className="section-wrapper">
  <h2 className="section-title">
    ⭐ Popular Organizers
  </h2>

  <div className="organizers-grid">
    {organizers.map((org) => (
      <div
        key={org.id}
        className="organizer-card"
      >
        <div className="organizer-logo">
          {org.logo}
        </div>

        <h3>{org.name}</h3>

        <p>{org.followers}</p>

        <button className="btn-secondary">
          Follow
        </button>
      </div>
    ))}
  </div>
</section>
    </div>
    
  )

}

export default Home
