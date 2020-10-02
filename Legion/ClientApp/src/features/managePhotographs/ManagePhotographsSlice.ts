
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'

import Photograph from 'types/Photograph'
import { RootState } from 'rootReducer'
import { getAllPhotographs } from './managePhotographsApi'
import { useSelector } from 'react-redux'

export interface ManagePhotographState {
  fetchInProgress: boolean
  photographs?: Photograph[]
  error?: SerializedError
}

const initialState: ManagePhotographState = {
  fetchInProgress: false,
  photographs: undefined
}

export const fetchAllPhotographs = createAsyncThunk<Photograph[]>(
  'managePhotographs/fetchAllPhotographs',
  async (_, { getState }) => {
    const inprogress = useSelector(isFetchInProgress)
    if (inprogress) {
      return
    }

    const allPhotographs = await getAllPhotographs()
    return allPhotographs
  }
)

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
  },
  extraReducers: builder => {
    builder.addCase(fetchAllPhotographs.pending, (state, action) => ({
      ...state,
      fetchInProgress: true
    }))

    builder.addCase(fetchAllPhotographs.fulfilled, (state, action) => ({
      ...state,
      photographs: action.payload,
      fetchInProgress: false
    }))

    builder.addCase(fetchAllPhotographs.rejected, (state, action) => ({
      ...state,
      fetchInProgress: false,
      error: action.error
    }))
  }
})

export const selectPhotographs = (state: RootState) => state.managePhotographs.photographs
export const isFetchInProgress = (state: RootState) => state.managePhotographs.fetchInProgress

export const {
  updatePhotographList,
  initializePhotographs
} = managePhotographsSlice.actions

export default managePhotographsSlice.reducer
