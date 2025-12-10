import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AdminLayout } from '@/components/layout'
import {
  Dashboard,
  GroupMappings,
  ItemMappings,
  Prompts,
  PromptEdit,
  Users,
  Results,
  ResultDetail,
  Settings,
  Login,
} from '@/pages'
import { useAuthStore, mockUser } from '@/stores/authStore'
import { useEffect } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

// Protected Route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  const { login, isAuthenticated } = useAuthStore()

  // Auto-login for development
  useEffect(() => {
    if (!isAuthenticated) {
      login(mockUser)
    }
  }, [isAuthenticated, login])

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="mappings">
          <Route index element={<Navigate to="/mappings/groups" replace />} />
          <Route path="groups" element={<GroupMappings />} />
          <Route path="items" element={<ItemMappings />} />
        </Route>
        <Route path="prompts">
          <Route index element={<Prompts />} />
          <Route path=":id" element={<PromptEdit />} />
        </Route>
        <Route path="users" element={<Users />} />
        <Route path="results">
          <Route index element={<Results />} />
          <Route path=":id" element={<ResultDetail />} />
        </Route>
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
