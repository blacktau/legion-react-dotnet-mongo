import Axios from 'axios'
import { handleError } from 'app/apiCommon'

const getPublishedPhotographs = async () => {
  try {
    const result = await Axios.get('/api/photograph/published')
    return result.data
  } catch (error) {
    return handleError(error)
  }
}

const getAllPublishedKeywords = async () => {
  try {
    const result = await Axios.get('/api/keyword/published')
    return result.data
  } catch (error) {
    return handleError(error)
  }
}

export { getPublishedPhotographs, getAllPublishedKeywords }
