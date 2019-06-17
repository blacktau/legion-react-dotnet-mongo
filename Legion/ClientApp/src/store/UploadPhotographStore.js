/* global */

import { POST_PHOTOGRAPHS } from '../actions'

const initialState = {
  uploads: null
}

export const reducer = (state = initialState, payload) => {
  const { type } = payload

  switch (type) {
    case POST_PHOTOGRAPHS.INITIALISED: {
      const nextState = {...state}
      const { uploads } = payload
      nextState.uploads = uploads
      return nextState
    }

    case POST_PHOTOGRAPHS.REQUEST: {
      const { file } = payload

      return {
        ...state,
        uploads: state.uploads.map(
          (upload, i) => upload.name === file.name ? { ...upload, progress: 0.01 } : upload
        )
      }
    }

    case POST_PHOTOGRAPHS.SUCCESS: {
      const { filename } = payload
      return {
        ...state,
        uploads: state.uploads.map(
          (upload, i) => upload.name === filename ? { ...upload, success: true } : upload
        )
      }
    }

    case POST_PHOTOGRAPHS.FAILURE: {
      const { filename, error } = payload
      return {
        ...state,
        uploads: state.uploads.map(
          (upload, i) => upload.name === filename ? { ...upload, success: false, error: error } : upload
        )
      }
    }

    case POST_PHOTOGRAPHS.PROGRESS: {
      const { filename, progress } = payload
      return {
        ...state,
        uploads: state.uploads.map(
          (upload, i) => upload.name === filename ? { ...upload, progress: (progress * 100) } : upload
        )
      }
    }

    case POST_PHOTOGRAPHS.RESET: {
      return {
        ...state,
        uploads: null
      }
    }
    default:
      return state
  }
}
