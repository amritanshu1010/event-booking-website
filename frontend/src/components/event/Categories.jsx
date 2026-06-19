import CategoryCard from './CategoryCard'

const categories = [
  { title: 'Music', description: 'Live sets, rooftop shows, and DJ nights.', accent: '#38bdf8' },
  { title: 'Food', description: 'Street food experiences and tasting tours.', accent: '#f472b6' },
  { title: 'Tech', description: 'Workshops, meetups, and innovation sessions.', accent: '#a78bfa' },
]

function Categories() {
  return (
    <section className="page-card">
      <p className="eyebrow">Browse by vibe</p>
      <h2>What are you in the mood for?</h2>
      <div className="card-grid">
        {categories.map((item) => (
          <CategoryCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}

export default Categories
