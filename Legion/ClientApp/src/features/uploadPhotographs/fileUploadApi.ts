import FileUpload, { UploadProgressUpdate } from 'types/FileUpload'
import Axios from 'axios'
import { updateUploadProgress } from './UploadPhotographsSlice'
import { Dispatch } from 'react'
import { PayloadAction } from '@reduxjs/toolkit'
import { RequestError } from 'types/RequestError'

export const uploadPhotograph = async (fileUpload: FileUpload, dispatch: Dispatch<PayloadAction<UploadProgressUpdate>>, file: File) => {
  const data = new FormData()
  data.append('file', file, fileUpload.name)

  const handleUploadProgress = (progressEvent: ProgressEvent<EventTarget>) => {
    if (progressEvent.lengthComputable) {
      const progress = progressEvent.loaded / progressEvent.total
      dispatch(updateUploadProgress({
        key: fileUpload.key,
        progress: progress
      }))
    }
  }

  try {
    await Axios.post('/api/photograph/', data, {
      onUploadProgress: handleUploadProgress
    })

    dispatch(updateUploadProgress({
      key: fileUpload.key,
      progress: 1.0,
      success: true
    }))
  } catch (error) {
    const requestError = new RequestError(
      error.response ? error.response.status : -1,
      error.message,
      error.response ? error.response.statusText : 'Unknown Error'
    )

    dispatch(updateUploadProgress({
      key: fileUpload.key,
      progress: 0,
      success: false,
      error: requestError
    }))
  }
}
