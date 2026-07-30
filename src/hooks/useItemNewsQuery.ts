import { useQuery } from '@tanstack/react-query'
import { getItemNews } from '../api/news'
import { queryKeys } from '../api/queryKeys'

export function useItemNewsQuery(itemCode: string) {
  return useQuery({
    queryKey: queryKeys.news.list(itemCode),
    queryFn: () => getItemNews(itemCode),
    enabled: Boolean(itemCode),
  })
}
