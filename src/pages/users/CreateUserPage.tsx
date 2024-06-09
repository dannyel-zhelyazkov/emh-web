import { useContext, useEffect, useState } from 'react'

import { RoleResponse, UserRequest } from '@/api/@types'
import { ToastContext } from '@/app'
import { NAVIGATE_ROUTES } from '@/common/constants'
import { UserForm } from '@/components/forms'
import { useGetRolesQuery } from '@/hooks/queries'
import { useCreateUserQuery } from '@/hooks/queries/useUserQuery.hook.ts'
import { FormPageLayout } from '@/layouts'
import { OptionType, handleAxiosError, mapToOptionItem } from '@/utils'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'

export const CreateUserPage = () => {
  const navigate = useNavigate()
  const { show } = useContext(ToastContext)

  const { createUser } = useCreateUserQuery()
  const { roles } = useGetRolesQuery()

  const [rolesOptions, setRolesOptions] = useState<OptionType<RoleResponse>[]>(
    [],
  )

  useEffect(() => {
    if (roles)
      setRolesOptions(
        mapToOptionItem<RoleResponse>(roles, {
          labelName: 'role_name',
          valueName: 'role_id',
        }),
      )
  }, [roles])

  const initialValues = { email: '', password: '', role_id: '' }

  const handleSubmit = async (values: UserRequest) => {
    try {
      await createUser({ ...values, email: `${values.email}@emh.com` })
      navigate(NAVIGATE_ROUTES.USERS)
    } catch (error) {
      handleAxiosError(error as string, show)
    }
  }

  return (
    <FormPageLayout title="Create User" icon={faUser}>
      <UserForm<UserRequest>
        roles={rolesOptions}
        submit={handleSubmit}
        initialValues={initialValues}
        mode="create"
      />
    </FormPageLayout>
  )
}
