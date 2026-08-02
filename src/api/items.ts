import type { ItemResponse } from '../types/item-response'
import type { ItemListResponse } from '../types/item-settings'
import { apiClient } from './client'

export async function getItems(keyword?: string): Promise<ItemListResponse> {
  const normalizedKeyword = keyword?.trim()
  const { data } = await apiClient.get<ItemListResponse>('/items', {
    params: normalizedKeyword ? { keyword: normalizedKeyword } : undefined,
  })

  return data
}

export async function getItem(itemCode: string): Promise<ItemResponse> {
  const { data } = await apiClient.get<ItemResponse>(
    `/items/${encodeURIComponent(itemCode)}`,
  )

  return data
}
