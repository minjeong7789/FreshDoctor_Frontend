import type {
  AlertResponse,
  UnreadAlertCountResponse,
} from '../types/alert'
import { apiClient } from './client'

export async function getAlerts(): Promise<AlertResponse[]> {
  const { data } = await apiClient.get<AlertResponse[]>('/alerts')

  return data
}

export async function getUnreadAlertCount(): Promise<UnreadAlertCountResponse> {
  const { data } = await apiClient.get<UnreadAlertCountResponse>(
    '/alerts/unread-count',
  )

  return data
}

export async function markAlertAsRead(
  alertId: number,
): Promise<AlertResponse> {
  const { data } = await apiClient.patch<AlertResponse>(
    `/alerts/${alertId}/read`,
  )

  return data
}

export async function markAllAlertsAsRead(): Promise<void> {
  await apiClient.patch('/alerts/read-all')
}
