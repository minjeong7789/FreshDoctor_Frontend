import { Link, useParams } from 'react-router-dom'
import { RiskBadge } from '../components/common/RiskBadge'
import { Sparkline } from '../components/items/Sparkline'
import { ROUTES } from '../constants/routes'
import { mockItems } from '../data/mockItems'

const factors = [['가격 급등률', 88], ['가격 변동성', 70], ['평년 대비 괴리', 64], ['기상 위험', 82], ['수급 이슈', 55]] as const

export function ItemDetailPage() {
  const { itemId } = useParams()
  const item = mockItems.find(({ id }) => id === itemId) ?? mockItems[0]
  return (
    <>
      <Link className="back-link" to={ROUTES.dashboard}>← 대시보드로 돌아가기</Link>
      <header className="detail-heading"><div><h1>{item.name}</h1><p>{item.unit} 도매 기준 · 마지막 업데이트 10분 전</p></div><RiskBadge level={item.risk}>{item.riskLabel} 단계 · 78점</RiskBadge></header>
      <section className="detail-grid">
        <article className="card"><h2>최근 14일 가격 추이</h2><div className="large-chart"><Sparkline values={[12, 13, 16, 18, 22, 21, 28, 26, 31, 35, 37, 42, 46, 49]} color="#de7b3b" /></div><div className="chart-caption"><span>14일 전 · 15,200원</span><span>오늘 · {item.price.toLocaleString()}원</span></div></article>
        <article className="card"><h2>위험도 5개 요소</h2>{factors.map(([name, score]) => <div className="factor" key={name}><div><span>{name}</span><b>{score} / 100</b></div><div className="factor__track"><i style={{ width: `${score}%` }} /></div></div>)}</article>
      </section>
      <section className="ai-banner"><span>✦</span><div><h2>AI 추천 행동</h2><p>이번 주 {item.name} 발주량을 평소보다 30% 줄이고 대체 품목의 비중을 늘리는 것을 추천합니다.</p></div></section>
      <div className="action-row"><button className="button button--primary">발주량 조정하기</button><button className="button button--ghost">이 품목 알림 켜기</button></div>
    </>
  )
}
