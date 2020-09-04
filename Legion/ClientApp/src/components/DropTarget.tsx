import React from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { Icon, Classes, Card } from '@blueprintjs/core'

interface DropTargetProps {
  onDrop: <File>(acceptedFiles: File[], rejectedFiles: FileRejection[]) => void
  accept?: string | string[]
}

const DropTarget = ({ onDrop, accept }: DropTargetProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: accept, onDrop: onDrop })
  return (
    <Card className={Classes.DARK + ' dropCard'} interactive>
      <h3>Upload Photographs</h3>
      <div {...getRootProps({ className: 'dropTarget' })}>
        <Icon icon='cloud-upload' iconSize={128} />
        {isDragActive ? <p>Drop the photographs here to upload</p> : <p>Drag and drop Photographs here or click to select files</p>}
        <input {...getInputProps()} />
      </div>
    </Card>
  )
}

export default DropTarget
