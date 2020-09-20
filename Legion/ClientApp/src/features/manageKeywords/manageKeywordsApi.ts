import { handleError } from 'app/apiCommon'
import Axios from 'axios'

const getAllKeywords = async () => {
  try {
    const result = await Axios.get('/api/keyword/published')
    return result.data
  } catch (error) {
    return handleError(error)
  }
}

export { getAllKeywords }
