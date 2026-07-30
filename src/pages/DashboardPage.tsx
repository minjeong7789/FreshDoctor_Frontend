import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { RiskGauge } from '../components/dashboard/RiskGauge'
import { ItemCard } from '../components/items/ItemCard'
import { ROUTES } from '../constants/routes'
import { useUnreadAlertCountQuery } from '../hooks/useAlertQueries'
import { useCurrentUserQuery } from '../hooks/useCurrentUserQuery'
import { useDashboardQuery } from '../hooks/useDashboardQuery'
import { useWatchItemsQuery } from '../hooks/useItemSettingsQueries'
import type { ProduceItem } from '../types/item'
import { isAuthenticated } from '../utils/authToken'
import { toDashboardItem } from '../utils/dashboard'
import { formatNickname } from '../utils/user'

function formatUpdatedAt(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return '업데이트 시간 확인 불가'

  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

interface DashboardItemSectionProps {
  title: string
  items: ProduceItem[]
  emptyTitle: string
  emptyDescription: string
  action?: ReactNode
}

function DashboardItemSection({
  title,
  items,
  emptyTitle,
  emptyDescription,
  action,
}: DashboardItemSectionProps) {
  return (
    <section className="dashboard-item-section">
      <div className="section-heading">
        <h2>{title}</h2>
        <b>{items.length}개</b>
      </div>
      {items.length > 0 ? (
        <div className="item-grid">
          {items.map((item) => <ItemCard item={item} key={item.id} />)}
        </div>
      ) : (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          icon="◎"
          action={action}
        />
      )}
    </section>
  )
}

export function DashboardPage() {
  const loggedIn = isAuthenticated()
  const { data, error, isPending, refetch } = useDashboardQuery()
  const { data: currentUser } = useCurrentUserQuery()
  const watchItemsQuery = useWatchItemsQuery(loggedIn)
  const unreadAlertCountQuery = useUnreadAlertCountQuery(loggedIn)

  if (isPending) {
    return <LoadingSpinner message="대시보드 정보를 불러오고 있어요." />
  }

  if (error || !data) {
    return (
      <ErrorMessage
        error={error}
        title="대시보드를 불러오지 못했어요."
        onRetry={() => void refetch()}
      />
    )
  }

  const items = data.items.map(toDashboardItem)
  const { gradeCounts } = data
  const watchItemCodes = new Set(
    watchItemsQuery.data?.map((item) => item.itemCode) ?? [],
  )
  const canShowPersonalizedItems =
    loggedIn && watchItemsQuery.isSuccess
  const watchItems = canShowPersonalizedItems
    ? items.filter((item) => watchItemCodes.has(item.id))
    : []
  const otherItems = canShowPersonalizedItems
    ? items.filter((item) => !watchItemCodes.has(item.id))
    : items
  const unreadAlertCount = unreadAlertCountQuery.data?.unreadCount ?? 0

  return (
    <>
      <header className="page-heading">
        <div>
          <h1>안녕하세요, {formatNickname(currentUser?.nickname)}</h1>
          <p>오늘의 식자재 가격 위험을 확인하고 안전하게 발주하세요.</p>
        </div>
        <Link
          className="icon-button"
          to={ROUTES.alerts}
          aria-label={
            unreadAlertCount > 0
              ? `읽지 않은 알림 ${unreadAlertCount}개, 알림함으로 이동`
              : '알림함으로 이동'
          }
        >
          🔔
          {unreadAlertCount > 0 && (
            <span className="icon-button__badge">
              {unreadAlertCount > 99 ? '99+' : unreadAlertCount}
            </span>
          )}
        </Link>
      </header>

      <section className="hero-panel">
        <RiskGauge score={data.todayScore} grade={data.todayGrade} />
        <div>
          <h2>{data.summary}</h2>
          <p>품목별 위험 점수와 최근 가격 변동을 확인해 발주 계획을 조정해 보세요.</p>
          <div className="chip-row">
            <span className="chip chip--safe">안정 {gradeCounts.safe}개</span>
            <span className="chip chip--watch">관심 {gradeCounts.interest}개</span>
            <span className="chip chip--caution">주의 {gradeCounts.caution}개</span>
            <span className="chip chip--alert">경계 {gradeCounts.alert}개</span>
            <span className="chip risk-badge--severe">심각 {gradeCounts.critical}개</span>
          </div>
        </div>
      </section>

      <div className="dashboard-items-heading">
        <h2>품목별 위험도</h2>
        <span>최근 업데이트 {formatUpdatedAt(data.lastUpdatedAt)}</span>
      </div>

      {loggedIn && watchItemsQuery.isPending ? (
        <LoadingSpinner message="관심 품목을 확인하고 있어요." compact />
      ) : (
        <>
          {canShowPersonalizedItems && (
            <DashboardItemSection
              title="관심 품목 위험도"
              items={watchItems}
              emptyTitle="관심 품목이 없어요."
              emptyDescription="품목 설정에서 관심 품목을 선택해 주세요."
              action={(
                <Link className="button button--primary" to={ROUTES.itemSettings}>
                  관심 품목 설정하기
                </Link>
              )}
            />
          )}
          <DashboardItemSection
            title={canShowPersonalizedItems ? '그 외 품목 위험도' : '전체 품목 위험도'}
            items={otherItems}
            emptyTitle="표시할 품목이 없어요."
            emptyDescription={canShowPersonalizedItems
              ? '모든 활성 품목이 관심 품목으로 등록되어 있어요.'
              : '조회 가능한 활성 품목이 없습니다.'}
          />
          {loggedIn && watchItemsQuery.isError && (
            <p className="dashboard-personalization-note" role="status">
              관심 품목을 불러오지 못해 전체 품목을 표시하고 있어요.
            </p>
          )}
        </>
      )}

      <section className="ai-banner">
        <span>✦</span>
        <div>
          <h2>오늘의 AI 추천</h2>
          <p>{data.aiRecommendation || '현재 제공할 추천 내용이 없습니다.'}</p>
        </div>
      </section>
    </>
  )
}
