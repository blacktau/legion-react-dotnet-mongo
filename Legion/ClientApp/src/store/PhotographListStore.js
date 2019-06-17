import {GET_PHOTOGRAPHS_LIST} from '../actions'

const initialState = {
  photographs: [],
  requesting: false,
  error: null
}

export const reducer = (state = initialState, { type, photographs }) => {
  switch (type) {
    case GET_PHOTOGRAPHS_LIST.REQUEST: {
      return { ...state, requesting: true, error: null }
    }

    case GET_PHOTOGRAPHS_LIST.SUCCESS: {
      return { ...state, requesting: false, photographs: photographs }
    }
    default:
      return state
  }
}
