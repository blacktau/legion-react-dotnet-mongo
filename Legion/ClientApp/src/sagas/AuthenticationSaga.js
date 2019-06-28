/* global sessionStorage */

import { call, put, takeLatest } from 'redux-saga/effects'

import { TOKEN_NAME } from '../constants'

import { authorise, logout, AUTH, LOGOUT } from '../actions'

import { fetchJSON } from '../utils/fetchUtils'

function * authoriseHook ({ username, password }) {
  const options = {
    body: JSON.stringify({ username, password }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }

  try {
    const { token } = yield call(fetchJSON, '/api/account/login', options)
    yield put(authorise.success(token))
    sessionStorage.setItem(TOKEN_NAME, token)
  } catch (error) {
    let message
    switch (error.status) {
      case 500:
        message = 'Internal Server Error'
        break
      case 401:
        message = 'Invalid Credentials'
        break
      default:
        message = error.statusText
        console.error(error)
        break
    }

    yield put(authorise.failure(message))
  }
}

function * logoutHook () {
  sessionStorage.removeItem(TOKEN_NAME)
  yield put(logout.success())
}

export function * AuthenticationSaga () {
  yield takeLatest(AUTH.REQUEST, authoriseHook)
  yield takeLatest(LOGOUT.REQUEST, logoutHook)
}
