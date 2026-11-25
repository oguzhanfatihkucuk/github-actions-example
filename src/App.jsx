import { useState } from 'react'

// These values are injected by GitHub Actions at build time.
const commit = import.meta.env.VITE_COMMIT_SHA?.slice(0, 7) || 'local'
const buildTime = import.meta.env.VITE_BUILD_TIME || 'local'

export const cars = [
  { id: 1, name: 'Fiat Egea Comfort', type: 'Economy', price: 30, seats: 5, fuel: 'Diesel', gear: 'Manual', icon: '🚗' },
  { id: 2, name: 'Renault Clio', type: 'Economy', price: 28, seats: 5, fuel: 'Petrol', gear: 'Automatic', icon: '🚙' },
  { id: 3, name: 'Toyota Corolla', type: 'Comfort', price: 45, seats: 5, fuel: 'Hybrid', gear: 'Automatic', icon: '🚘' },
  { id: 4, name: 'VW Passat', type: 'Comfort', price: 55, seats: 5, fuel: 'Diesel', gear: 'Automatic', icon: '🚖' },
  { id: 5, name: 'BMW 5 Series', type: 'Luxury', price: 110, seats: 5, fuel: 'Diesel', gear: 'Automatic', icon: '🏎️' },
  { id: 6, name: 'Ford Tourneo', type: 'Family', price: 70, seats: 8, fuel: 'Diesel', gear: 'Manual', icon: '🚐' },
  { id: 7, name: 'Mercedes 5 Series', type: 'Luxury', price: 24, seats: 6, fuel: 'Diesel', gear: 'Automatic', icon: '🏎️' },
  { id: 8, name: 'Scoda Superb', type: 'Family', price: 140, seats: 6, fuel: 'Diesel', gear: 'Manual', icon: '🚐' },
]

const categories = ['All', 'Economy', 'Comfort', 'Luxury', 'Family']

export default function App() {
  const [filter, setFilter] = useState('All')
  const [selectedId, setSelectedId] = useState(cars[0].id)
  const [days, setDays] = useState(3)
  const [name, setName] = useState('')
  const [confirmed, setConfirmed] = useState(null)

  const visibleCars = filter === 'All' ? cars : cars.filter((c) => c.type === filter)
  const selectedCar = cars.find((c) => c.id === selectedId)
  const total = selectedCar.price * days

  function chooseCar(id) {
    setSelectedId(id)
    setConfirmed(null)
    document.getElementById('booking')?.scrollIntoView?.({ behavior: 'smooth' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setConfirmed({ name: name.trim(), car: selectedCar.name, days, total })
  }

  return (
    <>
      <header className="nav">
        <a href="#" className="logo">🔑 QuickRent</a>
        <nav>
          <a href="#fleet">Fleet</a>
          <a href="#booking">Booking</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Your Journey Starts Here</h1>
        <p>Affordable, well-maintained cars. Book online in minutes.</p>
        <a href="#fleet" className="btn">Browse Cars</a>
      </section>

      <section id="fleet" className="section">
        <h2>Our Fleet</h2>
        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={cat === filter ? 'chip active' : 'chip'}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid">
          {visibleCars.map((car) => (
            <article key={car.id} className={car.id === selectedId ? 'car selected' : 'car'} data-testid="car-card">
              <div className="car-icon">{car.icon}</div>
              <span className="badge">{car.type}</span>
              <h3>{car.name}</h3>
              <ul className="specs">
                <li>👤 {car.seats} seats</li>
                <li>⛽ {car.fuel}</li>
                <li>⚙️ {car.gear}</li>
              </ul>
              <p className="price"><strong>${car.price}</strong> / day</p>
              <button className="btn small" onClick={() => chooseCar(car.id)}>
                Select {car.name}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="booking" className="section alt">
        <h2>Book a Car</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </label>
          <label>
            Car
            <select
              value={selectedId}
              onChange={(e) => { setSelectedId(Number(e.target.value)); setConfirmed(null) }}
            >
              {cars.map((c) => (
                <option key={c.id} value={c.id}>{c.name} – ${c.price}/day</option>
              ))}
            </select>
          </label>
          <label>
            Number of Days
            <input
              type="number"
              min="1"
              max="30"
              value={days}
              onChange={(e) => { setDays(Math.max(1, Number(e.target.value) || 1)); setConfirmed(null) }}
            />
          </label>
          <p className="total">Total: <strong data-testid="total">${total}</strong></p>
          <button type="submit" className="btn">Complete Booking</button>
        </form>

        {confirmed && (
          <div className="success" role="status">
            ✅ Thank you, {confirmed.name}! Your {confirmed.car} is reserved for {confirmed.days} day(s).
            Total: ${confirmed.total}
          </div>
        )}
      </section>

      <footer id="contact" className="footer">
        <p>📍 Sakarya, Türkiye · ☎️ +90 264 000 00 00 · ✉️ info@quickrent.example</p>
        <p className="build">
          Deployed from commit <code>{commit}</code> · built at <code>{buildTime}</code>
        </p>
      </footer>
    </>
  )
}
