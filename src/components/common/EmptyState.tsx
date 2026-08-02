import type { ReactNode } from 'react'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({
  title = '표시할 데이터가 없어요.',
  description = '조건을 변경하거나 잠시 후 다시 확인해 주세요.',
  icon = '○',
  action,
}: EmptyStateProps) {
  return (
    <div className="data-state data-state--empty">
      <span className="data-state__icon" aria-hidden="true">{icon}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && <div className="data-state__action">{action}</div>}
    </div>
  )
}
