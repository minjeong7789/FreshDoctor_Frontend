import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getItems } from '../api/items'
import { queryKeys } from '../api/queryKeys'
import {
  addWatchItem,
  deleteWatchItem,
  getWatchItems,
  updateWatchItemNotification,
} from '../api/watchItems'

export function useItemsQuery(keyword = '') {
  const normalizedKeyword = keyword.trim()

  return useQuery({
    queryKey: queryKeys.items.list(normalizedKeyword),
    queryFn: () => getItems(normalizedKeyword),
  })
}

export function useWatchItemsQuery(enabled = true) {
  return useQuery({
    queryKey: queryKeys.watchItems.list(),
    queryFn: getWatchItems,
    enabled,
  })
}

export function useAddWatchItemMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addWatchItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.watchItems.all }),
  })
}

export function useDeleteWatchItemMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteWatchItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.watchItems.all }),
  })
}

export function useUpdateWatchItemNotificationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemCode, enabled }: { itemCode: string; enabled: boolean }) =>
      updateWatchItemNotification(itemCode, { enabled }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.watchItems.all }),
  })
}
