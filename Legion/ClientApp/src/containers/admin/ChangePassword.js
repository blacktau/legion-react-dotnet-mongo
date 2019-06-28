import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { changePassword } from '../../actions'
import ChangePasswordDialog from '../../components/admin/ChangePasswordDialog'
import { getAuthenticationToken } from '../../selectors'

class ChangePassword extends PureComponent {
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
  token: PropTypes.string
}

const mapStateToProps = (state) => ({
  token: getAuthenticationToken(state)
})

export default connect(mapStateToProps)(ChangePassword)
