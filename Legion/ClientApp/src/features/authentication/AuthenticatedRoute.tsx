import { useSelector } from 'react-redux'
import { Redirect, RouteProps } from 'react-router'
import React from 'react'
import { Route } from 'react-router-dom'
import { isAuthenticated } from './AuthenticationSlice'

type AuthenticationRouteProps = RouteProps

const AuthenticatedRoute = ({ component, path, exact = false }: AuthenticationRouteProps) => {
  const authenticated = useSelector(isAuthenticated)

  if (!authenticated) {
    return <Redirect to='/admin/login' />
  }

  return <Route path={path} component={component} exact={exact} />
}

export { AuthenticatedRoute }
