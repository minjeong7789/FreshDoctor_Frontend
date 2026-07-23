import type { LoginResponse } from '../types/auth'

const ACCESS_TOKEN_KEY = 'freshdoctorAccessToken'
const ACCESS_TOKEN_EXPIRES_AT_KEY = 'freshdoctorAccessTokenExpiresAt'

export function saveAuthToken(response: LoginResponse) {
  const expiresAt = Date.now() + response.expiresIn * 1000
  localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
  localStorage.setItem(ACCESS_TOKEN_EXPIRES_AT_KEY, String(expiresAt))
}

export function clearAuthToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT_KEY)
}

export function getAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  const expiresAt = Number(localStorage.getItem(ACCESS_TOKEN_EXPIRES_AT_KEY))

  if (!accessToken || !expiresAt || expiresAt <= Date.now()) {
    clearAuthToken()
    return null
  }

  return accessToken
}

export function isAuthenticated() {
  return Boolean(getAccessToken())
}
