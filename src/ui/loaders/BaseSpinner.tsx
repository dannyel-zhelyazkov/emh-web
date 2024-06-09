import React from 'react'

import '@/styles/BaseSpinner.css'
import classNames from 'classnames'

type BaseSpinnerProps = {
  size?: number
}

export const BaseSpinner: React.FC<BaseSpinnerProps> = ({ size = 30 }) => {
  const spinnerClass = classNames('base-spinner  w-[30px] h-[30px]', {
    [`w-[${size}px] h-[${size}px]`]: size,
  })

  return <div className={spinnerClass} />
}
