import { User } from 'types/User'
import { RequestError } from 'types/RequestError'
import Axios from 'axios'

interface AuthenticateUserResponse {
  username?: string
  firstname?: string
  lastname?: string
  token: string
}

const handleAuthenticateUserResponse = ({ token, ...user }: AuthenticateUserResponse) => {
  Axios.defaults.headers.common.Authorization = `Bearer ${token}`
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

  throw new RequestError(
    error.response ? error.response.status : -1,
    message,
    error.response ? error.response.statusText : 'Unknown Error'
  )
}

const authenticateUser = async (username: string, password: string) => {
  try {
    const result = await Axios.post('/api/account/authenticateUser', { username, password })
    return handleAuthenticateUserResponse(result.data)
  } catch (error) {
    return handleAuthenticateUserError(error)
  }
}

export { authenticateUser }
