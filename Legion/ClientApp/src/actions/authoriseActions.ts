import { createAction } from './createAction'
import { createActionTypes } from './createRequestActions'
import { CLEAR_ERROR, SUCCESS } from './actionConstants'
import { Action } from 'redux'
import { User } from '../types/User'

export const AUTH = createActionTypes('AUTH', [CLEAR_ERROR])

export const authoriseActions = {
  success: (user: User): Action<string> => createAction(AUTH[SUCCESS], { user })
}
