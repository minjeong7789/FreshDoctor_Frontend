import type {
  NotificationSettingRequest,
  WatchItemResponse,
} from '../types/item-settings'
import { apiClient } from './client'

const WATCH_ITEMS_PATH = '/users/me/items'

export async function getWatchItems(): Promise<WatchItemResponse[]> {
  const { data } = await apiClient.get<WatchItemResponse[]>(WATCH_ITEMS_PATH)
  return data
}

export async function addWatchItem(
  itemCode: string,
): Promise<WatchItemResponse> {
  const { data } = await apiClient.post<WatchItemResponse>(
    `${WATCH_ITEMS_PATH}/${encodeURIComponent(itemCode)}`,
  )
  return data
}

export async function deleteWatchItem(itemCode: string): Promise<void> {
  await apiClient.delete(
    `${WATCH_ITEMS_PATH}/${encodeURIComponent(itemCode)}`,
  )
}

export async function updateWatchItemNotification(
  itemCode: string,
  request: NotificationSettingRequest,
): Promise<WatchItemResponse> {
  const { data } = await apiClient.patch<WatchItemResponse>(
    `${WATCH_ITEMS_PATH}/${encodeURIComponent(itemCode)}/notification`,
    request,
  )
  return data
}
