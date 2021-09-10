import { useState } from 'react'
import { fetchQuotes } from '@/api/quoteApi'

const IDLE = 'IDLE'
const PENDING = 'PENDING'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'

const Quotes = (props) => {
  const [quotes, setQuotes] = useState([])
  const [apiStatus, setApiStatus] = useState(IDLE)

  const initFetchQuotes = async () => {
    try {
      setApiStatus(PENDING)
      const quotesData = await fetchQuotes()
      setQuotes(quotesData)
      setApiStatus(SUCCESS)
    } catch (error) {
      setApiStatus(ERROR)
    }
  }


  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-semibold text-2xl mb-4">Quotes</h2>
      <div>
        {apiStatus === PENDING ? <p>Loading quotes...</p> : null}
        {apiStatus === ERROR ? <p>There was a problem</p> : null}
        {apiStatus === IDLE ? (
          <button
            className="px-4 py-3 bg-blue-700 text-blue-100"
            onClick={initFetchQuotes}
          >
            Fetch quotes
          </button>
        ) : null}

        {apiStatus === SUCCESS
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
