import React from 'react'

import { AuthRequest } from '@/api/@types'
import { authValidationScheme } from '@/components/forms/validations/auth.validation.ts'
import { FormikBaseInput } from '@/components/inputs/formik/FormikBaseInput.tsx'
import { BaseButton } from '@/ui/buttons'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Field, Form, Formik } from 'formik'

type AuthFormProps = {
  initialValues: AuthRequest
  submit: (data: AuthRequest) => Promise<void>
  loading: boolean
}

export const AuthForm: React.FC<AuthFormProps> = ({
  initialValues,
  submit,
  loading,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submit}
      validationSchema={authValidationScheme}
    >
      <Form autoComplete="off">
        <div className="mb-4">
          <Field
            component={FormikBaseInput}
            name="email"
            label="Email"
            leftIcon={faUser}
            suffix="@emh.com"
            className="mb-4"
            light
            required
          />
          <Field
            component={FormikBaseInput}
            name="password"
            label="Password"
            leftIcon={faLock}
            className="mb-4"
            light
            type="password"
            required
          />
        </div>
        <BaseButton
          submit
          label="Sign In"
          type="main"
          className="text-white"
          loading={loading}
        />
      </Form>
    </Formik>
  )
}
