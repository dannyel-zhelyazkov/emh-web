import { RoleResponse, UserRequest } from '@/api/@types'
import { BaseButton } from '@/ui/buttons'
import { BaseForm } from '@/ui/forms'
import { OptionType } from '@/utils'
import { faLock, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Field, Form, Formik } from 'formik'

import { FormikBaseInput, FormikBaseSelect } from '../inputs/formik'

type UserFormProps<T extends UserRequest | Partial<UserRequest>> = {
  mode: 'create' | 'update'
  roles: OptionType<RoleResponse>[]
  initialValues: T
  submit: (data: T) => Promise<void>
}

export const UserForm = <T extends UserRequest | Partial<UserRequest>>({
  roles,
  mode,
  initialValues,
  submit,
}: UserFormProps<T>) => (
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
            name="email"
            label="User"
            leftIcon={faUser}
            className="mb-4"
            required
          />
          <Field
            component={FormikBaseInput}
            name="password"
            label="Password"
            leftIcon={faLock}
            className="mb-4"
            password
            type="password"
            required
            disabled={mode === 'update'}
          />
          <Field
            component={FormikBaseSelect}
            items={roles}
            name="role_id"
            label="Role"
            leftIcon={faUserCircle}
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
