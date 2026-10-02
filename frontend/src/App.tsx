import { useEffect, useState } from 'react'

const COUNT_API_URL = 'http://127.0.0.1:8000/api/count/'

interface CountResponse {
  count: number
}

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
        return response.json() as Promise<CountResponse>
      })
      .then(({ count: savedCount }) => {
        setCount(savedCount)
        setError('')
      })
      .catch(() => setError('Could not connect to the backend'))
      .finally(() => setPending(false))
  }, [])

  const updateCount = (delta: 1 | -1) => {
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
        return response.json() as Promise<CountResponse>
      })
      .then(({ count: savedCount }) => setCount(savedCount))
      .catch(() => setError('Could not save your choice'))
      .finally(() => setPending(false))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-slate-950 px-4 py-8 text-slate-100">
      <p className="font-mono text-sm font-bold tracking-[0.2em] text-cyan-300 uppercase">
        bam-boo!
      </p>
      <h1 className="text-8xl leading-none font-black tracking-tight text-white sm:text-9xl">
        {count}
      </h1>
      {error && (
        <p
          className="rounded-md border border-red-400/50 bg-red-950/50 px-3 py-2 text-sm text-red-200"
          role="alert"
        >
          {error}
        </p>
      )}
      <div
        className="flex flex-wrap justify-center gap-3"
        aria-label="Adjust count"
      >
        <button
          type="button"
          disabled={pending}
          onClick={() => updateCount(1)}
          className="min-w-32 rounded-full border-2 border-cyan-300 bg-cyan-300 px-5 py-3 text-lg font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-cyan-200 disabled:cursor-wait disabled:opacity-50"
        >
          <span aria-hidden="true">👍</span> bam
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => updateCount(-1)}
          className="min-w-32 rounded-full border-2 border-slate-600 bg-slate-900 px-5 py-3 text-lg font-bold text-slate-100 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-slate-300 disabled:cursor-wait disabled:opacity-50"
        >
          <span aria-hidden="true">👎</span> boo
        </button>
      </div>
    </main>
  )
}

export default App
