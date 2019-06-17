/* global fetch sessionStorage XMLHttpRequest FormData */

import { TOKEN_NAME } from '../constants'
import { eventChannel, buffers, END } from 'redux-saga'

export const fetchJSON = (url, options = {}) =>
  new Promise((resolve, reject) => {
    if (!options.headers) {
      options.headers = {}
    }

    const token = sessionStorage.getItem(TOKEN_NAME)
    if (token) {
      options.headers['Authorization'] = 'Bearer ' + token
    }

    return fetch(url, options)
      .then(response => response.status !== 200 ? reject(response) : response)
      .then(response => {
        let contentType = response.headers.get('content-type')
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json()
        }
      })
      .then(response => resolve(response))
      .catch(error => reject(error))
  })

export const createUploadFileChannel = (endpoint, file) => {
  return eventChannel(emitter => {
    const xhr = new XMLHttpRequest()

    const onProgress = (e) => {
      if (e.lengthComputable) {
        const progress = e.loaded / e.total
        emitter({ progress })
      }
    }

    const onFailure = (e) => {
      sendError(e.toString())
    }

    const sendError = (message) => {
      emitter({ error: ' Upload failed: ' + message })
      emitter(END)
    }

    xhr.upload.addEventListener('progress', onProgress)
    xhr.upload.addEventListener('error', onFailure)
    xhr.upload.addEventListener('abort', onFailure)
    xhr.onreadystatechange = () => {
      const { readyState, status, statusText } = xhr
      if (readyState === 4) {
        if (status === 200) {
          emitter({success: true})
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

    // xhr.setRequestHeader('Content-Type', 'multipart/form-data')

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
