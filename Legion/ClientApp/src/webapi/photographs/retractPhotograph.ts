import client, { RequestError } from '../api-client'
import { Photograph } from '../../types/Photograph'

type RetractPhotographResponse = Photograph

const handleRetractPhotographError = (error: RequestError) => {
  const message = error.innerError ? error.innerError.message : error.message
  const code = error.innerError ? error.innerError.errorCode : error.errorCode
  throw new RequestError(code, message)
}

const retractPhotograph = async (photograph: Photograph) => {
  try {
    return await client<RetractPhotographResponse>(`photograph/${photograph.id}/retract`, { method: 'PATCH' })
  } catch (error) {
    return handleRetractPhotographError(error)
  }
}

export { retractPhotograph }
