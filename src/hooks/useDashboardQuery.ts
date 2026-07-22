import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '../api/dashboard'
import { queryKeys } from '../api/queryKeys'

export function useDashboardQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard.overview(),
    queryFn: getDashboard,
  })
}
