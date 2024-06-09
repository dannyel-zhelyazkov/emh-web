import { api } from '@/api'
import { SuccessResponseMessage } from '@/api/@types'
import {
  DepartmentRequest,
  DepartmentResponse,
  UpdateDepartmentRequest,
} from '@/api/@types/department.type.ts'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetDepartmentQuery = (department_id: string) => {
  const {
    data: department,
    isLoading,
    error,
    ...rest
  } = useQuery<DepartmentResponse, string, DepartmentResponse>({
    queryKey: ['single-department'],
    queryFn: () => api.departments.getDepartment(department_id),
  })

  return { department, error, isLoading, ...rest }
}

export const useGetDepartmentsQuery = () => {
  const {
    data: departments,
    isLoading,
    error,
    ...rest
  } = useQuery<DepartmentResponse[], string>({
    queryKey: ['departments'],
    queryFn: api.departments.getDepartments,
  })

  return { departments, error, isLoading, ...rest }
}

export const useCreateDepartmentMutation = () => {
  const {
    mutateAsync: createDepartment,
    error,
    ...rest
  } = useMutation<SuccessResponseMessage, string, DepartmentRequest>({
    mutationKey: ['create-department'],
    mutationFn: api.departments.createDepartment,
  })

  return { createDepartment, error, ...rest }
}

export const useUpdateDepartmentMutation = () => {
  const {
    mutateAsync: updateDepartment,
    error,
    ...rest
  } = useMutation<SuccessResponseMessage, string, UpdateDepartmentRequest>({
    mutationKey: ['update-department'],
    mutationFn: api.departments.updateDepartment,
  })

  return { updateDepartment, error, ...rest }
}

export const useDeleteDepartmentMutation = () => {
  const {
    mutateAsync: deleteDepartment,
    error,
    ...rest
  } = useMutation<SuccessResponseMessage, string, string[]>({
    mutationKey: ['delete-department'],
    mutationFn: api.departments.deleteDepartment,
  })

  return { deleteDepartment, error, ...rest }
}
