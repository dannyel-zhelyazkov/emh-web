import { useEffect } from 'react'

import { api } from '@/api'
import {
  SuccessResponseMessage,
  UpdateUserRequest,
  UserRequest,
  UserResponse,
  UserSearchRequest,
  UsersPaginationResponse,
} from '@/api/@types'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetUserQuery = (user_id: string) => {
  const {
    data: user,
    isLoading,
    error,
    ...rest
  } = useQuery<UserResponse, string, UserResponse>({
    queryKey: ['single-user'],
    queryFn: () => api.users.getUser(user_id),
  })

  return { user, error, isLoading, ...rest }
}

export const useGetUsersQuery = (pagination?: any) => {
  const {
    data: users,
    isLoading,
    error,
    refetch,
    ...rest
  } = useQuery<UsersPaginationResponse, string>({
    queryKey: ['users'],
    queryFn: () => api.users.getUsers(pagination),
  })

  useEffect(() => {
    refetch()
  }, [pagination.skip, pagination.take, refetch])

  return { users, error, isLoading, ...rest }
}

export const useGetFilteredUsersQuery = () => {
  const {
    mutateAsync: searchUsers,
    error,
    ...rest
  } = useMutation<UsersPaginationResponse, string, UserSearchRequest>({
    mutationKey: ['users'],
    mutationFn: (search: UserSearchRequest) => api.users.getUsers(null, search),
  })

  return { searchUsers, error, ...rest }
}

export const useCreateUserQuery = () => {
  const {
    mutateAsync: createUser,
    error,
    ...rest
  } = useMutation<SuccessResponseMessage, string, UserRequest>({
    mutationKey: ['create-user'],
    mutationFn: api.users.createUser,
  })

  return { createUser, error, ...rest }
}

export const useUpdateUserQuery = () => {
  const {
    mutateAsync: updateUser,
    error,
    ...rest
  } = useMutation<SuccessResponseMessage, string, UpdateUserRequest>({
    mutationKey: ['update-user'],
    mutationFn: api.users.updateUser,
  })

  return { updateUser, error, ...rest }
}
