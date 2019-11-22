import React from 'react'
import Dropzone from 'react-dropzone'
import { Icon, Classes, Card } from '@blueprintjs/core'

type DropTargetProps = {
  onDrop: <File>(acceptedFiles: File[], rejectedFiles: File[]) => void
  accept?: string | string[]
}

const DropTarget = ({ onDrop, accept }: DropTargetProps) => {
  return (
    <Card className={Classes.DARK + ' dropCard'} interactive>
      <h3>Upload Photographs</h3>
      <Dropzone accept={accept} onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'dropTarget' })}>
            <Icon icon="cloud-upload" iconSize={128} />
            <p>Drop photographs here to upload</p>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    </Card>
  )
}

export default DropTarget
