import { createAction } from './createAction'
import { createActionTypes } from './createRequestActions'
import { PROGRESS, INITIALISE, INITIALISED, RESET, REQUEST, SUCCESS, FAILURE } from './actionConstants'
import { Action } from 'redux'
import { UploadProgressItem } from '../types/UploadProgressItem'
import { RequestError } from '../webapi/api-client'

export const POST_PHOTOGRAPHS = createActionTypes('POST_PHOTOGRAPHS', [PROGRESS, INITIALISE, INITIALISED, RESET])

export const uploadPhotographActions = {
  request: (file: File): Action<string> => createAction(POST_PHOTOGRAPHS[REQUEST], { file }),
  success: (filename: string): Action<string> => createAction(POST_PHOTOGRAPHS[SUCCESS], { filename }),
  failure: (filename: string, error: RequestError): Action<string> => createAction(POST_PHOTOGRAPHS[FAILURE], { filename, error }),
  progress: (filename: string, progress: number): Action<string> => createAction(POST_PHOTOGRAPHS[PROGRESS], { filename, progress }),
  initialise: (files: File[]): Action<string> => createAction(POST_PHOTOGRAPHS[INITIALISE], { files }),
  initialised: (uploads: UploadProgressItem[]): Action<string> => createAction(POST_PHOTOGRAPHS[INITIALISED], { uploads }),
  reset: (): Action<string> => createAction(POST_PHOTOGRAPHS[RESET])
}
