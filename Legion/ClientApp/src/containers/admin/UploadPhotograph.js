import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Redirect } from 'react-router-dom'

import { uploadPhotograph } from '../../actions'
import { getAuthenticationToken, getUploadingPhotographs } from '../../selectors'
import DropTarget from '../../components/admin/DropTarget'
import UploadProgressDisplay from '../../components/admin/UploadProgressDisplay'
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core'

class PhotographUpload extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      photographs: null,
      rejected: null,
      showReset: false,
      showComplete: false
    }
  }

  onUpload = (accepted, rejected) => {
    if (!accepted && accepted.length === 0) {
      return
    }

    this.props.dispatch(uploadPhotograph.initialise(accepted))
  }

  handleCompleteAcknowledged = () => {
    const { photographs } = this.props
    if (!this.hasErrors(photographs)) {
      this.reset()
      this.props.dispatch(push('/admin'))
    } else {
      this.setState({ showReset: true, showComplete: false })
    }
  }

  hasErrors = (photographs) => {
    return photographs && photographs.some((p) => p.error)
  }

  reset = () => {
    this.props.dispatch(uploadPhotograph.reset())
  }

  render = () => {
    const { token, photographs, showReset } = this.props
    if (!token) {
      return <Redirect to='/admin/login' />
    }

    const isIncomplete = photographs && photographs.some((p) => p.progress < 100)
    const hasErrors = this.hasErrors(photographs)

    return (
      <>
        { !photographs && <DropTarget accept='image/jpeg' onDrop={this.onUpload} /> }
        { photographs && <UploadProgressDisplay uploads={photographs} reset={showReset} onReset={this.reset} />}
        <Dialog isOpen={this.state.showComplete && !isIncomplete}>
          <div className={Classes.DIALOG_HEADER}>
            Upload Complete
          </div>
          <div className={Classes.DRAWER_BODY}>
            {!hasErrors && <p>Upload Complete</p>}
            {hasErrors && <p>Upload complete with errors</p>}
          </div>
          <div className={Classes.DRAWER_FOOTER}>
            <Button
              onClick={this.handleCompleteAcknowledged}
              intent={Intent.PRIMARY}>OK</Button>
          </div>
        </Dialog>
      </>
    )
  }
}

PhotographUpload.propTypes = {
  token: PropTypes.string
}

const mapStateToProps = (state) => ({
  token: getAuthenticationToken(state),
  photographs: getUploadingPhotographs(state)
})

export default connect(mapStateToProps)(PhotographUpload)
