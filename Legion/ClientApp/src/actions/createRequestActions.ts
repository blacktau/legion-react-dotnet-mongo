import { REQUEST, SUCCESS, FAILURE } from './actionConstants'

type ActionMap = { [index: string]: string }

const createActionTypes = (base: string, extras: string[] = []): ActionMap => {
  return [REQUEST, SUCCESS, FAILURE, ...extras].reduce((acc: ActionMap, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export { createActionTypes }
