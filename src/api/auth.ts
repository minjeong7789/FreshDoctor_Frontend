import type {
  CurrentUserResponse,
  LoginRequest,
  LoginResponse,
  MessageResponse,
  NicknameAvailabilityResponse,
  RegionResponse,
  SignupRequest,
  SignupResponse,
} from '../types/auth'
import { apiClient } from './client'

export async function getRegions() {
  const { data } = await apiClient.get<RegionResponse[]>('/regions')
  return data
}

export async function requestEmailVerification(email: string) {
  const { data } = await apiClient.post<MessageResponse>('/auth/email-verifications', { email })
  return data
}

export async function confirmEmailVerification(email: string, code: string) {
  const { data } = await apiClient.post<MessageResponse>('/auth/email-verifications/confirm', { email, code })
  return data
}

export async function checkNicknameAvailability(nickname: string) {
  const { data } = await apiClient.get<NicknameAvailabilityResponse>('/auth/nicknames/availability', {
    params: { nickname },
  })
  return data
}

export async function signup(request: SignupRequest) {
  const { data } = await apiClient.post<SignupResponse>('/auth/signup', request)
  return data
}

export async function login(request: LoginRequest) {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', request)
  return data
}

export async function getCurrentUser() {
  const { data } = await apiClient.get<CurrentUserResponse>('/users/me')
  return data
}
