import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { queryKeys } from '../api/queryKeys'
import { Logo } from '../components/common/Logo'
import { ROUTES } from '../constants/routes'
import { useCurrentUserQuery } from '../hooks/useCurrentUserQuery'
import { useDashboardQuery } from '../hooks/useDashboardQuery'
import { clearAuthToken, isAuthenticated } from '../utils/authToken'
import { formatNickname, getNicknameInitial } from '../utils/user'

const DEFAULT_ITEM_CODE = '1001'
const LAST_VIEWED_ITEM_KEY = 'lastViewedItemCode'

function getLastViewedItemCode() {
  const savedItemCode = localStorage.getItem(LAST_VIEWED_ITEM_KEY)

  return savedItemCode && /^\d+$/.test(savedItemCode)
    ? savedItemCode
    : DEFAULT_ITEM_CODE
}

export function AppLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [loggedIn, setLoggedIn] = useState(isAuthenticated)
  const { data: dashboard } = useDashboardQuery()
  const { data: currentUser } = useCurrentUserQuery()
  const currentItemCode = pathname.match(/^\/items\/(\d+)$/)?.[1]
  const itemDetailPath = ROUTES.itemDetail(
    currentItemCode ?? getLastViewedItemCode(),
  )

  useEffect(() => {
    if (currentItemCode) {
      localStorage.setItem(LAST_VIEWED_ITEM_KEY, currentItemCode)
    }
  }, [currentItemCode])

  const handleLogout = () => {
    clearAuthToken()
    queryClient.removeQueries({ queryKey: queryKeys.auth.all })
    setLoggedIn(false)
    navigate(ROUTES.dashboard)
  }

  return (
    <div className="app-shell">
      <header className="topnav">
        <div className="topnav__inner">
          <NavLink to={ROUTES.dashboard} className="brand-link"><Logo /></NavLink>
          <nav className="nav-links" aria-label="주요 메뉴">
            <NavLink to={ROUTES.dashboard} end>대시보드</NavLink>
            <NavLink to={itemDetailPath}>품목 상세</NavLink>
            <NavLink to={ROUTES.itemSettings}>품목 설정</NavLink>
            <NavLink to={ROUTES.alerts}>알림함</NavLink>
          </nav>
          {loggedIn ? (
            <div className="user">
              <span className="user__avatar">{getNicknameInitial(currentUser?.nickname)}</span>
              <span className="user__meta"><strong>{formatNickname(currentUser?.nickname)}</strong><small>점주</small></span>
              <button type="button" className="user__action" onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            <NavLink className="user-login" to={ROUTES.auth}>로그인 · 회원가입</NavLink>
          )}
        </div>
      </header>
      <div className="status-strip">
        <span>시장 위험 현황</span>
        <b className="status status--safe">● 안정 {dashboard?.gradeCounts.safe ?? '-'} </b>
        <b className="status status--watch">● 관심 {dashboard?.gradeCounts.interest ?? '-'}</b>
        <b className="status status--caution">● 주의 {dashboard?.gradeCounts.caution ?? '-'}</b>
        <b className="status status--alert">● 경계 {dashboard?.gradeCounts.alert ?? '-'}</b>
        <b className="status status--severe">● 심각 {dashboard?.gradeCounts.critical ?? '-'}</b>
      </div>
      <main><Outlet /></main>
    </div>
  )
}
