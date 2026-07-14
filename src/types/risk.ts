import type { ISODateString, ISODateTimeString } from './api'

export type RiskGrade = 'STABLE' | 'WATCH' | 'CAUTION' | 'ALERT' | 'SEVERE'

export interface RiskFactorResponse {
  name: string
  score: number | null
  maxScore: number
  displayRatio: number
}

export interface RiskDashboardResponse {
  itemCode: string
  scoreDate: ISODateString
  finalScore: number
  riskGrade: RiskGrade
  factors: RiskFactorResponse[]
  priceIncreaseRate: number | null
  normalYearComparisonRate: number | null
  priceVolatilityRate: number | null
  weatherIssue: string | null
  newsIssue: string | null
  baseDate: ISODateString
  lastUpdatedAt: ISODateTimeString
  unavailableItems: string[]
  unavailableReasons: string[]
}

export interface RiskHistoryResponse {
  itemCode: string
  scoreDate: ISODateString
  finalScore: number
  riskGrade: RiskGrade
  rawScore: number
  lastUpdatedAt: ISODateTimeString
}
