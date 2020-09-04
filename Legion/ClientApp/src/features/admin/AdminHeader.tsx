import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Alignment, Button, Divider } from '@blueprintjs/core'
import { logout, isAuthenticated } from 'features/authentication/AuthenticationSlice'

const AdminHeader = () => {
  const dispatch = useDispatch()
  const authenticated = useSelector(isAuthenticated)
  const history = useHistory()

  const handleLogout = useCallback(() => {
    dispatch(logout)
    history.push('/')
  }, [history, dispatch])

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
