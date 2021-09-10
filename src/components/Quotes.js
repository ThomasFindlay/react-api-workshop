import { useEffect, useState } from 'react'
import { fetchQuotes } from '@/api/quoteApi'

const Quotes = (props) => {
  const [quotes, setQuotes] = useState([])

  const initFetchQuotes = async () => {
    const quotesData = await fetchQuotes()
    setQuotes(quotesData)
  }

  useEffect(() => {
    initFetchQuotes()
  }, [])

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-semibold text-2xl mb-4">Quotes</h2>
      <div>
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
