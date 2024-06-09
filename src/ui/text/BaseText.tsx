import React from 'react'

type BaseTextProps = {
  type: 'body' | 'lead-p' | 'small' | 'large' | 'xlarge' | 'quotes'
  text: string
  className?: string
}

export const BaseText: React.FC<BaseTextProps> = ({
  type = 'default',
  text,
  className,
}) => {
  const textClassType = `text-${type}`

  return <p className={`${textClassType} ${className}`}>{text}</p>
}
