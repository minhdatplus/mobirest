import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AIProviderId } from '@/lib/constants/ai-providers'

interface AIProviderStore {
  defaultProvider: AIProviderId
  isHydrated: boolean
  setDefaultProvider: (provider: AIProviderId) => void
  setHydrated: () => void
}

export const useAIProviderStore = create<AIProviderStore>()(
  persist(
    (set) => ({
      defaultProvider: 'openai',
      isHydrated: false,
      setDefaultProvider: (provider) => set({ defaultProvider: provider }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'ai-provider-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    }
  )
) 