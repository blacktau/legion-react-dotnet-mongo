import { call, put, takeEvery, take } from 'redux-saga/effects'

import { uploadPhotograph, POST_PHOTOGRAPHS } from '../actions'

import { createUploadFileChannel } from '../utils/fetchUtils'

function * initialisePhotographUpload ({ files }) {
  const uploads = []
  for (let i = 0, ln = files.length; i < ln; ++i) {
    uploads[i] = {
      key: files[i].name,
      name: files[i].name,
      progress: null,
      error: null,
      success: false
    }
  }

  yield put(uploadPhotograph.initialised(uploads))
  for (let i = 0, ln = files.length; i < ln; ++i) {
    yield put(uploadPhotograph.request(files[i]))
  }
}

function * uploadPhotographSaga ({ file }) {
  const channel = yield call(createUploadFileChannel, '/api/photograph/', file)
  while (true) {
    const { progress = 0, error, success } = yield take(channel)

    if (error) {
      yield put(uploadPhotograph.failure(file.name, error))
      return
    }

    if (success) {
      yield put(uploadPhotograph.success(file.name))
      return
    }

    yield put(uploadPhotograph.progress(file.name, progress))
  }
}

export function * UploadPhotographSaga () {
  yield takeEvery(POST_PHOTOGRAPHS.REQUEST, uploadPhotographSaga)
  yield takeEvery(POST_PHOTOGRAPHS.INITIALISE, initialisePhotographUpload)
}
