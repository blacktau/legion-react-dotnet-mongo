import { AuthenticationStoreState } from '../store/AuthenticationStore'
import { UploadPhotographStoreState } from '../store/UploadPhotographStore'
import { FileUpload } from '../types/FileUpload'
import { TOKEN_NAME } from '../constants'

type GlobalState = {
  authentication: AuthenticationStoreState
  uploadPhotograph: UploadPhotographStoreState
}

export const isAuthenticated = (): boolean => !!sessionStorage.getItem(TOKEN_NAME)

export const getUploadingPhotographs = ({ uploadPhotograph }: GlobalState): FileUpload[] => uploadPhotograph.uploads
