import { EmptyState } from '../components/common/EmptyState'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { RiskGauge } from '../components/dashboard/RiskGauge'
import { ItemCard } from '../components/items/ItemCard'
import { useCurrentUserQuery } from '../hooks/useCurrentUserQuery'
import { useDashboardQuery } from '../hooks/useDashboardQuery'
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

export function DashboardPage() {
  const { data, error, isPending, refetch } = useDashboardQuery()
  const { data: currentUser } = useCurrentUserQuery()

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

  return (
    <>
      <header className="page-heading">
        <div>
          <h1>안녕하세요, {formatNickname(currentUser?.nickname)}</h1>
          <p>오늘의 식자재 가격 위험을 확인하고 안전하게 발주하세요.</p>
        </div>
        <button className="icon-button" aria-label="새 알림">🔔<i /></button>
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

      <div className="section-heading">
        <h2>관심 품목 위험도</h2>
        <span>최근 업데이트 {formatUpdatedAt(data.lastUpdatedAt)}</span>
      </div>

      {items.length > 0 ? (
        <section className="item-grid">
          {items.map((item) => <ItemCard item={item} key={item.id} />)}
        </section>
      ) : (
        <EmptyState
          title="표시할 관심 품목이 없어요."
          description="품목 설정에서 관심 품목을 선택해 주세요."
          icon="◎"
        />
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
