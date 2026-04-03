import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUiStore = create(
  persist(
    (set) => ({
      darkMode: true,
      sidebarOpen: true,
      toasts: [],

      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      addToast: (toast) =>
        set((s) => ({
          toasts: [...s.toasts, { ...toast, id: Date.now() }],
        })),
      removeToast: (id) =>
        set((s) => ({
          toasts: s.toasts.filter((t) => t.id !== id),
        })),
    }),
    {
      name: 'zorvyn-ui',
      partialize: (state) => ({
        darkMode: state.darkMode,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
)