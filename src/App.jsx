import { useState } from 'react'

// Bu değerler GitHub Actions tarafından build sırasında doldurulur.
// Lokal çalıştırmada "local" görünür.
const commit = import.meta.env.VITE_COMMIT_SHA?.slice(0, 7) || 'local'
const buildTime = import.meta.env.VITE_BUILD_TIME || 'local'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="container">
      <h1>Merhaba CI/CD 🚀</h1>
      <p>Bu sayfa GitHub Actions ile otomatik olarak test edildi, build alındı ve deploy edildi.</p>

      <div className="card">
        <button onClick={() => setCount(count + 1)}>Tıkla: {count}</button>
      </div>

      <div className="info">
        <span>Commit: <code>{commit}</code></span>
        <span>Build zamanı: <code>{buildTime}</code></span>
      </div>
    </main>
  )
}
