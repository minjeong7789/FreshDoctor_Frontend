interface DateRangeParams {
  startDate?: string
  endDate?: string
}

export const queryKeys = {
  dashboard: {
    all: ['dashboard'] as const,
    overview: () => [...queryKeys.dashboard.all, 'overview'] as const,
    item: (itemCode: string) =>
      [...queryKeys.dashboard.all, 'item', itemCode] as const,
  },
  items: {
    all: ['items'] as const,
    list: (keyword = '') =>
      [...queryKeys.items.all, 'list', { keyword }] as const,
    detail: (itemCode: string) =>
      [...queryKeys.items.all, 'detail', itemCode] as const,
  },
  watchItems: {
    all: ['watch-items'] as const,
    list: () => [...queryKeys.watchItems.all, 'list'] as const,
  },
  prices: {
    all: ['prices'] as const,
    history: (itemCode: string, params: DateRangeParams = {}) =>
      [...queryKeys.prices.all, 'history', itemCode, params] as const,
    trend: (itemCode: string, days = 30) =>
      [...queryKeys.prices.all, 'trend', itemCode, { days }] as const,
  },
  risks: {
    all: ['risks'] as const,
    detail: (itemCode: string) =>
      [...queryKeys.risks.all, 'detail', itemCode] as const,
    history: (itemCode: string, params: DateRangeParams = {}) =>
      [...queryKeys.risks.all, 'history', itemCode, params] as const,
  },
  recommendations: {
    all: ['recommendations'] as const,
    latest: (itemCode: string) =>
      [...queryKeys.recommendations.all, 'latest', itemCode] as const,
  },
} as const
