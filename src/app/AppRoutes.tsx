import { BaseRouteRedirect } from '@/app/BaseRouteRedirect.tsx'
import { APP_ROUTES } from '@/common/constants'
import { MainLayout } from '@/layouts'
import { AuthPage } from '@/pages'
import { NotFoundPage } from '@/pages'
import { CreateDepartmentPage, DepartmentsPage } from '@/pages/departments'
import { EmployeesPage } from '@/pages/employees'
import { CreateRolePage, RolesPage, UpdateRolePage } from '@/pages/roles'
import { CreateUserPage, UpdateUserPage, UsersPage } from '@/pages/users'
import { Route, Routes } from 'react-router-dom'

export const AppRoutes = () => (
  <Routes>
    <Route path={APP_ROUTES.BASE} element={<BaseRouteRedirect />} />
    <Route path={APP_ROUTES.LOGIN} element={<AuthPage />} />
    <Route path={APP_ROUTES.APP} element={<MainLayout />}>
      <Route path={APP_ROUTES.MANAGEMENT}>
        {/*DEPARTMENTS*/}
        <Route path={APP_ROUTES.DEPARTMENTS} element={<DepartmentsPage />} />
        <Route
          path={APP_ROUTES.DEPARTMENT_CREATE}
          element={<CreateDepartmentPage />}
        />
        {/*EMPLOYEES*/}
        <Route path={APP_ROUTES.EMPLOYEES} element={<EmployeesPage />} />
        <Route
          path={APP_ROUTES.EMPLOYEE_CREATE}
          element={<CreateDepartmentPage />}
        />
      </Route>
      <Route path={APP_ROUTES.ADMIN}>
        {/*USERS*/}
        <Route path={APP_ROUTES.USERS} element={<UsersPage />} />
        <Route path={APP_ROUTES.USERS_CREATE} element={<CreateUserPage />} />
        <Route path={APP_ROUTES.USERS_UPDATE} element={<UpdateUserPage />} />

        {/*ROLES*/}
        <Route path={APP_ROUTES.ROLES} element={<RolesPage />} />
        <Route path={APP_ROUTES.ROLES_CREATE} element={<CreateRolePage />} />
        <Route path={APP_ROUTES.ROLES_UPDATE} element={<UpdateRolePage />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)
