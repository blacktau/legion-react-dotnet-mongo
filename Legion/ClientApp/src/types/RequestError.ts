export class RequestError extends Error {
  innerError?: RequestError
  constructor (public errorCode: number, public message: string, public statusText: string) {
    super(message)
  }
}
