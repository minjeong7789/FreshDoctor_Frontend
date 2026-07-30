import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getAlerts,
  getUnreadAlertCount,
  markAlertAsRead,
  markAllAlertsAsRead,
} from '../api/alerts'
import { queryKeys } from '../api/queryKeys'

export function useAlertsQuery(enabled = true) {
  return useQuery({
    queryKey: queryKeys.alerts.list(),
    queryFn: getAlerts,
    enabled,
  })
}

export function useUnreadAlertCountQuery(enabled = true) {
  return useQuery({
    queryKey: queryKeys.alerts.unreadCount(),
    queryFn: getUnreadAlertCount,
    enabled,
  })
}

export function useMarkAlertAsReadMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markAlertAsRead,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.alerts.all }),
  })
}

export function useMarkAllAlertsAsReadMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markAllAlertsAsRead,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.alerts.all }),
  })
}
