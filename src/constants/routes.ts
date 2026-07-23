export const ROUTES = {
  dashboard: '/',
  auth: '/auth',
  alerts: '/alerts',
  itemSettings: '/settings/items',
  itemDetail: (itemId: string) => `/items/${itemId}`,
} as const
