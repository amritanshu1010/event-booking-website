const upcoming = [
  { name: 'Night Market', date: 'Aug 1', venue: 'Harbor Square' },
  { name: 'Creative Coding Lab', date: 'Aug 3', venue: 'Studio 9' },
  { name: 'Wellness Sunrise Yoga', date: 'Aug 5', venue: 'Garden Terrace' },
]

function UpcomingEvents() {
  return (
    <section className="page-card">
      <p className="eyebrow">Coming soon</p>
      <h2>Upcoming experiences</h2>
      <div className="booking-list">
        {upcoming.map((item) => (
          <article key={item.name} className="booking-item">
            <div>
              <h3>{item.name}</h3>
              <p>{item.date} · {item.venue}</p>
            </div>
            <span className="status-pill">Reserve</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default UpcomingEvents
