import { RequestError } from './RequestError'

export default interface FileUpload {
  key: string
  progress: number
  success: boolean
  error?: RequestError
  name: string
}

export interface UploadProgressUpdate {
  key: string
  progress: number
  error?: RequestError
  success?: boolean
}
