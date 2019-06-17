import { CHANGE_PASSWORD } from '../actions'

const initialState = {
  error: null,
  changingPassword: false,
  passwordChanged: false
}

export const reducer = (state = initialState, thingy) => {
  const { type } = thingy

  switch (type) {
    case CHANGE_PASSWORD.REQUEST: {
      return { ...state, changingPassword: true, error: null }
    }

    case CHANGE_PASSWORD.SUCCESS: {
      return { ...state, changingPassword: false, error: null, passwordChanged: true }
    }

    case CHANGE_PASSWORD.FAILURE: {
      return { ...state, error: thingy.error, changingPassword: false }
    }

    case CHANGE_PASSWORD.CLEAR_ERROR: {
      return { ...state, changingPassword: false, error: null }
    }

    case CHANGE_PASSWORD.ACKNOWLEDGED: {
      return { ...state, passwordChanged: false }
    }

    default:
      return state
  }
}
