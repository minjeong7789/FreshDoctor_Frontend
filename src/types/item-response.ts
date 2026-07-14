export interface ItemResponse {
  itemCode: string
  itemName: string
  kamisCategoryCode: string | null
  kamisItemCode: string | null
  kamisKindCode: string | null
  unit: string
  grade: string | null
  defaultMarketType: string | null
  defaultRankCode: string | null
  defaultUnit: string | null
  weatherRegion: string | null
  weatherNx: number | null
  weatherNy: number | null
  newsKeyword: string | null
}
