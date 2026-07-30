import { Link, useNavigate } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { ROUTES } from '../constants/routes'
import {
  useAlertsQuery,
  useMarkAlertAsReadMutation,
  useMarkAllAlertsAsReadMutation,
  useUnreadAlertCountQuery,
} from '../hooks/useAlertQueries'
import type { AlertResponse } from '../types/alert'
import type { RiskLevel } from '../types/item'
import { isAuthenticated } from '../utils/authToken'
import { toRiskLevel } from '../utils/risk'

function getAlertLevel(alert: AlertResponse): RiskLevel {
  if (alert.currentGrade) return toRiskLevel(alert.currentGrade)
  if (
    alert.alertType === 'SEVERE_WEATHER_ISSUE'
    || alert.alertType === 'SEVERE_NEWS_ISSUE'
  ) {
    return 'severe'
  }
  if (alert.alertType === 'GRADE_DECREASE') return 'safe'

  return 'watch'
}

function formatOccurredAt(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const elapsedSeconds = Math.round((date.getTime() - Date.now()) / 1000)
  const relativeTime = new Intl.RelativeTimeFormat('ko-KR', { numeric: 'auto' })

  if (Math.abs(elapsedSeconds) < 60) return '방금 전'

  const elapsedMinutes = Math.round(elapsedSeconds / 60)
  if (Math.abs(elapsedMinutes) < 60) {
    return relativeTime.format(elapsedMinutes, 'minute')
  }

  const elapsedHours = Math.round(elapsedMinutes / 60)
  if (Math.abs(elapsedHours) < 24) {
    return relativeTime.format(elapsedHours, 'hour')
  }

  const elapsedDays = Math.round(elapsedHours / 24)
  if (Math.abs(elapsedDays) < 7) {
    return relativeTime.format(elapsedDays, 'day')
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function AlertsPage() {
  const navigate = useNavigate()
  const loggedIn = isAuthenticated()
  const alertsQuery = useAlertsQuery(loggedIn)
  const unreadCountQuery = useUnreadAlertCountQuery(loggedIn)
  const markAsReadMutation = useMarkAlertAsReadMutation()
  const markAllAsReadMutation = useMarkAllAlertsAsReadMutation()
  const alerts = alertsQuery.data ?? []
  const unreadCount = unreadCountQuery.data?.unreadCount
    ?? alerts.filter((alert) => !alert.read).length

  const handleAlertOpen = async (alert: AlertResponse) => {
    if (!alert.read) {
      try {
        await markAsReadMutation.mutateAsync(alert.alertId)
      } catch {
        return
      }
    }

    if (alert.itemCode) {
      navigate(ROUTES.itemDetail(alert.itemCode))
    }
  }

  if (!loggedIn) {
    return (
      <>
        <header className="page-heading">
          <div>
            <h1>알림함</h1>
            <p>위험도가 바뀌었거나 확인이 필요한 소식이에요.</p>
          </div>
        </header>
        <EmptyState
          icon="🔔"
          title="로그인이 필요한 기능이에요."
          description="로그인하면 관심 품목의 위험도와 가격 변동 알림을 확인할 수 있어요."
          action={<Link className="button button--primary" to={ROUTES.auth}>로그인하기</Link>}
        />
      </>
    )
  }

  if (alertsQuery.isPending) {
    return <LoadingSpinner message="알림을 불러오고 있어요." />
  }

  if (alertsQuery.error) {
    return (
      <ErrorMessage
        error={alertsQuery.error}
        title="알림을 불러오지 못했어요."
        onRetry={() => void alertsQuery.refetch()}
      />
    )
  }

  return (
    <>
      <header className="page-heading alerts-heading">
        <div>
          <h1>알림함</h1>
          <p>위험도가 바뀌었거나 확인이 필요한 소식이에요.</p>
        </div>
        {unreadCount > 0 && (
          <button
            className="button button--ghost"
            type="button"
            disabled={markAllAsReadMutation.isPending}
            onClick={() => markAllAsReadMutation.mutate()}
          >
            {markAllAsReadMutation.isPending ? '처리 중...' : `모두 읽음 (${unreadCount})`}
          </button>
        )}
      </header>
      <div className="section-heading alerts-section-heading">
        <h2>최근 알림</h2>
        <span>읽지 않은 알림 {unreadCount}개</span>
      </div>
      {alerts.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="아직 도착한 알림이 없어요."
          description="관심 품목의 위험도나 가격에 변화가 생기면 알려드릴게요."
          action={<Link className="button button--ghost" to={ROUTES.itemSettings}>관심 품목 설정하기</Link>}
        />
      ) : (
        <section className="notification-list" aria-label="최근 알림 목록">
          {alerts.map((alert) => {
            const isReading =
              markAsReadMutation.isPending
              && markAsReadMutation.variables === alert.alertId

            return (
              <article
                className={`notification${alert.read ? ' notification--read' : ' notification--unread'}`}
                key={alert.alertId}
              >
                <i
                  className={`notification__dot notification__dot--${getAlertLevel(alert)}`}
                  aria-hidden="true"
                />
                <button
                  className="notification__content"
                  type="button"
                  disabled={isReading}
                  onClick={() => void handleAlertOpen(alert)}
                >
                  <h3>
                    {alert.itemName
                      ? `[${alert.itemName}] ${alert.title}`
                      : alert.title}
                  </h3>
                  <p>{alert.description}</p>
                </button>
                <div className="notification__actions">
                  <time dateTime={alert.occurredAt}>
                    {formatOccurredAt(alert.occurredAt)}
                  </time>
                  {!alert.read && (
                    <button
                      type="button"
                      disabled={isReading}
                      onClick={() => markAsReadMutation.mutate(alert.alertId)}
                    >
                      {isReading ? '처리 중...' : '읽음'}
                    </button>
                  )}
                </div>
              </article>
            )
          })}
        </section>
      )}
      {(markAsReadMutation.error || markAllAsReadMutation.error) && (
        <p className="alerts-mutation-error" role="alert">
          읽음 상태를 변경하지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
      )}
    </>
  )
}
