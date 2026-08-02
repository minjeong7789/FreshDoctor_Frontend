import type { ItemResponse } from './item-response'

export type ItemListResponse = ItemResponse[]

export interface WatchItemResponse {
  itemCode: string
  itemName: string
  notificationEnabled: boolean
}

export interface NotificationSettingRequest {
  enabled: boolean
}
