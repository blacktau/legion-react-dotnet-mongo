import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Classes, Callout, InputGroup, Button, Intent } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { changePassword } from '../../actions'
import { getChangePasswordError, isChangingPassword, isPasswordChanged } from '../../selectors'

class ChangePasswordDialog extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      currentPassword: '',
      newPassword: '',
      repeatedNewPassword: '',
      submitted: false
    }
  }

  onSubmit = (currentPassword, newPassword, repeatedNewPassword) => {
    this.setState({ submitted: true })

    if (currentPassword && newPassword && repeatedNewPassword) {
      this.props.dispatch(changePassword.request(currentPassword, newPassword, repeatedNewPassword))
    }
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

  updateCurrentPassword = (ev) => {
    this.setState({ currentPassword: ev.target.value })
  }

  updateNewPassword = (ev) => {
    this.setState({ newPassword: ev.target.value })
  }

  updateRepeatPassword = (ev) => {
    this.setState({ repeatedNewPassword: ev.target.value })
  }

  render = () => {
    const { changingPassword } = this.props
    const { currentPassword, newPassword, repeatedNewPassword, error } = this.state

    return (
      <Dialog
        isOpen
        autoFocus
        enforceFocus
        icon='lock'
        className={Classes.DARK}
        title='Change Password'
        onClose={this.onCancel}>
        <div className={Classes.DIALOG_BODY}>
          {error && <Callout intent={Intent.DANGER} >
            {error}
          </Callout>}
          <InputGroup
            disabled={changingPassword}
            value={currentPassword}
            type='password'
            autoComplete='current-password'
            placeholder='Current Password'
            onChange={this.updateCurrentPassword}
            required />
          <br />
          <InputGroup
            disabled={changingPassword}
            value={newPassword}
            type='password'
            autoComplete='new-password'
            placeholder='New Password'
            onChange={this.updateNewPassword}
            required />
          <br />
          <InputGroup
            disabled={changingPassword}
            value={repeatedNewPassword}
            type='password'
            autoComplete='new-password'
            placeholder='Repeat New Password'
            onChange={this.updateRepeatPassword}
            required />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              intent={Intent.PRIMARY}
              onClick={this.onSubmit}
              disabled={changingPassword}
              loading={changingPassword}>Change Password</Button>
            <Button
              onClick={this.onCancel}
              disabled={changingPassword}
              loading={changingPassword}>Cancel</Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

ChangePasswordDialog.propTypes = {
  error: PropTypes.string
}

const mapStateToProps = (state) => ({
  error: getChangePasswordError(state),
  changingPassword: isChangingPassword(state),
  passwordChanged: isPasswordChanged(state)
})

ChangePasswordDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(ChangePasswordDialog)
