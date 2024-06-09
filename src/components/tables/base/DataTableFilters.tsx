import React from 'react'

import { OptionItem } from '@/ui/@types'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type DataTableFiltersProps = {
  filterOptions: OptionItem[]
}

export const DataTableFilters: React.FC<DataTableFiltersProps> = ({
  filterOptions,
}) => {
  const userFilterOptions: OptionItem[] = [
    { label: 'Role', value: 'multi-select' },
    { label: 'Email', value: 'select' },
  ]

  return (
    <>
      <FontAwesomeIcon className="cursor-pointer" icon={faFilter} size="2x" />
    </>
  )
}
