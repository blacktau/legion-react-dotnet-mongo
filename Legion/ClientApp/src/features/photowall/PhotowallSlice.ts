import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Photograph from 'types/Photograph'
import { RootState } from 'rootReducer'

interface PhotoWallState {
  allPhotographs: Photograph[]
}

const initialState: PhotoWallState = {
  allPhotographs: []
}

const photoWallSlice = createSlice({
  name: 'photoWall',
  initialState: initialState,
  reducers: {
    initializePhotographs: (state, action: PayloadAction<Photograph[]>) => ({
      ...state,
      allPhotographs: action.payload
    })
  }
})

export const getWallPhotographs = (state: RootState) => state.photoWall.allPhotographs

export const { initializePhotographs } = photoWallSlice.actions

export default photoWallSlice.reducer
