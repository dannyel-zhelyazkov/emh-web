import { TableMetaData } from '@/api/@types'
import { AxiosResponse } from 'axios'

export type DepartmentRequest = {
  department_name: string
  location: string
  employee_head_id: string
}

export type UpdateDepartmentRequest = {
  department_id: string
  update: Partial<DepartmentRequest>
}

export type DepartmentResponse = {
  department_id: string
  department_name: string
  location: string
  employee_head_id: string
} & TableMetaData

export type AxiosDepartmentResponse = AxiosResponse<DepartmentResponse>
export type AxiosDepartmentsResponse = AxiosResponse<DepartmentResponse[]>
