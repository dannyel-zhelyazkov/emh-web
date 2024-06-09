import React, { useEffect, useState } from 'react'

import { BaseSelect } from '@/ui'
import { BaseSelectProps, SelectItem } from '@/ui/@types'
import { FieldProps } from 'formik'

type FormikBaseSelectProps = FieldProps & Omit<BaseSelectProps, 'onSelect'>

export const FormikBaseSelect: React.FC<FormikBaseSelectProps> = ({
  form,
  field,
  items,
  ...rest
}) => {
  const [selectedItem, setSelectedItem] = useState<SelectItem | undefined>(
    undefined,
  )

  const errors = form.errors[field.name] as string | Array<string> | undefined

  useEffect(() => {
    setSelectedItem(
      items.find((item) => item.value === form.values[field.name]),
    )
  }, [form.values[field.name]])

  const handleChange = (item: SelectItem) => {
    if (selectedItem?.label === item.label) return

    form.setFieldValue(field.name, item.value)
  }

  return (
    <BaseSelect
      items={items}
      selectedItem={selectedItem}
      errors={errors}
      onSelect={handleChange}
      {...rest}
    />
  )
}
