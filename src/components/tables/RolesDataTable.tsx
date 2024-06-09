import { useContext, useEffect, useState } from 'react'

import { RoleResponse } from '@/api/@types'
import { ToastContext } from '@/app'
import { NAVIGATE_ROUTES } from '@/common/constants'
import { DataTable } from '@/components/tables/base/DataTable.tsx'
import { useDataTable, useDataTablePagination } from '@/hooks'
import { HeaderItems, RenderItemsDef } from '@/hooks/@types'
import { useDeleteRoleQuery, useGetRolesQuery } from '@/hooks/queries'
import { OptionItem } from '@/ui/@types'
import { BaseButton } from '@/ui/buttons'
import { BaseModal } from '@/ui/pop-ups'
import { baseFormatDate, handleAxiosError } from '@/utils'
import { useNavigate } from 'react-router-dom'

export const RolesDataTable = () => {
  const navigate = useNavigate()

  const { show } = useContext(ToastContext)

  const { config, rows, rowsActions } = useDataTable<RoleResponse>('role_id')
  const pagination = useDataTablePagination()

  const { deleteRole, isPending } = useDeleteRoleQuery()
  const { roles, refetch, isLoading } = useGetRolesQuery({
    take: pagination.take,
    skip: pagination.skip,
  })

  const [showModal, setShowModal] = useState<boolean>(false)
  const [deleteRoleFuncRef, setDeleteRoleFuncRef] =
    useState<() => Promise<void>>()

  const headers: HeaderItems<RoleResponse> = {
    role_name: 'Role',
    role_code: 'Code',
    modified_at: 'Last Modified',
  }

  const renders: RenderItemsDef<RoleResponse> = {
    modified_at: (item) => <span>{baseFormatDate(item.modified_at)}</span>,
  }

  const actions: OptionItem<RoleResponse>[] = [
    {
      label: 'Edit',
      click: (item) =>
        navigate(NAVIGATE_ROUTES.ROLES_UPDATE(item?.role_id as string)),
    },
    {
      label: 'Delete',
      click: (item) => {
        setShowModal(true)
        setDeleteRoleFuncRef(() =>
          handleDeleteRole.bind(this, item?.role_id as string),
        )
      },
    },
  ]

  const deleteRoleModalButton = (
    <BaseButton
      type="error"
      label="Delete"
      loading={isPending}
      onClick={deleteRoleFuncRef}
    />
  )

  useEffect(() => {
    if (roles) {
      config({ data: roles.roles, headers, renders, actions })
      pagination.setTotalPages(roles.totalPages)
    }
  }, [roles])

  const handleDeleteRole = async (role_id: string) => {
    try {
      await deleteRole(role_id)
      await refetch()
    } catch (e) {
      handleAxiosError(e as string, show)
    } finally {
      setShowModal(false)
    }
  }

  return (
    <>
      <DataTable
        loading={isLoading}
        rows={rows}
        headers={headers}
        actions={rowsActions}
        pagination={pagination}
      />
      <BaseModal
        visible={showModal}
        header="Delete role"
        content="Are you sure you want to delete the role"
        onClose={() => setShowModal(false)}
        actionButton={deleteRoleModalButton}
      />
    </>
  )
}
