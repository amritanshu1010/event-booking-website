function Attendees() {
  return (
    <section className="page-card">
      <p className="eyebrow">Attendees</p>
      <h2>Guest overview</h2>
      <div className="booking-list">
        <article className="booking-item"><div><h3>Jordan Smith</h3><p>2 tickets · VIP</p></div><span className="status-pill">Checked in</span></article>
        <article className="booking-item"><div><h3>Maya Chen</h3><p>1 ticket · Standard</p></div><span className="status-pill">Pending</span></article>
      </div>
    </section>
  )
}

export default Attendees
