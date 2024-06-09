import { AuthApi } from '@/api/auth.api.ts'
import { DepartmentsApi } from '@/api/departments.api.ts'
import { EmployeesApi } from '@/api/employees.api.ts'
import { RolesApi } from '@/api/role.api.ts'
import { UsersApi } from '@/api/users.api.ts'
import { axiosClient } from '@/clients'

export const api = {
  auth: AuthApi(axiosClient),
  users: UsersApi(axiosClient),
  departments: DepartmentsApi(axiosClient),
  roles: RolesApi(axiosClient),
  employees: EmployeesApi(axiosClient),
}
