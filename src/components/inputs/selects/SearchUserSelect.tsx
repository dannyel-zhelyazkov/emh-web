import { ChangeEvent, FC, useEffect, useState } from 'react'

import { useGetFilteredUsersQuery } from '@/hooks/queries'
import { BaseSelect } from '@/ui'
import { OptionItem } from '@/ui/@types'
import { FieldProps } from 'formik'

type SearchUserSelectProps = FieldProps

export const SearchUserSelect: FC<SearchUserSelectProps> = ({
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

  const { searchUsers } = useGetFilteredUsersQuery()

  useEffect(() => {
    doFetch && fetchItems()
  }, [doFetch])

  const errors = form.errors[field.name] as string | Array<string> | undefined

  const fetchItems = async () => {
    const { users } = await searchUsers({ email: searchValue })

    if (!users) return

    setItems(
      users.map((user) => ({
        label: user.email,
        value: user.email,
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
