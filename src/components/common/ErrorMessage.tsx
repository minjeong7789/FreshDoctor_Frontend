import { getApiErrorMessage } from '../../api/errors'

interface ErrorMessageProps {
  error?: unknown
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  error,
  title = '데이터를 불러오지 못했어요.',
  message,
  onRetry,
}: ErrorMessageProps) {
  const resolvedMessage = message ?? getApiErrorMessage(error)

  return (
    <div className="data-state data-state--error" role="alert">
      <span className="data-state__icon" aria-hidden="true">!</span>
      <h2>{title}</h2>
      <p>{resolvedMessage}</p>
      {onRetry && (
        <button className="data-state__button" type="button" onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  )
}
