import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isAuthenticated } from '../../selectors'

const AdminHome = () => {
  const authenticated = useSelector(isAuthenticated)
  return authenticated ? <></> : <Redirect to='/admin/login' />
}

export default AdminHome
