import type { RiskLevel } from '../types/item'
import type { RiskGrade } from '../types/risk'

const riskLevelByGrade: Record<RiskGrade, RiskLevel> = {
  SAFE: 'safe',
  INTEREST: 'watch',
  CAUTION: 'caution',
  ALERT: 'alert',
  CRITICAL: 'severe',
}

const riskLabelByGrade: Record<RiskGrade, string> = {
  SAFE: '안정',
  INTEREST: '관심',
  CAUTION: '주의',
  ALERT: '경계',
  CRITICAL: '심각',
}

export function toRiskLevel(grade: RiskGrade): RiskLevel {
  return riskLevelByGrade[grade]
}

export function toRiskLabel(grade: RiskGrade): string {
  return riskLabelByGrade[grade]
}
