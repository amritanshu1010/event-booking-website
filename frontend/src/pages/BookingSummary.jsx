function BookingSummary({ event, onBack }) {
  const selectedEvent = event || {
    title: 'Selected event',
    date: 'Choose a date',
    location: 'Location details',
    price: '$0',
    badge: 'Featured',
  }

  const ticketCount = 2
  const serviceFee = 4
  const total = Number.parseFloat(selectedEvent.price.replace(/[^\d.]/g, '')) * ticketCount + serviceFee

  return (
    <section className="page-card booking-summary-card">
      <p className="eyebrow">Booking summary</p>
      <h2>Review your ticket details</h2>
      <p className="lede">This checkout page appears right after you tap Book now, so the flow feels smooth and ready for payment.</p>

      <div className="booking-summary-grid">
        <article className="mini-card booking-summary-panel">
          <h3>Event</h3>
          <p className="event-badge">{selectedEvent.badge}</p>
          <h4>{selectedEvent.title}</h4>
          <p>{selectedEvent.date}</p>
          <p>{selectedEvent.location}</p>
        </article>

        <article className="mini-card booking-summary-panel">
          <h3>Billing</h3>
          <div className="billing-row"><span>Tickets x {ticketCount}</span><strong>{selectedEvent.price}</strong></div>
          <div className="billing-row"><span>Service fee</span><strong>$4.00</strong></div>
          <div className="billing-row total-row"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <button type="button" className="primary-btn full-width-btn">Confirm payment</button>
        </article>
      </div>

      <div className="cta-row">
        <button type="button" className="ghost-btn" onClick={onBack}>Back to events</button>
        <button type="button" className="primary-btn">Pay now</button>
      </div>
    </section>
  )
}

export default BookingSummary
