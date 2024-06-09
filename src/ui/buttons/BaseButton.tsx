import React, { HTMLAttributes } from 'react'

import { ConditionalComponent } from '@/components'
import { BaseSpinner } from '@/ui'
import { ButtonType } from '@/ui/@types'
import classNames from 'classnames'

type BaseButtonProps = {
  label?: string
  loading?: boolean
  type?: ButtonType
  activated?: boolean
  submit?: boolean
  disabled?: boolean
} & Omit<HTMLAttributes<HTMLButtonElement>, 'type'>

export const BaseButton: React.FC<BaseButtonProps> = ({
  label,
  loading,
  className,
  submit,
  type = 'main',
  disabled,
  ...rest
}) => {
  const buttonClass = classNames(
    'relative w-full rounded-half  h-12 border-2 text-black disabled:border-0 disabled:relative disabled:opacity-25 disabled:pointer-events-none',
    {
      'bg-main-25 active:bg-main hover:bg-main border-main': type === 'main',
      'bg-black active:bg-black text-white hover:bg-black-25 border-black':
        type === 'secondary',
      'bg-success-25 active:bg-success hover:bg-success border-success':
        type === 'success',
      'bg-warning-25 active:bg-warning hover:bg-warning border-warning':
        type === 'warning',
      'bg-error-25 active:bg-error hover:bg-error  disabled:hover border-error':
        type === 'error',
    },
  )

  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={`${className} ${buttonClass}`}
      disabled={disabled || loading}
      {...rest}
    >
      {label}
      <ConditionalComponent show={loading}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <BaseSpinner />
        </div>
      </ConditionalComponent>
    </button>
  )
}
