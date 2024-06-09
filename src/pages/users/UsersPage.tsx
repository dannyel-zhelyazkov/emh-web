import { NAVIGATE_ROUTES } from '@/common/constants'
import { UsersDataTable } from '@/components/tables'
import { TableActionType, TablePageLayout } from '@/layouts'
import { useNavigate } from 'react-router-dom'

export const UsersPage = () => {
  const navigate = useNavigate()

  const handleAddUser = () => navigate(NAVIGATE_ROUTES.USERS_CREATE)

  const actions: TableActionType[] = [
    { type: 'success', label: 'Add User', onClick: handleAddUser },
  ]

  return (
    <TablePageLayout
      tableName="Users List"
      Table={UsersDataTable}
      actions={actions}
    />
  )
}
