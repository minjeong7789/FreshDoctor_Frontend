import type { ISODateString, ISODateTimeString } from './api'
import type { RiskGrade } from './risk'

export type AlertType =
  | 'GRADE_INCREASE'
  | 'GRADE_DECREASE'
  | 'RISK_LEVEL_ENTRY'
  | 'PRICE_VOLATILITY_THRESHOLD'
  | 'PRICE_INCREASE_THRESHOLD'
  | 'SEVERE_WEATHER_ISSUE'
  | 'SEVERE_NEWS_ISSUE'
  | 'DAILY_SUMMARY'

export interface AlertResponse {
  alertId: number
  itemCode: string | null
  itemName: string | null
  alertType: AlertType
  previousScore: number | null
  previousGrade: RiskGrade | null
  currentScore: number | null
  currentGrade: RiskGrade | null
  title: string
  description: string
  evidence: string | null
  riskScoreDate: ISODateString | null
  occurredAt: ISODateTimeString
  read: boolean
}

export interface UnreadAlertCountResponse {
  unreadCount: number
}
