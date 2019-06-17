const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const CLEAR_ERROR = 'CLEAR_ERROR'
const PROGRESS = 'PROGRESS'
const INITIALISE = 'INITIALISE'
const INITIALISED = 'INITIALISED'
const ACKNOWLEDGED = 'ACKNOWLEDGED'
const RESET = 'RESET'

const createRequestTypes = (base, extras = []) => {
  return [REQUEST, SUCCESS, FAILURE, ...extras].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

const action = (type, payload = {}) => {
  return { type, ...payload }
}

export const AUTH = createRequestTypes('AUTH', [CLEAR_ERROR])
export const LOGOUT = createRequestTypes('LOGOUT')
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD', [CLEAR_ERROR, ACKNOWLEDGED])
export const GET_PHOTOGRAPHS_LIST = createRequestTypes('GET_PHOTOGRAPHS_LIST')
export const POST_PHOTOGRAPHS = createRequestTypes('POST_PHOTOGRAPHS', [PROGRESS, INITIALISE, INITIALISED, RESET])

export const authorise = {
  request: (username, password) => action(AUTH[REQUEST], { username, password }),
  success: (token) => action(AUTH[SUCCESS], { token }),
  failure: (error) => action(AUTH[FAILURE], { error }),
  clearError: () => action(AUTH[CLEAR_ERROR])
}

export const logout = {
  request: () => action(LOGOUT[REQUEST]),
  success: () => action(LOGOUT[SUCCESS])
}

export const listPhotographs = {
  request: () => action(GET_PHOTOGRAPHS_LIST[REQUEST]),
  success: (photographs) => action(GET_PHOTOGRAPHS_LIST[SUCCESS], { photographs }),
  failure: (error) => action(GET_PHOTOGRAPHS_LIST[FAILURE], { error })
}

export const uploadPhotograph = {
  request: (file) => action(POST_PHOTOGRAPHS[REQUEST], { file }),
  success: (filename) => action(POST_PHOTOGRAPHS[SUCCESS], { filename }),
  failure: (filename, error) => action(POST_PHOTOGRAPHS[FAILURE], { filename, error }),
  progress: (filename, progress) => action(POST_PHOTOGRAPHS[PROGRESS], { filename, progress }),
  initialise: (files) => action(POST_PHOTOGRAPHS[INITIALISE], { files }),
  initialised: (uploads) => action(POST_PHOTOGRAPHS[INITIALISED], { uploads }),
  reset: () => action(POST_PHOTOGRAPHS[RESET])
}

export const changePassword = {
  request: (currentPassword, newPassword, repeatedNewPassword) => action(CHANGE_PASSWORD[REQUEST], { currentPassword, newPassword, repeatedNewPassword }),
  success: () => action(CHANGE_PASSWORD[SUCCESS]),
  failure: (error) => action(CHANGE_PASSWORD[FAILURE], { error }),
  clearError: () => action(CHANGE_PASSWORD[CLEAR_ERROR]),
  changeAcknowledged: () => action(CHANGE_PASSWORD[ACKNOWLEDGED])
}
