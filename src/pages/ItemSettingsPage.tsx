import { type FormEvent, useState } from 'react'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { useItemsQuery } from '../hooks/useItemSettingsQueries'

const ITEM_EMOJI: Record<string, string> = {
  감자: '🥔',
  고구마: '🍠',
  당근: '🥕',
  대파: '🌿',
  마늘: '🧄',
  무: '🥕',
  배: '🍐',
  배추: '🥬',
  사과: '🍎',
  생강: '🫚',
  시금치: '🍃',
  양파: '🧅',
  포도: '🍇',
  감귤: '🍊',
  딸기: '🍓',
}

export function ItemSettingsPage() {
  const [searchInput, setSearchInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const itemsQuery = useItemsQuery(keyword)

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setKeyword(searchInput.trim())
  }

  const clearSearch = () => {
    setSearchInput('')
    setKeyword('')
  }

  return (
    <>
      <header className="page-heading">
        <div>
          <h1>품목 설정</h1>
          <p>관심 품목을 선택하면 위험 점수, 가격 추세, AI 추천을 받아볼 수 있어요.</p>
        </div>
      </header>

      <section className="card">
        <form className="search-row" role="search" onSubmit={handleSearch}>
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="품목 검색 (예: 배추, 양파...)"
            aria-label="품목명 검색"
          />
          <button className="button button--primary" type="submit">검색</button>
        </form>

        {itemsQuery.isPending ? (
          <LoadingSpinner message="품목 목록을 불러오고 있어요." compact />
        ) : itemsQuery.isError ? (
          <ErrorMessage
            error={itemsQuery.error}
            title="품목 목록을 불러오지 못했어요."
            onRetry={() => itemsQuery.refetch()}
          />
        ) : itemsQuery.data.length === 0 ? (
          <EmptyState
            title="검색 결과가 없어요."
            description={`'${keyword}'에 해당하는 품목을 찾지 못했어요.`}
            icon="⌕"
            action={(
              <button className="button button--ghost" type="button" onClick={clearSearch}>
                전체 품목 보기
              </button>
            )}
          />
        ) : (
          <div className="category">
            <div className="section-heading">
              <h2>{keyword ? `'${keyword}' 검색 결과` : '전체 품목'}</h2>
              <b>{itemsQuery.data.length}개</b>
            </div>
            <div className="pick-grid">
              {itemsQuery.data.map((item) => (
                <article className="pick pick--readonly" key={item.itemCode}>
                  <span className="pick__emoji" aria-hidden="true">
                    {ITEM_EMOJI[item.itemName] ?? '🌱'}
                  </span>
                  <strong>{item.itemName}</strong>
                  <small>{item.unit}</small>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="selected-summary selected-summary--pending">
          <strong>관심 품목 설정은 로그인 기능 검증 후 연결할 예정입니다.</strong>
          <span>현재는 전체 품목 조회와 검색 기능을 사용할 수 있어요.</span>
        </div>
      </section>
    </>
  )
}
