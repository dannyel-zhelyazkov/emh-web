import React, { ChangeEvent } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type OptionItem<DataType = any, ValueType = any> = {
  label: string
  value?: ValueType
  data?: DataType
  click?: (data?: DataType) => void
}

export type TriggerFunctionComponent = (onClick: () => void) => React.ReactNode

export type BaseSelectProps = {
  searchValue?: string
  items: OptionItem<any, any>[]
  selectedItem?: OptionItem<any, any>
  errors?: string | Array<string>
  onSelect: (item: OptionItem<any, any>) => void
  multiselect?: boolean
  searchable?: boolean
  light?: boolean
  leftIcon?: IconProp
  required?: boolean
  className?: string
  label?: string
  onSearch?: (event: ChangeEvent<HTMLInputElement>) => void
}
