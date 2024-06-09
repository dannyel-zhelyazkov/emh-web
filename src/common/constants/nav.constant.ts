import { NAVIGATE_ROUTES } from '@/common/constants'
import { RedirectNavItem, TabItem } from '@/hooks/@types'

export const TOP_NAV_BAR_ITEMS: TabItem[] = [
  {
    label: 'Management',
    key: 'management',
  },
  {
    label: 'Admin',
    key: 'admin',
  },
]

export const SIDE_NAV_BAR_ITEMS: { [key: string]: RedirectNavItem[] } = {
  management: [
    {
      label: 'Departments',
      to: NAVIGATE_ROUTES.DEPARTMENTS,
      key: 'departments',
    },
    {
      label: 'Employees',
      to: NAVIGATE_ROUTES.EMPLOYEES,
      key: 'employees',
    },
  ],
  admin: [
    {
      label: 'Users',
      to: NAVIGATE_ROUTES.USERS,
      key: 'users',
    },
    {
      label: 'Roles',
      to: NAVIGATE_ROUTES.ROLES,
      key: 'roles',
    },
  ],
}
