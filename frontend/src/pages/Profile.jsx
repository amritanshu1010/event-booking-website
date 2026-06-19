import { useAuth } from '../context/AuthContext'

const bookedTickets = [
  { id: 1, event: 'Midnight Jazz Night', date: 'July 24, 2026', tickets: 2, total: '$120', status: 'Confirmed' },
  { id: 2, event: 'Design & AI Meetup', date: 'July 22, 2026', tickets: 1, total: '$35', status: 'Pending' },
  { id: 3, event: 'Sunset Rooftop Party', date: 'August 5, 2026', tickets: 3, total: '$165', status: 'Confirmed' },
]

function Profile() {
  const { user, logout } = useAuth()

  const initials = (user?.name || 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U'

  return (
    <section className="page-card profile-page">
      <p className="eyebrow">Your profile</p>

      <div className="profile-hero">
        <div className="profile-avatar-card">
          <span className="profile-avatar-large">{initials}</span>
        </div>

        <div>
          <h2>{user?.name || 'Guest User'}</h2>
          <p className="lede">Manage your account details, bookings, and event preferences.</p>
          <div className="profile-chip-row">
            <span className="status-pill">Verified account</span>
            <span className="status-pill">Member since Jun 2026</span>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <article className="mini-card profile-detail-card">
          <h3>Account details</h3>
          <p><strong>Name:</strong> {user?.name || 'Guest User'}</p>
          <p><strong>Email:</strong> {user?.email || 'No email available'}</p>
          <p><strong>Role:</strong> Event explorer</p>
        </article>

        <article className="mini-card profile-detail-card">
          <h3>Booking summary</h3>
          <p>2 upcoming reservations</p>
          <p>1 saved event shortlist</p>
          <p>Preferred city: New York</p>
        </article>

        <article className="mini-card profile-detail-card">
          <h3>Preferences</h3>
          <p>Live music</p>
          <p>Food festivals</p>
          <p>Wellness events</p>
        </article>
      </div>

      <section className="admin-card">
        <div className="page-header admin-header">
          <div>
            <p className="eyebrow">Booked tickets</p>
            <h3>All tickets booked by this user</h3>
          </div>
          <span className="status-pill">Admin view</span>
        </div>

        <div className="booking-list admin-ticket-list">
          {bookedTickets.map((ticket) => (
            <article key={ticket.id} className="booking-item admin-ticket-item">
              <div>
                <h4>{ticket.event}</h4>
                <p>{ticket.date}</p>
                <p className="muted">Tickets: {ticket.tickets} • Total: {ticket.total}</p>
              </div>
              <span className="status-pill">{ticket.status}</span>
            </article>
          ))}
        </div>
      </section>

      <div className="cta-row profile-actions">
        <button type="button" className="primary-btn">Edit profile</button>
        <button type="button" className="ghost-btn" onClick={logout}>Log out</button>
      </div>
    </section>
  )
}

export default Profile
