import { toast } from 'sonner'

interface ToastOptions {
  title: string
  loading?: string
  success?: string
  error?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 2000,
      position: 'top-right'
    })
  },

  error: (message: string | ToastOptions) => {
    toast.error(typeof message === 'string' ? message : message.title, {
      action: typeof message === 'string' ? undefined : message.action
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