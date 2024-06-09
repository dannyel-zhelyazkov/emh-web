import { useEffect } from 'react'

import { api } from '@/api'
import {
  EmployeeResponse,
  EmployeeSearchRequest,
} from '@/api/@types/employee.type.ts'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetEmployeesQuery = (pagination?: any) => {
  const {
    data: employees,
    error,
    refetch,
    ...rest
  } = useQuery<EmployeeResponse[], string, EmployeeResponse[]>({
    queryKey: ['get-employees-email'],
    queryFn: () => api.employees.getEmployees(pagination),
  })

  useEffect(() => {
    if (pagination?.skip && pagination?.take) refetch()
  }, [pagination?.skip, pagination?.take, refetch])

  return { employees, error, refetch, ...rest }
}

export const useGetEmployeeQuery = () => {
  const {
    mutateAsync: searchEmployees,
    error,
    ...rest
  } = useMutation<EmployeeResponse[], string, EmployeeSearchRequest>({
    mutationKey: ['get-employees-email'],
    mutationFn: (data) => api.employees.getEmployee(data),
  })

  return { searchEmployees, error, ...rest }
}
