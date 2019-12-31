import client, { RequestError } from '../api-client'
import { Photograph } from '../../types/Photograph'
import { Keyword } from '../../types/Keyword'

type KeywordsResponse = Keyword[]

const handleGetAllKeywordsError = (error: any) => {
  const message = error.innerError ? error.innerError.message : error.message
  const code = error.innerError ? error.innerError.errorCode : error.errorCode
  throw new RequestError(code, message)
}

const getAllKeywords = async () => {
  try {
    return await client<KeywordsResponse>('keyword/')
  } catch (error) {
    return handleGetAllKeywordsError(error)
  }
}

export { getAllKeywords }
