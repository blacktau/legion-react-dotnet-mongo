import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import LoginDialog from '../../components/admin/LoginDialog'
import { getAuthenticationToken } from '../../selectors'

class Login extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      submitted: false
    }
  }

  render = () => {
    const { token } = this.props

    if (token) {
      return <Redirect to='/admin' />
    }

    return (
      <LoginDialog />
    )
  }
}

Login.propTypes = {
  token: PropTypes.string
}

const mapStateToProps = (state) => ({
  token: getAuthenticationToken(state)
})

export default connect(mapStateToProps)(Login)
