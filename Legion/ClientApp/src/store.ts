import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store
