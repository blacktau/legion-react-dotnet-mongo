
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import FileUpload, { UploadProgressUpdate } from 'types/FileUpload'
import { RootState } from 'rootReducer'

export interface UploadPhotographState {
  uploads: FileUpload[]
}

const initialState: UploadPhotographState = {
  uploads: []
}

const uploadPhotographsSlice = createSlice({
  name: 'uploadPhotographs',
  initialState: initialState,
  reducers: {
    initializeUploads: (state, action: PayloadAction<FileUpload[]>) => ({
      ...state,
      uploads: action.payload
    }),

    updateUploadProgress: (state, action: PayloadAction<UploadProgressUpdate>) => ({
      ...state,
      uploads: state.uploads.map(
        (uploadEntry: FileUpload) =>
          (uploadEntry.key === action.payload.key
            ? {
                ...uploadEntry,
                progress: action.payload.progress * 100,
                success: action.payload.progress === 1,
                error: action.payload.error
              }
            : uploadEntry)
      )
    }),

    resetUploads: (state) => ({
      ...state,
      uploads: []
    })
  }
})

export const selectUploads = (state: RootState) => state.uploadPhotographs.uploads

export const { initializeUploads, updateUploadProgress, resetUploads } = uploadPhotographsSlice.actions

export default uploadPhotographsSlice.reducer
