import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getAuthenticationToken } from '../../selectors'

class AdminHome extends PureComponent {
  render = () => {
    const { token } = this.props
    if (!token) {
      return <Redirect to='/admin/login' />
    }

    return (
      <>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  token: getAuthenticationToken(state)
})

export default connect(mapStateToProps)(AdminHome)
