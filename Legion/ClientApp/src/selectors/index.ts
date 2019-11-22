import { AuthenticationStoreState } from '../store/AuthenticationStore'
import { UploadPhotographStoreState } from '../store/UploadPhotographStore'
import { UploadProgressItem } from '../types/UploadProgressItem'
import { TOKEN_NAME } from '../constants'

type GlobalState = {
  authentication: AuthenticationStoreState
  uploadPhotograph: UploadPhotographStoreState
}

export const getToken = (): string | null => sessionStorage.getItem(TOKEN_NAME)
export const isAuthenticated = (): boolean => !!sessionStorage.getItem(TOKEN_NAME)

export const getUploadingPhotographs = ({ uploadPhotograph }: GlobalState): UploadProgressItem[] => uploadPhotograph.uploads
