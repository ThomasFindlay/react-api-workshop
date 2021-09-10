import { useEffect, useRef, useState } from 'react'
import { fetchQuotes, searchQuotes } from '@/api/quoteApi'
import axios from 'axios'

const RequestCancellation = (props) => {
  const [quotes, setQuotes] = useState([])
  const [query, setQuery] = useState('')
  const searchQuotesAbortRef = useRef(null)

  const initFetchQuotes = async () => {
    const quotesData = await fetchQuotes()
    setQuotes(quotesData)
  }

  const onQueryChange = async (e) => {
    const q = e.target.value
    setQuery(q)
    try {
      searchQuotesAbortRef.current?.()
      const {cancel, token} = axios.CancelToken.source()
      searchQuotesAbortRef.current = cancel

      const response = await searchQuotes(q, {
        cancelToken: token
      })
      setQuotes(response)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.warn('REQUEST ABORTED!')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    initFetchQuotes()
  }, [])

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-semibold text-2xl mb-4">Request Cancellation</h2>
      <div>
        <form className="mb-8 flex flex-col items-start">
          <label className="mb-4">Find quotes</label>
          <input className="px-4 py-3 border w-full" type="text" value={query} onChange={onQueryChange} />
        </form>
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

export default RequestCancellation
