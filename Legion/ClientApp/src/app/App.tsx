import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NoMatch from './NoMatch'
import Homepage from 'features/homepage/Homepage'
// import AdminRoot from 'features/admin/AdminRoot'

// eslint-disable-next-line @typescript-eslint/promise-function-async
const AdminRoot = lazy(() => import('features/admin/AdminRoot'))

function App () {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/' component={Homepage} />

          <Route path='/admin' component={AdminRoot} />

          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
