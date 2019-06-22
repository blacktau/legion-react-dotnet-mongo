import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Classes, Dialog, Intent, InputGroup, Tooltip, Callout } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { authorise } from '../../actions'
import { getAuthenticationError, isAuthenticating } from '../../selectors'

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
    this.setState({ username: ev.target.value })
  }

  updatePassword = (ev) => {
    this.setState({ password: ev.target.value })
  }

  onSubmit = () => {
    this.setState({ submitted: true })
    const { username, password } = this.state
    if (username && password) {
      this.props.dispatch(authorise.request(username, password))
    }
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
    const { username, password, showPassword } = this.state

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
      <Dialog isOpen autoFocus enforceFocus icon='log-in' className={Classes.DARK} title='Login'>
        <div className={Classes.DIALOG_BODY}>
          {error && <Callout intent={Intent.DANGER} >
            {error}
          </Callout>}
          <InputGroup
            disabled={authenticating}
            value={username}
            type='text'
            placeholder='Username'
            onChange={this.updateUsername}
            icon='lock'
            required />
          <br />

          <InputGroup
            disabled={authenticating}
            value={password}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            onChange={this.updatePassword}
            rightElement={lockButton}
            onKeyPress={this.handleEnterSubmit}
            required />

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
