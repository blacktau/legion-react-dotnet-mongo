import { Action } from 'redux'

const createAction = <T>(type: string, payload = {}): Action<T> => {
  return ({ type, ...payload } as unknown) as Action<T>
}

export { createAction }
