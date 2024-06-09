import { ToastFields } from '@/ui'

export const handleAxiosError = (
  error: string,
  show: (toast: ToastFields | null) => void,
) =>
  show({
    type: 'error',
    title: 'Something went wrong!',
    reason: error,
  })
