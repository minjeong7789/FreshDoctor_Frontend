import { useQuery } from '@tanstack/react-query'
import { getItem } from '../api/items'
import { queryKeys } from '../api/queryKeys'

export function useItemQuery(itemCode: string) {
  return useQuery({
    queryKey: queryKeys.items.detail(itemCode),
    queryFn: () => getItem(itemCode),
    enabled: Boolean(itemCode),
  })
}
