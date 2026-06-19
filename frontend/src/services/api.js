const events = [
  {
    id: 1,
    title: 'Summer Music Festival',
    date: 'July 18, 2026',
    location: 'Ocean View Lawn',
    price: '$49',
  },
  {
    id: 2,
    title: 'Design & AI Meetup',
    date: 'July 22, 2026',
    location: 'Tech Hub',
    price: '$15',
  },
]

export function fetchEvents() {
  return Promise.resolve(events)
}

export function fetchEventById(id) {
  return Promise.resolve(events.find((event) => event.id === Number(id)))
}
