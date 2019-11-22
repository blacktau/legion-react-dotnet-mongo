import React from 'react'
import { Redirect } from 'react-router-dom'

import LoginDialog from '../../components/admin/LoginDialog'
import { useSelector } from 'react-redux'
import { isAuthenticated } from '../../selectors'

const Login = () => {
  const authenticated = useSelector(isAuthenticated)

  return authenticated ? <Redirect to='/admin' /> : <LoginDialog />
}

export default Login
