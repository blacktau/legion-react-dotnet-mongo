import React from 'react'
import { Redirect } from 'react-router-dom'

import LoginDialog from './LoginDialog'
import { useSelector } from 'react-redux'
import { isAuthenticated } from './AuthenticationSlice'

const LoginPage = () => {
  const authenticated = useSelector(isAuthenticated)

  return authenticated ? <Redirect to='/admin' /> : <LoginDialog />
}

export default LoginPage
