import React, { HTMLAttributes } from 'react'

import { BaseHeading } from '@/ui/text'
import classNames from 'classnames'

export type DepartmentListItemType = {
  name: string
  head: string
  location: string
  employees_count: number
}

type DepartmentListItemProps = {
  item: DepartmentListItemType
  selected?: boolean
} & HTMLAttributes<HTMLDivElement>

export const DepartmentListItem: React.FC<DepartmentListItemProps> = ({
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
      <BaseHeading type={3} className="mb-2" text={item.name} />
      <div className="flex flex-col">
        <p className="text-xl">
          Head: <span>{item.head}</span>
        </p>
        <p className="mb-8">{item.location}</p>
        <p className="align-text-bottom">Employees: {item.employees_count}</p>
      </div>
    </div>
  )
}
