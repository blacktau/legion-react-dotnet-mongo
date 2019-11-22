import { AUTH } from '../actions/authoriseActions'
import { LOGOUT } from '../actions/logoutActions'

import { TOKEN_NAME } from '../constants'
import { User } from '../types/User'

export type AuthenticationStoreState = {
  user?: User
}

export type AuthenticationRequestAction = {
  type: string
  username?: string
  password?: string
}

export type AuthenticationResultAction = {
  type: string
  user?: User
}

export const authenticationInitialState: AuthenticationStoreState = {
  user: undefined
}

export const authenticationReducer = (state: AuthenticationStoreState = authenticationInitialState, action: AuthenticationRequestAction | AuthenticationResultAction): AuthenticationStoreState => {
  const { type } = action

  switch (type) {
    case AUTH.REQUEST: {
      return { ...state }
    }

    case AUTH.SUCCESS: {
      const resultAction: AuthenticationResultAction = action
      const result = {
        ...state,
        user: resultAction.user
      }
      console.log(result)
      return result
    }

    case LOGOUT.REQUEST: {
      sessionStorage.removeItem(TOKEN_NAME)
      return { ...state, user: undefined }
    }

    default:
      return state
  }
}
