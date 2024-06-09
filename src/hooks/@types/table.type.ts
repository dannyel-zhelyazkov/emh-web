import React from 'react'

export type RenderItemsDef<T> = {
  [key in keyof Partial<T>]: (row: T) => React.ReactNode
}
export type HeaderItems<T> = { [key in keyof Partial<T>]: string }
export type RowItem<T> = {
  [key in keyof Partial<T>]: {
    value: string
    render?: (row: T) => React.ReactNode
  }
}
export type RowItems<T extends Record<string, any>> = {
  [key: string]: RowItem<T>
}
export type Pagination = {
  take: number
  skip: number
  pages: number
  currentPage: number
  goNextPage: () => void
  goPrevPage: () => void
  goToPage: (page: number) => void
  setItemsPerPage: (items: number) => void
  setTotalPages: (pages: number) => void
}
