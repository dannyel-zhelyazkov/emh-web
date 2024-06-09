import React from 'react'

import { ConditionalComponent } from '@/components'
import { BaseButton } from '@/ui/buttons'
import { BaseHeading } from '@/ui/text'

export type BaseModalProps = {
  visible: boolean
  header: string
  content: string
  closeButtonText?: string
  actionButton?: React.ReactNode
  onClose: () => void
}

export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  header,
  content,
  actionButton,
  closeButtonText = 'Close',
  onClose,
}) => {
  return (
    <ConditionalComponent show={visible}>
      <div className="absolute left-0 top-0 flex h-full w-full select-none items-center justify-center bg-black-25">
        <div className="absolute z-20 flex h-1/3 w-1/3 select-none flex-col justify-between rounded bg-white p-3">
          <div>
            <BaseHeading type={3} text={header} className="mb-4 text-center" />
            <p className="text-center">{content}</p>
          </div>
          <div className="flex justify-end gap-x-4">
            <BaseButton
              label={closeButtonText}
              type="secondary"
              onClick={onClose}
            />
            {actionButton}
          </div>
        </div>
      </div>
    </ConditionalComponent>
  )
}
