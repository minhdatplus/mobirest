import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AIProviderId } from '@/lib/constants/ai-providers'

type APIKeys = Record<`${AIProviderId}ApiKey`, string>

interface APIKeysStore {
  keys: APIKeys
  setKey: (provider: AIProviderId, key: string) => void
  clearKeys: () => void
  getKey: (provider: AIProviderId) => string
}

export const useAPIKeysStore = create<APIKeysStore>()(
  persist(
    (set, get) => ({
      keys: {
        openaiApiKey: '',
        geminiApiKey: '',
        anthropicApiKey: '',
        groqApiKey: ''
      },
      setKey: (provider, key) => 
        set(state => ({
          keys: {
            ...state.keys,
            [`${provider}ApiKey`]: key
          }
        })),
      getKey: (provider) => get().keys[`${provider}ApiKey`],
      clearKeys: () => set({ 
        keys: {
          openaiApiKey: '',
          geminiApiKey: '',
          anthropicApiKey: '',
          groqApiKey: ''
        }
      })
    }),
    {
      name: 'api-keys-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ keys: state.keys })
    }
  )
) 