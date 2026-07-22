import type { ISODateString, ISODateTimeString } from './api'

export type PriceDirection = 'UP' | 'DOWN' | 'FLAT'

export interface CurrentPriceResponse {
  price: number
  unit: string
  baseDate: ISODateString
  actualPriceDate: ISODateString
  carriedForward: boolean
}

export interface PricePointResponse {
  date: ISODateString
  price: number
  actualPriceDate: ISODateString
  carriedForward: boolean
}

export interface PriceChangeResponse {
  direction: PriceDirection
  increaseRate: number
  score: number
  previousPrice: number
  latestPrice: number
  previousPriceDate: ISODateString
  latestPriceDate: ISODateString
}

export interface PriceTrendResponse {
  itemCode: string
  itemName: string
  current: CurrentPriceResponse | null
  normalPrice: number | null
  priceChange: PriceChangeResponse | null
  lastUpdatedAt: ISODateTimeString | null
  prices: PricePointResponse[]
}
