import { useEffect, useState } from 'react'
import './App.css'

const COUNT_API_URL = 'http://127.0.0.1:8000/api/count/'

function App() {
  const [count, setCount] = useState(0)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(true)

  useEffect(() => {
    fetch(COUNT_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load the count')
        }
        return response.json()
      })
      .then(({ count: savedCount }) => {
        setCount(savedCount)
        setError('')
      })
      .catch(() => setError('Could not connect to the backend'))
      .finally(() => setPending(false))
  }, [])

  const updateCount = (delta) => {
    setPending(true)
    setError('')

    fetch(COUNT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ delta }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not update the count')
        }
        return response.json()
      })
      .then(({ count: savedCount }) => setCount(savedCount))
      .catch(() => setError('Could not save your choice'))
      .finally(() => setPending(false))
  }

  return (
    <main className="vote-panel">
      <p className="eyebrow">bam-_boo_!</p>
      <h1>{count}</h1>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="vote-controls" aria-label="Adjust count">
        <button type="button" disabled={pending} onClick={() => updateCount(1)}>
          <span aria-hidden="true">👍</span> bam
        </button>
        <button type="button" disabled={pending} onClick={() => updateCount(-1)}>
          <span aria-hidden="true">👎</span> boo
        </button>
      </div>
    </main>
  )
}

export default App
