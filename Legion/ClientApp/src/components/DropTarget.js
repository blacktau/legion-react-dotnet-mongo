import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { Container, Header, Icon } from 'semantic-ui-react'

// const styles = theme => ({
//   dropzone: {
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     width: 300,
//     height: 300,
//     borderWidth: 2,
//     borderColor: theme.palette.grey[700],
//     borderStyle: 'dashed',
//     borderRadius: 5,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: theme.spacing.unit * 2
//   }
// })

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
    const { classes, accept } = this.props
    return (
      <div>
        <Container>
          <Header>Upload Photograph</Header>
          <p>
            Drag and Drop photographs to upload
          </p>
          <Dropzone className={classes.dropzone} accept={accept} onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <Icon name='add' />
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
        </Container>
      </div>
    )
  }
}

DropTarget.propTypes = {
  accept: PropTypes.string,
  onDrop: PropTypes.func
}

export default DropTarget
