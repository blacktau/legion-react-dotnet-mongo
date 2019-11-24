import { AuthenticationStoreState } from '../store/AuthenticationStore'
import { UploadPhotographStoreState } from '../store/UploadPhotographStore'
import { FileUpload } from '../types/FileUpload'
import { TOKEN_NAME } from '../constants'
import { ManagePhotographState } from '../store/ManagePhotographsStore'
import { Photograph } from '../types/Photograph'

type GlobalState = {
  authentication: AuthenticationStoreState
  uploadPhotograph: UploadPhotographStoreState
  managePhotographs: ManagePhotographState
}

export const isAuthenticated = (): boolean => !!sessionStorage.getItem(TOKEN_NAME)

export const getUploadingPhotographs = ({ uploadPhotograph }: GlobalState): FileUpload[] => uploadPhotograph.uploads

export const getPhotographsToManage = ({ managePhotographs }: GlobalState): Photograph[] | undefined => managePhotographs.photographs
