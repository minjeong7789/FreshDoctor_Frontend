import type { ISODateString, ISODateTimeString } from './api'
import type { RiskGrade } from './risk'

export interface DashboardGradeCountsResponse {
  stable: number
  watch: number
  caution: number
  alert: number
  severe: number
}

export interface DashboardTopRiskItemResponse {
  itemCode: string
  itemName: string
  finalScore: number
  riskGrade: RiskGrade
}

export interface DashboardItemResponse {
  itemCode: string
  itemName: string
  currentPrice: number | null
  unit: string
  sevenDayChangeRate: number | null
  finalScore: number
  riskGrade: RiskGrade
  dataDate: ISODateString
  lastUpdatedAt: ISODateTimeString
}

export interface DashboardResponse {
  todayScore: number
  todayGrade: RiskGrade
  summary: string
  topRiskItems: DashboardTopRiskItemResponse[]
  gradeCounts: DashboardGradeCountsResponse
  items: DashboardItemResponse[]
  aiRecommendation: string
  dataDate: ISODateString
  lastUpdatedAt: ISODateTimeString
}
