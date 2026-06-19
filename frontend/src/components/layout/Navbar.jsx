import { useAuth } from '../../context/AuthContext'

function Navbar({
  onNavigate,
  currentPage,
  searchQuery,
  setSearchQuery,
  searchLocation,
  setSearchLocation
}) {
  const { user, isAuthenticated } = useAuth()

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    if (currentPage !== 'events') {
      onNavigate('events')
    }
  }

  const handleLocationChange = (e) => {
    setSearchLocation(e.target.value)
    if (currentPage !== 'events') {
      onNavigate('events')
    }
  }

  const handleNavClick = (pageId) => {
    if (pageId === 'categories') {
      onNavigate('home')
      setTimeout(() => {
        const catSection = document.getElementById('browse-categories-section')
        if (catSection) {
          catSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else if (pageId === 'about') {
      onNavigate('home')
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }, 100)
    } else {
      onNavigate(pageId)
    }
  }

  return (
    <header className="navbar-wrapper">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="logo-container" onClick={() => onNavigate('home')}>
            <span className="logo-dot">E</span>
            <span>EventHub</span>
          </div>

          <nav className="nav-menu">
            <button
              type="button"
              className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Explore
            </button>
            <button
              type="button"
              className="nav-item"
              onClick={() => handleNavClick('categories')}
            >
              Categories
            </button>
            <button
              type="button"
              className={`nav-item ${currentPage === 'admin' ? 'active' : ''}`}
              onClick={() => handleNavClick('admin')}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="nav-item"
              onClick={() => handleNavClick('about')}
            >
              About Us
            </button>
          </nav>
        </div>

        <div className="navbar-center-search">
          <span className="search-icon-svg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            className="search-input-field"
            type="text"
            placeholder="Search events, concerts, workshops..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </span>
          <select
            className="location-selector"
            value={searchLocation}
            onChange={handleLocationChange}
          >
            <option value="Delhi">Delhi</option>
            <option value="Goa">Goa</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>

        <div className="navbar-right">
          {isAuthenticated ? (
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              onClick={() => onNavigate('bookings')}
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'}
                alt={user?.name || 'User'}
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid var(--color-primary)', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-white)' }}>
                {user?.name || 'Ananya'}
              </span>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                onClick={() => onNavigate('login')}
              >
                Login
              </button>
              <button
                type="button"
                className="btn-primary"
                style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                onClick={() => onNavigate('register')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
