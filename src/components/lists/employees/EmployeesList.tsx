import { ChangeEvent, FC, useState } from 'react'

import { NAVIGATE_ROUTES } from '@/common/constants'
import { EmployeeListItem } from '@/components/lists/employees/index.ts'
import { useGetEmployeesQuery } from '@/hooks/queries/useEmployeeQuery.hook.ts'
import { BaseButton } from '@/ui/buttons'
import { BaseInput } from '@/ui/inputs'
import { useNavigate } from 'react-router-dom'

export const EmployeesList: FC = () => {
  const navigate = useNavigate()

  const { employees, refetch } = useGetEmployeesQuery()

  const [search, setSearch] = useState<string>('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value)

  const handleSelectEmployee = (employee_id: string) => {
    // redirect to employee details page
  }

  const handleAddEmployee = () => navigate(NAVIGATE_ROUTES.EMPLOYEE_CREATE)

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
          <BaseButton type="success" label="Add" onClick={handleAddEmployee} />
        </div>
      </div>
      <div className="search-list-content flex flex-wrap justify-start gap-10 overflow-y-auto">
        {employees?.length ? (
          employees.map((item) => (
            <EmployeeListItem
              key={item.employee_id}
              item={{
                first_name: item.first_name,
                last_name: item.last_name,
                email: item.email,
                address: item.address,
              }}
              onClick={() => handleSelectEmployee(item.employee_id)}
            />
          ))
        ) : (
          <div className="w-full text-center">No employees found</div>
        )}
      </div>
    </div>
  )
}
