/* global sessionStorage */

import { AUTH, LOGOUT } from '../actions'

import { TOKEN_NAME } from '../constants'

const initialState = {
  token: sessionStorage.getItem(TOKEN_NAME),
  error: null,
  authenticating: false
}

export const reducer = (state = initialState, thingy) => {
  const { type } = thingy

  switch (type) {
    case AUTH.REQUEST: {
      return { ...state, authenticating: true, error: null }
    }

    case AUTH.SUCCESS: {
      return { ...state, token: thingy.token, authenticating: false, error: null }
    }

    case AUTH.FAILURE: {
      return { ...state, error: thingy.error, authenticating: false }
    }

    case AUTH.CLEAR_ERROR: {
      return { ...state, authenticating: false, error: null }
    }

    case LOGOUT.SUCCESS: {
      return { ...state, authenticating: false, token: null, error: null }
    }

    default:
      return state
  }
}
