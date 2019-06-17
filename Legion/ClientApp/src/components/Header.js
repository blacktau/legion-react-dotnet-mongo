import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions'
import { Navbar, Alignment } from '@blueprintjs/core'
import { Button } from 'semantic-ui-react'

class Header extends React.Component {
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
    const { anchorElement } = this.state
    const { classes } = this.props

    return (
      <Navbar fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Blacktau Photography Admin</Navbar.Heading>
          <Link to='/'>
            <Button icon='home' text='Home' />
          </Link>
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
})

export default connect(mapStateToProps)(Header)
