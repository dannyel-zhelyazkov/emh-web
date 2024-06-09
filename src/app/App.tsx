import { useEffect } from 'react'

import { AppRoutes } from '@/app'
import { axiosClient } from '@/clients'
import { NAVIGATE_ROUTES } from '@/common/constants'
import { useAppDispatch } from '@/hooks'
import { authAction, logoutAction } from '@/store/auth'
import { useNavigate } from 'react-router-dom'

export const App = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const interceptor = axiosClient.interceptors.response.use(
      (value) => value,
      (error) => {
        if (error === 'Access Denied. No refresh token provided.') {
          dispatch(logoutAction())
          navigate(NAVIGATE_ROUTES.LOGIN)
        }

        return error
      },
    )

    return () => axiosClient.interceptors.response.eject(interceptor)
  }, [])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) return

    dispatch(authAction({ withToken: true }))
  }, [])

  return <AppRoutes />
}
