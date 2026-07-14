interface LoadingSpinnerProps {
  message?: string
  compact?: boolean
}

export function LoadingSpinner({
  message = '데이터를 불러오고 있어요.',
  compact = false,
}: LoadingSpinnerProps) {
  return (
    <div
      className={`data-state data-state--loading${compact ? ' data-state--compact' : ''}`}
      role="status"
      aria-live="polite"
    >
      <span className="loading-spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}
