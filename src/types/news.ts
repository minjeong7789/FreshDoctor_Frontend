export interface NewsResponse {
  id: number
  itemCode: string
  queryText: string | null
  title: string
  link: string
  description: string | null
  matchedKeywords: string | null
  newsRiskType: string | null
  riskReason: string | null
  representativeRisk: boolean | null
  publishedAt: string | null
  newsRiskScore: number | null
  source: string | null
  createdAt: string
}
