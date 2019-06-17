
import { call, put, takeLatest } from 'redux-saga/effects'

import { changePassword, CHANGE_PASSWORD } from '../actions'

import { fetchJSON } from '../utils/fetchUtils'

function * changePasswordHook ({ currentPassword, newPassword, repeatedNewPassword }) {
  const options = {
    body: JSON.stringify({ currentPassword, newPassword, repeatedNewPassword }),
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }

  try {
    yield call(fetchJSON, '/api/auth/changePassword', options)
    yield put(changePassword.success())
  } catch (errorResponse) {
    let message

    switch (errorResponse.status) {
      case 409:
      case 422:
        message = yield new Promise(resolve => { errorResponse.json().then(error => resolve(error.error)) })
        break

      default:
        console.error(errorResponse)
        message = errorResponse.statusText
    }

    yield put(changePassword.failure(message))
  }
}

export function * ChangePasswordSaga () {
  yield takeLatest(CHANGE_PASSWORD.REQUEST, changePasswordHook)
}
