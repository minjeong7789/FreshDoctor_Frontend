import type { RiskGrade } from '../../types/risk'

interface RiskGaugeProps {
  score: number
  grade: RiskGrade
}

const ranges = [
  { label: '안정', color: '#4c9a6a' },
  { label: '관심', color: '#96a934' },
  { label: '주의', color: '#e0a62e' },
  { label: '경계', color: '#de7b3b' },
  { label: '심각', color: '#c0392b' },
]

const gradeIndex: Record<RiskGrade, number> = {
  STABLE: 0,
  WATCH: 1,
  CAUTION: 2,
  ALERT: 3,
  SEVERE: 4,
}

function polarPoint(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180
  return { x: 100 + radius * Math.cos(radians), y: 100 + radius * Math.sin(radians) }
}

function arcPath(startAngle: number, endAngle: number) {
  const start = polarPoint(startAngle, 76)
  const end = polarPoint(endAngle, 76)
  return `M ${start.x} ${start.y} A 76 76 0 0 1 ${end.x} ${end.y}`
}

export function RiskGauge({ score, grade }: RiskGaugeProps) {
  const safeScore = Math.min(100, Math.max(0, score))
  const needleAngle = 180 + safeScore * 1.8
  const needleEnd = polarPoint(needleAngle, 55)
  const activeIndex = gradeIndex[grade]

  return (
    <div className="risk-gauge" aria-label={`종합 위험도 ${safeScore}점, ${ranges[activeIndex].label} 단계`}>
      <svg viewBox="0 0 200 124" role="img" aria-hidden="true">
        {ranges.map((range, index) => (
          <path
            className={index === activeIndex ? 'risk-gauge__segment risk-gauge__segment--active' : 'risk-gauge__segment'}
            d={arcPath(180 + index * 36 + 2, 180 + (index + 1) * 36 - 2)}
            stroke={range.color}
            key={range.label}
          />
        ))}
        <line className="risk-gauge__needle" x1="100" y1="100" x2={needleEnd.x} y2={needleEnd.y} />
        <circle className="risk-gauge__pivot" cx="100" cy="100" r="7" />
        <text className="risk-gauge__min" x="18" y="119">0</text>
        <text className="risk-gauge__max" x="176" y="119">100</text>
      </svg>
      <div className="risk-gauge__value"><strong>{safeScore}</strong><span>점</span></div>
      <div className="risk-gauge__current"><i style={{ background: ranges[activeIndex].color }} />{ranges[activeIndex].label} 단계</div>
      <div className="risk-gauge__legend">{ranges.map((range) => <span key={range.label}><i style={{ background: range.color }} />{range.label}</span>)}</div>
    </div>
  )
}
