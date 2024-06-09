import React from 'react'

import { BaseHeading } from '@/ui/text'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type FormPageLayoutProps = {
  title: string
  icon: IconProp
  children: React.ReactElement
}

export const FormPageLayout: React.FC<FormPageLayoutProps> = ({
  children,
  icon,
  title,
}) => {
  return (
    <div className="h-full w-full">
      <div className="mb-4 flex w-full items-center justify-center gap-6">
        <BaseHeading type={2} text={title} />
        <FontAwesomeIcon icon={icon} size="2x" className="text-main" />
      </div>
      <div className="mb-4 border border-b-black" />
      <div className="relative flex w-full justify-center">{children}</div>
    </div>
  )
}
