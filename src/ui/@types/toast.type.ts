export type ToastContextProps = {
  toast: ToastFields | null
  show: (toast: ToastFields | null) => void
}

export type ToastFields = {
  type: 'error' | 'warning' | 'success'
  title: string
  reason: string
}
