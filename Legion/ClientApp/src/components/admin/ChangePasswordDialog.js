import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import { changePassword } from '../actions'

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

  updateCurrentPassword = (ev) => {
    this.setState({ currentPassword: ev.target.value })
  }

  updateNewPassword = (ev) => {
    this.setState({ newPassword: ev.target.value })
  }

  updateRepeatPassword = (ev) => {
    this.setState({ repeatedNewPassword: ev.target.value })
  }

  onSubmit = () => {
    this.setState({ submitted: true })
    const { currentPassword, newPassword, repeatedNewPassword } = this.state

    if (currentPassword && newPassword && repeatedNewPassword) {
      this.props.onSubmit(currentPassword, newPassword, repeatedNewPassword)
    }
  }

  onCancel = () => {
    this.props.onCancel()
  }

  render = () => {
    const { changingPassword } = this.props
    const { submitted, currentPassword, newPassword, repeatedNewPassword } = this.state

    return (
      <Modal open>
        <Header>Change Password</Header>
        <ModalContent>
          <Form>
            <Form.Input
              id='currentPassword'
              label='Current Password'
              value={currentPassword}
              onChange={this.updateCurrentPassword}
              required
              autoComplete='current-password'
              type='password'
              error={submitted && !currentPassword}
              icon='times circle' />
            <Form.Input
              id='newPassword'
              label='New Password'
              value={newPassword}
              onChange={this.updateNewPassword}
              required
              autoComplete='new-password'
              type='password'
              error={submitted && !newPassword} />
            <Form.Input
              id='repeatPassword'
              label='Repeat New Password'
              value={repeatedNewPassword}
              onChange={this.updateRepeatPassword}
              required
              autoComplete='new-password'
              type='password'
              error={submitted && (!repeatedNewPassword || repeatedNewPassword !== newPassword)} />
          </Form>
          <ModalActions>
            <Button onClick={this.onSubmit} primary disabled={changingPassword}>Change Password</Button>
            <Button onClick={this.onCancel} secondary disabled={changingPassword}>Cancel</Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    )
  }
}

ChangePasswordDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default ChangePasswordDialog
