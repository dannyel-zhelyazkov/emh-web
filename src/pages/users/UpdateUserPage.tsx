import { useContext, useEffect, useState } from 'react'

import { RoleResponse, UserRequest } from '@/api/@types'
import { ToastContext } from '@/app'
import { NAVIGATE_ROUTES } from '@/common/constants'
import { UserForm } from '@/components/forms'
import {
  useGetRolesQuery,
  useGetUserQuery,
  useUpdateUserQuery,
} from '@/hooks/queries'
import { FormPageLayout } from '@/layouts'
import { BaseSkeletonSpinner } from '@/ui/loaders'
import { OptionType, handleAxiosError, mapToOptionItem } from '@/utils'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import _ from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'

export const UpdateUserPage = () => {
  const navigate = useNavigate()
  const { user_id } = useParams<{ user_id: string }>()
  const { show } = useContext(ToastContext)

  const { user, isLoading: userLoading } = useGetUserQuery(user_id as string)
  const { updateUser } = useUpdateUserQuery()
  const { roles, isLoading: rolesLoading } = useGetRolesQuery()

  const [rolesOptions, setRolesOptions] = useState<OptionType<RoleResponse>[]>(
    [],
  )
  const [initialValues, setInitialValues] = useState<Partial<UserRequest>>({
    email: '',
    role_id: '',
  })

  useEffect(() => {
    if (!roles || !user) return

    setRolesOptions(
      mapToOptionItem<RoleResponse>(roles.roles, {
        labelName: 'role_name',
        valueName: 'role_id',
      }),
    )

    setInitialValues({
      email: user.email,
      role_id: user.role_id,
    })
  }, [roles, user])

  const handleSubmit = async (values: Partial<UserRequest>) => {
    try {
      await updateUser({
        user_id: user_id as string,
        update: _.omit(values, 'password'),
      })
      navigate(NAVIGATE_ROUTES.USERS)
    } catch (error) {
      handleAxiosError(error as string, show)
    }
  }

  return (
    <FormPageLayout title="Update User" icon={faUser}>
      <>
        <BaseSkeletonSpinner isLoading={userLoading || rolesLoading} />
        <UserForm<Partial<UserRequest>>
          roles={rolesOptions}
          submit={handleSubmit}
          initialValues={initialValues}
          mode="update"
        />
      </>
    </FormPageLayout>
  )
}
