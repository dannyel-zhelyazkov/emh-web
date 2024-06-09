import { EmployeeRequest } from '@/api/@types/employee.type.ts'
import { FormikBaseInput } from '@/components/inputs/formik'
import { BaseButton } from '@/ui/buttons'
import { BaseForm } from '@/ui/forms'
import { Field, Form, Formik } from 'formik'

type EmployeeFormProps<T extends EmployeeRequest | Partial<EmployeeRequest>> = {
  mode: 'create' | 'update'
  initialValues: T
  submit: (data: T) => Promise<void>
}

export const EmployeeForm = <
  T extends EmployeeRequest | Partial<EmployeeRequest>,
>({
  initialValues,
  mode,
  submit,
}: EmployeeFormProps<T>) => (
  <BaseForm className="w-[600px]">
    <Formik
      initialValues={initialValues}
      onSubmit={submit}
      // validationSchema={createUserValidationScheme}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      enableReinitialize
    >
      <Form autoComplete="off">
        <div className="mb-4">
          <Field
            component={FormikBaseInput}
            name="first_name"
            label="First Name"
            className="mb-4"
            required
          />
          <Field
            component={FormikBaseInput}
            name="last_name"
            label="LastName"
            className="mb-4"
            type="password"
            required
            disabled={mode === 'update'}
          />
          <Field
            component={FormikBaseInput}
            name="email"
            label="Email"
            className="mb-4"
            required
          />
          <Field
            component={FormikBaseInput}
            name="phone_number"
            label="Phone Number"
            className="mb-4"
            required
          />
          <Field
            component={FormikBaseInput}
            name="address"
            label="Address"
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
