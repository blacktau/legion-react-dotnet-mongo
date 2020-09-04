
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/User'
import { RootState } from 'rootReducer'
import Axios from 'axios'

export interface AuthenticationState {
  user?: User
}

export const authenticationInitialState: AuthenticationState = {
  user: undefined
}

const authenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState: authenticationInitialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        user: action.payload
      }
    },
    logout: (state) => {
      Axios.defaults.headers.common.Authorization = undefined

      return {
        ...state,
        user: undefined
      }
    }
  }
})

export const isAuthenticated = (state: RootState) => {
  return !!Axios.defaults.headers.common.Authorization
}

export const { loggedIn, logout } = authenticationSlice.actions

export default authenticationSlice.reducer
