import { Photograph } from '../types/Photograph'
import { createActionTypes } from './createRequestActions'
import { createAction } from './createAction'
import { REQUEST, SUCCESS, FAILURE } from './actionConstants'
import { Action } from 'redux'
import { RequestError } from '../webapi/api-client'

const GET_PUBLISHED_PHOTOGRAPHS = createActionTypes('GET_PUBLISHED_PHOTOGRAPHS')

const getPublishedPhotographsActions = {
  request: (): Action<string> => createAction(GET_PUBLISHED_PHOTOGRAPHS[REQUEST]),
  success: (photographs: Array<Photograph>): Action<string> => createAction(GET_PUBLISHED_PHOTOGRAPHS[SUCCESS], { photographs }),
  failure: (error: RequestError): Action<string> => createAction(GET_PUBLISHED_PHOTOGRAPHS[FAILURE], { error })
}

export { GET_PUBLISHED_PHOTOGRAPHS, getPublishedPhotographsActions }
