import { useEffect } from 'react'

import { UserResponse } from '@/api/@types'
import { NAVIGATE_ROUTES } from '@/common/constants'
import { DataTable } from '@/components/tables/base/DataTable.tsx'
import { useDataTable, useDataTablePagination } from '@/hooks'
import { HeaderItems, RenderItemsDef } from '@/hooks/@types'
import { useGetUsersQuery } from '@/hooks/queries/useUserQuery.hook.ts'
import { OptionItem } from '@/ui/@types'
import { baseFormatDate } from '@/utils'
import { useNavigate } from 'react-router-dom'

export const UsersDataTable = () => {
  const navigate = useNavigate()
  const { config, rows, rowsActions } = useDataTable<UserResponse>('user_id')
  const pagination = useDataTablePagination()

  const { users, isLoading } = useGetUsersQuery({
    skip: pagination.skip,
    take: pagination.take,
  })

  const headers: HeaderItems<UserResponse> = {
    email: 'Email',
    role: 'Role',
    modified_at: 'Modified At',
  }

  const renders: RenderItemsDef<UserResponse> = {
    role: (item) => <span>{item?.role?.role_name}</span>,
    modified_at: (item) => <span>{baseFormatDate(item.modified_at)}</span>,
  }

  const actions: OptionItem<UserResponse>[] = [
    {
      label: 'Edit',
      click: (item) =>
        navigate(NAVIGATE_ROUTES.USERS_UPDATE(item?.user_id as string)),
    },
  ]

  useEffect(() => {
    if (users) {
      config({
        data: users.users,
        headers,
        renders,
        actions,
      })
      pagination.setTotalPages(users.totalPages)
    }
  }, [users])

  return (
    <DataTable
      headers={headers}
      rows={rows}
      loading={isLoading}
      actions={rowsActions}
      pagination={pagination}
    />
  )
}
