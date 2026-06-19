import { useState } from 'react'
import CreateEvent from './CreateEvent'

function Dashboard({
  events = [],
  bookings = [],
  onNavigate,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState('dashboard')

  const sidebarItems = [
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'Events', id: 'events' },
    { label: 'Create Event', id: 'create' },
    { label: 'Bookings', id: 'bookings' },
    { label: 'Attendees', id: 'attendees' },
    { label: 'Analytics', id: 'analytics' },
    { label: 'Reports', id: 'reports' },
    { label: 'Settings', id: 'settings' },
  ]

  const totalTickets = bookings.reduce(
    (total, booking) => total + (Number(booking.tickets) || 0),
    0,
  )

  const totalRevenue = bookings.reduce((total, booking) => {
    const price = Number(String(booking.price ?? 0).replace(/[^\d.-]/g, ''))
    return total + (Number.isFinite(price) ? price : 0)
  }, 0)

  const statCards = [
    {
      label: 'Total Events',
      value: events.length,
      trend: 'Published events',
    },
    {
      label: 'Total Bookings',
      value: bookings.length,
      trend: 'Booking records',
    },
    {
      label: 'Tickets Sold',
      value: totalTickets,
      trend: 'Across all events',
    },
    {
      label: 'Revenue',
      value: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(totalRevenue),
      trend: 'Gross ticket sales',
    },
  ]

  const topEventsList = events
    .map((event) => {
      const ticketsSold = bookings
        .filter((booking) => booking.title === event.title)
        .reduce(
          (total, booking) => total + (Number(booking.tickets) || 0),
          0,
        )

      return {
        name: event.title,
        image: event.image,
        ticketsSold,
      }
    })
    .sort((a, b) => b.ticketsSold - a.ticketsSold)
    .slice(0, 4)

  const handleSidebarClick = (item) => {
    if (item.id === 'events' || item.id === 'bookings') {
      onNavigate(item.id)
    } else if (item.id === 'dashboard' || item.id === 'create') {
      setActiveTab(item.id)
    } else {
      window.alert(`${item.label} page coming soon`)
    }
  }

  return (
    <div
      className="details-main-layout"
      style={{ gridTemplateColumns: '260px 1fr' }}
    >
      <aside className="bookings-profile-sidebar">
        <h3
          className="details-section-heading"
          style={{
            paddingLeft: '16px',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-light)',
          }}
        >
          Admin Panel
        </h3>

        <nav className="sidebar-navigation-menu" aria-label="Admin navigation">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`side-nav-btn ${
                activeTab === item.id ? 'active' : ''
              }`}
              onClick={() => handleSidebarClick(item)}
            >
              <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>
                &bull;
              </span>
              {item.label}
            </button>
          ))}

          <button
            type="button"
            className="side-nav-btn"
            style={{ color: '#ef4444', marginTop: '12px' }}
            onClick={onLogout}
          >
            <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>
              &bull;
            </span>
            Logout
          </button>
        </nav>
      </aside>

      <section className="bookings-main-content">
        {activeTab === 'create' ? (
          <CreateEvent />
        ) : (
          <>
            <h1 className="bookings-section-title">Dashboard</h1>

            <div className="admin-stats-grid">
              {statCards.map((stat) => (
                <div key={stat.label} className="admin-stat-card">
                  <div className="admin-stat-label-row">
                    <span>{stat.label}</span>
                  </div>
                  <span className="admin-stat-value">{stat.value}</span>
                  <span className="admin-stat-trend">{stat.trend}</span>
                </div>
              ))}
            </div>

            <div className="admin-dashboard-split-grid">
              <div className="chart-panel-card">
                <div className="chart-header-row">
                  <h2 className="chart-title-text">Bookings Overview</h2>
                </div>

                <div className="svg-chart-container">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 500 220"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Bookings overview chart"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#ff1a75" />
                        <stop offset="100%" stopColor="#c814e8" />
                      </linearGradient>
                    </defs>

                    {[30, 65, 100, 135, 170].map((y) => (
                      <line
                        key={y}
                        x1="45"
                        y1={y}
                        x2="480"
                        y2={y}
                        className="svg-grid-line"
                      />
                    ))}

                    <text x="10" y="34" className="svg-axis-label">2.5K</text>
                    <text x="10" y="69" className="svg-axis-label">2K</text>
                    <text x="10" y="104" className="svg-axis-label">1.5K</text>
                    <text x="10" y="139" className="svg-axis-label">1K</text>
                    <text x="10" y="174" className="svg-axis-label">0</text>

                    <path
                      d="M 50,160 Q 95,140 140,150 T 230,110 T 320,120 T 410,75 T 475,80"
                      className="svg-chart-line"
                      style={{ stroke: 'url(#chartGradient)' }}
                    />

                    {[
                      [50, 160],
                      [140, 150],
                      [230, 110],
                      [320, 120],
                      [410, 75],
                      [475, 80],
                    ].map(([x, y]) => (
                      <circle
                        key={`${x}-${y}`}
                        cx={x}
                        cy={y}
                        r="5"
                        className="svg-chart-dot"
                      />
                    ))}

                    <text x="35" y="200" className="svg-axis-label">1 May</text>
                    <text x="125" y="200" className="svg-axis-label">7 May</text>
                    <text x="212" y="200" className="svg-axis-label">14 May</text>
                    <text x="302" y="200" className="svg-axis-label">21 May</text>
                    <text x="392" y="200" className="svg-axis-label">28 May</text>
                  </svg>
                </div>
              </div>

              <div className="top-events-sidebar-list">
                <h3 className="details-section-heading">Top Events</h3>

                {topEventsList.map((event) => (
                  <div key={event.name} className="top-event-row-item">
                    <img
                      src={event.image}
                      alt=""
                      className="top-event-thumbnail"
                    />
                    <div className="top-event-row-info">
                      <span className="top-event-row-name">{event.name}</span>
                      <span className="top-event-row-bookings">
                        {event.ticketsSold}{' '}
                        {event.ticketsSold === 1 ? 'ticket' : 'tickets'} sold
                      </span>
                    </div>
                  </div>
                ))}

                {topEventsList.length === 0 && (
                  <p className="auth-subtitle-muted">No events available.</p>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Dashboard
