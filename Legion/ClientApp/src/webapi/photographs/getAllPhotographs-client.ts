import client, { RequestError } from '../api-client'
import { Photograph } from '../../types/Photograph'

type GetAllPhotographsResponse = Array<Photograph>

const handleGetAllPhotographsError = (error: any) => {
  let message = error.innerError ? error.innerError.message : error.message
  let code = error.innerError ? error.innerError.errorCode : error.errorCode
  throw new RequestError(code, message)
}

const getAllPhotographs = async () => {
  try {
    return await client<GetAllPhotographsResponse>('photograph/')
  } catch (error) {
    return handleGetAllPhotographsError(error)
  }
}

export { getAllPhotographs }