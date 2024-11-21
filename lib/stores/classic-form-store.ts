import { create } from 'zustand'

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export interface Header {
  key: string
  value: string
}

interface ClassicFormState {
  method: Method
  url: string
  headers: Header[]
  body: string
  resetForm: () => void
  setMethod: (method: Method) => void
  setUrl: (url: string) => void
  setHeaders: (headers: Header[]) => void
  setBody: (body: string) => void
}

export const useClassicFormStore = create<ClassicFormState>((set) => ({
  method: "GET",
  url: "",
  headers: [{ key: "Content-Type", value: "application/json" }],
  body: "",
  resetForm: () => set({
    method: "GET",
    url: "",
    headers: [{ key: "Content-Type", value: "application/json" }],
    body: ""
  }),
  setMethod: (method) => set({ method }),
  setUrl: (url) => set({ url }),
  setHeaders: (headers) => set({ headers }),
  setBody: (body) => set({ body })
})) 