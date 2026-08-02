import { useQuery } from '@tanstack/react-query'
import { getPriceTrend } from '../api/prices'
import { queryKeys } from '../api/queryKeys'

export function usePriceTrendQuery(itemCode: string, days = 14) {
  return useQuery({
    queryKey: queryKeys.prices.trend(itemCode, days),
    queryFn: () => getPriceTrend(itemCode, days),
    enabled: Boolean(itemCode),
  })
}
