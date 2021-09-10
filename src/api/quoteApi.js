import api from './api'

export const fetchQuotes = () => {
  return api.get('quotes/top_quotes').then(res => res.data.quotes)
}
