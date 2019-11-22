import client, { RequestError } from '../api-client'
import { Photograph } from '../../types/Photograph'

type GetPublishedPhotographsResponse = Array<Photograph>

const handleGetPublishedPhotographsError = (error: RequestError) => {
  let message = error.innerError ? error.innerError.message : error.message
  let code = error.innerError ? error.innerError.errorCode : error.errorCode
  throw new RequestError(code, message)
}

const getPublishedPhotographs = async () => {
  try {
    return await client<GetPublishedPhotographsResponse>('photograph/published')
  } catch (error) {
    return handleGetPublishedPhotographsError(error)
  }
}

export { getPublishedPhotographs }
