/* global process */

import { applyMiddleware, combineReducers, compose, createStore, Middleware, Store } from 'redux'

import { routerReducer } from 'react-router-redux'
import * as Authentication from './AuthenticationStore'
import * as UploadPhotograph from './UploadPhotographStore'
import * as ManagePhotographs from './ManagePhotographsStore'

export default function configureStore(initialState: object, middleware: Middleware[]): Store {
  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = []
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }

  const rootReducer = combineReducers({
    authentication: Authentication.authenticationReducer,
    routing: routerReducer,
    uploadPhotograph: UploadPhotograph.reducer,
    managePhotographs: ManagePhotographs.reducer
  })

  return createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers))
}
