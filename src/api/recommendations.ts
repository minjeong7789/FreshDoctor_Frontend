import type { RecommendationResponse } from '../types/recommendation'
import { apiClient } from './client'

export async function getLatestRecommendation(
  itemCode: string,
): Promise<RecommendationResponse> {
  const { data } = await apiClient.get<RecommendationResponse>(
    `/recommendations/${encodeURIComponent(itemCode)}`,
  )

  return data
}
