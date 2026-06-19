function CategoryCard({ title, description, accent }) {
  return (
    <article className="category-card" style={{ borderColor: accent }}>
      <span className="event-badge">{title}</span>
      <p>{description}</p>
    </article>
  )
}

export default CategoryCard
