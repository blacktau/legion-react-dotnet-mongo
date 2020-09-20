import { RequestError } from 'types/RequestError'

const handleError = (error: any) => {
  throw new RequestError(
    error.response ? error.response.status : -1,
    error.message,
    error.response ? error.response.statusText : 'Unknown Error'
  )
}

export { handleError }
