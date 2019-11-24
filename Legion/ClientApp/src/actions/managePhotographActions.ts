import { createAction } from './createAction'
import { createActionTypes } from './createRequestActions'
import { INITIALISE, PUBLISH, RETRACTED } from './actionConstants'
import { Action } from 'redux'
import { Photograph } from '../types/Photograph'
import { InitialiseManagePhotographsAction, SinglePhotographAction } from '../store/ManagePhotographsStore'

export const MANAGE_PHOTOGRAPHS = createActionTypes('MANAGE_PHOTOGRAPHS', [INITIALISE, PUBLISH, RETRACTED])

export const managePhotographsActions = {
  initialise: (photographs: Array<Photograph>): Action<string> => createAction<InitialiseManagePhotographsAction>(MANAGE_PHOTOGRAPHS[INITIALISE], { photographs }),
  published: (photograph: Photograph): Action<string> => createAction<SinglePhotographAction>(MANAGE_PHOTOGRAPHS[PUBLISH], { photograph }),
  retracted: (photograph: Photograph): Action<string> => createAction<SinglePhotographAction>(MANAGE_PHOTOGRAPHS[RETRACTED], { photograph })
}
