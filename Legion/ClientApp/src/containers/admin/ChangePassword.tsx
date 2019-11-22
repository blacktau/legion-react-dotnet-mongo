import React from 'react'
import { Redirect } from 'react-router-dom'
import ChangePasswordDialog from '../../components/admin/ChangePasswordDialog'
import { useSelector } from 'react-redux'
import { isAuthenticated } from '../../selectors'

const ChangePassword = () => {
  const authenticated = useSelector(isAuthenticated)
  return !authenticated ? <Redirect to='/admin/login' /> : <ChangePasswordDialog />
}

export default ChangePassword
