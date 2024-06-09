import React from 'react'

import { BaseInput } from '@/ui/inputs'
import { FieldProps } from 'formik'

type FormikBaseInputProps = {
  label: string
} & FieldProps
export const FormikBaseInput: React.FC<FormikBaseInputProps> = ({
  label,
  form,
  field,
  ...rest
}) => {
  const errors = form.errors[field.name] as string | Array<string> | undefined

  return (
    <BaseInput
      label={label}
      value={form.values[field.name]}
      name={field.name}
      errors={errors}
      onChange={form.handleChange}
      {...rest}
    />
  )
}
