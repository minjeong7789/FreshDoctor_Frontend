import type { ProduceItem } from '../types/item'

export const mockItems: ProduceItem[] = [
  { id: 'cabbage', name: '배추', unit: '10kg', price: 18400, risk: 'alert', riskLabel: '경계', trend: '7일간 21% 상승', trendDirection: 'up', chart: [12, 15, 14, 21, 19, 30, 34] },
  { id: 'radish', name: '무', unit: '1kg', price: 3200, risk: 'caution', riskLabel: '주의', trend: '7일간 9% 상승', trendDirection: 'up', chart: [18, 16, 23, 20, 27, 25, 31] },
  { id: 'onion', name: '양파', unit: '15kg', price: 21000, risk: 'watch', riskLabel: '관심', trend: '7일간 변동 거의 없음', trendDirection: 'flat', chart: [24, 22, 23, 20, 22, 21, 23] },
  { id: 'apple', name: '사과 (부사)', unit: '10kg', price: 34500, risk: 'safe', riskLabel: '안정', trend: '7일간 3% 하락', trendDirection: 'down', chart: [25, 26, 24, 27, 26, 28, 27] },
  { id: 'potato', name: '감자', unit: '20kg', price: 26800, risk: 'safe', riskLabel: '안정', trend: '7일간 변동 거의 없음', trendDirection: 'flat', chart: [22, 23, 22, 21, 23, 22, 24] },
]
