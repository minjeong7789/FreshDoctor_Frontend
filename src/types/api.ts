/** 서버가 사용하는 ISO-8601 날짜 문자열 (예: 2026-07-15) */
export type ISODateString = string

/** 서버가 사용하는 ISO-8601 날짜·시간 문자열 */
export type ISODateTimeString = string

/** 백엔드 GlobalExceptionHandler의 공통 오류 응답 */
export interface ApiErrorResponse {
  code: string
  message: string
}

export type ApiErrorCode =
  | 'ITEM_NOT_FOUND'
  | 'INVALID_PRICE_DATE_RANGE'
  | 'INVALID_PRICE_PERIOD'
  | 'RISK_SCORE_NOT_FOUND'
  | 'RECOMMENDATION_NOT_FOUND'
  | 'INVALID_DATE_FORMAT'
  | 'INVALID_REQUEST_PARAMETER'

/** FreshDoctor API는 별도의 data 래퍼 없이 DTO를 직접 반환합니다. */
export type ApiResponse<T> = T
