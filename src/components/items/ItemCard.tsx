import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import type { ProduceItem } from '../../types/item'
import { RiskBadge } from '../common/RiskBadge'
import { Sparkline } from './Sparkline'

const colors = { safe: '#4c9a6a', watch: '#96a934', caution: '#e0a62e', alert: '#de7b3b', severe: '#c0392b' }

export function ItemCard({ item }: { item: ProduceItem }) {
  const hasChart = item.chart && item.chart.length >= 2

  return (
    <Link className="item-card" to={ROUTES.itemDetail(item.id)}>
      <div className="item-card__top">
        <div>
          <h3>{item.name}</h3>
          <p>{item.price === null ? `${item.unit} · 가격 정보 없음` : `${item.unit} · ${item.price.toLocaleString()}원`}</p>
        </div>
        <RiskBadge level={item.risk}>{item.riskLabel}</RiskBadge>
      </div>
      {hasChart ? (
        <Sparkline values={item.chart!} color={colors[item.risk]} />
      ) : (
        <div className="sparkline-placeholder">7일 변동률 기준</div>
      )}
      <strong className={`trend trend--${item.trendDirection}`}>
        {item.trendDirection === 'up' ? '↑' : item.trendDirection === 'down' ? '↓' : '―'} {item.trend}
      </strong>
      <span className="item-card__cta">자세히 보기 →</span>
    </Link>
  )
}
