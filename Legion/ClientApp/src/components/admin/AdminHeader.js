import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar, Alignment, Button, Divider } from '@blueprintjs/core'
import { push } from 'react-router-redux'
import { logout } from '../../actions'
import { getAuthenticationToken } from '../../selectors'

class AdminHeader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  handleLogout = () => {
    this.props.dispatch(logout.request())
    this.props.dispatch(push('/'))
  }

  render () {
    const { token } = this.props

    return (
      <Navbar fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <Link to='/'>Blacktau Photography Admin</Link>
          </Navbar.Heading>
          {token &&
            <>
              <Link to='/admin'>
                <Button icon='home' text='Home' />
              </Link>
              <Divider />
              <Link to='/admin/photographs/admin'>
                <Button icon='media' text='Manage Photos' />
              </Link>
              <Link to='/admin/photographs/upload'>
                <Button icon='upload' text='Upload' />
              </Link>
              <Divider />
              <Link to='/admin/change-password'>
                <Button icon='key' text='Change Password' />
              </Link>
              <Divider />
              <Button icon='log-out' text='Log-out' onClick={this.handleLogout} />
            </>
          }
        </Navbar.Group>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => ({
  token: getAuthenticationToken(state)
})

export default connect(mapStateToProps)(AdminHeader)
