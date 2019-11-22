import React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import Home from './containers/Home'
import NoMatch from './containers/NoMatch'
import AdminRoot from './containers/admin/AdminRoot'

// import UploadPhotograph from './containers/UploadPhotograph'
// import ChangePassword from './containers/ChangePassword'

//const AdminRoot = React.lazy(() => import('./containers/admin/AdminRoot'))

export default (
  <div>
    <Switch>
      <Route exact path='/' component={Home} />

      <Route path='/admin' component={AdminRoot} />

      <Route component={NoMatch} />
    </Switch>
  </div>
)
// <Route path='/photograph/publish/:id' component={EditPhotograph} />
// <Route path='/photograph/unpublish/:id' component={EditPhotograph} />
// <Route path='/photograph/:id' component={EditPhotograph} />
