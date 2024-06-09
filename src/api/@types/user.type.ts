import { RoleResponse } from '@/api/@types'
import { AxiosResponse } from 'axios'

export type UserRequest = {
  email: string
  password: string
  role_id: string
}

export type UpdateUserRequest = {
  user_id: string
  update: Partial<UserRequest>
}

export type UserResponse = {
  user_id: string
  email: string
  role_id: string
  role?: RoleResponse
  modified_at: Date
}

export type UsersPaginationResponse = {
  users: UserResponse[]
  totalPages: number
}

export type UserSearchRequest = {
  email: string
}

export type AxiosUsersResponse = AxiosResponse<UserResponse[]>
export type AxiosUsersPaginationResponse =
  AxiosResponse<UsersPaginationResponse>
export type AxiosUserResponse = AxiosResponse<UserResponse>
