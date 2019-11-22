import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
// import createSagaMiddleware from 'redux-saga'

import routes from './routes'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker'
//import rootSaga from './sagas'

import 'typeface-roboto'
import 'typeface-open-sans'
import './index.scss'

const baseUrl =
  document.getElementsByTagName('base')[0].getAttribute('href') || undefined
const history = createBrowserHistory({ basename: baseUrl })
//const sagaMiddleware = createSagaMiddleware()

const middleware = [routerMiddleware(history)]

// Get the application-wide store instance, pre-populating with state from the server where available.
declare global {
  interface Window {
    initialReduxState: object
    __REDUX_DEVTOOLS_EXTENSION__: Function
  }
}

const store = configureStore({}, middleware)

const rootElement = document.getElementById('root')

//sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Root store={store} history={history} routes={routes} />,
  rootElement
)

registerServiceWorker()
