import { RequestError } from '../../types/RequestError'
import Axios from 'axios'

const changePassword = async (currentPassword: string, newPassword: string, repeatedNewPassword: string) => {
  try {
    await Axios.put('api/account/changePassword', { currentPassword, newPassword, repeatedNewPassword })
  } catch (error) {
    throw new RequestError(
      error.response ? error.response.status : -1,
      error.message,
      error.response ? error.response.statusText : 'Unknown Error'
    )
  }
}

export { changePassword }
