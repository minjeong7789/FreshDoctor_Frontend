import type { DashboardResponse } from '../types/dashboard'
import { apiClient } from './client'

export async function getDashboard(): Promise<DashboardResponse> {
  const { data } = await apiClient.get<DashboardResponse>('/dashboard')

  return data
}
