export class RequestError extends Error {
  constructor (public code: string, public message: string, public statusText: string) {
    super(message)
  }
}
