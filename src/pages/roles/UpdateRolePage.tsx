import { useContext, useEffect, useState } from 'react'

import { RoleRequest } from '@/api/@types'
import { ToastContext } from '@/app'
import { NAVIGATE_ROUTES } from '@/common/constants'
import { RoleForm } from '@/components/forms'
import { useGetRoleQuery, useUpdateRoleQuery } from '@/hooks/queries'
import { FormPageLayout } from '@/layouts'
import { handleAxiosError } from '@/utils'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'

export const UpdateRolePage = () => {
  const { role_id } = useParams()
  const navigate = useNavigate()

  const { show } = useContext(ToastContext)
  const { role } = useGetRoleQuery(role_id as string)
  const { updateRole } = useUpdateRoleQuery()

  const [initialValues, setInitialValues] = useState<Partial<RoleRequest>>({
    role_name: '',
    role_code: '',
  })

  useEffect(() => {
    if (!role) return

    setInitialValues({
      role_name: role.role_name,
      role_code: role.role_code,
    })
  }, [role])

  const handleSubmit = async (values: Partial<RoleRequest>) => {
    try {
      await updateRole({ role_id: role_id as string, update: values })
      navigate(NAVIGATE_ROUTES.ROLES)
    } catch (error) {
      console.log(error)
      handleAxiosError(error as string, show)
    }
  }

  return (
    <FormPageLayout title="Update Role" icon={faUserCircle}>
      <RoleForm<Partial<RoleRequest>>
        mode="update"
        initialValues={initialValues}
        submit={handleSubmit}
      />
    </FormPageLayout>
  )
}
