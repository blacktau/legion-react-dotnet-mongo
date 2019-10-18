import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { changePassword } from '../../actions'
import ChangePasswordDialog from '../../components/admin/ChangePasswordDialog'
import { getAuthenticationToken } from '../../selectors'

const ChangePassword = ({ token, dispatch }) => {
  const handleAcknowledgementClosed = () => {
    dispatch(changePassword.changeAcknowledged())
    dispatch(push('/admin'))
  }

  return !token ? <Redirect to='/admin/login' /> : <ChangePasswordDialog />
}

ChangePassword.propTypes = {
  token: PropTypes.string,
}

const mapStateToProps = state => ({
  token: getAuthenticationToken(state),
})

export default connect(mapStateToProps)(ChangePassword)
