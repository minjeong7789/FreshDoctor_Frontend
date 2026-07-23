import { useMutation } from '@tanstack/react-query'
import {
  checkNicknameAvailability,
  confirmEmailVerification,
  login,
  requestEmailVerification,
  signup,
} from '../api/auth'

export function useLoginMutation() {
  return useMutation({ mutationFn: login })
}

export function useSignupMutation() {
  return useMutation({ mutationFn: signup })
}

export function useEmailVerificationRequestMutation() {
  return useMutation({ mutationFn: requestEmailVerification })
}

export function useEmailVerificationConfirmMutation() {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      confirmEmailVerification(email, code),
  })
}

export function useNicknameAvailabilityMutation() {
  return useMutation({ mutationFn: checkNicknameAvailability })
}
