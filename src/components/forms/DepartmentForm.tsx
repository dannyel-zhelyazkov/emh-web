import { DepartmentRequest } from '@/api/@types/department.type.ts'
import { SearchEmployeeSelect } from '@/components/inputs/selects/SearchEmployeeSelect.tsx'
import { BaseButton } from '@/ui/buttons'
import { BaseForm } from '@/ui/forms'
import { faUsersRectangle } from '@fortawesome/free-solid-svg-icons'
import { Field, Form, Formik } from 'formik'

import { FormikBaseInput } from '../inputs/formik'

type DepartmentFormProps<
  T extends DepartmentRequest | Partial<DepartmentRequest>,
> = {
  mode: 'create' | 'update'
  initialValues: T
  submit: (data: T) => Promise<void>
}

export const DepartmentForm = <
  T extends DepartmentRequest | Partial<DepartmentRequest>,
>({
  mode,
  initialValues,
  submit,
}: DepartmentFormProps<T>) => (
  <BaseForm className="w-[600px]">
    <Formik initialValues={initialValues} onSubmit={submit}>
      <Form autoComplete="off">
        <div className="mb-4">
          <Field
            component={FormikBaseInput}
            label="Department name"
            name="department_name"
            leftIcon={faUsersRectangle}
            required
          />
        </div>
        <div className="mb-4">
          <Field
            component={FormikBaseInput}
            label="Location"
            name="location"
            leftIcon={faUsersRectangle}
            required
          />
        </div>
        <div className="mb-4">
          <Field
            component={SearchEmployeeSelect}
            label="Head Employee"
            name="employee_head_id"
            leftIcon={faUsersRectangle}
            required
          />
        </div>
        <BaseButton
          label={mode === 'create' ? 'Create' : 'Update'}
          submit
          className="self-end"
        />
      </Form>
    </Formik>
  </BaseForm>
)
