import client, { RequestError } from '../api-client'

const handleChangePasswordError = (error: RequestError) => {
  let message = error.innerError ? error.innerError.message : error.message
  let code = error.innerError ? error.innerError.errorCode : error.errorCode

  switch (error.errorCode) {
    case 500:
      message = 'Internal Server Error'
      break
  }

  throw new RequestError(code, message)
}

const changePassword = async (currentPassword: string, newPassword: string, repeatedNewPassword: string) => {
  try {
    await client<void>('account/changePassword', { input: { currentPassword, newPassword, repeatedNewPassword }, method: 'PUT' })
  } catch (error) {
    return handleChangePasswordError(error)
  }
}

export { changePassword }
