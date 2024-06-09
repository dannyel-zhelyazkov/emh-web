import { NAVIGATE_ROUTES } from '@/common/constants'
import { RolesDataTable } from '@/components/tables/RolesDataTable.tsx'
import { TableActionType, TablePageLayout } from '@/layouts'
import { useNavigate } from 'react-router-dom'

export const RolesPage = () => {
  const navigate = useNavigate()

  const handleAddRole = () => navigate(NAVIGATE_ROUTES.ROLES_CREATE)

  const actions: TableActionType[] = [
    { type: 'success', label: 'Add Role', onClick: handleAddRole },
  ]

  return (
    <TablePageLayout
      Table={RolesDataTable}
      actions={actions}
      tableName="Roles List"
    />
  )
}
