import { useEffect } from 'react'

import { api } from '@/api'
import {
  RoleRequest,
  RoleResponse,
  RolesPaginationResponse,
  SuccessResponseMessage,
  UpdateRoleRequest,
} from '@/api/@types'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetRoleQuery = (role_id: string) => {
  const {
    data: role,
    isLoading,
    error,
    ...rest
  } = useQuery<RoleResponse, string, RoleResponse>({
    queryKey: ['single-role'],
    queryFn: () => api.roles.getRole(role_id),
  })

  return { role, error, isLoading, ...rest }
}

export const useGetRolesQuery = (pagination?: any) => {
  const {
    data: roles,
    isLoading,
    error,
    refetch,
    ...rest
  } = useQuery<RolesPaginationResponse, string>({
    queryKey: ['roles'],
    queryFn: () => api.roles.getRoles(pagination),
  })

  useEffect(() => {
    if (pagination?.skip && pagination?.take) refetch()
  }, [pagination?.skip, pagination?.take, refetch])

  return { roles, error, isLoading, refetch, ...rest }
}

export const useCreateRoleQuery = () => {
  const {
    mutateAsync: createRole,
    error,
    ...rest
  } = useMutation<SuccessResponseMessage, string, RoleRequest>({
    mutationKey: ['create-role'],
    mutationFn: api.roles.createRole,
  })

  return { createRole, error, ...rest }
}

export const useUpdateRoleQuery = () => {
  const {
    mutateAsync: updateRole,
    error,
    ...rest
  } = useMutation<SuccessResponseMessage, string, UpdateRoleRequest>({
    mutationKey: ['update-role'],
    mutationFn: api.roles.updateRole,
  })

  return { updateRole, error, ...rest }
}

export const useDeleteRoleQuery = () => {
  const {
    mutateAsync: deleteRole,
    error,
    ...rest
  } = useMutation<SuccessResponseMessage, string, string>({
    mutationKey: ['delete-role'],
    mutationFn: api.roles.deleteRole,
  })

  return { deleteRole, error, ...rest }
}
