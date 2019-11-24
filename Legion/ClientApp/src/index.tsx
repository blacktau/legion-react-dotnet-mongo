import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

import routes from './routes'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker'

import 'typeface-roboto'
import 'typeface-open-sans'
import './index.scss'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') || undefined
const history = createBrowserHistory({ basename: baseUrl })

const middleware = [routerMiddleware(history)]

const loadPolyfills = async () => {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}

loadPolyfills()

// Get the application-wide store instance, pre-populating with state from the server where available.
declare global {
  interface Window {
    initialReduxState: object
    __REDUX_DEVTOOLS_EXTENSION__: Function
  }
}

const store = configureStore({}, middleware)

const rootElement = document.getElementById('root')

ReactDOM.render(<Root store={store} history={history} routes={routes} />, rootElement)

registerServiceWorker()
