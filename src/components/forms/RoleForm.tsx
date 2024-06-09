import { RoleRequest } from '@/api/@types'
import { FormikBaseInput } from '@/components/inputs/formik/FormikBaseInput.tsx'
import { BaseButton } from '@/ui/buttons'
import { BaseForm } from '@/ui/forms'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Field, Form, Formik } from 'formik'

type RoleFormProps<T extends RoleRequest | Partial<RoleRequest>> = {
  mode: 'create' | 'update'
  initialValues: T
  submit: (data: T) => Promise<void>
}

export const RoleForm = <T extends RoleRequest | Partial<RoleRequest>>({
  mode,
  initialValues,
  submit,
}: RoleFormProps<T>) => {
  return (
    <BaseForm className="w-[600px]">
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        enableReinitialize
      >
        <Form autoComplete="off">
          <div className="mb-4">
            <Field
              component={FormikBaseInput}
              name="role_name"
              label="Name"
              leftIcon={faUser}
              className="mb-4"
              required
            />
          </div>
          <div className="mb-4">
            <Field
              component={FormikBaseInput}
              name="role_code"
              label="Code"
              leftIcon={faUser}
              className="mb-4"
              required
            />
          </div>
          <BaseButton
            submit
            label={mode === 'create' ? 'Create' : 'Update'}
            className="text-white"
          />
        </Form>
      </Formik>
    </BaseForm>
  )
}
