import type { DashboardItemResponse } from '../types/dashboard'
import type { ProduceItem } from '../types/item'
import { toRiskLabel, toRiskLevel } from './risk'

function formatRate(rate: number): string {
  return new Intl.NumberFormat('ko-KR', {
    maximumFractionDigits: 1,
  }).format(Math.abs(rate))
}

function getTrend(rate: number | null): Pick<ProduceItem, 'trend' | 'trendDirection'> {
  if (rate === null) {
    return { trend: '변동 정보 없음', trendDirection: 'flat' }
  }

  if (rate > 0) {
    return { trend: `7일간 ${formatRate(rate)}% 상승`, trendDirection: 'up' }
  }

  if (rate < 0) {
    return { trend: `7일간 ${formatRate(rate)}% 하락`, trendDirection: 'down' }
  }

  return { trend: '7일간 변동 거의 없음', trendDirection: 'flat' }
}

export function toDashboardItem(item: DashboardItemResponse): ProduceItem {
  return {
    id: item.itemCode,
    name: item.itemName,
    unit: item.unit,
    price: item.currentPrice,
    risk: toRiskLevel(item.riskGrade),
    riskLabel: toRiskLabel(item.riskGrade),
    ...getTrend(item.sevenDayChangeRate),
  }
}
