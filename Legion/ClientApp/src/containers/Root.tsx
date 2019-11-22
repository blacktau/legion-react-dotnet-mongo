import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary'
import { Action, Store } from 'redux'
import { History } from 'history'

type RootProps = {
  store: Store<unknown, Action>
  history: History<unknown>
  routes: ReactNode
}

const Root = ({ store, history, routes }: RootProps) => (
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Router history={history}>{routes}</Router>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)

export default Root
