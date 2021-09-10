import { useState } from 'react'
import { useApiStatus } from './useApiStatus'
import { PENDING, SUCCESS, ERROR } from '../constants/apiStatus'

export function useApi(
  fn,
  config = {}
) {
  const { initialData } = config
  const [data, setData] = useState(initialData)
  const [error, setError] = useState()
  const { status, setStatus, ...normalisedStatuses } = useApiStatus()

  const exec = async (...args) => {
    try {
      setStatus(PENDING)
      const data = await fn(...args)
      setData(data)
      setStatus(SUCCESS)
      return {
        data,
        error: null,
      }
    } catch (error) {
      setError(error)
      setStatus(ERROR)
      return {
        error,
        data: null,
      }
    }
  }

  return {
    data,
    setData,
    status,
    setStatus,
    error,
    exec,
    ...normalisedStatuses,
  }
}
