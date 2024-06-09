import { AxiosResponse } from 'axios'

export type AuthUser = {
  user_id: string
  role: string
  email: string
}

export type AuthRequest = {
  email: string
  password: string
}

export type AuthResponse = {
  user: AuthUser
}

export type AxiosAuthResponse = AxiosResponse<AuthResponse>
