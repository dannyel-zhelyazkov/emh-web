import { useContext } from 'react'

import { RoleRequest } from '@/api/@types'
import { ToastContext } from '@/app'
import { NAVIGATE_ROUTES } from '@/common/constants'
import { RoleForm } from '@/components/forms/RoleForm.tsx'
import { useCreateRoleQuery } from '@/hooks/queries'
import { FormPageLayout } from '@/layouts'
import { handleAxiosError } from '@/utils'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export const CreateRolePage = () => {
  const navigate = useNavigate()
  const { show } = useContext(ToastContext)
  const { createRole } = useCreateRoleQuery()
  const initialValues = { role_name: '', role_code: '' }

  const handleSubmit = async (values: RoleRequest) => {
    try {
      await createRole(values)
      navigate(NAVIGATE_ROUTES.ROLES)
    } catch (error) {
      handleAxiosError(error as string, show)
    }
  }

  return (
    <FormPageLayout title="Create Role" icon={faUserCircle}>
      <RoleForm<RoleRequest>
        mode="create"
        initialValues={initialValues}
        submit={handleSubmit}
      />
    </FormPageLayout>
  )
}
