import React from 'react'

import { ConditionalComponent } from '@/components'
import { BaseSpinner } from '@/ui'

type BaseComponentLoaderProps = {
  isLoading: boolean
}

export const BaseSkeletonSpinner: React.FC<BaseComponentLoaderProps> = ({
  isLoading,
}) => {
  return (
    <ConditionalComponent show={isLoading}>
      <div className="absolute left-0 z-10 flex h-full w-full items-center justify-center bg-black-25">
        <BaseSpinner size={60} />
      </div>
    </ConditionalComponent>
  )
}
