/* eslint-disable @typescript-eslint/no-explicit-any */

import { TOKEN_NAME } from '../constants'
import { eventChannel, buffers, END, EventChannel } from 'redux-saga'

export const createUploadFileChannel = (endpoint: string, file: File): EventChannel<unknown> => {
  return eventChannel(emitter => {
    const xhr = new XMLHttpRequest()

    const onProgress = (e: ProgressEvent<XMLHttpRequestEventTarget>) => {
      if (e.lengthComputable) {
        const progress = e.loaded / e.total
        emitter({ progress })
      }
    }

    const sendError = (message: string) => {
      emitter({ error: ' Upload failed: ' + message })
      emitter(END)
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
          emitter({ success: true })
          emitter(END)
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
    formData.append('file', file, file.name)
    xhr.send(formData)

    return () => {
      xhr.upload.removeEventListener('progress', onProgress)
      xhr.upload.removeEventListener('error', onFailure)
      xhr.upload.removeEventListener('abort', onFailure)
      xhr.onreadystatechange = null
      xhr.abort()
    }
  }, buffers.sliding(2))
}
