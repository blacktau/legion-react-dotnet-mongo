/* eslint-disable @typescript-eslint/no-explicit-any */

import { TOKEN_NAME } from '../constants'
import { FileUpload } from '../types/FileUpload'
import { Dispatch } from 'redux'
import { uploadPhotographActions } from '../actions/uploadPhotographsActions'

export const uploadFile = (endpoint: string, file: FileUpload, dispatch: Dispatch<any>) => {
  const xhr = new XMLHttpRequest()

  const onProgress = (e: ProgressEvent<XMLHttpRequestEventTarget>) => {
    if (e.lengthComputable) {
      const progress = e.loaded / e.total
      dispatch(uploadPhotographActions.updateProgress(file, progress))
    }
  }

  const sendError = (message: string) => {
    dispatch(uploadPhotographActions.error(file, message))
  }

  const onFailure = (e: ProgressEvent<XMLHttpRequestEventTarget>) => {
    sendError(e.toString())
  }

  xhr.upload.addEventListener('progress', onProgress)
  xhr.upload.addEventListener('error', onFailure)
  xhr.upload.addEventListener('abort', onFailure)
  xhr.onreadystatechange = () => {
    const { readyState, status, statusText } = xhr
    if (readyState === 4) {
      if (status === 200) {
        dispatch(uploadPhotographActions.success(file))
      } else {
        sendError(statusText === '' ? 'Unknown Error' : statusText)
      }
    }
  }

  xhr.open('POST', endpoint, true)

  const token = sessionStorage.getItem(TOKEN_NAME)
  if (token) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
  }

  const formData = new FormData()
  formData.append('file', file.file, file.name)
  xhr.send(formData)

  return () => {
    xhr.upload.removeEventListener('progress', onProgress)
    xhr.upload.removeEventListener('error', onFailure)
    xhr.upload.removeEventListener('abort', onFailure)
    xhr.onreadystatechange = null
    xhr.abort()
  }
}
