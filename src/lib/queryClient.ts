import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '../api/errors'

const ONE_MINUTE = 60 * 1000
const FIVE_MINUTES = 5 * ONE_MINUTE

function shouldRetry(failureCount: number, error: unknown) {
  if (failureCount >= 2) return false

  if (!(error instanceof ApiError) || error.status === undefined) return true

  const isRetryableClientError = error.status === 408 || error.status === 429
  const isServerError = error.status >= 500

  return isRetryableClientError || isServerError
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE,
      gcTime: FIVE_MINUTES,
      retry: shouldRetry,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
})
