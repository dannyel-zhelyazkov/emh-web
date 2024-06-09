import { AxiosResponse } from 'axios'

export type EmployeeRequest = {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  address: string
  hire_date: string
  department_id: string
}

export type EmployeeSearchRequest = {
  email: string
}

export type UpdateEmployeeRequest = {
  user_id: string
  update: Partial<EmployeeRequest>
}

export type EmployeeResponse = {
  employee_id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  address: string
  hire_date: string
  fire_date: string
  department_id: string
  modified_at: Date
}

export type EmployeesPaginationResponse = {
  employees: EmployeeResponse[]
  totalPages: number
}

export type AxiosEmployeesResponse = AxiosResponse<EmployeeResponse[]>
export type AxiosEmployeePaginationResponse =
  AxiosResponse<EmployeesPaginationResponse>
export type AxiosEmployeeResponse = AxiosResponse<EmployeeResponse>
