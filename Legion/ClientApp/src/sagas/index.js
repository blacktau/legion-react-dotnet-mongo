import { AuthenticationSaga } from './AuthenticationSaga'
import { UploadPhotographSaga } from './UploadPhotographSaga'
import { ChangePasswordSaga } from './ChangePasswordSaga'
import { GetPhotographListSaga } from './GetPhotographListSaga'

import { fork, all } from 'redux-saga/effects'

export default function * rootSaga () {
  yield all([
    fork(AuthenticationSaga),
    fork(UploadPhotographSaga),
    fork(ChangePasswordSaga),
    fork(GetPhotographListSaga)
  ])
}
