import { AxiosError, AxiosResponse } from 'axios'

export type ApiError = {
  error: string
}

export type SuccessResponseMessage = {
  message: string
}

export type TableMetaData = {
  createdAt: Date
  updatedAt: Date
}

export type AxiosResponseSuccessMessage = AxiosResponse<SuccessResponseMessage>
export type AxiosErrorApi = AxiosError<ApiError>
