import { useState } from 'react'
import { fetchQuotes } from '@/api/quoteApi'

const IDLE = 'IDLE'
const PENDING = 'PENDING'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'

const Quotes = (props) => {
  const [quotes, setQuotes] = useState([])
  const [status, setStatus] = useState(IDLE)

  const initFetchQuotes = async () => {
    try {
      setStatus(PENDING)
      const quotesData = await fetchQuotes()
      setQuotes(quotesData)
      setStatus(SUCCESS)
    } catch (error) {
      setStatus(ERROR)
    }
  }


  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-semibold text-2xl mb-4">Quotes</h2>
      <div>
        {status === PENDING ? <p>Loading quotes...</p> : null}
        {status === ERROR ? <p>There was a problem</p> : null}
        {status === IDLE ? (
          <button
            className="px-4 py-3 bg-blue-700 text-blue-100"
            onClick={initFetchQuotes}
          >
            Fetch quotes
          </button>
        ) : null}

        {status === SUCCESS
          ? quotes.map((quote) => {
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
            })
          : null}
      </div>
    </div>
  )
}

export default Quotes
