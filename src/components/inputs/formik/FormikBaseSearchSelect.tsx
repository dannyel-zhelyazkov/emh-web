import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'

import { BaseSelect } from '@/ui'
import { BaseSelectProps, OptionItem } from '@/ui/@types'
import { FieldProps } from 'formik'

type FormikBaseSearchSelectProps = FieldProps &
  Omit<BaseSelectProps, 'onSelect' | 'onSearch'>

export const FormikBaseSearchSelect: React.FC<FormikBaseSearchSelectProps> = ({
  form,
  field,
  items,
  ...rest
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedItem, setSelectedItem] = useState<OptionItem | undefined>(
    undefined,
  )

  const searchedValues = useMemo(
    () => items.filter((item) => item.label.includes(searchValue)),
    [searchValue],
  )

  const errors = form.errors[field.name] as string | Array<string> | undefined

  useEffect(() => {
    setSelectedItem(
      items.find((item) => item.value === form.values[field.name]),
    )
  }, [form.values[field.name]])

  const handleChange = (item: OptionItem) => {
    if (selectedItem?.label === item.label) return

    form.setFieldValue(field.name, item.value)
    setSearchValue('')
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value)

  return (
    <BaseSelect
      searchValue={searchValue}
      items={searchedValues}
      selectedItem={selectedItem}
      searchable
      errors={errors}
      onSelect={handleChange}
      onSearch={handleSearch}
      {...rest}
    />
  )
}
