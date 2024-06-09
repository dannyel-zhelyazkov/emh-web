import React from 'react'

type BaseHeadingProps = {
  type: 1 | 2 | 3 | 4 | 5 | 6
  text: string
  className?: string
}

export const BaseHeading: React.FC<BaseHeadingProps> = ({
  type,
  text,
  className,
}) => {
  const heading = () => {
    switch (type) {
      case 1:
        return <h1 className={`text-h1 ${className}`}>{text}</h1>
      case 2:
        return <h2 className={`text-h2 ${className}`}>{text}</h2>
      case 3:
        return <h3 className={`text-h3 ${className}`}>{text}</h3>
      case 4:
        return <h4 className={`text-h4 ${className}`}>{text}</h4>
      case 5:
        return <h5 className={`text-h5 ${className}`}>{text}</h5>
      case 6:
        return <h6 className={`text-h6 ${className}`}>{text}</h6>
      default:
        return <h1 className={`text-h1 ${className}`}>{text}</h1>
    }
  }

  return heading()
}
