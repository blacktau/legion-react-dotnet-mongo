import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary'

const Root = ({ store, history, routes, type, renderProps }) => (
  <ErrorBoundary>
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  </ErrorBoundary>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
}

export default Root
