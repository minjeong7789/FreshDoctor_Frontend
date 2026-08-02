import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../api/auth'
import { queryKeys } from '../api/queryKeys'
import { isAuthenticated } from '../utils/authToken'

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: queryKeys.auth.currentUser(),
    queryFn: getCurrentUser,
    enabled: isAuthenticated(),
  })
}
