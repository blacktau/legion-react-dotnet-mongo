import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Alignment, Button, Divider } from '@blueprintjs/core'
import { push } from 'react-router-redux'
import { logoutActions } from '../../actions/logoutActions'
import { isAuthenticated } from '../../selectors'

const AdminHeader = () => {
  const dispatch = useDispatch()
  const authenticated = useSelector(isAuthenticated)

  const handleLogout = () => {
    dispatch(logoutActions.request())
    dispatch(push('/'))
  }

  return (
    <Navbar fixedToTop>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <Link to='/'>Blacktau Photography Admin</Link>
        </Navbar.Heading>
        {authenticated && (
          <>
            <Link to='/admin'>
              <Button icon='home' text='Home' />
            </Link>
            <Divider />
            <Link to='/admin/photographs/manage'>
              <Button icon='media' text='Manage Photos' />
            </Link>
            <Link to='/admin/photographs/upload'>
              <Button icon='upload' text='Upload' />
            </Link>
            <Divider />
            <Link to='/admin/change-password'>
              <Button icon='key' text='Change Password' />
            </Link>
            <Divider />
            <Button icon='log-out' text='Log-out' onClick={handleLogout} />
          </>
        )}
      </Navbar.Group>
    </Navbar>
  )
}

export default AdminHeader
