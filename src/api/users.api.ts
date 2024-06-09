import {
  AxiosResponseSuccessMessage,
  AxiosUserResponse,
  AxiosUsersPaginationResponse,
  SuccessResponseMessage,
  UpdateUserRequest,
  UserRequest,
  UserResponse,
  UserSearchRequest,
  UsersPaginationResponse,
} from '@/api/@types'
import { AxiosInstance, AxiosResponse } from 'axios'

export const UsersApi = (client: AxiosInstance) => {
  const USERS_BASE_URL = '/users'

  const getUser = async (user_id: string): Promise<UserResponse> => {
    const response = await client.get<AxiosResponse, AxiosUserResponse>(
      `${USERS_BASE_URL}/${user_id}`,
    )

    return response.data
  }

  const getUsers = async (
    pagination: any,
    search?: UserSearchRequest,
  ): Promise<UsersPaginationResponse> => {
    const response = await client.get<
      AxiosResponse,
      AxiosUsersPaginationResponse
    >(
      `${USERS_BASE_URL}?take=${pagination.take}&skip=${pagination.skip}${search?.email ? `&search=${search.email}` : ''}`,
    )

    return response.data
  }

  const createUser = async (
    request: UserRequest,
  ): Promise<SuccessResponseMessage> => {
    const response = await client.post<
      AxiosResponse,
      AxiosResponseSuccessMessage
    >(`${USERS_BASE_URL}/create`, request)

    return response.data
  }

  const updateUser = async (
    request: UpdateUserRequest,
  ): Promise<SuccessResponseMessage> => {
    const response = await client.put<
      AxiosResponse,
      AxiosResponseSuccessMessage
    >(`${USERS_BASE_URL}/update/${request.user_id}`, { ...request.update })

    return response.data
  }

  return {
    getUser,
    getUsers,
    createUser,
    updateUser,
  }
}
