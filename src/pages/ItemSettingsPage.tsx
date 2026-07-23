import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { ErrorMessage } from '../components/common/ErrorMessage'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { ROUTES } from '../constants/routes'
import {
  useAddWatchItemMutation,
  useDeleteWatchItemMutation,
  useItemsQuery,
  useWatchItemsQuery,
} from '../hooks/useItemSettingsQueries'
import { isAuthenticated } from '../utils/authToken'

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
  const loggedIn = isAuthenticated()
  const itemsQuery = useItemsQuery(keyword)
  const watchItemsQuery = useWatchItemsQuery(loggedIn)
  const addWatchItemMutation = useAddWatchItemMutation()
  const deleteWatchItemMutation = useDeleteWatchItemMutation()
  const selectedItemCodes = new Set(
    watchItemsQuery.data?.map((item) => item.itemCode) ?? [],
  )

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setKeyword(searchInput.trim())
  }

  const clearSearch = () => {
    setSearchInput('')
    setKeyword('')
  }

  const toggleWatchItem = (itemCode: string) => {
    if (!loggedIn) return

    if (selectedItemCodes.has(itemCode)) {
      deleteWatchItemMutation.mutate(itemCode)
      return
    }

    addWatchItemMutation.mutate(itemCode)
  }

  const changingItemCode =
    addWatchItemMutation.isPending
      ? addWatchItemMutation.variables
      : deleteWatchItemMutation.isPending
        ? deleteWatchItemMutation.variables
        : null
  const watchItemMutationError =
    addWatchItemMutation.error ?? deleteWatchItemMutation.error

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
                <button
                  type="button"
                  className={selectedItemCodes.has(item.itemCode)
                    ? 'pick pick--selected'
                    : 'pick'}
                  key={item.itemCode}
                  aria-pressed={selectedItemCodes.has(item.itemCode)}
                  disabled={!loggedIn || changingItemCode !== null}
                  onClick={() => toggleWatchItem(item.itemCode)}
                >
                  <span className="pick__check" aria-hidden="true">
                    {changingItemCode === item.itemCode
                      ? '…'
                      : selectedItemCodes.has(item.itemCode) ? '✓' : '+'}
                  </span>
                  <span className="pick__emoji" aria-hidden="true">
                    {ITEM_EMOJI[item.itemName] ?? '🌱'}
                  </span>
                  <strong>{item.itemName}</strong>
                  <small>{item.unit}</small>
                </button>
              ))}
            </div>
            {watchItemMutationError && (
              <p className="watch-items-error" role="alert">
                관심 품목을 변경하지 못했어요. 잠시 후 다시 시도해 주세요.
              </p>
            )}
          </div>
        )}

        <div className="selected-summary">
          <div className="section-heading">
            <h2>관심 품목</h2>
            {loggedIn && <b>{watchItemsQuery.data?.length ?? 0}개</b>}
          </div>
          {!loggedIn ? (
            <div className="watch-items-notice">
              <span>로그인하면 관심 품목과 알림을 설정할 수 있어요.</span>
              <Link className="button button--primary" to={ROUTES.auth}>로그인</Link>
            </div>
          ) : watchItemsQuery.isPending ? (
            <LoadingSpinner message="관심 품목을 불러오고 있어요." compact />
          ) : watchItemsQuery.isError ? (
            <ErrorMessage
              error={watchItemsQuery.error}
              title="관심 품목을 불러오지 못했어요."
              onRetry={() => watchItemsQuery.refetch()}
            />
          ) : watchItemsQuery.data.length === 0 ? (
            <p className="watch-items-empty">아직 등록한 관심 품목이 없어요.</p>
          ) : (
            <div className="watch-item-list">
              {watchItemsQuery.data.map((item) => (
                <div className="watch-item-row" key={item.itemCode}>
                  <span className="watch-item-row__name">
                    <i aria-hidden="true">{ITEM_EMOJI[item.itemName] ?? '🌱'}</i>
                    <strong>{item.itemName}</strong>
                  </span>
                  <span className={item.notificationEnabled
                    ? 'watch-item-row__status watch-item-row__status--on'
                    : 'watch-item-row__status'}>
                    알림 {item.notificationEnabled ? '켜짐' : '꺼짐'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
