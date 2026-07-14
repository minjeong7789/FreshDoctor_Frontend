import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { AlertsPage } from './pages/AlertsPage'
import { DashboardPage } from './pages/DashboardPage'
import { ItemDetailPage } from './pages/ItemDetailPage'
import { ItemSettingsPage } from './pages/ItemSettingsPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="items/:itemId" element={<ItemDetailPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="settings/items" element={<ItemSettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
