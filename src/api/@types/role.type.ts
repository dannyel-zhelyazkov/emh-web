import { AxiosResponse } from 'axios'

export type RoleResponse = {
  role_id: string
  role_name: string
  role_code: string
  modified_at: Date
}

export type RoleRequest = {
  role_name: string
  role_code: string
}

export type UpdateRoleRequest = {
  role_id: string
  update: Partial<RoleRequest>
}

export type RolesPaginationResponse = {
  roles: RoleResponse[]
  totalPages: number
}

export type AxiosRolesResponse = AxiosResponse<RoleResponse[]>
export type AxiosRoleResponse = AxiosResponse<RoleResponse>
export type AxiosRolesPaginationResponse =
  AxiosResponse<RolesPaginationResponse>
