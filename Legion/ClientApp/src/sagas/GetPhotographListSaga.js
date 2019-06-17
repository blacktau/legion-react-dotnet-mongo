import { call, put, takeLatest } from 'redux-saga/effects'

import { GET_PHOTOGRAPHS_LIST, listPhotographs as photographsList } from '../actions'

import { fetchJSON } from '../utils/fetchUtils'

function * getAllPhotographs () {
  const options = {
    method: 'GET'
  }

  try {
    const photographs = yield call(fetchJSON, '/api/photograph/', options)
    console.log(photographs)
    yield put(photographsList.success(photographs))
  } catch (error) {
    let message
    switch (error.status) {
      case 500:
        message = 'Internal Server Error'
        break
      default:
        message = 'Something went wrong'
        break
    }
    yield put(photographsList.failure(message))
  }
}

export function * GetPhotographListSaga () {
  yield takeLatest(GET_PHOTOGRAPHS_LIST.REQUEST, getAllPhotographs)
}
