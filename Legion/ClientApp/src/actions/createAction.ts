import { Action } from 'redux'

const createAction = <T>(type: string, payload: T): Action<string> => {
  return ({ type, ...payload } as unknown) as Action<string>
}

export { createAction }
