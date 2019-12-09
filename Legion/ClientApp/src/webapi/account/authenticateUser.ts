import client, { RequestError } from '../api-client'
import { TOKEN_NAME } from '../../constants'
import { User } from '../../types/User'

type AuthenticateUserResponse = {
  username?: string
  firstname?: string
  lastname?: string
  token: string
}

const handleAuthenticateUserResponse = ({ token, ...user }: AuthenticateUserResponse) => {
  sessionStorage.setItem(TOKEN_NAME, token)
  return user as User
}

const handleAuthenticateUserError = (error: any) => {
  let message
  switch (error.errorCode) {
    case 500:
      message = 'Internal Server Error'
      break
    case 401:
      message = 'Invalid Credentials'
      break
    default:
      message = error.message
      break
  }

  throw new RequestError(error.errorCode, message)
}

const authenticateUser = async (username: string, password: string) => {
  try {
    const result = await client<AuthenticateUserResponse>('account/authenticateUser', { input: { username, password } })
    return handleAuthenticateUserResponse(result)
  } catch (error) {
    return handleAuthenticateUserError(error)
  }
}

export { authenticateUser }
