export type RiskLevel = 'safe' | 'watch' | 'caution' | 'alert' | 'severe'

export interface ProduceItem {
  id: string
  name: string
  unit: string
  price: number
  risk: RiskLevel
  riskLabel: string
  trend: string
  trendDirection: 'up' | 'down' | 'flat'
  chart: number[]
}
