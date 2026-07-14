import { useState } from 'react'

const categories = [
  { title: '채소류', items: [{ name: '배추', emoji: '🥬' }, { name: '양파', emoji: '🧅' }, { name: '무', emoji: '🥕' }, { name: '대파', emoji: '🌿' }, { name: '시금치', emoji: '🍃' }] },
  { title: '과일류', items: [{ name: '사과', emoji: '🍎' }, { name: '배', emoji: '🍐' }, { name: '감귤', emoji: '🍊' }, { name: '포도', emoji: '🍇' }, { name: '딸기', emoji: '🍓' }] },
  { title: '근채류', items: [{ name: '감자', emoji: '🥔' }, { name: '고구마', emoji: '🍠' }, { name: '당근', emoji: '🥕' }, { name: '마늘', emoji: '🧄' }, { name: '생강', emoji: '🫚' }] },
]

const itemEmoji = Object.fromEntries(
  categories.flatMap(({ items }) => items.map(({ name, emoji }) => [name, emoji])),
)

export function ItemSettingsPage() {
  const [selected, setSelected] = useState(['배추', '양파', '무', '사과', '감자'])
  const toggle = (item: string) => setSelected((current) => current.includes(item) ? current.filter((value) => value !== item) : current.length < 15 ? [...current, item] : current)
  return <><header className="page-heading"><div><h1>품목 설정</h1><p>관심 품목을 선택하면 위험 점수, 가격 추세, AI 추천을 받아볼 수 있어요.</p></div></header><section className="card"><div className="search-row"><input placeholder="품목 검색 (예: 배추, 양파...)" /><button className="button button--primary">검색</button></div>{categories.map(({ title, items }) => <div className="category" key={title}><h2>{title}</h2><div className="pick-grid">{items.map(({ name, emoji }) => <button className={selected.includes(name) ? 'pick pick--selected' : 'pick'} onClick={() => toggle(name)} key={name}><span className="pick__check">{selected.includes(name) ? '✓' : '+'}</span><span className="pick__emoji" aria-hidden="true">{emoji}</span><span>{name}</span></button>)}</div></div>)}<div className="selected-summary"><div className="section-heading"><h2>선택한 품목</h2><b>{selected.length} / 최대 15개</b></div><div className="chip-row">{selected.map((item) => <button className="selected-chip" onClick={() => toggle(item)} key={item}><span aria-hidden="true">{itemEmoji[item]}</span> {item} ×</button>)}</div></div></section></>
}
