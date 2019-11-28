import React, { Suspense } from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import Home from './containers/Home'
import NoMatch from './containers/NoMatch'
import AdminRoot from './containers/admin/AdminRoot'

export default (
  <div>
    <Suspense fallback={<></>}>
      <Switch>
        <Route exact path='/' component={Home} />

        <Route path='/admin' component={AdminRoot} />

        <Route component={NoMatch} />
      </Switch>
    </Suspense>
  </div>
)
