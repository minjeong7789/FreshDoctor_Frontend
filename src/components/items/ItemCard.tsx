import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import type { ProduceItem } from '../../types/item'
import { RiskBadge } from '../common/RiskBadge'
import { Sparkline } from './Sparkline'

const colors = { safe: '#4c9a6a', watch: '#96a934', caution: '#e0a62e', alert: '#de7b3b', severe: '#c0392b' }

export function ItemCard({ item }: { item: ProduceItem }) {
  return (
    <Link className="item-card" to={ROUTES.itemDetail(item.id)}>
      <div className="item-card__top">
        <div><h3>{item.name}</h3><p>{item.unit} · {item.price.toLocaleString()}원</p></div>
        <RiskBadge level={item.risk}>{item.riskLabel}</RiskBadge>
      </div>
      <Sparkline values={item.chart} color={colors[item.risk]} />
      <strong className={`trend trend--${item.trendDirection}`}>{item.trendDirection === 'up' ? '↑' : item.trendDirection === 'down' ? '↓' : '―'} {item.trend}</strong>
      <span className="item-card__cta">자세히 보기 →</span>
    </Link>
  )
}
