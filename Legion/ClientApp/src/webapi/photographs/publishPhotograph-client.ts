import client, { RequestError } from '../api-client'
import { Photograph } from '../../types/Photograph'

type PublishPhotographResponse = Photograph

const handlePublishPhotographError = (error: RequestError) => {
  const message = error.innerError ? error.innerError.message : error.message
  const code = error.innerError ? error.innerError.errorCode : error.errorCode
  throw new RequestError(code, message)
}

const publishPhotograph = async (photograph: Photograph) => {
  try {
    return await client<PublishPhotographResponse>(`photograph/${photograph.id}/publish`, { method: 'PATCH' })
  } catch (error) {
    return handlePublishPhotographError(error)
  }
}

export { publishPhotograph }
