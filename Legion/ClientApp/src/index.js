import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import 'typeface-roboto'
import './index.css'

import routes from './routes'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker'
import rootSaga from './sagas'
import { Classes } from '@blueprintjs/core'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')
const history = createBrowserHistory({ basename: baseUrl })
const sagaMiddleware = createSagaMiddleware()

const middleware = [
  routerMiddleware(history),
  sagaMiddleware
]

// Get the application-wide store instance, pre-populating with state from the server where available.
const initialState = window.initialReduxState
const store = configureStore(initialState, middleware)

const rootElement = document.getElementById('root')

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Root
    store={store}
    history={history}
    routes={routes}
    className={Classes.DARK} />,
  rootElement)

registerServiceWorker()
