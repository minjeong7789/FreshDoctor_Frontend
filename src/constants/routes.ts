export const ROUTES = {
  dashboard: '/',
  alerts: '/alerts',
  itemSettings: '/settings/items',
  itemDetail: (itemId: string) => `/items/${itemId}`,
} as const
