import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { Icon, Classes, Card } from '@blueprintjs/core'

class DropTarget extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      accepted: null,
      rejected: null
    }
  }

  onDrop = (accepted, rejected) => {
    this.props.onDrop(accepted, rejected)
  }

  render = () => {
    const { accept } = this.props
    return (
      <Card className={Classes.DARK + ' dropCard'} interactive>
        <h3>Upload Photographs</h3>
        <Dropzone accept={accept} onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'dropTarget' })}>
              <Icon icon='cloud-upload' iconSize={128} />
              <p>
                Drop photographs here to upload
              </p>
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
      </Card>
    )
  }
}

DropTarget.propTypes = {
  accept: PropTypes.string,
  onDrop: PropTypes.func
}

export default DropTarget
