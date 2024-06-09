import React, { HTMLAttributes } from 'react'

import { BaseHeading } from '@/ui/text'
import classNames from 'classnames'

export type EmployeeListItemType = {
  first_name: string
  last_name: string
  email: string
  address: string
}

type EmployeeListItemProps = {
  item: EmployeeListItemType
  selected?: boolean
} & HTMLAttributes<HTMLDivElement>

export const EmployeeListItem: React.FC<EmployeeListItemProps> = ({
  item,
  onClick,
  selected,
}) => {
  const itemClass = classNames(
    'cursor-pointer rounded p-4 border border-main',
    {
      'bg-blue': selected,
      'bg-lite-blue hover:bg-blue': !selected,
    },
  )

  return (
    <div className={itemClass} onClick={onClick}>
      <BaseHeading
        type={3}
        className="mb-2"
        text={`${item.first_name} ${item.last_name}`}
      />
      <div className="flex flex-col">
        <p className="text-xl">Email: {item.email}</p>
        <p className="mb-8">Address: {item.address}</p>
      </div>
    </div>
  )
}
