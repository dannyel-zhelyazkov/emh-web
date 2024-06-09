import {
  AxiosEmployeesResponse,
  EmployeeSearchRequest,
} from '@/api/@types/employee.type.ts'
import { AxiosInstance, AxiosResponse } from 'axios'

export const EmployeesApi = (client: AxiosInstance) => {
  const USERS_BASE_URL = '/employees'

  const getEmployees = async (pagination: any) => {
    const response = await client.get<AxiosResponse, AxiosEmployeesResponse>(
      `${USERS_BASE_URL}${pagination ? `?take=${pagination.take}&skip=${pagination.skip}` : ''}`,
    )

    return response.data
  }

  const getEmployee = async (data: EmployeeSearchRequest) => {
    const response = await client.get<AxiosResponse, AxiosEmployeesResponse>(
      `${USERS_BASE_URL}?search=${data.email}`,
    )

    return response.data
  }

  return { getEmployees, getEmployee }
}
