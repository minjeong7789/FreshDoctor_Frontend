import type { ISODateTimeString } from './api'

export interface RegionResponse {
  code: string
  name: string
}

export interface MessageResponse {
  message: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  tokenType: 'Bearer' | string
  expiresIn: number
}

export interface CurrentUserResponse {
  userId: number
  email: string
  nickname: string
  region: string
  createdAt: ISODateTimeString
}

export interface SignupRequest {
  email: string
  password: string
  passwordConfirm: string
  nickname: string
  region: string
}

export interface SignupResponse {
  userId: number
  email: string
  nickname: string
  region: string
  createdAt: ISODateTimeString
}

export interface NicknameAvailabilityResponse {
  nickname: string
  available: boolean
}
