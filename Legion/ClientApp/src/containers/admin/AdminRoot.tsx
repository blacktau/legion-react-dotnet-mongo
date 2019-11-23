import React from 'react'
import PropTypes from 'prop-types'
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

const AdminRoot = () => (
  <>
    <Route path='/admin' component={AdminLayout} />
    <Switch>
      <AuthenticatedRoute exact path='/admin' component={AdminHome} />
      <Route path='/admin/login' component={Login} />
      <AuthenticatedRoute path='/admin/photographs/upload' component={UploadPhotograph} />
      <AuthenticatedRoute path='/admin/photographs/manage' component={ManagePhotographs} />
      <AuthenticatedRoute path='/admin/change-password' component={ChangePassword} />
      <Route component={NoMatch} />
    </Switch>
  </>
)

AdminRoot.propTypes = {
  match: PropTypes.object.isRequired
}

export default AdminRoot
