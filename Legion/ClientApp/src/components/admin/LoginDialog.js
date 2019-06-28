import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Classes, Dialog, Intent, Tooltip } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { authorise } from '../../actions'
import { getAuthenticationError, isAuthenticating } from '../../selectors'
import RequiredInputGroup from './RequiredInputGroup'
import { AdminToaster } from './AdminToaster'

class LoginDialog extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      submitted: false,
      showPassword: false
    }
  }

  updateUsername = (ev) => {
    this.props.dispatch(authorise.clearError())
    this.setState({ username: ev.target.value })
  }

  updatePassword = (ev) => {
    this.props.dispatch(authorise.clearError())
    this.setState({ password: ev.target.value })
  }

  onSubmit = () => {
    this.setState({ submitted: true })
    const { username, password } = this.state
    if (username && password) {
      this.props.dispatch(authorise.request(username, password))
    }
  }

  handleClose = () => {
    this.props.dispatch(push('/'))
  }

  handleErrorClosed = () => {
    this.props.dispatch(authorise.clearError())
  }

  handleEnterSubmit = (ev) => {
    if (ev.key !== 'Enter') {
      return
    }

    this.onSubmit()
    ev.preventDefault()
  }

  handleLockClick = () => this.setState({ showPassword: !this.state.showPassword })

  render = () => {
    const { authenticating, error } = this.props
    const { username, password, showPassword, submitted } = this.state

    if (error) {
      AdminToaster.show({ message: error, intent: Intent.DANGER, onDismiss: this.handleErrorClosed })
    }

    const lockButton = (
      <Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`} disabled={authenticating}>
        <Button
          disabled={authenticating}
          icon={showPassword ? 'unlock' : 'lock'}
          intent={Intent.WARNING}
          minimal
          onClick={this.handleLockClick} />
      </Tooltip>
    )

    return (
      <Dialog isOpen autoFocus enforceFocus icon='log-in' className={Classes.DARK} title='Login' onClose={this.handleClose}>
        <div className={Classes.DIALOG_BODY}>
          <RequiredInputGroup
            disabled={authenticating}
            value={username}
            type='text'
            placeholder='Username'
            onChange={this.updateUsername}
            icon='lock'
            supplied={!(submitted && (username == null || username.length <= 1))} />
          <br />
          <RequiredInputGroup
            disabled={authenticating}
            value={password}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            onChange={this.updatePassword}
            rightElement={lockButton}
            onKeyPress={this.handleEnterSubmit}
            supplied={!(submitted && (password == null || password.length <= 1))}
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              intent={Intent.PRIMARY}
              onClick={this.onSubmit}
              disabled={authenticating}
              icon='log-in'
              loading={authenticating}>Login</Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

LoginDialog.propTypes = {
  error: PropTypes.string,
  authenticating: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  error: getAuthenticationError(state),
  authenticating: isAuthenticating(state)
})

export default connect(mapStateToProps)(LoginDialog)
