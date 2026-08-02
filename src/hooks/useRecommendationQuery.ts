import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../api/queryKeys'
import { getLatestRecommendation } from '../api/recommendations'

export function useRecommendationQuery(itemCode: string) {
  return useQuery({
    queryKey: queryKeys.recommendations.latest(itemCode),
    queryFn: () => getLatestRecommendation(itemCode),
    enabled: Boolean(itemCode),
  })
}
