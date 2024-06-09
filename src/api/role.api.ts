import {
  AxiosResponseSuccessMessage,
  AxiosRoleResponse,
  AxiosRolesPaginationResponse,
  RoleRequest,
  RoleResponse,
  RolesPaginationResponse,
  SuccessResponseMessage,
  UpdateRoleRequest,
} from '@/api/@types'
import { AxiosInstance, AxiosResponse } from 'axios'

export const RolesApi = (client: AxiosInstance) => {
  const ROLES_BASE_URL = '/roles'

  const getRole = async (role_id: string): Promise<RoleResponse> => {
    const response = await client.get<AxiosResponse, AxiosRoleResponse>(
      `${ROLES_BASE_URL}/${role_id}`,
    )

    return response.data
  }

  const getRoles = async (
    pagination: any,
  ): Promise<RolesPaginationResponse> => {
    const response = await client.get<
      AxiosResponse,
      AxiosRolesPaginationResponse
    >(
      `${ROLES_BASE_URL}${pagination ? `?take=${pagination.take}&skip=${pagination.skip}` : ''}`,
    )

    return response.data
  }

  const createRole = async (
    data: RoleRequest,
  ): Promise<SuccessResponseMessage> => {
    const response = await client.post<
      AxiosResponse,
      AxiosResponseSuccessMessage
    >(`${ROLES_BASE_URL}/create`, data)

    return response.data
  }

  const updateRole = async (
    data: UpdateRoleRequest,
  ): Promise<SuccessResponseMessage> => {
    const response = await client.put<
      AxiosResponse,
      AxiosResponseSuccessMessage
    >(`${ROLES_BASE_URL}/update/${data.role_id}`, { ...data.update })

    return response.data
  }

  const deleteRole = async (
    role_id: string,
  ): Promise<SuccessResponseMessage> => {
    const response = await client.delete<
      AxiosResponse,
      AxiosResponseSuccessMessage
    >(`${ROLES_BASE_URL}/delete/${role_id}`)

    return response.data
  }

  return {
    getRole,
    getRoles,
    createRole,
    updateRole,
    deleteRole,
  }
}
