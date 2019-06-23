import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { changePassword } from '../../actions'

import ChangePasswordDialog from '../../components/admin/ChangePasswordDialog'
import { getAuthenticationToken, getChangePasswordError, isChangingPassword, isPasswordChanged } from '../../selectors'
import { push } from 'react-router-redux'

class ChangePassword extends PureComponent {
  onSubmit = (currentPassword, newPassword, repeatedNewPassword) => {
    this.props.dispatch(changePassword.request(currentPassword, newPassword, repeatedNewPassword))
  }

  onCancel = () => {
    this.props.dispatch(push('/admin'))
  }

  handleCloseError = () => {
    this.props.dispatch(changePassword.clearError())
  }

  handleAcknowledgementClosed = () => {
    this.props.dispatch(changePassword.changeAcknowledged())
    this.props.dispatch(push('/admin'))
  }

  render = () => {
    const { token } = this.props

    if (!token) {
      return <Redirect to='/admin/login' />
    }

    return (
      <ChangePasswordDialog />
    )
  }
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string,
  token: PropTypes.string,
  changingPassword: PropTypes.bool.isRequired,
  passwordChanged: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  token: getAuthenticationToken(state),
  error: getChangePasswordError(state),
  changingPassword: isChangingPassword(state),
  passwordChanged: isPasswordChanged(state)
})

export default connect(mapStateToProps)(ChangePassword)
