import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useRoleStore = create(
  persist(
    (set) => ({
      role: 'admin',
      setRole: (role) => set({ role }),
    }),
    { name: 'zorvyn-role' }
  )
)
