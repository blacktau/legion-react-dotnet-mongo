import { RequestError } from '../webapi/api-client'

export interface UploadProgressItem {
  key: string
  name: string
  progress: number
  success: boolean
  error?: RequestError
}
