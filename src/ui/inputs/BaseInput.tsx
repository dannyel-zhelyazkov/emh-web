import React, { HTMLProps, useState } from 'react'

import { ConditionalComponent } from '@/components'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

type BaseInputProps = {
  label: string
  suffix?: string
  errors?: string | Array<string>
  required?: boolean
  rightIcon?: IconProp
  leftIcon?: IconProp
  light?: boolean
} & HTMLProps<HTMLInputElement>

export const BaseInput: React.FC<BaseInputProps> = ({
  label,
  name,
  suffix,
  value,
  errors,
  required,
  leftIcon,
  rightIcon,
  className,
  light,
  type,
  disabled,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const hasErrors = Array.isArray(errors) ? errors.length : errors

  const renderErrors = Array.isArray(errors) ? (
    errors.map((error) => <p className="text-sm text-red-400">{error}</p>)
  ) : (
    <p className="text-sm text-red-400">{errors}</p>
  )

  const borderStyle = light ? 'border-white border' : 'border-main border'
  const borderHover = light ? 'hover:border-blue' : 'hover:border-secondary'
  const textStyle = light ? 'text-white' : 'text-black'

  const wrapperClass = classNames(
    `flex w-full items-center rounded-half p-3 ${borderStyle} ${borderHover}`,
    {
      'border-black border opacity-30': disabled,
    },
  )

  const passwordIconClass = classNames(`mx-3 text-secondary ${textStyle}`, {
    'cursor-pointer': !disabled,
  })

  const passwordRightIcon = () =>
    type === 'password' ? (
      <FontAwesomeIcon
        icon={showPassword ? faEye : faEyeSlash}
        className={passwordIconClass}
        onClick={() => setShowPassword((show) => !show)}
      />
    ) : (
      <FontAwesomeIcon
        icon={rightIcon as IconProp}
        className={`mx-3 text-secondary ${textStyle}`}
      />
    )

  return (
    <div className={`${className}`}>
      <div className={wrapperClass}>
        <ConditionalComponent show={!!leftIcon}>
          <FontAwesomeIcon
            icon={leftIcon as IconProp}
            className={`mr-3 text-secondary ${textStyle}`}
          />
        </ConditionalComponent>
        <div className="flex w-full justify-between">
          <input
            type={type === 'password' && !showPassword ? 'password' : 'text'}
            id={name}
            name={name}
            value={!disabled && value ? value : ''}
            placeholder={`${label} ${required ? '*' : ''}`}
            className={`w-full bg-transparent outline-0 ${textStyle}`}
            onChange={onChange}
            disabled={disabled}
          />
          <ConditionalComponent show={!!suffix}>
            <span className={`${textStyle} opacity-50`}>{suffix}</span>
          </ConditionalComponent>
        </div>
        <ConditionalComponent show={!!rightIcon || type === 'password'}>
          {passwordRightIcon()}
        </ConditionalComponent>
      </div>
      <ConditionalComponent show={!!hasErrors}>
        <div className="mt-2 flex flex-col">{renderErrors}</div>
      </ConditionalComponent>
    </div>
  )
}
