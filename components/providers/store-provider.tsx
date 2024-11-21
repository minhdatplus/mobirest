'use client'

import { useEffect } from 'react'
import { useAIProviderStore } from '@/lib/stores/ai-provider-store'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { setHydrated } = useAIProviderStore()

  useEffect(() => {
    useAIProviderStore.persist.rehydrate()
  }, [])

  return children
} 