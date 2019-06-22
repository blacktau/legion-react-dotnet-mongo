import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as Authentication from './AuthenticationStore'
import * as UploadPhotograph from './UploadPhotographStore'
import * as ChangePassword from './ChangePasswordStore'
import * as PhotographListStore from './PhotographListStore'

export default function configureStore (initialState, middleware) {
  const reducers = {
    authentication: Authentication.reducer,
    uploadPhotograph: UploadPhotograph.reducer,
    changePassword: ChangePassword.reducer,
    photographsList: PhotographListStore.reducer
  }

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = []
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  )
}
