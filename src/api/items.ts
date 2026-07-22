import type { ItemResponse } from '../types/item-response'
import { apiClient } from './client'

export async function getItem(itemCode: string): Promise<ItemResponse> {
  const { data } = await apiClient.get<ItemResponse>(
    `/items/${encodeURIComponent(itemCode)}`,
  )

  return data
}
