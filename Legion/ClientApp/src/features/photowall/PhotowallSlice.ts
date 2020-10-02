import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Photograph from 'types/Photograph'
import { RootState } from 'rootReducer'
import { photographsApi } from './photographsApi'

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

export const fetchPublishedPhotographs = createAsyncThunk(
  'photoWall/fetchPublishedPhotographs',
  async () => {
    const photographs = await photographsApi.getPublishedPhotographs()
    return photographs
  }
)

const photoWallSlice = createSlice({
  name: 'photoWall',
  initialState: initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchPublishedPhotographs.fulfilled, (state, action: PayloadAction<Photograph[]>) => ({
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
    }))
  }
})

export const getWallPhotographs = (state: RootState) => state.photoWall.allPhotographs
export const getKeywords = (state: RootState) => state.photoWall.keywords

export default photoWallSlice.reducer
