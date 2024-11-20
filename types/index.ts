export interface HistoryItem {
  id: string
  timestamp: number
  method: string
  url: string
  status: number
}

export interface Collection {
  id: string
  name: string
  method: string
  url: string
  headers: Array<{ key: string; value: string }>
  body?: string
}

export interface Settings {
  autoFormat: boolean
  saveHistory: boolean
  maxHistoryItems: number
} 