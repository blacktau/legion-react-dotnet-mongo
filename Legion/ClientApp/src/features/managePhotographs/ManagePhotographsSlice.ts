
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Photograph from 'types/Photograph'
import { RootState } from 'rootReducer'

export interface ManagePhotographState {
  photographs?: Photograph[]
}

const initialState: ManagePhotographState = {
  photographs: undefined
}

const managePhotographsSlice = createSlice({
  name: 'managePhotographs',
  initialState: initialState,
  reducers: {
    updatePhotographList: (state, action: PayloadAction<Photograph>) => {
      return !state.photographs
        ? state
        : {
          ...state,
          photographs: state.photographs.map((p: Photograph) => p.id === action.payload.id ? action.payload : p)
        }
    },
    initializePhotographs: (state, action: PayloadAction<Photograph[]>) => ({
      ...state,
      photographs: action.payload
    })
  }
})

export const selectPhotographs = (state: RootState) => state.managePhotographs.photographs

export const { updatePhotographList, initializePhotographs } = managePhotographsSlice.actions

export default managePhotographsSlice.reducer
