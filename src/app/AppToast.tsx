import React, { createContext, useState } from 'react'

import { Toast } from '@/ui'
import { ToastContextProps, ToastFields } from '@/ui/@types'

type AppToastProps = {
  children: React.ReactNode
}

export const ToastContext = createContext<ToastContextProps>({
  toast: null,
  show: () => {},
})

export const AppToast: React.FC<AppToastProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastFields | null>(null)

  return (
    <ToastContext.Provider value={{ toast, show: setToast }}>
      <div className="relative h-full w-full">
        <Toast />
        {children}
      </div>
    </ToastContext.Provider>
  )
}
