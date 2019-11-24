import { Photograph } from '../types/Photograph'
import { Action } from 'redux'
import { INITIALISE, PUBLISH, RETRACTED } from '../actions/actionConstants'
import { MANAGE_PHOTOGRAPHS } from '../actions/managePhotographActions'

export type ManagePhotographState = {
  photographs?: Array<Photograph>
}

const initialState: ManagePhotographState = {
  photographs: undefined
}

export type InitialiseManagePhotographsAction = {
  photographs: Array<Photograph>
}

export type SinglePhotographAction = {
  photograph: Photograph
}

export const reducer = (state: ManagePhotographState = initialState, action: (InitialiseManagePhotographsAction | SinglePhotographAction) & Action<string>): ManagePhotographState => {
  const { type } = action
  switch (type) {
    case MANAGE_PHOTOGRAPHS[INITIALISE]:
      const { photographs } = action as InitialiseManagePhotographsAction
      return { ...state, photographs }
    case MANAGE_PHOTOGRAPHS[RETRACTED]:
    case MANAGE_PHOTOGRAPHS[PUBLISH]: {
      const { photograph } = action as SinglePhotographAction
      if (!state.photographs) {
        return state
      }
      return {
        ...state,
        photographs: state.photographs.map((p: Photograph) => (p.id === photograph.id ? photograph : p))
      }
    }
    default:
      return state
  }
}
