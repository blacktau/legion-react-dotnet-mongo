import Axios from 'axios'
import { handleError } from 'app/apiCommon'

const changePassword = async (currentPassword: string, newPassword: string, repeatedNewPassword: string) => {
  try {
    await Axios.put('api/account/changePassword', { currentPassword, newPassword, repeatedNewPassword })
  } catch (error) {
    handleError(error)
  }
}

export { changePassword }
