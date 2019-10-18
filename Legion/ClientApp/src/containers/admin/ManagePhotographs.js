import React, { Component } from 'react'
import { Card, Classes, Spinner } from '@blueprintjs/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { listPhotographs } from '../../actions'
import PhotographList from '../../components/admin/PhotographList'
import { getAuthenticationToken, isRequestingPhotographs, getPhotographsList } from '../../selectors'

class ManagePhotographs extends Component {
  componentDidMount = () => {
    this.props.dispatch(listPhotographs.request())
  }

  render () {
    const { token, requestInProgress, photographs } = this.props
    if (!token) {
      return <Redirect to='/admin/login' />
    }

    return (
      <Card className={Classes.DARK + ' photographList'}>
        <div>
          {requestInProgress && <Spinner />}
          {!requestInProgress && photographs && <PhotographList photographs={photographs} />}
        </div>
      </Card>
    )
  }
}

ManagePhotographs.propTypes = {
  token: PropTypes.string
}

const mapStateToProps = (state) => ({
  token: getAuthenticationToken(state),
  requestInProgress: isRequestingPhotographs(state),
  photographs: getPhotographsList(state)
})

export default connect(mapStateToProps)(ManagePhotographs)
