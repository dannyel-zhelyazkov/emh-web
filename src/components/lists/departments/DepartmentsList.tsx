import { ChangeEvent, useContext, useState } from 'react'

import { ToastContext } from '@/app'
import { NAVIGATE_ROUTES } from '@/common/constants'
import { DepartmentListItem } from '@/components/lists/departments'
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
} from '@/hooks/queries/useDeparmentQuery.ts'
import { BaseButton } from '@/ui/buttons'
import { BaseInput } from '@/ui/inputs'
import { handleAxiosError } from '@/utils'
import { useNavigate } from 'react-router-dom'

export const DepartmentsList = () => {
  const navigate = useNavigate()
  const { show } = useContext(ToastContext)

  const { departments, refetch } = useGetDepartmentsQuery()
  const { deleteDepartment } = useDeleteDepartmentMutation()

  const [search, setSearch] = useState<string>('')
  const [selectMode, setSelectMode] = useState(false)
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleTurnOnSelectMode = () => {
    setSelectMode((mode) => {
      if (mode) setSelectedDepartments([])

      return !mode
    })
  }

  const handleSelectDepartment = (department_id: string) => {
    if (!selectMode || selectedDepartments.includes(department_id)) return

    setSelectedDepartments((selected) => [...selected, department_id])
  }

  const handleDeleteDepartment = async () => {
    if (!selectedDepartments.length) return

    try {
      await deleteDepartment(selectedDepartments)
      await refetch()
    } catch (e) {
      handleAxiosError(e as string, show)
    }
  }

  const handleShowToast = () => navigate(NAVIGATE_ROUTES.DEPARTMENTS_CREATE)

  return (
    <div className="flex h-full w-full flex-col p-6">
      <div className="search-list-search mb-8 flex justify-between border-b border-blue pb-4">
        <BaseInput
          label="Search Department"
          value={search}
          onChange={handleSearch}
          name="search-department"
          className="w-72"
        />
        <div className="flex h-full w-96 items-center gap-x-8">
          <BaseButton type="success" label="Add" onClick={handleShowToast} />
          <BaseButton
            type="warning"
            label="Select"
            onClick={handleTurnOnSelectMode}
          />
          <BaseButton
            disabled={!selectMode}
            type="error"
            label="Delete"
            onClick={handleDeleteDepartment}
          />
        </div>
      </div>
      <div className="search-list-content flex flex-wrap justify-start gap-10 overflow-y-auto">
        {departments?.length ? (
          departments.map((item) => (
            <DepartmentListItem
              key={item.department_id}
              item={{
                name: item.department_name,
                head: 'Daniel Zhelyazkov',
                employees_count: 120,
                location: item.location,
              }}
              onClick={() => handleSelectDepartment(item.department_id)}
              selected={selectedDepartments.includes(item.department_id)}
            />
          ))
        ) : (
          <div className="w-full text-center">No departments found</div>
        )}
      </div>
    </div>
  )
}
