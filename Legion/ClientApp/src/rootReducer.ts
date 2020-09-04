import { combineReducers } from '@reduxjs/toolkit'
import AuthenticationSlice from 'features/authentication/AuthenticationSlice'
import ManagePhotographsSlice from 'features/managePhotographs/ManagePhotographsSlice'
import UploadPhotographsSlice from 'features/uploadPhotographs/UploadPhotographsSlice'
import PhotoWallSlice from 'features/photowall/PhotowallSlice'

const rootReducer = combineReducers({
  authentication: AuthenticationSlice,
  managePhotographs: ManagePhotographsSlice,
  uploadPhotographs: UploadPhotographsSlice,
  photoWall: PhotoWallSlice
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
