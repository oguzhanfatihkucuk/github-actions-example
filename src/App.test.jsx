import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('başlığı gösterir', () => {
    render(<App />)
    expect(screen.getByText('Merhaba CI/CD 🚀')).toBeInTheDocument()
  })

  it('butona tıklanınca sayaç artar', () => {
    render(<App />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(button).toHaveTextContent('Tıkla: 2')
  })
})
