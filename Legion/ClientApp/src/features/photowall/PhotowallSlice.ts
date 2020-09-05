import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Photograph from 'types/Photograph'
import { RootState } from 'rootReducer'

interface PhotoWallState {
  allPhotographs: Photograph[]
  filteredPhotographs: Photograph[]
  keywords: string[]
}

const initialState: PhotoWallState = {
  allPhotographs: [],
  filteredPhotographs: [],
  keywords: []
}

const photoWallSlice = createSlice({
  name: 'photoWall',
  initialState: initialState,
  reducers: {
    initializePhotographs: (state, action: PayloadAction<Photograph[]>) => ({
      ...state,
      allPhotographs: action.payload,
      filteredPhotographs: action.payload.slice(),
      keywords: (action.payload.flatMap(
        (photo) => {
          return (photo.keywords || [])
            .concat([photo.description, photo.title])
        })
        .filter(s => !!s && s.length > 0) || [])
        .filter((value, index, self) => self.indexOf(value) === index)
    })
  }
})

export const getWallPhotographs = (state: RootState) => state.photoWall.allPhotographs
export const getKeywords = (state: RootState) => state.photoWall.keywords

export const { initializePhotographs } = photoWallSlice.actions

export default photoWallSlice.reducer
