import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import LoginDialog from '../../components/admin/LoginDialog'
import { getAuthenticationToken } from '../../selectors'

const Login = ({ token }) => {
  return token ? <Redirect to='/admin' /> : <LoginDialog />
}

Login.propTypes = {
  token: PropTypes.string,
}

const mapStateToProps = state => ({
  token: getAuthenticationToken(state),
})

export default connect(mapStateToProps)(Login)
