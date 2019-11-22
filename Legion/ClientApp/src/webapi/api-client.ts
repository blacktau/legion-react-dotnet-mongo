/* global Promise */
import { TOKEN_NAME } from '../constants'

export class RequestError extends Error {
  innerError?: RequestError
  constructor(public errorCode: number, public message: string) {
    super(message)
  }
}

type ClientConfig = {
  input?: any
} & RequestInit

const client = <T>(endPoint: string, { input, ...options }: ClientConfig = {}): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const token = sessionStorage.getItem(TOKEN_NAME)
    const headers: HeadersInit = {
      'content-type': 'application/json'
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const fetchConfig: RequestInit = {
      method: input ? 'POST' : 'GET',
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    }

    if (input) {
      fetchConfig.body = JSON.stringify(input)
    }

    return fetch(`/api/${endPoint}`, fetchConfig)
      .then(async response => {
        if (!response.ok) {
          const error = new RequestError(response.status, response.statusText)
          try {
            error.innerError = await response.json()
          } catch {}

          throw error
        }

        const contentType = response.headers.get('content-type')

        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json()
        }
      })
      .then(response => {
        console.log(`Response: ${JSON.stringify(response)}`)
        resolve(response)
      })
      .catch((error: any) => reject(error))
  })

export default client
