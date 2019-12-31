import client, { RequestError } from '../api-client'
import { Photograph } from '../../types/Photograph'

type SavePhotographResponse = Photograph

const handleGetPhotographError = (error: any) => {
  const message = error.innerError ? error.innerError.message : error.message
  const code = error.innerError ? error.innerError.errorCode : error.errorCode
  throw new RequestError(code, message)
}

const savePhotograph = async (photograph: Photograph) => {
  try {
    return await client<SavePhotographResponse>(`photograph/${photograph.id}/`, { input: photograph, method: 'PATCH' })
  } catch (error) {
    return handleGetPhotographError(error)
  }
}

export { savePhotograph }
