import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'hospital_admin' | 'doctor' | 'staff'
  hospitalCode: string
  hospitalName: string
  avatarUrl?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'hospital-admin-auth',
    }
  )
)

// Mock user for development
export const mockUser: User = {
  id: '1',
  name: '김관리',
  email: 'admin@kdkh.or.kr',
  role: 'hospital_admin',
  hospitalCode: 'kdkh',
  hospitalName: '강동경희대학교병원',
}
