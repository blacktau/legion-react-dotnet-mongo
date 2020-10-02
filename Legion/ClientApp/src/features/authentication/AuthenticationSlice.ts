
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { User } from '../../types/User'
import { RootState } from 'rootReducer'
import Axios from 'axios'
import { authenticationApi } from './authenticateUserApi'

export interface AuthenticationState {
  user?: User
  inProgress: boolean
  error?: SerializedError
}

export const authenticateUser = createAsyncThunk<User, [string, string]>(
  'authenticationSlice/authenticateUser',
  async ([username, password], { dispatch }) => {
    dispatch(clearAuthenticationError)
    const user: User = await authenticationApi.authenticateUser(username, password)
    return user
  })

export const authenticationInitialState: AuthenticationState = {
  user: undefined,
  inProgress: false
}

const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState: authenticationInitialState,
  reducers: {
    clearAuthenticationError: (state, action) => {
      return ({
        ...state,
        error: undefined
      })
    },
    loggedIn: (state, action: PayloadAction<User>) => ({
      ...state,
      user: action.payload
    }),
    logout: (state) => {
      Axios.defaults.headers.common.Authorization = undefined

      return {
        ...state,
        user: undefined
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(authenticateUser.pending, (state, action) => ({
      ...state,
      inProgress: true,
      error: undefined
    }))

    builder.addCase(authenticateUser.rejected, (state, action) => {
      console.log(action)
      return {
        ...state,
        inProgress: false,
        error: action.error
      }
    })
  }
})

export const isAuthenticated = (state: RootState) => !!Axios.defaults.headers.common.Authorization

export const authenticationInProgress = (state: RootState) => state.authentication.inProgress

export const authenticationError = (state: RootState) => state.authentication.error

export const { loggedIn, logout, clearAuthenticationError } = authenticationSlice.actions

export default authenticationSlice.reducer
