import React, { ChangeEvent, useEffect, useState } from 'react'

import { useGetEmployeeQuery } from '@/hooks/queries/useEmployeeQuery.hook.ts'
import { BaseSelect } from '@/ui'
import { OptionItem } from '@/ui/@types'
import { FieldProps } from 'formik'

type FormikBaseSearchSelectProps = FieldProps

export const SearchEmployeeSelect: React.FC<FormikBaseSearchSelectProps> = ({
  form,
  field,
  ...rest
}) => {
  const [items, setItems] = useState<OptionItem[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedItem, setSelectedItem] = useState<OptionItem | undefined>(
    undefined,
  )
  const [doFetch, setDoFetch] = useState<boolean>(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined)

  const { searchEmployees } = useGetEmployeeQuery()

  useEffect(() => {
    doFetch && fetchItems()
  }, [doFetch])

  const errors = form.errors[field.name] as string | Array<string> | undefined

  const fetchItems = async () => {
    const employees = await searchEmployees({ email: searchValue })

    if (!employees) return

    setItems(
      employees.map((employee) => ({
        label: employee.email,
        value: employee.email,
      })),
    )

    setDoFetch(false)
    setTimer(undefined)
  }

  const handleChange = (item: OptionItem) => {
    if (selectedItem?.label === item.label) return

    setSelectedItem(item)

    form.setFieldValue(field.name, item.value)
    setSearchValue('')
  }

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchValue(value)

    if (value) {
      clearTimeout(timer)
      setTimer(setTimeout(() => setDoFetch(true), 500))
    }
  }

  return (
    <BaseSelect
      searchValue={searchValue}
      items={items}
      selectedItem={selectedItem}
      searchable
      errors={errors}
      onSelect={handleChange}
      onSearch={handleSearch}
      {...rest}
    />
  )
}
