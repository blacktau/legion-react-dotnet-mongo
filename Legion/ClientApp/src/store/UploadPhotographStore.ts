/* eslint-disable @typescript-eslint/no-unused-vars */
/* global */

import { POST_PHOTOGRAPHS } from '../actions/uploadPhotographsActions'
import { UploadProgressItem } from '../types/UploadProgressItem'
import { RequestError } from '../webapi/api-client'

export type UploadPhotographStoreState = {
  uploads: Array<UploadProgressItem>
}

export type UploadPhotographAction = {
  type: string
  file: File
  files: File[]
  filename: string
  error: RequestError
  progress: number
} & UploadPhotographStoreState

export const initialState: UploadPhotographStoreState = {
  uploads: new Array<UploadProgressItem>()
}

export const reducer = (state: UploadPhotographStoreState = initialState, action: UploadPhotographAction): UploadPhotographStoreState => {
  const { type } = action

  switch (type) {
    case POST_PHOTOGRAPHS.INITIALISED: {
      const nextState = { ...state }
      const { uploads } = action
      nextState.uploads = uploads
      return nextState
    }

    case POST_PHOTOGRAPHS.REQUEST: {
      const { file } = action

      return {
        ...state,
        uploads: state.uploads.map((upload, _i) => (upload.name === file.name ? { ...upload, progress: 0.01 } : upload))
      }
    }

    case POST_PHOTOGRAPHS.SUCCESS: {
      const { filename } = action
      return {
        ...state,
        uploads: state.uploads.map((upload, _i) => (upload.name === filename ? { ...upload, success: true } : upload))
      }
    }

    case POST_PHOTOGRAPHS.FAILURE: {
      const { filename, error } = action
      return {
        ...state,
        uploads: state.uploads.map((upload, _i) => (upload.name === filename ? { ...upload, success: false, error: error } : upload))
      }
    }

    case POST_PHOTOGRAPHS.PROGRESS: {
      const { filename, progress } = action
      return {
        ...state,
        uploads: state.uploads.map((upload, _i) => (upload.name === filename ? { ...upload, progress: progress * 100 } : upload))
      }
    }

    case POST_PHOTOGRAPHS.RESET: {
      return {
        ...state,
        uploads: []
      }
    }
    default:
      return state
  }
}
