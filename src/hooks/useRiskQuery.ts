import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../api/queryKeys'
import { getRisk } from '../api/risks'

export function useRiskQuery(itemCode: string) {
  return useQuery({
    queryKey: queryKeys.risks.detail(itemCode),
    queryFn: () => getRisk(itemCode),
    enabled: Boolean(itemCode),
  })
}
