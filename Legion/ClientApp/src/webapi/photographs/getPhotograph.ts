import client, { RequestError } from '../api-client'
import { Photograph } from '../../types/Photograph'

type GetPhotographResponse = Photograph

const handleGetPhotographError = (error: any) => {
  const message = error.innerError ? error.innerError.message : error.message
  const code = error.innerError ? error.innerError.errorCode : error.errorCode
  throw new RequestError(code, message)
}

const getPhotograph = async (photographId: string) => {
  try {
    return await client<GetPhotographResponse>(`photograph/${photographId}/`)
  } catch (error) {
    return handleGetPhotographError(error)
  }
}

export { getPhotograph }
