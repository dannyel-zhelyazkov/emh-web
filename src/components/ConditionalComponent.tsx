import React from 'react'

type ConditionalComponentProps = {
  show?: boolean
  children: React.ReactNode
}

export const ConditionalComponent: React.FC<ConditionalComponentProps> = ({
  show,
  children,
}) => (show ? children : null)
