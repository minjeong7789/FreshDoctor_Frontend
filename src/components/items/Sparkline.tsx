interface SparklineProps {
  values: number[]
  color?: string
}

export function Sparkline({ values, color = 'currentColor' }: SparklineProps) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 180},${34 - ((value - min) / range) * 28}`).join(' ')

  return (
    <svg className="sparkline" viewBox="0 0 180 40" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
