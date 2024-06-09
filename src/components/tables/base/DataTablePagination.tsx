import React, { ChangeEvent } from 'react'

import { Pagination } from '@/hooks/@types'
import { BaseInput } from '@/ui/inputs'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

type DataTablePaginationProps = {
  pagination: Pagination
}

export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  pagination,
}) => {
  const paginationItemClass = (disabled: boolean) =>
    classNames(
      'flex h-6 w-6 cursor-pointer items-center justify-center rounded-half select-none',
      {
        'hover:bg-black hover:text-white': !disabled,
        'text-black-25 pointer-events-none': disabled,
      },
    )

  const arrowsLeftClass = classNames(
    paginationItemClass(pagination.currentPage === 0 || pagination.pages === 1),
  )
  const arrowsRightClass = classNames(
    paginationItemClass(
      pagination.currentPage + 1 === pagination.pages || pagination.pages === 1,
    ),
  )

  return (
    <div className="flex w-fit items-center justify-end gap-x-2">
      <div className={arrowsLeftClass}>
        <FontAwesomeIcon icon={faChevronLeft} onClick={pagination.goPrevPage} />
      </div>
      <BaseInput
        label=""
        className="mb-0 w-[50px]"
        value={pagination.currentPage + 1}
        type="number"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const page = Number(event.target.value) - 1
          if (page > pagination.pages - 1) return

          pagination.goToPage(page)
        }}
      />
      <div className={arrowsRightClass}>
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={pagination.goNextPage}
        />
      </div>
    </div>
  )
}
