import { useState, useEffect } from 'react'

function Events({
  events,
  onSelectEvent,
  searchQuery,
  setSearchQuery,
  searchLocation,
  selectedCategoryFilter,
  setSelectedCategoryFilter
}) {
  const [selectedCategories, setSelectedCategories] = useState(
    selectedCategoryFilter ? [selectedCategoryFilter] : []
  )
  const [maxPrice, setMaxPrice] = useState(10000)
  const [selectedDateFilter, setSelectedDateFilter] = useState('All Dates')
  const [selectedLocation, setSelectedLocation] = useState(searchLocation || 'All Locations')
  const [sortBy, setSortBy] = useState('Featured')

  // Keep internal state aligned if context changes
  useEffect(() => {
    if (selectedCategoryFilter) {
      setSelectedCategories([selectedCategoryFilter])
    }
  }, [selectedCategoryFilter])

  const handleCategoryCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      const updated = selectedCategories.filter((cat) => cat !== category)
      setSelectedCategories(updated)
      if (updated.length === 1) {
        setSelectedCategoryFilter(updated[0])
      } else {
        setSelectedCategoryFilter('')
      }
    } else {
      const updated = [...selectedCategories, category]
      setSelectedCategories(updated)
      if (updated.length === 1) {
        setSelectedCategoryFilter(updated[0])
      } else {
        setSelectedCategoryFilter('')
      }
    }
  }

  // Filter events based on criteria
  const filteredEvents = events.filter((evt) => {
    // Search query filter
    const matchesSearch = searchQuery
      ? evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    // Category filter
    const matchesCategory =
      selectedCategories.length > 0 ? selectedCategories.includes(evt.category) : true

    // Location filter
    const matchesLocation =
      selectedLocation !== 'All Locations'
        ? evt.location.toLowerCase().includes(selectedLocation.toLowerCase())
        : true

    // Price filter
    const matchesPrice = evt.price <= maxPrice

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice
  })

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'Price: Low to High') {
      return a.price - b.price
    }
    if (sortBy === 'Price: High to Low') {
      return b.price - a.price
    }
    if (sortBy === 'Rating') {
      return b.rating - a.rating
    }
    return a.id - b.id // Default "Featured"
  })

  const categoryOptions = ['Music', 'Tech', 'Workshops', 'Sports', 'Festivals', 'Art & Theatre']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      
      {/* Breadcrumbs */}
      <div className="breadcrumbs-bar">
        <span>Home</span>
        <span className="breadcrumb-separator">&gt;</span>
        <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>Events</span>
      </div>

      <div className="events-page-title-row">
        <h1 className="events-page-title">Events</h1>
      </div>

      {/* Top Filter select menus */}
      <div className="top-filters-menu-row">
        <select
          className="dropdown-filter-select"
          value={selectedCategories.length === 1 ? selectedCategories[0] : 'All Categories'}
          onChange={(e) => {
            const val = e.target.value
            if (val === 'All Categories') {
              setSelectedCategories([])
              setSelectedCategoryFilter('')
            } else {
              setSelectedCategories([val])
              setSelectedCategoryFilter(val)
            }
          }}
        >
          <option value="All Categories">All Categories</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="dropdown-filter-select"
          value={selectedDateFilter}
          onChange={(e) => setSelectedDateFilter(e.target.value)}
        >
          <option value="All Dates">All Dates</option>
          <option value="Today">Today</option>
          <option value="This week">This week</option>
          <option value="This month">This month</option>
        </select>

        <select
          className="dropdown-filter-select"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="All Locations">All Locations</option>
          <option value="Delhi">Delhi</option>
          <option value="Goa">Goa</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        <select
          className="dropdown-filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Featured">Sort By: Featured</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
          <option value="Rating">Rating</option>
        </select>
      </div>

      {/* Main Events layout split */}
      <div className="events-layout-main">
        
        {/* Sidebar filters */}
        <aside className="filters-sidebar-left glass-panel">
          <div className="sidebar-filter-group">
            <h3 className="filter-group-heading">Category</h3>
            {categoryOptions.map((cat) => (
              <label key={cat} className="checkbox-label-item">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryCheckboxChange(cat)}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          <div className="sidebar-filter-group">
            <h3 className="filter-group-heading">Price Range</h3>
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="custom-range-slider-input"
            />
            <div className="price-range-labels">
              <span>₹0</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>₹{maxPrice.toLocaleString('en-IN')}+</span>
            </div>
          </div>
        </aside>

        {/* Right Event Grid */}
        <section className="events-cards-grid-right">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((evt) => (
              <article
                key={evt.id}
                className="trending-event-card"
                style={{ flex: 'none', width: '100%' }}
                onClick={() => onSelectEvent(evt)}
              >
                <div className="card-image-wrap">
                  <img src={evt.image} alt={evt.title} className="card-img" />
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

                <div className="card-info-wrap" style={{ height: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div className="card-date-box" style={{ margin: 0 }}>
                      <span className="card-date-day">{evt.date.split(' ')[0]}</span>
                      <span className="card-date-month">{evt.date.split(' ')[1]}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="card-title-text" style={{ fontSize: '0.95rem' }}>{evt.title}</h3>
                    <div className="card-location-line" style={{ marginBottom: '10px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{evt.location.split(', ').pop()}</span>
                    </div>
                  </div>

                  <div className="card-footer-row" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                    <span className="card-price-value">
                      {evt.price === 0 ? 'Free' : `₹${evt.price.toLocaleString('en-IN')}`}
                    </span>
                    <span className="card-rating-value">
                      ★ {evt.rating}
                    </span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-light)' }}>
              <h3>No events found matching your filter criteria.</h3>
              <p style={{ marginTop: '8px' }}>Try clearing some filters or search query.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

export default Events
