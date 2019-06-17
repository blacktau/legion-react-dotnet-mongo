import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getAuthenticationToken, isRequestingPhotographs, getPhotographsList } from '../selectors'
import { listPhotographs } from '../actions'
// import PhotographList from '../components/PhotographList'
import { Intent, ProgressBar } from '@blueprintjs/core'

class AdminHome extends PureComponent {
  componentDidMount = () => {
    this.props.dispatch(listPhotographs.request())
  }

  onPublish = (photograph, e) => {
    console.log(photograph)
    // this.props.dispatch(deletePhotograph.confirm())
  }

  onSuppress = (photograph, e) => {
    console.log(photograph)
  }

  render = () => {
    const { token, requestInProgress, photographs } = this.props
    if (!token) {
      return <Redirect to='/admin/login' />
    }

    return (
      <>
        {requestInProgress && <ProgressBar intent={Intent.PRIMARY} />}
        {/* {!requestInProgress && <PhotographList photographs={photographs} onPublish={this.onPublish} onSuppress={this.onSuppress} />} */}
      </>
    )
  }
}

AdminHome.propTypes = {
  token: PropTypes.string,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  token: getAuthenticationToken(state),
  requestInProgress: isRequestingPhotographs(state),
  photographs: getPhotographsList(state)
})

export default connect(mapStateToProps)(AdminHome)
