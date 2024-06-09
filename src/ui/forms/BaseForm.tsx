import React from 'react'

type BaseFormProps = {
  className?: string
  children: React.ReactNode
}

export const BaseForm: React.FC<BaseFormProps> = ({ children, className }) => {
  return <div className={`${className} h-fit p-8`}>{children}</div>
}
