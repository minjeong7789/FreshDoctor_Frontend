import axios from 'axios'
import type { ApiErrorResponse } from '../types/api'

const DEFAULT_ERROR_MESSAGE = '요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.'

export class ApiError extends Error {
  readonly code: string
  readonly status?: number
  readonly originalError: unknown

  constructor(
    message: string,
    options: { code: string; status?: number; originalError?: unknown },
  ) {
    super(message)
    this.name = 'ApiError'
    this.code = options.code
    this.status = options.status
    this.originalError = options.originalError
  }
}

function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  if (typeof data !== 'object' || data === null) return false

  const response = data as Record<string, unknown>
  return typeof response.code === 'string' && typeof response.message === 'string'
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error

  if (!axios.isAxiosError(error)) {
    return new ApiError(DEFAULT_ERROR_MESSAGE, {
      code: 'UNKNOWN_ERROR',
      originalError: error,
    })
  }

  if (error.code === 'ECONNABORTED') {
    return new ApiError('서버 응답이 지연되고 있습니다. 다시 시도해 주세요.', {
      code: 'REQUEST_TIMEOUT',
      originalError: error,
    })
  }

  if (!error.response) {
    return new ApiError('서버에 연결할 수 없습니다. 네트워크 상태를 확인해 주세요.', {
      code: 'NETWORK_ERROR',
      originalError: error,
    })
  }

  const { data, status } = error.response

  if (isApiErrorResponse(data)) {
    return new ApiError(data.message, {
      code: data.code,
      status,
      originalError: error,
    })
  }

  return new ApiError(DEFAULT_ERROR_MESSAGE, {
    code: `HTTP_${status}`,
    status,
    originalError: error,
  })
}

export function getApiErrorMessage(error: unknown): string {
  return toApiError(error).message
}
