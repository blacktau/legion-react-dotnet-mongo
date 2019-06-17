import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { changePassword } from '../actions'

import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import ChangePasswordDialog from '../components/ChangePasswordDialog'
import { getAuthenticationToken, getChangePasswordError, isChangingPassword, isPasswordChanged } from '../selectors'
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
    const { error, token, changingPassword, passwordChanged } = this.props

    if (!token) {
      return <Redirect to='/admin/login' />
    }

    return (
      <div>
        <ChangePasswordDialog changingPassword={changingPassword} onSubmit={this.onSubmit} onCancel={this.onCancel} />
        { error &&
        <Modal basic size='small' onClose={this.handleCloseError}>
          <Header icon='exclamation triangle' content='Error' />
          <Modal.Content>
            <Icon name='exclamation triangle' />
            There has been an error: {error}
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={this.handleCloseError}>
              <Icon name='checkmark' /> OK
            </Button>
          </Modal.Actions>
        </Modal>
        }
        <Modal basic size='small' onClose={this.handleAcknowledgementClosed} open={passwordChanged}>
          <Header icon='' content='Password Changed' />
          <Modal.Content>
            <Icon name='checkmark box' />
            Your password has been updated.
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='green' inverted onClick={this.handleCloseError}>
              <Icon name='checkmark' /> OK
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
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
