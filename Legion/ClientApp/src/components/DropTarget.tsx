import React from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { Container, Card } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'

interface DropTargetProps {
  onDrop: <File>(acceptedFiles: File[], rejectedFiles: FileRejection[]) => void
  accept?: string | string[]
}

const DropTarget = ({ onDrop, accept }: DropTargetProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: accept, onDrop: onDrop })
  return (
    <Container>
      <Card className={'dropCard'}>
        <h3>Upload Photographs</h3>
        <div {...getRootProps({ className: 'dropTarget' })}>
          <CloudUpload style={{ fontSize: 128 }} />
          {isDragActive ? <p>Drop the photographs here to upload</p> : <p>Drag and drop Photographs here or click to select files</p>}
          <input {...getInputProps()} />
        </div>
      </Card>

    </Container>
  )
}

export default DropTarget
