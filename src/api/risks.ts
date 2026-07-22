import type { RiskDashboardResponse } from '../types/risk'
import { apiClient } from './client'

export async function getRisk(
  itemCode: string,
): Promise<RiskDashboardResponse> {
  const { data } = await apiClient.get<RiskDashboardResponse>(
    `/risks/${encodeURIComponent(itemCode)}`,
  )

  return data
}
