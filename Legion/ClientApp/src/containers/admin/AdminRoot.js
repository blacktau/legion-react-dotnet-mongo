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

const AdminRoot = () => (
  <>
    <Route path='/admin' component={AdminLayout} />
    <Switch>
      <Route exact path='/admin' component={AdminHome} />
      <Route path='/admin/login' component={Login} />
      <Route path='/admin/photographs/upload' component={UploadPhotograph} />
      <Route path='/admin/change-password' component={ChangePassword} />
    </Switch>
  </>
)

AdminRoot.propTypes = {
  match: PropTypes.object.isRequired
}

export default AdminRoot
