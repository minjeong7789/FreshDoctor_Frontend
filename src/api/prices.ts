import type { PriceTrendResponse } from '../types/price'
import { apiClient } from './client'

export async function getPriceTrend(
  itemCode: string,
  days = 14,
): Promise<PriceTrendResponse> {
  const { data } = await apiClient.get<PriceTrendResponse>(
    `/prices/${encodeURIComponent(itemCode)}/trend`,
    { params: { days } },
  )

  return data
}
