function EventSearch() {
  return (
    <section className="page-card">
      <div className="page-header">
        <div>
          <p className="eyebrow">Search</p>
          <h2>Find events fast</h2>
        </div>
        <button type="button" className="ghost-btn">Advanced filters</button>
      </div>
      <input className="search-box" type="search" placeholder="Search by title, city, or category" />
    </section>
  )
}

export default EventSearch
