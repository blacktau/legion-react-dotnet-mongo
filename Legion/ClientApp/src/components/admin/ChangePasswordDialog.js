import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Classes, Button, Intent, Tooltip, Toast, Alert } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { changePassword } from '../../actions'
import { getChangePasswordError, isChangingPassword, isPasswordChanged } from '../../selectors'
import RequiredInputGroup from './RequiredInputGroup'
import { AdminToaster } from './AdminToaster'

class ChangePasswordDialog extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      currentPassword: '',
      newPassword: '',
      repeatedNewPassword: '',
      submitted: false,
      showCurrentPassword: false
    }
  }

  onSubmit = () => {
    const { currentPassword, newPassword, repeatedNewPassword } = this.state
    this.setState({ submitted: true })

    if (currentPassword && newPassword && repeatedNewPassword) {
      this.props.dispatch(changePassword.request(currentPassword, newPassword, repeatedNewPassword))
    }
  }

  onCancel = () => {
    this.props.dispatch(push('/admin'))
  }

  handleCloseError = () => {
    if (AdminToaster.getToasts().length > 0) {
      this.props.dispatch(changePassword.clearError())
    }
  }

  handleAcknowledgementClosed = () => {
    this.props.dispatch(changePassword.changeAcknowledged())
    this.props.dispatch(push('/admin'))
  }

  updateCurrentPassword = (ev) => {
    this.handleCloseError()
    this.setState({ currentPassword: ev.target.value })
  }

  updateNewPassword = (ev) => {
    this.handleCloseError()
    this.setState({ newPassword: ev.target.value })
  }

  updateRepeatPassword = (ev) => {
    this.handleCloseError()
    this.setState({ repeatedNewPassword: ev.target.value })
  }

  handleLockClick = () => {
    this.setState({ showCurrentPassword: !this.state.showCurrentPassword })
    console.log('handleLockClick()')
  }

  render = () => {
    const { changingPassword, error, passwordChanged } = this.props
    const { currentPassword, newPassword, repeatedNewPassword, submitted, showCurrentPassword } = this.state

    if (error) {
      AdminToaster.show({ message: error, intent: Intent.DANGER, onDismiss: this.handleCloseError })
    }

    const lockButton = (
      <Tooltip content={`${showCurrentPassword ? 'Hide' : 'Show'} Password`} disabled={submitted}>
        <Button
          disabled={submitted}
          icon={showCurrentPassword ? 'unlock' : 'lock'}
          intent={Intent.WARNING}
          minimal
          onClick={this.handleLockClick} />
      </Tooltip>
    )

    return (
      <>
        <Alert
          isOpen={passwordChanged}
          confirmButtonText='Okay'
          onConfirm={this.handleAcknowledgementClosed}
          className={Classes.DARK}>
          <p>Password Successfully Updated</p>
        </Alert>
        <Dialog isOpen autoFocus enforceFocus icon='lock' className={Classes.DARK} title='Change Password' onClose={this.onCancel}>
          <div className={Classes.DIALOG_BODY}>
            <RequiredInputGroup
              disabled={changingPassword}
              value={currentPassword}
              type={showCurrentPassword ? 'text' : 'password'}
              autoComplete='current-password'
              placeholder='Current Password'
              onChange={this.updateCurrentPassword}
              rightElement={lockButton}
              supplied={!(submitted && (!currentPassword || currentPassword.length < 1))} />
            <br />
            <RequiredInputGroup
              disabled={changingPassword}
              value={newPassword}
              type='password'
              autoComplete='new-password'
              placeholder='New Password'
              onChange={this.updateNewPassword}
              supplied={!(submitted && (!newPassword || newPassword.length < 1))} />
            <br />
            <RequiredInputGroup
              disabled={changingPassword}
              value={repeatedNewPassword}
              type='password'
              autoComplete='new-password'
              placeholder='Repeat New Password'
              onChange={this.updateRepeatPassword}
              supplied={!(submitted && (!repeatedNewPassword || repeatedNewPassword.length < 1))} />
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
        {passwordChanged && <Toast intent={Intent.PRIMARY} />}
      </>
    )
  }
}

ChangePasswordDialog.propTypes = {
  error: PropTypes.string,
  changingPassword: PropTypes.bool,
  passwordChanged: PropTypes.bool
}

const mapStateToProps = (state) => ({
  error: getChangePasswordError(state),
  changingPassword: isChangingPassword(state),
  passwordChanged: isPasswordChanged(state)
})

export default connect(mapStateToProps)(ChangePasswordDialog)
