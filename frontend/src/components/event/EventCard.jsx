function EventCard({ title, date, location, price, badge, onBook }) {
  return (
    <article className="event-card">
      <span className="event-badge">{badge}</span>
      <h3>{title}</h3>
      <p className="muted">{date}</p>
      <p>{location}</p>
      <div className="event-card-footer">
        <strong>{price}</strong>
        <button
          type="button"
          className="primary-btn"
          onClick={() => onBook?.({ title, date, location, price, badge })}
        >
          Book now
        </button>
      </div>
    </article>
  )
}

export default EventCard
