import {
  AxiosResponseSuccessMessage,
  SuccessResponseMessage,
} from '@/api/@types'
import {
  AxiosDepartmentResponse,
  AxiosDepartmentsResponse,
  DepartmentRequest,
  DepartmentResponse,
  UpdateDepartmentRequest,
} from '@/api/@types/department.type.ts'
import { AxiosInstance, AxiosResponse } from 'axios'

export const DepartmentsApi = (client: AxiosInstance) => {
  const DEPARTMENTS_BASE_URL = '/departments'

  const getDepartment = async (
    department_id: string,
  ): Promise<DepartmentResponse> => {
    const response = await client.get<AxiosResponse, AxiosDepartmentResponse>(
      `${DEPARTMENTS_BASE_URL}/${department_id}`,
    )

    return response.data
  }

  const getDepartments = async (): Promise<DepartmentResponse[]> => {
    const response = await client.get<AxiosResponse, AxiosDepartmentsResponse>(
      DEPARTMENTS_BASE_URL,
    )

    return response.data
  }

  const createDepartment = async (
    request: DepartmentRequest,
  ): Promise<SuccessResponseMessage> => {
    const response = await client.post<
      AxiosResponse,
      AxiosResponseSuccessMessage
    >(`${DEPARTMENTS_BASE_URL}/create`, request)

    return response.data
  }

  const updateDepartment = async (
    data: UpdateDepartmentRequest,
  ): Promise<SuccessResponseMessage> => {
    const response = await client.put<
      AxiosResponse,
      AxiosResponseSuccessMessage
    >(`${DEPARTMENTS_BASE_URL}/update/${data.department_id}`, {
      ...data.update,
    })

    return response.data
  }

  const deleteDepartment = async (
    department_ids: string[],
  ): Promise<SuccessResponseMessage> => {
    const response = await client.delete<
      AxiosResponse,
      AxiosResponseSuccessMessage
    >(`${DEPARTMENTS_BASE_URL}/delete?departments=${department_ids.join(',')}`)

    return response.data
  }

  return {
    getDepartment,
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  }
}
