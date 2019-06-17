import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Redirect } from 'react-router-dom'

import { uploadPhotograph } from '../actions'
import { getAuthenticationToken, getUploadingPhotographs } from '../selectors'
import DropTarget from '../components/DropTarget'
import UploadProgressDisplay from '../components/UploadProgressDisplay'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
})

class PhotographUpload extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      photographs: null,
      rejected: null,
      showReset: false
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
      this.setState({showReset: true})
    }
  }

  hasErrors = (photographs) => {
    return photographs && photographs.some((p) => p.error)
  }

  reset = () => {
    this.props.dispatch(uploadPhotograph.reset())
  }

  render = () => {
    const { token, photographs, classes, showReset } = this.props
    if (!token) {
      return <Redirect to='/admin/login' />
    }

    const isIncomplete = photographs && photographs.some((p) => p.progress < 100)
    const hasErrors = this.hasErrors(photographs)

    return (
      <div>
        { !photographs && <DropTarget accept='image/jpeg' onDrop={this.onUpload} /> }
        { photographs && <UploadProgressDisplay uploads={photographs} reset={showReset} onReset={this.reset} />}
        <Dialog open={!(!photographs) && !isIncomplete}>
          <DialogTitle>
            Upload Complete
          </DialogTitle>
          <DialogContent>
            {!hasErrors && <Typography>Upload Complete</Typography>}
            {hasErrors && <Typography>Upload complete with errors</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCompleteAcknowledged} className={classes.button} color='primary' variant='raised'>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
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

export default withStyles(styles)(connect(mapStateToProps)(PhotographUpload))
