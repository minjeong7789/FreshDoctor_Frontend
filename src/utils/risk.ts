import type { RiskLevel } from '../types/item'
import type { RiskGrade } from '../types/risk'

const riskLevelByGrade: Record<RiskGrade, RiskLevel> = {
  STABLE: 'safe',
  WATCH: 'watch',
  CAUTION: 'caution',
  ALERT: 'alert',
  SEVERE: 'severe',
}

const riskLabelByGrade: Record<RiskGrade, string> = {
  STABLE: '안정',
  WATCH: '관심',
  CAUTION: '주의',
  ALERT: '경계',
  SEVERE: '심각',
}

export function toRiskLevel(grade: RiskGrade): RiskLevel {
  return riskLevelByGrade[grade]
}

export function toRiskLabel(grade: RiskGrade): string {
  return riskLabelByGrade[grade]
}
