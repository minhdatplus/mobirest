import { toast } from 'sonner'

interface ToastOptions {
  success?: string
  error?: string
  loading?: string
}

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 2000,
      position: 'top-right'
    })
  },

  error: (message: string) => {
    toast.error(message, {
      duration: 3000,
      position: 'top-right'
    })
  },

  promise: async <T>(
    promise: Promise<T>,
    messages: ToastOptions
  ) => {
    return toast.promise(promise, {
      loading: messages.loading || 'Processing...',
      success: messages.success || 'Operation completed successfully',
      error: (err) => messages.error || err.message || 'An error occurred'
    })
  },

  dismiss: () => {
    toast.dismiss()
  }
} 