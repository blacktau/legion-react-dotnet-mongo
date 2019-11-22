import { createActionTypes } from './createRequestActions'
import { createAction } from './createAction'
import { REQUEST, SUCCESS } from './actionConstants'
import { Action } from 'redux'

const LOGOUT = createActionTypes('LOGOUT')

const logoutActions = {
  request: (): Action<string> => createAction(LOGOUT[REQUEST]),
  success: (): Action<string> => createAction(LOGOUT[SUCCESS])
}

export { LOGOUT, logoutActions }
