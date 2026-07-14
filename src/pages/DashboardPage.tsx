import { ItemCard } from '../components/items/ItemCard'
import { RiskGauge } from '../components/dashboard/RiskGauge'
import { mockItems } from '../data/mockItems'

export function DashboardPage() {
  return (
    <>
      <header className="page-heading"><div><h1>안녕하세요, 김사장님</h1><p>오늘의 식자재 가격 위험을 확인하고 안전하게 발주하세요.</p></div><button className="icon-button" aria-label="새 알림">🔔<i /></button></header>
      <section className="hero-panel">
        <RiskGauge score={62} />
        <div><h2>오늘은 배추·대파 발주를 조심하세요</h2><p>가격 변동성과 기상 영향이 평소보다 높습니다. 위험 품목의 발주량을 확인해 주세요.</p><div className="chip-row"><span className="chip chip--safe">안정 2개</span><span className="chip chip--watch">관심 1개</span><span className="chip chip--caution">주의 1개</span><span className="chip chip--alert">경계 1개</span></div></div>
      </section>
      <div className="section-heading"><h2>관심 품목 위험도</h2><span>최근 업데이트 10분 전</span></div>
      <section className="item-grid">{mockItems.map((item) => <ItemCard item={item} key={item.id} />)}</section>
      <section className="ai-banner"><span>✦</span><div><h2>오늘의 AI 추천</h2><p>배추는 이번 주 발주량을 30% 줄이고, 안정 단계인 감자·사과 비중을 늘려보세요.</p></div></section>
    </>
  )
}
