import type { RiskLevel } from '../../types/item'
import type { ReactNode } from 'react'

interface RiskBadgeProps {
  level: RiskLevel
  children: ReactNode
}

export function RiskBadge({ level, children }: RiskBadgeProps) {
  return <span className={`risk-badge risk-badge--${level}`}>{children}</span>
}
