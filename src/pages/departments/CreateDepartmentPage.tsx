import { useContext } from 'react'

import { DepartmentRequest } from '@/api/@types/department.type.ts'
import { ToastContext } from '@/app'
import { NAVIGATE_ROUTES } from '@/common/constants'
import { DepartmentForm } from '@/components/forms'
import { useCreateDepartmentMutation } from '@/hooks/queries/useDeparmentQuery.ts'
import { FormPageLayout } from '@/layouts'
import { handleAxiosError } from '@/utils'
import { faUsersRectangle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export const CreateDepartmentPage = () => {
  const navigate = useNavigate()
  const { show } = useContext(ToastContext)

  const { createDepartment } = useCreateDepartmentMutation()

  const initialValues: DepartmentRequest = {
    department_name: '',
    location: '',
    employee_head_id: '',
  }

  const handleSubmit = async (values: DepartmentRequest) => {
    try {
      await createDepartment(values)
      navigate(NAVIGATE_ROUTES.DEPARTMENTS)
    } catch (error) {
      handleAxiosError(error as string, show)
    }
  }

  return (
    <FormPageLayout title="Create Department" icon={faUsersRectangle}>
      <DepartmentForm
        mode="create"
        initialValues={initialValues}
        submit={handleSubmit}
      />
    </FormPageLayout>
  )
}
