import {
  AuthRequest,
  AuthResponse,
  AxiosAuthResponse,
  AxiosResponseSuccessMessage,
  SuccessResponseMessage,
} from '@/api/@types'
import { AxiosInstance, AxiosResponse } from 'axios'

export const AuthApi = (client: AxiosInstance) => {
  const AUTH_BASE_URL = '/auth'

  const authenticate = async (request: AuthRequest): Promise<AuthResponse> => {
    const response = await client.post<AxiosResponse, AxiosAuthResponse>(
      `${AUTH_BASE_URL}/login`,
      request,
    )

    return response.data
  }

  const tokenAuthentication = async (): Promise<AuthResponse> => {
    const response = await client.post<AxiosResponse, AxiosAuthResponse>(
      `${AUTH_BASE_URL}/token`,
    )
    return response.data
  }

  const logout = async (): Promise<SuccessResponseMessage> => {
    const response = await client.post<
      AxiosResponse,
      AxiosResponseSuccessMessage
    >(`${AUTH_BASE_URL}/logout`)

    return response.data
  }

  return { authenticate, tokenAuthentication, logout }
}
