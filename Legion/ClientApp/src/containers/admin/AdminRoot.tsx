import React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import AdminHome from './AdminHome'
import Login from './Login'
import ChangePassword from './ChangePassword'
import UploadPhotograph from './UploadPhotograph'
import './admin.scss'
import ManagePhotographs from './ManagePhotographs'
import NoMatch from '../NoMatch'
import { AuthenticatedRoute } from '../../components/admin/AuthenticatedRoute'
import { EditPhotograph } from './EditPhotograph'

const AdminRoot = () => (
  <>
    <Route path='/admin' component={AdminLayout} />
    <Switch>
      <AuthenticatedRoute exact path='/admin' component={AdminHome} />
      <Route path='/admin/login' component={Login} />
      <AuthenticatedRoute path='/admin/photographs/upload' component={UploadPhotograph} />
      <AuthenticatedRoute path='/admin/photographs/manage' component={ManagePhotographs} />
      <AuthenticatedRoute path='/admin/photographs/edit' component={EditPhotograph} />
      <AuthenticatedRoute path='/admin/change-password' component={ChangePassword} />
      <Route component={NoMatch} />
    </Switch>
  </>
)

export default AdminRoot
