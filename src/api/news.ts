import type { NewsResponse } from '../types/news'
import { apiClient } from './client'

export async function getItemNews(itemCode: string): Promise<NewsResponse[]> {
  const { data } = await apiClient.get<NewsResponse[]>(
    `/news/${encodeURIComponent(itemCode)}`,
  )

  return data
}
