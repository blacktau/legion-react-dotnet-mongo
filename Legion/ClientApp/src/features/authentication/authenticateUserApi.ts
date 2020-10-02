import { User } from 'types/User'
import Axios from 'axios'
import { RequestError } from 'types/RequestError'

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
  console.log(error)

  let message
  switch (error.status) {
    case 500:
      message = 'Internal Server Error'
      break
    case 401:
      message = 'Invalid Credentials'
      break
    default:
      message = error.response?.data ?? error.message
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

export const authenticationApi = { authenticateUser }
