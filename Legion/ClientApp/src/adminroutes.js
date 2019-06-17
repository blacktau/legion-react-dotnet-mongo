import React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
// import AdminHome from './containers/AdminHome'
// import Login from './containers/Login'
// import UploadPhotograph from './containers/UploadPhotograph'
// import ChangePassword from './containers/ChangePassword'
import AdminLayout from './components/AdminLayout'

export default (
  <div>

    <Switch>
      {/* <Route exact path='/admin' component={AdminHome} />
      <Route path='/admin/login' component={Login} />
      <Route path='/admin/change-password' component={ChangePassword} />
      <Route path='/admin/photographs/upload' component={UploadPhotograph} /> */}
    </Switch>
  </div>
)
// <Route path='/photograph/publish/:id' component={EditPhotograph} />
// <Route path='/photograph/unpublish/:id' component={EditPhotograph} />
// <Route path='/photograph/:id' component={EditPhotograph} />
