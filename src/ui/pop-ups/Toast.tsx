import React, { useContext, useEffect, useRef, useState } from 'react'

import { ToastContext } from '@/app'
import { ConditionalComponent } from '@/components'
import { ProgressBar } from '@/ui'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Toast: React.FC = () => {
  const { toast, show } = useContext(ToastContext)

  const [pause, setPause] = useState<boolean>(false)

  const toastRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!toastRef || !toastRef.current || !toast) return

    const el = toastRef.current

    const pauseToast = () => setPause(true)
    const startToast = () => setPause(false)

    el.addEventListener('mouseenter', pauseToast)
    el.addEventListener('mouseleave', startToast)

    return () => {
      el.removeEventListener('mouseenter', pauseToast)
      el.removeEventListener('mouseleave', startToast)
    }
  }, [toastRef, toast])

  const bgColor = () => {
    switch (toast?.type) {
      case 'success':
        return 'bg-success'
      case 'warning':
        return 'bg-warning'
      case 'error':
        return 'bg-error'
      default:
    }
  }

  const handleCloseToast = () => {
    setPause(false)
    show(null)
  }

  return (
    <ConditionalComponent show={!!toast}>
      <div ref={toastRef} className={`${bgColor()} toast-box`}>
        <div>
          <div className="flex items-start justify-between">
            <h4 className="text-lg font-bold text-black">{toast?.title}</h4>
            <FontAwesomeIcon
              icon={faXmark}
              className="h-6 cursor-pointer text-black"
              onClick={handleCloseToast}
            />
          </div>
          <p className="mb-3">{toast?.reason}</p>
        </div>

        <ProgressBar
          color={toast?.type as string}
          pause={pause}
          onFinish={handleCloseToast}
        />
      </div>
    </ConditionalComponent>
  )
}
