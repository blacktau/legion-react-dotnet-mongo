import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { authorise } from '../actions'

import LoginDialog from '../components/LoginDialog'
import { getAuthenticationToken, getAuthenticationError, isAuthenticating } from '../selectors'

class Login extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      submitted: false
    }
  }

  onSubmit = (username, password) => {
    this.props.dispatch(authorise.request(username, password))
  }

  handleCloseError = () => {
    this.props.dispatch(authorise.clearError())
  }

  render = () => {
    const { token, authenticating } = this.props

    if (token) {
      return <Redirect to='/admin' />
    }

    return (
      <LoginDialog authenticating={authenticating} onSubmit={this.onSubmit} />
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string,
  token: PropTypes.string,
  authenticating: PropTypes.bool.isRequired
}

const styledLogin = withStyles(styles)(Login)

const mapStateToProps = (state) => ({
  token: getAuthenticationToken(state),
  error: getAuthenticationError(state),
  authenticating: isAuthenticating(state)
})

export default connect(mapStateToProps)(styledLogin)
