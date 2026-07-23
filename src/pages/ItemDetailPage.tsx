import { Link, useParams } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { RiskBadge } from '../components/common/RiskBadge'
import { Sparkline } from '../components/items/Sparkline'
import { ROUTES } from '../constants/routes'
import { useItemQuery } from '../hooks/useItemQuery'
import { usePriceTrendQuery } from '../hooks/usePriceTrendQuery'
import { useRecommendationQuery } from '../hooks/useRecommendationQuery'
import { useRiskQuery } from '../hooks/useRiskQuery'
import { toRiskLabel, toRiskLevel } from '../utils/risk'

const factorLabels: Record<string, string> = {
  PRICE_INCREASE: '가격 급등률',
  NORMAL_YEAR: '평년 대비 괴리',
  VOLATILITY: '가격 변동성',
  WEATHER: '기상 위험',
  NEWS_SUPPLY: '뉴스·수급 위험',
}

function formatUpdatedAt(value: string | null | undefined) {
  if (!value) return '업데이트 정보 없음'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '업데이트 시간 확인 불가'

  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatPrice(value: number) {
  return `${value.toLocaleString('ko-KR')}원`
}

function formatPriceDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function ItemDetailPage() {
  const { itemId = '' } = useParams()
  const itemQuery = useItemQuery(itemId)
  const priceQuery = usePriceTrendQuery(itemId, 14)
  const riskQuery = useRiskQuery(itemId)
  const recommendationQuery = useRecommendationQuery(itemId)

  if (!itemId) {
    return <ErrorMessage title="품목을 확인할 수 없어요." message="올바른 품목을 다시 선택해 주세요." />
  }

  if (
    itemQuery.isPending
    || priceQuery.isPending
    || riskQuery.isPending
    || recommendationQuery.isPending
  ) {
    return <LoadingSpinner message="품목 상세 정보를 불러오고 있어요." />
  }

  if (itemQuery.error || riskQuery.error || !itemQuery.data || !riskQuery.data) {
    return (
      <ErrorMessage
        error={itemQuery.error ?? riskQuery.error}
        title="품목 상세 정보를 불러오지 못했어요."
        onRetry={() => {
          void itemQuery.refetch()
          void priceQuery.refetch()
          void riskQuery.refetch()
          void recommendationQuery.refetch()
        }}
      />
    )
  }

  const item = itemQuery.data
  const risk = riskQuery.data
  const price = priceQuery.data
  const recommendation = recommendationQuery.data
  const pricePoints = price?.prices ?? []
  const priceTrendTitle = pricePoints.length > 0
    ? `최근 ${pricePoints.length}일 가격 추이`
    : '최근 가격 추이'
  const currentPrice = price?.current?.price ?? null
  const riskLevel = toRiskLevel(risk.riskGrade)
  const riskLabel = toRiskLabel(risk.riskGrade)

  return (
    <>
      <Link className="back-link" to={ROUTES.dashboard}>← 대시보드로 돌아가기</Link>
      <header className="detail-heading">
        <div>
          <h1>{item.itemName}</h1>
          <p>{item.unit} 기준 · 마지막 업데이트 {formatUpdatedAt(price?.lastUpdatedAt ?? risk.lastUpdatedAt)}</p>
        </div>
        <RiskBadge level={riskLevel}>{riskLabel} 단계 · {risk.finalScore}점</RiskBadge>
      </header>
      <section className="detail-grid">
        <article className="card">
          <h2>{priceTrendTitle}</h2>
          {!price || priceQuery.error || pricePoints.length < 2 ? (
            <EmptyState
              title="가격 추이 정보가 없어요."
              description="가격 데이터가 수집되면 최근 14일 추이를 확인할 수 있어요."
              icon="₩"
            />
          ) : (
            <>
              <div className="large-chart">
                <Sparkline values={pricePoints.map(({ price: value }) => value)} color="#de7b3b" />
              </div>
              <div className="chart-caption">
                <span>{formatPriceDate(pricePoints[0].date)} · {formatPrice(pricePoints[0].price)}</span>
                <span>현재 · {currentPrice === null ? '가격 정보 없음' : formatPrice(currentPrice)}</span>
              </div>
            </>
          )}
        </article>
        <article className="card">
          <h2>위험도 5개 요소</h2>
          {risk.factors.map((factor) => (
            <div className="factor" key={factor.name}>
              <div>
                <span>{factorLabels[factor.name] ?? factor.name}</span>
                <b>{factor.score === null ? '정보 없음' : `${factor.score} / ${factor.maxScore}`}</b>
              </div>
              <div className="factor__track">
                <i style={{ width: `${Math.min(100, Math.max(0, factor.displayRatio))}%` }} />
              </div>
            </div>
          ))}
        </article>
      </section>
      <section className="ai-banner">
        <span>✦</span>
        <div>
          <h2>AI 추천 행동</h2>
          <p>{recommendation?.recommendation ?? '아직 생성된 AI 추천이 없습니다.'}</p>
        </div>
      </section>
    </>
  )
}
