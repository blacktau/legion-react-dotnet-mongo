import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions'
import { Navbar, Alignment, Button } from '@blueprintjs/core'
import { getAuthenticationToken } from '../../selectors'

class AdminHeader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      anchorElement: null
    }
  }

  handleClick = event => {
    this.setState({ anchorElement: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorElement: null })
  }

  handleLogout = () => {
    this.handleClose()
    this.props.dispatch(logout.request())
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
              <Link to='/admin/change-password'>
                <Button icon='key' text='Change Password' />
              </Link>
              <Link to='/admin/photographs/upload'>
                <Button icon='upload' text='Upload' />
              </Link>
              <Link to='/admin/photographs/admin'>
                <Button icon='media' text='Manage Photos' />
              </Link>
            </>
          }
        </Navbar.Group>
      </Navbar>
    )

    //     <Menu
    //       id='simple-menu'
    //       anchorEl={anchorElement}
    //       open={Boolean(anchorElement)}
    //       onClose={this.handleClose}
    //       anchorOrigin={{
    //         vertical: 'top',
    //         horizontal: 'right'
    //       }}
    //       transformOrigin={{
    //         vertical: 'top',
    //         horizontal: 'right'
    //       }}>
    //       <MenuItem component={Link} to='/' onClick={this.handleClose}>
    //           Home
    //       </MenuItem>
    //       <MenuItem component={Link} to='/admin' onClick={this.handleClose}>
    //           Admin
    //       </MenuItem>
    //       <MenuItem component={Link} to='/admin/change-password' onClick={this.handleClose}>
    //           Change Password
    //       </MenuItem>
    //       <MenuItem component={Link} to='/admin/photographs/upload' onClick={this.handleClose}>
    //           Upload Photograph
    //       </MenuItem>

    //       <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
    //     </Menu>
    // )
  }
}

const mapStateToProps = (state) => ({
  token: getAuthenticationToken(state)
})

export default connect(mapStateToProps)(AdminHeader)
