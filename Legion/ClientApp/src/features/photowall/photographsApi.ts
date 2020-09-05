import { RequestError } from 'types/RequestError'
import Keyword from 'types/Keyword'
import Axios from 'axios'

const handleError = (error: any) => {
  throw new RequestError(
    error.response ? error.response.status : -1,
    error.message,
    error.response ? error.response.statusText : 'Unknown Error'
  )
}

const getPublishedPhotographs = async () => {
  try {
    const result = await Axios.get('/api/photograph/published')
    return result.data
  } catch (error) {
    return handleError(error)
  }
}

const getAllKeywords = async () => {
  try {
    const result = await Axios.get('/api/keyword/published')
    return result.data
  } catch (error) {
    return handleError(error)
  }
}

export { getPublishedPhotographs, getAllKeywords }
