import EventCard from './EventCard'

const featuredEvents = [
  { title: 'Summer Music Festival', date: 'July 18, 2026', location: 'Ocean View Lawn', price: '$49', badge: 'Trending' },
  { title: 'Design & AI Meetup', date: 'July 22, 2026', location: 'Tech Hub', price: '$15', badge: 'New' },
  { title: 'City Food Walk', date: 'July 29, 2026', location: 'Old Town', price: '$28', badge: 'Popular' },
]

function FeaturedEvents({ onBook }) {
  return (
    <section className="page-card">
      <div className="page-header">
        <div>
          <p className="eyebrow">Featured</p>
          <h2>Top events this week</h2>
        </div>
      </div>

      <div className="card-grid">
        {featuredEvents.map((event) => (
          <EventCard key={event.title} {...event} onBook={onBook} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedEvents
