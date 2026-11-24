import { render, screen, fireEvent } from '@testing-library/react'
import App, { cars } from './App'

describe('Car Rental Site', () => {
  it('shows the main heading', () => {
    render(<App />)
    expect(screen.getByText('Your Journey Starts Here')).toBeInTheDocument()
  })

  it('lists all cars', () => {
    render(<App />)
    expect(screen.getAllByTestId('car-card')).toHaveLength(cars.length)
  })

  it('filters cars by category', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Luxury' }))
    const cards = screen.getAllByTestId('car-card')
    expect(cards).toHaveLength(1)
    expect(cards[0]).toHaveTextContent('BMW 5 Series')
  })

  it('calculates the total price', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Select Toyota Corolla' }))
    fireEvent.change(screen.getByLabelText('Number of Days'), { target: { value: '4' } })
    // $45 x 4 days = $180
    expect(screen.getByTestId('total')).toHaveTextContent('$180')
  })

  it('shows a booking confirmation', () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Alice' } })
    fireEvent.click(screen.getByRole('button', { name: 'Complete Booking' }))
    expect(screen.getByRole('status')).toHaveTextContent('Thank you, Alice!')
  })
})
