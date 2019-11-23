/* eslint-disable @typescript-eslint/no-unused-vars */
/* global */

import { POST_PHOTOGRAPHS } from '../actions/uploadPhotographsActions'
import { FileUpload } from '../types/FileUpload'
import { Action } from 'redux'

export type UploadPhotographStoreState = {
  uploads: Array<FileUpload>
}

export type InitialisePhotographUpload = {
  uploads: FileUpload[]
}

export type UploadPhotographUpdateAction = {
  upload: FileUpload
}

export type UploadPhotographProgressAction = {
  progress: number
} & UploadPhotographUpdateAction

export type UploadPhotographErrorAction = {
  error: string
} & UploadPhotographUpdateAction

export const initialState: UploadPhotographStoreState = {
  uploads: new Array<FileUpload>()
}

export const reducer = (state: UploadPhotographStoreState = initialState, action: (InitialisePhotographUpload | UploadPhotographProgressAction | UploadPhotographErrorAction) & Action<string>): UploadPhotographStoreState => {
  const { type } = action

  switch (type) {
    case POST_PHOTOGRAPHS.INITIALISED: {
      const { uploads } = action as InitialisePhotographUpload
      return { ...state, uploads: uploads }
    }

    case POST_PHOTOGRAPHS.REQUEST: {
      const { upload } = action as UploadPhotographUpdateAction

      return {
        ...state,
        uploads: state.uploads.map((uploadEntry, _i) => (uploadEntry.key === upload.key ? { ...uploadEntry, progress: 0.01 } : uploadEntry))
      }
    }

    case POST_PHOTOGRAPHS.SUCCESS: {
      const { upload } = action as UploadPhotographUpdateAction
      return {
        ...state,
        uploads: state.uploads.map((uploadEntry, _i) => (uploadEntry.key === upload.key ? { ...uploadEntry, success: true } : uploadEntry))
      }
    }

    case POST_PHOTOGRAPHS.FAILURE: {
      const { upload, error } = action as UploadPhotographErrorAction
      return {
        ...state,
        uploads: state.uploads.map((uploadEntry, _i) => (uploadEntry.key === upload.key ? { ...uploadEntry, success: false, error: error } : uploadEntry))
      }
    }

    case POST_PHOTOGRAPHS.PROGRESS: {
      const { upload, progress } = action as UploadPhotographProgressAction
      return {
        ...state,
        uploads: state.uploads.map((uploadEntry: FileUpload) => (uploadEntry.key === upload.key ? { ...uploadEntry, progress: progress * 100 } : uploadEntry))
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
