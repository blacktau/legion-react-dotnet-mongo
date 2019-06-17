import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AnchorButton, Button, Classes, Code, Dialog, H5, Intent, Switch, Tooltip } from '@blueprintjs/core'

class LoginDialog extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      submitted: false
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
      this.props.onSubmit(username, password)
    }
  }

  handleEnterSubmit = (ev) => {
    if (ev.key !== 'Enter') {
      return
    }

    this.onSubmit()
    ev.preventDefault()
  }

  render = () => {
    const { classes, authenticating } = this.props
    const { submitted, username, password } = this.state

    return (
      <Dialog isOpen>

        <DialogTitle>
          Login
        </DialogTitle>
        <DialogContent>
          <TextField id='username' label='Username' className={classes.textField} value={this.state.username} onChange={this.updateUsername} required error={submitted && !username} />
          <TextField id='password' label='Password' className={classes.textField} value={this.state.password} onChange={this.updatePassword} onKeyPress={this.handleEnterSubmit} required autoComplete='current-password' type='password' error={submitted && !password} />
        </DialogContent>
        <DialogActions>
          <div className={classes.wrapper}>
            <Button onClick={this.onSubmit} className={classes.button} color='primary' variant='contained' disabled={authenticating}>{authenticating ? <CircularProgress size={24} className={classes.buttonProgress} /> : 'Login'}</Button>
          </div>
        </DialogActions>
      </Dialog>
    )
  }
}

LoginDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default LoginDialog
