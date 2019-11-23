import { createAction } from './createAction'
import { createActionTypes } from './createRequestActions'
import { PROGRESS, INITIALISED, RESET, SUCCESS, FAILURE } from './actionConstants'
import { Action } from 'redux'
import { FileUpload } from '../types/FileUpload'
import { InitialisePhotographUpload, UploadPhotographErrorAction, UploadPhotographProgressAction, UploadPhotographUpdateAction } from '../store/UploadPhotographStore'

export const POST_PHOTOGRAPHS = createActionTypes('POST_PHOTOGRAPHS', [PROGRESS, INITIALISED, RESET])

export const uploadPhotographActions = {
  initialiseAll: (uploads: FileUpload[]): Action<string> => createAction<InitialisePhotographUpload>(POST_PHOTOGRAPHS[INITIALISED], { uploads }),
  updateProgress: (fileUpload: FileUpload, progress: number): Action<string> => createAction<UploadPhotographProgressAction>(POST_PHOTOGRAPHS[PROGRESS], { upload: fileUpload, progress: progress }),
  error: (upload: FileUpload, error: string): Action<string> => createAction<UploadPhotographErrorAction>(POST_PHOTOGRAPHS[FAILURE], { upload, error }),
  success: (fileUpload: FileUpload): Action<string> => createAction<UploadPhotographUpdateAction>(POST_PHOTOGRAPHS[SUCCESS], { upload: fileUpload }),
  reset: (): Action<string> => createAction(POST_PHOTOGRAPHS[RESET], {})
}
