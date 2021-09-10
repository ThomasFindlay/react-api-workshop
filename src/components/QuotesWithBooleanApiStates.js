import { useState } from 'react'
import { fetchQuotes } from '@/api/quoteApi'

const Quotes = (props) => {
  const [quotes, setQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isInitialised, setIsInitialised] = useState(false)

  const initFetchQuotes = async () => {
    try {
      if (!isInitialised) setIsInitialised(true)
      setError(null)
      setIsLoading(true)
      const quotesData = await fetchQuotes()
      setQuotes(quotesData)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-semibold text-2xl mb-4">Quotes</h2>
      <div>
        {isLoading ? <p>Loading quotes...</p> : null}
        {!!error ? <p>There was a problem</p> : null}
        {!isInitialised ? (
          <button
            className="px-4 py-3 bg-blue-700 text-blue-100"
            onClick={initFetchQuotes}
          >
            Fetch quotes
          </button>
        ) : null}

        {quotes.map((quote) => {
          return (
            <blockquote
              key={quote.id}
              className="relative p-4 text-xl italic border-l-4"
            >
              <p className="mb-4">"{quote.quote}"</p>
              <cite className="flex items-center justify-center">
                <div className="flex flex-col items-start">
                  <span className="mb-1 text-sm italic font-bold">
                    {quote.author}
                  </span>
                </div>
              </cite>
            </blockquote>
          )
        })}
      </div>
    </div>
  )
}

export default Quotes
