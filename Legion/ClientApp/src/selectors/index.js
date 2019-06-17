export const getAuthenticationToken = ({ authentication }) => authentication.token

export const getAuthenticationError = ({ authentication }) => authentication.error

export const isAuthenticating = ({ authentication }) => authentication.authenticating

export const getUploadingPhotographs = (state) => state.uploadPhotograph.uploads

export const getChangePasswordError = ({ changePassword }) => changePassword.error

export const isChangingPassword = ({ changePassword }) => changePassword.changingPassword

export const isPasswordChanged = ({ changePassword }) => changePassword.passwordChanged

export const isRequestingPhotographs = ({ photographsList }) => photographsList.requesting

export const getPhotographsList = ({ photographsList }) => photographsList.photographs
