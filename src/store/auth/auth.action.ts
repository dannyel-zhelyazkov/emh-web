import { api } from '@/api'
import { AuthRequest, AxiosErrorApi } from '@/api/@types'
import { AppDispatch } from '@/store'
import { setAuth, setError, setStatus } from '@/store/auth/auth.slice.ts'

type AuthActionParams =
  | {
      withToken: false
      authData: AuthRequest
    }
  | {
      withToken: true
    }

export const authAction =
  (data: AuthActionParams) => async (dispatch: AppDispatch) => {
    dispatch(setStatus('loading'))

    try {
      const response = data.withToken
        ? await api.auth.tokenAuthentication()
        : await api.auth.authenticate({
            ...data.authData,
            email: data.authData.email + '@emh.com',
          })

      dispatch(setAuth(response.user))
      dispatch(setError(null))
      dispatch(setStatus('success'))
    } catch (e) {
      const error = e as AxiosErrorApi
      dispatch(setError(error.response?.data.error as string))
      dispatch(setStatus('error'))
    }
  }

export const logoutAction = () => async (dispatch: AppDispatch) => {
  dispatch(setStatus('loading'))

  try {
    await api.auth.logout()
    localStorage.removeItem('accessToken')
    dispatch(setAuth(null))
    dispatch(setStatus('success'))
  } catch (e) {
    const error = e as AxiosErrorApi
    dispatch(setError(error.response?.data.error as string))
    dispatch(setStatus('error'))
  }
}
