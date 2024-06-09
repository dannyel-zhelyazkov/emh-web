import React from 'react'

import { ButtonType } from '@/ui/@types'
import { BaseButton } from '@/ui/buttons'
import { BaseHeading } from '@/ui/text'

type TablePageLayoutProps = {
  tableName: string
  Table: React.ComponentType
  actions: TableActionType[]
}

export type TableActionType = {
  type: ButtonType
  label: string
  onClick: () => void
}

export const TablePageLayout: React.FC<TablePageLayoutProps> = ({
  tableName,
  Table,
  actions,
}) => (
  <div className="h-full w-full">
    <div className="mb-4 flex items-center justify-between">
      <BaseHeading type={1} text={tableName} />
      <div className="w-40">
        {actions.map((action) => (
          <BaseButton
            key={action.label}
            type={action.type}
            label={action.label}
            onClick={action.onClick}
          />
        ))}
      </div>
    </div>
    <div className="mb-4 border border-b-black" />
    <Table />
  </div>
)
