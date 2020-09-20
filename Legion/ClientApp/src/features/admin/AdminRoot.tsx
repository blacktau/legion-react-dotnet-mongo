import React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import AdminHome from './AdminHome'
import { AuthenticatedRoute } from 'features/authentication/AuthenticatedRoute'
import LoginPage from 'features/authentication/LoginPage'
import NoMatch from '../../app/NoMatch'
import './admin.scss'

import ChangePasswordPage from 'features/changePassword/ChangePasswordPage'
import ManagePhotographsPage from 'features/managePhotographs/ManagePhotographsPage'
import UploadPhotographsPage from 'features/uploadPhotographs/UploadPhotographsPage'
import EditPhotographPage from 'features/editPhotgraph/EditPhotographPage'

// import UploadPhotograph from './UploadPhotograph'
// import ManagePhotographs from '../managePhotographs/ManagePhotographs'
// import { EditPhotograph } from './EditPhotograph'
// import { ManageKeywords } from './Managekeywords'

const AdminRoot = () => (
  <>
    <Route path='/admin' component={AdminLayout} />
    <Switch>
      <AuthenticatedRoute exact path='/admin' component={AdminHome} />
      <Route path='/admin/login' component={LoginPage} />
      <AuthenticatedRoute path='/admin/change-password' component={ChangePasswordPage} />
      <AuthenticatedRoute path='/admin/photographs/manage' component={ManagePhotographsPage} />

      <AuthenticatedRoute path='/admin/photographs/upload' component={UploadPhotographsPage}/>
      <AuthenticatedRoute path='/admin/photograph/:id/edit' component={EditPhotographPage} />

      {/* <AuthenticatedRoute path='/admin/keywords' component={ManageKeywords} /> */}
      <Route component={NoMatch} />
    </Switch>
  </>
)

export default AdminRoot
