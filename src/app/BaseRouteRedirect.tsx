import { NAVIGATE_ROUTES } from '@/common/constants'
import { useAppSelector } from '@/hooks'
import { Navigate } from 'react-router-dom'

export const BaseRouteRedirect = () => {
  const user = useAppSelector((state) => state.auth.user)
  const loadingAuth = useAppSelector((state) => state.auth.status === 'loading')

  return !user && !loadingAuth ? (
    <Navigate to={NAVIGATE_ROUTES.LOGIN} replace />
  ) : (
    <Navigate to={NAVIGATE_ROUTES.APP} replace />
  )
}
