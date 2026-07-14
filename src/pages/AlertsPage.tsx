import { useState } from 'react'

const alerts = [
  ['severe', '배추 위험도 경계 단계로 상승', '산지 출하량 감소로 위험 점수가 62점에서 78점으로 상승했어요.', '10분 전'],
  ['caution', '대파 가격 변동성 확대', '최근 3일간 가격이 자주 오르내리고 있어요. 발주 전 확인해 주세요.', '2시간 전'],
  ['safe', '사과 위험도 안정 단계로 하락', '공급이 안정되며 위험 점수가 낮아졌어요.', '어제'],
  ['watch', '양파 관심 단계 진입', '평년 대비 가격 괴리가 조금 커지고 있어요.', '2일 전'],
] as const

export function AlertsPage() {
  const [settings, setSettings] = useState([true, true, false])
  const labels = ['경계 단계 이상 알림', '심각 단계 즉시 알림', '매일 오전 8시 요약 알림']
  return <><header className="page-heading"><div><h1>알림함</h1><p>위험도가 바뀌었거나 확인이 필요한 소식이에요.</p></div></header><div className="section-heading"><h2>최근 알림</h2></div><section className="notification-list">{alerts.map(([level, title, body, time]) => <article className="notification" key={title}><i className={`notification__dot notification__dot--${level}`} /><div><h3>{title}</h3><p>{body}</p></div><time>{time}</time></article>)}</section><section className="card settings-card"><h2>알림 설정</h2>{labels.map((label, index) => <label className="toggle-row" key={label}><span><strong>{label}</strong><small>중요한 가격 위험 변화를 놓치지 않도록 알려드려요.</small></span><span className="switch"><input className="switch__input" type="checkbox" checked={settings[index]} onChange={() => setSettings((current) => current.map((value, i) => i === index ? !value : value))} aria-label={label} /><span className="switch__track" aria-hidden="true"><span className="switch__thumb" /></span></span></label>)}</section></>
}
