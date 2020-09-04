import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'
import ErrorBoundary from './app/ErrorBoundary'

import './index.scss'
import App from './app/App'

import store from 'store'

declare global {
  interface Window {
    initialReduxState: object
    __REDUX_DEVTOOLS_EXTENSION__: Function
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
