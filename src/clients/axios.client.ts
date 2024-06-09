import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_CLIENT_URL,
  withCredentials: true,
  timeout: 10000,
})

axiosClient.interceptors.request.use(
  (config: AdaptAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  (error) => Promise.reject(error),
)

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const accessToken = response.headers['authorization']

    if (accessToken) localStorage.setItem('accessToken', accessToken)

    return response
  },
  async (error) => Promise.reject(error.response.data.error),
)
