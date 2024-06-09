import { useState } from 'react'

import {
  HeaderItems,
  Pagination,
  RenderItemsDef,
  RowItem,
  RowItems,
} from '@/hooks/@types'
import { OptionItem } from '@/ui/@types'

type Config<T> = {
  data: T[]
  headers: HeaderItems<T>
  renders?: RenderItemsDef<T>
  actions: OptionItem<T>[]
}

type TableHookReturn<T extends Record<string, any>> = {
  rows: RowItems<T>
  config: (config: Config<T>) => void
  rowsActions: OptionItem<T>[][]
}

export const useDataTable = <T extends Record<string, any>>(
  idField: keyof T,
): TableHookReturn<T> => {
  const [rows, setRows] = useState<RowItems<T>>({})
  const [rowsActions, setRowsActions] = useState<OptionItem<T>[][]>([])

  const config: (config: Config<T>) => void = ({
    data,
    headers,
    renders,
    actions,
  }) => {
    setRows(
      data.reduce((acc: RowItems<T>, node: T) => {
        acc[node[idField]] = Object.keys(headers).reduce(
          (acc: RowItem<T>, header: keyof T) => {
            acc[header] = {
              value: node[header],
              ...(!!renders &&
                !!renders[header] && {
                  render: () => renders[header](node),
                }),
            }

            return acc
          },
          {} as RowItem<T>,
        )

        return acc
      }, {}),
    )

    setRowsActions(() => {
      const mappedActions: OptionItem<T>[][] = []

      data.forEach((node) =>
        mappedActions.push(
          actions.map((action) => ({
            ...action,
            ...(action.click && { click: action.click.bind(this, node) }),
          })),
        ),
      )

      return mappedActions
    })
  }

  return {
    rows,
    config,
    rowsActions,
  }
}

export const useDataTablePagination = (): Pagination => {
  const [pages, setPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [skip, setSkip] = useState<number>(0)
  const [take, setTake] = useState<number>(5)

  const goNextPage = () => {
    if (skip + take >= pages * take) return

    setSkip((skip) => skip + take)
    setCurrentPage((page) => page + 1)
  }

  const goPrevPage = () => {
    if (skip - take < 0) return

    setSkip(skip - take)
    setCurrentPage((page) => page - 1)
  }

  const setItemsPerPage = (items: number) => {
    setCurrentPage(1)
    setTake(items)
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    setSkip(page * take)
  }

  const setTotalPages = (pages: number) => setPages(pages)

  return {
    goNextPage,
    currentPage,
    pages,
    goPrevPage,
    goToPage,
    setItemsPerPage,
    setTotalPages,
    skip,
    take,
  }
}
