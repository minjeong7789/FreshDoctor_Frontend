import { NavLink, Outlet } from 'react-router-dom'
import { Logo } from '../components/common/Logo'
import { ROUTES } from '../constants/routes'

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="topnav">
        <div className="topnav__inner">
          <NavLink to={ROUTES.dashboard} className="brand-link"><Logo /></NavLink>
          <nav className="nav-links" aria-label="주요 메뉴">
            <NavLink to={ROUTES.dashboard} end>대시보드</NavLink>
            <NavLink to={ROUTES.itemDetail('cabbage')}>품목 상세</NavLink>
            <NavLink to={ROUTES.itemSettings}>품목 설정</NavLink>
            <NavLink to={ROUTES.alerts}>알림함</NavLink>
          </nav>
          <div className="user"><span className="user__avatar">김</span><span><strong>김사장님</strong><small>점주</small></span></div>
        </div>
      </header>
      <div className="status-strip">
        <span>시장 위험 현황</span><b className="status status--safe">● 안정 2</b><b className="status status--watch">● 관심 1</b><b className="status status--caution">● 주의 1</b><b className="status status--alert">● 경계 1</b>
      </div>
      <main><Outlet /></main>
    </div>
  )
}
