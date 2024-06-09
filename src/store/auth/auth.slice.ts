import { AuthUser } from '@/api/@types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Status = 'idle' | 'loading' | 'success' | 'error'

type AuthState = {
  status: Status
  user: AuthUser | null
  error: string | null
}

const initialState: AuthState = {
  status: 'idle',
  user: null,
  error: null,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload
    },
    setAuth: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setStatus, setAuth, setError } = authSlice.actions

export default authSlice.reducer
