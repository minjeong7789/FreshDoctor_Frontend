import type { ISODateTimeString } from './api'
import type { RiskGrade } from './risk'

export type RecommendationGenerationType = 'GPT' | 'FALLBACK'

export interface RecommendationResponse {
  id: number
  itemCode: string
  itemName: string
  riskGrade: RiskGrade
  finalScore: number
  priceIncreaseRate: number | null
  weatherIssue: string | null
  newsIssue: string | null
  recommendation: string
  generationType: RecommendationGenerationType
  createdAt: ISODateTimeString
  updatedAt: ISODateTimeString
}
