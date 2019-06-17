import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import AdminHome from './AdminHome'

const AdminRoot = () => (
  <>
    <Route path='/admin' component={AdminLayout} />
    <Switch>
      <Route exact path='/admin' component={AdminHome} />
    </Switch>
  </>
)

AdminRoot.propTypes = {
  match: PropTypes.object.isRequired
}

export default AdminRoot
